# Contract: Dashboard History Refinement (Feature 006)

## Scope
Contrato de apresentacao para refino de design consistente sem degradar a UI, cobrindo escala visual, grafico, nav da dashboard, card de saldo historico e tabela de gastos do mes atual.

## Consumer Surfaces
- components/dashboard/dashboard-page-client.tsx
- components/dashboard/dashboard-header.tsx
- components/dashboard/net-balance-card.tsx
- components/dashboard/area-history-chart.tsx
- app/transactions/page.tsx
- app/globals.css

## Contract 1: Global Scale Consistency
- Input: Estilos e layout dos componentes no escopo impactado.
- Output Required:
  - Incremento proporcional de 20% em elementos visuais impactados.
  - Preservacao de legibilidade em desktop/mobile.
- Rule: Sem overflow horizontal no escopo da feature.

## Contract 2: Dashboard Navigation Simplification
- Input: Acoes de nav do header da dashboard.
- Output Required:
  - Remocao do botao Dashboard.
  - Presenca de acao de Transacoes.
- Rule: Nao introduzir navegacao redundante para a propria tela atual.

## Contract 3: Chart Readability and Dynamic Axis
- Input: Serie mensal do grafico.
- Output Required:
  - Espacamento claro entre "Historico mensal" e legenda.
  - Labels de mes deslocados levemente para baixo.
  - Eixo Y com teto = maximo da serie + 10%.
  - Eixo Y com 5 ticks principais.
- Rule: Renderizacao deve permanecer estavel com variacao de amplitudes e com serie de unico ponto.

## Contract 4: Historical Summary Card
- Input: Totais de receitas e despesas do periodo selecionado.
- Output Required:
  - Card secundario exibindo saldo liquido do periodo (receitas - despesas).
  - Tamanho visual aproximado 20% menor que card principal.
- Rule: Hierarquia visual secundaria obrigatoria.

## Contract 5: Current Month Expense Table
- Input: Lancamentos de despesas do mes atual.
- Output Required:
  - Tabela abaixo do grafico com colunas Data, Descricao, Categoria e Valor.
  - Ordenacao por data decrescente.
  - Estado vazio claro quando nao houver registros.
- Rule: Tabela deve refletir dados atualizados do mes atual sem inconsistencias visiveis.

## Acceptance Mapping
- FR-001 -> Contract 1
- FR-002 -> Contract 4
- FR-003, FR-004, FR-005 -> Contract 3
- FR-006 -> Contract 2
- FR-007, FR-008, FR-010 -> Contract 5
- FR-009 -> Contract 1 + Contract 3 + Contract 5
