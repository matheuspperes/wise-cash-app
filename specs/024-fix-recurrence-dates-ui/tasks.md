# Tasks: Corrigir Datas de Recorrencia e Ajustes de UI

**Input**: Design documents from `/specs/024-fix-recurrence-dates-ui/`
**Prerequisites**: plan.md (required), spec.md (required), research.md, data-model.md, contracts/, quickstart.md

**Validation**: Automated test tasks are PROHIBITED by constitution. Manual validation tasks are required for each user story.

**Organization**: Tasks are grouped by user story to enable independent implementation and validation of each story.

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Preparar area de validacao manual e baseline da feature.

- [x] T001 Create manual validation root in manual-validation/fix-recurrence-dates-ui/README.md
- [x] T002 [P] Create consolidated signoff template in manual-validation/fix-recurrence-dates-ui/quickstart-signoff.md

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Consolidar regras civis de data e padrao de destaque do mes atual.

**⚠️ CRITICAL**: No user story work should start before these tasks complete.

- [x] T003 Audit recurrence date handling for timezone serialization risks in lib/services/recurrence-service.ts
- [x] T004 Implement civil-date helpers and replace timezone-sensitive date creation in lib/services/recurrence-service.ts
- [x] T005 [P] Add reusable highlight utility styles for current month containers in app/globals.css
- [x] T006 [P] Document civil-date consistency notes in specs/024-fix-recurrence-dates-ui/research.md (if new inconsistencies are found)

**Checkpoint**: Foundation complete. User stories can proceed.

---

## Phase 3: User Story 1 - Datas de recorrencia sem desvio (Priority: P1) 🎯 MVP

**Goal**: Garantir data civil `YYYY-MM-DD` sem deslocamento em criacao/edicao e vencimentos.

**Independent Validation**: Criar/editar recorrencias com dias 17 e 31 e validar persistencia e vencimento.

### Manual Validation for User Story 1 (REQUIRED) ✅

- [x] T007 [P] [US1] Document manual checklist for civil-date persistence in manual-validation/fix-recurrence-dates-ui/us1-civil-date.md

### Implementation for User Story 1

- [x] T008 [US1] Replace resolveDueDate/getLastDayOfMonth usage with civil-date resolution in lib/services/recurrence-service.ts
- [x] T009 [US1] Ensure all recurrence persistence paths use civil-date strings in lib/services/recurrence-service.ts
- [x] T010 [US1] Verify monthRef calculations align to civil-date logic in lib/services/recurrence-service.ts
- [ ] T011 [US1] Execute US1 manual scenarios and record results in manual-validation/fix-recurrence-dates-ui/us1-civil-date.md

**Checkpoint**: User Story 1 is functional and manually validated.

---

## Phase 4: User Story 2 - Mes atual destacado no historico (Priority: P2)

**Goal**: Destacar o container do grupo do mes atual no historico completo.

**Independent Validation**: Abrir historico completo e confirmar destaque no mes atual.

### Manual Validation for User Story 2 (REQUIRED) ✅

- [x] T012 [P] [US2] Document manual checklist for current-month highlight in manual-validation/fix-recurrence-dates-ui/us2-current-month-highlight.md

### Implementation for User Story 2

- [x] T013 [US2] Add current month detection for monthly groups in components/transactions/monthly-expense-history-accordion.tsx
- [x] T014 [US2] Apply highlight styles to current-month group container in components/transactions/monthly-expense-history-accordion.tsx
- [ ] T015 [US2] Execute US2 manual scenarios and record results in manual-validation/fix-recurrence-dates-ui/us2-current-month-highlight.md

**Checkpoint**: User Story 2 is functional and manually validated.

---

## Phase 5: User Story 3 - Ordem dos botoes da dashboard (Priority: P2)

# Tasks: Corrigir Datas Civis de Recorrencias

**Input**: Design documents from `/specs/024-fix-recurrence-dates-ui/`
**Prerequisites**: plan.md (required), spec.md (required), research.md, data-model.md, quickstart.md

**Validation**: Automated test tasks are prohibited by constitution. Manual validation tasks are required for the user story.

**Organization**: Tasks are grouped by user story so the feature can be implemented and validated as one independent increment.

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Prepare the feature documentation and manual validation workspace for the civil-date fix.

- [ ] T001 Create the manual validation workspace for civil-date scenarios in manual-validation/fix-recurrence-dates-ui/README.md
- [ ] T002 [P] Create the consolidated signoff checklist in manual-validation/fix-recurrence-dates-ui/quickstart-signoff.md

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Establish the shared civil-date helpers and migration path that every affected transaction and recurrence flow will rely on.

**⚠️ CRITICAL**: No user story work should start before these tasks are complete.

- [ ] T003 Audit civil-date parsing and serialization risks in lib/formatting/ptbr.ts, lib/services/recurrence-service.ts, components/transactions/transaction-form.tsx, lib/services/local-dashboard-summary.ts, and lib/services/dashboard-series-window.ts
- [ ] T004 [P] Add or refine a local civil-date helper strategy in lib/formatting/ptbr.ts to format `YYYY-MM-DD` strings without `new Date(date)` parsing for civil inputs
- [ ] T005 [P] Add or refine a local-date default helper for new transaction dates in components/transactions/transaction-form.tsx so the default comes from the device local calendar date instead of UTC slicing
- [ ] T006 [P] Define the canonical civil-date migration approach for existing shifted records in lib/services/recurrence-service.ts and lib/repositories/transaction-repository.ts
- [ ] T007 Update manual validation notes in specs/024-fix-recurrence-dates-ui/research.md and specs/024-fix-recurrence-dates-ui/quickstart.md to reflect the civil-date migration scope

**Checkpoint**: Foundation complete. The user story can now be implemented safely.

---

## Phase 3: User Story 1 - Datas civis sem deslocamento (Priority: P1) 🎯 MVP

**Goal**: Preserve the chosen civil date end to end for transactions and recurrence generation, including migration of existing shifted data.

**Independent Validation**: Create a transaction for 01/05/2026, create an unlimited recurrence on day 3, and confirm that reloads, summaries, history labels, and recurring due dates all keep the same civil day across timezones.

### Manual Validation for User Story 1 (REQUIRED) ✅

- [ ] T008 [P] [US1] Document the manual civil-date validation checklist in manual-validation/fix-recurrence-dates-ui/us1-civil-date.md

### Implementation for User Story 1

- [ ] T009 [P] [US1] Replace string-to-Date formatting fallbacks in lib/formatting/ptbr.ts so civil `YYYY-MM-DD` values are formatted without timezone drift
- [ ] T010 [P] [US1] Replace the UTC-derived default transaction date in components/transactions/transaction-form.tsx with a local civil date default
- [ ] T011 [US1] Refactor recurrence date resolution in lib/services/recurrence-service.ts so `toMonthRef`, `parseLocalDateLike`, `normalizeRecurrenceCivilDate`, `resolveDueDate`, `getStartMonthRef`, and `getNextScheduledDate` preserve canonical civil strings
- [ ] T012 [P] [US1] Update dashboard summary and history month derivation in lib/services/local-dashboard-summary.ts and lib/services/dashboard-series-window.ts to avoid implicit UTC parsing of civil strings
- [ ] T013 [US1] Add a migration or repair path for existing shifted records in lib/services/recurrence-service.ts and lib/repositories/transaction-repository.ts so persisted civil dates are rewritten to canonical `YYYY-MM-DD`
- [ ] T014 [US1] Ensure transaction and recurrence displays in components/transactions/monthly-expense-history-accordion.tsx, components/recurrences/recurrences-list.tsx, and related consumers continue to render the same civil date selected by the user
- [ ] T015 [US1] Execute the manual civil-date scenarios and record results in manual-validation/fix-recurrence-dates-ui/us1-civil-date.md

**Checkpoint**: User Story 1 is functionally complete and manually validated.

---

## Phase 4: Polish & Cross-Cutting Concerns

**Purpose**: Close out documentation and signoff evidence for the civil-date fix.

- [ ] T016 [P] Consolidate the manual validation evidence in manual-validation/fix-recurrence-dates-ui/quickstart-signoff.md
- [ ] T017 Update specs/024-fix-recurrence-dates-ui/quickstart.md with any final validation notes or caveats discovered during implementation
- [ ] T018 Review lib/formatting/ptbr.ts and lib/services/recurrence-service.ts for any remaining civil-date parsing paths and document the final state in manual-validation/fix-recurrence-dates-ui/quickstart-signoff.md

---

## Dependencies & Execution Order

### Phase Dependencies

- **Phase 1 (Setup)**: Starts immediately.
- **Phase 2 (Foundational)**: Depends on Phase 1 and blocks the user story.
- **Phase 3 (US1)**: Depends on Phase 2.
- **Phase 4 (Polish)**: Depends on completion of the user story and manual validation.

### User Story Dependencies

- **US1 (P1)**: Independent after the foundational civil-date helpers and migration plan are in place.

### Within Each User Story

- Manual validation checklist first.
- Civil-date parsing and default-date fixes next.
- Recurrence math and summary/history consumers after that.
- Migration and repair path before manual validation evidence is finalized.

---

## Parallel Opportunities

- **Setup**: T002 can run in parallel with T001.
- **Foundational**: T004, T005, and T006 can run in parallel after T003.
- **US1**: T008 can run in parallel with T009, T010, T012, and T014 once the foundation is complete.
- **Polish**: T016 can run in parallel with T017.

---

## Parallel Example: User Story 1

```bash
Task: "T008 [US1] Document the manual civil-date validation checklist in manual-validation/fix-recurrence-dates-ui/us1-civil-date.md"
Task: "T009 [US1] Replace string-to-Date formatting fallbacks in lib/formatting/ptbr.ts so civil YYYY-MM-DD values are formatted without timezone drift"
Task: "T010 [US1] Replace the UTC-derived default transaction date in components/transactions/transaction-form.tsx with a local civil date default"
Task: "T012 [US1] Update dashboard summary and history month derivation in lib/services/local-dashboard-summary.ts and lib/services/dashboard-series-window.ts to avoid implicit UTC parsing of civil strings"
```

---

## Implementation Strategy

### MVP First (US1)

1. Complete Phase 1 and Phase 2.
2. Deliver Phase 3 for the civil-date fix.
3. Validate manually with 01/05/2026, day 3, and month-end recurrence scenarios.
4. Write the signoff summary once the MVP is stable.

### Incremental Delivery

1. Setup + foundational civil-date helpers.
2. Fix display and default-date drift.
3. Fix recurrence math and migration of existing shifted records.
4. Validate all civil-date scenarios manually.
5. Close out with documentation and signoff.

### Parallel Team Strategy

1. One contributor can handle formatting and form-default changes while another handles recurrence-service and migration work.
2. A third contributor can prepare the manual validation documentation in parallel.
3. Merge into signoff once the civil-date paths are consistent end to end.

---

## Notes

- All tasks follow the required checklist format: `- [ ] T### [P?] [US?] Description with file path`.
- `[P]` marks tasks that can run in parallel because they touch different files and have no direct dependency.
- No automated test tasks are included.
