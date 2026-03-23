# Contract: Transactions History Filtering and Temporary Launches Table

## Scope
Define behavior contracts for:
- filtered-results visibility/title behavior in `/transactions?view=history`
- complete-history scope/title updates including gains and expenses
- temporary "Lancamentos" table behavior in `/transactions?view=new`
- consistent table semantics across transactions surfaces

## Contract 1: Filtered Results Visibility and Title
- Entry URL: `/transactions?view=history`
- Required Behavior:
  - filtered-results section renders only after manual filter interaction in current session
  - section remains hidden when filters are untouched
  - when shown, title must be exactly `Resultados dos filtros aplicados`
- Empty Behavior:
  - if filters are active and no rows match, section remains visible with explicit empty state
- Rule: no false-positive display from untouched default filter values

## Contract 2: Complete History Scope and Label
- Surface: complete-history section in transactions history view
- Required Behavior:
  - title is `Historico completo`
  - records include both `income` and `expense`
  - monthly grouping/accordion remains available unless explicitly replaced by equivalent UX
- Rule: wording and data scope must stay aligned

## Contract 3: Temporary Launches Table in view=new
- Entry URL: `/transactions?view=new`
- Required Behavior:
  - successful save appends new row into temporary `Lancamentos` table
  - ordering is newest-first (latest save at top row)
  - transaction form remains usable while temporary `Lancamentos` table is visible
  - invalid/failed save must not append row
  - leaving `view=new` clears table; returning starts empty
  - page refresh/new session starts empty
- Rule: temporary rows are session-local UI state only (non-persistent)

## Contract 4: Unified History Payload Key Compatibility
- Surface: `GET /api/dashboard/summary` response consumed by dashboard and transactions surfaces
- Required Behavior:
  - unified monthly groups key is `fullTransactionsHistoryGroups`
  - legacy alias `fullExpenseHistoryGroups` may be emitted temporarily during migration compatibility window
  - consumers must migrate to `fullTransactionsHistoryGroups` within this feature scope
- Rule: response shape transition must not break existing dashboard rendering during migration.

## Contract 5: Consistent Table Semantics
- Applies to:
  - filtered-results section table (`view=history`)
  - temporary `Lancamentos` table (`view=new`)
- Required Behavior:
  - aligned semantic columns: Data, Descricao, Categoria, Tipo, Valor
  - currency values right-aligned and consistently signed (`+` income, `-` expense)
  - consistent empty-state tone and readability in Portuguese
- Rule: avoid divergent table schemas for equivalent transaction-row surfaces

## Acceptance Mapping
- FR-001..FR-006 -> Contract 1
- FR-007..FR-008 -> Contract 2
- FR-009..FR-015 -> Contract 3
- FR-016 -> Contract 4
- FR-002, FR-009, FR-015 + table optimization objective -> Contract 5
