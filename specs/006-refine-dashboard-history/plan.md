# Implementation Plan: Refino de Dashboard e Historico

**Branch**: `006-refine-dashboard-history` | **Date**: 2026-03-22 | **Spec**: `/specs/006-refine-dashboard-history/spec.md`
**Input**: Feature specification from `/specs/006-refine-dashboard-history/spec.md`

**Note**: Plano preenchido pelo fluxo speckit.plan para esta feature.

## Summary

Aplicar refino visual consistente em toda a aplicacao com aumento global de 20% sem degradar legibilidade, aprimorar leitura do grafico (legenda, eixo Y dinamico e espacamento de meses), simplificar nav da dashboard, incluir card secundario de saldo historico (20% menor que o card principal) e adicionar tabela de gastos do mes atual abaixo do grafico. A abordagem usa ajustes incrementais em tokens/layout, componentes de dashboard/transacoes e pipeline de dados para agregacoes e tabela, com validacao manual orientada a cenarios.

## Technical Context

**Language/Version**: TypeScript 5.8, React 18, Next.js 15  
**Primary Dependencies**: Tailwind CSS, Recharts, TanStack Query, Framer Motion, react-hook-form, Zod  
**Storage**: N/A (sem mudanca de persistencia; dados continuam em APIs/repositorios existentes)  
**Validation**: Validacao manual por cenario com evidencias em `manual-validation/refine-dashboard-history/`  
**Target Platform**: Web responsivo (desktop e mobile)  
**Project Type**: Aplicacao web Next.js (App Router)  
**Performance Goals**: Manter renderizacao fluida e leitura clara do grafico/novos blocos sem regressao perceptivel de UX  
**Constraints**: Sem testes automatizados por constituicao; preservar consistencia visual sem sobrecarregar a interface; evitar overflow horizontal  
**Scale/Scope**: Dashboard e telas impactadas da aplicacao para escala global; nav da dashboard; grafico mensal; tabela de gastos do mes atual; card de saldo historico

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

- Clean Code: naming clarity, single responsibility, and readability constraints defined
- Intentional Simplicity: no speculative abstractions without explicit justification
- Personal-Use Value: feature value is direct for personal usage and low operational friction
- Practical Modernity: stack choices are current and actively maintained
- No Automated Tests: validation strategy is manual, scenario-based, and documented

Resultado inicial: PASS. Nenhuma violacao prevista para iniciar pesquisa e design.

## Project Structure

### Documentation (this feature)

```text
specs/006-refine-dashboard-history/
├── plan.md
├── research.md
├── data-model.md
├── quickstart.md
├── contracts/
└── tasks.md
```

### Source Code (repository root)

```text
app/
├── page.tsx
├── transactions/
└── api/

components/
├── dashboard/
├── transactions/
└── ui/

lib/
├── formatting/
├── i18n/
├── repositories/
├── services/
└── ui/

manual-validation/
└── refine-dashboard-history/
```

**Structure Decision**: Manter arquitetura atual de app web unica e concentrar mudancas em componentes visuais reutilizaveis, grafico e camada de agregacao/listagem para tabela do mes atual, com evidencias manuais no diretorio da feature.

## Complexity Tracking

Sem violacoes de constituicao a justificar neste plano.

## Constitution Check (Post-Design)

- Clean Code: PASS
- Intentional Simplicity: PASS
- Personal-Use Value: PASS
- Practical Modernity: PASS
- No Automated Tests: PASS (validacao manual mantida)
