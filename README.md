# Portfólio pessoal

Site de portfólio pessoal construído com [Astro](https://astro.build): cases de projetos, blog
técnico e uma página sobre/currículo. Feito para publicar no GitHub Pages e, mais adiante,
migrar para um domínio próprio (VPS).

## Stack

- Astro (TypeScript) — geração estática, zero JS por padrão.
- Tailwind CSS v4 (via `@tailwindcss/vite`) + `@tailwindcss/typography` para o conteúdo em
  Markdown/MDX.
- Content Collections (`src/content.config.ts`) para `blog` e `projects`.
- `@astrojs/mdx`, `@astrojs/sitemap`, `@astrojs/rss`.
- Node pinado em `.mise.toml` (22.x) — se você usa [mise](https://mise.jdx.dev), a versão certa
  é selecionada automaticamente ao entrar na pasta.

## Rodando localmente

```sh
npm install
npm run dev       # http://localhost:4321
```

```sh
npm run build      # gera ./dist
npm run preview    # serve o build de produção localmente
```

## Como adicionar conteúdo

### Um novo post no blog

Crie um arquivo em `src/content/blog/nome-do-post.mdx` com o frontmatter:

```yaml
---
title: "Título do post"
description: "Resumo de 1 frase."
pubDate: 2026-08-01
tags: ["tag1", "tag2"]
draft: true # mude para false quando estiver pronto para publicar
---
```

Posts com `draft: true` não aparecem em `/blog` nem no RSS.

### Um novo case de projeto

Copie `src/content/projects/_template.mdx.example` para `src/content/projects/nome-projeto.mdx`
(sem o `_` e sem `.example`) e preencha os campos. Esse arquivo template documenta todos os
campos do schema e tem lembretes sobre quais projetos ainda precisam de autorização antes de
virar case público.

## Antes do primeiro deploy

1. Edite `astro.config.mjs` e troque o campo `site` pelo seu domínio real (ex:
   `https://seu-usuario.github.io`).
2. Preencha os `TODO`s em `src/pages/index.astro`, `src/pages/about.astro` e
   `src/pages/contact.astro` (bio, experiência, links de contato).
3. Revise o case `src/content/projects/ateliedamente.mdx` (está com `draft: true`) e troque
   `draft` para `false` quando estiver pronto para publicar, com screenshots reais.

## Deploy no GitHub Pages

O workflow em `.github/workflows/deploy.yml` já faz o build e publica automaticamente a cada
push na branch `main`. Passos manuais (únicos, feitos uma vez, direto no GitHub):

1. Crie o repositório `seu-usuario.github.io` no GitHub (nome exato — é isso que ativa o Pages
   na raiz do domínio, sem precisar de `base` path no Astro).
2. Faça o push deste projeto para esse repositório.
3. Em **Settings → Pages**, em "Build and deployment", selecione **GitHub Actions** como fonte.
4. O site fica disponível em `https://seu-usuario.github.io` a cada push em `main`.

Migrar para um VPS depois é só copiar o conteúdo de `dist/` (gerado por `npm run build`) para
onde o Nginx/Apache serve os arquivos estáticos — nenhuma mudança de código é necessária.

## Caminho de expansão

Este projeto começa 100% estático de propósito, mas Astro não é um beco sem saída:

- Dá pra adicionar componentes React/Vue/Svelte isolados ("islands") sem reescrever o site,
  quando precisar de algo interativo.
- Dá pra migrar para SSR com um adapter (`@astrojs/node`, por exemplo) se um dia você quiser
  backend próprio — formulário de contato com servidor, área logada, admin — sem trocar de
  framework.
