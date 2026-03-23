# Quickstart: Refine Balance Card and CTA Layout

## Goal
Deliver a consistent and efficient UI refinement that consolidates dashboard actions, compacts historical balance card profile, and aligns CTA style behavior across dashboard and transactions history flows.

## Implementation Steps
1. Update dashboard header composition so Transacoes appears only in the top control cluster beside period filter and Nova Transacao.
2. Remove obsolete Transacoes access from dashboard navigation to avoid duplicate entry points.
3. Adjust Transacoes button internals: reduce padding and add subtle contrast/background emphasis without size increase.
4. Replace icon-only '+' action with textual "Nova Transacao" in dashboard cluster while preserving destination.
5. Apply historical balance card compact profile: desktop/tablet approximately 20% text and useful horizontal occupancy reduction.
6. Add proportional mobile compact behavior for historical card that prioritizes readability and alignment.
7. Add "Nova transacao" action in transactions history view using same style-base as "Ver historico de transacoes" reference in transactions new view.
8. Verify all CTA destinations remain unchanged for history and create flows.

## Manual Validation Scenarios
1. Dashboard cluster shows period filter, Transacoes, and Nova Transacao in one non-overlapping row/stack behavior per breakpoint.
2. Dashboard no longer contains duplicated Transacoes entry points.
3. Transacoes is subtly more prominent by contrast/background only and keeps same size envelope.
4. Transacoes click opens /transactions?view=history.
5. Dashboard Nova Transacao text CTA is visible, balanced in cluster, and opens /transactions?view=new.
6. Historical balance card is approximately 20% more compact in desktop/tablet versus baseline while preserving alignments.
7. Historical card remains readable and aligned under proportional compactness in mobile.
8. History page includes "Nova transacao" with same style-base as reference action and opens /transactions?view=new.

## Evidence Files (manual validation)
- manual-validation/refine-balance-cta-layout/setup-baseline.md
- manual-validation/refine-balance-cta-layout/us1-dashboard-cluster.md
- manual-validation/refine-balance-cta-layout/us2-historical-card-compactness.md
- manual-validation/refine-balance-cta-layout/us3-dashboard-new-cta.md
- manual-validation/refine-balance-cta-layout/us4-history-page-cta-parity.md
- manual-validation/refine-balance-cta-layout/contract-compliance.md
- manual-validation/refine-balance-cta-layout/regression-checklist.md
- manual-validation/refine-balance-cta-layout/regression-summary.md
- manual-validation/refine-balance-cta-layout/quickstart-signoff.md
