import { toast } from './ui';

const form = document.querySelector<HTMLFormElement>('[data-contact]');
const error = form?.querySelector<HTMLElement>('[data-contact-error]');
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validate(f: HTMLFormElement) {
  const name = f.elements.namedItem('nome') as HTMLInputElement;
  const email = f.elements.namedItem('email') as HTMLInputElement;
  const problems: [HTMLInputElement, string][] = [];
  if (!name.value.trim()) problems.push([name, 'Me diz seu nome.']);
  if (!EMAIL.test(email.value.trim())) problems.push([email, 'Confere o e-mail? Preciso dele para responder.']);
  [name, email].forEach((el) => el.toggleAttribute('aria-invalid', problems.some(([p]) => p === el)));
  return problems;
}

form?.addEventListener('submit', async (e) => {
  e.preventDefault();
  const button = form.querySelector('button[type=submit]') as HTMLButtonElement;
  const problems = validate(form);
  error!.textContent = problems.map(([, msg]) => msg).join(' ');
  if (problems.length) {
    problems[0][0].focus();
    return;
  }
  const endpoint = form.dataset.endpoint;
  if (!endpoint) {
    toast('O formulário ainda está sendo configurado. Me chama pelo LinkedIn enquanto isso.');
    return;
  }
  const label = button.textContent;
  button.disabled = true;
  button.textContent = 'Enviando…';
  try {
    const res = await fetch(endpoint, { method: 'POST', body: new FormData(form), headers: { Accept: 'application/json' } });
    if (!res.ok) throw new Error(String(res.status));
    form.reset();
    button.textContent = 'Mensagem enviada ✓';
    setTimeout(() => (button.textContent = label), 3500);
  } catch {
    error!.textContent = 'Não consegui enviar agora. Tenta de novo ou me chama pelo LinkedIn.';
    button.textContent = label;
  } finally {
    button.disabled = false;
  }
});
