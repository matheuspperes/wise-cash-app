# Tasks: Refino de Texto Escala e Meses

**Input**: Design documents from `/specs/005-refine-copy-scale-months/`
**Prerequisites**: plan.md (required), spec.md (required for user stories), research.md, data-model.md, contracts/, quickstart.md

**Validation**: Automated test tasks are PROHIBITED by constitution. Include manual validation tasks for each user story.

**Organization**: Tasks are grouped by user story to enable independent implementation and validation of each story.

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Inicializar trilhas de validacao manual e baseline de comparacao antes da implementacao.

- [X] T001 Criar baseline visual e escopo de telas em manual-validation/refine-copy-scale-months/setup-baseline.md
- [X] T002 Criar checklist de regressao da feature em manual-validation/refine-copy-scale-months/regression-checklist.md
- [X] T003 [P] Definir protocolo de medicao para SC-002 e SC-006 em manual-validation/refine-copy-scale-months/sc-metrics-protocol.md

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Preparar fundamentos compartilhados que bloqueiam a execucao segura de todas as historias.

**⚠️ CRITICAL**: No user story work can begin until this phase is complete.

- [X] T004 Consolidar termos canonicos de UI e mensagens de estado em lib/i18n/ui-text.ts
- [X] T005 Definir base de escala global (tipografia, espacamentos, containers e max-width) em app/globals.css
- [X] T006 Ajustar variante reutilizavel de botao circular para CTA com simbolo centralizado em components/ui/button.tsx

**Checkpoint**: Foundation ready - user story implementation can now begin.

---

## Phase 3: User Story 2 - Escala visual e ajustes de layout (Priority: P2) 🎯 Execution First

**Goal**: Aplicar aumento proporcional de 20% em toda a camada visual impactada e ajustar grafico/CTA sem regressao de legibilidade.

**Independent Validation**: Comparar baseline versus tela atualizada (desktop/mobile) e confirmar escala global de 20%, ausencia de clipping no grafico, legenda sem colisao e CTA menor com simbolo centralizado.

### Manual Validation for User Story 2 (REQUIRED) ✅

- [X] T007 [P] [US2] Documentar checklist manual da historia em manual-validation/refine-copy-scale-months/us2-checklist.md
- [X] T008 [US2] Executar validacao de escala e layout e registrar resultados em manual-validation/refine-copy-scale-months/us2-scale-layout.md

### Implementation for User Story 2

- [X] T009 [US2] Aplicar escala global de 20% no layout principal e breakpoints do dashboard em components/dashboard/dashboard-page-client.tsx
- [X] T010 [P] [US2] Aplicar escala proporcional em card de saldo e cabecalho do dashboard em components/dashboard/net-balance-card.tsx
- [X] T011 [P] [US2] Aplicar escala proporcional nos componentes de transacoes em components/transactions/transaction-form.tsx
- [X] T012 [US2] Ajustar espacamento vertical entre legenda e area util do grafico em components/dashboard/area-history-chart.tsx
- [X] T013 [US2] Corrigir clipping de marcadores circulares no grafico via margens/area util em components/dashboard/area-history-chart.tsx
- [X] T014 [US2] Reduzir o botao "+" entre 8% e 12% e centralizar simbolo nos CTAs desktop/mobile em components/dashboard/dashboard-page-client.tsx
- [X] T015 [US2] Auditar cobertura da escala de 20% em todas as superficies impactadas (dashboard e transacoes) e registrar evidencias em manual-validation/refine-copy-scale-months/us2-coverage-audit.md

**Checkpoint**: User Story 2 funcional e validada manualmente de forma independente.

---

## Phase 4: User Story 1 - Textos corrigidos em portugues (Priority: P1) 🎯 MVP de Copy

**Goal**: Eliminar ocorrencias legadas sem acento e padronizar copy visivel em titulos, labels, botoes e estados.

**Independent Validation**: Navegar por dashboard e transacoes e confirmar que os termos definidos aparecem com acentuacao correta em todos os contextos visiveis da historia.

### Manual Validation for User Story 1 (REQUIRED) ✅

- [X] T016 [P] [US1] Documentar checklist manual da historia em manual-validation/refine-copy-scale-months/us1-checklist.md
- [X] T017 [US1] Executar cenarios de validacao de copy e registrar evidencias em manual-validation/refine-copy-scale-months/us1-results.md

### Implementation for User Story 1

- [X] T018 [US1] Corrigir copy de banner, navegacao e acoes do dashboard em components/dashboard/dashboard-header.tsx
- [X] T019 [P] [US1] Corrigir copy de estados (erro/loading/vazio) do dashboard em components/dashboard/dashboard-feedback.tsx
- [X] T020 [P] [US1] Corrigir textos de loading e labels auxiliares em components/dashboard/dashboard-loading.tsx
- [X] T021 [US1] Corrigir termos visiveis do grafico (titulo/legenda/tooltip labels) em components/dashboard/area-history-chart.tsx
- [X] T022 [US1] Corrigir titulos, labels e mensagens de estado no formulario de transacoes em components/transactions/transaction-form.tsx
- [X] T023 [P] [US1] Corrigir rotulos e textos de apoio em filtros de transacoes em components/transactions/transaction-filters.tsx
- [X] T024 [P] [US1] Corrigir placeholder e rotulos de busca em components/transactions/transaction-search.tsx

**Checkpoint**: User Story 1 funcional e validada manualmente de forma independente.

---

## Phase 5: User Story 3 - Padrao de meses no grafico (Priority: P3)

**Goal**: Exibir meses em MMM/AAAA de forma consistente no eixo X e tooltip, preservando fallback para entrada invalida.

**Independent Validation**: Confirmar labels de mes no eixo X e tooltip em formato MMM/AAAA (pt-BR, caixa alta) e fallback para valor original quando entrada invalida.

### Manual Validation for User Story 3 (REQUIRED) ✅

- [X] T025 [P] [US3] Documentar checklist manual da historia em manual-validation/refine-copy-scale-months/us3-checklist.md
- [X] T026 [US3] Executar validacao do padrao de meses e fallback e registrar resultados em manual-validation/refine-copy-scale-months/us3-month-format.md

### Implementation for User Story 3

- [X] T027 [US3] Implementar formatter compartilhado MMM/AAAA com fallback para valor original em lib/formatting/ptbr.ts
- [X] T028 [P] [US3] Aplicar formatter de mes no payload/normalizacao do resumo mensal em lib/repositories/monthly-summary-repository.ts
- [X] T029 [P] [US3] Aplicar formatter de mes na serie de demo do grafico em lib/services/chart-demo-series.ts
- [X] T030 [US3] Aplicar formatter consistente no eixo X e tooltip do grafico em components/dashboard/area-history-chart.tsx
- [X] T031 [US3] Garantir propagacao do label formatado no endpoint de resumo do dashboard em app/api/dashboard/summary/route.ts

**Checkpoint**: User Story 3 funcional e validada manualmente de forma independente.

---

## Phase 6: Polish & Cross-Cutting Concerns

**Purpose**: Consolidar evidencias finais e garantir consistencia entre historias.

- [X] T032 [P] Consolidar resultados de regressao cruzada em manual-validation/refine-copy-scale-months/regression-summary.md
- [X] T033 [P] Registrar validacao final de criterios SC-002/SC-006/SC-008 em manual-validation/refine-copy-scale-months/sc-measurement.md
- [X] T034 Executar validacao ponta a ponta do quickstart e registrar signoff em manual-validation/refine-copy-scale-months/quickstart-signoff.md
- [X] T035 Atualizar notas de conformidade de contrato da feature em manual-validation/refine-copy-scale-months/contract-compliance.md

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies - can start immediately.
- **Foundational (Phase 2)**: Depends on Setup completion - BLOCKS all user stories.
- **User Stories (Phase 3+)**: Depend on Foundational completion, com execucao iniciando por US2 para estabelecer baseline de escala.
- **Polish (Phase 6)**: Depends on completion of all user stories.

### User Story Dependencies

- **US2 (P2)**: Inicia apos Phase 2 e estabelece baseline obrigatorio de escala e ajustes visuais.
- **US1 (P1)**: Inicia apos US2 para garantir aplicacao de copy sobre baseline visual final.
- **US3 (P3)**: Inicia apos Phase 2 e pode seguir apos US2 para manter consistencia de exibicao no grafico.

### Within Each User Story

- Manual validation checklist antes da execucao de validacao final.
- Implementacao principal antes do registro de resultados finais.
- Nao criar testes automatizados; usar apenas evidencias manuais.

### Story Completion Order (Suggested)

- US2 (baseline visual) -> US1 (copy final) -> US3 (meses)

---

## Parallel Opportunities

- Phase 1: T003 pode rodar em paralelo com T001-T002.
- Phase 3 (US2): T010 e T011 podem rodar em paralelo apos T009.
- Phase 4 (US1): T019, T020, T023 e T024 podem rodar em paralelo apos T018.
- Phase 5 (US3): T028 e T029 podem rodar em paralelo apos T027.
- Phase 6: T032 e T033 podem rodar em paralelo.

---

## Parallel Example: User Story 2

```bash
# After global scaling baseline in T009:
Task: T010 [US2] components/dashboard/net-balance-card.tsx
Task: T011 [US2] components/transactions/transaction-form.tsx
```

## Parallel Example: User Story 1

```bash
# Parallel copy updates for independent files:
Task: T019 [US1] components/dashboard/dashboard-feedback.tsx
Task: T020 [US1] components/dashboard/dashboard-loading.tsx
Task: T023 [US1] components/transactions/transaction-filters.tsx
Task: T024 [US1] components/transactions/transaction-search.tsx
```

## Parallel Example: User Story 3

```bash
# After shared formatter in T027:
Task: T028 [US3] lib/repositories/monthly-summary-repository.ts
Task: T029 [US3] lib/services/chart-demo-series.ts
```

---

## Implementation Strategy

### MVP First (User Story 2 Baseline)

1. Complete Phase 1: Setup.
2. Complete Phase 2: Foundational.
3. Complete Phase 3: US2.
4. Validate US2 manually and record evidence.
5. Se aprovado, seguir para US1.

### Incremental Delivery

1. Foundation ready (Phase 1 + Phase 2).
2. Deliver US2 (escala e layout), garantindo ordem interna: escala global antes dos refinos visuais.
3. Deliver US1 (copy) com baseline visual consolidado.
4. Deliver US3 (padrao de meses e fallback) com validacao dedicada.
5. Consolidar polish e signoff final.

### Notes

- Todos os itens seguem o formato checklist exigido e incluem caminho de arquivo.
- Tarefas [P] evitam conflito de arquivo e dependencias incompletas.
- Nenhuma tarefa de teste automatizado foi incluida por regra da constituicao.
