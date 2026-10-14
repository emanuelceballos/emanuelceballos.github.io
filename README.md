# emanuelceballos.github.io

Personal site of Emanuel Ceballos (🇦🇷). Built with [Astro](https://astro.build) on the MIT-licensed [AstroPaper](https://github.com/satnaing/astro-paper) theme, deployed to GitHub Pages with GitHub Actions.

## Run locally

```bash
pnpm install
pnpm dev        # http://localhost:4321
pnpm build      # production build + search index
```

Requires Node 22.12+.

## Publish a post

1. Copy `src/content/posts/_template-case-study.md` to a new file (without the `_`).
2. Write it. Clients are always anonymized.
3. Complete the checklist inside the template.
4. Set `draft: false` **and** `reviewed: true`. The build fails if a non-draft post is not reviewed.
5. Push to `main`: the site deploys automatically.

## First deployment

1. Create the **public** repo `emanuelceballos/emanuelceballos.github.io` on GitHub.
2. Push this folder to `main`.
3. In the repo: Settings → Pages → Source: **GitHub Actions**.

## Rules of the house

- Drafts and anything reserved stay in a **private** repo; a deleted commit still lives in public history.
- Content: CC BY 4.0. Code: MIT.
