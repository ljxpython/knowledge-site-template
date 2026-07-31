# A Small System for Explaining Complex Things

## The promise

A knowledge site works when the author can focus on the explanation and the reader can focus on the idea. The page structure, type scale, navigation, and deployment should be solved once by the template.

> The template is opinionated on structure, not on subject matter.

## The input contract

Each lesson is a Markdown file. Its title, section, order, and publication state live in `content.manifest.json`. The build merges that metadata into generated content collections.

```text
content/
  welcome.md
  writing-a-lesson.md
```

This keeps the page code clean. Adding a lesson does not require editing an Astro component.

## The reader's path

1. Start on the grouped index.
2. Open one focused lesson.
3. Use the contents rail for long pages.
4. Continue with the next lesson.

That is enough for a first version. Search, accounts, and a CMS are separate problems.
