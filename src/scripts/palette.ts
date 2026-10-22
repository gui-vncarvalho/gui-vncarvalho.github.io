import { goTo, isDark, toast, toggleTheme } from './ui';

type Link = { label: string; href: string };
type Data = {
  sections: { id: string; label: string }[];
  projects: { slug: string; title: string }[];
  linkedin: Link;
  github: Link;
};
type Command = { group: string; label: string; hint: string; run: () => void };

const root = document.querySelector<HTMLElement>('[data-palette]')!;
const input = root.querySelector<HTMLInputElement>('[data-palette-input]')!;
const list = root.querySelector<HTMLUListElement>('#cmd-list')!;
const empty = root.querySelector<HTMLElement>('[data-palette-empty]')!;
const data: Data = JSON.parse(root.querySelector('[data-palette-data]')!.textContent!);

const norm = (s: string) => s.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '');
const openUrl = (href: string) => window.open(href, '_blank', 'noopener');

function span(className: string, text = '') {
  const el = document.createElement('span');
  el.className = className;
  el.textContent = text;
  return el;
}

function pickProject(index: number, slug: string) {
  if (!document.getElementById('projetos')) {
    location.href = `/projetos/${slug}`;
    return;
  }
  document.dispatchEvent(new CustomEvent('select', { detail: { group: 'proj', index } }));
  goTo('projetos');
}

function commands(): Command[] {
  const all: Command[] = [
    ...data.sections.map((s) => ({ group: 'IR PARA', label: s.label, hint: `#${s.id}`, run: () => goTo(s.id) })),
    ...data.projects.map((p, i) => ({ group: 'PROJETO', label: p.title, hint: 'abrir', run: () => pickProject(i, p.slug) })),
    {
      group: 'AÇÃO',
      label: isDark() ? 'Mudar para tema claro' : 'Mudar para tema escuro',
      hint: 'tema',
      run: toggleTheme,
    },
    { group: 'AÇÃO', label: 'Abrir LinkedIn', hint: data.linkedin.label, run: () => openUrl(data.linkedin.href) },
    { group: 'AÇÃO', label: 'Abrir GitHub', hint: data.github.label, run: () => openUrl(data.github.href) },
    { group: 'AÇÃO', label: 'Escrever uma mensagem', hint: '#contato', run: () => goTo('contato') },
  ];
  const q = norm(input.value.trim());
  if (q.startsWith('sudo')) {
    const sudo = {
      group: 'SUDO',
      label: 'sudo contratar',
      hint: 'permissão concedida',
      run: () => {
        goTo('contato');
        toast('permission granted. contratando Guilherme Carvalho…');
      },
    };
    return [sudo, ...all];
  }
  return all.filter((c) => !q || norm(`${c.label} ${c.group}`).includes(q));
}

let items: Command[] = [];
let selected = 0;
let lastFocus: Element | null = null;

function render() {
  items = commands();
  selected = Math.min(selected, Math.max(0, items.length - 1));
  list.replaceChildren(
    ...items.map((c, i) => {
      const li = document.createElement('li');
      li.id = `cmd-${i}`;
      li.role = 'option';
      li.ariaSelected = String(i === selected);
      li.className =
        'flex items-center justify-between gap-3 rounded-[14px] px-3.5 py-3 aria-selected:bg-yellow aria-selected:text-ink';
      const title = span('flex items-baseline gap-3');
      title.append(span('min-w-[78px] font-mono text-[11px] font-medium opacity-75', c.group), span('text-[17px] font-bold', c.label));
      li.append(title, span('font-mono text-xs font-medium opacity-80', c.hint));
      li.addEventListener('mouseenter', () => select(i));
      li.addEventListener('click', () => run(i));
      return li;
    }),
  );
  empty.hidden = items.length > 0;
  input.setAttribute('aria-activedescendant', items.length ? `cmd-${selected}` : '');
}

function select(i: number) {
  selected = i;
  list.querySelectorAll('[role=option]').forEach((el, j) => (el.ariaSelected = String(j === i)));
  input.setAttribute('aria-activedescendant', `cmd-${i}`);
  const li = list.children[i] as HTMLElement | undefined;
  if (!li) return;
  if (li.offsetTop < list.scrollTop) list.scrollTop = li.offsetTop - 8;
  else if (li.offsetTop + li.offsetHeight > list.scrollTop + list.clientHeight)
    list.scrollTop = li.offsetTop + li.offsetHeight - list.clientHeight + 8;
}

function run(i: number) {
  const c = items[i];
  close();
  c?.run();
}

export function open() {
  lastFocus = document.activeElement;
  input.value = '';
  selected = 0;
  render();
  root.hidden = false;
  input.focus();
}

function close(restoreFocus = false) {
  root.hidden = true;
  if (restoreFocus) (lastFocus as HTMLElement | null)?.focus?.();
}

input.addEventListener('input', () => {
  selected = 0;
  render();
});

root.addEventListener('click', (e) => {
  if (e.target === root) close(true);
});

document.querySelectorAll('[data-palette-open]').forEach((b) => b.addEventListener('click', open));

addEventListener('keydown', (e) => {
  if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
    e.preventDefault();
    root.hidden ? open() : close(true);
    return;
  }
  if (root.hidden) return;
  if (e.key === 'Escape') {
    e.preventDefault();
    close(true);
  } else if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
    e.preventDefault();
    const step = e.key === 'ArrowDown' ? 1 : -1;
    if (items.length) select(Math.max(0, Math.min(items.length - 1, selected + step)));
  } else if (e.key === 'Enter') {
    e.preventDefault();
    run(selected);
  } else if (e.key === 'Tab') {
    e.preventDefault();
    input.focus();
  }
});
