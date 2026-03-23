# Tasks: Refine Balance Card and CTA Layout

**Input**: Design documents from `/specs/012-refine-balance-cta-layout/`
**Prerequisites**: plan.md (required), spec.md (required), research.md, data-model.md, contracts/, quickstart.md

**Validation**: Automated test tasks are PROHIBITED by constitution. Manual validation tasks are required for each user story.

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Prepare validation artifacts and baseline references for consistent implementation.

- [x] T001 Create feature validation folder scaffold in manual-validation/refine-balance-cta-layout/.gitkeep
- [x] T002 Create baseline validation notes in manual-validation/refine-balance-cta-layout/setup-baseline.md
- [x] T003 [P] Register baseline dashboard and transactions UI checkpoints in manual-validation/refine-balance-cta-layout/setup-baseline.md
- [x] T004 [P] Prepare regression checklist skeleton in manual-validation/refine-balance-cta-layout/regression-checklist.md

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Establish shared layout and routing prerequisites before story-specific refinements.

**⚠️ CRITICAL**: No user story implementation should start before this phase completes.

- [x] T005 Consolidate dashboard top controls composition entry points in components/dashboard/dashboard-page-client.tsx
- [x] T006 Prepare dashboard header navigation surface for single-entry Transacoes model in components/dashboard/dashboard-header.tsx
- [x] T007 Audit and preserve existing route destinations for `view=history` and `view=new` in components/dashboard/dashboard-page-client.tsx without introducing new shared abstraction layers
- [x] T008 [P] Draft contract validation scaffold in manual-validation/refine-balance-cta-layout/contract-compliance.md
- [x] T009 Confirm no business-logic or data-fetch behavior changes in dashboard summary flow inside components/dashboard/dashboard-page-client.tsx

**Checkpoint**: Shared composition and routing guardrails are in place for independent story delivery.

---

## Phase 3: User Story 1 - Consolidar controles no topo da dashboard (Priority: P1) 🎯 MVP

**Goal**: Keep period filter, Transacoes, and Nova Transacao in one dashboard control cluster without duplication and with stable responsive behavior.

**Independent Validation**: Open dashboard across breakpoints and verify single Transacoes access, visual hierarchy, and history-route destination.

### Manual Validation for User Story 1 (REQUIRED) ✅

- [x] T010 [P] [US1] Draft US1 checklist in manual-validation/refine-balance-cta-layout/us1-dashboard-cluster.md

### Implementation for User Story 1

- [x] T011 [US1] Render Transacoes beside period filter and Nova Transacao in components/dashboard/dashboard-page-client.tsx
- [x] T012 [US1] Remove duplicate Transacoes access from header navigation in components/dashboard/dashboard-header.tsx
- [x] T013 [US1] Apply reduced inner padding for Transacoes button in components/dashboard/dashboard-page-client.tsx
- [x] T014 [US1] Apply subtle background/contrast emphasis without size increase for Transacoes button in components/dashboard/dashboard-page-client.tsx
- [x] T015 [US1] Bind Transacoes button destination directly to `/transactions?view=history` in components/dashboard/dashboard-page-client.tsx
- [x] T016 [US1] Execute US1 scenarios and record evidence in manual-validation/refine-balance-cta-layout/us1-dashboard-cluster.md

**Checkpoint**: Dashboard control cluster behavior and Transacoes access model are independently validated.

---

## Phase 4: User Story 2 - Compactar card de saldo liquido historico (Priority: P2)

**Goal**: Apply 20% compact profile in desktop/tablet and proportional compact behavior in mobile while preserving alignment parity.

**Independent Validation**: Compare historical card against baseline in desktop/tablet and mobile and confirm compactness plus alignment/readability.

### Manual Validation for User Story 2 (REQUIRED) ✅

- [x] T017 [P] [US2] Draft US2 checklist in manual-validation/refine-balance-cta-layout/us2-historical-card-compactness.md

### Implementation for User Story 2

- [x] T018 [US2] Apply desktop/tablet approximate 20% text-scale reduction in components/dashboard/historical-total-balance-card.tsx
- [x] T019 [US2] Apply desktop/tablet approximate 20% useful horizontal occupancy reduction in components/dashboard/historical-total-balance-card.tsx
- [x] T020 [US2] Implement proportional compact behavior for mobile in components/dashboard/historical-total-balance-card.tsx
- [x] T021 [US2] Preserve alignment parity with companion balance card via card container/grid tuning in components/dashboard/dashboard-page-client.tsx
- [x] T022 [US2] Execute US2 scenarios and record evidence in manual-validation/refine-balance-cta-layout/us2-historical-card-compactness.md

**Checkpoint**: Historical card compact profile is independently validated across breakpoints.

---

## Phase 5: User Story 3 - CTA textual Nova Transacao na dashboard (Priority: P3)

**Goal**: Replace icon-only add action with textual Nova Transacao CTA while preserving create-route behavior and cluster balance.

**Independent Validation**: Verify textual CTA visibility, proportional styling, and unchanged destination in dashboard flow.

### Manual Validation for User Story 3 (REQUIRED) ✅

- [x] T023 [P] [US3] Draft US3 checklist in manual-validation/refine-balance-cta-layout/us3-dashboard-new-cta.md

### Implementation for User Story 3

- [x] T024 [US3] Replace icon-only add action by textual `Nova Transacao` in components/dashboard/dashboard-page-client.tsx
- [x] T025 [US3] Adjust dashboard CTA spacing/proportions for cluster balance in components/dashboard/dashboard-page-client.tsx
- [x] T026 [US3] Preserve create destination `/transactions?view=new` for dashboard CTA in components/dashboard/dashboard-page-client.tsx
- [x] T027 [US3] Execute US3 scenarios and record evidence in manual-validation/refine-balance-cta-layout/us3-dashboard-new-cta.md

**Checkpoint**: Dashboard textual create CTA is independently validated.

---

## Phase 6: User Story 4 - CTA Nova transacao na pagina de historico (Priority: P3)

**Goal**: Add history-page Nova transacao action using same style-base as reference CTA in transactions new view.

**Independent Validation**: Validate style-base parity and create-route behavior from history view.

### Manual Validation for User Story 4 (REQUIRED) ✅

- [x] T028 [P] [US4] Draft US4 checklist in manual-validation/refine-balance-cta-layout/us4-history-page-cta-parity.md

### Implementation for User Story 4

- [x] T029 [US4] Reuse existing style-base for CTA parity from transactions new-view action in app/transactions/page.tsx without introducing new variant abstractions
- [x] T030 [US4] Add `Nova transacao` action in history view using the same style-base in app/transactions/page.tsx
- [x] T031 [US4] Preserve create destination `/transactions?view=new` from history-page CTA in app/transactions/page.tsx
- [x] T032 [US4] Execute US4 scenarios and record evidence in manual-validation/refine-balance-cta-layout/us4-history-page-cta-parity.md

**Checkpoint**: History-page CTA parity and behavior are independently validated.

---

## Phase 7: Polish & Cross-Cutting Concerns

**Purpose**: Final compliance, regression, and sign-off across all user stories.

- [x] T033 [P] Document contract compliance outcomes in manual-validation/refine-balance-cta-layout/contract-compliance.md
- [x] T034 [P] Execute regression checklist in manual-validation/refine-balance-cta-layout/regression-checklist.md
- [x] T035 Summarize regression outcomes in manual-validation/refine-balance-cta-layout/regression-summary.md
- [x] T036 Run `npm run lint` and log result in manual-validation/refine-balance-cta-layout/regression-summary.md
- [x] T037 Complete quickstart sign-off in manual-validation/refine-balance-cta-layout/quickstart-signoff.md

---

## Dependencies & Execution Order

### Phase Dependencies

- **Phase 1 (Setup)**: no dependencies.
- **Phase 2 (Foundational)**: depends on Phase 1 and blocks all user stories.
- **Phase 3 (US1)**: depends on Phase 2.
- **Phase 4 (US2)**: depends on Phase 2; can run in parallel with US1 if resourced.
- **Phase 5 (US3)**: depends on Phase 3 due to shared dashboard control cluster surface.
- **Phase 6 (US4)**: depends on Phase 2; can run in parallel with US2.
- **Phase 7 (Polish)**: depends on completion of desired user stories.

### User Story Dependencies

- **US1 (P1)**: independent after foundational; establishes final dashboard control-cluster baseline.
- **US2 (P2)**: independent after foundational; shares dashboard surface but not US1 route logic.
- **US3 (P3)**: depends on US1 cluster baseline for CTA replacement and proportion tuning.
- **US4 (P3)**: independent after foundational; scoped to transactions page.

### Within Each User Story

- Manual checklist drafting can start first.
- Implementation tasks must complete before manual evidence execution task.
- No automated tests may be introduced.

---

## Parallel Example: User Story 1

- Task T010 [US1] in manual-validation/refine-balance-cta-layout/us1-dashboard-cluster.md
- Task T013 [US1] in components/dashboard/dashboard-page-client.tsx

---

## Parallel Example: User Story 2

- Task T017 [US2] in manual-validation/refine-balance-cta-layout/us2-historical-card-compactness.md
- Task T021 [US2] in components/dashboard/dashboard-page-client.tsx

---

## Parallel Example: User Story 3

- Task T023 [US3] in manual-validation/refine-balance-cta-layout/us3-dashboard-new-cta.md
- Task T026 [US3] in components/dashboard/dashboard-page-client.tsx

---

## Parallel Example: User Story 4

- Task T028 [US4] in manual-validation/refine-balance-cta-layout/us4-history-page-cta-parity.md
- Task T031 [US4] in app/transactions/page.tsx

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 1 and Phase 2.
2. Implement Phase 3 (US1) fully.
3. Execute US1 manual validation and capture evidence.
4. Confirm single Transacoes access and routing correctness before expanding scope.

### Incremental Delivery

1. Deliver US1 (dashboard cluster consolidation and Transacoes behavior).
2. Deliver US2 (historical card compactness profile).
3. Deliver US3 (dashboard textual Nova Transacao CTA).
4. Deliver US4 (history-page CTA style parity).
5. Finalize polish and cross-cutting validation artifacts.

### Parallel Team Strategy

1. Developer A: dashboard cluster and routing refinements in components/dashboard/dashboard-page-client.tsx and components/dashboard/dashboard-header.tsx.
2. Developer B: historical card compactness in components/dashboard/historical-total-balance-card.tsx.
3. Developer C: transactions history CTA parity in app/transactions/page.tsx plus validation artifacts.

---

## Notes

- [P] tasks indicate file-level independence and safe parallelization.
- [US#] labels map story tasks to spec priorities.
- Every task includes a concrete file path.
- Manual validation artifacts are mandatory by constitution.
