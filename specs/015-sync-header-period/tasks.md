# Tasks: Sync Header and Default Period

**Input**: Design documents from /specs/015-sync-header-period/
**Prerequisites**: plan.md (required), spec.md (required for user stories), research.md, data-model.md, contracts/, quickstart.md

**Validation**: Automated test tasks are PROHIBITED by constitution. Manual validation tasks are required for each user story.

**Organization**: Tasks are grouped by user story to enable independent implementation and independent validation.

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Prepare manual validation artifacts and baseline evidence for this feature.

- [X] T001 Create manual validation folder for this feature in manual-validation/sync-header-period/
- [X] T002 Create setup baseline notes in manual-validation/sync-header-period/setup-baseline.md
- [X] T003 [P] Create quickstart signoff scaffold in manual-validation/sync-header-period/quickstart-signoff.md

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Establish shared UI/state helpers needed by both user stories.

**CRITICAL**: No user story implementation should start before this phase is complete.

- [X] T004 Add dashboard period default resolver helper in lib/ui/dashboard-period-default.ts
- [X] T005 [P] Add persisted period parsing/validation utility in lib/ui/dashboard-period-default.ts
- [X] T006 [P] Add regression checklist template in manual-validation/sync-header-period/regression-checklist.md

**Checkpoint**: Shared foundations are ready for story implementation.

---

## Phase 3: User Story 1 - Unificar Header em Transações (Priority: P1) MVP

**Goal**: Reuse dashboard header pattern in all `/transactions` variants with title `Transações` and only `Voltar ao dashboard` control.

**Independent Validation**: Open `/transactions`, `/transactions?view=history`, and `/transactions?view=new` and confirm same header structure, `Transações` title, and single back action preserving navigation.

### Manual Validation for User Story 1 (REQUIRED)

- [X] T007 [P] [US1] Draft header validation checklist in manual-validation/sync-header-period/us1-transactions-header.md

### Implementation for User Story 1

- [X] T008 [US1] Add configurable header title support in components/dashboard/dashboard-header.tsx
- [X] T009 [US1] Replace transactions top header row with DashboardHeader usage in components/transactions/transactions-page-client.tsx
- [X] T010 [US1] Keep only `Voltar ao dashboard` as header control across transactions route variants in components/transactions/transactions-page-client.tsx
- [X] T011 [US1] Verify and preserve current back navigation target/semantics in components/transactions/transactions-page-client.tsx
- [X] T012 [US1] Execute US1 manual scenarios and log evidence in manual-validation/sync-header-period/us1-transactions-header.md

**Checkpoint**: US1 is independently functional and validated.

---

## Phase 4: User Story 2 - Reduzir Periodo Inicial para 3 Meses (Priority: P1)

**Goal**: Change dashboard initial period fallback to 3 months while respecting persisted preference when available.

**Independent Validation**: Validate dashboard initial load with and without persisted period preference and confirm query/data window follows applied period source.

### Manual Validation for User Story 2 (REQUIRED)

- [X] T013 [P] [US2] Draft default-period validation checklist in manual-validation/sync-header-period/us2-dashboard-default-period.md

### Implementation for User Story 2

- [X] T014 [US2] Integrate period default resolver into dashboard initial state in components/dashboard/dashboard-page-client.tsx
- [X] T015 [US2] Update fallback initial months from 12 to 3 in components/dashboard/dashboard-page-client.tsx
- [X] T016 [US2] Ensure initial dashboard summary query uses resolved period source in components/dashboard/dashboard-page-client.tsx
- [X] T017 [US2] Add in-file comments or naming clarity for persisted-vs-fallback period behavior in components/dashboard/dashboard-page-client.tsx
- [X] T018 [US2] Execute US2 manual scenarios and log evidence in manual-validation/sync-header-period/us2-dashboard-default-period.md

**Checkpoint**: US2 is independently functional and validated.

---

## Phase 5: Polish and Cross-Cutting Concerns

**Purpose**: Final alignment, regression evidence, and release readiness.

- [X] T019 [P] Consolidate feature regression outcomes in manual-validation/sync-header-period/regression-summary.md
- [X] T020 Run lint verification and append result in manual-validation/sync-header-period/quickstart-signoff.md
- [X] T021 [P] Align quickstart with implemented behavior in specs/015-sync-header-period/quickstart.md
- [X] T022 Finalize signoff and contract coverage notes in manual-validation/sync-header-period/quickstart-signoff.md

---

## Dependencies and Execution Order

### Phase Dependencies

- Setup (Phase 1): no dependencies.
- Foundational (Phase 2): depends on Setup; blocks user stories.
- User Stories (Phase 3-4): depend on Foundational completion.
- Polish (Phase 5): depends on completion of selected user stories.

### User Story Dependencies

- US1 (P1): can start after Foundational; independent from US2.
- US2 (P1): can start after Foundational; independent from US1.

### Within Each User Story

- Manual validation checklist task first.
- Implementation tasks next.
- Manual validation execution and evidence logging before story checkpoint.

### Parallel Opportunities

- T003 can run in parallel with T001-T002.
- T005 and T006 can run in parallel after T004 starts.
- US1 and US2 can proceed in parallel after Foundational (different component files).
- T019 and T021 can run in parallel in Polish phase.

---

## Parallel Example: User Story 1

```bash
Task: "T007 [US1] Draft header validation checklist in manual-validation/sync-header-period/us1-transactions-header.md"
Task: "T008 [US1] Add configurable header title support in components/dashboard/dashboard-header.tsx"
```

## Parallel Example: User Story 2

```bash
Task: "T013 [US2] Draft default-period validation checklist in manual-validation/sync-header-period/us2-dashboard-default-period.md"
Task: "T014 [US2] Integrate period default resolver into dashboard initial state in components/dashboard/dashboard-page-client.tsx"
```

---

## Implementation Strategy

### MVP First (P1 Stories)

1. Complete Phase 1 and Phase 2.
2. Deliver US1 and validate.
3. Deliver US2 and validate.
4. Stop for MVP review.

### Incremental Delivery

1. Foundation first (setup + shared helper).
2. Ship US1 -> validate.
3. Ship US2 -> validate.
4. Execute polish and final signoff.

### Parallel Team Strategy

1. Developer A: US1 (header sync in transactions).
2. Developer B: US2 (dashboard default period behavior).
3. Pair for final lint/signoff and regression evidence.

---

## Notes

- P-marked tasks indicate parallelizable work with low coupling.
- All user stories include manual validation tasks by constitution.
- Automated test tasks are intentionally excluded.
- Task descriptions include explicit file paths for direct execution.
