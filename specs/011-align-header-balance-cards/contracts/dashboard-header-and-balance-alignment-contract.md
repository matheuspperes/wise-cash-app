# Contract: Dashboard Header and Balance Alignment

## Scope
Define behavior contracts for:
- dashboard header title/control alignment
- responsive one-row/two-row behavior
- equivalent alignment rules across both balance cards
- preservation of existing dashboard interactions

## Contract 1: Header Left/Right Hierarchy
- Surface: dashboard top layout region
- Required Behavior:
  - title region is left-anchored
  - control cluster (period selector + add action) is right-anchored
  - desktop/tablet keeps both in same horizontal row
- Rule: hierarchy remains stable when period value changes.

## Contract 2: Mobile Responsive Fallback
- Surface: dashboard top layout region under narrow viewport
- Required Behavior:
  - title remains in first row, left-anchored
  - controls move to second row and remain right-aligned in that row
  - no overlap between title and controls
- Rule: fallback must keep readability and action discoverability.

## Contract 3: Balance Card Equivalence
- Surfaces:
  - net balance card
  - historical net balance card
- Required Behavior:
  - both cards apply left-anchored content block
  - both cards use same internal horizontal offset for title + value block
  - both cards present equivalent useful-height and vertical-centering behavior
- Rule: visual parity applies in ready and loading states.

## Contract 4: Functional Parity
- Required Behavior:
  - period selector behavior remains unchanged (same data-refresh outcome)
  - add-action button behavior remains unchanged (same destination/outcome)
- Rule: feature introduces layout changes only; no business logic changes.

## Acceptance Mapping
- FR-001..FR-004 -> Contract 1 and Contract 2
- FR-005..FR-006 -> Contract 3
- FR-007..FR-008 -> Contract 4
- FR-009 -> Contract 3 and Contract 2

## Success Criteria Mapping
- SC-001 -> Contract 1 + manual-validation/align-header-balance-cards/us1-header-horizontal-alignment.md
- SC-002 -> Contract 2 + manual-validation/align-header-balance-cards/us1-header-horizontal-alignment.md
- SC-003 -> Contract 3 + manual-validation/align-header-balance-cards/us2-balance-card-alignment.md
- SC-004 -> Contract 3 + manual-validation/align-header-balance-cards/us2-balance-card-alignment.md
- SC-005 -> Contract 4 + manual-validation/align-header-balance-cards/us3-functional-parity.md
