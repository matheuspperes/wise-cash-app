# Contract: Chart and Transactions History Refinement (Feature 007)

## Scope
Contrato de apresentacao e comportamento para ajustes de labels/espacamentos do grafico da dashboard e adicao de tabela de gastos com historico completo em Transacoes.

## Consumer Surfaces
- components/dashboard/area-history-chart.tsx
- components/dashboard/dashboard-page-client.tsx
- app/transactions/page.tsx
- components/transactions/*
- app/api/dashboard/summary/route.ts

## Contract 1: Month Labels and Legend Spacing
- Input: Serie mensal, titulo "Historico mensal" e configuracao de legenda.
- Output Required:
  - Labels de mes visiveis sem encostar na borda inferior do bloco.
  - Distancia entre titulo e legenda sem excesso.
- Rule: Nenhum ajuste pode reduzir legibilidade dos eixos.

## Contract 2: Dynamic Vertical Axis Labels
- Input: Valores da serie no periodo exibido.
- Output Required:
  - Limite superior do eixo baseado no maximo da serie com folga.
  - Tick distribution adaptativa para evitar repeticao de labels (ex.: "0k"/"1k").
- Rule: Comportamento deve permanecer estavel para serie unica e serie de baixa amplitude.

## Contract 3: Full Monthly Expense History in Transactions
- Input: Historico completo de gastos disponiveis.
- Output Required:
  - Exibicao de todos os meses na carga inicial.
  - Grupos mensais em acordeao fechados por padrao.
  - Colunas Data, Descricao, Categoria e Valor.
  - Ordenacao por data desc dentro de cada mes.
- Rule: Ordem dos grupos mensais deve ser do mais recente para o mais antigo.

## Contract 4: Coexistence with Existing Transactions List
- Input: Tela atual de Transacoes.
- Output Required:
  - Manter bloco atual de lancamentos.
  - Adicionar secao dedicada da nova tabela mensal sem substituir o bloco existente.
- Rule: Nao introduzir regressao visual/funcional no fluxo atual.

## Acceptance Mapping
- FR-001, FR-002 -> Contract 1
- FR-003, FR-004 -> Contract 2
- FR-005, FR-006, FR-007, FR-008, FR-010, FR-011, FR-012 -> Contract 3
- FR-009, FR-013 -> Contract 4
