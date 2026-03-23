# Contract: Transactions Entry and Dashboard Summary Cleanup

## Scope
Define behavior contracts for:
- direct section entry into /transactions via query params
- removal of demo data from dashboard summary
- transactions-focused history behavior in /transactions
- historical balance card hierarchy constraints

## Contract 1: Dashboard Summary Without Demo
- Producer: `GET /api/dashboard/summary`
- Consumer: dashboard client components
- Required Output:
  - `areaSeries` includes real `income`, `expense`, `net` only
  - `currentMonthTransactions` present
  - no demo-only fields in response surface
- Forbidden Output:
  - `demoMode`, `hasDemoSeries`, `demoIncome`, `demoExpense`
- Rule: existing non-demo consumers continue to function.
- Rule: legacy `demo` query input is ignored and does not alter response shape or UI mode.

## Contract 2: Transactions Entry Intent
- Entry URL: `/transactions?view={history|new}`
- Required Behavior:
  - `view=history` -> open filters + history section
  - `view=new` -> open creation section
  - missing/invalid `view` -> fallback to `history`
- Rule: no new route/endpoint introduced for this feature.

## Contract 3: Transactions History Scope
- Required Behavior:
  - history view shows transaction records (income + expense)
  - existing filters (date/type/category/search) remain available
  - wording/tab label "Lancamentos" removed from /transactions
- Rule: preserve ability to review complete transaction history.

## Contract 4: Historical Balance Card Visual Constraint
- Required Behavior:
  - desktop width target at 70% +/-5% of prior reference
  - right-referenced title and value alignment
  - mobile remains legible/responsive
- Rule: must not break primary net balance readability.

## Acceptance Mapping
- FR-001..FR-004a -> Contract 1
- FR-005..FR-006e -> Contract 2
- FR-007..FR-009 -> Contract 3
- FR-010..FR-012b -> Contract 4
