# Tasks: Refine Dashboard and Transactions Navigation Layout

**Input**: Design documents from `/specs/013-refine-dashboard-transactions-layout/`
**Prerequisites**: plan.md (required), spec.md (required for user stories), research.md, data-model.md, contracts/, quickstart.md

**Validation**: Automated test tasks are PROHIBITED by constitution. Manual validation tasks are included for each user story.

**Organization**: Tasks are grouped by user story to enable independent implementation and manual validation.

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Prepare baseline and evidence workspace for manual validation (cross-cutting support tasks).

- [x] T001 Create baseline evidence file in manual-validation/refine-dashboard-transactions-layout/setup-baseline.md
- [x] T002 Capture pre-change dashboard and transactions observations in manual-validation/refine-dashboard-transactions-layout/setup-baseline.md
- [x] T003 [P] Create feature signoff scaffold in manual-validation/refine-dashboard-transactions-layout/quickstart-signoff.md

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Establish shared validation guardrails and implementation boundaries before story work.

**⚠️ CRITICAL**: No user story work can begin until this phase is complete.

- [x] T004 Create shared regression checklist for filter and navigation invariants in manual-validation/refine-dashboard-transactions-layout/regression-checklist.md
- [x] T005 [P] Document card-gap measurement method (target 16px +/-4px) in manual-validation/refine-dashboard-transactions-layout/us2-balance-card-gap.md
- [x] T006 [P] Register contract compliance checkpoints in manual-validation/refine-dashboard-transactions-layout/regression-summary.md

**Checkpoint**: Foundation ready - user story implementation can now begin.

---

## Phase 3: User Story 1 - Reorganizar controles e composicao no dashboard (Priority: P1) 🎯 MVP

**Goal**: Posicionar seletor de periodo ao lado da legenda do grafico e ajustar composicao dos cards de saldo com metrica objetiva no desktop.

**Independent Validation**: Abrir dashboard em desktop/tablet/mobile e confirmar seletor na mesma linha da legenda sem sobreposicao, mais gap entre cards no desktop dentro de 12-20px.

### Manual Validation for User Story 1 (REQUIRED) ✅

- [x] T007 [P] [US1] Draft dashboard controls checklist in manual-validation/refine-dashboard-transactions-layout/us1-dashboard-controls.md (covers SC-001)

### Implementation for User Story 1

- [x] T009 [P] [US1] Move period selector into chart legend row composition in components/dashboard/area-history-chart.tsx
- [x] T010 [P] [US1] Remove obsolete period selector placement from header controls in components/dashboard/dashboard-page-client.tsx
- [x] T011 [US1] Apply responsive width rules to keep selector and legend on the same row in components/dashboard/area-history-chart.tsx
- [x] T012 [US1] Adjust dashboard cards grid spacing to target 16px (+/-4px) in components/dashboard/dashboard-page-client.tsx
- [x] T013 [US1] Tune left-card horizontal balance and alignment in components/dashboard/net-balance-card.tsx and components/dashboard/historical-total-balance-card.tsx
- [x] T014 [US1] Record desktop gap measurements and visual evidence in manual-validation/refine-dashboard-transactions-layout/us2-balance-card-gap.md (covers SC-002)
- [x] T008 [US1] Execute dashboard controls validation and log results in manual-validation/refine-dashboard-transactions-layout/us1-dashboard-controls.md (covers SC-001)

**Checkpoint**: User Story 1 is independently functional and manually validated.

---

## Phase 4: User Story 2 - Padronizar rotulos de CTA em portugues correto (Priority: P2)

**Goal**: Garantir copy consistente com acento correto para "Nova Transação" nas superficies afetadas.

**Independent Validation**: Verificar dashboard e transacoes sem ocorrencias da variante sem acento nas labels alteradas.

### Manual Validation for User Story 2 (REQUIRED) ✅

- [x] T015 [P] [US2] Draft label-normalization checklist in manual-validation/refine-dashboard-transactions-layout/us3-label-normalization.md (covers SC-003)

### Implementation for User Story 2

- [x] T017 [US2] Update create CTA copy to accented form in components/dashboard/dashboard-page-client.tsx
- [x] T018 [US2] Update affected create CTA copy to accented form in app/transactions/page.tsx
- [x] T019 [US2] Confirm no unaccented "Nova Transacao" remains in affected UI surfaces and record findings in manual-validation/refine-dashboard-transactions-layout/us3-label-normalization.md (covers SC-003)
- [x] T016 [US2] Execute label normalization validation and log results in manual-validation/refine-dashboard-transactions-layout/us3-label-normalization.md (covers SC-003)

**Checkpoint**: User Story 2 is independently functional and manually validated.

---

## Phase 5: User Story 3 - Reorganizar acoes na pagina de transacoes (Priority: P3)

**Goal**: Manter retorno simples no topo para `/`, remover duplicidade de criacao no topo e mover CTA "Nova Transação" para o fim da pagina.

**Independent Validation**: Em /transactions, validar botao de retorno ao lado do titulo, ausencia de CTA de criacao no topo e CTA de criacao no final com rota correta.

### Manual Validation for User Story 3 (REQUIRED) ✅

- [x] T020 [P] [US3] Draft transactions navigation checklist in manual-validation/refine-dashboard-transactions-layout/us4-transactions-navigation.md (covers SC-004)

### Implementation for User Story 3

- [x] T022 [US3] Add simple return-to-dashboard action next to page title with destination `/` in app/transactions/page.tsx
- [x] T023 [US3] Remove duplicate top "Nova Transação" CTA from transactions header area in app/transactions/page.tsx
- [x] T024 [US3] Add footer "Nova Transação" CTA at end of page with destination `/transactions?view=new` in app/transactions/page.tsx
- [x] T021 [US3] Execute transactions navigation validation (including exact label "Voltar ao Dashboard") and log results in manual-validation/refine-dashboard-transactions-layout/us4-transactions-navigation.md (covers SC-004)

**Checkpoint**: User Story 3 is independently functional and manually validated.

---

## Phase 6: User Story 4 - Preservar comportamento funcional com novo layout (Priority: P3)

**Goal**: Garantir ausencia de regressao funcional em filtro de periodo e destinos de navegacao apos os ajustes visuais.

**Independent Validation**: Executar checklist de regressao e confirmar que filtro e destinos continuam corretos.

### Manual Validation for User Story 4 (REQUIRED) ✅

- [x] T025 [P] [US4] Refine regression scenarios for filter and CTA destinations in manual-validation/refine-dashboard-transactions-layout/regression-checklist.md (covers SC-005)

### Implementation for User Story 4

- [x] T027 [US4] Verify period selector state updates and data refresh parity in components/dashboard/dashboard-page-client.tsx and log findings in manual-validation/refine-dashboard-transactions-layout/regression-summary.md
- [x] T028 [US4] Verify destination parity for return (`/`) and create (`/transactions?view=new`) actions in app/transactions/page.tsx and log findings in manual-validation/refine-dashboard-transactions-layout/regression-summary.md
- [x] T026 [US4] Execute regression checks and record outcomes in manual-validation/refine-dashboard-transactions-layout/regression-summary.md (covers SC-005)

**Checkpoint**: User Story 4 is independently validated with regression evidence.

---

## Phase 7: Polish & Cross-Cutting Concerns

**Purpose**: Final consistency pass, lint, and release-quality validation evidence (cross-cutting support tasks).

- [x] T029 [P] Align quickstart execution notes with final behavior in specs/013-refine-dashboard-transactions-layout/quickstart.md
- [x] T030 Run lint verification and append result summary to manual-validation/refine-dashboard-transactions-layout/quickstart-signoff.md
- [x] T031 [P] Finalize overall signoff and contract coverage summary in manual-validation/refine-dashboard-transactions-layout/quickstart-signoff.md

---

## Dependencies & Execution Order

### Phase Dependencies

- **Phase 1 (Setup)**: no dependencies.
- **Phase 2 (Foundational)**: depends on Phase 1 and blocks all user stories.
- **Phase 3-6 (User Stories)**: depend on Phase 2 completion.
- **Phase 7 (Polish)**: depends on completed user stories and regression evidence.

### User Story Dependencies

- **US1 (P1)**: starts after Foundational; no dependency on other user stories.
- **US2 (P2)**: starts after Foundational; can run in parallel with US1 where files do not conflict.
- **US3 (P3)**: starts after Foundational; mostly independent but touches shared transactions page.
- **US4 (P3)**: starts after US1 and US3 implementation because it validates post-change functional parity.

### Within Each User Story

- Manual validation checklist task first.
- Implementation tasks next.
- Validation execution and evidence logging before story checkpoint.

### Parallel Opportunities

- Setup tasks marked [P] can run in parallel.
- Foundational tasks marked [P] can run in parallel.
- In US1, T009 and T010 can run in parallel.
- US2 checklist drafting can run in parallel with late US1 evidence updates.
- In US3, T022 and T023 can run in parallel before T024.
- In US4, checklist refinement can run in parallel with polish preparation.

---

## Parallel Example: User Story 1

```bash
Task: "T009 [US1] Move period selector into chart legend row composition in components/dashboard/area-history-chart.tsx"
Task: "T010 [US1] Remove obsolete period selector placement from header controls in components/dashboard/dashboard-page-client.tsx"
```

## Parallel Example: User Story 2

```bash
Task: "T015 [US2] Draft label-normalization checklist in manual-validation/refine-dashboard-transactions-layout/us3-label-normalization.md"
Task: "T017 [US2] Update create CTA copy to accented form in components/dashboard/dashboard-page-client.tsx"
```

## Parallel Example: User Story 3

```bash
Task: "T022 [US3] Add simple return-to-dashboard action next to page title with destination `/` in app/transactions/page.tsx"
Task: "T023 [US3] Remove duplicate top \"Nova Transação\" CTA from transactions header area in app/transactions/page.tsx"
```

## Parallel Example: User Story 4

```bash
Task: "T025 [US4] Refine regression scenarios for filter and CTA destinations in manual-validation/refine-dashboard-transactions-layout/regression-checklist.md"
Task: "T029 Align quickstart execution notes with final behavior in specs/013-refine-dashboard-transactions-layout/quickstart.md"
```

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 1 (Setup).
2. Complete Phase 2 (Foundational).
3. Complete Phase 3 (US1).
4. Validate US1 manually and record evidence.
5. Demo/deploy MVP increment if desired.

### Incremental Delivery

1. Finish Setup + Foundational.
2. Deliver US1 and validate.
3. Deliver US2 and validate.
4. Deliver US3 and validate.
5. Deliver US4 regression validation.
6. Execute Polish phase and finalize signoff.

### Parallel Team Strategy

1. Team completes Setup + Foundational together.
2. After Foundational:
   - Developer A: US1 (dashboard composition and spacing)
   - Developer B: US2 (copy normalization)
   - Developer C: US3 (transactions action layout)
3. After US1/US3 complete, run US4 regression pass.

---

## Notes

- [P] tasks indicate different files or non-blocking evidence work.
- Every user story phase includes manual validation tasks as required by constitution.
- No automated test tasks are included.
- File paths are explicit so each task is directly executable.
