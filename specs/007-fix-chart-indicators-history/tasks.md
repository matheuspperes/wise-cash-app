# Tasks: Ajuste de Grafico e Historico Completo

**Input**: Design documents from `/specs/007-fix-chart-indicators-history/`
**Prerequisites**: plan.md (required), spec.md (required for user stories), research.md, data-model.md, contracts/, quickstart.md

**Validation**: Automated test tasks are PROHIBITED by constitution. Include manual validation tasks for each user story.

**Organization**: Tasks are grouped by user story to enable independent implementation and validation of each story.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (US1, US2, US3)
- Include exact file paths in descriptions

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Create feature-specific validation scaffolding and execution baseline.

- [X] T001 Create feature validation directory and baseline files in manual-validation/fix-chart-indicators-history/
- [X] T002 Create baseline capture checklist in manual-validation/fix-chart-indicators-history/setup-baseline.md
- [X] T003 [P] Create quickstart signoff template in manual-validation/fix-chart-indicators-history/quickstart-signoff.md

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Shared contracts and data shaping required before user story implementation.

**⚠️ CRITICAL**: No user story work can begin until this phase is complete.

- [X] T004 Extend shared dashboard/history types for full monthly expense history in lib/ui/dashboard-history-types.ts
- [X] T005 [P] Implement dynamic chart axis profile helper (max+headroom and adaptive ticks) in lib/services/chart-axis-profile.ts
- [X] T006 [P] Extend dashboard summary mapper to include full expense history payload in lib/services/dashboard-history-mapper.ts
- [X] T007 Wire full expense history source data in repository/service layer in lib/repositories/monthly-summary-repository.ts
- [X] T008 Expose full expense history fields in dashboard summary API response in app/api/dashboard/summary/route.ts

**Checkpoint**: Foundation ready. User story work can start.

---

## Phase 3: User Story 1 - Legibilidade do Grafico Mensal (Priority: P1) 🎯 MVP

**Goal**: Corrigir colisao dos labels de mes, reduzir espacamento excessivo titulo-legenda e tornar eixo Y dinamico sem labels repetidos.

**Independent Validation**: Na dashboard, validar labels de mes visiveis sem colisao na borda, espacamento equilibrado entre titulo/legenda e ticks Y dinamicos sem repeticao redundante.

### Manual Validation for User Story 1 (REQUIRED) ✅

- [X] T009 [P] [US1] Document US1 manual checklist in manual-validation/fix-chart-indicators-history/us1-checklist.md
- [ ] T010 [US1] Execute US1 scenarios and log evidence in manual-validation/fix-chart-indicators-history/us1-chart-legibility.md

### Implementation for User Story 1

- [X] T011 [P] [US1] Adjust X-axis tick margin and chart bottom spacing to avoid month-label collision in components/dashboard/area-history-chart.tsx
- [X] T012 [P] [US1] Rebalance title-to-legend spacing in dashboard history block in components/dashboard/dashboard-page-client.tsx
- [X] T013 [US1] Integrate dynamic axis profile helper into chart Y-axis domain and tick strategy in components/dashboard/area-history-chart.tsx
- [X] T014 [US1] Apply Y-axis label deduplication-safe formatter behavior for low-amplitude and single-point series in components/dashboard/area-history-chart.tsx

**Checkpoint**: User Story 1 is independently functional and manually validated.

---

## Phase 4: User Story 2 - Historico Completo de Gastos em Transacoes (Priority: P2)

**Goal**: Adicionar secao dedicada com historico completo de gastos por mes (acordeao fechado por padrao), mantendo a listagem atual de lancamentos.

**Independent Validation**: Em Transacoes, validar nova secao mensal com todos os meses, colunas corretas, ordenacao desc por data e estado vazio claro.

### Manual Validation for User Story 2 (REQUIRED) ✅

- [X] T015 [P] [US2] Document US2 manual checklist in manual-validation/fix-chart-indicators-history/us2-checklist.md
- [ ] T016 [US2] Execute US2 scenarios and log evidence in manual-validation/fix-chart-indicators-history/us2-full-history-table.md

### Implementation for User Story 2

- [X] T017 [P] [US2] Implement monthly grouping and descending date sort utility for full expense history in lib/services/monthly-expense-history.ts
- [X] T018 [P] [US2] Create monthly expense accordion table component (Data, Descricao, Categoria, Valor) in components/transactions/monthly-expense-history-accordion.tsx
- [X] T019 [US2] Integrate monthly history section while preserving existing transactions list in app/transactions/page.tsx
- [X] T020 [US2] Connect transactions page data flow to full expense history contract fields in app/transactions/page.tsx
- [X] T021 [US2] Implement explicit empty-state rendering for no-expense history in components/transactions/monthly-expense-history-accordion.tsx

**Checkpoint**: User Story 2 is independently functional and manually validated.

---

## Phase 5: User Story 3 - Consistencia de Leitura Entre Dashboard e Transacoes (Priority: P3)

**Goal**: Garantir consistencia visual e semantica entre resumo (dashboard) e detalhe (Transacoes).

**Independent Validation**: Alternar dashboard -> Transacoes e confirmar coerencia de colunas, formatacao de valores/datas, agrupamentos e comportamento visual.

### Manual Validation for User Story 3 (REQUIRED) ✅

- [X] T022 [P] [US3] Document US3 manual checklist in manual-validation/fix-chart-indicators-history/us3-checklist.md
- [ ] T023 [US3] Execute US3 scenarios and log evidence in manual-validation/fix-chart-indicators-history/us3-consistency.md

### Implementation for User Story 3

- [X] T024 [P] [US3] Align shared date/currency formatting rules for dashboard and transactions views in lib/formatting/ptbr.ts
- [X] T025 [P] [US3] Align dashboard current-month expense table labels/formatting with new monthly history conventions in components/dashboard/current-month-expenses-table.tsx
- [X] T026 [US3] Apply consistency conventions (labels, alignment, value presentation) in components/transactions/monthly-expense-history-accordion.tsx
- [X] T027 [US3] Verify dashboard-to-transactions entry path keeps consistent section framing in components/dashboard/dashboard-page-client.tsx

**Checkpoint**: User Story 3 is independently functional and manually validated.

---

## Phase 6: Polish & Cross-Cutting Concerns

**Purpose**: Consolidate manual evidence, regression checks, and feature signoff.

- [X] T028 [P] Create contract compliance report for FR-to-contract mapping in manual-validation/fix-chart-indicators-history/contract-compliance.md
- [X] T029 [P] Create feature regression checklist in manual-validation/fix-chart-indicators-history/regression-checklist.md
- [ ] T030 Consolidate final regression summary in manual-validation/fix-chart-indicators-history/regression-summary.md
- [ ] T031 Run quickstart validation end-to-end and record approval in manual-validation/fix-chart-indicators-history/quickstart-signoff.md
- [ ] T032 Measure and document manual performance validation (<=200ms for up to 24 months and 500 rows) in manual-validation/fix-chart-indicators-history/sc-metrics-protocol.md

---

## Dependencies & Execution Order

### Phase Dependencies

- **Phase 1 (Setup)**: No dependencies.
- **Phase 2 (Foundational)**: Depends on Phase 1 and blocks all user stories.
- **Phase 3 (US1)**: Depends on Phase 2.
- **Phase 4 (US2)**: Depends on Phase 2 (can proceed independently from US1 once foundation is done).
- **Phase 5 (US3)**: Depends on Phase 2 and on US1+US2 implementations for final consistency sweep.
- **Phase 6 (Polish)**: Depends on all targeted user stories being complete.

### User Story Dependencies

- **US1 (P1)**: Independent after Foundational.
- **US2 (P2)**: Independent after Foundational.
- **US3 (P3)**: Consistency layer that requires US1 and US2 surfaces in place.

### Within Each User Story

- Manual validation checklist can start in parallel with early implementation.
- Data/model helpers before UI integration.
- UI integration before manual evidence logging.
- Story checkpoint must pass before moving to polish.

### Parallel Opportunities

- **Setup**: T003 can run with T002 after T001 folder scaffold.
- **Foundational**: T005 and T006 can run in parallel after T004.
- **US1**: T011 and T012 can run in parallel; T013/T014 follow chart integration order.
- **US2**: T017 and T018 can run in parallel; T019/T020/T021 follow integration order.
- **US3**: T024 and T025 can run in parallel; T026/T027 follow.
- **Polish**: T028, T029 and T032 can run in parallel before T030/T031.

---

## Parallel Example: User Story 1

```bash
# Parallelizable tasks after US1 starts:
Task: "T011 [US1] Adjust X-axis tick margin and chart bottom spacing in components/dashboard/area-history-chart.tsx"
Task: "T012 [US1] Rebalance title-to-legend spacing in components/dashboard/dashboard-page-client.tsx"
Task: "T009 [US1] Document US1 manual checklist in manual-validation/fix-chart-indicators-history/us1-checklist.md"
```

## Parallel Example: User Story 2

```bash
# Parallelizable tasks after US2 starts:
Task: "T017 [US2] Implement monthly grouping utility in lib/services/monthly-expense-history.ts"
Task: "T018 [US2] Create accordion table component in components/transactions/monthly-expense-history-accordion.tsx"
Task: "T015 [US2] Document US2 manual checklist in manual-validation/fix-chart-indicators-history/us2-checklist.md"
```

## Parallel Example: User Story 3

```bash
# Parallelizable tasks after US3 starts:
Task: "T024 [US3] Align shared date/currency formatting in lib/formatting/ptbr.ts"
Task: "T025 [US3] Align dashboard table conventions in components/dashboard/current-month-expenses-table.tsx"
Task: "T022 [US3] Document US3 manual checklist in manual-validation/fix-chart-indicators-history/us3-checklist.md"
```

---

## Implementation Strategy

### MVP First (US1 Only)

1. Complete Phase 1 and Phase 2.
2. Deliver Phase 3 (US1) and validate manually.
3. Stop for MVP review before expanding to transactions history.

### Incremental Delivery

1. Setup + Foundational.
2. US1 (chart legibility) -> manual validation evidence.
3. US2 (full monthly transactions history) -> manual validation evidence.
4. US3 (cross-surface consistency) -> manual validation evidence.
5. Polish phase for regression and signoff.

### Team Parallel Strategy

1. One developer completes Phase 1 + Phase 2 baseline.
2. Then split:
   - Developer A: US1 chart work.
   - Developer B: US2 transactions monthly section.
   - Developer C: manual validation artifacts and later US3 consistency sweep.
3. Merge for final polish and signoff.

---

## Notes

- [P] tasks target distinct files and no unresolved dependency.
- Each task includes explicit file path(s) to be immediately executable.
- Manual validation is mandatory and replaces automated tests for this project.
- Each user story has independent validation criteria and evidence artifacts.
