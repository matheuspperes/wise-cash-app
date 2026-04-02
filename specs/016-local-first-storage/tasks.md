# Tasks: Local-First Financial Storage

**Input**: Design documents from `/specs/016-local-first-storage/`
**Prerequisites**: plan.md (required), spec.md (required for user stories), research.md, data-model.md, contracts/, quickstart.md

**Validation**: Automated test tasks are PROHIBITED by constitution. Include manual validation tasks for each user story.

**Organization**: Tasks are grouped by user story to enable independent implementation and validation of each story.

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Prepare dependency and manual-validation scaffolding for local-first migration.

- [X] T001 Add Dexie dependency in package.json
- [X] T002 Install updated dependencies and lockfile in package-lock.json
- [X] T003 Create manual validation folder for this feature in manual-validation/local-first-storage/
- [X] T004 Create baseline validation notes in manual-validation/local-first-storage/setup-baseline.md
- [X] T005 [P] Create quickstart signoff scaffold in manual-validation/local-first-storage/quickstart-signoff.md

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Build shared local-storage foundations used by all stories.

**CRITICAL**: No user story implementation should begin before this phase is complete.

- [X] T006 Create Dexie database schema v1 (`transactions`, `recurrenceRules`, `meta`) in lib/storage/dexie-db.ts
- [X] T007 Create owner-scope resolution helper (`user:<id>` and `anonymous`) in lib/storage/scoped-db.ts
- [X] T008 Create storage availability/health guard in lib/storage/local-storage-health.ts
- [X] T009 [P] Create normalized text utilities for case/accent-insensitive search in lib/repositories/text-normalization.ts
- [X] T010 Create async repository contract types for local finance storage in lib/repositories/local-finance-contracts.ts
- [X] T011 Create client gateway for local transaction operations in lib/services/local-transactions-gateway.ts
- [X] T012 Create client gateway for local dashboard summary in lib/services/local-dashboard-summary.ts
- [X] T013 [P] Add feature regression checklist scaffold in manual-validation/local-first-storage/regression-checklist.md

**Checkpoint**: Local-first storage foundations are available and story work can start.

---

## Phase 3: User Story 1 - Persistir Lancamentos Locais (Priority: P1) MVP

**Goal**: Persist transaction CRUD with soft delete in browser storage and preserve data across refresh/reopen.

**Independent Validation**: Create/edit/delete transactions, refresh and reopen browser, and verify persisted active data remains available.

### Manual Validation for User Story 1 (REQUIRED)

- [X] T014 [P] [US1] Draft persistence CRUD checklist in manual-validation/local-first-storage/us1-persistence-crud.md

### Implementation for User Story 1

- [X] T015 [US1] Implement async transaction CRUD repository over Dexie in lib/repositories/transaction-repository.ts
- [X] T016 [US1] Migrate transaction create/patch service flow to async repository contracts in lib/services/transaction-service.ts
- [X] T017 [US1] Integrate transaction form save flow with local client gateway in components/transactions/transaction-form.tsx
- [X] T018 [US1] Integrate transaction update/delete flow with local client gateway in components/transactions/transactions-page-client.tsx
- [X] T019 [US1] Enforce session-only temporary transactions table behavior in components/transactions/transactions-page-client.tsx
- [X] T020 [US1] Add UI-level storage error feedback for CRUD failures in components/transactions/transaction-form.tsx
- [ ] T021 [US1] Execute US1 manual scenarios and record evidence in manual-validation/local-first-storage/us1-persistence-crud.md

**Checkpoint**: US1 persistence CRUD is functional and independently validated.

---

## Phase 4: User Story 2 - Consultar e Filtrar Dados Locais (Priority: P1)

**Goal**: Ensure filters/search run correctly over local persisted data with inclusive dates and accent/case-insensitive search.

**Independent Validation**: Apply type/category/date filters and text search (with case/accent variants) over a known local dataset.

### Manual Validation for User Story 2 (REQUIRED)

- [X] T022 [P] [US2] Draft filter/search checklist in manual-validation/local-first-storage/us2-filter-search.md

### Implementation for User Story 2

- [X] T023 [US2] Implement inclusive date-range filtering in async transaction listing query in lib/repositories/transaction-repository.ts
- [X] T024 [US2] Implement case/accent-insensitive text search over name/category/notes in lib/repositories/transaction-search.ts
- [X] T025 [US2] Ensure deterministic filter+search composition in local query service in lib/services/local-transactions-gateway.ts
- [X] T026 [US2] Connect transactions history loading/error handling to local query service in components/transactions/transactions-page-client.tsx
- [X] T027 [US2] Verify filter state wiring remains compatible with existing UI controls in components/transactions/transaction-filters.tsx
- [ ] T028 [US2] Execute US2 manual scenarios and record evidence in manual-validation/local-first-storage/us2-filter-search.md

**Checkpoint**: US2 filter/search behavior is functional and independently validated.

---

## Phase 5: User Story 3 - Dashboard Baseado em Dados Locais (Priority: P1)

**Goal**: Drive dashboard aggregates from local persisted transactions with history including income and expense.

**Independent Validation**: Confirm net balance, monthly series, full history groups, and current month rows match local active transactions.

### Manual Validation for User Story 3 (REQUIRED)

- [X] T029 [P] [US3] Draft dashboard aggregate checklist in manual-validation/local-first-storage/us3-dashboard-aggregates.md

### Implementation for User Story 3

- [X] T030 [US3] Migrate monthly summary repository to async local-first aggregation by owner scope in lib/repositories/monthly-summary-repository.ts
- [X] T031 [US3] Connect dashboard summary loading to local dashboard gateway in components/dashboard/dashboard-page-client.tsx
- [X] T032 [US3] Ensure full history groups include both income and expense from local active records in lib/services/dashboard-history-mapper.ts
- [X] T033 [US3] Enforce owner-scope usage in all aggregate queries in lib/repositories/monthly-summary-repository.ts
- [ ] T034 [US3] Execute US3 manual scenarios and record evidence in manual-validation/local-first-storage/us3-dashboard-aggregates.md

**Checkpoint**: US3 dashboard aggregation is functional and independently validated.

---

## Phase 6: Polish & Cross-Cutting Concerns

**Purpose**: Finalize migration hardening, compatibility checks, and release readiness.

- [ ] T035 [P] Execute owner-scope isolation scenarios (user A/B/anonymous) in manual-validation/local-first-storage/us-scope-isolation.md
- [ ] T036 [P] Document storage-unavailable scenario evidence in manual-validation/local-first-storage/storage-unavailable.md
- [ ] T037 Execute navigation-persistence scenario (dashboard <-> transactions) in manual-validation/local-first-storage/navigation-persistence.md
- [ ] T038 Remove active runtime dependency on in-memory store in lib/repositories/in-memory-db.ts
- [ ] T039 [P] Consolidate regression outcomes in manual-validation/local-first-storage/regression-summary.md
- [ ] T040 Align feature quickstart with implemented details in specs/016-local-first-storage/quickstart.md
- [X] T041 Run lint validation and append result in manual-validation/local-first-storage/quickstart-signoff.md
- [ ] T042 Finalize signoff and contract coverage notes in manual-validation/local-first-storage/quickstart-signoff.md
- [X] T043 Add explicit storage-unavailable message handling for read flows in components/transactions/transactions-page-client.tsx and components/dashboard/dashboard-page-client.tsx
- [ ] T044 Add explicit SC-007 visual/navigation checklist evidence in manual-validation/local-first-storage/regression-checklist.md

---

## Dependencies & Execution Order

### Phase Dependencies

- Setup (Phase 1): no dependencies.
- Foundational (Phase 2): depends on Setup; blocks all stories.
- User Stories (Phases 3-5): each depends on Foundational only.
- Polish (Phase 6): depends on completion of selected stories.

### User Story Dependencies

- US1 (P1): can start after Foundational and is the MVP.
- US2 (P1): can start after Foundational and is independently validatable.
- US3 (P1): can start after Foundational and is independently validatable.

### Within Each User Story

- Draft manual checklist first.
- Implement core behavior next.
- Execute manual validation and capture evidence before checkpoint.

### Parallel Opportunities

- T005 can run in parallel with T003-T004.
- T009 and T013 can run in parallel after T006-T008.
- T014, T022, and T029 can be drafted in parallel once Phase 2 completes.
- T035 and T036 can run in parallel during polish.

---

## Parallel Example: User Story 1

Task: "T014 [US1] Draft persistence CRUD checklist in manual-validation/local-first-storage/us1-persistence-crud.md"
Task: "T015 [US1] Implement async transaction CRUD repository over Dexie in lib/repositories/transaction-repository.ts"

## Parallel Example: User Story 2

Task: "T022 [US2] Draft filter/search checklist in manual-validation/local-first-storage/us2-filter-search.md"
Task: "T024 [US2] Implement case/accent-insensitive text search in lib/repositories/transaction-search.ts"

---

## Implementation Strategy

### MVP First (US1)

1. Complete Setup and Foundational phases.
2. Deliver US1 persistence CRUD.
3. Validate US1 manually and record evidence.
4. Stop for MVP review.

### Incremental Delivery

1. Foundation first (Dexie, scope, health guard, async contracts).
2. Ship US1 and validate.
3. Ship US2 and validate.
4. Ship US3 and validate.
5. Finish polish and final signoff.

### Parallel Team Strategy

1. Developer A: storage core + repository contracts (Phase 2/US1).
2. Developer B: filter/search behavior (US2).
3. Developer C: dashboard aggregation (US3).

---

## Notes

- [P] tasks indicate low-coupling tasks that can run in parallel.
- All stories include mandatory manual validation tasks.
- Automated test tasks are intentionally excluded per constitution.
- Task descriptions include explicit file paths for direct execution.
