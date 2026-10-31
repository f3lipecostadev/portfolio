# Fluxo de trabalho

Regras de versionamento deste repositório. Valem para qualquer pessoa que contribua, inclusive o próprio dono.

## Preparação

Requisitos: Node.js 22 (`.nvmrc`) e npm.

```bash
npm install   # instala as dependências e ativa os hooks do Git (Husky)
```

## Fluxo (GitHub Flow)

1. A branch `main` é sempre publicável: cada merge nela vai para produção na Vercel.
2. Nunca commite direto na `main`. Para qualquer mudança, crie uma branch curta:

   ```bash
   git switch main && git pull
   git switch -c feat/nome-curto
   ```

3. Faça commits pequenos e focados, seguindo o padrão abaixo.
4. Envie a branch e abra um Pull Request:

   ```bash
   git push -u origin feat/nome-curto
   ```

5. O CI roda (lint, tipos, formatação, build) e a Vercel gera uma **URL de preview**. Teste por ela.
6. Com tudo verde, faça **Squash and merge**. A branch é apagada automaticamente.
7. Volte para a `main` e atualize: `git switch main && git pull`.

## Nome das branches

`<tipo>/<descricao-curta-em-kebab-case>`, por exemplo `feat/pagina-sobre`, `fix/menu-mobile`, `docs/readme-deploy`.
O hook `pre-push` recusa nomes fora desse formato.

## Mensagens de commit

Seguem o [Conventional Commits](https://www.conventionalcommits.org/pt-br/v1.0.0/). O hook `commit-msg` valida.

```
<tipo>(<escopo opcional>): <descrição>
```

| Tipo       | Quando usar                                          |
| ---------- | ---------------------------------------------------- |
| `feat`     | nova funcionalidade, seção, página ou conteúdo       |
| `fix`      | correção de bug                                      |
| `docs`     | somente documentação                                 |
| `style`    | formatação, sem mudar o comportamento                |
| `refactor` | reorganização de código sem mudar o comportamento    |
| `perf`     | melhoria de desempenho                               |
| `test`     | testes                                               |
| `build`    | dependências e configuração de build                 |
| `ci`       | GitHub Actions e automações                          |
| `chore`    | tarefas de manutenção que não se encaixam nas outras |
| `revert`   | reversão de um commit anterior                       |

Escopos sugeridos: `config`, `content`, `layout`, `home`, `archive`, `blog`, `seo`, `deps`, `ci`.

Regras:

- Descrição no imperativo, em minúsculas, sem ponto final, com até 72 caracteres no título.
- Uma mudança lógica por commit.
- Mudança que quebra compatibilidade: acrescente `!` (`feat!: ...`) e explique no corpo da mensagem.
- Idioma: inglês é o recomendado, por ser o padrão do ecossistema. Use sempre o mesmo idioma no repositório.

Certo: `feat(blog): add tag pages` · `fix(layout): keep mobile menu above content` · `docs: update deploy steps`

Errado: `Ajustes` · `feat: Add Tag Pages.` · `update`

## Pull Requests

- O título do PR segue o mesmo padrão (com squash, ele vira a mensagem do commit na `main`). O CI valida.
- Preencha o template: o que muda, checklist e capturas de tela quando houver mudança visual.
- Um PR por assunto, pequeno o bastante para revisar de uma vez.

## Hooks locais

| Hook         | O que faz                                               |
| ------------ | ------------------------------------------------------- |
| `pre-commit` | roda ESLint e Prettier nos arquivos que estão no commit |
| `commit-msg` | valida a mensagem (Conventional Commits)                |
| `pre-push`   | valida o nome da branch e roda a checagem de tipos      |

Não use `--no-verify` para pular os hooks. O CI refaz as mesmas verificações.

## Comandos úteis

```bash
npm run dev           # desenvolvimento
npm run check         # lint + tipos + formatação (o mesmo que o CI)
npm run format        # formata todos os arquivos
npm run build         # build de produção
```

## Versionamento e releases

[Versionamento Semântico](https://semver.org/lang/pt-BR/): `MAJOR.MINOR.PATCH`. Para marcar uma versão:

```bash
npm version minor --no-git-tag-version   # ou patch / major
git switch -c chore/release-1.1.0
git commit -am "chore: release 1.1.0"
# abra o PR e faça o merge; depois, na main:
git tag -a v1.1.0 -m "v1.1.0" && git push origin v1.1.0
```

Depois crie a **Release** no GitHub a partir da tag e use "Generate release notes".

## Conteúdo pessoal

Textos, fotos e currículo ficam em `content/` e `public/`. Nunca versione projetos privados, dados de contato que você não queira expor nem segredos. O histórico do Git é permanente.
