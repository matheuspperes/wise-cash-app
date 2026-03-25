# Contract: Transactions Header Sync and Dashboard Default Period

## Scope
Define behavior contracts for:
- transactions route header consistency
- dashboard initial period fallback default

## Contract 1: Transactions Header Consistency
- Surface: `/transactions` route family (base and query variants)
- Required Behavior:
  - Header follows same visual container/pattern as dashboard header.
  - Header title is `Transações`.
  - Header controls expose only `Voltar ao dashboard`.
  - Back action preserves existing route destination and semantics.
- Rule: Applies to all route variants (`/transactions`, `?view=history`, `?view=new`, and default state).

## Contract 2: Dashboard Initial Period Source
- Surface: dashboard initial render period state
- Required Behavior:
  - Fallback default period is 3 months.
  - If a persisted period preference exists, it overrides fallback default.
  - Initial summary data query and dependent widgets use the applied period source.
- Rule: Feature does not introduce new persistence mechanism; only respects existing one when present.

## Acceptance Mapping
- FR-001, FR-002, FR-003, FR-004, FR-007, FR-008 -> Contract 1
- FR-005, FR-006, FR-009 -> Contract 2

## Success Criteria Mapping
- SC-001, SC-002 -> Contract 1
- SC-003, SC-004, SC-005 -> Contract 2
