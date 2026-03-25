# Setup Baseline

## Context
- Feature: 015-sync-header-period
- Branch: 015-sync-header-period
- Date: 2026-03-25

## Baseline Before Changes
- Transactions route used a local header row and not the dashboard header component.
- Dashboard initial period state started with 12 months.
- No dedicated manual validation folder for this feature existed.

## Scope Confirmed
- Unify transactions header pattern across `/transactions` variants.
- Keep only `Voltar ao dashboard` as header control.
- Use 3 months as initial fallback period while honoring persisted preference when available.
