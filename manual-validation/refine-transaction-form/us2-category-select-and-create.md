# US2 Validation - Category Select and Create

## Checklist
- [x] Category free input replaced by grouped select.
- [x] Presets grouped by type and sorted alphabetically.
- [x] Create-new option is available in the same flow.
- [x] New category is persisted in-memory and auto-selected in current transaction.
- [x] Duplicate category is blocked by trim + case-insensitive normalization.
- [x] Empty new-category name is blocked with clear guidance.

## Evidence
- Grouped category presets implemented via lib/ui/transaction-category-presets.ts.
- Create-new flow and validation implemented in components/transactions/transaction-form.tsx.
- Duplicate check implemented via lib/ui/category-normalization.ts.
- Post-fix validation: selecting "Criar nova categoria..." no longer triggers premature "Categoria obrigatória"; submit now validates custom name and persists it when valid.

## Revalidation Notes
- Date: 2026-03-23
- Issue addressed: create-new category path was blocked by category required validation before submit logic.
- Fix reference: components/transactions/transaction-form.tsx now keeps sentinel value in create-new mode and resolves custom category during submit.
