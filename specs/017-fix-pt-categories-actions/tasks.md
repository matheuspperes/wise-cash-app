# Tasks: Correcoes de Portugues e Acoes no Historico

**Input**: Design documents from `/specs/017-fix-pt-categories-actions/`
**Prerequisites**: plan.md (required), spec.md (required for user stories), research.md, data-model.md, contracts/, quickstart.md

**Validation**: Automated test tasks are PROHIBITED by constitution. Include manual validation tasks for each user story.

**Organization**: Tasks are grouped by user story to enable independent implementation and validation of each story.

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Preparar baseline, scaffolds de validacao manual e alinhamento de contexto para a feature.

- [X] T001 Criar pasta de evidencias da feature em manual-validation/fix-pt-categories-actions/
- [X] T002 Criar baseline de validacao manual em manual-validation/fix-pt-categories-actions/quickstart-signoff.md
- [X] T003 [P] Criar checklist inicial de categorias PT-BR em manual-validation/fix-pt-categories-actions/categories-pt.md
- [X] T004 [P] Criar checklist inicial de acoes do historico em manual-validation/fix-pt-categories-actions/history-actions-edit-delete.md
- [X] T005 [P] Criar checklist inicial de refresh pos-persistencia em manual-validation/fix-pt-categories-actions/persistence-confirmed-refresh.md
- [X] T006 [P] Criar checklist inicial de reset total local em manual-validation/fix-pt-categories-actions/full-local-reset.md

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Estruturar comportamentos compartilhados de consistencia de UI e reset local antes das historias.

**CRITICAL**: No user story implementation should begin before this phase is complete.

- [X] T007 Definir mapeamento canônico de categorias corrigidas em lib/ui/transaction-category-presets.ts
- [X] T008 [P] Criar utilitario de normalizacao/correcao de nome de categoria para exibicao em lib/ui/category-label-corrections.ts
- [X] T009 Integrar normalizacao de categoria nas consultas de listagem local em lib/repositories/transaction-repository.ts
- [X] T010 Integrar normalizacao de categoria na busca textual local em lib/repositories/transaction-search.ts
- [X] T011 Implementar operacao de reset total funcional local em lib/storage/dexie-db.ts
- [X] T012 Expor operacao de reset total no gateway de dashboard em lib/services/local-dashboard-summary.ts
- [X] T013 Alinhar contrato de resposta de refresh centralizado apos mutacoes em lib/services/local-transactions-gateway.ts

**Checkpoint**: Base de categorias corrigidas, reset total e refresh confirmado pronta para user stories.

---

## Phase 3: User Story 1 - Corrigir categorias em portugues (Priority: P1) MVP

**Goal**: Garantir categorias corretas e consistentes para novos lancamentos e registros historicos ja existentes.

**Independent Validation**: Revisar formulario, filtros, historico e dashboard com dados novos/antigos e confirmar rotulos corrigidos em todos os pontos.

### Manual Validation for User Story 1 (REQUIRED)

- [X] T014 [P] [US1] Refinar checklist de validacao de categorias em manual-validation/fix-pt-categories-actions/categories-pt.md

### Implementation for User Story 1

- [X] T015 [US1] Corrigir labels de categorias padrao exibidas no formulario/filtros em lib/ui/transaction-category-presets.ts
- [X] T016 [US1] Aplicar categoria corrigida na renderizacao do historico em components/transactions/monthly-expense-history-accordion.tsx
- [X] T017 [US1] Aplicar categoria corrigida na renderizacao da tabela principal de transacoes em components/transactions/transactions-page-client.tsx
- [X] T018 [US1] Aplicar categoria corrigida na tabela de mes atual do dashboard em components/dashboard/current-month-expenses-table.tsx
- [X] T019 [US1] Garantir categoria corrigida no mapeamento de historico agregado em lib/services/dashboard-history-mapper.ts
- [ ] T020 [US1] Executar validacao US1 e registrar evidencias em manual-validation/fix-pt-categories-actions/categories-pt.md

**Checkpoint**: Categorias exibidas em portugues correto de forma consistente para dados novos e historicos.

---

## Phase 4: User Story 2 - Limpar dados locais da aplicacao (Priority: P1)

**Goal**: Disponibilizar reset total funcional local (todos os escopos) no fim da dashboard com confirmacao e feedback.

**Independent Validation**: Criar dados em escopos locais, executar reset, validar estado vazio em dashboard/historico e ausencia de residuos.

### Manual Validation for User Story 2 (REQUIRED)

- [X] T021 [P] [US2] Refinar checklist de reset total em manual-validation/fix-pt-categories-actions/full-local-reset.md

### Implementation for User Story 2

- [X] T022 [US2] Criar acao de servico para reset total funcional em todos os escopos em lib/services/local-dashboard-summary.ts
- [X] T023 [US2] Integrar reset total local via servico client-side em components/dashboard/dashboard-page-client.tsx
- [X] T024 [US2] Adicionar botao de reset total no final da dashboard em components/dashboard/dashboard-page-client.tsx
- [X] T025 [US2] Implementar confirmacao explicita e feedback de sucesso/erro no reset em components/dashboard/dashboard-page-client.tsx
- [X] T026 [US2] Recarregar estado consolidado apos reset confirmado em components/dashboard/dashboard-page-client.tsx
- [X] T027 [US2] Reconciliar estado da tela de historico apos reset total em components/transactions/transactions-page-client.tsx
- [ ] T028 [US2] Executar validacao US2 e registrar evidencias em manual-validation/fix-pt-categories-actions/full-local-reset.md
- [ ] T051 [US2] Medir e registrar tempo total da limpeza confirmada (meta <= 10s) em manual-validation/fix-pt-categories-actions/full-local-reset.md

**Checkpoint**: Reset total funcional local implementado com confirmacao e estado vazio coerente.

---

## Phase 5: User Story 3 - Editar e remover itens no historico completo (Priority: P1)

**Goal**: Incluir coluna Acoes no historico completo com edicao via drawer e remocao com soft delete, atualizando UI apenas apos persistencia confirmada.

**Independent Validation**: Editar e remover linhas do historico com filtros ativos, validar drawer/confirmacao e coerencia de tabela, acordeao e dashboard apos sucesso.

### Manual Validation for User Story 3 (REQUIRED)

- [X] T029 [P] [US3] Refinar checklist de edicao/remocao em manual-validation/fix-pt-categories-actions/history-actions-edit-delete.md
- [X] T030 [P] [US3] Refinar checklist de refresh pos-persistencia em manual-validation/fix-pt-categories-actions/persistence-confirmed-refresh.md

### Implementation for User Story 3

- [X] T031 [US3] Adicionar coluna final Acoes no historico completo em components/transactions/monthly-expense-history-accordion.tsx
- [X] T032 [US3] Inserir botoes com icones Pencil e Trash2 por linha em components/transactions/monthly-expense-history-accordion.tsx
- [X] T033 [US3] Criar componente de drawer lateral de edicao em components/transactions/transaction-history-edit-drawer.tsx
- [X] T034 [US3] Implementar formulario de edicao completa (data, descricao, categoria, tipo, valor, notas) em components/transactions/transaction-history-edit-drawer.tsx
- [X] T035 [US3] Integrar operacao de patch no gateway local com retorno confirmado em lib/services/local-transactions-gateway.ts
- [X] T036 [US3] Orquestrar abertura do drawer por linha e fluxo de salvar mantendo drawer aberto em components/transactions/transactions-page-client.tsx
- [X] T037 [US3] Implementar confirmacao rapida de remocao por linha no historico completo em components/transactions/monthly-expense-history-accordion.tsx
- [X] T038 [US3] Integrar soft delete por linha com persistencia confirmada em lib/services/local-transactions-gateway.ts
- [X] T039 [US3] Aplicar refresh de historico filtrado e acordeao apenas apos sucesso de persistencia em components/transactions/transactions-page-client.tsx
- [X] T040 [US3] Aplicar refresh de cards e grafico de dashboard apos sucesso de mutacao em components/dashboard/dashboard-page-client.tsx
- [X] T041 [US3] Garantir que falha de persistencia nao altere visao consolidada em components/transactions/transactions-page-client.tsx
- [X] T052 [US3] Tratar explicitamente o caso de remocao do item com drawer aberto para o mesmo item em components/transactions/transactions-page-client.tsx
- [ ] T042 [US3] Executar validacao US3 de edicao/remocao e registrar evidencias em manual-validation/fix-pt-categories-actions/history-actions-edit-delete.md
- [ ] T043 [US3] Executar validacao de refresh pos-persistencia e registrar evidencias em manual-validation/fix-pt-categories-actions/persistence-confirmed-refresh.md

**Checkpoint**: Coluna Acoes com edicao/remocao funcional e consistencia visual garantida apos persistencia confirmada.

---

## Phase 6: Polish & Cross-Cutting Concerns

**Purpose**: Consolidar evidencias, hardening de UX e alinhamento final da documentacao da feature.

- [X] T044 [P] Revisar textos/rotulos finais de UI para consistencia PT-BR em components/transactions/transaction-form.tsx
- [X] T045 [P] Revisar textos/rotulos finais de UI para consistencia PT-BR em components/transactions/transaction-filters.tsx
- [X] T046 [P] Revisar textos/rotulos finais de UI para consistencia PT-BR em components/dashboard/dashboard-header.tsx
- [X] T047 Consolidar resultados de validacao no signoff em manual-validation/fix-pt-categories-actions/quickstart-signoff.md
- [X] T048 Atualizar roteiro de execucao da feature em specs/017-fix-pt-categories-actions/quickstart.md
- [X] T049 Rodar lint e registrar resultado no signoff em manual-validation/fix-pt-categories-actions/quickstart-signoff.md
- [X] T050 Revisar cobertura de contrato x implementacao em specs/017-fix-pt-categories-actions/contracts/history-actions-and-reset-contract.md

---

## Dependencies & Execution Order

### Phase Dependencies

- Setup (Phase 1): no dependencies.
- Foundational (Phase 2): depends on Setup; blocks all user stories.
- User Stories (Phases 3-5): each depends on Foundational only.
- Polish (Phase 6): depends on selected user stories completed.

### User Story Dependencies

- US1 (P1): can start after Foundational and is independently validatable.
- US2 (P1): can start after Foundational and is independently validatable.
- US3 (P1): can start after Foundational and is independently validatable.

### Within Each User Story

- Manual validation checklist refinement first.
- Core implementation next.
- Manual evidence execution before story checkpoint.

### Parallel Opportunities

- T003-T006 can run in parallel in Setup.
- T008 can run in paralelo com T007; T011 e T013 podem evoluir em paralelo apos definicao de base.
- T014, T021, T029 e T030 podem ser refinadas em paralelo apos Foundational.
- T044-T046 e T049 podem rodar em paralelo no Polish.

---

## Parallel Example: User Story 2

Task: "T022 [US2] Criar acao de servico para reset total funcional em todos os escopos em lib/services/local-dashboard-summary.ts"
Task: "T023 [US2] Integrar reset total local via servico client-side em components/dashboard/dashboard-page-client.tsx"

## Parallel Example: User Story 3

Task: "T033 [US3] Criar componente de drawer lateral de edicao em components/transactions/transaction-history-edit-drawer.tsx"
Task: "T037 [US3] Implementar confirmacao rapida de remocao por linha no historico completo em components/transactions/monthly-expense-history-accordion.tsx"

---

## Implementation Strategy

### MVP First (US1)

1. Complete Setup and Foundational phases.
2. Deliver US1 category correction end-to-end.
3. Execute manual validation for US1 and log evidence.
4. Stop for MVP review.

### Incremental Delivery

1. Ship foundation for normalization, reset and confirmed refresh.
2. Deliver US1 (categorias PT-BR) and validate.
3. Deliver US2 (reset total local) and validate.
4. Deliver US3 (acoes por linha com drawer/soft delete) and validate.
5. Run polish and signoff.

### Parallel Team Strategy

1. Developer A: category normalization and display consistency (US1).
2. Developer B: full local reset flows (US2).
3. Developer C: history actions drawer/delete + refresh orchestration (US3).

---

## Notes

- [P] tasks indicate low-coupling tasks that can run in parallel.
- All stories include mandatory manual validation tasks.
- Automated test tasks are intentionally excluded per constitution.
- Each task contains an explicit file path for direct execution.
