---
title: "A Small System for Explaining Complex Things"
description: "How to structure a knowledge site so readers can learn without fighting the interface."
collection: "foundations"
section: "Orientation"
order: 1
published: true
resources:
  - label: "Project repository"
    url: "https://github.com/ljxpython/knowledge-site-template"
  - label: "Local UTF-8 Python example"
    url: "/knowledge-site-template/examples/utf8-example.py"
---

## The promise

A knowledge site works when the author can focus on the explanation and the reader can focus on the idea. The page structure, type scale, navigation, and deployment should be solved once by the template.

> The template is opinionated on structure, not on subject matter.

## The input contract

Each lesson is a Markdown file. Its title, section, order, and publication state live directly in its Frontmatter. Adding a lesson requires no configuration outside the file.

```text
content/
  welcome.md
  writing-a-lesson.md
```

This keeps authoring friction zero. Adding a lesson does not require editing an Astro component.

## The reader's path

1. Start on the grouped index.
2. Open one focused lesson.
3. Use the contents rail for long pages.
4. Continue with the next lesson.
5. Use fast static search anytime with `Ctrl + K`.
