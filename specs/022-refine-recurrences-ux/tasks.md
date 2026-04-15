# Tasks: Refinar Experiencia de Recorrencias

**Input**: Design documents from `/specs/022-refine-recurrences-ux/`
**Prerequisites**: plan.md (required), spec.md (required), research.md, data-model.md, contracts/, quickstart.md

**Validation**: Automated test tasks are PROHIBITED by constitution. Manual validation tasks are required for each user story.

**Organization**: Tasks are grouped by user story so each story can be implemented and validated independently.

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Prepare shared validation workspace and implementation baseline for the refinement.

- [X] T001 Create manual validation workspace and baseline notes in manual-validation/refine-recurrences-ux/README.md
- [X] T002 [P] Create manual validation signoff template in manual-validation/refine-recurrences-ux/quickstart-signoff.md

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Establish shared contracts, visual tokens, and handler wiring required by all stories.

**⚠️ CRITICAL**: No user story work should start before these tasks complete.

- [X] T003 Define shared recurrence filtering helper and typed comparator entry point in lib/services/recurrence-service.ts
- [X] T004 [P] Add reusable editing highlight utility class for recurrence items in app/globals.css
- [X] T005 [P] Centralize/refine recurrence tooltip copy constants for reusable field descriptions in lib/ui/recurrence-tooltip-content.ts
- [X] T006 Wire shared recurrence/history action handler boundaries in components/transactions/transactions-page-client.tsx

**Checkpoint**: Foundation complete. User stories can proceed in priority order.

---

## Phase 3: User Story 1 - Operar recorrencias com consistencia visual (Priority: P1) 🎯 MVP

**Goal**: Make edit/delete behavior in Recorrencias match Historico exactly, including editing highlight, amount editing, and analytics parity.

**Independent Validation**: Edit and delete a recurrence from `/transactions?view=recurrences` and verify same controls, prompts, flow, and telemetry behavior as Historico.

### Manual Validation for User Story 1 (REQUIRED) ✅

- [X] T007 [P] [US1] Document US1 manual checklist and expected parity assertions in manual-validation/refine-recurrences-ux/us1-edit-delete-parity.md

### Implementation for User Story 1

- [X] T008 [US1] Repoint recurrence edit action to shared Historico edit flow in components/recurrences/recurrences-list.tsx
- [X] T009 [US1] Repoint recurrence delete action to shared Historico confirmation flow in components/recurrences/recurrences-list.tsx
- [X] T010 [US1] Enforce delete confirm/cancel analytics parity with Historico events in components/transactions/transactions-page-client.tsx
- [X] T011 [US1] Bind `isEditing` state and apply highlighted item styling in components/recurrences/recurrences-list.tsx
- [X] T012 [US1] Include amount field in recurrence edit form with existing validation parity in components/transactions/transaction-form.tsx
- [X] T013 [US1] Persist updated recurrence amount through local gateway/service edit pipeline in lib/services/local-transactions-gateway.ts
- [ ] T014 [US1] Execute US1 manual scenarios and record evidence in manual-validation/refine-recurrences-ux/us1-edit-delete-parity.md

**Checkpoint**: User Story 1 is fully functional and manually validated.

---

## Phase 4: User Story 2 - Visualizar somente pendencias relevantes do mes atual (Priority: P1)

**Goal**: Show only current month/year pending confirmations in local timezone and hide the pending block when there are no matching items.

**Independent Validation**: With mixed scheduled months, verify only current month/year items appear; with no current-month items, verify pending block is absent and no empty gap remains.

### Manual Validation for User Story 2 (REQUIRED) ✅

- [X] T015 [P] [US2] Document US2 manual checklist for month/year filtering and hidden-empty-state behavior in manual-validation/refine-recurrences-ux/us2-current-month-pendings.md

### Implementation for User Story 2

- [X] T016 [US2] Implement local-time month/year pending filter in recurrence projection logic in lib/services/recurrence-service.ts
- [X] T017 [US2] Apply current-month filtered pending list in transaction gateway response shaping in lib/services/local-transactions-gateway.ts
- [X] T018 [US2] Render pending confirmations section only when filtered items exist in components/recurrences/recurrences-page.tsx
- [X] T019 [US2] Remove empty pending container spacing side effects in components/recurrences/recurrences-list.tsx
- [ ] T020 [US2] Execute US2 manual scenarios and record evidence in manual-validation/refine-recurrences-ux/us2-current-month-pendings.md

**Checkpoint**: User Story 2 is fully functional and manually validated.

---

## Phase 5: User Story 3 - Ler e compreender campos com melhor acessibilidade e layout (Priority: P2)

**Goal**: Place recurrence tooltips inline-right with valid accessibility links, remove forbidden copy, and align new transaction grid spacing.

**Independent Validation**: Verify tooltip position and aria links, confirm prohibited phrases are absent, and confirm grid vertical alignment in new transaction form on desktop/mobile.

### Manual Validation for User Story 3 (REQUIRED) ✅

- [X] T021 [P] [US3] Document US3 manual checklist for tooltip accessibility, copy removal, and layout alignment in manual-validation/refine-recurrences-ux/us3-tooltips-copy-layout.md

### Implementation for User Story 3

- [X] T022 [US3] Reposition recurrence type/mode tooltip markup to inline-right field groups with stable ids in components/transactions/transaction-form.tsx
- [X] T023 [US3] Preserve `aria-describedby` and tooltip id bindings for recurrence controls in components/recurrences/recurrences-list.tsx
- [X] T024 [US3] Remove forbidden recurrence phrases and update centralized recurrence copy constants in lib/ui/recurrence-tooltip-content.ts
- [X] T025 [US3] Align new transaction grid height/padding with adjacent controls in components/transactions/transaction-form.tsx and app/globals.css
- [ ] T026 [US3] Execute US3 manual scenarios and record evidence in manual-validation/refine-recurrences-ux/us3-tooltips-copy-layout.md

**Checkpoint**: User Story 3 is fully functional and manually validated.

---

## Phase 6: Polish & Cross-Cutting Concerns

**Purpose**: Final consistency pass, cross-feature documentation sync, and end-to-end signoff.

- [X] T027 [P] Consolidate final manual validation evidence and acceptance summary in manual-validation/refine-recurrences-ux/quickstart-signoff.md
- [X] T028 Update refinement traceability notes for the originating feature in specs/020-add-recurrences-view/tasks.md
- [ ] T029 Run complete quickstart validation sweep and register final outcome in specs/022-refine-recurrences-ux/quickstart.md and manual-validation/refine-recurrences-ux/quickstart-signoff.md

---

## Dependencies & Execution Order

### Phase Dependencies

- **Phase 1 (Setup)**: Starts immediately.
- **Phase 2 (Foundational)**: Depends on Phase 1 and blocks all user stories.
- **Phase 3 (US1)**: Depends on Phase 2.
- **Phase 4 (US2)**: Depends on Phase 2.
- **Phase 5 (US3)**: Depends on Phase 2.
- **Phase 6 (Polish)**: Depends on completion of selected user stories and their manual validations.

### User Story Dependencies

- **US1 (P1)**: Independent after foundational phase; recommended MVP slice.
- **US2 (P1)**: Independent after foundational phase; can run in parallel with US1 if capacity allows.
- **US3 (P2)**: Independent after foundational phase; can run after or parallel to US1/US2 with low coupling.

### Within Each User Story

- Manual checklist task first.
- Core implementation tasks next.
- Manual execution/evidence task last.

---

## Parallel Opportunities

- **Setup**: T002 can run in parallel with T001.
- **Foundational**: T004 and T005 can run in parallel after T003 starts.
- **US1**: T007 can run in parallel with T008/T009; T011 can run in parallel with T012.
- **US2**: T015 can run in parallel with T016; T018 and T019 can run in sequence after T017.
- **US3**: T021 can run in parallel with T022; T024 can run in parallel with T025.
- **Polish**: T027 can start while T028 is in progress.

---

## Parallel Example: User Story 1

```bash
# Prepare validation artifacts while implementation begins:
Task: "T007 [US1] Document US1 manual checklist and expected parity assertions in manual-validation/refine-recurrences-ux/us1-edit-delete-parity.md"
Task: "T008 [US1] Repoint recurrence edit action to shared Historico edit flow in components/recurrences/recurrences-list.tsx"
Task: "T009 [US1] Repoint recurrence delete action to shared Historico confirmation flow in components/recurrences/recurrences-list.tsx"
```

## Parallel Example: User Story 2

```bash
Task: "T015 [US2] Document US2 manual checklist for month/year filtering and hidden-empty-state behavior in manual-validation/refine-recurrences-ux/us2-current-month-pendings.md"
Task: "T016 [US2] Implement local-time month/year pending filter in recurrence projection logic in lib/services/recurrence-service.ts"
```

## Parallel Example: User Story 3

```bash
Task: "T021 [US3] Document US3 manual checklist for tooltip accessibility, copy removal, and layout alignment in manual-validation/refine-recurrences-ux/us3-tooltips-copy-layout.md"
Task: "T022 [US3] Reposition recurrence type/mode tooltip markup to inline-right field groups with stable ids in components/transactions/transaction-form.tsx"
Task: "T025 [US3] Align new transaction grid height/padding with adjacent controls in components/transactions/transaction-form.tsx and app/globals.css"
```

---

## Implementation Strategy

### MVP First (US1)

1. Complete Phase 1 and Phase 2.
2. Deliver Phase 3 (US1) with manual validation evidence.
3. Pause for review/demo before expanding scope.

### Incremental Delivery

1. Foundation complete.
2. Deliver US1 (edit/delete parity + amount + highlight).
3. Deliver US2 (current-month pending filter + hidden empty block).
4. Deliver US3 (tooltips/copy/layout alignment).
5. Execute polish signoff tasks.

### Parallel Team Strategy

1. One developer finaliza Foundation (Phase 2).
2. Depois, dividir por historia:
   - Dev A: US1
   - Dev B: US2
   - Dev C: US3
3. Convergir em Phase 6 para signoff final.

---

## Notes

- All tasks follow the required checklist format: `- [ ] T### [P?] [US?] Description with file path`.
- `[P]` markers indicate file-level independence and low conflict likelihood.
- No automated test tasks are included, per constitution.
- Each user story includes dedicated manual validation documentation and execution tasks.
