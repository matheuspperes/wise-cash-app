# Implementation Plan: Refine Dashboard and Transactions Navigation Layout

**Branch**: `013-refine-dashboard-transactions-layout` | **Date**: 2026-03-23 | **Spec**: `C:/apps/wise-cash-app/specs/013-refine-dashboard-transactions-layout/spec.md`
**Input**: Feature specification from `C:/apps/wise-cash-app/specs/013-refine-dashboard-transactions-layout/spec.md`

**Note**: This template is filled in by the `/speckit.plan` command. See `.specify/templates/plan-template.md` for the execution workflow.

## Summary

Refinar composicao visual e navegacao entre dashboard e transacoes com foco em: seletor de periodo ao lado da legenda do grafico, ajuste objetivo de espaco entre cards de saldo no desktop (16px +/-4px), padronizacao de copy de criacao com acento correto, CTA "Nova Transacao" no final de /transactions e botao simples de retorno no topo navegando sempre para `/`. A implementacao segue abordagem local em componentes/paginas existentes, sem alteracoes de API, schema ou logica financeira.

## Technical Context

**Language/Version**: TypeScript 5.8, React 18, Next.js 15 App Router  
**Primary Dependencies**: Tailwind CSS utility classes, Next Link/navigation, TanStack Query (existing dashboard summary flow), Framer Motion (existing dashboard transitions)  
**Storage**: N/A (UI layout/navigation refinement only)  
**Validation**: Manual scenario-based validation with evidence in `manual-validation/refine-dashboard-transactions-layout/`  
**Target Platform**: Responsive web app (desktop, tablet, mobile)
**Project Type**: Single-project Next.js web application  
**Performance Goals**: Preserve perceived responsiveness and avoid introducing additional network requests for UI refinements  
**Constraints**: No automated tests by constitution; preserve existing route outcomes and period-filter behavior; avoid speculative abstractions  
**Scale/Scope**: Dashboard chart control area, dashboard balance-card spacing, transactions page header/footer CTAs, and affected localized labels

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

- Clean Code: naming clarity, single responsibility, and readability constraints defined
- Intentional Simplicity: no speculative abstractions without explicit justification
- Personal-Use Value: feature value is direct for personal usage and low operational friction
- Practical Modernity: stack choices are current and actively maintained
- No Automated Tests: validation strategy is manual, scenario-based, and documented

Gate Assessment (Pre-Phase 0): PASS
- Clean Code: updates constrained to existing UI surfaces with explicit naming and limited responsibility changes.
- Intentional Simplicity: no new architecture layers; only local layout/composition and route wiring adjustments.
- Personal-Use Value: improves daily readability and navigation predictability in key financial flows.
- Practical Modernity: continues using stable project stack and current component conventions.
- No Automated Tests: validation plan is manual and scenario-driven.

## Project Structure

### Documentation (this feature)

```text
specs/013-refine-dashboard-transactions-layout/
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
└── transactions/
    └── page.tsx

components/
└── dashboard/
    ├── area-history-chart.tsx
    ├── dashboard-page-client.tsx
    ├── historical-total-balance-card.tsx
    └── net-balance-card.tsx

manual-validation/
└── refine-dashboard-transactions-layout/
```

**Structure Decision**: Reuse existing Next.js app structure with localized updates in current dashboard/transactions files; no new modules or directories beyond feature documentation and manual-validation evidence.

## Phase 0: Research and Decisions

Research output: `C:/apps/wise-cash-app/specs/013-refine-dashboard-transactions-layout/research.md`

Resolved items from technical context:
- Responsive same-row behavior for legend + period selector in narrow widths.
- Objective desktop spacing target for balance cards (16px +/-4px).
- Deterministic route behavior for transactions header return and footer create CTA.
- CTA deduplication strategy in /transactions header versus footer placement.
- Scope guardrails to avoid API/data-model behavior changes.

## Phase 1: Design and Contracts

Design outputs:
- Data model: `C:/apps/wise-cash-app/specs/013-refine-dashboard-transactions-layout/data-model.md`
- Contracts: `C:/apps/wise-cash-app/specs/013-refine-dashboard-transactions-layout/contracts/dashboard-transactions-layout-contract.md`
- Quickstart/manual validation: `C:/apps/wise-cash-app/specs/013-refine-dashboard-transactions-layout/quickstart.md`

Agent context update:
- Run `C:/apps/wise-cash-app/.specify/scripts/powershell/update-agent-context.ps1 -AgentType copilot`

## Post-Design Constitution Check

Gate Assessment (Post-Phase 1): PASS
- Clean Code: entities/contracts split responsibilities by surface and reduce ambiguity for implementation.
- Intentional Simplicity: design confirms local edits only, without speculative abstractions.
- Personal-Use Value: decisions improve discoverability and navigation consistency for frequent flows.
- Practical Modernity: remains aligned with maintained stack and existing conventions.
- No Automated Tests: quickstart defines manual validation scenarios and evidence outputs.

## Complexity Tracking

> **Fill ONLY if Constitution Check has violations that must be justified**

| Violation | Why Needed | Simpler Alternative Rejected Because |
|-----------|------------|-------------------------------------|
| None | N/A | N/A |
