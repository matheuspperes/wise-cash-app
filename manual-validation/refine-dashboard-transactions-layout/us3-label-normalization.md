# US3 Label Normalization Validation

Date: 2026-03-23
Covers: SC-003

## Checklist

- [x] Dashboard create CTA label uses "Nova Transação".
- [x] Transactions history footer create CTA label uses "Nova Transação".
- [x] No affected create label keeps unaccented variant.

## Search/inspection evidence

- components/dashboard/dashboard-page-client.tsx: create CTA text updated.
- app/transactions/page.tsx: history footer CTA text updated.

## Result

- PASS: affected surfaces consistently display "Nova Transação".
