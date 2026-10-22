type Options = { hover?: boolean; onPick?: (index: number) => void };

export function bindSelect(group: string, { hover = false, onPick }: Options = {}) {
  const options = document.querySelectorAll<HTMLElement>(`[data-pick="${group}"]`);
  const panes = document.querySelectorAll<HTMLElement>(`[data-pane="${group}"]`);

  const pick = (index: number) => {
    options.forEach((el) => {
      const on = Number(el.dataset.i) === index;
      el.toggleAttribute('data-on', on);
      el.setAttribute('aria-pressed', String(on));
    });
    panes.forEach((el) => (el.hidden = Number(el.dataset.i) !== index));
    onPick?.(index);
  };

  options.forEach((el) => {
    const index = Number(el.dataset.i);
    el.addEventListener('click', () => pick(index));
    if (hover) el.addEventListener('mouseenter', () => pick(index));
  });

  document.addEventListener('select', (e) => {
    const { detail } = e as CustomEvent<{ group: string; index: number }>;
    if (detail.group === group) pick(detail.index);
  });
}
