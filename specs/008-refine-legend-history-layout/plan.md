# Implementation Plan: Refinar Legenda, Saldo Historico e Tabela Mensal

**Branch**: `008-refine-legend-history-layout` | **Date**: 2026-03-22 | **Spec**: `/specs/008-refine-legend-history-layout/spec.md`
**Input**: Feature specification from `/specs/008-refine-legend-history-layout/spec.md`

**Note**: Plano preenchido pelo fluxo speckit.plan para esta feature.

## Summary

Refinar a legibilidade e hierarquia da dashboard com tres ajustes coordenados: mover a legenda de Receitas e Despesas para acima do grafico, alinhada a direita e fora da area de plotagem; reduzir o destaque do card de Saldo liquido historico com largura aproximada de 70% em desktop e largura total em mobile empilhado, mantendo-o no lado direito; e adaptar a tabela mensal para mostrar transacoes ativas do mes atual (receitas e despesas) com colunas Data, Descricao, Categoria, Tipo e Valor em ordem decrescente por data.

## Technical Context

**Language/Version**: TypeScript 5.8, React 18, Next.js 15  
**Primary Dependencies**: Tailwind CSS, Recharts, TanStack Query, Framer Motion, react-hook-form, Zod  
**Storage**: N/A (sem mudanca de persistencia; dados continuam em repositorio em memoria/API existente)  
**Validation**: Validacao manual por cenarios com evidencias em `manual-validation/refine-legend-history-layout/`  
**Target Platform**: Web responsivo (desktop e mobile)  
**Project Type**: Aplicacao web Next.js (App Router)  
**Performance Goals**: Preservar renderizacao fluida da dashboard e manter leitura do grafico sem obstrucao visual da legenda  
**Constraints**: Sem testes automatizados por constituicao; manter adaptacao restrita ao layout existente sem refatoracoes amplas; sem regressao de dados da dashboard  
**Scale/Scope**: Componentes de dashboard (grafico, cards de resumo e tabela do mes atual) e camada de dados da tabela mensal

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
specs/008-refine-legend-history-layout/
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
│   └── dashboard/
└── page.tsx

components/
└── dashboard/
    ├── area-history-chart.tsx
    ├── dashboard-page-client.tsx
    ├── current-month-expenses-table.tsx
    └── historical-total-balance-card.tsx

lib/
├── services/
├── repositories/
├── ui/
├── i18n/
└── formatting/

manual-validation/
└── refine-legend-history-layout/
```

**Structure Decision**: Manter estrutura unica da aplicacao e concentrar mudancas em componentes da dashboard e camada de servico/repositorio para o escopo da tabela mensal, sem criar novos modulos fora do dominio atual.

## Complexity Tracking

Sem violacoes de constituicao a justificar neste plano.

## Constitution Check (Post-Design)

- Clean Code: PASS
- Intentional Simplicity: PASS
- Personal-Use Value: PASS
- Practical Modernity: PASS
- No Automated Tests: PASS (validacao manual mantida)
