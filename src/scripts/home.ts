import './motion';
import './name';
import './contact';
import { bindSelect } from './select';
import { easeOut, reducedMotion } from './ui';

const stage = document.querySelector<HTMLElement>('[data-stage]');
const layers = [...document.querySelectorAll<HTMLElement>('[data-layer]')];
const stages = JSON.parse(stage?.dataset.stages ?? '[]') as string[];

bindSelect('proj', {
  onPick(index) {
    layers.forEach((el, i) => (el.dataset.pos = i === index ? 'on' : i < index ? 'before' : 'after'));
    if (stage && stages[index]) stage.dataset.stage = stages[index];
  },
});
bindSelect('tech', { hover: true });
bindSelect('tl');

const counters = [...document.querySelectorAll<HTMLElement>('[data-count]')];
if (!reducedMotion && counters.length) {
  const t0 = performance.now();
  const tick = (now: number) => {
    const k = easeOut(Math.min(1, (now - t0) / 2400));
    counters.forEach((el) => (el.textContent = String(Math.round(Number(el.dataset.count) * k))));
    if (k < 1) requestAnimationFrame(tick);
  };
  requestAnimationFrame(tick);
}
