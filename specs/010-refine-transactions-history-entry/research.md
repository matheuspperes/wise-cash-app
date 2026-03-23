# Research: Refine Transactions History Entry

## Decision 1: Gate filtered-results section by manual filter interaction
- Decision: Treat filter section visibility as enabled only after the user manually changes at least one filter field in the current session.
- Rationale: Prevents accidental section display from default values and keeps UX intent explicit.
- Alternatives considered:
  - Consider any non-empty filter value as active (rejected: can trigger false-positive display from prefilled/default values).
  - Require only explicit apply-click with no field-change tracking (rejected: weaker alignment with clarified behavior).

## Decision 2: Rename and expand complete history scope to income + expense
- Decision: Replace expense-only wording with "Historico completo" and ensure history data includes both transaction types.
- Rationale: Improves semantic correctness and removes mismatch between title and actual financial movement expected by user.
- Alternatives considered:
  - Keep expense-only accordion title and dataset (rejected: conflicts with requirement).
  - Show separate sections for gains and expenses only (rejected: adds complexity without requested value).

## Decision 3: Session-scoped temporary launches table lifecycle in view=new
- Decision: Add a temporary "Lancamentos" table in `/transactions?view=new` that receives successful saves, resets on refresh, and is cleared when leaving `view=new`.
- Rationale: Gives immediate feedback while preserving simplicity (no persistence, no backend contract changes).
- Alternatives considered:
  - Persist temporary launches in repository/session storage (rejected: unnecessary durability for requested behavior).
  - Keep table entries when switching to history and back (rejected: conflicts with clarified lifecycle boundary).

## Decision 4: Newest-first ordering for temporary launches
- Decision: Render temporary "Lancamentos" with newest saved entry at top row.
- Rationale: Prioritizes visibility of the latest user action and simplifies manual verification.
- Alternatives considered:
  - Oldest-first (rejected: slower confirmation of most recent save).
  - Show only latest record (rejected: loses multi-save context).

## Decision 5: Optimize table consistency across history and launches surfaces
- Decision: Standardize table semantics across filtered history results and temporary launches by aligning column intent (Data, Descricao, Categoria, Tipo, Valor), right-aligned numeric value, and stable empty-state messaging.
- Rationale: Reduces cognitive load, keeps visual rhythm consistent, and lowers maintenance cost for future edits.
- Alternatives considered:
  - Keep mixed list/table presentations with divergent schemas (rejected: inconsistent scanning and duplicated formatting logic).
  - Introduce a new generic data-grid abstraction now (rejected: overengineering for feature scope).
