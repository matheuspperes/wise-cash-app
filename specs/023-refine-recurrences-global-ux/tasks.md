# Tasks: Refinar UX de Recorrencias e Header Global

**Input**: Design documents from `/specs/023-refine-recurrences-global-ux/`
**Prerequisites**: plan.md (required), spec.md (required), research.md, data-model.md, contracts/, quickstart.md

**Validation**: Automated test tasks are PROHIBITED by constitution. Manual validation tasks are required for each user story.

**Organization**: Tasks are grouped by user story so each story can be implemented and validated independently.

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Preparar area de validacao manual e baseline de execucao da feature.

- [X] T001 Create manual validation root for feature evidence in manual-validation/refine-recurrences-global-ux/README.md
- [X] T002 [P] Create consolidated signoff template in manual-validation/refine-recurrences-global-ux/quickstart-signoff.md

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Definir regras compartilhadas para filtro temporal, cabecalho global e padroes de layout/a11y.

**⚠️ CRITICAL**: No user story work should start before these tasks complete.

- [X] T003 Define shared local month-year comparator helper in lib/services/recurrence-service.ts
- [X] T004 [P] Define civil-date normalization helper (`YYYY-MM-DD`) for recurrence persistence in lib/services/recurrence-service.ts
- [X] T005 [P] Add/align reusable recurrence form layout utility classes in app/globals.css
- [X] T006 Wire shared UI-route header action boundaries in components/transactions/transactions-page-client.tsx and components/dashboard/dashboard-page-client.tsx, excluding technical routes from the global header scope

**Checkpoint**: Foundation complete. User stories can proceed.

---

## Phase 3: User Story 1 - Pendencias corretas na tela de Recorrencias (Priority: P1) 🎯 MVP

**Goal**: Exibir pendencias apenas em Recorrencias e somente do mes/ano atual local, sem bloco vazio.

**Independent Validation**: Com pendencias em meses distintos, abrir Recorrencias e confirmar filtro por mes/ano atual; sem itens elegiveis, bloco nao aparece.

### Manual Validation for User Story 1 (REQUIRED) ✅

- [X] T007 [P] [US1] Document manual checklist for pending-block placement, current-month filtering, and confirm/cancel parity in manual-validation/refine-recurrences-global-ux/us1-pending-block.md

### Implementation for User Story 1

- [X] T008 [US1] Implement local month/year pending eligibility filter in lib/services/recurrence-service.ts
- [X] T009 [US1] Apply filtered pending list shaping at gateway boundary in lib/services/local-transactions-gateway.ts
- [X] T010 [US1] Remove pending block rendering from non-recurrence surfaces in components/transactions/transactions-page-client.tsx
- [X] T011 [US1] Render pending block only in Recorrencias page container in components/recurrences/recurrences-page.tsx
- [X] T012 [US1] Guard pending block render to avoid empty-space layout artifacts in components/recurrences/recurrences-page.tsx
- [ ] T013 [US1] Execute US1 manual scenarios, including confirm/cancel parity, and record results in manual-validation/refine-recurrences-global-ux/us1-pending-block.md

**Checkpoint**: User Story 1 is functional and manually validated.

---

## Phase 4: User Story 2 - Navegacao consistente com botoes no cabecalho (Priority: P1)

**Goal**: Garantir botoes globais no cabecalho em telas de UI, `Voltar ao Dashboard` apenas fora da dashboard, e remover botoes finais redundantes.

**Independent Validation**: Navegar por dashboard/transactions/recurrences/new e confirmar cabecalho consistente e ausencia de botoes de rodape.

### Manual Validation for User Story 2 (REQUIRED) ✅

- [X] T014 [P] [US2] Document manual checklist for global header, footer-button removal, and technical-route exclusion in manual-validation/refine-recurrences-global-ux/us2-header-navigation.md

### Implementation for User Story 2

- [X] T015 [US2] Standardize global header actions on dashboard UI route in components/dashboard/dashboard-page-client.tsx
- [X] T016 [US2] Standardize global header actions on transactions UI route in components/transactions/transactions-page-client.tsx
- [X] T017 [US2] Ensure `Voltar ao Dashboard` visibility rule by route context in components/dashboard/dashboard-page-client.tsx and components/transactions/transactions-page-client.tsx
- [X] T018 [US2] Remove redundant bottom-of-page navigation buttons in components/transactions/transactions-page-client.tsx
- [X] T019 [US2] Ensure recurrence page receives header-driven navigation only in components/recurrences/recurrences-page.tsx
- [ ] T020 [US2] Execute US2 manual scenarios, including technical-route exclusion, and record results in manual-validation/refine-recurrences-global-ux/us2-header-navigation.md

**Checkpoint**: User Story 2 is functional and manually validated.

---

## Phase 5: User Story 4 - Registro de data sem deslocamento de dia (Priority: P1)

**Goal**: Persistir e recuperar datas de recorrencia sem deslocamento de dia por timezone (ex.: 17 -> 17).

**Independent Validation**: Criar/editar recorrencia com dia 17 e validar persistencia civil-date sem -1 em timezone local nao UTC.

### Manual Validation for User Story 4 (REQUIRED) ✅

- [X] T021 [P] [US4] Document manual checklist for recurrence date persistence integrity in manual-validation/refine-recurrences-global-ux/us4-date-integrity.md

### Implementation for User Story 4

- [X] T022 [US4] Audit recurrence date construction/serialization call chain in lib/services/recurrence-service.ts
- [X] T023 [US4] Replace UTC-prone date serialization with civil-date normalization in lib/services/recurrence-service.ts
- [X] T024 [US4] Ensure create/edit gateway paths preserve civil-date semantics in lib/services/local-transactions-gateway.ts
- [X] T025 [US4] Align recurrence form submit payload date handling with civil-date contract in components/transactions/transaction-form.tsx
- [ ] T026 [US4] Execute US4 manual scenarios (day 17 -> 17) and capture evidence in manual-validation/refine-recurrences-global-ux/us4-date-integrity.md

**Checkpoint**: User Story 4 is functional and manually validated.

---

## Phase 6: User Story 3 - Formulario de recorrencia alinhado e acessivel (Priority: P2)

**Goal**: Remover `p-1` do grid Despesa/Receita e manter tooltips de recorrencia inline-right com a11y correta.

**Independent Validation**: Conferir alinhamento visual do grid e associacoes `id`/`aria-describedby` dos campos com tooltip.

### Manual Validation for User Story 3 (REQUIRED) ✅

- [X] T027 [P] [US3] Document manual checklist for form alignment and recurrence tooltip accessibility in manual-validation/refine-recurrences-global-ux/us3-form-tooltips.md

### Implementation for User Story 3

- [X] T028 [US3] Remove `p-1` from Despesa/Receita grid container and align spacing tokens in components/transactions/transaction-form.tsx
- [X] T029 [US3] Reposition recurrence type tooltip immediately right of select within same container in components/transactions/transaction-form.tsx
- [X] T030 [US3] Reposition recurrence mode tooltip immediately right of select within same container in components/transactions/transaction-form.tsx
- [X] T031 [US3] Preserve and verify tooltip id + `aria-describedby` binding integrity in components/transactions/transaction-form.tsx and components/recurrences/recurrences-list.tsx
- [ ] T032 [US3] Execute US3 manual scenarios and record results in manual-validation/refine-recurrences-global-ux/us3-form-tooltips.md

**Checkpoint**: User Story 3 is functional and manually validated.

---

## Phase 7: Polish & Cross-Cutting Concerns

**Purpose**: Consolidar evidencias finais e fechar roteiro de validacao da feature.

- [X] T033 [P] Consolidate story-level evidence and acceptance summary in manual-validation/refine-recurrences-global-ux/quickstart-signoff.md
- [X] T034 Update quickstart execution notes with observed outcomes in specs/023-refine-recurrences-global-ux/quickstart.md
- [ ] T035 Run full quickstart manual sweep and register final pass/fail notes in manual-validation/refine-recurrences-global-ux/quickstart-signoff.md

---

## Dependencies & Execution Order

### Phase Dependencies

- **Phase 1 (Setup)**: Starts immediately.
- **Phase 2 (Foundational)**: Depends on Phase 1 and blocks all user stories.
- **Phase 3 (US1)**: Depends on Phase 2.
- **Phase 4 (US2)**: Depends on Phase 2.
- **Phase 5 (US4)**: Depends on Phase 2.
- **Phase 6 (US3)**: Depends on Phase 2 and should run after US4 if tooltip/date payload coupling is found.
- **Phase 7 (Polish)**: Depends on completion of selected user stories and manual validations.

### User Story Dependencies

- **US1 (P1)**: Independent after foundation.
- **US2 (P1)**: Independent after foundation.
- **US4 (P1)**: Independent after foundation, but should be completed before final signoff due to data-integrity criticality.
- **US3 (P2)**: Independent after foundation; may proceed in parallel with US2.

### Within Each User Story

- Manual checklist task first.
- Core implementation tasks next.
- Manual execution/evidence task last.

---

## Parallel Opportunities

- **Setup**: T002 can run in parallel with T001.
- **Foundational**: T004 and T005 can run in parallel after T003 starts.
- **US1**: T007 can run in parallel with T008/T009.
- **US2**: T014 can run in parallel with T015/T016.
- **US4**: T021 can run in parallel with T022.
- **US3**: T027 can run in parallel with T028/T029/T030.
- **Polish**: T033 can run in parallel with T034.

---

## Parallel Example: User Story 1

```bash
Task: "T007 [US1] Document manual checklist for pending-block placement and current-month filtering in manual-validation/refine-recurrences-global-ux/us1-pending-block.md"
Task: "T008 [US1] Implement local month/year pending eligibility filter in lib/services/recurrence-service.ts"
Task: "T009 [US1] Apply filtered pending list shaping at gateway boundary in lib/services/local-transactions-gateway.ts"
```

## Parallel Example: User Story 2

```bash
Task: "T014 [US2] Document manual checklist for global header and footer-button removal in manual-validation/refine-recurrences-global-ux/us2-header-navigation.md"
Task: "T015 [US2] Standardize global header actions on dashboard UI route in components/dashboard/dashboard-page-client.tsx"
Task: "T016 [US2] Standardize global header actions on transactions UI route in components/transactions/transactions-page-client.tsx"
```

## Parallel Example: User Story 4

```bash
Task: "T021 [US4] Document manual checklist for recurrence date persistence integrity in manual-validation/refine-recurrences-global-ux/us4-date-integrity.md"
Task: "T022 [US4] Audit recurrence date construction/serialization call chain in lib/services/recurrence-service.ts"
Task: "T023 [US4] Replace UTC-prone date serialization with civil-date normalization in lib/services/recurrence-service.ts"
```

---

## Implementation Strategy

### MVP First (US1)

1. Complete Phase 1 and Phase 2.
2. Deliver Phase 3 (US1) and validate manually.
3. Proceed to remaining P1 stories (US2 and US4).

### Incremental Delivery

1. Setup + Foundational.
2. Deliver US1 (pending block and filter).
3. Deliver US2 (header standardization and footer-button cleanup).
4. Deliver US4 (date integrity fix).
5. Deliver US3 (layout/tooltip refinement).
6. Execute polish signoff tasks.

### Parallel Team Strategy

1. One developer finaliza foundation (Phase 2).
2. Depois dividir:
   - Dev A: US1
   - Dev B: US2
   - Dev C: US4
3. Executar US3 em paralelo quando dependencias de formulario estiverem estaveis.
4. Convergir na Phase 7 para signoff final.

---

## Notes

- All tasks follow required checklist format: `- [ ] T### [P?] [US?] Description with file path`.
- `[P]` marks low-coupling tasks with potential parallel execution.
- No automated test tasks included (constitution).
- Each user story has dedicated manual validation documentation and execution tasks.
