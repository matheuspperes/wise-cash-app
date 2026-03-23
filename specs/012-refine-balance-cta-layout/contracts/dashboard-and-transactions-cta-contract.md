# Contract: Dashboard and Transactions CTA Refinement

## Scope
Define visual and interaction contracts for:
- dashboard top control cluster composition
- Transacoes access consolidation and destination
- historical net balance card compact profile
- textual Nova Transacao CTA behavior on dashboard
- history-page Nova transacao style parity and navigation

## Contract 1: Dashboard Control Cluster Composition
- Surface: dashboard top controls area
- Required Behavior:
  - period filter, Transacoes, and Nova Transacao appear in one cluster
  - no duplicate Transacoes access remains in dashboard navigation
  - cluster maintains readable spacing in supported breakpoints
- Rule: Transacoes must remain secondary to Nova Transacao in CTA hierarchy.

## Contract 2: Transacoes Visual Emphasis and Route
- Surface: Transacoes button inside dashboard control cluster
- Required Behavior:
  - reduced inner padding versus baseline
  - subtle prominence increase by background/contrast only
  - no dimension increase for button size
  - click opens transactions history view directly
- Rule: emphasis change is perceptible but not dominant over primary create CTA.

## Contract 3: Historical Net Balance Card Compactness
- Surface: historical total balance card in dashboard summary cards area
- Required Behavior:
  - desktop/tablet: approximate 20% reduction in main text scale and useful horizontal occupancy
  - mobile: proportional compact adjustment, no exact 20% requirement
  - alignment parity with companion balance card remains preserved
- Rule: compactness cannot degrade readability or introduce overlap.

## Contract 4: Dashboard Nova Transacao CTA
- Surface: dashboard create-transaction action in top control cluster
- Required Behavior:
  - icon-only '+' is replaced by textual "Nova Transacao"
  - proportions adjusted for cluster balance
  - destination remains create flow route
- Rule: route behavior remains unchanged from previous create action.

## Contract 5: History Page Nova transacao CTA Parity
- Surface: transactions history view action area
- Required Behavior:
  - include visible "Nova transacao" action
  - use same style-base component/variant as "Ver historico de transacoes" reference from transactions new view
  - only responsive width/size adjustment allowed
  - click opens create flow route
- Rule: style parity is component/variant-based, not approximate-only.

## Acceptance Mapping
- FR-001, FR-002, FR-014 -> Contract 1
- FR-003, FR-004, FR-015, FR-016 -> Contract 2
- FR-008, FR-009, FR-013 -> Contract 3
- FR-005, FR-006, FR-007 -> Contract 4
- FR-010, FR-011, FR-012 -> Contract 5

## Success Criteria Mapping
- SC-001 -> Contract 1 + manual-validation/refine-balance-cta-layout/us1-dashboard-cluster.md
- SC-007 -> Contract 2 + manual-validation/refine-balance-cta-layout/us1-dashboard-cluster.md
- SC-008 -> Contract 2 + manual-validation/refine-balance-cta-layout/us1-dashboard-cluster.md
- SC-002 -> Contract 3 + manual-validation/refine-balance-cta-layout/us2-historical-card-compactness.md
- SC-006 -> Contract 3 + manual-validation/refine-balance-cta-layout/us2-historical-card-compactness.md
- SC-003 -> Contract 4 + manual-validation/refine-balance-cta-layout/us3-dashboard-new-cta.md
- SC-004 -> Contract 5 + manual-validation/refine-balance-cta-layout/us4-history-page-cta-parity.md
- SC-005 -> Contract 2, Contract 4, Contract 5 + manual-validation/refine-balance-cta-layout/regression-summary.md
