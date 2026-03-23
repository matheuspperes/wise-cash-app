# Data Model: Remove Demo and Unify Transactions Flow

## Entity: DashboardSummaryView
- Description: Payload consumed by dashboard UI with only real data.
- Fields:
  - currentMonth: string
  - netBalance: number
  - totals: { income: number; expense: number }
  - historicalBalance: HistoricalTotalBalance
  - areaSeries: MonthlyPoint[] (real income/expense only)
  - currentMonthTransactions: CurrentMonthTransactionRow[]
  - fullTransactionsHistoryGroups: MonthlyTransactionsHistoryGroup[]
- Validation Rules:
  - Must not include demoMode, hasDemoSeries, demoIncome, or demoExpense.
  - areaSeries values must be derived from active real transactions only.

## Entity: TransactionsNavigationIntent
- Description: URL-driven section state for /transactions.
- Fields:
  - view: "history" | "new"
  - source: "dashboard-transactions-cta" | "dashboard-plus-cta" | "direct-url"
- Validation Rules:
  - Missing or invalid view resolves to "history".
  - "history" opens filters + history section.
  - "new" opens creation section.

## Entity: TransactionsHistoryView
- Description: Unified history list replacing expenses-only display language.
- Fields:
  - items: TransactionListItem[]
  - filters: { from?: string; to?: string; type?: "income" | "expense"; categoryId?: string; q?: string }
  - scope: "full-history"
- Validation Rules:
  - Includes both income and expense transaction types.
  - Supports current filter set (date/type/category/search).

## Entity: HistoricalBalanceCardState
- Description: Visual state and alignment constraints for historical balance card.
- Fields:
  - desktopWidthRatioTarget: number (0.70)
  - desktopWidthTolerance: number (0.05)
  - contentAlignment: "right"
  - mobileBehavior: "responsive-legible"
- Validation Rules:
  - Desktop ratio remains in [0.65, 0.75] relative to prior reference.
  - Title and value are right-referenced.

## Relationships
- DashboardSummaryView provides chart + KPI + monthly rows to dashboard components.
- TransactionsNavigationIntent determines section visibility in /transactions page.
- TransactionsHistoryView consumes repository/search output and filter state.
- HistoricalBalanceCardState constrains dashboard card layout rendering.
