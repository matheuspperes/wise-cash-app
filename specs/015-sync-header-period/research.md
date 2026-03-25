# Research: Sync Header and Default Period

## Decision 1: Reuse DashboardHeader in transactions route
- Decision: Use the same visual header container and composition pattern currently used on dashboard for `/transactions` views.
- Rationale: Maximizes consistency and minimizes UI drift with near-zero design ambiguity.
- Alternatives considered:
  - Keep ad-hoc page title row in transactions (rejected: inconsistent structure and spacing).
  - Build a new shared global header abstraction (rejected: unnecessary abstraction for small scope).

## Decision 2: Keep only one header action in transactions
- Decision: Header controls on `/transactions` must expose only `Voltar ao dashboard` while preserving existing style hierarchy.
- Rationale: Matches feature intent and avoids action overload in context header.
- Alternatives considered:
  - Keep additional actions in header (rejected: conflicts with explicit requirement).
  - Move action outside header (rejected: reduces navigational predictability).

## Decision 3: Apply header behavior to all `/transactions` route variants
- Decision: Use the same header behavior for base and query variants (`?view=history`, `?view=new`, default).
- Rationale: User mental model stays stable regardless of entry path.
- Alternatives considered:
  - Variant-specific headers (rejected: inconsistency risk and extra maintenance).

## Decision 4: Change dashboard initial period default from 12 to 3
- Decision: Set initial `months` state to 3 in dashboard initial load path.
- Rationale: Improves immediate relevance of displayed trends for daily usage.
- Alternatives considered:
  - Keep 12 months default (rejected: broader horizon, less immediate reading).

## Decision 5: Respect persisted period preference when available
- Decision: If an existing persisted preference source is present, prefer it over hardcoded default; otherwise fallback to 3.
- Rationale: Preserves user intent and avoids overwriting known preferences.
- Alternatives considered:
  - Always force 3 months (rejected: breaks persisted user expectations).
  - Add new persistence mechanism in this feature (rejected: out of scope).
