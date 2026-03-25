# Data Model: Sync Header and Default Period

## Entity: TransactionsHeaderState
- Description: Represents the contextual header presentation for `/transactions` variants.
- Fields:
  - route: string (`/transactions` with optional query variants)
  - titleText: string (`Transacoes`)
  - controls:
    - showBackToDashboard: boolean
    - hideOtherHeaderActions: boolean
  - visualProfile: string (`same-as-dashboard-header`)
- Validation Rules:
  - Title must be `Transacoes` in all `/transactions` variants.
  - Exactly one header action is shown: `Voltar ao dashboard`.
  - Header spacing/container style matches dashboard header pattern.

## Entity: DashboardInitialPeriodState
- Description: Represents period selection used during first dashboard render.
- Fields:
  - persistedPreferenceMonths: number | null
  - fallbackDefaultMonths: number (3)
  - appliedInitialMonths: number
  - source: `persisted` | `fallback-default`
- Validation Rules:
  - If persisted preference exists, `appliedInitialMonths` must match persisted value.
  - If persisted preference does not exist, `appliedInitialMonths` must be 3.
  - Initial summary query uses `appliedInitialMonths` for data fetch.

## Relationships
- `TransactionsHeaderState` is consumed by `/transactions` page composition and does not alter navigation targets.
- `DashboardInitialPeriodState` drives initial `dashboard-summary` query inputs and chart/table data window.
