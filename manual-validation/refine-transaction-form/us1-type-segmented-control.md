# US1 Validation - Type Segmented Control

## Checklist
- [x] Two explicit options are visible: Despesa and Receita.
- [x] Selection is exclusive at all times.
- [x] Selected styles use expected color families and smooth transition.
- [x] Saved payload uses the active option type.

## Evidence
- Implemented segmented control in components/transactions/transaction-form.tsx.
- Verified state binding through onSubmit payload mapping and exclusive toggle behavior.
- Visual tokens applied:
  - Despesa selected background rgba(239,68,68,0.2)
  - Receita selected background rgba(34,197,94,0.2)
