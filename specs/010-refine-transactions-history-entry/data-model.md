# Data Model: Refine Transactions History Entry

## Entity: FilterActivationState
- Description: Tracks whether history filter interaction was manually initiated in current page session.
- Fields:
  - hasUserEditedFilter: boolean
  - editedFields: string[] (optional trace for UI behavior)
  - lastEditedAt: string (ISO datetime, optional)
- Validation Rules:
  - `hasUserEditedFilter` becomes true only after manual field change.
  - Clearing all filters may keep interaction state but must hide results if no active criteria remain.

## Entity: TransactionsHistoryResultContext
- Description: Render context for filtered transactions section in `/transactions?view=history`.
- Fields:
  - sectionVisible: boolean
  - sectionTitle: string (must communicate filtered results)
  - filters: { type?: "income" | "expense"; categoryId?: string; from?: string; to?: string; q?: string }
  - items: TransactionRowView[]
  - emptyStateMessage: string
- Validation Rules:
  - `sectionVisible` true only when manual filter interaction + at least one effective criterion.
  - Empty state displayed when section visible and `items.length === 0`.

## Entity: FullTransactionsHistoryView
- Description: Complete history block rendered independently from filtered-results section.
- Fields:
  - title: "Historico completo"
  - monthlyGroups: MonthlyTransactionHistoryGroup[]
  - includedTypes: ["income", "expense"]
- Validation Rules:
  - Must include both income and expense transactions.
  - Grouping logic remains month-based with stable ordering.

## Entity: SummaryHistoryGroupsPayload
- Description: API payload contract for grouped full-history rows from dashboard summary endpoint.
- Fields:
  - fullTransactionsHistoryGroups: MonthlyTransactionHistoryGroup[] (canonical)
  - fullExpenseHistoryGroups?: MonthlyTransactionHistoryGroup[] (legacy transitional alias)
- Validation Rules:
  - Consumers must use `fullTransactionsHistoryGroups` as source of truth.
  - Legacy alias is temporary and should be removed after compatibility migration.

## Entity: SessionLaunchEntry
- Description: One newly saved transaction row shown in temporary table in `view=new`.
- Fields:
  - id: string
  - transactionDate: string (YYYY-MM-DD)
  - name: string
  - categoryName: string
  - type: "income" | "expense"
  - amount: number
  - savedAt: string (ISO datetime)
- Validation Rules:
  - Added only on successful save response.
  - Amount must be numeric and positive.

## Entity: TemporaryLaunchesTableState
- Description: In-page session list for "Lancamentos" table in `view=new`.
- Fields:
  - entries: SessionLaunchEntry[]
  - sortOrder: "newest-first"
  - isVisible: boolean
- Validation Rules:
  - `entries` ordered newest-first.
  - Table cleared on leaving `view=new`.
  - Table resets on page refresh/new page session.

## Shared Table Column Contract
- Description: Consistent column semantics used by transactions table surfaces.
- Fields:
  - columns: ["Data", "Descricao", "Categoria", "Tipo", "Valor"]
  - valueAlignment: "right"
  - valueFormat: "currency-brl-with-sign"
- Validation Rules:
  - Numeric value column always right-aligned.
  - Income values display positive sign; expense values display negative sign.

## Relationships
- FilterActivationState governs TransactionsHistoryResultContext visibility.
- TransactionsHistoryResultContext and FullTransactionsHistoryView can coexist in `view=history`.
- SessionLaunchEntry composes TemporaryLaunchesTableState during `view=new`.
- Shared Table Column Contract constrains both filtered-results table and temporary launches table rendering.
