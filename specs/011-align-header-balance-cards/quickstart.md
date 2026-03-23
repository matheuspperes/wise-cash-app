# Quickstart: Align Header and Balance Cards

## Goal
Implement feature 011 by aligning dashboard title/control hierarchy and balancing both KPI cards with objective left-anchored and vertically-equivalent content layout, while preserving existing interactions.

## Implementation Steps
1. Update dashboard top composition so title is left and control cluster (period + add) is right in desktop/tablet.
2. Implement controlled mobile fallback with title in first row and right-aligned control cluster in second row.
3. Ensure period selector and add button remain in the same control cluster and spacing remains stable on value changes.
4. Refine both balance cards to share equivalent content-block useful height and vertical centering.
5. Apply left anchoring for title/value block in both balance cards using same internal horizontal offset.
6. Validate loading-state layout parity for both cards to avoid content jump.
7. Confirm period-selection behavior and add-action navigation remain functionally unchanged.
8. Execute manual validation and document evidence.

## Manual Validation Scenarios
1. Desktop/tablet: title-left and controls-right in a single header row.
2. Mobile: title row + second row with right-aligned controls, with no overlap.
3. Period changes do not break header alignment or spacing.
4. Net and historical cards show equivalent vertical centering and same left offset.
5. Long numeric values remain left-anchored and readable in both cards.
6. Loading/ready states keep stable visual alignment.
7. Add-action click keeps existing destination/behavior.
8. Period selection keeps existing refresh behavior.

## Evidence Files (manual validation)
- `manual-validation/align-header-balance-cards/setup-baseline.md`
- `manual-validation/align-header-balance-cards/us1-header-horizontal-alignment.md`
- `manual-validation/align-header-balance-cards/us2-balance-card-alignment.md`
- `manual-validation/align-header-balance-cards/us3-functional-parity.md`
- `manual-validation/align-header-balance-cards/contract-compliance.md`
- `manual-validation/align-header-balance-cards/regression-checklist.md`
- `manual-validation/align-header-balance-cards/regression-summary.md`
- `manual-validation/align-header-balance-cards/quickstart-signoff.md`
