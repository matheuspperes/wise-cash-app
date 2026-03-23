# Tasks: Align Header and Balance Cards

**Input**: Design documents from `/specs/011-align-header-balance-cards/`
**Prerequisites**: plan.md (required), spec.md (required), research.md, data-model.md, contracts/, quickstart.md

**Validation**: Automated test tasks are PROHIBITED by constitution. Manual validation tasks are required for each user story.

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Prepare feature validation artifacts and baseline notes for consistent execution.

- [x] T001 Create baseline validation document in manual-validation/align-header-balance-cards/setup-baseline.md
- [x] T002 [P] Confirm no dashboard copy-token changes are required by this layout-only scope in manual-validation/align-header-balance-cards/setup-baseline.md
- [x] T003 [P] Create feature validation folder scaffold in manual-validation/align-header-balance-cards/.gitkeep

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Establish shared layout/alignment primitives used across all user stories.

**⚠️ CRITICAL**: No user story work should start before this phase completes.

- [x] T004 Implement responsive header layout modes directly in existing dashboard composition in components/dashboard/dashboard-page-client.tsx
- [x] T005 Implement baseline net-card alignment rule needed by later two-card equivalence tasks in components/dashboard/net-balance-card.tsx
- [x] T006 Integrate dashboard-level spacing/alignment adjustments without new abstraction files in components/dashboard/dashboard-page-client.tsx
- [x] T007 [P] Wire manual-validation quick baseline checklist content in manual-validation/align-header-balance-cards/setup-baseline.md
- [x] T008 Ensure no functional data-flow changes are introduced in dashboard summary query usage inside components/dashboard/dashboard-page-client.tsx

**Checkpoint**: Shared layout primitives and guardrails are ready for story implementation.

---

## Phase 3: User Story 1 - Header Left/Right Alignment (Priority: P1) 🎯 MVP

**Goal**: Keep title on left and period/add controls on right with one-row desktop/tablet and two-row mobile fallback.

**Independent Validation**: Open dashboard in desktop/tablet/mobile breakpoints and verify hierarchy, row behavior, and no overlap.

### Manual Validation for User Story 1 (REQUIRED) ✅

- [x] T009 [P] [US1] Draft US1 checklist in manual-validation/align-header-balance-cards/us1-header-horizontal-alignment.md

### Implementation for User Story 1

- [x] T010 [US1] Refactor dashboard top composition to enforce title-left and controls-right hierarchy in components/dashboard/dashboard-page-client.tsx
- [x] T011 [US1] Implement one-row desktop/tablet and controlled two-row mobile behavior in components/dashboard/dashboard-page-client.tsx
- [x] T012 [US1] Ensure controls remain right-aligned in mobile second row without overlap in components/dashboard/dashboard-page-client.tsx
- [x] T013 [US1] Validate header spacing stability when period selection changes in components/dashboard/dashboard-page-client.tsx
- [x] T014 [US1] Execute US1 manual scenarios and record evidence in manual-validation/align-header-balance-cards/us1-header-horizontal-alignment.md

**Checkpoint**: Header hierarchy and responsive behavior are independently validated.

---

## Phase 4: User Story 2 - Balance Card Alignment Equivalence (Priority: P2)

**Goal**: Apply equivalent vertical centering and left-anchored content in both balance cards using same internal offset rule.

**Independent Validation**: Compare both cards in ready/loading states and verify equivalent content block height/centering and left anchoring.

### Manual Validation for User Story 2 (REQUIRED) ✅

- [x] T015 [P] [US2] Draft US2 checklist in manual-validation/align-header-balance-cards/us2-balance-card-alignment.md

### Implementation for User Story 2

- [x] T016 [US2] Apply left-anchored content layout to net balance card in components/dashboard/net-balance-card.tsx
- [x] T017 [US2] Apply left-anchored content layout to historical net balance card in components/dashboard/historical-total-balance-card.tsx
- [x] T018 [US2] Ensure equivalent useful-content height and vertical centering in net balance card in components/dashboard/net-balance-card.tsx
- [x] T019 [US2] Ensure equivalent useful-content height and vertical centering in historical net balance card in components/dashboard/historical-total-balance-card.tsx
- [x] T020 [US2] Harmonize card grid/container alignment behavior in components/dashboard/dashboard-page-client.tsx
- [x] T021 [US2] Execute US2 manual scenarios and record evidence in manual-validation/align-header-balance-cards/us2-balance-card-alignment.md

**Checkpoint**: Both balance cards have consistent alignment behavior and are independently validated.

---

## Phase 5: User Story 3 - Functional Parity After Layout Changes (Priority: P3)

**Goal**: Preserve period-selection behavior and add-action navigation while applying visual adjustments.

**Independent Validation**: Execute period changes and add-action flow before/after layout changes and confirm unchanged behavior.

### Manual Validation for User Story 3 (REQUIRED) ✅

- [x] T022 [P] [US3] Draft US3 checklist in manual-validation/align-header-balance-cards/us3-functional-parity.md

### Implementation for User Story 3

- [x] T023 [US3] Verify and preserve period selector interaction wiring in components/dashboard/dashboard-page-client.tsx
- [x] T024 [US3] Verify and preserve add-action destination and interaction wiring in components/dashboard/dashboard-page-client.tsx
- [x] T025 [US3] Confirm loading and ready state transitions keep behavior intact in components/dashboard/dashboard-page-client.tsx
- [x] T026 [US3] Execute US3 manual scenarios and record evidence in manual-validation/align-header-balance-cards/us3-functional-parity.md

**Checkpoint**: Functional parity is preserved and independently validated.

---

## Phase 6: Polish & Cross-Cutting Concerns

**Purpose**: Final contract/regression verification and quality gate completion.

- [x] T027 [P] Document contract compliance outcomes in manual-validation/align-header-balance-cards/contract-compliance.md
- [x] T028 [P] Execute regression checklist in manual-validation/align-header-balance-cards/regression-checklist.md
- [x] T029 Summarize regression outcomes in manual-validation/align-header-balance-cards/regression-summary.md
- [x] T030 Run `npm run lint` and log result in manual-validation/align-header-balance-cards/regression-summary.md
- [x] T031 Complete quickstart sign-off in manual-validation/align-header-balance-cards/quickstart-signoff.md

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
- **US2 (P2)**: independent after foundational; shares dashboard container context with US1.
- **US3 (P3)**: independent after foundational; verifies no behavior regression in same dashboard surface.

### Within Each User Story

- Manual checklist drafting can start first.
- Implementation tasks must complete before manual execution evidence task.
- No automated tests may be introduced.

---

## Parallel Example: User Story 1

- Task T009 [US1] in manual-validation/align-header-balance-cards/us1-header-horizontal-alignment.md
- Task T002 in manual-validation/align-header-balance-cards/setup-baseline.md

---

## Parallel Example: User Story 2

- Task T015 [US2] in manual-validation/align-header-balance-cards/us2-balance-card-alignment.md
- Task T028 in manual-validation/align-header-balance-cards/regression-checklist.md

---

## Parallel Example: User Story 3

- Task T022 [US3] in manual-validation/align-header-balance-cards/us3-functional-parity.md
- Task T027 in manual-validation/align-header-balance-cards/contract-compliance.md

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 1 and Phase 2.
2. Implement Phase 3 (US1) fully.
3. Execute US1 manual validation and record evidence.
4. Confirm no overlap/hierarchy regressions across breakpoints before expanding scope.

### Incremental Delivery

1. Deliver US1 (header hierarchy and responsive behavior).
2. Deliver US2 (balance card alignment equivalence).
3. Deliver US3 (functional parity checks).
4. Finish polish and manual-validation sign-off.

### Parallel Team Strategy

1. Developer A: header composition and breakpoint behavior in components/dashboard/dashboard-page-client.tsx.
2. Developer B: net and historical card alignment updates in components/dashboard/net-balance-card.tsx and components/dashboard/historical-total-balance-card.tsx.
3. Developer C: manual validation evidence and regression artifacts.

---

## Notes

- [P] tasks indicate file-level independence and safe parallelization.
- [US#] labels map each story task to spec priorities.
- Every task includes a concrete file path.
- Manual validation artifacts are mandatory by constitution.
