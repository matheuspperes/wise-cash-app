# Data Model: Refine Balance Card and CTA Layout

## Entity: DashboardTopControlClusterState
- Description: Visual and interaction state for the dashboard top controls group.
- Fields:
  - controlsOrder: ["periodFilter", "transacoes", "novaTransacao"]
  - transacoesAccessMode: "single-entry"
  - transacoesHighlightMode: "subtle-contrast-only"
  - novaTransacaoLabel: "Nova Transacao"
- Validation Rules:
  - Transacoes appears only once on dashboard after repositioning.
  - Control cluster remains non-overlapping across supported breakpoints.
  - Transacoes destination remains history view.

## Entity: HistoricalBalanceCardCompactProfile
- Description: Responsive compact profile for historical net balance card visual proportion.
- Fields:
  - desktopTabletTextScaleDelta: "~20% reduction"
  - desktopTabletHorizontalOccupancyDelta: "~20% reduction"
  - mobileReductionMode: "proportional"
  - alignmentParity: "preserved"
- Validation Rules:
  - Desktop/tablet satisfy approximate 20% compactness relative to baseline.
  - Mobile keeps readability and alignment stability without exact 20% requirement.

## Entity: DashboardPrimaryCreateCTA
- Description: Primary dashboard create-transaction action in text mode.
- Fields:
  - label: "Nova Transacao"
  - stylePriority: "primary"
  - destination: "/transactions?view=new"
  - sizeAdjustmentMode: "proportional"
- Validation Rules:
  - Label is textual and clear in resting state.
  - Destination behavior remains unchanged.

## Entity: HistoryPageCreateCTAStyleParity
- Description: Style parity contract for history-page create action.
- Fields:
  - label: "Nova transacao"
  - styleBaseSource: "transactions new-view history action style in app/transactions/page.tsx"
  - responsiveAdjustmentAllowed: true
  - destination: "/transactions?view=new"
- Validation Rules:
  - Uses same style-base component/variant as reference action.
  - Only responsive width/size variation is allowed.
  - Navigation preserves existing create flow.

## Relationships
- DashboardTopControlClusterState contains DashboardPrimaryCreateCTA and Transacoes action behavior.
- HistoricalBalanceCardCompactProfile must coexist with DashboardTopControlClusterState without layout conflicts.
- HistoryPageCreateCTAStyleParity references style-base from transactions new-view navigation action.
