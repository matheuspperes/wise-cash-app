# Data Model: Align Header and Balance Cards

## Entity: DashboardHeaderLayoutState
- Description: Responsive visual arrangement state for title and control cluster in dashboard header zone.
- Fields:
  - breakpointMode: "desktop-tablet-one-row" | "mobile-two-row"
  - titleAlignment: "left"
  - controlsAlignment: "right"
  - controlsComposition: ["periodSelector", "addActionButton"]
- Validation Rules:
  - Desktop/tablet mode keeps title and controls on same horizontal row.
  - Mobile mode keeps title row separated from controls row.
  - Control row remains right-aligned in mobile mode.

## Entity: HeaderControlCluster
- Description: Top-right action group for dashboard quick interactions.
- Fields:
  - periodSelectorVisible: boolean
  - addActionVisible: boolean
  - horizontalSpacingToken: string
- Validation Rules:
  - Both controls remain visible in all supported breakpoints.
  - Spacing remains stable when period value changes.

## Entity: BalanceCardContentAlignmentState
- Description: Visual alignment contract shared by net and historical cards.
- Fields:
  - appliesToCards: ["netBalanceCard", "historicalBalanceCard"]
  - contentAnchorX: "left"
  - usefulContentHeightRule: "equivalent"
  - verticalCenteringRule: "equivalent"
- Validation Rules:
  - Both cards must use same left internal offset for title + value block.
  - Both cards must present equivalent useful-height and vertical centering behavior.

## Entity: DashboardLayoutFunctionalParity
- Description: Guard state confirming visual updates do not change existing behavior.
- Fields:
  - periodSelectionBehaviorUnchanged: boolean
  - addActionNavigationUnchanged: boolean
- Validation Rules:
  - Period selection continues to trigger existing data refresh flow.
  - Add-action keeps existing destination and interaction behavior.

## Relationships
- DashboardHeaderLayoutState governs placement of HeaderControlCluster.
- BalanceCardContentAlignmentState applies to both balance card components equally.
- DashboardLayoutFunctionalParity cross-validates visual changes against existing interactions.
