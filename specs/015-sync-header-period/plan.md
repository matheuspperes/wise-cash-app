# Implementation Plan: Sync Header and Default Period

**Branch**: `015-sync-header-period` | **Date**: 2026-03-24 | **Spec**: `C:/apps/wise-cash-app/specs/015-sync-header-period/spec.md`
**Input**: Feature specification from `C:/apps/wise-cash-app/specs/015-sync-header-period/spec.md`

**Note**: This template is filled in by the `/speckit.plan` command. See `.specify/templates/plan-template.md` for the execution workflow.

## Summary

Unificar o header da rota `/transactions` com o padrao visual da pagina inicial (mantendo apenas acao de retorno ao dashboard e titulo de contexto) e alterar o periodo inicial do dashboard de 12 para 3 meses, respeitando preferencia persistida quando existir. A implementacao sera concentrada em componentes de UI ja existentes, evitando novas camadas arquiteturais.

## Technical Context

**Language/Version**: TypeScript 5.8, React 18, Next.js 15 App Router  
**Primary Dependencies**: Next Link/navigation, TanStack Query (dashboard summary), existing UI primitives (`components/ui/button`), existing header component (`components/dashboard/dashboard-header`)  
**Storage**: N/A for new persistence; existing behavior must respect any already persisted period preference when available  
**Validation**: Manual scenario validation with evidence under `manual-validation/sync-header-period/`  
**Target Platform**: Responsive web app (mobile, tablet, desktop)
**Project Type**: Single-project Next.js web application  
**Performance Goals**: No additional network requests introduced; dashboard initial period switch remains perceptually immediate (no additional render passes beyond current baseline)  
**Constraints**: No automated tests by constitution; preserve existing routes and link destinations; avoid introducing global state for this scope  
**Scale/Scope**: 2 primary components (`dashboard-page-client`, `transactions-page-client`) plus manual-validation/docs artifacts

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

- Clean Code: naming clarity, single responsibility, and readability constraints defined
- Intentional Simplicity: no speculative abstractions without explicit justification
- Personal-Use Value: feature value is direct for personal usage and low operational friction
- Practical Modernity: stack choices are current and actively maintained
- No Automated Tests: validation strategy is manual, scenario-based, and documented

Gate Assessment (Pre-Phase 0): PASS
- Clean Code: change surface is small and localized to existing UI components.
- Intentional Simplicity: leverages existing header/button patterns without abstractions.
- Personal-Use Value: improves navigation consistency and faster default insight window.
- Practical Modernity: keeps current stack and established component patterns.
- No Automated Tests: validation remains manual and scenario-driven.

## Project Structure

### Documentation (this feature)

```text
specs/015-sync-header-period/
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
├── dashboard/
│   ├── dashboard-header.tsx
│   └── dashboard-page-client.tsx
└── transactions/
    └── transactions-page-client.tsx

lib/
└── ui/
    └── transactions-view.ts

manual-validation/
└── sync-header-period/
```

**Structure Decision**: Reusar a estrutura Next.js existente e concentrar alteracoes nos componentes de dashboard/transacoes e na documentacao da feature, sem criar novos modulos globais.

## Phase 0: Research and Decisions

Research output: `C:/apps/wise-cash-app/specs/015-sync-header-period/research.md`

Resolved topics from technical context:
- Estrategia de reuse do `DashboardHeader` na pagina de transacoes com titulo contextualizado.
- Regra de exibicao de controle unico "Voltar ao dashboard" mantendo estilo.
- Ajuste do valor inicial de `months` de 12 para 3 no dashboard.
- Comportamento de fallback para preferencia persistida quando existir (sem introduzir nova persistencia nesta feature).

## Phase 1: Design and Contracts

Design outputs:
- Data model: `C:/apps/wise-cash-app/specs/015-sync-header-period/data-model.md`
- Contracts: `C:/apps/wise-cash-app/specs/015-sync-header-period/contracts/header-and-period-default-contract.md`
- Quickstart/manual validation: `C:/apps/wise-cash-app/specs/015-sync-header-period/quickstart.md`

Agent context update:
- Run `C:/apps/wise-cash-app/.specify/scripts/powershell/update-agent-context.ps1 -AgentType copilot`

## Post-Design Constitution Check

Gate Assessment (Post-Phase 1): PASS
- Clean Code: design separa claramente estado do header e estado de periodo inicial.
- Intentional Simplicity: abordagem incremental em componentes existentes sem nova infra.
- Personal-Use Value: melhora orientacao visual e foco temporal no dashboard.
- Practical Modernity: mantem padroes atuais de React/TanStack Query em uso no projeto.
- No Automated Tests: quickstart e validacao manual cobrem cenarios de aceite.

## Complexity Tracking

> **Fill ONLY if Constitution Check has violations that must be justified**

| Violation | Why Needed | Simpler Alternative Rejected Because |
|-----------|------------|-------------------------------------|
| None | N/A | N/A |
