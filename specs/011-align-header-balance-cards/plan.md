# Implementation Plan: Align Header and Balance Cards

**Branch**: `011-align-header-balance-cards` | **Date**: 2026-03-23 | **Spec**: `C:/apps/wise-cash-app/specs/011-align-header-balance-cards/spec.md`
**Input**: Feature specification from `C:/apps/wise-cash-app/specs/011-align-header-balance-cards/spec.md`

**Note**: This template is filled in by the `/speckit.plan` command. See `.specify/templates/plan-template.md` for the execution workflow.

## Summary

Refine dashboard visual layout so title and control cluster keep explicit left/right hierarchy, with desktop/tablet one-row header and mobile controlled two-row behavior. Align both balance cards to equivalent vertical centering and left-anchored content using a shared spacing rule, while preserving period selection and add-action navigation behavior. Keep implementation scoped to dashboard layout structure and card composition without changing data contracts.

## Technical Context

**Language/Version**: TypeScript 5.8, React 18, Next.js 15 App Router  
**Primary Dependencies**: Tailwind CSS utility classes, Framer Motion (existing dashboard transitions), TanStack Query (existing summary fetch)  
**Storage**: N/A for persistence changes (layout-only feature)  
**Validation**: Manual scenario validation with evidence under `manual-validation/align-header-balance-cards/`  
**Target Platform**: Web app (desktop + mobile browser)
**Project Type**: Single-project Next.js web application  
**Performance Goals**: Preserve current perceived responsiveness and avoid introducing additional network requests for layout handling  
**Constraints**: No automated tests by constitution; no functional behavior change in period selector or add-action; keep scope localized to dashboard UI composition  
**Scale/Scope**: Dashboard header row layout and two balance card visual alignment in `components/dashboard/` and `components/dashboard/dashboard-page-client.tsx`

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

- Clean Code: naming clarity, single responsibility, and readability constraints defined
- Intentional Simplicity: no speculative abstractions without explicit justification
- Personal-Use Value: feature value is direct for personal usage and low operational friction
- Practical Modernity: stack choices are current and actively maintained
- No Automated Tests: validation strategy is manual, scenario-based, and documented

Gate Assessment (Pre-Phase 0): PASS
- Clean Code: changes stay in dashboard layout components with clear naming.
- Intentional Simplicity: use existing layout primitives and spacing tokens; no new abstractions.
- Personal-Use Value: improves daily readability and action targeting in the main dashboard screen.
- Practical Modernity: remains in current stack and responsive utility conventions.
- No Automated Tests: manual validation artifacts will capture layout and functional regression checks.

## Project Structure

### Documentation (this feature)

```text
specs/011-align-header-balance-cards/
├── plan.md              # This file (/speckit.plan command output)
├── research.md          # Phase 0 output (/speckit.plan command)
├── data-model.md        # Phase 1 output (/speckit.plan command)
├── quickstart.md        # Phase 1 output (/speckit.plan command)
├── contracts/           # Phase 1 output (/speckit.plan command)
└── tasks.md             # Phase 2 output (/speckit.tasks command - NOT created by /speckit.plan)
```

### Source Code (repository root)
```text
components/
└── dashboard/
  ├── dashboard-page-client.tsx
  ├── dashboard-header.tsx
  ├── net-balance-card.tsx
  └── historical-total-balance-card.tsx

lib/
├── i18n/
└── ui/

manual-validation/
└── align-header-balance-cards/
```

**Structure Decision**: Use the existing dashboard component structure and adjust only composition/alignment classes plus minimal supporting UI text constants where needed. Avoid introducing new stateful logic layers.

## Phase 0: Research and Decisions

Research output: `C:/apps/wise-cash-app/specs/011-align-header-balance-cards/research.md`

Resolved items from technical context:
- Responsive header strategy (desktop/tablet one-row, mobile controlled two-row).
- Objective card alignment rule (same useful-height block and same left offset in both cards).
- Preservation strategy for period-change and add-action behavior.
- Minimal CSS/class strategy to avoid layout regressions and overengineering.

## Phase 1: Design and Contracts

Design outputs:
- Data model: `C:/apps/wise-cash-app/specs/011-align-header-balance-cards/data-model.md`
- Contracts: `C:/apps/wise-cash-app/specs/011-align-header-balance-cards/contracts/dashboard-header-and-balance-alignment-contract.md`
- Quickstart/manual validation: `C:/apps/wise-cash-app/specs/011-align-header-balance-cards/quickstart.md`

Agent context update:
- Run `C:/apps/wise-cash-app/.specify/scripts/powershell/update-agent-context.ps1 -AgentType copilot`

## Post-Design Constitution Check

Gate Assessment (Post-Phase 1): PASS
- Clean Code: contract and model keep layout responsibilities explicit.
- Intentional Simplicity: no new API/store; only layout and spacing adjustments.
- Personal-Use Value: primary dashboard is easier to scan and operate.
- Practical Modernity: responsive behavior follows current utility-first patterns.
- No Automated Tests: manual validation scenarios cover both visual and functional regression.

## Complexity Tracking

> **Fill ONLY if Constitution Check has violations that must be justified**

| Violation | Why Needed | Simpler Alternative Rejected Because |
|-----------|------------|-------------------------------------|
| None | N/A | N/A |
