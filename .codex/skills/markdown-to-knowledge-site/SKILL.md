---
name: markdown-to-knowledge-site
description: Convert Markdown documentation trees into a static site with knowledge-site-template. Use when importing chapters into this template, rewriting links, mapping sections and resources, preserving code blocks, or validating the generated site.
---

# Markdown To Knowledge Site

## Workflow

1. Read the source README and chapter set first. Extract section names, chapter order, resource links, and any reader-run warnings.
2. Copy `knowledge-site-template` into a separate target directory. Never edit the source docs repo or the reusable template in place.
3. Update `site.config.ts`, `content.manifest.json`, and the import script together so the base path, titles, and sections stay aligned.
4. Import Markdown into `content/*.md` with headings, tables, fenced code blocks, and prose preserved.
5. Rewrite links deterministically:
   - numbered chapter `.md` links -> site `/docs/<slug>/` routes
   - `examples/*.py` and `../../src/...` links -> GitHub blob URLs for the source repo
   - unsupported relative links -> fail fast
6. Keep example code as fenced Markdown when it is part of the lesson. Use `resources` for standalone sample files, downloads, or external references.
7. Validate with asset checks, tests, build, and a browser smoke test. If the homepage title is too large, tune the shared hero typography in `src/styles/global.css` instead of adding page-specific hacks.

## Guardrails

- Do not execute imported code, model calls, search, or MCP during import, validation, build, or preview.
- Prefer the template’s existing manifest/resources pipeline over custom content plumbing.
