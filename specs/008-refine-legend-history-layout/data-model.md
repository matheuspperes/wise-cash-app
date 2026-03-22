# Data Model: Refinar Legenda, Saldo Historico e Tabela Mensal

## Entity: ChartLegendLayoutState
- Description: Estado de posicionamento da legenda de Receitas e Despesas no contexto do grafico mensal.
- Fields:
  - position: string (top-outside-right)
  - isOutsidePlotArea: boolean
  - alignsWithChartHeader: boolean
  - keepsDataVisible: boolean
- Validation Rules:
  - position MUST ser top-outside-right.
  - isOutsidePlotArea MUST ser true.
  - keepsDataVisible MUST impedir obstrucao de linhas/pontos do grafico.

## Entity: HistoricalNetBalanceCardState
- Description: Estado visual do card de saldo historico na composicao da dashboard.
- Fields:
  - desktopWidthRatio: number
  - mobileStackWidthMode: string (full)
  - alignment: string (right)
  - visualPriority: string (secondary)
- Validation Rules:
  - desktopWidthRatio MUST aproximar 0.70.
  - mobileStackWidthMode MUST ser full.
  - alignment MUST permanecer right na composicao principal.

## Entity: CurrentMonthTransactionRow
- Description: Linha de transacao exibida na tabela do mes atual.
- Fields:
  - date: string
  - description: string
  - category: string
  - type: string (income|expense)
  - value: number
  - status: string (active)
- Validation Rules:
  - type MUST identificar entrada ou saida.
  - status MUST ser active para exibicao.
  - value MUST respeitar formatacao monetaria da dashboard.

## Entity: CurrentMonthTransactionsView
- Description: Conjunto de linhas transacionais ativas filtradas para o mes atual.
- Fields:
  - monthRef: string (AAAA-MM)
  - rows: CurrentMonthTransactionRow[]
  - columns: string[]
  - sortOrder: string (date-desc)
  - emptyStateMessage: string
- Validation Rules:
  - monthRef MUST corresponder ao mes vigente.
  - columns MUST ser [Data, Descricao, Categoria, Tipo, Valor].
  - sortOrder MUST ser date-desc.

## Relationships
- ChartLegendLayoutState afeta renderizacao do componente de grafico mensal.
- HistoricalNetBalanceCardState afeta composicao de cards de resumo na dashboard.
- CurrentMonthTransactionsView agrega varias CurrentMonthTransactionRow filtradas por mes e status.

## State Transitions
- Legend state:
  - default-position -> move-top-outside-right -> validate-non-overlap -> render
- Historical card state:
  - default-size -> apply-desktop-ratio/mobile-full -> align-right -> render
- Monthly table state:
  - fetch-transactions -> filter-active-current-month -> sort-date-desc -> render-or-empty
