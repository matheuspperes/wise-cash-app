# Research - Corrigir Datas Civis de Recorrencias

## Decision 1: Treat civil dates as strings first
- Decision: Preserve `YYYY-MM-DD` values as civil strings wherever the user selected day/month/year must not drift.
- Rationale: String-first handling avoids timezone reinterpretation when reopening, filtering, sorting, or migrating local records.
- Alternatives considered:
  - Keep using `Date` and serialize to ISO: rejected because `Date` introduces timezone-sensitive conversion for civil dates.
  - Convert everything to UTC: rejected because the business rule is civil calendar stability, not absolute time.

## Decision 2: Format civil strings without `new Date(date)`
- Decision: Update display helpers so civil strings are parsed structurally, not by calling `new Date("YYYY-MM-DD")`.
- Rationale: The current formatter in `lib/formatting/ptbr.ts` uses `new Date(...)` for string inputs, which can shift the day in some environments.
- Alternatives considered:
  - Keep formatter fallback parsing: rejected because the visible bug is produced by implicit timezone parsing.

## Decision 3: Derive the form default date from local civil time
- Decision: Use the device's local calendar date for the new-transaction default value instead of UTC `toISOString()`.
- Rationale: The current form default uses UTC day slicing and can show the previous local day near midnight in negative offsets.
- Alternatives considered:
  - Reuse UTC-derived today: rejected because it directly causes the reported 01/05 -> 30/04 drift.

## Decision 4: Keep recurrence math string-based and canonical
- Decision: Keep `dueDate`, `startDate`, `monthRef`, and month comparison logic in civil-string form across recurrence projection and pending-instance generation.
- Rationale: The recurrence service already stores civil strings, so the remaining work is to remove implicit parsing in fallback paths and preserve canonical output during migration.
- Alternatives considered:
  - Represent recurrence dates with full `Date` objects: rejected because recurrence rules are date-based, not timestamp-based.

## Decision 5: Normalize existing records during migration
- Decision: Rewrite affected existing records into canonical civil form as part of the fix.
- Rationale: The clarified requirement says old shifted values must be repaired, not only handled correctly going forward.
- Alternatives considered:
  - Leave old records untouched: rejected because the user wants existing wrong-day records repaired.

## Consistency Check
- Found civil-string parsing points in `lib/formatting/ptbr.ts`, `components/transactions/transaction-form.tsx`, `lib/services/recurrence-service.ts`, `lib/services/local-dashboard-summary.ts`, and `lib/services/dashboard-series-window.ts`.
- The plan keeps all of those paths aligned to the same civil-date rule so history labels, grouping, recurrence projections, and form defaults stay consistent.
