# Implementation Plan: Remove Demo and Unify Transactions Flow

**Branch**: `009-remove-demo-transactions-flow` | **Date**: 2026-03-23 | **Spec**: `C:/apps/wise-cash-app/specs/009-remove-demo-transactions-flow/spec.md`
**Input**: Feature specification from `C:/apps/wise-cash-app/specs/009-remove-demo-transactions-flow/spec.md`

**Note**: This template is filled in by the `/speckit.plan` command. See `.specify/templates/plan-template.md` for the execution workflow.

## Summary

Remove all demo-mode behavior and data paths from dashboard and summary APIs, route dashboard actions directly into `\transactions` sections via `view` query parameter, replace expenses-only history emphasis with transaction-focused behavior, and simplify `\transactions` UI by removing the "Lancamentos" tab label while preserving filtering and historical access. Apply a constrained visual hierarchy update for historical balance card (desktop width target 70% +/-5%, right-referenced content) with responsive consistency.

## Technical Context

**Language/Version**: TypeScript 5.8, React 18, Next.js 15 App Router  
**Primary Dependencies**: TanStack Query, Recharts, Framer Motion, React Hook Form, Zod  
**Storage**: In-memory store (`lib/repositories/in-memory-db.ts`) and repository/service layer wrappers  
**Validation**: Manual scenario validation only, documented in `manual-validation/remove-demo-transactions-flow/` evidence files  
**Target Platform**: Web app (desktop + mobile browser)
**Project Type**: Single-project Next.js web application  
**Performance Goals**: Preserve current perceived interactivity; no additional blocking fetches; dashboard and transactions navigation remains immediate on click  
**Constraints**: No automated tests by constitution; keep code simple/readable; avoid broad refactors outside dashboard/transactions flow  
**Scale/Scope**: Feature-level changes in dashboard + transactions pages, summary API payload cleanup, and related UI/service helpers

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

- Clean Code: naming clarity, single responsibility, and readability constraints defined
- Intentional Simplicity: no speculative abstractions without explicit justification
- Personal-Use Value: feature value is direct for personal usage and low operational friction
- Practical Modernity: stack choices are current and actively maintained
- No Automated Tests: validation strategy is manual, scenario-based, and documented

Gate Assessment (Pre-Phase 0): PASS
- Clean Code: planned edits are localized to existing dashboard/transactions boundaries.
- Intentional Simplicity: query-param driven section entry reuses current route.
- Personal-Use Value: removes demo noise and reduces navigation friction.
- Practical Modernity: no legacy/deprecated additions; reuse stable stack.
- No Automated Tests: manual validation artifacts will be created and completed.

## Project Structure

### Documentation (this feature)

```text
specs/[###-feature]/
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
├── (dashboard)/
│   └── page.tsx
├── transactions/
│   └── page.tsx
└── api/
  ├── dashboard/summary/route.ts
  └── transactions/route.ts

components/
├── dashboard/
└── transactions/

lib/
├── repositories/
├── services/
├── ui/
└── i18n/

manual-validation/
└── remove-demo-transactions-flow/
```

**Structure Decision**: Use the existing single-project Next.js structure and restrict feature changes to dashboard UI, transactions UI, and summary/navigation service boundaries. No new app layer or module split is required.

## Phase 0: Research and Decisions

Research output: `C:/apps/wise-cash-app/specs/009-remove-demo-transactions-flow/research.md`

Resolved items from technical context:
- Demo data elimination strategy across UI, API, and repository composition.
- Query-param contract for section entry in `\transactions`.
- Transactions history scope and fallback behavior for invalid/missing `view`.
- Visual strategy for historical card size/alignment without layout regression.

## Phase 1: Design and Contracts

Design outputs:
- Data model: `C:/apps/wise-cash-app/specs/009-remove-demo-transactions-flow/data-model.md`
- Contracts: `C:/apps/wise-cash-app/specs/009-remove-demo-transactions-flow/contracts/transactions-entry-and-summary-contract.md`
- Quickstart/manual validation: `C:/apps/wise-cash-app/specs/009-remove-demo-transactions-flow/quickstart.md`

Agent context update:
- Run `C:/apps/wise-cash-app/.specify/scripts/powershell/update-agent-context.ps1 -AgentType copilot`

## Post-Design Constitution Check

Gate Assessment (Post-Phase 1): PASS
- Clean Code: contracts and data model map cleanly to existing components/services.
- Intentional Simplicity: no new endpoint or redundant route required.
- Personal-Use Value: direct entry and demo removal reduce daily friction.
- Practical Modernity: keeps current stack conventions and component patterns.
- No Automated Tests: validation remains manual and documented in quickstart.

## Complexity Tracking

> **Fill ONLY if Constitution Check has violations that must be justified**

| Violation | Why Needed | Simpler Alternative Rejected Because |
|-----------|------------|-------------------------------------|
| None | N/A | N/A |
