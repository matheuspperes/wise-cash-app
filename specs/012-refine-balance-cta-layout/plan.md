# Implementation Plan: Refine Balance Card and CTA Layout

**Branch**: `012-refine-balance-cta-layout` | **Date**: 2026-03-23 | **Spec**: `C:/apps/wise-cash-app/specs/012-refine-balance-cta-layout/spec.md`
**Input**: Feature specification from `C:/apps/wise-cash-app/specs/012-refine-balance-cta-layout/spec.md`

**Note**: This template is filled in by the `/speckit.plan` command. See `.specify/templates/plan-template.md` for the execution workflow.

## Summary

Refinar a dashboard para consolidar filtro/Transacoes/Nova Transacao no mesmo cluster de controles, removendo duplicidade de acesso de Transacoes, preservando navegacao para historico e nova transacao. Ajustar o card de saldo liquido historico com reducao de 20% em desktop/tablet e ajuste proporcional em mobile, mantendo alinhamentos definidos. Introduzir botao "Nova transacao" na pagina de historico com mesmo estilo-base do botao de referencia da pagina de nova transacao, permitindo apenas variacao responsiva de largura/tamanho.

## Technical Context

**Language/Version**: TypeScript 5.8, React 18, Next.js 15 App Router  
**Primary Dependencies**: Tailwind CSS utility classes, Next Link/navigation, TanStack Query (dashboard data already in use)  
**Storage**: N/A (layout/UX and navigation refinement only)  
**Validation**: Validacao manual orientada a cenarios, com evidencias em `manual-validation/refine-balance-cta-layout/`  
**Target Platform**: Web app responsiva (desktop, tablet, mobile)
**Project Type**: Single-project Next.js web application  
**Performance Goals**: Preservar responsividade percebida e evitar novas chamadas de rede para ajustes visuais  
**Constraints**: Sem testes automatizados por constituicao; manter comportamento funcional de rotas; evitar novas abstracoes desnecessarias  
**Scale/Scope**: Dashboard header cluster, `historical-total-balance-card`, e pagina `transactions` (views history/new)

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

- Clean Code: naming clarity, single responsibility, and readability constraints defined
- Intentional Simplicity: no speculative abstractions without explicit justification
- Personal-Use Value: feature value is direct for personal usage and low operational friction
- Practical Modernity: stack choices are current and actively maintained
- No Automated Tests: validation strategy is manual, scenario-based, and documented

Gate Assessment (Pre-Phase 0): PASS
- Clean Code: alteracoes concentradas em componentes existentes de dashboard e transactions.
- Intentional Simplicity: sem novas camadas; ajustes de classes/composicao e rotas ja existentes.
- Personal-Use Value: melhora clareza de acoes principais e consistencia de CTAs entre fluxos.
- Practical Modernity: segue stack atual e padrao utility-first adotado no projeto.
- No Automated Tests: estrategia de validacao manual definida desde o inicio.

## Project Structure

### Documentation (this feature)

```text
specs/012-refine-balance-cta-layout/
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
├── dashboard/
│  ├── dashboard-header.tsx
│  ├── dashboard-page-client.tsx
│  └── historical-total-balance-card.tsx
└── transactions/
  ├── transaction-form.tsx
  └── transaction-search.tsx

manual-validation/
└── refine-balance-cta-layout/
```

**Structure Decision**: Reusar estrutura existente e realizar ajustes locais em componentes/paginas ja presentes, sem criar novos modulos estruturais.

## Phase 0: Research and Decisions

Research output: `C:/apps/wise-cash-app/specs/012-refine-balance-cta-layout/research.md`

Resolved items from technical context:
- Estrategia de reposicionamento do CTA Transacoes sem duplicidade no header.
- Regra objetiva para reducao de 20% em desktop/tablet e proporcional em mobile.
- Paridade de estilo-base para botao "Nova transacao" na pagina de historico.
- Preservacao de destinos funcionais existentes (`view=history` e `view=new`).

## Phase 1: Design and Contracts

Design outputs:
- Data model: `C:/apps/wise-cash-app/specs/012-refine-balance-cta-layout/data-model.md`
- Contracts: `C:/apps/wise-cash-app/specs/012-refine-balance-cta-layout/contracts/dashboard-and-transactions-cta-contract.md`
- Quickstart/manual validation: `C:/apps/wise-cash-app/specs/012-refine-balance-cta-layout/quickstart.md`

Agent context update:
- Run `C:/apps/wise-cash-app/.specify/scripts/powershell/update-agent-context.ps1 -AgentType copilot`

## Post-Design Constitution Check

Gate Assessment (Post-Phase 1): PASS
- Clean Code: contratos e entidades visuais refletem responsabilidades de tela sem ambiguidade.
- Intentional Simplicity: abordagem por composicao/classes e reuso de componente base para CTA.
- Personal-Use Value: melhora uso diario ao reduzir dispersao de acoes e aumentar legibilidade.
- Practical Modernity: mantem padroes atuais de componentes e responsividade.
- No Automated Tests: validacoes manuais explicitadas em quickstart e contratos.

## Complexity Tracking

> **Fill ONLY if Constitution Check has violations that must be justified**

| Violation | Why Needed | Simpler Alternative Rejected Because |
|-----------|------------|-------------------------------------|
| None | N/A | N/A |
