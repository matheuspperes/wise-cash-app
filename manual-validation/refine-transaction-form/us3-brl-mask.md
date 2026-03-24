# US3 Validation - BRL Mask

## Checklist
- [x] Amount input masks in BRL with R$ prefix.
- [x] Input follows continuous cents interpretation.
- [x] Deletion and retyping keep stable behavior.
- [x] Empty amount state is blocked on submit.
- [x] Persisted amount matches masked display value.
- [x] Stress scenario: 30 digits typed and 20 type-toggle alternations preserve input consistency and no visible delay > 1s.

## Evidence
- BRL helper implemented in lib/formatting/brl-currency-mask.ts.
- Form integration and submit mapping implemented in components/transactions/transaction-form.tsx.
- Submit uses parseBrlDisplayToAmount and validates amount > 0.
