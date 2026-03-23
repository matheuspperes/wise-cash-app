# US3 Current Month Transactions Evidence

## Status
- PASS

## Steps
1. Open dashboard and inspect current-month table.
2. Confirm only active transactions from current month are rendered.
3. Confirm income and expense rows are present when data exists.
4. Confirm column set and descending date order.
5. Confirm empty state when no current-month transactions exist.

## Observations
- Created runtime seed data through API: one income and one expense in current month, plus one expense in previous month.
- Dashboard summary response included currentMonthTransactions with both income and expense rows.
- Deleting one current-month expense removed it from currentMonthTransactions, confirming active-only filtering.
- Added an older current-month expense and confirmed date-desc ordering in payload output.
- UI contract confirmed in component: columns Data, Descricao, Categoria, Tipo, Valor and explicit signed value rendering.