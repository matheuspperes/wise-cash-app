# Quickstart: Consistência visual do fluxo atual

## Goal

Validate the UI consistency adjustments manually after implementation.

## What to verify

1. Open the dashboard and confirm the visible table no longer shows the `Tipo` column.
2. Open the transactions page and confirm all accordions/tables that reuse the same transaction model also hide `Tipo`.
3. Open the Data screen and confirm the header follows the same visual pattern as the other main pages.
4. On desktop, confirm import and export cards occupy visually equivalent space.
5. On mobile, confirm the import and export cards stack vertically with full width while the model-download block stays separate.
6. Open a transaction in the edit drawer and confirm the amount field behaves like the new transaction amount field: same mask, same formatting, same validation feel.
7. Save an edited transaction and confirm the existing list/update flow remains unchanged.

## Notes

- The `Tipo` column is expected to stay hidden in the dashboard summary table and in every transaction-history view that reuses the current row models.
- The edit drawer amount field should display and parse values using the same BRL mask behavior as the new-transaction form.

## Manual evidence to collect

- A short screenshot or note from each of the four areas: dashboard, transactions, Data screen desktop, Data screen mobile.
- A note confirming that the edit drawer amount field matches the creation flow.

## Done criteria

- No visible `Tipo` column in the affected tables.
- Balanced Data screen sections on desktop and stacked sections on mobile.
- Edit amount field behaves consistently with the creation field.