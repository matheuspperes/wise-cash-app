# Tasks: Refino de Dashboard e Historico

**Input**: Design documents from `/specs/006-refine-dashboard-history/`
**Prerequisites**: plan.md (required), spec.md (required for user stories), research.md, data-model.md, contracts/, quickstart.md

**Validation**: Automated test tasks are PROHIBITED by constitution. Include manual validation tasks for each user story.

**Organization**: Tasks are grouped by user story to enable independent implementation and validation of each story.

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Inicializar trilhas de validacao manual e baseline de comparacao antes da implementacao.

- [X] T001 Criar baseline visual e escopo de telas da feature em manual-validation/refine-dashboard-history/setup-baseline.md
- [X] T002 Criar checklist de regressao geral da feature em manual-validation/refine-dashboard-history/regression-checklist.md
- [X] T003 [P] Definir protocolo de medicao para SC-001, SC-009 e SC-010 em manual-validation/refine-dashboard-history/sc-metrics-protocol.md

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Preparar fundamentos compartilhados que bloqueiam a execucao segura de todas as historias.

**⚠️ CRITICAL**: No user story work can begin until this phase is complete.

- [X] T004 Definir tokens e guardrails de escala global de 20% na base visual em app/globals.css
- [X] T005 [P] Padronizar textos base do dashboard para superfices novas e estados em lib/i18n/ui-text.ts
- [X] T006 [P] Criar tipos compartilhados para card historico e tabela mensal em lib/ui/dashboard-history-types.ts
- [X] T007 [P] Criar servico de agregacao de saldo historico do periodo em lib/services/dashboard-history-mapper.ts
- [X] T008 [P] Criar servico de filtro de gastos do mes atual com ordenacao desc em lib/services/current-month-expenses.ts
- [X] T009 Integrar novos campos de historico no endpoint de resumo da dashboard em app/api/dashboard/summary/route.ts

**Checkpoint**: Foundation ready - user story implementation can now begin.

---

## Phase 3: User Story 1 - Escala Global e Hierarquia Visual (Priority: P1) 🎯 MVP

**Goal**: Aplicar aumento proporcional de 20% no escopo impactado da aplicacao preservando legibilidade e estabilidade de layout.

**Independent Validation**: Comparar baseline versus estado final em desktop/mobile e confirmar aumento de 20% sem overflow horizontal ou sobreposicao dos blocos principais.

### Manual Validation for User Story 1 (REQUIRED) ✅

- [X] T010 [P] [US1] Documentar checklist manual de escala global em manual-validation/refine-dashboard-history/us1-checklist.md
- [X] T011 [US1] Executar validacao manual de escala e registrar evidencias em manual-validation/refine-dashboard-history/us1-scale-consistency.md

### Implementation for User Story 1

- [X] T012 [US1] Aplicar escala proporcional no layout principal e espacamentos da dashboard em components/dashboard/dashboard-page-client.tsx
- [X] T013 [P] [US1] Aplicar escala proporcional em cabecalho e controles de navegacao em components/dashboard/dashboard-header.tsx
- [X] T014 [P] [US1] Aplicar escala proporcional no card principal de saldo em components/dashboard/net-balance-card.tsx
- [X] T015 [P] [US1] Aplicar escala proporcional no bloco de feedback/loading da dashboard em components/dashboard/dashboard-feedback.tsx
- [X] T016 [P] [US1] Aplicar escala proporcional na tela de transacoes (container e secoes) em app/transactions/page.tsx
- [X] T017 [P] [US1] Aplicar escala proporcional no formulario de transacoes em components/transactions/transaction-form.tsx
- [X] T018 [P] [US1] Aplicar escala proporcional em filtros e busca de transacoes em components/transactions/transaction-filters.tsx
- [X] T019 [US1] Ajustar responsividade e prevenir overflow horizontal no fluxo dashboard/transacoes em components/dashboard/dashboard-page-client.tsx

**Checkpoint**: User Story 1 funcional e validada manualmente de forma independente.

---

## Phase 4: User Story 2 - Leitura do Grafico e Navegacao Simplificada (Priority: P2)

**Goal**: Melhorar leitura do grafico com espacamento e eixo Y dinamico, deslocar labels de meses para baixo e simplificar nav mantendo apenas Transacoes.

**Independent Validation**: Confirmar espacamento entre titulo e legenda, eixo Y com max+10% e 5 ticks, labels de mes deslocados para baixo e ausencia do botao Dashboard no nav.

### Manual Validation for User Story 2 (REQUIRED) ✅

- [X] T020 [P] [US2] Documentar checklist manual de grafico e navegacao em manual-validation/refine-dashboard-history/us2-checklist.md
- [X] T021 [US2] Executar validacao manual de grafico/nav e registrar evidencias em manual-validation/refine-dashboard-history/us2-chart-nav.md

### Implementation for User Story 2

- [X] T022 [US2] Remover acao de Dashboard e manter apenas Transacoes no nav em components/dashboard/dashboard-header.tsx
- [X] T023 [US2] Ajustar espacamento entre titulo Historico mensal e legenda do grafico em components/dashboard/area-history-chart.tsx
- [X] T024 [US2] Implementar escala dinamica do eixo Y com teto maximo+10% e 5 ticks em components/dashboard/area-history-chart.tsx
- [X] T025 [US2] Deslocar levemente para baixo os indicadores de meses no eixo X em components/dashboard/area-history-chart.tsx
- [X] T026 [P] [US2] Tratar edge case de serie zerada e serie com unico ponto no calculo do eixo em components/dashboard/area-history-chart.tsx
- [X] T027 [P] [US2] Atualizar serie de demo para preservar comportamento do eixo dinamico em lib/services/chart-demo-series.ts
- [X] T028 [US2] Garantir passagem consistente de dados do grafico para renderizacao final em components/dashboard/dashboard-page-client.tsx

**Checkpoint**: User Story 2 funcional e validada manualmente de forma independente.

---

## Phase 5: User Story 3 - Resumo Historico e Tabela de Gastos do Mes Atual (Priority: P3)

**Goal**: Exibir card secundario de saldo historico (receitas-despesas) e tabela de gastos do mes atual abaixo do grafico com estado vazio claro.

**Independent Validation**: Confirmar card secundario com hierarquia visual menor (~20%) e tabela com colunas Data, Descricao, Categoria e Valor ordenada por data decrescente.

### Manual Validation for User Story 3 (REQUIRED) ✅

- [X] T029 [P] [US3] Documentar checklist manual de card historico e tabela mensal em manual-validation/refine-dashboard-history/us3-checklist.md
- [X] T030 [US3] Executar validacao manual de resumo historico/tabela e registrar evidencias em manual-validation/refine-dashboard-history/us3-history-summary-table.md

### Implementation for User Story 3

- [X] T031 [US3] Criar componente do card secundario de saldo historico em components/dashboard/historical-total-balance-card.tsx
- [X] T032 [US3] Posicionar card secundario proximo ao card principal com tamanho aproximado 20% menor em components/dashboard/dashboard-page-client.tsx
- [X] T033 [US3] Criar componente de tabela de gastos do mes atual em components/dashboard/current-month-expenses-table.tsx
- [X] T034 [US3] Renderizar tabela abaixo do grafico com estado vazio claro em components/dashboard/dashboard-page-client.tsx
- [X] T035 [US3] Implementar filtro de despesas do mes atual e ordenacao por data desc em lib/services/current-month-expenses.ts
- [X] T036 [US3] Expor saldo historico liquido e lista de gastos do mes atual no resumo em app/api/dashboard/summary/route.ts
- [X] T037 [P] [US3] Aplicar formatacao de data e valor monetario nas linhas da tabela em lib/formatting/ptbr.ts
- [X] T038 [US3] Integrar consulta/reducao de dados para tabela e saldo historico em lib/repositories/monthly-summary-repository.ts

**Checkpoint**: User Story 3 funcional e validada manualmente de forma independente.

---

## Phase 6: Polish & Cross-Cutting Concerns

**Purpose**: Consolidar evidencias finais, validar quickstart e confirmar conformidade cruzada entre historias.

- [X] T039 [P] Consolidar resultado de validacao da US1 em manual-validation/refine-dashboard-history/us1-results.md
- [X] T040 [P] Consolidar resultado de validacao da US2 em manual-validation/refine-dashboard-history/us2-results.md
- [X] T041 [P] Consolidar resultado de validacao da US3 em manual-validation/refine-dashboard-history/us3-results.md
- [X] T042 Consolidar regressao cruzada e riscos residuais em manual-validation/refine-dashboard-history/regression-summary.md
- [X] T043 Executar walkthrough do quickstart e registrar signoff em manual-validation/refine-dashboard-history/quickstart-signoff.md
- [X] T044 Atualizar matriz de conformidade de contrato da feature em manual-validation/refine-dashboard-history/contract-compliance.md

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies - can start immediately.
- **Foundational (Phase 2)**: Depends on Setup completion - BLOCKS all user stories.
- **User Stories (Phase 3+)**: Depend on Foundational completion; then proceed in priority order (P1 -> P2 -> P3).
- **Polish (Phase 6)**: Depends on completion of all user stories.

### User Story Dependencies

- **US1 (P1)**: Starts immediately after Phase 2 and defines baseline visual consistency.
- **US2 (P2)**: Starts after US1 baseline to tune chart/nav readability over scaled UI.
- **US3 (P3)**: Starts after Phase 2 and should follow US2 to ensure final chart/table composition is stable.

### Within Each User Story

- Manual validation checklist before final validation evidence.
- Shared data contracts and services before UI integration.
- Core implementation before cross-story polish.
- Automated tests MUST NOT be added; manual validation artifacts are required.

### Story Completion Order (Suggested)

- US1 (escala global) -> US2 (grafico e nav) -> US3 (saldo historico e tabela)

---

## Parallel Opportunities

- Phase 1: T003 can run in parallel with T001-T002.
- Phase 2: T005, T006, T007 and T008 can run in parallel after T004.
- Phase 3 (US1): T013, T014, T015, T016, T017 and T018 can run in parallel after T012.
- Phase 4 (US2): T026 and T027 can run in parallel after T024.
- Phase 5 (US3): T033 and T035 can run in parallel after T031.
- Phase 6: T039, T040 and T041 can run in parallel.

---

## Parallel Example: User Story 1

```bash
# After baseline scaling in T012:
Task: T013 [US1] components/dashboard/dashboard-header.tsx
Task: T014 [US1] components/dashboard/net-balance-card.tsx
Task: T016 [US1] app/transactions/page.tsx
```

## Parallel Example: User Story 2

```bash
# After dynamic axis baseline in T024:
Task: T026 [US2] components/dashboard/area-history-chart.tsx
Task: T027 [US2] lib/services/chart-demo-series.ts
```

## Parallel Example: User Story 3

```bash
# After creating historical card in T031:
Task: T033 [US3] components/dashboard/current-month-expenses-table.tsx
Task: T035 [US3] lib/services/current-month-expenses.ts
```

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 1: Setup.
2. Complete Phase 2: Foundational.
3. Complete Phase 3: User Story 1.
4. Validate US1 manually and register evidence.
5. Stop for MVP review before expanding scope.

### Incremental Delivery

1. Foundation ready (Phase 1 + Phase 2).
2. Deliver US1 (global scale) and validate manually.
3. Deliver US2 (chart readability + nav simplification) and validate manually.
4. Deliver US3 (historical card + current-month expense table) and validate manually.
5. Execute Polish phase and close with contract/regression signoff.

### Notes

- Every task follows required checklist format with checkbox, Task ID, optional [P], story label when applicable, and exact file path.
- [P] tasks are constrained to non-conflicting files or independent documentation artifacts.
- Automated test tasks are intentionally excluded to comply with project constitution.
