# Data Model - Navegacao e Gestao de Recorrencias

## Entity: RecurrencesViewState
- Purpose: Representa o estado da tela `?view=recurrences`.
- Fields:
  - pendingItems: PendingConfirmationItem[]
  - recurrenceItems: RecurrenceListItem[]
  - isLoading: boolean
  - errorMessage: string | null
- Validation Rules:
  - Blocos `Pendências` e `Recorrências` sempre visiveis, mesmo vazios.

## Entity: PendingConfirmationItem
- Source: `RecurrencePendingConfirmationRow` (dashboard-history-types).
- Fields:
  - id: string
  - name: string
  - categoryName: string
  - type: income | expense
  - amount: number
  - dueDate: string
- Actions:
  - confirm(id): confirma pendencia
  - cancel(id): cancela pendencia
- Validation Rules:
  - `id` obrigatorio para acao local
  - `amount` exibido em BRL

## Entity: RecurrenceListItem
- Source: `RecurrenceRuleRecord` + dados de exibicao calculados.
- Fields:
  - id: string
  - templateName: string
  - templateCategoryName: string
  - templateType: income | expense
  - templateAmount: number
  - dayOfMonth: number
  - nextScheduledDate: string
  - recurrenceType: limited | unlimited
  - maxCycles: number | null
  - generatedCycles: number
  - isActive: boolean
- Derived Fields:
  - statusLabel: string
  - monthsRemaining: number | null
- Validation Rules:
  - `statusLabel` MUST ser `Ilimitada` quando `recurrenceType=unlimited`.
  - Para `limited`, `monthsRemaining = max(maxCycles - generatedCycles, 0)`.

## Entity: RecurrenceStatusSummary
- Purpose: Texto compacto de status para tabela/lista.
- Cases:
  - unlimited -> `Ilimitada`
  - limited com meses = 1 -> `1 mês faltante`
  - limited com meses > 1 -> `{N} meses faltantes`
  - limited com meses = 0 -> `Sem ciclos restantes`

## Relationships
- `RecurrencesViewState.pendingItems` deriva de pendencias de instancias de recorrencia.
- `RecurrencesViewState.recurrenceItems` deriva de regras de recorrencia persistidas.
- Acoes em `PendingConfirmationItem` afetam o dashboard summary e podem refletir na lista.

## UI State Transitions

### Navegacao de view
- `transactions?view=history` -> `transactions?view=recurrences` (via botao no dashboard)
- `transactions?view=recurrences` -> outras views (`history`, `new`) sem perder consistencia dos dados.

### Mutacoes de pendencia
- pending -> confirmed (acao confirmar)
- pending -> canceled (acao cancelar)

### Mutacoes de recorrencia
- isActive true -> false (excluir/desativar com confirmacao)
- edit request -> abre drawer/modal mantendo lista visivel ao fundo
