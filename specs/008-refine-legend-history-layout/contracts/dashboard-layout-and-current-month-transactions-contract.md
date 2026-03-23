# Contract: Dashboard Layout and Current-Month Transactions (Feature 008)

## Scope
Contrato de comportamento para reposicionamento da legenda do grafico, ajuste do card de saldo historico e adaptacao da tabela mensal para transacoes ativas do mes atual.

## Consumer Surfaces
- components/dashboard/area-history-chart.tsx
- components/dashboard/dashboard-page-client.tsx
- components/dashboard/historical-total-balance-card.tsx
- components/dashboard/current-month-expenses-table.tsx
- app/api/dashboard/summary/route.ts
- lib/services/current-month-expenses.ts

## Contract 1: Legend Positioning
- Input: Serie mensal do grafico e configuracao atual da legenda.
- Output Required:
  - Legenda acima do grafico.
  - Alinhamento a direita.
  - Legenda fora da area de plotagem.
- Rule: Nenhum dado do grafico pode ser encoberto pela legenda.

## Contract 2: Historical Net Balance Card Hierarchy
- Input: Bloco de cards de resumo da dashboard.
- Output Required:
  - Card historico com largura aproximada de 70% em desktop.
  - Card historico no lado direito da composicao principal.
  - Em layout mobile empilhado, card historico com largura total.
- Rule: Ajuste deve preservar consistencia visual geral da dashboard.

## Contract 3: Current-Month Transactions Table
- Input: Transacoes disponiveis no contexto do usuario.
- Output Required:
  - Exibir apenas transacoes ativas com transactionDate no mes atual.
  - Colunas Data, Descricao, Categoria, Tipo e Valor.
  - Ordenacao por data decrescente.
  - Estado vazio claro sem quebra de layout.
- Rule: Incluir receitas e despesas do mes vigente; excluir registros inativos.

## Acceptance Mapping
- FR-001, FR-002, FR-013 -> Contract 1
- FR-003, FR-004, FR-011 -> Contract 2
- FR-005, FR-006, FR-007, FR-008, FR-009, FR-012, FR-014 -> Contract 3
