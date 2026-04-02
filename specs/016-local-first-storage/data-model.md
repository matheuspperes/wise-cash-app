# Data Model: Local-First Financial Storage

## Entity: OwnerScope
- Description: Logical partition key for local data isolation.
- Fields:
  - scopeId: string (`user:<id>` or `anonymous`)
  - scopeType: `authenticated` | `anonymous`
- Validation Rules:
  - Every persisted transaction and recurrence rule MUST belong to one and only one `OwnerScope`.
  - Cross-scope reads/writes are not allowed.

## Entity: TransactionRecord
- Description: Persisted financial transaction used in listing, filters, search, and dashboard aggregates.
- Fields:
  - id: string
  - ownerScope: string
  - name: string
  - nameNormalized: string
  - type: `income` | `expense`
  - categoryId: string
  - categoryName: string
  - categoryNameNormalized: string
  - amount: number
  - transactionDate: string (`YYYY-MM-DD`)
  - recurrenceRuleId: string | null
  - notes: string | null
  - notesNormalized: string
  - source: `manual` | `recurrence_generated`
  - status: `active` | `deleted`
  - createdAt: string (ISO timestamp)
  - updatedAt: string (ISO timestamp)
- Validation Rules:
  - `amount` MUST be positive for active persisted records.
  - Date-range filters are inclusive on both bounds.
  - Search matching uses normalized fields (case-insensitive, accent-insensitive).
  - `deleted` records are excluded from active listing/search/dashboard outputs.

## Entity: RecurrenceRule
- Description: Rule defining recurrence generation parameters.
- Fields:
  - id: string
  - ownerScope: string
  - dayOfMonth: number (1-31)
  - isActive: boolean
  - createdAt: string
  - updatedAt: string
- Validation Rules:
  - Rule evaluation must clamp day-of-month to valid last day when needed.
  - Only active rules may generate future transactions.

## Entity: MetaEntry
- Description: Operational metadata for storage/version/health.
- Fields:
  - key: string
  - ownerScope: string
  - value: string | number | boolean | json
  - updatedAt: string
- Usage Examples:
  - schema/version markers
  - storage health flags
  - migration checkpoints

## Entity: TemporarySessionLaunchTable
- Description: In-page temporary list used by `/transactions?view=new` before/after save feedback.
- Fields:
  - items: TransactionRecord-like projection for UI table
  - sessionLifetime: page session only
- Validation Rules:
  - MUST NOT be persisted as long-term data.
  - MUST reset when session boundary conditions are met (existing behavior preserved).

## Relationships
- `OwnerScope` 1:N `TransactionRecord`
- `OwnerScope` 1:N `RecurrenceRule`
- `OwnerScope` 1:N `MetaEntry`
- `RecurrenceRule` 1:N `TransactionRecord` (optional relationship via `recurrenceRuleId`)

## State Transitions
- Transaction:
  - Create: `active`
  - Update: `active` with updated timestamp
  - Delete: `active -> deleted` (soft delete)
- Storage Availability:
  - Healthy: read/write operations allowed
  - Unavailable: persistent read/write operations blocked with explicit error
