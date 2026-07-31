# Write One Lesson, Not a Wall of Text

## One lesson, one outcome

Write a lesson around a single result the reader can reach. Lead with the reason, introduce the mechanism, then show the smallest runnable example.

## Keep headings useful

Use `##` for the major steps a reader may want to revisit. Use `###` only when a section genuinely has sub-steps. The table of contents is generated from those headings.

## Treat examples as teaching tools

```ts
const lesson = {
  outcome: 'The reader can apply one idea',
  scope: 'One focused page',
};
```

| Element | Rule |
| --- | --- |
| Paragraphs | Keep them short enough to scan. |
| Quotes | Use them for an important constraint or definition. |
| Images | Put files in `public/imgs/` and reference them as `/imgs/name.png`. |
| PDFs | Put files in `public/pdfs/` and link them from a resource entry. |

> A consistent input contract is what makes a template low-effort to reuse.
