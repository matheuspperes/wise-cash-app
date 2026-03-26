# Quickstart: Local-First Financial Storage

## Goal
Migrate finance persistence from in-memory to browser-local storage while keeping existing UI behavior and payload contracts.

## Implementation Sequence
1. Introduce Dexie storage layer with versioned schema (`transactions`, `recurrenceRules`, `meta`).
2. Add owner-scope resolution (`user:<id>` or `anonymous`) used across repositories.
3. Convert transaction/monthly-summary/search repositories to async contracts over Dexie.
4. Update services to async flows while preserving payload shape expected by existing API routes.
5. Update API routes (`transactions`, `transactions/[id]`, `dashboard/summary`) to consume async repositories.
6. Preserve session-only temporary table behavior in `/transactions?view=new`.
7. Implement storage health checks and explicit unavailability errors (no silent memory fallback).
8. Verify dashboard aggregates and filters/search parity with local persisted data.

## Manual Validation Scenarios
1. Create transactions, refresh page, and reopen browser: data remains available.
2. Edit and soft-delete transactions: updates persist; deleted records disappear from active outputs.
3. Apply filters by type/category/date and verify date boundaries are inclusive.
4. Run text search with case and accent variants and verify same expected matches.
5. Confirm dashboard net balance, monthly series, full history, and current month reflect persisted local active transactions.
6. Validate no data mixing between user scope and anonymous scope.
7. Navigate repeatedly between dashboard and transactions and confirm no local data loss.
8. Simulate local storage unavailability and confirm persistent operations are blocked with clear error messaging.
9. Confirm temporary launches in `/transactions?view=new` remain session-only and do not become durable records unless saved.

## Evidence Files (manual validation)
- `manual-validation/local-first-storage/setup-baseline.md`
- `manual-validation/local-first-storage/us1-persistence-crud.md`
- `manual-validation/local-first-storage/us2-filter-search.md`
- `manual-validation/local-first-storage/us3-dashboard-aggregates.md`
- `manual-validation/local-first-storage/storage-unavailable.md`
- `manual-validation/local-first-storage/regression-summary.md`
- `manual-validation/local-first-storage/quickstart-signoff.md`
