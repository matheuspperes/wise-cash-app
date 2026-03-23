# Quickstart: Remove Demo and Unify Transactions Flow

## Goal
Implement feature 009 by removing demo mode artifacts, unifying transactions navigation behavior, simplifying /transactions UI wording/sections, and applying historical card hierarchy update without code disorder.

## Implementation Steps
1. Remove demo dependencies from dashboard client and related UI text/props.
2. Remove demo parsing and demo fields from dashboard summary route and repository composition.
3. Remove or deprecate demo helper modules no longer required by production flow.
4. Implement `/transactions` section-entry contract using `view=history|new`.
5. Add fallback behavior where missing/invalid `view` resolves to `history`.
6. Update dashboard Transacoes and + links to pass correct `view` values.
7. Update /transactions screen labels/sections to remove "Lancamentos" and keep full transactions history.
8. Ensure history listing includes income + expense while preserving filters.
9. Apply historical balance card sizing/alignment update (desktop 70% +/-5%, right-referenced content).
10. Verify responsive behavior and no regressions in loading/error/empty states.

## Manual Validation Scenarios
1. Dashboard contains no demo controls, badges, text, or demo payload artifacts.
2. `/api/dashboard/summary` response has no demo fields/series.
3. Dashboard "Transacoes" opens `/transactions?view=history` and lands in history section.
4. Dashboard "+" opens `/transactions?view=new` and lands in creation section.
5. `/transactions` with no `view` or invalid value opens history by default.
6. History table/list in /transactions includes both income and expense entries.
7. "Lancamentos" label/tab is absent from /transactions UI.
8. Historical balance card appears reduced and right-referenced on desktop and remains legible on mobile.

## Evidence Files (manual validation)
- `manual-validation/remove-demo-transactions-flow/us1-dashboard-no-demo.md`
- `manual-validation/remove-demo-transactions-flow/us2-transactions-entry.md`
- `manual-validation/remove-demo-transactions-flow/us3-historical-card-layout.md`
- `manual-validation/remove-demo-transactions-flow/us4-transactions-navigation-simplified.md`
- `manual-validation/remove-demo-transactions-flow/contract-compliance.md`
- `manual-validation/remove-demo-transactions-flow/regression-checklist.md`
- `manual-validation/remove-demo-transactions-flow/regression-summary.md`
- `manual-validation/remove-demo-transactions-flow/quickstart-signoff.md`
- `manual-validation/remove-demo-transactions-flow/flow-visual-consistency-matrix.md`
