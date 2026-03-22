# Tasks: Refino Visual Banner e Dados do Dashboard

**Input**: Design documents from /specs/004-dashboard-banner-nav/
**Prerequisites**: plan.md (required), spec.md (required for user stories), research.md, data-model.md, contracts/, quickstart.md

**Validation**: Automated test tasks are prohibited by constitution. Manual validation tasks are required for each user story.

**Organization**: Tasks are grouped by user story so each story can be implemented and validated independently.

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Preparar estrutura de trabalho e artefatos basicos para a feature 004.

- [X] T001 Create feature manual-validation directory marker in manual-validation/dashboard-banner-nav/.gitkeep
- [X] T002 Create copy review baseline checklist in manual-validation/dashboard-banner-nav/copy-review-checklist.md
- [X] T003 [P] Create demo mode utility scaffold in lib/ui/demo-mode.ts
- [X] T004 [P] Create dashboard header component scaffold in components/dashboard/dashboard-header.tsx

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Implementar fundacao compartilhada que bloqueia as tres user stories.

**CRITICAL**: Nenhuma user story deve iniciar antes de concluir esta fase.

- [X] T005 Define purple-mottled background and CTA color tokens in app/globals.css
- [X] T006 Create centralized Portuguese UI text map for altered screens in lib/i18n/ui-text.ts
- [X] T007 Create demo transaction dataset with 4 fully populated items in lib/repositories/demo-chart-data.ts
- [X] T008 Create helper to merge real and demo monthly chart series in lib/services/chart-demo-series.ts
- [X] T009 Integrate demo-aware monthly summary composition in lib/repositories/monthly-summary-repository.ts
- [X] T010 Extend dashboard summary response with demo metadata fields in app/api/dashboard/summary/route.ts
- [X] T011 Create foundational validation checklist for demo toggle and copy invariants in manual-validation/dashboard-banner-nav/foundational-checklist.md

**Checkpoint**: Fundacao pronta, user stories podem avancar.

---

## Phase 3: User Story 1 - Cabecalho e Identidade Visual (Priority: P1) 🎯 MVP

**Goal**: Entregar banner Wise Cash, navegacao superior simples e remocao da frase antiga com layout equilibrado.

**Independent Validation**: Abrir dashboard e confirmar banner, links Dashboard/Transacoes, ausencia da frase removida e legibilidade do fundo.

### Manual Validation for User Story 1

- [X] T012 [P] [US1] Document US1 manual validation checklist in manual-validation/dashboard-banner-nav/us1-checklist.md

### Implementation for User Story 1

- [X] T013 [US1] Implement top banner and two-link navigation in components/dashboard/dashboard-header.tsx
- [X] T014 [US1] Integrate dashboard header and remove legacy subtitle text in app/page.tsx and components/dashboard/dashboard-page-client.tsx
- [X] T015 [US1] Apply dashboard shell background with subtle purple mottling in app/globals.css
- [X] T016 [US1] Add responsive header spacing behavior for small screens in components/dashboard/dashboard-header.tsx
- [X] T017 [US1] Add active-link rendering for Dashboard/Transacoes navigation in components/dashboard/dashboard-header.tsx

### Validation Execution for User Story 1

- [X] T018 [US1] Execute US1 validation scenarios and capture outcomes in manual-validation/dashboard-banner-nav/us1-results.md

**Checkpoint**: US1 funcional e validada de forma independente.

---

## Phase 4: User Story 2 - Acoes e Textos Mais Claros (Priority: P2)

**Goal**: Modernizar CTA com simbolo + circular e corrigir textos em portugues nas telas impactadas, incluindo Observacao e Salvar compacto.

**Independent Validation**: Verificar CTA circular roxo no dashboard, revisar textos obrigatorios e confirmar formulario de transacoes com Categoria, Observacao e botao Salvar compacto.

### Manual Validation for User Story 2

- [X] T019 [P] [US2] Document US2 manual validation checklist in manual-validation/dashboard-banner-nav/us2-checklist.md

### Implementation for User Story 2

- [X] T020 [P] [US2] Add compact circular CTA variant for plus-only action in components/ui/button.tsx
- [X] T021 [US2] Replace dashboard add-transaction CTA with circular plus button in app/page.tsx and components/dashboard/dashboard-page-client.tsx
- [X] T022 [US2] Update transaction form field label from Notas to Observacao in components/transactions/transaction-form.tsx
- [X] T023 [US2] Keep internal notes contract and implement POST payload aliasing (notes|observation) at UI/API boundary in components/transactions/transaction-form.tsx and app/api/transactions/route.ts
- [X] T024 [US2] Preserve PATCH payload alias compatibility (notes|observation) in app/api/transactions/[id]/route.ts
- [X] T025 [US2] Enforce exact Categoria placeholder behavior in components/transactions/transaction-form.tsx
- [X] T026 [US2] Standardize POST endpoint user-facing validation/error copy in corrected Portuguese in app/api/transactions/route.ts
- [X] T027 [US2] Standardize PATCH endpoint user-facing validation/error copy in corrected Portuguese in app/api/transactions/[id]/route.ts
- [X] T028 [US2] Apply moderate compact size to Salvar button while preserving readability in components/transactions/transaction-form.tsx

### Validation Execution for User Story 2

- [X] T029 [US2] Execute US2 validation scenarios and capture outcomes (including explicit evidence for Categoria placeholder and Salvar compact size) in manual-validation/dashboard-banner-nav/us2-results.md

**Checkpoint**: US2 funcional e validada de forma independente.

---

## Phase 5: User Story 3 - Simulacao de Dados no Grafico (Priority: P3)

**Goal**: Exibir dados simulados de fevereiro/marco apenas em modo demonstracao, mantendo dados reais e distincao visual clara entre series.

**Independent Validation**: Ativar demo mode e confirmar 2 ganhos + 2 gastos com itens completos, legenda clara de serie demo e retorno a serie real-only quando demo desligado.

### Manual Validation for User Story 3

- [X] T030 [P] [US3] Document US3 manual validation checklist in manual-validation/dashboard-banner-nav/us3-checklist.md

### Implementation for User Story 3

- [X] T031 [US3] Add demo mode toggle handling in dashboard page query parameters in app/page.tsx and components/dashboard/dashboard-page-client.tsx
- [X] T032 [US3] Expose demo mode request parameter parsing in dashboard summary endpoint in app/api/dashboard/summary/route.ts
- [X] T033 [US3] Enforce exact 2-income and 2-expense distribution across Feb/Mar in lib/repositories/demo-chart-data.ts
- [X] T034 [US3] Ensure every demo transaction item includes full populated fields in lib/repositories/demo-chart-data.ts
- [X] T035 [US3] Render distinct demo series with dedicated legend labels in components/dashboard/area-history-chart.tsx
- [X] T036 [US3] Add visual style differentiation for demo vs real series in components/dashboard/area-history-chart.tsx
- [X] T037 [US3] Add dashboard empty/fetching feedback copy for demo mode transitions in components/dashboard/dashboard-feedback.tsx

### Validation Execution for User Story 3

- [X] T038 [US3] Execute US3 validation scenarios and capture outcomes in manual-validation/dashboard-banner-nav/us3-results.md

**Checkpoint**: US3 funcional e validada de forma independente.

---

## Phase 6: Polish & Cross-Cutting Concerns

**Purpose**: Consolidar qualidade final, evidencia manual e conformidade com contrato.

- [X] T039 [P] Create cross-story regression checklist in manual-validation/dashboard-banner-nav/regression-checklist.md
- [X] T040 [P] Create success criteria measurement log for SC-001..SC-007 in manual-validation/dashboard-banner-nav/sc-measurement.md
- [X] T041 Execute full regression walkthrough and log summary in manual-validation/dashboard-banner-nav/regression-summary.md
- [X] T042 Validate contract compliance and log evidence in manual-validation/dashboard-banner-nav/contract-compliance.md
- [X] T043 Document copy audit evidence for FR-007 required terms in manual-validation/dashboard-banner-nav/copy-audit-results.md
- [X] T044 Run quickstart manual flow and record final sign-off in manual-validation/dashboard-banner-nav/quickstart-signoff.md

---

## Dependencies & Execution Order

### Phase Dependencies

- Setup (Phase 1): inicia imediatamente.
- Foundational (Phase 2): depende da Setup e bloqueia todas as user stories.
- User Stories (Phase 3-5): dependem da Foundational completa.
- Polish (Phase 6): depende da conclusao das user stories desejadas.

### User Story Dependencies

- US1 (P1): pode iniciar apos Phase 2 e entrega o MVP visual inicial.
- US2 (P2): pode iniciar apos Phase 2; reutiliza fundacao de tokens/copy e deve permanecer validavel de forma independente.
- US3 (P3): pode iniciar apos Phase 2; depende da infraestrutura de demo mode e series do grafico criada na Foundational.

### Within Each User Story

- Checklist manual primeiro.
- Implementacao em seguida.
- Execucao de validacao manual por ultimo.

### Parallel Opportunities

- Setup: T003 e T004 podem rodar em paralelo.
- Foundational: T007 e T008 podem rodar em paralelo; T009 depende de T008; T010 depende de T009.
- US1: T013 deve ser concluida antes de T016 (mesmo arquivo).
- US2: T020 e T022 podem rodar em paralelo; T024 e T028 podem rodar em paralelo.
- US3: T035 deve ser concluida antes de T036 (mesmo arquivo).
- Polish: T039 e T040 podem rodar em paralelo.

---

## Parallel Example: User Story 1

```bash
Task: "T013 [US1] Implement top banner and two-link navigation in components/dashboard/dashboard-header.tsx"
Task: "T015 [US1] Apply dashboard shell background with subtle purple mottling in app/globals.css"
```

## Parallel Example: User Story 2

```bash
Task: "T020 [US2] Add compact circular CTA variant for plus-only action in components/ui/button.tsx"
Task: "T022 [US2] Update transaction form field label from Notas to Observacao in components/transactions/transaction-form.tsx"
```

## Parallel Example: User Story 3

```bash
Task: "T033 [US3] Enforce exact 2-income and 2-expense distribution across Feb/Mar in lib/repositories/demo-chart-data.ts"
Task: "T037 [US3] Add dashboard empty/fetching feedback copy for demo mode transitions in components/dashboard/dashboard-feedback.tsx"
```

---

## Implementation Strategy

### MVP First (US1 only)

1. Concluir Phase 1 (Setup).
2. Concluir Phase 2 (Foundational).
3. Concluir Phase 3 (US1).
4. Executar T018 e validar MVP visual antes de avancar.

### Incremental Delivery

1. Entregar US1 e validar manualmente.
2. Entregar US2 e validar manualmente.
3. Entregar US3 e validar manualmente.
4. Executar Polish para consolidar evidencias e criterios de sucesso.

### Parallel Team Strategy

1. Time conclui Setup + Foundational em conjunto.
2. Apos fundacao:
   - Dev A: US1 (header/nav/background).
   - Dev B: US2 (CTA/copy/formulario).
   - Dev C: US3 (demo mode/grafico).
3. Integrar e fechar evidencias no Phase 6.

---

## Notes

- [P] indica tarefa paralelizavel (sem dependencia de arquivo/conteudo incompleto).
- [USx] aparece apenas em fases de user story.
- Todas as tarefas apontam para caminhos de arquivo especificos.
- Testes automatizados nao devem ser criados.
- Validacao manual e evidencias sao obrigatorias por historia.
