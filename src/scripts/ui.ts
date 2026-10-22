export const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;

export const clamp01 = (v: number) => Math.max(0, Math.min(1, v));

export const easeOut = (k: number) => 1 - Math.pow(1 - k, 3);

export function goTo(id: string) {
  const el = document.getElementById(id);
  if (!el) {
    location.href = `/#${id}`;
    return;
  }
  const top = el.getBoundingClientRect().top + scrollY - 90;
  scrollTo({ top, behavior: reducedMotion ? 'auto' : 'smooth' });
  history.replaceState(null, '', `#${id}`);
}

let toastTimer: number | undefined;

export function toast(message: string) {
  const el = document.querySelector<HTMLElement>('[data-toast]');
  if (!el) return;
  el.textContent = message;
  clearTimeout(toastTimer);
  toastTimer = window.setTimeout(() => (el.textContent = ''), 3600);
}

export function toggleTheme() {
  const root = document.documentElement;
  const next = root.dataset.theme === 'light' ? 'dark' : 'light';
  root.dataset.theme = next;
  try {
    localStorage.setItem('gc-theme', next);
  } catch {}
}

export const isDark = () => document.documentElement.dataset.theme !== 'light';
