# Markdown to Knowledge Site

## Conversion Rules

- Preserve Markdown headings, prose, code fences, tables, and callouts.
- Map numbered chapter links to site routes.
- Map `examples/*.py` and `../../src/...` links to GitHub blob URLs.
- Fail on any relative link that does not match a known pattern.

## Example Code

Use one of these patterns:

1. Inline lesson code: keep it as fenced Markdown in `content/*.md`.
2. Standalone site-local source file: place it below `public/` and add a `resources` entry using the configured `site.base`. Whitelisted code extensions render as UTF-8, collapsible source.
3. External sample or downloadable static file: add a `resources` entry using its absolute URL.

Example resource entry:

```json
{
  "label": "Example: `01_real_model_agent.py`",
  "url": "/your-site-base/examples/01_real_model_agent.py"
}
```

For a large course, give each document a `section` and set `sectionMode: "collapsible"` on the collection. The homepage and collection page then disclose groups by section, and document navigation stays inside the current section.

## Validation Order

1. `npm run assets:check`
2. `npm test`
3. `npm run build`
4. Browser smoke test on desktop and mobile, including local UTF-8 code and section navigation boundaries when enabled
