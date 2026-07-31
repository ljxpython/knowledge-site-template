# Knowledge Site Template

A Markdown-first Astro template for courses, technical notes, and explainers. Write content and a little configuration; the site provides the reading layout, navigation, theme switcher, and GitHub Pages deployment.

Repository: https://github.com/ljxpython/knowledge-site-template

This repository is configured as a GitHub Template Repository. Use **Use this template** on GitHub to start a new knowledge site.

## What You Edit

```text
site.config.ts          Site name, author, URLs, base path, links
content.manifest.json  Section order and document metadata
content/*.md            Markdown lesson bodies
public/imgs/            Images referenced as /imgs/file.png
public/pdfs/            Optional PDFs referenced as /pdfs/file.pdf
.codex/skills/markdown-to-knowledge-site/
                        Repo-local Codex skill source for Markdown-to-site imports
```

The reusable UI lives under `src/`. You should not need to edit it to add a lesson.

## Start

```bash
npm install
npm run dev
```

Before publishing:

```bash
npm run assets:check
npm test
npm run build
npm run preview
```

## Add a Lesson

1. Create `content/my-lesson.md` with one H1 and useful H2/H3 headings.
2. Add a `my-lesson` entry to `content.manifest.json`.
3. Set `published` to `true`.
4. Run `npm run dev`.

The manifest requires `title`, `description`, `section`, integer `order`, and boolean `published`. The build rejects invalid or unknown sections.

```json
{
  "title": "My lesson",
  "description": "What the reader will learn.",
  "section": "foundations",
  "order": 3,
  "published": true
}
```

## Assets

Use absolute public paths in Markdown:

```md
![Diagram](/imgs/diagram.png)
[Download PDF](/pdfs/lesson.pdf)
```

`npm run assets:check` rejects missing local `/imgs/` and `/pdfs/` references.

## Example Code

Keep example code in the lesson body as fenced Markdown blocks.

For standalone sample files, add a `resources` entry in `content.manifest.json` and point it at a GitHub blob URL or another absolute URL:

```json
{
  "label": "Example: `01_real_model_agent.py`",
  "url": "https://github.com/ljxpython/open_deep_research/blob/main/docs/langgraph-langchain-learning/examples/01_real_model_agent.py"
}
```

For files you want to serve from the site itself, put them under `public/` and link them with an absolute path.

## GitHub Pages

1. Set `url`, `base`, `repositoryUrl`, and links in `site.config.ts`.
2. Push to `main`.
3. In GitHub repository settings, set Pages source to **GitHub Actions**.

The included workflow builds `dist/` and deploys it automatically.

## License

MIT
