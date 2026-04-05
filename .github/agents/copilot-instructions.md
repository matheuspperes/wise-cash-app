# wise-cash-app Development Guidelines

Auto-generated from all feature plans. Last updated: 2026-04-02

## Active Technologies
- TypeScript 5.x, Node.js 20+ (stack atual), Python 3.11+ quando aplicavel + Next.js 15.x, React 18, npm (operacao atual), uv (padrao para Python) (002-project-ambience-uv)
- N/A (feature de padronizacao de ambiencia) (002-project-ambience-uv)
- TypeScript 5.x, React 18, Next.js 15.x + Tailwind CSS, TanStack Query, Recharts, Zod, shadcn/ui, Radix UI, class-variance-authority, tailwind-merge, lucide-react, Framer Motion, react-hook-form, @hookform/resolvers, next-themes, Geist font via next/font (003-dark-theme-dashboard)
- N/A (feature de UX/UI; dados continuam em APIs existentes) (003-dark-theme-dashboard)
- TypeScript 5.x, React 18, Next.js 15.x + Tailwind CSS, TanStack Query, Recharts, Zod, next-themes, Framer Motion, react-hook-form, Radix/shadcn UI primitives ja adotados no repositorio (004-dashboard-banner-nav)
- N/A para esta feature (camada visual, copy e simulacao de exibicao no dashboard) (004-dashboard-banner-nav)
- TypeScript 5.8, React 18, Next.js 15 + Tailwind CSS, Recharts, TanStack Query, Framer Motion, react-hook-form, Zod (005-refine-copy-scale-months)
- N/A (sem mudanca de persistencia; dados continuam via APIs existentes) (005-refine-copy-scale-months)
- N/A (sem mudanca de persistencia; dados continuam em APIs/repositorios existentes) (006-refine-dashboard-history)
- N/A (sem mudanca de persistencia; dados continuam em repositorio em memoria/API existente) (007-fix-chart-indicators-history)
- TypeScript 5.8, React 18, Next.js 15 App Router + TanStack Query, Recharts, Framer Motion, React Hook Form, Zod (009-remove-demo-transactions-flow)
- In-memory store (`lib/repositories/in-memory-db.ts`) and repository/service layer wrappers (009-remove-demo-transactions-flow)
- TypeScript 5.8, React 18, Next.js 15 App Router + TanStack Query, React Hook Form, Zod, existing UI primitives (`components/ui`) (010-refine-transactions-history-entry)
- Existing in-memory repository flow (`lib/repositories/in-memory-db.ts`), plus transient in-page state for temporary launches table (010-refine-transactions-history-entry)
- TypeScript 5.8, React 18, Next.js 15 App Router + Tailwind CSS utility classes, Framer Motion (existing dashboard transitions), TanStack Query (existing summary fetch) (011-align-header-balance-cards)
- N/A for persistence changes (layout-only feature) (011-align-header-balance-cards)
- TypeScript 5.8, React 18, Next.js 15 App Router + Tailwind CSS utility classes, Next Link/navigation, TanStack Query (dashboard data already in use) (012-refine-balance-cta-layout)
- N/A (layout/UX and navigation refinement only) (012-refine-balance-cta-layout)
- TypeScript 5.8, React 18, Next.js 15 App Router + Tailwind CSS utility classes, Next Link/navigation, TanStack Query (existing dashboard summary flow), Framer Motion (existing dashboard transitions) (013-refine-dashboard-transactions-layout)
- N/A (UI layout/navigation refinement only) (013-refine-dashboard-transactions-layout)
- TypeScript 5.8, React 18, Next.js 15 App Router + React Hook Form, Zod, Tailwind CSS utility classes, Next Link/navigation, existing UI primitives (`components/ui/button`, `components/ui/input`) (014-refine-transaction-form)
- Existing app persistence paths for categories/transactions (no schema migration planned for this feature) (014-refine-transaction-form)
- TypeScript 5.8, React 18, Next.js 15 App Router + Next Link/navigation, TanStack Query (dashboard summary), existing UI primitives (`components/ui/button`), existing header component (`components/dashboard/dashboard-header`) (015-sync-header-period)
- N/A for new persistence; existing behavior must respect any already persisted period preference when available (015-sync-header-period)
- TypeScript 5.8, React 18, Next.js 15 App Router + Dexie.js (IndexedDB wrapper), TanStack Query, React Hook Form, Zod (016-local-first-storage)
- IndexedDB local-first com schema versionado (`transactions`, `recurrenceRules`, `meta`) e isolamento por bucket de usuario/anomimo (016-local-first-storage)
- TypeScript 5.x, React 18, Next.js 15 (App Router) + TanStack Query, React Hook Form, Zod, Dexie, lucide-react (017-fix-pt-categories-actions)
- IndexedDB (Dexie) com dados locais funcionais (transactions, recurrenceRules, meta) (017-fix-pt-categories-actions)

- TypeScript 5.x + React 18 + Next.js App Router (Next.js 15.x) + Next.js, Tailwind CSS, Shadcn/UI, TanStack Query, Supabase JS, Recharts (001-monthly-finance-manager)

## Project Structure

```text
backend/
frontend/
tests/
```

## Commands

npm test; npm run lint

## Code Style

TypeScript 5.x + React 18 + Next.js App Router (Next.js 15.x): Follow standard conventions

## Recent Changes
- 017-fix-pt-categories-actions: Added TypeScript 5.x, React 18, Next.js 15 (App Router) + TanStack Query, React Hook Form, Zod, Dexie, lucide-react
- 016-local-first-storage: Added TypeScript 5.8, React 18, Next.js 15 App Router + Dexie.js (IndexedDB wrapper), TanStack Query, React Hook Form, Zod
- 015-sync-header-period: Added TypeScript 5.8, React 18, Next.js 15 App Router + Next Link/navigation, TanStack Query (dashboard summary), existing UI primitives (`components/ui/button`), existing header component (`components/dashboard/dashboard-header`)


<!-- MANUAL ADDITIONS START -->
<!-- MANUAL ADDITIONS END -->
