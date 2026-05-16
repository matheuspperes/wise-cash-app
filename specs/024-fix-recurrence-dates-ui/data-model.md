# Data Model - Corrigir Datas Civis de Recorrencias

## Entity: CivilDateValue
- Purpose: Representar uma data civil `YYYY-MM-DD` sem timezone ou hora.
- Fields:
  - value: string (`YYYY-MM-DD`)
  - year: number
  - monthIndex: number
  - dayOfMonth: number
- Validation Rules:
  - `value` MUST always be canonical `YYYY-MM-DD`.
  - `year`, `monthIndex`, and `dayOfMonth` MUST be derived from the same civil value.

## Entity: TransactionRecord
- Purpose: Persist a manual or generated transaction with a civil transaction date.
- Fields:
  - transactionDate: string (`YYYY-MM-DD`)
  - recurrenceRuleId: string | null
  - source: `manual` | `recurrence_generated`
- Validation Rules:
  - `transactionDate` MUST remain the user-selected civil day after save, reload, grouping, and migration.
  - Existing shifted records MUST be rewritten to canonical civil form during migration.

## Entity: RecurrenceRuleRecord
- Purpose: Persist the recurrence rule and its civil start date.
- Fields:
  - startDate: string (`YYYY-MM-DD`)
  - dayOfMonth: number
  - recurrenceType: `limited` | `unlimited`
  - maxCycles: number | null
  - unlimitedMode: `automatic` | `manual` | null
- Validation Rules:
  - `startDate` MUST stay in civil-string form.
  - `dayOfMonth` MUST be interpreted as a civil calendar day, not as a timestamp-derived day.

## Entity: RecurrenceInstanceRecord
- Purpose: Persist a generated or pending recurrence occurrence.
- Fields:
  - monthRef: string (`YYYY-MM`)
  - dueDate: string (`YYYY-MM-DD`)
  - recurrenceRuleId: string
  - status: `pending` | `confirmed` | `canceled`
- Validation Rules:
  - `monthRef` MUST be derived from civil dates without timezone drift.
  - `dueDate` MUST use the resolved civil day, capped at the last day of the month when needed.

## Entity: CivilDateMigrationResult
- Purpose: Represent the outcome of normalizing existing shifted records.
- Fields:
  - recordId: string
  - beforeDate: string
  - afterDate: string
  - migratedAt: string
- Validation Rules:
  - `beforeDate` and `afterDate` MUST be auditably different only when a timezone shift existed.
  - `afterDate` MUST be canonical civil form.

## Relationships
- `TransactionRecord.transactionDate` feeds display, filtering, and history grouping.
- `RecurrenceRuleRecord.startDate` and `dayOfMonth` feed `RecurrenceInstanceRecord.dueDate` generation.
- `CivilDateMigrationResult` documents the repair of already-shifted persisted values.
