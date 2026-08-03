# Knowledge Site Template

A Markdown-first Astro template for courses, technical notes, and explainers. Write content and a little configuration; the site provides the reading layout, navigation, theme switcher, and GitHub Pages deployment.

Repository: https://github.com/ljxpython/knowledge-site-template

This repository is configured as a GitHub Template Repository. Use **Use this template** on GitHub to start a new knowledge site.

## What You Edit

```text
site.config.ts          Site name, author, URLs, base path, links
content.manifest.json  Collection order and document metadata
content/*.md            Markdown lesson bodies
public/imgs/            Images referenced as /imgs/file.png
public/pdfs/            Optional PDFs referenced as /pdfs/file.pdf
public/examples/        Standalone UTF-8 source files published with the site
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

The manifest requires each document to declare `collection`, `title`, `description`, integer `order`, and boolean `published`. `section` is optional and is used as a label inside the collection. The build rejects invalid or unknown collections.

```json
{
  "collection": "foundations",
  "title": "My lesson",
  "description": "What the reader will learn.",
  "section": "Basics",
  "order": 3,
  "published": true
}
```

Collections are flat by default. For a large course, add `sectionMode: "collapsible"` to its collection entry. The homepage then keeps its documents collapsed, the collection page groups documents by `section`, and previous/next links stay inside each section.

```json
{
  "id": "foundations",
  "title": "Foundations",
  "description": "Start here.",
  "order": 1,
  "sectionMode": "collapsible"
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

For a site-local source file, put it under `public/` and use the configured `site.base` in its resource URL. Whitelisted code files (`.py`, `.js`, `.mjs`, `.ts`, `.tsx`, `.jsx`) appear as UTF-8, collapsible code blocks; other local files remain links.

```json
{
  "label": "Example: utf8-example.py",
  "url": "/knowledge-site-template/examples/utf8-example.py"
}
```

Run `npm test` after adding a local resource. The content preparation step rejects missing files, base-mismatched URLs, and path traversal.

## GitHub Pages

1. Set `url`, `base`, `repositoryUrl`, and links in `site.config.ts`.
2. Push to `main`.
3. In GitHub repository settings, set Pages source to **GitHub Actions**.

The included workflow builds `dist/` and deploys it automatically.

## License

MIT
