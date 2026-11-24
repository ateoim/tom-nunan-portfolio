# Tom Nunan — Engineering Portfolio

Static editorial engineering portfolio for **Tom Nunan** (Information Technology graduate, RMIT University, Melbourne), presenting case studies across AI systems, workflow automation, data analytics, business intelligence, and full-stack TypeScript engineering.

## Architecture Overview

- **Framework & Tooling**: React 19, TypeScript (strict mode), Vite 6, Tailwind CSS v4, and Lucide icons.
- **Data-Driven Catalog** ([`src/data/portfolio.ts`](src/data/portfolio.ts)): Single typed source of truth for profile metadata, the 6 project case studies, 4 hiring-track capability matrices, 5 engineering standards, and pure filtering/lookup helpers.
- **Interactive Views**:
  - **Role-Focus Filtering**: Instant filtering across `All`, `AI & RAG`, `Data & BI`, `Automation`, and `Full-Stack` with live counts.
  - **Technical Case Study Drawer**: Slide-over view detailing Problem Statement, layered System Architecture, Key Engineering Decisions, Verified Capabilities, Tech Stack, and repository/demo links.
  - **Capabilities & Role Alignment Matrix**: Switchable tabs mapping implemented modules directly to *AI & Automation Engineer*, *Data & BI Analyst*, *Business Analyst*, and *Software Engineer* tracks.
  - **Print-Friendly Resume Overview**: Modal with dedicated `@media print` styling for clean PDF export.
  - **Theme System**: Charcoal-slate dark mode default with a warm-paper light mode toggle persisted in `localStorage`.
- **Verification**: Vitest unit test suite ([`src/data/__tests__/portfolio.test.ts`](src/data/__tests__/portfolio.test.ts)) validating catalog integrity, URL formatting, category filtering, cross-referenced project IDs, and role-alignment mappings.

## Local Development

```bash
pnpm install
pnpm run dev
```

### Verification Commands

```bash
pnpm run typecheck
pnpm test
pnpm run build
```

## Customization Guide

All portfolio content lives in [`src/data/portfolio.ts`](src/data/portfolio.ts):

1. Update `PROFILE` to adjust positioning copy, education details, or core competencies.
2. Add or edit entries in `PROJECTS` (each entry requires structured architecture layers, engineering decisions, verified capabilities, and HTTPS repository/demo URLs).
3. Update `ROLE_TRACKS` to adjust hiring-track alignment; every referenced `projectIds` value is validated against `PROJECTS` by the Vitest suite.
4. Design tokens for dark and warm-paper light themes are defined as CSS custom properties in [`src/styles/index.css`](src/styles/index.css).

## Deployment (GitHub Pages)

`vite.config.ts` is configured with `base: './'` so the static bundle in `dist/` deploys cleanly under any GitHub Pages subpath.

1. Push the `main` branch to GitHub.
2. In repository **Settings → Pages**, set **Source** to **GitHub Actions**.
3. The workflow in [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml) runs `pnpm run typecheck`, `pnpm test`, and `pnpm run build`, then publishes `dist/` automatically on every push to `main`.

## License

MIT — see [LICENSE](LICENSE).
