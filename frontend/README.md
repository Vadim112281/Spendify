# Spendify — frontend

React + TypeScript + Vite + [Tailwind CSS v4](https://tailwindcss.com/) + [Biome](https://biomejs.dev/).

## `src` structure

```
src/
├── main.tsx          # entry
├── app/              # init, global styles, providers (PWA, state)
├── pages/            # screens (`pages/<name>/<Page>.tsx`, no barrel index)
├── features/         # business features (one folder per feature)
└── shared/
    ├── ui/           # buttons, inputs, UI kit
    ├── lib/          # utilities, helpers
    └── api/          # API client
```

Imports use the `@/` alias and point at files directly (no `index.ts` barrels), e.g. `@/app/App`, `@/pages/entry/EntryPage`, `@/shared/lib/twx`.

## Design tokens (Tailwind)

Tokens live in `src/app/styles/tokens.css` (`@theme`). Numbers match **px** where it makes sense:

| Token | Utility examples |
|-------|------------------|
| Font size | `text-14`, `text-28` |
| Spacing | `p-24`, `mb-20`, `gap-12` |
| Radius | `rounded-10`, `rounded-16` |
| Colors | `text-fg`, `text-heading`, `bg-surface`, `text-accent` |
| Layout | `max-w-card`, `shadow-card` |

Add new sizes in `tokens.css` once — reuse as `text-*` / `p-*`, not `text-[14px]`.

## Scripts

```bash
npm run dev        # dev server
npm run build      # production build
npm run preview    # preview production build
npm run lint       # check format + lint
npm run lint:fix   # fix auto-fixable issues
npm run format     # format only
```
