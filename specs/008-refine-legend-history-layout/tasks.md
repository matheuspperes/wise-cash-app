# Tasks: Refinar Legenda, Saldo Historico e Tabela Mensal

**Input**: Design documents from `/specs/008-refine-legend-history-layout/`
**Prerequisites**: plan.md (required), spec.md (required for user stories), research.md, data-model.md, contracts/, quickstart.md

**Validation**: Automated test tasks are PROHIBITED by constitution. Include manual validation tasks for each user story.

**Organization**: Tasks are grouped by user story to enable independent implementation and validation of each story.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (US1, US2, US3)
- Include exact file paths in descriptions

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Initialize feature evidence and baseline manual validation artifacts.

- [X] T001 Create feature validation folder scaffold in manual-validation/refine-legend-history-layout/
- [X] T002 Create baseline checklist for pre-change captures in manual-validation/refine-legend-history-layout/setup-baseline.md
- [X] T003 [P] Create quickstart signoff template in manual-validation/refine-legend-history-layout/quickstart-signoff.md

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Shared data/view contracts needed before user-story UI changes.

**⚠️ CRITICAL**: No user story implementation starts before this phase is complete.

- [X] T004 Extend monthly row type to represent full current-month transactions in lib/ui/dashboard-history-types.ts
- [X] T005 [P] Implement service function to list only active current-month transactions in lib/services/current-month-expenses.ts
- [X] T006 [P] Add mapper/helper updates for monthly transaction row shape in lib/services/dashboard-history-mapper.ts
- [X] T007 Wire current-month transactions dataset in dashboard summary repository flow in lib/repositories/monthly-summary-repository.ts
- [X] T008 Expose currentMonthTransactions payload in dashboard summary API response in app/api/dashboard/summary/route.ts

**Checkpoint**: Foundation ready. User story work can begin.

---

## Phase 3: User Story 1 - Leitura Clara do Grafico (Priority: P1) 🎯 MVP

**Goal**: Reposicionar a legenda para acima do grafico, alinhada a direita e fora da area de plotagem sem obstrucao de dados.

**Independent Validation**: Abrir dashboard em desktop/mobile e confirmar legenda acima do grafico, alinhada a direita, fora do plot area e sem sobrepor linhas/pontos.

### Manual Validation for User Story 1 (REQUIRED) ✅

- [X] T009 [P] [US1] Document US1 checklist in manual-validation/refine-legend-history-layout/us1-checklist.md
- [X] T010 [US1] Execute US1 scenarios and capture evidence in manual-validation/refine-legend-history-layout/us1-legend-layout.md (depends on T011-T013)

### Implementation for User Story 1

- [X] T011 [P] [US1] Refactor legend container positioning to top-outside-right in components/dashboard/area-history-chart.tsx
- [X] T012 [US1] Adjust chart margins/padding to keep legend outside plot area in components/dashboard/area-history-chart.tsx
- [X] T013 [US1] Ensure responsive legend behavior remains consistent in components/dashboard/area-history-chart.tsx

**Checkpoint**: User Story 1 is independently functional and manually validated.

---

## Phase 4: User Story 2 - Hierarquia do Saldo Historico (Priority: P2)

**Goal**: Reduzir destaque do card historico (desktop ~70%) mantendo posicionamento no lado direito e largura total em mobile empilhado.

**Independent Validation**: Verificar layout da dashboard em desktop/mobile confirmando regra de largura e posição do card histórico sem regressões visuais.

### Manual Validation for User Story 2 (REQUIRED) ✅

- [X] T014 [P] [US2] Document US2 checklist in manual-validation/refine-legend-history-layout/us2-checklist.md
- [X] T015 [US2] Execute US2 scenarios and capture evidence in manual-validation/refine-legend-history-layout/us2-historical-card.md (depends on T016-T018)

### Implementation for User Story 2

- [X] T016 [P] [US2] Update card layout grid sizing and right-side placement in components/dashboard/dashboard-page-client.tsx
- [X] T017 [P] [US2] Adjust historical card width behavior for desktop/mobile breakpoints in components/dashboard/historical-total-balance-card.tsx
- [X] T018 [US2] Align spacing and visual hierarchy between net and historical cards in components/dashboard/dashboard-page-client.tsx

**Checkpoint**: User Story 2 is independently functional and manually validated.

---

## Phase 5: User Story 3 - Tabela do Mes Atual com Transacoes (Priority: P3)

**Goal**: Adaptar tabela para transações ativas do mês atual com colunas Data, Descricao, Categoria, Tipo e Valor em ordem decrescente.

**Independent Validation**: Confirmar que a tabela mensal mostra receitas e despesas ativas do mês atual, colunas definidas, ordenação correta e estado vazio claro.

### Manual Validation for User Story 3 (REQUIRED) ✅

- [X] T019 [P] [US3] Document US3 checklist in manual-validation/refine-legend-history-layout/us3-checklist.md
- [X] T020 [US3] Execute US3 scenarios and capture evidence in manual-validation/refine-legend-history-layout/us3-current-month-transactions.md (depends on T021-T026)

### Implementation for User Story 3

- [X] T021 [P] [US3] Replace monthly table input contract from expenses-only to transactions in components/dashboard/current-month-expenses-table.tsx (legacy naming retained for compatibility)
- [X] T022 [P] [US3] Render required columns (Data, Descricao, Categoria, Tipo, Valor) in components/dashboard/current-month-expenses-table.tsx
- [X] T023 [US3] Apply descending date ordering display contract in components/dashboard/current-month-expenses-table.tsx
- [X] T024 [US3] Integrate currentMonthTransactions payload consumption in components/dashboard/dashboard-page-client.tsx
- [X] T025 [US3] Update monthly empty-state copy for transactions scope in lib/i18n/ui-text.ts
- [X] T026 [US3] Ensure API-to-table mapping only includes active transactions in app/api/dashboard/summary/route.ts

**Checkpoint**: User Story 3 is independently functional and manually validated.

---

## Phase 6: Polish & Cross-Cutting Concerns

**Purpose**: Final evidence consolidation, contract audit, and quickstart signoff.

- [X] T027 [P] Create contract compliance checklist in manual-validation/refine-legend-history-layout/contract-compliance.md
- [X] T028 [P] Create regression checklist in manual-validation/refine-legend-history-layout/regression-checklist.md
- [X] T029 Consolidate regression results in manual-validation/refine-legend-history-layout/regression-summary.md
- [X] T030 Run quickstart validation and signoff in manual-validation/refine-legend-history-layout/quickstart-signoff.md
- [X] T031 Execute combined SC-005 visual consistency matrix (legend + historical card + monthly table in desktop/mobile) in manual-validation/refine-legend-history-layout/sc005-visual-consistency-matrix.md

---

## Dependencies & Execution Order

### Phase Dependencies

- **Phase 1 (Setup)**: No dependencies.
- **Phase 2 (Foundational)**: Depends on Phase 1 and blocks all user stories.
- **Phase 3 (US1)**: Depends on Phase 2.
- **Phase 4 (US2)**: Depends on Phase 2.
- **Phase 5 (US3)**: Depends on Phase 2.
- **Phase 6 (Polish)**: Depends on completion of all targeted user stories.

### User Story Dependencies

- **US1 (P1)**: Independent after Foundational.
- **US2 (P2)**: Independent after Foundational.
- **US3 (P3)**: Independent after Foundational, but consumes foundational payload and typing updates.

### Within Each User Story

- Manual checklist drafting can run in parallel with early implementation.
- Core data/view updates before final validation logging.
- Story must pass independent validation before polish phase.

### Parallel Opportunities

- **Setup**: T003 can run after T001.
- **Foundational**: T005 and T006 can run in parallel after T004.
- **US1**: T011 and T009 can run in parallel; T012/T013 follow.
- **US2**: T016 and T017 can run in parallel; T018 follows.
- **US3**: T021 and T022 can run in parallel; T023-T026 follow integration order.
- **Polish**: T027, T028 and T031 can run in parallel before T029/T030.

---

## Parallel Example: User Story 1

```bash
# Parallelizable tasks after US1 starts:
Task: "T011 [US1] Refactor legend container positioning in components/dashboard/area-history-chart.tsx"
Task: "T009 [US1] Document US1 checklist in manual-validation/refine-legend-history-layout/us1-checklist.md"
```

## Parallel Example: User Story 2

```bash
# Parallelizable tasks after US2 starts:
Task: "T016 [US2] Update card layout grid sizing in components/dashboard/dashboard-page-client.tsx"
Task: "T017 [US2] Adjust historical card width behavior in components/dashboard/historical-total-balance-card.tsx"
Task: "T014 [US2] Document US2 checklist in manual-validation/refine-legend-history-layout/us2-checklist.md"
```

## Parallel Example: User Story 3

```bash
# Parallelizable tasks after US3 starts:
Task: "T021 [US3] Replace monthly table input contract in components/dashboard/current-month-expenses-table.tsx"
Task: "T022 [US3] Render required columns in components/dashboard/current-month-expenses-table.tsx"
Task: "T019 [US3] Document US3 checklist in manual-validation/refine-legend-history-layout/us3-checklist.md"
```

---

## Implementation Strategy

### MVP First (US1 Only)

1. Complete Phase 1 and Phase 2.
2. Deliver Phase 3 (US1) and validate manually.
3. Pause for visual review before proceeding.

### Incremental Delivery

1. Setup + Foundational.
2. US1 (legend repositioning) -> manual validation.
3. US2 (historical card hierarchy) -> manual validation.
4. US3 (current-month transactions table) -> manual validation.
5. Polish and signoff.

### Parallel Team Strategy

1. Team finaliza Setup + Foundational.
2. Em seguida:
   - Dev A: US1
   - Dev B: US2
   - Dev C: US3
3. Consolidacao conjunta no Polish.

---

## Notes

- [P] tasks use separate files and no unresolved dependencies.
- Every task contains explicit paths for immediate execution.
- Manual validation is mandatory and replaces automated tests in this project.
- Stories are independently implementable and validatable.
- Legacy file/component naming that includes "expenses" is acceptable when behavior and outputs are aligned to "transactions" scope.
