# Tasks: Remove Demo and Unify Transactions Flow

**Input**: Design documents from `/specs/009-remove-demo-transactions-flow/`
**Prerequisites**: plan.md (required), spec.md (required for user stories), research.md, data-model.md, contracts/, quickstart.md

**Validation**: Automated test tasks are PROHIBITED by constitution. Include manual validation tasks for each user story.

**Organization**: Tasks are grouped by user story to enable independent implementation and validation of each story.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (US1, US2, US3, US4)
- Include exact file paths in descriptions

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Create evidence scaffolding and baseline artifacts for manual validation.

- [X] T001 Create feature validation folder scaffold in manual-validation/remove-demo-transactions-flow/
- [X] T002 Create baseline capture checklist in manual-validation/remove-demo-transactions-flow/setup-baseline.md
- [X] T003 [P] Create quickstart signoff template in manual-validation/remove-demo-transactions-flow/quickstart-signoff.md

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Establish shared contracts/types and remove demo data plumbing that blocks all user stories.

**⚠️ CRITICAL**: No user story implementation starts before this phase is complete.

- [X] T004 Remove demo query parsing usage from dashboard summary API in app/api/dashboard/summary/route.ts
- [X] T004a Preserve legacy `demo` query compatibility by ignoring input without UI/data side effects in app/api/dashboard/summary/route.ts and components/dashboard/dashboard-page-client.tsx
- [X] T005 [P] Remove demo series composition path from monthly summary repository in lib/repositories/monthly-summary-repository.ts
- [X] T006 [P] Remove dashboard demo-mode utility usage in dashboard flow by updating imports/usages in components/dashboard/dashboard-page-client.tsx
- [X] T007 Remove demo-only helper modules from production flow in lib/ui/demo-mode.ts
- [X] T008 Remove demo-only helper modules from production flow in lib/services/chart-demo-series.ts
- [X] T009 Remove demo-only helper modules from production flow in lib/repositories/demo-chart-data.ts
- [X] T010 Define transactions view query contract type and parser in lib/ui/transactions-view.ts
- [X] T011 [P] Update dashboard summary contract types to exclude demo fields in lib/ui/dashboard-history-types.ts

**Checkpoint**: Foundation ready. User story implementation can begin.

---

## Phase 3: User Story 1 - Dashboard Sem Demo (Priority: P1) 🎯 MVP

**Goal**: Remove all demo controls, messages, and demo-derived payload/display behavior from dashboard.

**Independent Validation**: Open dashboard in desktop/mobile and confirm there are no demo controls/texts/data, and the dashboard still loads and renders real data states.

### Manual Validation for User Story 1 (REQUIRED) ✅

- [X] T012 [P] [US1] Document US1 manual checklist in manual-validation/remove-demo-transactions-flow/us1-checklist.md
- [X] T013 [US1] Execute US1 scenarios and log evidence in manual-validation/remove-demo-transactions-flow/us1-dashboard-no-demo.md (depends on T012, T014-T018)

### Implementation for User Story 1

- [X] T014 [P] [US1] Remove demo toggle button and demo URL synchronization logic in components/dashboard/dashboard-page-client.tsx
- [X] T015 [P] [US1] Remove demo badge/series rendering branches from chart component in components/dashboard/area-history-chart.tsx
- [X] T016 [US1] Remove demo empty-state messaging dependency from dashboard feedback component in components/dashboard/dashboard-feedback.tsx
- [X] T017 [US1] Update dashboard header contract to remove demo props/controls in components/dashboard/dashboard-header.tsx
- [X] T018 [US1] Align dashboard i18n text set by removing demo strings in lib/i18n/ui-text.ts

**Checkpoint**: User Story 1 is independently functional and manually validated.

---

## Phase 4: User Story 2 - Acesso Direto no Fluxo de Transacoes (Priority: P1)

**Goal**: Route dashboard CTAs directly to /transactions sections via `view` query param and keep full transactions history with existing filters.

**Independent Validation**: Click dashboard `Transacoes` and `+` CTAs and confirm `/transactions?view=history` and `/transactions?view=new` behavior, with fallback to `history` when view is missing/invalid.

### Manual Validation for User Story 2 (REQUIRED) ✅

- [X] T019 [P] [US2] Document US2 manual checklist in manual-validation/remove-demo-transactions-flow/us2-checklist.md
- [X] T020 [US2] Execute US2 scenarios and log evidence in manual-validation/remove-demo-transactions-flow/us2-transactions-entry.md (depends on T019, T021-T027)

### Implementation for User Story 2

- [X] T021 [P] [US2] Update dashboard Transacoes CTA target to `/transactions?view=history` in components/dashboard/dashboard-header.tsx
- [X] T022 [P] [US2] Update dashboard plus CTA targets to `/transactions?view=new` in components/dashboard/dashboard-page-client.tsx
- [X] T023 [US2] Parse and normalize `view` query param contract in app/transactions/page.tsx
- [X] T024 [US2] Render section entry behavior for history/new modes in app/transactions/page.tsx
- [X] T025 [US2] Ensure history view shows both income and expense records in app/transactions/page.tsx
- [X] T026 [US2] Preserve date/type/category filters in history mode wiring in app/transactions/page.tsx
- [X] T027 [US2] Apply default `history` section resolution for missing/invalid `view` in app/transactions/page.tsx

**Checkpoint**: User Story 2 is independently functional and manually validated.

---

## Phase 5: User Story 3 - Hierarquia Visual do Saldo Historico (Priority: P2)

**Goal**: Reduce historical balance card prominence with objective desktop sizing (70% +/-5%) and right-referenced content alignment.

**Independent Validation**: Validate desktop/mobile layout showing right-referenced content and desktop width ratio in [65%, 75%] relative reference.

### Manual Validation for User Story 3 (REQUIRED) ✅

- [X] T028 [P] [US3] Document US3 manual checklist in manual-validation/remove-demo-transactions-flow/us3-checklist.md
- [X] T029 [US3] Execute US3 scenarios and log evidence in manual-validation/remove-demo-transactions-flow/us3-historical-card-layout.md (depends on T028, T030-T032)

### Implementation for User Story 3

- [X] T030 [P] [US3] Apply desktop width ratio target for historical card composition in components/dashboard/dashboard-page-client.tsx
- [X] T031 [P] [US3] Apply right-aligned text/value rendering in components/dashboard/historical-total-balance-card.tsx
- [X] T032 [US3] Verify responsive readability and spacing constraints in components/dashboard/dashboard-page-client.tsx

**Checkpoint**: User Story 3 is independently functional and manually validated.

---

## Phase 6: User Story 4 - Navegacao Simplificada em /transactions (Priority: P2)

**Goal**: Remove the "Lançamentos" label/tab from /transactions while keeping historical access and filters fully available.

**Independent Validation**: Open `/transactions` and confirm absence of "Lançamentos" wording/tab and continued access to full history/filter flows.

### Manual Validation for User Story 4 (REQUIRED) ✅

- [X] T033 [P] [US4] Document US4 manual checklist in manual-validation/remove-demo-transactions-flow/us4-checklist.md
- [X] T034 [US4] Execute US4 scenarios and log evidence in manual-validation/remove-demo-transactions-flow/us4-transactions-navigation-simplified.md (depends on T033, T035-T037)

### Implementation for User Story 4

- [X] T035 [P] [US4] Remove/replace "Lançamentos" heading or tab label in transactions main section in app/transactions/page.tsx
- [X] T036 [P] [US4] Adjust supporting section copy for transactions-first wording in lib/i18n/ui-text.ts
- [X] T037 [US4] Ensure simplified navigation does not break history/filter visibility in app/transactions/page.tsx

**Checkpoint**: User Story 4 is independently functional and manually validated.

---

## Phase 7: Polish & Cross-Cutting Concerns

**Purpose**: Consolidate validation artifacts, contract compliance, and final quickstart execution.

- [X] T038 [P] Create contract compliance checklist in manual-validation/remove-demo-transactions-flow/contract-compliance.md
- [X] T039 [P] Create regression checklist in manual-validation/remove-demo-transactions-flow/regression-checklist.md
- [X] T040 Consolidate regression results in manual-validation/remove-demo-transactions-flow/regression-summary.md
- [X] T041 Run quickstart validation and signoff in manual-validation/remove-demo-transactions-flow/quickstart-signoff.md
- [X] T042 Execute combined visual/flow consistency matrix in manual-validation/remove-demo-transactions-flow/flow-visual-consistency-matrix.md

---

## Dependencies & Execution Order

### Phase Dependencies

- **Phase 1 (Setup)**: No dependencies.
- **Phase 2 (Foundational)**: Depends on Phase 1 and blocks all user stories.
- **Phase 3 (US1)**: Depends on Phase 2.
- **Phase 4 (US2)**: Depends on Phase 2.
- **Phase 5 (US3)**: Depends on Phase 2.
- **Phase 6 (US4)**: Depends on Phase 2.
- **Phase 7 (Polish)**: Depends on completion of all targeted user stories.

### User Story Dependencies

- **US1 (P1)**: Independent after Foundational.
- **US2 (P1)**: Independent after Foundational.
- **US3 (P2)**: Independent after Foundational.
- **US4 (P2)**: Independent after Foundational; shares `/transactions` surface with US2, so merge order should be coordinated.

### Within Each User Story

- Automated tests MUST NOT be added; manual validation tasks are required instead.
- Shared contracts/types before final scenario execution.
- Implementation before evidence capture task in each story.
- Each story should reach independent validation before polish.

### Parallel Opportunities

- **Setup**: T003 can run after T001.
- **Foundational**: T005, T006, and T011 can run in parallel after T004.
- **US1**: T014 and T015 can run in parallel; T016-T018 follow integration order.
- **US2**: T021 and T022 can run in parallel; T023-T027 follow section-state integration order.
- **US3**: T030 and T031 can run in parallel; T032 finalizes responsive behavior.
- **US4**: T035 and T036 can run in parallel; T037 closes behavior check.
- **Polish**: T038 and T039 can run in parallel before T040/T041/T042.

---

## Parallel Example: User Story 1

```bash
Task: "T014 [US1] Remove demo toggle and URL synchronization in components/dashboard/dashboard-page-client.tsx"
Task: "T015 [US1] Remove demo rendering branches in components/dashboard/area-history-chart.tsx"
Task: "T012 [US1] Document checklist in manual-validation/remove-demo-transactions-flow/us1-checklist.md"
```

## Parallel Example: User Story 2

```bash
Task: "T021 [US2] Update Transacoes CTA target in components/dashboard/dashboard-header.tsx"
Task: "T022 [US2] Update plus CTA targets in components/dashboard/dashboard-page-client.tsx"
Task: "T019 [US2] Document checklist in manual-validation/remove-demo-transactions-flow/us2-checklist.md"
```

## Parallel Example: User Story 3

```bash
Task: "T030 [US3] Apply desktop width ratio target in components/dashboard/dashboard-page-client.tsx"
Task: "T031 [US3] Apply right alignment in components/dashboard/historical-total-balance-card.tsx"
Task: "T028 [US3] Document checklist in manual-validation/remove-demo-transactions-flow/us3-checklist.md"
```

## Parallel Example: User Story 4

```bash
Task: "T035 [US4] Remove/replace Lancamentos label in app/transactions/page.tsx"
Task: "T036 [US4] Update transactions wording in lib/i18n/ui-text.ts"
Task: "T033 [US4] Document checklist in manual-validation/remove-demo-transactions-flow/us4-checklist.md"
```

---

## Implementation Strategy

### MVP First (US1 + US2)

1. Complete Phase 1 and Phase 2.
2. Deliver US1 (remove demo end-to-end) and validate manually.
3. Deliver US2 (direct transactions entry + full history behavior) and validate manually.
4. Pause for review before P2 stories.

### Incremental Delivery

1. Setup + Foundational.
2. US1 -> manual validation.
3. US2 -> manual validation.
4. US3 -> manual validation.
5. US4 -> manual validation.
6. Polish and final quickstart signoff.

### Parallel Team Strategy

1. Team finalizes Setup + Foundational.
2. Then split:
   - Dev A: US1
   - Dev B: US2
   - Dev C: US3
   - Dev D: US4
3. Consolidate with Polish phase and evidence merge.

---

## Notes

- [P] tasks map to separate files and no unresolved dependencies.
- Every task contains explicit file path(s) for immediate execution.
- Manual validation is mandatory and replaces automated tests in this project.
- Stories are independently implementable and independently validatable.
- No new route/endpoint for transaction creation in this feature; use `/transactions?view=new`.
