# Tasks: Dashboard Forecast e UX de Recorrencia (Tooltip ao Lado do Select)

**Input**: Design documents from `/specs/019-dashboard-forecast-recurrence-ux/`  
**Prerequisites**: plan.md (required), spec.md (required for user stories), research.md, data-model.md, contracts/, quickstart.md

**Validation**: Automated test tasks are PROHIBITED by constitution. Manual validation evidence is REQUIRED.

**Scope for this task list**: keep the tooltip for each recurrence select (`Tipo de recorrencia` and `Modo da recorrencia`) positioned to the right of the select, with compact spacing and preserved visual symmetry.

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Align manual-validation artifacts and documentation to the tooltip-right-of-select layout.

- [x] T001 Update the tooltip layout objective to mention the right-aligned tooltip behavior in manual-validation/dashboard-forecast-recurrence-ux/validation-runbook.md
- [x] T002 [P] Update the tooltip alignment checklist for tooltip-right-of-select layout in manual-validation/dashboard-forecast-recurrence-ux/recurrence-tooltips.md
- [x] T003 [P] Update the desktop/mobile regression checklist to cover tooltip-right-of-select layout in manual-validation/dashboard-forecast-recurrence-ux/regression-desktop-mobile.md

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Prepare shared UI primitives and label/tooltip composition before changing the form layout.

**CRITICAL**: No user story work starts before this phase is complete.

- [x] T004 Establish or refine the reusable select + tooltip wrapper in components/transactions/transaction-form.tsx
- [x] T005 [P] Confirm compact trigger variant support in components/ui/simple-tooltip.tsx
- [x] T006 [P] Keep recurrence tooltip copy stable in lib/ui/recurrence-tooltip-content.ts

**Checkpoint**: Shared layout primitives are ready for the inline `<p>` + tooltip change.

---

## Phase 3: User Story 1 - Keep the tooltip adjacent to the select (Priority: P1) 🎯 MVP

**Goal**: Place the recurrence tooltip to the right of each select, preserving symmetry and avoiding awkward spacing.

**Independent Validation**: Open the recurrence form and confirm both `Tipo de recorrencia` and `Modo da recorrencia` keep the tooltip trigger to the right of the select across desktop and mobile.

### Manual Validation for User Story 1 (REQUIRED) ✅

- [x] T007 [P] [US1] Add the tooltip-right-of-select validation steps to manual-validation/dashboard-forecast-recurrence-ux/recurrence-tooltips.md
- [ ] T008 [US1] Execute manual validation for tooltip alignment to the right of each select in manual-validation/dashboard-forecast-recurrence-ux/recurrence-tooltips.md
- [ ] T009 [US1] Execute manual validation for preserved data when opening and closing tooltips in manual-validation/dashboard-forecast-recurrence-ux/recurrence-tooltips.md

### Implementation for User Story 1

- [x] T010 [US1] Rework the `Tipo de recorrencia` field layout so the tooltip stays to the right of the select in components/transactions/transaction-form.tsx
- [x] T011 [US1] Rework the `Modo da recorrencia` field layout so the tooltip stays to the right of the select in components/transactions/transaction-form.tsx
- [x] T012 [US1] Apply the compact tooltip trigger size needed for tight right-side alignment in components/ui/simple-tooltip.tsx
- [x] T013 [US1] Reduce the visible width of the recurrence selects responsively to preserve spacing and symmetry in components/transactions/transaction-form.tsx
- [x] T014 [US1] Preserve keyboard, click/tap, outside-click, and ESC behavior while keeping the tooltip adjacent in components/ui/simple-tooltip.tsx

**Checkpoint**: The recurrence form keeps tooltips adjacent to the selects and remains usable on desktop/mobile.

---

## Phase 4: Polish & Cross-Cutting Concerns

**Purpose**: Final documentation alignment and regression coverage for the layout refinement.

- [x] T015 [P] Update the quickstart validation steps to reference tooltip-right-of-select layout in specs/019-dashboard-forecast-recurrence-ux/quickstart.md
- [x] T016 [P] Update signoff notes to reflect the tooltip-right-of-select scope in manual-validation/dashboard-forecast-recurrence-ux/quickstart-signoff.md
- [ ] T017 Execute a final desktop/mobile regression pass for tooltip alignment in manual-validation/dashboard-forecast-recurrence-ux/regression-desktop-mobile.md

---

## Dependencies & Execution Order

### Phase Dependencies

- Setup (Phase 1): no dependencies.
- Foundational (Phase 2): depends on Setup and blocks the user story work.
- User Story 1 (Phase 3): depends on Foundational completion.
- Polish (Phase 4): depends on User Story 1 completion.

### User Story Dependencies

- US1: can start after Foundational and is independently validatable.

### Within Each User Story

- Manual validation checklist first.
- Implementation tasks next.
- Manual evidence execution before checkpoint closure.

### Parallel Opportunities

- Setup tasks T002-T003 can run in parallel.
- Foundational tasks T005-T006 can run in parallel.
- Polish tasks T015-T016 can run in parallel.

---

## Parallel Example: User Story 1

```bash
Task: T010 [US1] Rework the `Tipo de recorrencia` field layout so the tooltip stays to the right of the select in components/transactions/transaction-form.tsx
Task: T011 [US1] Rework the `Modo da recorrencia` field layout so the tooltip stays to the right of the select in components/transactions/transaction-form.tsx
```

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 1 and Phase 2.
2. Complete Phase 3.
3. Execute the manual validation evidence for tooltip-right-of-select alignment.
4. Pause for review if needed.

### Incremental Delivery

1. Deliver the tooltip-right-of-select layout change.
2. Validate the layout on desktop and mobile.
3. Update quickstart and signoff notes.
4. Run a final regression pass.

### Parallel Team Strategy

1. One developer updates `Tipo de recorrencia` layout.
2. Another developer updates `Modo da recorrencia` layout.
3. A third developer updates manual-validation and signoff notes.

---

## Notes

- All tasks follow checklist format with exact file paths.
- [P] marks low-coupling tasks suitable for parallel work.
- No automated tests are included by constitution.
- This tasks list is intentionally scoped to the current tooltip-right-of-select refinement.
