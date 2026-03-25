# Quickstart: Sync Header and Default Period

## Goal
Align transactions page header with dashboard visual pattern and reduce dashboard initial period to 3 months, while respecting existing persisted period preference when present.

## Implementation Steps
1. Reuse dashboard header component structure in transactions page.
2. Set transactions header title to `Transações`.
3. Keep only `Voltar ao dashboard` as header action in transactions route variants.
4. Preserve current navigation destination/semantics of back action.
5. Update dashboard initial period state from 12 to 3 as fallback default.
6. If persisted period preference source exists, use persisted value over fallback default.
7. Ensure initial summary query and dependent components reflect applied initial period.

## Manual Validation Scenarios
1. Open `/transactions`, `/transactions?view=history`, and `/transactions?view=new`; confirm same header structure in all variants.
2. Confirm header title is `Transações` in all transactions variants.
3. Confirm only one header action appears: `Voltar ao dashboard`, keeping expected visual style.
4. Confirm the back action still navigates to dashboard correctly.
5. Open dashboard with no persisted period preference and confirm initial period is 3 months.
6. Open dashboard with persisted period preference (if available in current app behavior) and confirm persisted value is used instead of 3.
7. Confirm dashboard data displayed on first load matches applied period source.

## Evidence Files (manual validation)
- manual-validation/sync-header-period/setup-baseline.md
- manual-validation/sync-header-period/us1-transactions-header.md
- manual-validation/sync-header-period/us2-dashboard-default-period.md
- manual-validation/sync-header-period/regression-summary.md
- manual-validation/sync-header-period/quickstart-signoff.md
