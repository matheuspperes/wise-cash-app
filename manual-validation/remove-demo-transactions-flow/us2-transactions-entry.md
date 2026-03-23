# US2 Evidence - Transactions Entry

## Status
- PASS

## Evidence
- Dashboard header transactions link points to `/transactions?view=history`.
- Dashboard plus CTAs point to `/transactions?view=new`.
- `/transactions` resolves section state by `view` via parser with fallback to `history`.
- History section preserves search and date/type/category filters.
- Transaction list renders both income and expense records.
