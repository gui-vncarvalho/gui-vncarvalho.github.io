import { reducedMotion } from './ui';

const PAUSE = 9000;
const GAP = 350;
const EASE = 'cubic-bezier(0.33, 1, 0.68, 1)';

const hero = document.querySelector('#inicio');
const letters = [...document.querySelectorAll<HTMLElement>('[data-letter]')];
const entryDelay = (el: HTMLElement) => (parseFloat(el.style.animationDelay) - 0.1) * 1000;
let visible = true;

const wait = (ms: number) => new Promise((r) => setTimeout(r, ms));
const finished = (animations: Animation[]) => Promise.all(animations.map((a) => a.finished));

function erase() {
  const last = letters.length - 1;
  return letters.map((el, i) =>
    el.animate([{ transform: 'translateY(-40px) rotateX(50deg)', opacity: 0 }], {
      duration: 380,
      delay: (last - i) * 45,
      easing: 'ease-in',
      fill: 'forwards',
    }),
  );
}

function write() {
  return letters.map((el) =>
    el.animate([{ transform: 'translateY(70px) rotateX(-50deg)', opacity: 0 }, { transform: 'none', opacity: 1 }], {
      duration: 700,
      delay: entryDelay(el),
      easing: EASE,
      fill: 'backwards',
    }),
  );
}

async function rewrite() {
  await wait(PAUSE);
  if (visible && !document.hidden) {
    const erased = erase();
    await finished(erased);
    await wait(GAP);
    const written = write();
    erased.forEach((a) => a.cancel());
    await finished(written);
  }
  rewrite();
}

if (!reducedMotion && hero && letters.length) {
  new IntersectionObserver(([entry]) => (visible = entry.isIntersecting)).observe(hero);
  rewrite();
}
