# Data Model: Refino de Dashboard e Historico

## Entity: HistoricalTotalBalance
- Description: Saldo liquido agregado do periodo historico selecionado.
- Fields:
  - periodStart: string (data inicial do filtro)
  - periodEnd: string (data final do filtro)
  - totalIncome: number
  - totalExpense: number
  - netTotal: number (totalIncome - totalExpense)
- Validation Rules:
  - netTotal MUST ser calculado como receitas - despesas.
  - Valor exibido no card secundario MUST manter hierarquia visual secundaria.

## Entity: CurrentMonthExpenseRow
- Description: Registro tabular de gasto do mes atual exibido abaixo do grafico.
- Fields:
  - date: string
  - description: string
  - category: string
  - amount: number
- Validation Rules:
  - Apenas transacoes de tipo despesa do mes atual entram na tabela.
  - Ordenacao padrao MUST ser data decrescente.
  - Estado vazio MUST ser exibido quando lista estiver sem itens.

## Entity: DynamicYAxisProfile
- Description: Perfil de configuracao dinamica do eixo vertical do grafico.
- Fields:
  - seriesMax: number
  - headroomPercent: number (10)
  - axisMax: number (seriesMax * 1.1)
  - tickCount: number (5)
- Validation Rules:
  - axisMax MUST refletir maximo da serie + 10%.
  - tickCount MUST permanecer em 5 marcas principais.

## Entity: DashboardNavActionSet
- Description: Conjunto de acoes de navegacao visiveis no cabecalho da dashboard.
- Fields:
  - actions: string[]
- Validation Rules:
  - Conjunto MUST conter apenas acao de Transacoes no nav simplificado.

## Relationships
- HistoricalTotalBalance depende do mesmo periodo usado para compor a serie do grafico.
- CurrentMonthExpenseRow complementa leitura da serie mensal com detalhe transacional.
- DynamicYAxisProfile afeta diretamente a renderizacao do grafico mensal.
- DashboardNavActionSet impacta navegabilidade da dashboard.

## State Transitions
- Tabela de gastos do mes atual:
  - data-found -> ordered-desc-list
  - no-data -> empty-state
- Perfil do eixo Y:
  - data-updated -> recalculate-seriesMax -> recalculate-axisMax-and-ticks
