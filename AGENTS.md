# Repository Guidelines

## Project Structure & Module Organization

This repository is a Vite-powered React 19 and TanStack Start landing page for Decatur Mechanic. Application code lives in `src/`: routes are in `src/routes/`, reusable landing-page components are in `src/components/landing/`, shared UI primitives are in `src/components/ui/`, and business/content configuration is centralized in `src/config/business.ts`. Cross-cutting helpers and browser hooks belong in `src/lib/` and `src/hooks/`. Static files such as the favicon and crawler rules are in `public/`. Generated route metadata is in `src/routeTree.gen.ts`; update source routes rather than editing generated output manually. There is currently no dedicated test directory.

## Build, Test, and Development Commands

Run commands from the repository root:

- `npm install` — install dependencies from `package-lock.json`.
- `npm run dev` — start the Vite development server with hot reload.
- `npm run build` — create the production build and catch type/bundling issues.
- `npm run preview` — serve the production build locally for inspection.
- `npm run lint` — run ESLint across the project.
- `npm run format` — format files with Prettier.

No automated test framework or `test` script is configured. For UI changes, manually verify the homepage at mobile widths (375–430px) and desktop width, including links, forms, and sticky actions.

## Coding Style & Naming Conventions

Use TypeScript and React function components with two-space indentation, double quotes, and trailing commas, matching the existing Prettier/ESLint configuration. Use `PascalCase` for components and `camelCase` for functions, variables, and configuration fields. Use kebab-case for new route filenames where applicable. Prefer the `@/` path alias and Tailwind utility classes; keep replaceable business facts in `src/config/business.ts`. Run `npm run lint` and `npm run format` before submitting changes.

## Commit & Pull Request Guidelines

Existing commits are brief and mostly generic (for example, `Changes`). Use a concise imperative subject such as `Refine mobile CTA layout`, and keep each commit focused. Pull requests should explain the user-visible change, list validation commands, note any configuration/content changes, and include before/after screenshots for visual work. Link the relevant issue or task when one exists.

## Lovable and Configuration Notes

This project is connected to Lovable; do not force-push or rewrite published history. Commits pushed to the connected branch sync to Lovable, so keep the branch buildable. Never invent phone numbers, hours, prices, reviews, ratings, or service claims—replace placeholders in `src/config/business.ts` only with client-confirmed data.
