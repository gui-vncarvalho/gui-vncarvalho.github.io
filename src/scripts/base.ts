import './palette';
import { clamp01, goTo, toggleTheme } from './ui';

document.querySelector('[data-theme-toggle]')?.addEventListener('click', toggleTheme);

const progress = document.querySelector<HTMLElement>('[data-progress]')!;
const updateProgress = () => {
  const max = document.documentElement.scrollHeight - innerHeight;
  progress.style.width = `${clamp01(scrollY / Math.max(1, max)) * 100}%`;
};
addEventListener('scroll', updateProgress, { passive: true });
addEventListener('resize', updateProgress);
updateProgress();

document.addEventListener('click', (e) => {
  const link = (e.target as Element).closest<HTMLAnchorElement>('a[href^="/#"], a[href^="#"]');
  if (!link) return;
  const id = link.hash.slice(1);
  if (!document.getElementById(id)) return;
  e.preventDefault();
  goTo(id);
});

if (location.hash) {
  const id = location.hash.slice(1);
  addEventListener('load', () => document.getElementById(id) && goTo(id), { once: true });
}

console.log(
  '%c> sudo contratar',
  'font:700 16px monospace;color:#f5d90a;background:#1b0f3a;padding:8px 12px;border-radius:6px',
);
console.log('Curioso(a) por aqui? Abra a paleta com Ctrl/Cmd+K e digite "sudo".');
