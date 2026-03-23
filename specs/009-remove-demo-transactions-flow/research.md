# Research: Remove Demo and Unify Transactions Flow

## Decision 1: Remove demo mode end-to-end from dashboard flow
- Decision: Remove demo toggles, demo URL param behavior, demo payload fields, and demo series composition from dashboard and summary path.
- Rationale: The feature requires only real data and no user-facing demo affordances; partial removal would leave inconsistent behavior.
- Alternatives considered:
  - Keep hidden demo support in API while removing UI controls (rejected: hidden coupling and payload bloat).
  - Keep demo query param for backward compatibility (rejected: unnecessary complexity for personal-use scope).

## Decision 2: Use query param contract for section entry in /transactions
- Decision: Use `/transactions?view=history` and `/transactions?view=new` as the only section entry mechanism.
- Rationale: Reuses existing route, keeps implementation small, and supports direct navigation from dashboard CTAs.
- Alternatives considered:
  - Add dedicated `/transactions/new` route (rejected: extra routing surface without clear value).
  - Use hash fragments (rejected: weaker state handling and less explicit app contract).

## Decision 3: Default invalid/missing view to history
- Decision: Fallback behavior for absent or invalid `view` is `history`.
- Rationale: History is the safest default context in a transactions page and aligns with browsing/review flow.
- Alternatives considered:
  - Default to new transaction (rejected: risk of accidental data-entry context).
  - Show neutral state (rejected: adds UI branch and extra complexity).

## Decision 4: Keep full transactions history scope with existing filters
- Decision: Preserve full history listing (income + expense) with existing date/type/category filters.
- Rationale: Replacing expenses-only history while preserving user control avoids regression and keeps analytical value.
- Alternatives considered:
  - Month-only default subset (rejected: information loss and mismatch with clarified requirement).

## Decision 5: Apply constrained visual hierarchy update to historical balance card
- Decision: Desktop target width becomes 70% +/-5% of prior reference, with right-referenced content and responsive legibility.
- Rationale: Objective sizing avoids subjective review loops and keeps layout predictable.
- Alternatives considered:
  - Typography-only reduction (rejected: insufficient spatial rebalance).
  - Keep width and only reduce spacing (rejected: weak visual hierarchy impact).
