# Implementation Plan: Ajuste de Grafico e Historico Completo

**Branch**: `007-fix-chart-indicators-history` | **Date**: 2026-03-22 | **Spec**: `/specs/007-fix-chart-indicators-history/spec.md`
**Input**: Feature specification from `/specs/007-fix-chart-indicators-history/spec.md`

**Note**: Plano preenchido pelo fluxo speckit.plan para esta feature.

## Summary

Aplicar ajustes pontuais e eficientes de layout no grafico mensal para corrigir colisao dos indicadores de mes com a borda inferior, reduzir espacamento desnecessario entre o titulo "Historico mensal" e a legenda e definir um comportamento dinamico simples e intuitivo para os labels do eixo vertical, evitando repeticoes como "0k" ou "1k". Em paralelo, ampliar a tela de Transacoes com uma secao dedicada de historico completo de gastos, agrupado por mes em acordeao, mantendo a listagem atual sem substituicao e preservando consistencia visual com a dashboard.

## Technical Context

**Language/Version**: TypeScript 5.8, React 18, Next.js 15  
**Primary Dependencies**: Tailwind CSS, Recharts, TanStack Query, Framer Motion, react-hook-form, Zod  
**Storage**: N/A (sem mudanca de persistencia; dados continuam em repositorio em memoria/API existente)  
**Validation**: Validacao manual por cenarios com evidencias em `manual-validation/fix-chart-indicators-history/`  
**Target Platform**: Web responsivo (desktop e mobile)  
**Project Type**: Aplicacao web Next.js (App Router)  
**Performance Goals**: Manter acrescimo de renderizacao da nova secao mensal em Transacoes em ate 200ms, para ate 24 meses e ate 500 linhas de despesas, em validacao manual local; preservar fluidez visual da dashboard sem degradacao perceptivel do grafico  
**Constraints**: Sem testes automatizados por constituicao; manter solucao simples e intuitiva para labels do eixo Y; evitar overflow horizontal e preservar legibilidade  
**Scale/Scope**: Componentes de grafico na dashboard, fluxo de navegacao para Transacoes e nova secao de historico completo de gastos agrupada por mes

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
specs/007-fix-chart-indicators-history/
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
├── api/
├── transactions/
└── page.tsx

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
└── fix-chart-indicators-history/
```

**Structure Decision**: Manter a estrutura atual da aplicacao web unica e concentrar mudancas em componentes da dashboard/transacoes, utilitarios de dados/formatacao e documentacao de validacao manual da feature.

## Complexity Tracking

Sem violacoes de constituicao a justificar neste plano.

## Constitution Check (Post-Design)

- Clean Code: PASS
- Intentional Simplicity: PASS
- Personal-Use Value: PASS
- Practical Modernity: PASS
- No Automated Tests: PASS (validacao manual mantida)
