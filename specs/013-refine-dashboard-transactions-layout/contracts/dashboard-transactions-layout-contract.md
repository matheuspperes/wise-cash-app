# Contract: Dashboard and Transactions Layout Refinement

## Scope
Define visual and navigation contracts for:
- dashboard chart legend and period selector composition
- dashboard balance cards spacing profile
- CTA label normalization for affected surfaces
- transactions page header return action and footer create CTA placement

## Contract 1: Dashboard Chart Control Composition
- Surface: dashboard chart control/header area
- Required Behavior:
  - period selector appears beside chart legend
  - selector and legend remain on the same row in supported breakpoints
  - narrow widths reduce selector width to minimum readable size
  - no overlap between controls and labels
- Rule: control proximity must preserve immediate temporal context for chart reading.

## Contract 2: Dashboard Balance Cards Spacing
- Surface: dashboard summary cards grid
- Required Behavior:
  - desktop gap between current and historical cards targets 16px with +/-4px tolerance
  - card horizontal adjustment allowed to achieve target gap
  - responsive composition remains readable and stable
- Rule: spacing must align with dashboard standard block rhythm.

## Contract 3: CTA Label Normalization
- Surface: dashboard and transactions surfaces touched by this feature
- Required Behavior:
  - affected create labels use "Nova Transação"
  - unaccented variant is removed from affected surfaces
- Rule: localized copy must remain consistent and professional.

## Contract 4: Transactions Header and Footer Actions
- Surface: /transactions page header and end-of-page action area
- Required Behavior:
  - header has simple return button beside title
  - header does not include duplicate top "Nova Transação" CTA
  - return button always opens /
  - footer includes "Nova Transação" CTA at page end
  - footer create CTA opens /transactions?view=new
- Rule: action hierarchy must prioritize return-at-top and create-at-end without duplication.

## Acceptance Mapping
- FR-001, FR-002, FR-012 -> Contract 1
- FR-003, FR-004 -> Contract 2
- FR-005 -> Contract 3
- FR-006, FR-007, FR-008, FR-011 -> Contract 4
- FR-009, FR-010 -> Contracts 1, 2, and 4 regression alignment

## Success Criteria Mapping
- SC-001 -> Contract 1 + manual-validation/refine-dashboard-transactions-layout/us1-dashboard-controls.md
- SC-002 -> Contract 2 + manual-validation/refine-dashboard-transactions-layout/us2-balance-card-gap.md
- SC-003 -> Contract 3 + manual-validation/refine-dashboard-transactions-layout/us3-label-normalization.md
- SC-004 -> Contract 4 + manual-validation/refine-dashboard-transactions-layout/us4-transactions-navigation.md
- SC-005 -> Contracts 1, 3, and 4 + manual-validation/refine-dashboard-transactions-layout/regression-summary.md
