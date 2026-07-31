# Markdown to Knowledge Site

## Conversion Rules

- Preserve Markdown headings, prose, code fences, tables, and callouts.
- Map numbered chapter links to site routes.
- Map `examples/*.py` and `../../src/...` links to GitHub blob URLs.
- Fail on any relative link that does not match a known pattern.

## Example Code

Use one of these patterns:

1. Inline lesson code: keep it as fenced Markdown in `content/*.md`.
2. Standalone sample file: add a `resources` entry in `content.manifest.json`.
3. Downloadable static file: place it under `public/` and link it with an absolute path.

Example resource entry:

```json
{
  "label": "Example: `01_real_model_agent.py`",
  "url": "https://github.com/ljxpython/open_deep_research/blob/main/docs/langgraph-langchain-learning/examples/01_real_model_agent.py"
}
```

## Validation Order

1. `npm run assets:check`
2. `npm test`
3. `npm run build`
4. Browser smoke test on desktop and mobile
