# Contract: Local-First Finance Storage

## Scope
Defines behavior and data contracts for migrating finance persistence from in-memory to browser-local storage while preserving current UI payload compatibility.

This feature MUST function without backend dependency for local persistence. Any API adapter is optional.

## Contract 1: Asynchronous Repository Interface

### TransactionRepository
- `listTransactions(params, ownerScope) -> Promise<TransactionRecord[]>`
- `createTransaction(tx, ownerScope) -> Promise<TransactionRecord>`
- `findTransactionById(id, ownerScope) -> Promise<TransactionRecord | null>`
- `updateTransaction(id, patch, ownerScope) -> Promise<TransactionRecord | null>`
- `softDeleteTransaction(id, ownerScope) -> Promise<TransactionRecord | null>`

Rules:
- All methods MUST enforce owner-scope partitioning.
- `softDeleteTransaction` MUST mark status as `deleted` and update timestamp.
- `listTransactions` MUST return only active records unless explicitly extended in future scope.

### TransactionSearchRepository
- `searchTransactions(params, ownerScope) -> Promise<TransactionRecord[]>`

Rules:
- Search MUST be case-insensitive and accent-insensitive.
- Date range filtering MUST be inclusive on both `from` and `to`.

### MonthlySummaryRepository
- `getMonthlySummary(months, ownerScope) -> Promise<MonthlyPoint[]>`
- `getMonthlySummaryContext(months, ownerScope) -> Promise<MonthlySummaryContext>`
- `listFullTransactionsHistoryRows(ownerScope) -> Promise<MonthlyTransactionHistoryRow[]>`
- `listCurrentMonthTransactions(referenceDate, ownerScope) -> Promise<CurrentMonthTransactionRow[]>`

Rules:
- Aggregations MUST include both income and expense.
- Deleted transactions MUST NOT affect dashboard aggregates.

## Contract 2: Dexie Storage Schema (Versioned)

Version `v1` stores:
- `transactions`
- `recurrenceRules`
- `meta`

Minimum required indexed access patterns:
- owner-scoped active listing by date
- owner-scoped type/category/date filters
- owner-scoped normalized search fields
- owner-scoped recurrence rule lookup by active state

Schema evolution rules:
- New schema changes MUST use Dexie version upgrades.
- Migration steps MUST preserve existing persisted user data whenever structurally possible.

## Contract 3: Client Gateway Compatibility Surface

### LocalTransactionsGateway
- `list(params, ownerScope) -> Promise<{ items, pagination }>`
- `create(input, ownerScope) -> Promise<{ transaction }>`
- `patch(id, patch, ownerScope) -> Promise<{ transaction }>`
- `remove(id, ownerScope) -> Promise<void>`

### LocalDashboardSummaryGateway
- `getSummary(months, ownerScope) -> Promise<{ currentMonth, netBalance, totals, historicalBalance, currentMonthTransactions, areaSeries, ...aliases }>`

Rules:
- Returned payload shape MUST remain compatible with existing UI consumers.
- Gateway failures for storage unavailability MUST be explicit and non-silent.

## Contract 4: Optional API Adapter Compatibility Surface

If an API adapter is kept for transitional compatibility, it MUST only proxy local repository behavior and MUST NOT be required for local persistence correctness.

### `GET /api/transactions`
Request query:
- `q?`, `from?`, `to?`, `type?`, `categoryId?`

Response:
- `{ items, pagination }`

### `POST /api/transactions`
Request body:
- Must keep current transaction payload shape accepted by existing UI.

Response:
- `{ transaction }`

### `PATCH /api/transactions/[id]`
Response:
- `{ transaction }` or not-found error

### `DELETE /api/transactions/[id]`
Response:
- `204` on successful soft delete

### `GET /api/dashboard/summary?months=<n>`
Response:
- `currentMonth`, `netBalance`, `totals`, `historicalBalance`, `currentMonthTransactions`, `areaSeries`
- Compatibility aliases retained during migration window (`currentMonthExpenses`, `fullExpenseHistoryGroups`) where still required

## Contract 5: Storage Unavailability Behavior
- If persistent local storage is unavailable:
  - Persistent read/write operations MUST be blocked.
  - API/service layer MUST return clear error signaling unavailability.
  - System MUST NOT silently fall back to non-persistent memory mode.

## Contract 6: Session-only Temporary Launch Table
- Temporary launches shown in `/transactions?view=new` are page-session state only.
- This temporary table MUST NOT be persisted as durable transaction data.

## Acceptance Mapping
- FR-001..FR-005, FR-013 -> Contracts 1 and 6
- FR-006..FR-012 -> Contracts 1 and 3
- FR-017..FR-019 -> Contracts 1 and 2
- FR-020..FR-022 -> Contract 5
