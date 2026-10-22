# Desenvolvimento

## Stack

- [Astro](https://astro.build) 7, estático, com TypeScript.
- Tailwind CSS v4 (tokens em `@theme` no `src/styles/global.css`) + `@tailwindcss/typography` nos
  cases e no blog.
- Fontes hospedadas no próprio site via `@fontsource` (Bricolage Grotesque, Familjen Grotesk,
  JetBrains Mono).
- Interações em TypeScript puro, sem framework de UI. As imagens passam pelo `astro:assets`
  (WebP com `srcset`).
- Node pinado no `.mise.toml`.

## Rodando

```sh
npm install
npm run dev        # http://localhost:4321
npm run build      # gera ./dist
npm run preview    # serve o build
npx astro check    # tipos e templates
```

## Estrutura

```
src/
  pages/index.astro            página única: compõe as seções
  pages/projetos/[slug].astro  página de case de cada projeto
  pages/blog/                  blog (posts em src/content/blog)
  layouts/Base.astro           <head>, tema sem flash, nav, paleta, rodapé
  components/                  uma seção por componente (Hero, Projects, Solutions, Tech, Timeline, Contact…)
  content/projects/*.mdx       cases (o schema fica em src/content.config.ts)
  data/                        textos e dados das seções (site, soluções, tecnologias, trajetória, código do hero)
  scripts/                     interações: base (todas as páginas), home, motion, name, palette, select, contact
  assets/projects/             prints dos projetos (desktop 1878×924, mobile 326×714)
```

## Editando o conteúdo

| O quê | Onde |
|---|---|
| Nome, posicionamento, e-mail, Formspree, links | `src/data/site.ts` |
| Seções da nav e da paleta | `sections` em `src/data/site.ts` |
| Soluções | `src/data/solutions.ts` |
| Tecnologias e o texto de cada uma | `src/data/tech.ts` |
| Trajetória (datas, textos, destaques) | `src/data/timeline.ts` |
| Escala da trajetória (anos mais largos ou estreitos) | `YEAR_WEIGHT` em `src/data/timeline.ts` |
| Projetos e cases | `src/content/projects/*.mdx` (modelo em `_template.mdx.example`) |
| Depoimentos (seção oculta) | `src/components/Testimonials.astro`; para exibir, volte o componente no `index.astro` e a seção `depoimentos` no `site.ts` |

Regra de conteúdo: nunca citar empregadores nem produtos internos; descrever pelo tipo de empresa e
pelo resultado.

## Animações e performance

Um único `requestAnimationFrame` em `src/scripts/motion.ts` cuida da cena do hero, da inclinação do
palco de projetos, do reveal das seções, das barras da trajetória e do scrollspy. As regras:

- cada animação só roda quando está visível (`IntersectionObserver`); reveal, barras e scrollspy só
  recalculam quando a rolagem ou o tamanho da janela mudam;
- todas as medidas são lidas antes de qualquer escrita, para não forçar layout;
- só `transform`, `opacity` e `clip-path` são animados, e só quando o valor muda;
- `prefers-reduced-motion` desliga a digitação, o movimento da cena, o reveal e a reescrita do nome.

A reescrita periódica do nome fica em `src/scripts/name.ts` (`PAUSE` e `GAP` controlam o ritmo).

## Formulário de contato

Envia pelo [Formspree](https://formspree.io) (endpoint em `formspree` no `src/data/site.ts`). Sem
endpoint, o formulário avisa que ainda está sendo configurado em vez de fingir que enviou.

## Deploy

Cada push na `main` dispara `.github/workflows/deploy.yml`, que faz o build e publica no GitHub Pages
(Settings → Pages → Source: GitHub Actions). Para ir a um domínio próprio, troque `site` no
`astro.config.mjs`; o código não depende do domínio.
