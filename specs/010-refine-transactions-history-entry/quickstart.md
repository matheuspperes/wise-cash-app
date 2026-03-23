# Quickstart: Refine Transactions History Entry

## Goal
Implement feature 010 by clarifying filtered-results behavior in history view, broadening complete history semantics to gains + expenses, and adding a temporary launches table in new-transaction view with consistent table conventions.

## Implementation Steps
1. Add explicit filter-interaction tracking in `/transactions?view=history` to detect manual edits.
2. Gate filtered-results section rendering by manual interaction + active criteria.
3. Rename filtered-results heading to indicate filter outcome context.
4. Replace mixed list presentation with table presentation where needed to keep column consistency.
5. Rename "Historico completo de gastos" to "Historico completo".
6. Update complete-history source/grouping to include income + expense entries.
7. Extend `TransactionForm` save callback payload (or equivalent mechanism) so `view=new` can append new row to temporary table state.
8. Add temporary "Lancamentos" table in `view=new` with newest-first ordering and consistent columns.
9. Clear temporary table when leaving `view=new` and ensure no restore on refresh.
10. Validate responsive behavior for tables and empty states on mobile/desktop.

## Manual Validation Scenarios
1. `view=history` with untouched filters: filtered-results section does not render.
2. `view=history` after manual filter edit with matches: filtered-results section appears with contextual title and rows.
3. `view=history` after manual filter edit with no matches: section appears with explicit empty state.
4. "Historico completo" section title is present and data includes gains and expenses.
5. `view=new` successful save appends row in temporary "Lancamentos" table at top.
6. Multiple successful saves in `view=new` keep newest-first ordering.
7. Failed/invalid save does not append row.
8. Navigating away from `view=new` and back clears temporary table.
9. Refreshing page in `view=new` starts with empty temporary table.
10. Table headers/value alignment are consistent across filtered-results and temporary launches tables.

## Evidence Files (manual validation)
- `manual-validation/refine-transactions-history-entry/setup-baseline.md`
- `manual-validation/refine-transactions-history-entry/us1-filtered-results-gating.md`
- `manual-validation/refine-transactions-history-entry/us2-complete-history-income-expense.md`
- `manual-validation/refine-transactions-history-entry/us3-temporary-launches-table.md`
- `manual-validation/refine-transactions-history-entry/us4-table-consistency.md`
- `manual-validation/refine-transactions-history-entry/contract-compliance.md`
- `manual-validation/refine-transactions-history-entry/regression-checklist.md`
- `manual-validation/refine-transactions-history-entry/regression-summary.md`
- `manual-validation/refine-transactions-history-entry/quickstart-signoff.md`
