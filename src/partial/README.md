# Partial Maintenance Guide

This folder uses `gulp-file-include` with `@@include`, `@@loop`, and `@@if`.

## Contract Comments

Add a contract comment at the top of every reusable partial:

```html
<!--
@partial shared/ui/_example
@required title
@optional id, href, icon
@variants mode: compact | full
@note Short maintenance note.
-->
```

- `@partial` is the stable lookup name.
- `@required` lists variables that callers should always pass.
- `@optional` lists supported optional variables.
- `@variants` lists accepted flag or mode values.
- `@note` explains hidden behavior, generated IDs, nested includes, or data-root expectations.

## Dependency Direction

- `src/html/**` can include `layouts`, `features`, and `shared`.
- `features/**` can include its own `unit/**` partials and `shared/**` partials.
- `shared/**` should not depend on `features/**` unless there is already legacy coupling that cannot be removed yet.
- `ui/**` should stay small and should avoid nested includes when possible.
- `unit/**` partials are private to their nearest feature.

## Audit

Run this after changing partials:

```bash
npm run audit:partials
```

Generated files:

- `docs/partial-map.md`
- `docs/partial-contracts.md`
- `docs/partial-usage.csv`

