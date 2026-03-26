# Research: Local-First Financial Storage

## Decision 1: Adopt IndexedDB via Dexie.js as persistence backbone
- Decision: Persist financial data in browser IndexedDB using Dexie.js.
- Rationale: Browser-native persistence with transactional semantics and stable API for local-first web apps.
- Alternatives considered:
  - Keep in-memory store (rejected: data loss on refresh/reopen).
  - localStorage only (rejected: limited query/index capability and weaker structure for aggregates).

## Decision 2: Use versioned Dexie schema with `transactions`, `recurrenceRules`, `meta`
- Decision: Define initial schema version with three stores to separate transactional domain and operational metadata.
- Rationale: Clear domain boundaries and safe future evolution via explicit version upgrades.
- Alternatives considered:
  - Single wide store (rejected: weak separation and migration complexity over time).
  - Add extra stores immediately (rejected: premature complexity for current scope).

## Decision 3: Index for read-heavy filters, search, and dashboard aggregates
- Decision: Prioritize composite indexes by owner scope, status, type/category, and transaction date.
- Rationale: Main flows are listing/history/dashboard reads; indexed queries reduce latency and code complexity.
- Alternatives considered:
  - Minimal indexes only on PK (rejected: expensive scans for common dashboard/filter flows).
  - Over-index everything (rejected: high write overhead without measured gain).

## Decision 4: Convert repositories/services to asynchronous contracts
- Decision: Migrate repository and dependent service methods from sync to async (`Promise`) APIs.
- Rationale: Dexie operations are async; explicit async boundaries avoid hidden coupling and simplify error handling.
- Alternatives considered:
  - Sync wrappers over async internals (rejected: misleading API and brittle control flow).
  - Bypass repositories and query Dexie in UI/routes (rejected: breaks layering and readability).

## Decision 5: Preserve existing API payload contracts during migration
- Decision: Keep response/payload shapes used by current screens, including temporary compatibility aliases.
- Rationale: Reduces frontend regression risk and supports incremental rollout.
- Alternatives considered:
  - Redesign payloads now (rejected: high blast radius and out-of-scope change).

## Decision 6: Enforce owner-scoped local data isolation
- Decision: Partition records by `ownerScope` (`user:<id>` when session exists, `anonymous` otherwise).
- Rationale: Satisfies per-user local isolation requirement without backend dependency.
- Alternatives considered:
  - Single shared bucket per browser profile (rejected: data mixing risk).
  - Mandatory authenticated scope only (rejected: violates anonymous usage requirement).

## Decision 7: Explicitly fail when persistent storage is unavailable
- Decision: Block persistent reads/writes and return clear errors when storage health check fails.
- Rationale: Prevents silent non-persistent behavior and preserves trust in data durability.
- Alternatives considered:
  - Silent fallback to memory (rejected: conflicts with clarified requirement).
  - Read-only partial mode by default (rejected: ambiguous UX and inconsistent expectations).

## Decision 8: Keep temporary launches table session-only in `/transactions?view=new`
- Decision: Preserve current temporary launch list as page-session state only; do not persist that temporary table.
- Rationale: Explicit requirement and current UX alignment.
- Alternatives considered:
  - Persist temporary table (rejected: changes feature semantics).
