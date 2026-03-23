# Implementation Plan: Refine Transactions History Entry

**Branch**: `010-refine-transactions-history-entry` | **Date**: 2026-03-23 | **Spec**: `C:/apps/wise-cash-app/specs/010-refine-transactions-history-entry/spec.md`
**Input**: Feature specification from `C:/apps/wise-cash-app/specs/010-refine-transactions-history-entry/spec.md`

**Note**: This template is filled in by the `/speckit.plan` command. See `.specify/templates/plan-template.md` for the execution workflow.

## Summary

Refine the `/transactions` experience by showing filtered-results content only after manual filter interaction, renaming history labels to reflect complete transaction scope (income + expense), and adding a session-scoped temporary "Lancamentos" table in `view=new` that shows newly saved items with newest-first ordering. Keep behavior simple and explicit while optimizing table consistency across history and launch surfaces (column semantics, ordering, empty states, and visual structure).

## Technical Context

**Language/Version**: TypeScript 5.8, React 18, Next.js 15 App Router  
**Primary Dependencies**: TanStack Query, React Hook Form, Zod, existing UI primitives (`components/ui`)  
**Storage**: Existing in-memory repository flow (`lib/repositories/in-memory-db.ts`), plus transient in-page state for temporary launches table  
**Validation**: Manual scenario validation only, with evidence under `manual-validation/refine-transactions-history-entry/`  
**Target Platform**: Web app (desktop + mobile browser)
**Project Type**: Single-project Next.js web application  
**Performance Goals**: Preserve current interaction responsiveness; no additional blocking API round-trips for temporary launches table rendering  
**Constraints**: No automated tests by constitution; keep logic localized in transactions flow; preserve existing API contract compatibility where not explicitly changed  
**Scale/Scope**: Feature-scoped changes in `app/transactions/page.tsx`, related transactions components, summary-history adapter for gains/expenses, and manual-validation docs

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

- Clean Code: naming clarity, single responsibility, and readability constraints defined
- Intentional Simplicity: no speculative abstractions without explicit justification
- Personal-Use Value: feature value is direct for personal usage and low operational friction
- Practical Modernity: stack choices are current and actively maintained
- No Automated Tests: validation strategy is manual, scenario-based, and documented

Gate Assessment (Pre-Phase 0): PASS
- Clean Code: planned deltas are limited to transactions/history boundaries with explicit naming.
- Intentional Simplicity: no new route or persistence layer required; rely on existing flow + local transient state.
- Personal-Use Value: clearer filtering behavior and immediate post-save feedback reduce daily friction.
- Practical Modernity: remains within stable Next.js/React patterns used in repository.
- No Automated Tests: validation remains manual with scenario evidence.

## Project Structure

### Documentation (this feature)

```text
specs/010-refine-transactions-history-entry/
├── plan.md              # This file (/speckit.plan command output)
├── research.md          # Phase 0 output (/speckit.plan command)
├── data-model.md        # Phase 1 output (/speckit.plan command)
├── quickstart.md        # Phase 1 output (/speckit.plan command)
├── contracts/           # Phase 1 output (/speckit.plan command)
└── tasks.md             # Phase 2 output (/speckit.tasks command - NOT created by /speckit.plan)
```

### Source Code (repository root)
```text
app/
├── transactions/
│   └── page.tsx
└── api/
  ├── dashboard/summary/route.ts
  └── transactions/route.ts

components/
└── transactions/
  ├── transaction-form.tsx
  ├── transaction-filters.tsx
  ├── transaction-search.tsx
  └── monthly-expense-history-accordion.tsx

lib/
├── repositories/
├── services/
└── ui/

manual-validation/
└── refine-transactions-history-entry/
```

**Structure Decision**: Keep the existing single-project Next.js structure. Implement table consistency by reusing shared transaction row semantics and aligned table headers/ordering rules rather than introducing a new data layer.

## Phase 0: Research and Decisions

Research output: `C:/apps/wise-cash-app/specs/010-refine-transactions-history-entry/research.md`

Resolved items from technical context:
- Manual-filter activation strategy without false positives from default values.
- Unified history scope and wording updates from expense-only to complete transaction context.
- Session lifecycle and ordering behavior for temporary "Lancamentos" table.
- Table consistency guidelines to optimize readability and maintainability across history and temporary launches.

## Phase 1: Design and Contracts

Design outputs:
- Data model: `C:/apps/wise-cash-app/specs/010-refine-transactions-history-entry/data-model.md`
- Contracts: `C:/apps/wise-cash-app/specs/010-refine-transactions-history-entry/contracts/transactions-history-and-launches-contract.md`
- Quickstart/manual validation: `C:/apps/wise-cash-app/specs/010-refine-transactions-history-entry/quickstart.md`

Agent context update:
- Run `C:/apps/wise-cash-app/.specify/scripts/powershell/update-agent-context.ps1 -AgentType copilot`

## Post-Design Constitution Check

Gate Assessment (Post-Phase 1): PASS
- Clean Code: entities/contracts separate concerns (filter intent, history view, temporary table state).
- Intentional Simplicity: local session state replaces unnecessary persistence.
- Personal-Use Value: faster confirmation after save and cleaner history signal.
- Practical Modernity: implementation remains in stable, current app stack.
- No Automated Tests: quickstart defines manual validation suite and evidence artifacts.

## Complexity Tracking

> **Fill ONLY if Constitution Check has violations that must be justified**

| Violation | Why Needed | Simpler Alternative Rejected Because |
|-----------|------------|-------------------------------------|
| None | N/A | N/A |
