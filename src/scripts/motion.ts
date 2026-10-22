import { TYPE_SPEED } from '../data/code';
import { clamp01, easeOut, reducedMotion as reduce } from './ui';

const $ = <T extends HTMLElement = HTMLElement>(sel: string) => document.querySelector<T>(sel);
const $$ = <T extends HTMLElement = HTMLElement>(sel: string) => [...document.querySelectorAll<T>(sel)];

const hero = $('#inicio');
const heroText = $('[data-hero-text]');
const wrap = $('[data-scene-wrap]');
const inner = $('[data-scene-inner]');
const scene = $('[data-scene]');
const panes = $$('[data-code-pane]').map((el) => ({ el, z: Number(el.dataset.z) }));
const floats = $$('[data-float]');
const lines = $$('[data-ln]').map((el) => ({
  el,
  start: Number(el.dataset.start),
  len: Number(el.dataset.len),
  cursor: el.nextElementSibling as HTMLElement,
  width: 0,
  f: -1,
}));
const tilt = $('[data-tilt]');
const reveals = $$('[data-rv]').map((el) => ({ el, k: -1 }));
const timeline = $('#trajetoria');
const bars = $$('[data-bar]').map((el) => ({ el, i: Number(el.dataset.i), k: -1 }));
const spySections = $$('main section[id]');
const navLinks = $$('[data-nav]');

const typingEnd = lines.length ? Math.max(...lines.map((l) => l.start + l.len / TYPE_SPEED)) : 0;
const cycle = typingEnd + 5;

const target = { x: 0, y: 0 };
const cur = { x: 0, y: 0 };
let heroVisible = true;
let tiltVisible = false;
let lastScroll = -1;
let lastVh = -1;
let activeLine = -2;
let lastTilt = '';
let active = '';

if (!reduce) {
  addEventListener('mousemove', (e) => {
    target.x = (e.clientX / innerWidth) * 2 - 1;
    target.y = (e.clientY / innerHeight) * 2 - 1;
  });
}

const measureLines = () => lines.forEach((l) => (l.width = l.el.offsetWidth));
document.fonts.ready.then(measureLines);

if (wrap && inner) {
  new ResizeObserver(() => {
    inner.style.transform = `scale(${wrap.clientWidth / 660})`;
    measureLines();
  }).observe(wrap);
}

const watch = (el: Element | null, set: (visible: boolean) => void) =>
  el && new IntersectionObserver(([entry]) => set(entry.isIntersecting)).observe(el);
watch(hero, (v) => (heroVisible = v));
watch(tilt, (v) => (tiltVisible = v));
$$('.pulse').forEach((el) => watch(el, (v) => (el.style.animationPlayState = v ? 'running' : 'paused')));

function heroScene(t: number, vh: number) {
  if (!scene) return;
  const { x: cx, y: cy } = cur;
  const s = reduce ? 0 : clamp01(scrollY / (vh * 0.9));
  if (heroText) {
    heroText.style.transform = `translateY(${-s * 60}px)`;
    heroText.style.opacity = String(1 - s * 0.75);
  }
  const spread = 1 + (cx + 1) * 0.3 + s * 2.2;
  scene.style.transform = `translateY(${-s * 90}px) rotateX(${8 - cy * 9 - s * 14}deg) rotateY(${-24 + cx * 20 + s * 46}deg)`;
  panes.forEach(({ el, z }, i) => {
    const bob = reduce ? 0 : Math.sin(t * 0.8 + i) * 5;
    el.style.transform = `translateZ(${z * spread}px) translateY(${bob}px)`;
  });
  floats.forEach((el, i) => {
    const z = 160 + i * 25 + (cx + 1) * 40 + s * 160;
    const bob = reduce ? 0 : Math.sin(t * 1.1 + i * 1.7) * 12;
    const rot = (i % 2 ? 1 : -1) * 8 + cx * 6 + s * 30;
    el.style.transform = `translate3d(${cx * -14 * (i + 1)}px,${bob}px,${z}px) rotate(${rot}deg)`;
  });
  if (!reduce) typing(t % cycle, t);
}

function typing(tt: number, t: number) {
  let current = -1;
  lines.forEach((l, k) => {
    const f = clamp01(((tt - l.start) * TYPE_SPEED) / l.len);
    if (f > 0 && f < 1) current = k;
    if (f === l.f) return;
    l.f = f;
    l.el.style.clipPath = `inset(-2px ${(1 - f) * 100}% -2px 0)`;
  });
  if (current < 0 && tt > typingEnd) current = lines.length - 1;
  if (current !== activeLine) {
    lines[activeLine]?.cursor.style.setProperty('opacity', '0');
    activeLine = current;
  }
  const line = lines[current];
  if (!line) return;
  line.cursor.style.transform = `translateX(${line.f * line.width}px)`;
  line.cursor.style.opacity = (t * 2) % 1 < 0.6 ? '1' : '0.15';
}

function sections(vh: number) {
  const revealTops = reveals.map(({ el }) => el.getBoundingClientRect().top);
  const tlTop = timeline?.getBoundingClientRect().top ?? 0;
  const spyTops = spySections.map((el) => el.getBoundingClientRect().top);

  if (!reduce) {
    reveals.forEach((r, i) => {
      const k = clamp01((vh * 0.95 - revealTops[i]) / (vh * 0.3));
      if (k === r.k) return;
      r.k = k;
      r.el.style.opacity = String(k);
      r.el.style.transform = k === 1 ? '' : `translateY(${(1 - k) * 48}px)`;
    });
    const kk = clamp01((vh * 0.9 - tlTop) / (vh * 0.55));
    bars.forEach((b) => {
      const k = easeOut(clamp01(kk * 4.2 - b.i * 0.8));
      if (k === b.k) return;
      b.k = k;
      b.el.style.clipPath = k === 1 ? '' : `inset(-4px ${(1 - k) * 100}% -4px -100vw round 20px)`;
    });
  }

  let id = spySections[0]?.id ?? '';
  spyTops.forEach((top, i) => {
    if (top <= vh * 0.4) id = spySections[i].id;
  });
  if (id === active) return;
  active = id;
  navLinks.forEach((a) => a.toggleAttribute('data-on', a.dataset.nav === id));
}

const t0 = performance.now();
function loop(now: number) {
  const t = (now - t0) / 1000;
  const vh = innerHeight;
  cur.x += (target.x - cur.x) * 0.06;
  cur.y += (target.y - cur.y) * 0.06;
  if (heroVisible) heroScene(t, vh);
  if (tilt && tiltVisible && !reduce) {
    const tf = `rotateX(${(6 - cur.y * 6).toFixed(2)}deg) rotateY(${(-8 + cur.x * 10).toFixed(2)}deg)`;
    if (tf !== lastTilt) tilt.style.transform = lastTilt = tf;
  }
  if (scrollY !== lastScroll || vh !== lastVh) {
    lastScroll = scrollY;
    lastVh = vh;
    sections(vh);
  }
  requestAnimationFrame(loop);
}
requestAnimationFrame(loop);

