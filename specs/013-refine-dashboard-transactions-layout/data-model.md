# Data Model: Refine Dashboard and Transactions Navigation Layout

## Entity: DashboardChartControlArea
- Description: Visual control area coupling chart legend and period selector.
- Fields:
  - legendPosition: "chart-header"
  - periodSelectorPlacement: "same-row-as-legend"
  - periodSelectorWidthMode: "shrink-to-min-readable-on-small-widths"
  - overlapPolicy: "no-overlap"
- Validation Rules:
  - Selector stays on same row as legend for supported breakpoints.
  - Controls remain readable and non-overlapping.

## Entity: DashboardBalanceCardsGapProfile
- Description: Spacing profile between current and historical balance cards.
- Fields:
  - desktopGapTargetPx: 16
  - desktopGapTolerancePx: 4
  - horizontalAdjustmentAllowed: true
  - responsiveIntegrity: "preserved"
- Validation Rules:
  - Desktop gap remains within 12-20px.
  - Mobile/tablet maintain readable composition without clipping.

## Entity: TransactionsPageNavigationHeader
- Description: Header behavior on /transactions with title and return action.
- Fields:
  - title: "Transações"
  - returnButtonPlacement: "adjacent-to-title"
  - returnButtonDestination: "/"
  - createCtaInHeader: false
- Validation Rules:
  - Header contains return action and no duplicate create CTA.
  - Return action always navigates to dashboard root.

## Entity: TransactionsPageFooterCreateCTA
- Description: Create action at the end of /transactions.
- Fields:
  - label: "Nova Transação"
  - placement: "page-end"
  - destination: "/transactions?view=new"
  - prominence: "primary"
- Validation Rules:
  - CTA is discoverable at page end for long content.
  - Click opens create flow route without changing existing behavior.

## Entity: LocalizedCtaLabelNormalization
- Description: Label normalization policy for affected surfaces in this feature.
- Fields:
  - targetCopy: "Nova Transação"
  - affectedSurfaces: ["dashboard controls", "transactions page"]
  - allowLegacyCopy: false
- Validation Rules:
  - No affected surface retains the unaccented "Nova Transacao" variant.

## Relationships
- DashboardChartControlArea and DashboardBalanceCardsGapProfile share dashboard responsive constraints.
- TransactionsPageNavigationHeader and TransactionsPageFooterCreateCTA coordinate non-duplication of create actions.
- LocalizedCtaLabelNormalization applies to CTA-bearing entities in dashboard and transactions surfaces.
