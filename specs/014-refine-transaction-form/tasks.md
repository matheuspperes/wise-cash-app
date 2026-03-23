# Tasks: Refine Transaction Form Inputs and Dashboard CTA Harmony

**Input**: Design documents from /specs/014-refine-transaction-form/
**Prerequisites**: plan.md (required), spec.md (required for user stories), research.md, data-model.md, contracts/, quickstart.md

**Validation**: Automated test tasks are PROHIBITED by constitution. Manual validation tasks are required for each user story.

**Organization**: Tasks are grouped by user story to enable independent implementation and independent validation.

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Prepare baseline and evidence structure for manual validation.

- [X] T001 Create manual validation folder and baseline file in manual-validation/refine-transaction-form/setup-baseline.md
- [X] T002 Capture pre-change behavior notes for transaction form and dashboard CTAs in manual-validation/refine-transaction-form/setup-baseline.md
- [X] T003 [P] Create quickstart signoff scaffold in manual-validation/refine-transaction-form/quickstart-signoff.md

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Establish shared data and helper foundations that all stories depend on.

**CRITICAL**: No user story work should start before this phase is complete.

- [X] T004 Create grouped preset category catalog (alphabetical by type) in lib/ui/transaction-category-presets.ts
- [X] T005 [P] Create BRL continuous-cents mask helper in lib/formatting/brl-currency-mask.ts
- [X] T006 [P] Create duplicate-category normalization helper (trim + case-insensitive) in lib/ui/category-normalization.ts
- [X] T007 Register regression checklist template in manual-validation/refine-transaction-form/regression-checklist.md

**Checkpoint**: Foundation ready - user story implementation can begin.

---

## Phase 3: User Story 1 - Escolher Tipo de Lancamento Rapidamente (Priority: P1) MVP

**Goal**: Replace the transaction type select with a Segmented Control for Despesa/Receita with exclusive selection and smooth selected-state transitions.

**Independent Validation**: Open new transaction screen, toggle both options repeatedly, and confirm only one active state at a time and correct type persistence on submit.

### Manual Validation for User Story 1 (REQUIRED)

- [X] T008 [P] [US1] Draft segmented-control validation checklist in manual-validation/refine-transaction-form/us1-type-segmented-control.md

### Implementation for User Story 1

- [X] T009 [US1] Implement Segmented Control UI for type selection in components/transactions/transaction-form.tsx
- [X] T010 [US1] Apply selected-state visual tokens and smooth color/text transitions in components/transactions/transaction-form.tsx
- [X] T011 [US1] Bind Segmented Control exclusive selection to form payload type field in components/transactions/transaction-form.tsx
- [X] T012 [US1] Execute US1 manual scenarios and log evidence in manual-validation/refine-transaction-form/us1-type-segmented-control.md

**Checkpoint**: US1 is independently functional and validated.

---

## Phase 4: User Story 2 - Selecionar Categoria Padrao ou Criar Nova (Priority: P1)

**Goal**: Replace free-text category with grouped preset select and create-new flow with persistence, auto-selection, and duplicate blocking.

**Independent Validation**: Validate grouped alphabetical presets by type, create-new persistence and selection, and normalized duplicate blocking.

### Manual Validation for User Story 2 (REQUIRED)

- [X] T013 [P] [US2] Draft category flow validation checklist in manual-validation/refine-transaction-form/us2-category-select-and-create.md

### Implementation for User Story 2

- [X] T014 [US2] Replace category free input with grouped select in components/transactions/transaction-form.tsx
- [X] T015 [US2] Wire grouped preset options by transaction type from lib/ui/transaction-category-presets.ts in components/transactions/transaction-form.tsx
- [X] T016 [US2] Add create-new category option and input path with empty-name blocking and clear guidance in components/transactions/transaction-form.tsx
- [X] T017 [US2] Persist newly created category and auto-select in current transaction in components/transactions/transaction-form.tsx
- [X] T018 [US2] Enforce normalized duplicate-category blocking using lib/ui/category-normalization.ts in components/transactions/transaction-form.tsx
- [X] T019 [US2] Execute US2 manual scenarios and log evidence in manual-validation/refine-transaction-form/us2-category-select-and-create.md

**Checkpoint**: US2 is independently functional and validated.

---

## Phase 5: User Story 3 - Digitar Valor com Mascara Monetaria BRL (Priority: P1)

**Goal**: Apply BRL mask with continuous-cents behavior and keep consistency between displayed and persisted values.

**Independent Validation**: Validate typing sequences, deletion/edit behavior, and submit consistency (example 1234 -> R$ 12,34).

### Manual Validation for User Story 3 (REQUIRED)

- [X] T020 [P] [US3] Draft BRL mask validation checklist in manual-validation/refine-transaction-form/us3-brl-mask.md

### Implementation for User Story 3

- [X] T021 [US3] Integrate BRL continuous-cents mask helper from lib/formatting/brl-currency-mask.ts into value field in components/transactions/transaction-form.tsx
- [X] T022 [US3] Ensure stable editing/deletion behavior for masked value input and block submit on empty value state in components/transactions/transaction-form.tsx
- [X] T023 [US3] Map masked display value to correct persisted numeric amount in components/transactions/transaction-form.tsx
- [X] T024 [US3] Execute US3 manual scenarios (including 30-digit typing and 20 toggle alternations) and log evidence of no input loss and no visual update delay greater than 1 second in manual-validation/refine-transaction-form/us3-brl-mask.md

**Checkpoint**: US3 is independently functional and validated.

---

## Phase 6: User Story 4 - Harmonizar Acoes da Dashboard (Priority: P2)

**Goal**: Align Transacoes and Nova Transacao button padding across breakpoints and apply fixed secondary variant in same visual family for Transacoes.

**Independent Validation**: Validate equal horizontal/vertical padding in mobile, tablet, desktop and visual hierarchy preservation.

### Manual Validation for User Story 4 (REQUIRED)

- [X] T025 [P] [US4] Draft dashboard CTA harmony checklist in manual-validation/refine-transaction-form/us4-dashboard-cta-harmony.md

### Implementation for User Story 4

- [X] T026 [US4] Standardize equal horizontal and vertical padding for dashboard CTAs in components/dashboard/dashboard-page-client.tsx
- [X] T027 [US4] Apply fixed secondary variant in same visual family to Transacoes button in components/dashboard/dashboard-page-client.tsx
- [X] T028 [US4] Verify CTA hierarchy remains clear while styles are harmonized in components/dashboard/dashboard-page-client.tsx
- [X] T029 [US4] Execute US4 manual scenarios and log evidence in manual-validation/refine-transaction-form/us4-dashboard-cta-harmony.md

**Checkpoint**: US4 is independently functional and validated.

---

## Phase 7: Polish and Cross-Cutting Concerns

**Purpose**: Final consistency, regression evidence, and readiness checks.

- [X] T030 [P] Consolidate regression checks and outcomes in manual-validation/refine-transaction-form/regression-summary.md
- [X] T031 Run lint verification and append result in manual-validation/refine-transaction-form/quickstart-signoff.md
- [X] T032 [P] Align quickstart notes with implemented behavior in specs/014-refine-transaction-form/quickstart.md
- [X] T033 Finalize signoff with contract coverage in manual-validation/refine-transaction-form/quickstart-signoff.md

---

## Dependencies and Execution Order

### Phase Dependencies

- Setup (Phase 1): no dependencies.
- Foundational (Phase 2): depends on Setup; blocks all user stories.
- User Stories (Phase 3-6): depend on Foundational completion.
- Polish (Phase 7): depends on completion of selected user stories.

### User Story Dependencies

- US1 (P1): can start after Foundational; no dependency on other stories.
- US2 (P1): can start after Foundational; depends on preset/normalization helpers from Phase 2.
- US3 (P1): can start after Foundational; depends on BRL mask helper from Phase 2.
- US4 (P2): can start after Foundational; independent from form behavior but shares dashboard file.

### Within Each User Story

- Manual validation checklist task first.
- Implementation tasks next.
- Manual validation execution and evidence logging before story checkpoint.

### Parallel Opportunities

- T003 can run in parallel with T001-T002.
- T005 can run in parallel with T004 and T006; T006 runs after T004 completes.
- US1 and US4 implementation can proceed in parallel (different files).
- US2 and US3 can proceed in parallel after Phase 2 (same form file, but can be split by logical ownership and merged carefully).
- T030 and T032 can run in parallel in Polish phase.

---

## Parallel Example: User Story 1

```bash
Task: "T008 [US1] Draft segmented-control validation checklist in manual-validation/refine-transaction-form/us1-type-segmented-control.md"
Task: "T009 [US1] Implement Segmented Control UI for type selection in components/transactions/transaction-form.tsx"
```

## Parallel Example: User Story 2

```bash
Task: "T013 [US2] Draft category flow validation checklist in manual-validation/refine-transaction-form/us2-category-select-and-create.md"
Task: "T015 [US2] Wire grouped preset options by transaction type from lib/ui/transaction-category-presets.ts in components/transactions/transaction-form.tsx"
```

## Parallel Example: User Story 3

```bash
Task: "T020 [US3] Draft BRL mask validation checklist in manual-validation/refine-transaction-form/us3-brl-mask.md"
Task: "T021 [US3] Integrate BRL continuous-cents mask helper from lib/formatting/brl-currency-mask.ts into value field in components/transactions/transaction-form.tsx"
```

## Parallel Example: User Story 4

```bash
Task: "T025 [US4] Draft dashboard CTA harmony checklist in manual-validation/refine-transaction-form/us4-dashboard-cta-harmony.md"
Task: "T026 [US4] Standardize equal horizontal and vertical padding for dashboard CTAs in components/dashboard/dashboard-page-client.tsx"
```

---

## Implementation Strategy

### MVP First (P1 Stories)

1. Complete Phase 1 and Phase 2.
2. Deliver US1 (type segmented control) and validate.
3. Deliver US2 (category grouped select/create-new) and validate.
4. Deliver US3 (BRL mask) and validate.
5. Stop for MVP review before US4.

### Incremental Delivery

1. Foundation first (setup + shared helpers).
2. Ship US1 -> validate.
3. Ship US2 -> validate.
4. Ship US3 -> validate.
5. Ship US4 -> validate.
6. Execute polish and final signoff.

### Parallel Team Strategy

1. Developer A: US1 and US4.
2. Developer B: US2.
3. Developer C: US3.
4. Pair for final integration in transaction-form.tsx and regression evidence.

---

## Notes

- P-marked tasks indicate parallelizable work with low coupling.
- All user stories include manual validation tasks by constitution.
- Automated test tasks are intentionally excluded.
- Task descriptions include explicit file paths for direct execution.
