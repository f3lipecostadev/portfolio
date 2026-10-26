# Portfólio — Felipe Costa

Portfólio pessoal feito com **Next.js (App Router) + TypeScript + Tailwind CSS v4**.
Site 100% estático, com conteúdo em Markdown, blog com tags e foco em acessibilidade.

## Como rodar

Requisitos: **Node.js 20.9 ou superior** (recomendado 22; há um `.nvmrc`) e **npm**.

```bash
npm install        # instala as dependências
npm run dev        # desenvolvimento em http://localhost:3000
npm run build      # build de produção
npm run start      # serve o build em http://localhost:3000
```

Outros comandos: `npm run check` (lint + tipos + formatação, o mesmo que o CI), `npm run lint`, `npm run typecheck` e `npm run format`.

Copie `.env.example` para `.env.local` se quiser definir variáveis localmente.

## Onde editar cada coisa

| O que mudar                                 | Arquivo / pasta                                    |
| ------------------------------------------- | -------------------------------------------------- |
| Nome, e-mail, redes sociais, links do menu  | `src/config/site.ts`                               |
| Textos do Hero, Sobre e Contato             | `src/components/sections/{Hero,About,Contact}.tsx` |
| Skills (lista do Sobre)                     | `skills` em `src/components/sections/About.tsx`    |
| Experiências                                | `content/jobs/*.md`                                |
| Projetos em destaque (com imagem)           | `content/featured/*.md`                            |
| Outros projetos + tabela do Archive         | `content/projects/*.md`                            |
| Posts do blog                               | `content/posts/*.md`                               |
| Paleta de cores e tipografia                | topo de `src/app/globals.css` (`@theme`)           |
| Foto, currículo, imagem de compartilhamento | `public/`                                          |

### Adicionar uma experiência

Crie `content/jobs/empresa.md`. O campo `order` define a posição (1 = mais recente):

```md
---
order: 2
title: 'Cargo'
company: 'Empresa'
location: 'Cidade - UF'
range: 'Jan 2025 – Dez 2025'
url: 'https://empresa.com'
---

- Atividade 1
- Atividade 2
```

### Adicionar um projeto

Os projetos **não são importados automaticamente do GitHub**: cada um é um arquivo Markdown. Ao criar um repositório novo, crie também `content/projects/nome.md` com o link dele. Com `showInProjects: true` ele aparece no grid da home; com `false`, só na página `/archive`. O campo `date` (`'AAAA-MM-DD'`) é opcional.

```md
---
title: 'Meu projeto'
date: '2026-10-01'
company: 'IFMA'
tech: ['React', 'TypeScript']
github: 'https://github.com/usuario/projeto'
external: 'https://projeto.vercel.app'
showInProjects: true
---

Descrição curta do projeto.
```

### Projeto em destaque

Coloque a captura de tela em `public/images/projects/` (proporção ~16:9, ex.: 1400×800) e aponte em `cover:` no arquivo de `content/featured/`.

### Só repositórios públicos aparecem

Durante o `build` (e no `npm run dev`), o site verifica cada projeto que tem o campo `github:`. Se o repositório **não for público** (ou não existir), o projeto é **ocultado automaticamente** do grid, do Archive e do destaque, e o log mostra um aviso:

```
[content] "f3lipecostadev/nome-do-repo" não é público: ocultado do site.
```

- Para esconder um projeto: deixe o repositório privado no GitHub **e apague o arquivo `.md` dele** em `content/`. Se o repositório do portfólio for público, o nome do projeto ficaria visível no código.
- Depois de mudar a visibilidade de um repositório, faça um novo deploy para o site refletir.
- Se o GitHub não puder ser consultado na hora do build (rede ou limite de requisições), o projeto é mantido e o log avisa.
- Projetos sem `github:` não são verificados e aparecem sempre (como o Portfólio Pessoal, enquanto não tem link).
- Para o **Portfólio Pessoal**: depois de publicar este código no GitHub, adicione `github: 'https://github.com/f3lipecostadev/NOME-DO-REPO'` em `content/projects/portfolio.md`.

### Novo post

O blog só existe quando há ao menos um post publicado: sem posts, `/diario` devolve 404 e some do sitemap. Para ativá-lo, crie `content/posts/meu-post.md` (a pasta pode ser criada junto):

```md
---
title: 'Título do post'
description: 'Resumo de uma ou duas linhas.'
date: '2026-11-01'
tags: ['Next.js', 'Carreira']
draft: false
---

Texto em Markdown. Blocos de código recebem realce de sintaxe.
```

O nome do arquivo vira a URL (`/diario/meu-post`). Use `draft: true` para esconder um rascunho. O blog não aparece no menu; para linkar, acrescente `{ name: 'Diário', url: '/diario' }` em `navLinks`, no `src/config/site.ts`.

## Imagens a substituir

- `public/images/projects/body-signs.jpg` — capa do Body Signs (proporção 1400×800).
- `public/images/me.jpg` — foto exibida na seção Sobre (quadrada).
- `public/curriculo.pdf` — botão "Currículo" (uma página, texto selecionável, sem telefone). Para atualizá-lo, substitua o arquivo.
- `public/og.png` — imagem exibida ao compartilhar o link (1200×630).

## Deploy na Vercel

1. Suba o projeto para um repositório no GitHub (veja o fluxo em [CONTRIBUTING.md](CONTRIBUTING.md)).
2. Na Vercel, **Add New → Project** e importe o repositório. O Next.js é detectado automaticamente.
3. Em **Settings → Environment Variables**, defina `NEXT_PUBLIC_SITE_URL` (ambiente **Production**) com o endereço final. Isso corrige o sitemap, o robots.txt e a imagem de compartilhamento.
4. Em **Settings → Git**, confirme que a **Production Branch** é `main`.
5. A partir daí: merge na `main` publica em produção, e cada Pull Request gera uma **URL de preview**.

## Estrutura

```
portfolio-felipe/
├── content/                 # Conteúdo em Markdown (jobs, featured, projects, posts)
├── public/                  # Arquivos estáticos (foto, currículo, ícones, og.png)
├── src/
│   ├── app/                 # Rotas: home, /archive, /diario, 404, sitemap, robots, manifest
│   ├── components/
│   │   ├── layout/          # AppShell, Loader, Nav, Menu, Side, Footer...
│   │   ├── sections/        # Hero, About, Jobs, Featured, Projects, Contact
│   │   └── ui/              # Icon, Reveal, PostCards
│   ├── config/site.ts       # Dados centrais do site
│   ├── hooks/               # useScrollDirection, usePrefersReducedMotion, useOnClickOutside
│   ├── lib/                 # content.ts (leitura do Markdown), markdown.ts, utils.ts
│   └── types/content.ts     # Tipos TypeScript do conteúdo
├── .husky/ .prettierrc .editorconfig .nvmrc
└── next.config.ts
```

## Funcionalidades

Loader animado · navegação que esconde ao rolar · menu mobile com focus trap e ESC · barras laterais (redes e e-mail) · títulos numerados · abas de experiência acessíveis (setas do teclado) · destaque alternado com efeito duotone · grid com "Mostrar mais" · página Archive · blog com tags e realce de código · página 404 · SEO (Open Graph, sitemap, robots, manifest) · `prefers-reduced-motion` · "Pular para o conteúdo".

## Contador de stars/forks (opcional)

Em `src/config/site.ts`, preencha `githubRepo: 'usuario/repositorio'` para exibir stars e forks no rodapé (somente em produção).

## Fluxo de trabalho

Branches curtas, commits no padrão Conventional Commits, Pull Requests com CI e Squash and merge. As regras completas, os hooks do Git e o processo de releases estão em [CONTRIBUTING.md](CONTRIBUTING.md).

## Créditos e licença

- O código é distribuído sob a licença MIT ([LICENSE](LICENSE)). Textos, fotos, currículo e demais conteúdo pessoal (`content/` e `public/`) pertencem a Felipe Kauã de Sousa Costa e não estão cobertos por essa licença.
- Este projeto reaproveita ideias de design e partes da organização de estilos do portfólio de Brittany Chiang, publicado sob licença MIT. O aviso completo está em [NOTICE](NOTICE).
- Construído com Next.js, React, Tailwind CSS, unified/remark/rehype, Inter e Fira Code (via Fontsource).
