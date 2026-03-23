# Tasks: Refine Transactions History Entry

**Input**: Design documents from `/specs/010-refine-transactions-history-entry/`
**Prerequisites**: plan.md (required), spec.md (required), research.md, data-model.md, contracts/, quickstart.md

**Validation**: Automated test tasks are PROHIBITED by constitution. Manual validation tasks are required for each user story.

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Prepare feature-scoped docs and shared UI/table conventions before implementation.

- [X] T001 Create manual validation baseline in manual-validation/refine-transactions-history-entry/setup-baseline.md
- [X] T002 Define shared transactions table labels and empty-state copy in lib/i18n/ui-text.ts
- [X] T003 [P] Create feature validation folder scaffold in manual-validation/refine-transactions-history-entry/.gitkeep

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Implement shared data contracts and adapters required by all user stories.

**⚠️ CRITICAL**: No user story work should start before this phase completes.

- [X] T004 Add filter activation helpers for manual-edit tracking in lib/ui/transactions-filter-activation.ts
- [X] T005 Update shared transaction history row/group types in lib/ui/dashboard-history-types.ts
- [X] T006 Expand monthly history repository output to include income and expense rows in lib/repositories/monthly-summary-repository.ts
- [X] T007 Update dashboard history mapper to group unified transaction rows in lib/services/dashboard-history-mapper.ts
- [X] T008 Expose unified full-history groups from summary API in app/api/dashboard/summary/route.ts
- [X] T009 [P] Add view transition reset helper for temporary launches lifecycle in lib/ui/transactions-view.ts

**Checkpoint**: Foundational contracts and adapters are ready for story implementation.

---

## Phase 3: User Story 1 - Filtered Results Gating and Contextual Title (Priority: P1) 🎯 MVP

**Goal**: Show filtered results only after manual filter interaction, with clear filtered-results context.

**Independent Validation**: Access /transactions?view=history and verify hidden section before manual edits, visible section after edit, and explicit empty state when no matches.

### Manual Validation for User Story 1 (REQUIRED) ✅

- [X] T010 [P] [US1] Draft validation checklist for filtered-results gating in manual-validation/refine-transactions-history-entry/us1-filtered-results-gating.md

### Implementation for User Story 1

- [X] T012 [US1] Track manual filter edits and active criteria state in app/transactions/page.tsx
- [X] T013 [US1] Render filtered-results section conditionally with exact heading "Resultados dos filtros aplicados" in app/transactions/page.tsx
- [X] T014 [US1] Render explicit filtered empty state when active filters return no items in app/transactions/page.tsx
- [X] T015 [US1] Align filtered-results table columns and value formatting with shared table contract in app/transactions/page.tsx
- [X] T011 [US1] Execute US1 manual scenarios and capture evidence in manual-validation/refine-transactions-history-entry/us1-filtered-results-gating.md

**Checkpoint**: US1 works independently in /transactions?view=history and is manually validated.

---

## Phase 4: User Story 2 - Complete History with Income and Expense (Priority: P2)

**Goal**: Rename complete history section and ensure monthly grouped history contains both gains and expenses.

**Independent Validation**: Access /transactions?view=history and verify "Historico completo" title plus mixed income/expense records in grouped history.

### Manual Validation for User Story 2 (REQUIRED) ✅

- [X] T016 [P] [US2] Draft validation checklist for complete history scope and naming in manual-validation/refine-transactions-history-entry/us2-complete-history-income-expense.md

### Implementation for User Story 2

- [X] T018 [US2] Replace expense-only history fetch with unified transaction history fetch in lib/repositories/monthly-summary-repository.ts
- [X] T019 [US2] Update summary route payload to expose fullTransactionsHistoryGroups with transitional fullExpenseHistoryGroups alias in app/api/dashboard/summary/route.ts
- [X] T020 [US2] Update monthly history accordion title to "Historico completo" in components/transactions/monthly-expense-history-accordion.tsx
- [X] T021 [US2] Add transaction type column and signed value rendering in components/transactions/monthly-expense-history-accordion.tsx
- [X] T022 [US2] Consume unified history groups in transactions page state and rendering in app/transactions/page.tsx
- [X] T036 [US2] Update dashboard summary consumer compatibility for fullTransactionsHistoryGroups in components/dashboard/dashboard-page-client.tsx
- [X] T037 [US2] Update unified history service adapter naming/usage in lib/services/monthly-expense-history.ts
- [X] T017 [US2] Execute US2 manual scenarios and log evidence in manual-validation/refine-transactions-history-entry/us2-complete-history-income-expense.md

**Checkpoint**: US2 independently delivers complete history wording and data scope.

---

## Phase 5: User Story 3 - Temporary Launches Table in view=new (Priority: P3)

**Goal**: Show newly saved entries in a session-local launches table, newest-first, cleared on leaving view=new.

**Independent Validation**: Access /transactions?view=new, save transactions, confirm newest-first rows, and verify reset on view switch/refresh.

### Manual Validation for User Story 3 (REQUIRED) ✅

- [X] T023 [P] [US3] Draft validation checklist for temporary launches table lifecycle in manual-validation/refine-transactions-history-entry/us3-temporary-launches-table.md

### Implementation for User Story 3

- [X] T025 [US3] Extend transaction form save callback payload with saved entry fields in components/transactions/transaction-form.tsx
- [X] T026 [US3] Create session-local launches table state and newest-first insertion in app/transactions/page.tsx
- [X] T027 [US3] Clear temporary launches state when leaving view=new in app/transactions/page.tsx
- [X] T028 [US3] Render temporary "Lancamentos" table with shared columns in app/transactions/page.tsx
- [X] T029 [US3] Prevent temporary table insertion on failed/invalid saves in components/transactions/transaction-form.tsx
- [X] T024 [US3] Execute US3 manual scenarios and capture evidence in manual-validation/refine-transactions-history-entry/us3-temporary-launches-table.md

**Checkpoint**: US3 independently provides immediate post-save feedback with correct lifecycle boundaries.

---

## Phase 6: Polish & Cross-Cutting Concerns

**Purpose**: Final consistency pass, contract coverage, and manual evidence completion.

- [X] T030 [P] Document table consistency checks across history/new views in manual-validation/refine-transactions-history-entry/us4-table-consistency.md
- [X] T031 Validate contract compliance and record outcomes in manual-validation/refine-transactions-history-entry/contract-compliance.md
- [X] T032 [P] Run regression checklist and capture results in manual-validation/refine-transactions-history-entry/regression-checklist.md
- [X] T033 Summarize regressions and final status in manual-validation/refine-transactions-history-entry/regression-summary.md
- [X] T034 Complete quickstart sign-off after all validations in manual-validation/refine-transactions-history-entry/quickstart-signoff.md
- [X] T035 Run `npm run lint` and register outcome in manual-validation/refine-transactions-history-entry/regression-summary.md

---

## Dependencies & Execution Order

### Phase Dependencies

- **Phase 1 (Setup)**: no dependencies.
- **Phase 2 (Foundational)**: depends on Phase 1 and blocks all user stories.
- **Phase 3 (US1)**: depends on Phase 2.
- **Phase 4 (US2)**: depends on Phase 2; can run in parallel with US1 if resourced.
- **Phase 5 (US3)**: depends on Phase 2; can run in parallel with US1/US2 if resourced.
- **Phase 6 (Polish)**: depends on completion of desired user stories.

### User Story Dependencies

- **US1 (P1)**: independent after foundational.
- **US2 (P2)**: independent after foundational, but shares history payload paths with US1.
- **US3 (P3)**: independent after foundational, centered on new-entry flow.

### Within Each User Story

- Manual validation checklist drafting can start early.
- Core implementation must complete before execution of manual validation evidence task.
- No automated tests may be introduced.

---

## Parallel Example: User Story 1

- Task T010 [US1] in manual-validation/refine-transactions-history-entry/us1-filtered-results-gating.md
- Task T002 in lib/i18n/ui-text.ts

---

## Parallel Example: User Story 2

- Task T016 [US2] in manual-validation/refine-transactions-history-entry/us2-complete-history-income-expense.md
- Task T020 [US2] in components/transactions/monthly-expense-history-accordion.tsx

---

## Parallel Example: User Story 3

- Task T023 [US3] in manual-validation/refine-transactions-history-entry/us3-temporary-launches-table.md
- Task T025 [US3] in components/transactions/transaction-form.tsx

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 1 and Phase 2.
2. Implement Phase 3 (US1) fully.
3. Execute US1 manual validation and record evidence.
4. Review UX behavior in /transactions?view=history before expanding scope.

### Incremental Delivery

1. Deliver US1 (filtered-results gating and title behavior).
2. Deliver US2 (complete history naming + income/expense inclusion).
3. Deliver US3 (temporary launches table lifecycle and ordering).
4. Finish Phase 6 polish and full manual validation sign-off.

### Parallel Team Strategy

1. One developer handles history gating/table rendering in app/transactions/page.tsx.
2. One developer handles history repository + accordion updates.
3. One developer handles temporary launches flow in transaction form and new view.
4. Consolidate with shared manual validation and lint gate.

---

## Notes

- [P] tasks use different files and no direct dependency on incomplete tasks.
- [US#] labels map every story task to its originating user story.
- Every task includes an actionable file path.
- Manual validation artifacts are required by constitution and included per story.
