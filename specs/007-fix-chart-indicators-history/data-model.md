# Data Model: Ajuste de Grafico e Historico Completo

## Entity: DynamicChartAxisProfile
- Description: Perfil dinamico do eixo vertical do grafico para manter labels legiveis sem repeticao.
- Fields:
  - seriesMin: number
  - seriesMax: number
  - topPaddingPercent: number
  - axisMax: number
  - tickCount: number
  - formatterMode: string (compact-k)
- Validation Rules:
  - axisMax MUST ser calculado a partir do maximo da serie com folga.
  - tickCount MUST se adaptar ao intervalo para evitar labels repetidos.
  - labels do eixo Y MUST permanecer legiveis em serie unica e baixa amplitude.

## Entity: ChartLabelLayoutState
- Description: Configuracao de layout para posicionamento dos labels de mes e espacamento titulo-legenda.
- Fields:
  - xAxisTickMargin: number
  - chartBottomMargin: number
  - chartTopMargin: number
  - legendPaddingBottom: number
  - monthLabelCollisionGuard: boolean
- Validation Rules:
  - monthLabelCollisionGuard MUST impedir sobreposicao dos labels com borda inferior.
  - espacamento titulo-legenda MUST ser equilibrado (sem excesso e sem colisao).

## Entity: MonthlyExpenseHistoryGroup
- Description: Grupo mensal de gastos para exibicao completa em Transacoes.
- Fields:
  - monthRef: string (AAAA-MM)
  - monthLabel: string
  - isCollapsedByDefault: boolean
  - rows: ExpenseHistoryRow[]
- Validation Rules:
  - grupos MUST ser ordenados do mes mais recente para o mais antigo.
  - isCollapsedByDefault MUST ser true na carga inicial.

## Entity: ExpenseHistoryRow
- Description: Linha da tabela de gastos no historico completo.
- Fields:
  - date: string
  - description: string
  - category: string
  - amount: number
- Validation Rules:
  - colunas MUST ser Data, Descricao, Categoria e Valor.
  - ordenacao MUST ser data decrescente dentro de cada grupo mensal.

## Relationships
- DynamicChartAxisProfile e ChartLabelLayoutState atuam juntos na renderizacao do grafico mensal.
- MonthlyExpenseHistoryGroup agrega multiplas ExpenseHistoryRow por referencia mensal.
- ExpenseHistoryRow e derivada de transacoes de tipo despesa no historico completo.

## State Transitions
- Axis profile:
  - data-updated -> recalculate-domain -> recalculate-ticks -> render-legend/axis
- Monthly groups:
  - load-all-months -> grouped-by-month-desc -> collapsed-by-default -> user-expands-group
