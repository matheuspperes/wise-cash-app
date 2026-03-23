# Quickstart: Refine Dashboard and Transactions Navigation Layout

## Goal
Deliver a consistent dashboard and transactions layout refinement that improves control placement, spacing balance, CTA copy correctness, and deterministic navigation.

## Implementation Steps
1. Reposition period selector beside chart legend in dashboard chart header area.
2. Enforce same-row behavior for legend + selector in small widths by reducing selector width to minimum readable size.
3. Adjust balance cards composition to hit desktop gap target of 16px (+/-4px) between current and historical cards.
4. Normalize affected labels to "Nova Transação" in UI copy.
5. In /transactions header, keep simple return button beside title and remove duplicate top create CTA.
6. Set return button destination to dashboard root route (/).
7. Place "Nova Transação" create CTA at page end in /transactions.
8. Keep create CTA destination as /transactions?view=new.
9. Verify existing period filter behavior and route outcomes remain unchanged.

## Manual Validation Scenarios
1. Dashboard shows legend and period selector on same row without overlap in supported breakpoints.
2. On narrow widths, selector shrinks while remaining readable and still aligned on same row.
3. Desktop gap between balance cards measures within 12-20px.
4. Affected CTA labels display "Nova Transação".
5. /transactions header shows only return button beside title and no top create CTA.
6. Return button label is exactly "Voltar ao Dashboard".
7. Return button click always opens /.
8. Footer "Nova Transação" CTA appears at page end and opens /transactions?view=new.
9. Existing filter and navigation behavior remains functionally consistent.

## Evidence Files (manual validation)
- manual-validation/refine-dashboard-transactions-layout/setup-baseline.md
- manual-validation/refine-dashboard-transactions-layout/us1-dashboard-controls.md
- manual-validation/refine-dashboard-transactions-layout/us2-balance-card-gap.md
- manual-validation/refine-dashboard-transactions-layout/us3-label-normalization.md
- manual-validation/refine-dashboard-transactions-layout/us4-transactions-navigation.md
- manual-validation/refine-dashboard-transactions-layout/regression-checklist.md
- manual-validation/refine-dashboard-transactions-layout/regression-summary.md
- manual-validation/refine-dashboard-transactions-layout/quickstart-signoff.md
