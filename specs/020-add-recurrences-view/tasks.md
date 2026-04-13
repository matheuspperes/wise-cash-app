# Tasks: Navegacao e Gestao de Recorrencias

**Input**: Design documents from `/specs/020-add-recurrences-view/`
**Prerequisites**: plan.md (required), spec.md (required for user stories), research.md, data-model.md, contracts/, quickstart.md

**Validation**: Automated test tasks are PROHIBITED by constitution. Include manual validation tasks for each user story.

**Organization**: Tasks are grouped by user story to enable independent implementation and validation of each story.

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Preparar artefatos de validacao manual e evidencias da feature.

- [x] T001 Criar pasta de validacao da feature em manual-validation/add-recurrences-view/
- [x] T002 Criar arquivo de signoff da feature em manual-validation/add-recurrences-view/quickstart-signoff.md
- [x] T003 [P] Criar checklist de navegacao do dashboard em manual-validation/add-recurrences-view/dashboard-recurrences-navigation.md
- [x] T004 [P] Criar checklist da view de recorrencias em manual-validation/add-recurrences-view/recurrences-view.md
- [x] T005 [P] Criar checklist de tooltips do formulario em manual-validation/add-recurrences-view/transaction-form-recurrence-tooltips.md

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Evoluir contratos e infraestrutura de dados para suportar a nova view de recorrencias.

**CRITICAL**: No user story work starts before this phase is complete.

- [x] T006 Atualizar o parser de views para suportar `recurrences` em lib/ui/transactions-view.ts
- [x] T007 [P] Definir estilo visual compartilhado de CTA secundario sem alterar tamanho em app/globals.css com borda, sombra e fundo levemente destacados
- [x] T008 [P] Adicionar tipo de item da lista de recorrencias para UI em lib/ui/dashboard-history-types.ts
- [x] T009 Implementar listagem de regras de recorrencia com proxima data e meses faltantes em lib/services/recurrence-service.ts
- [x] T010 Expor gateway local para listar e desativar recorrencias em lib/services/local-transactions-gateway.ts
- [x] T011 Integrar mapeamento de erros de recorrencias no gateway local em lib/services/local-transactions-gateway.ts

**Checkpoint**: Contratos e dados-base prontos para implementar as user stories em paralelo.

---

## Phase 3: User Story 1 - Acessar a view de Recorrencias pelo Dashboard (Priority: P1) 🎯 MVP

**Goal**: Disponibilizar acesso direto para `?view=recurrences` no header do dashboard com estilo visual consistente.

**Independent Validation**: No dashboard, clicar em `Recorrências` deve abrir `/transactions?view=recurrences`; os botoes devem manter o mesmo tamanho com novo estilo compartilhado.

### Manual Validation for User Story 1 (REQUIRED) ✅

- [x] T012 [P] [US1] Registrar passos de validacao da navegacao do header, incluindo navegacao repetida entre views, em manual-validation/add-recurrences-view/dashboard-recurrences-navigation.md
- [ ] T013 [US1] Executar validacao manual de navegacao, estilo dos botoes e preservacao de estado visual em manual-validation/add-recurrences-view/dashboard-recurrences-navigation.md

### Implementation for User Story 1

- [x] T014 [US1] Adicionar CTA `Recorrências` a esquerda de `Transações` no header em components/dashboard/dashboard-page-client.tsx
- [x] T015 [US1] Aplicar estilo visual compartilhado ao botao `Transações` mantendo dimensoes em components/dashboard/dashboard-page-client.tsx
- [x] T016 [US1] Definir href de recorrencias para `/transactions?view=recurrences` com `aria-label` consistente em components/dashboard/dashboard-page-client.tsx
- [x] T017 [US1] Ajustar composicao de controles no header para acomodar 3 CTAs sem quebra em components/dashboard/dashboard-page-client.tsx

**Checkpoint**: Usuario acessa a view de recorrencias diretamente do dashboard com CTA consistente.

---

## Phase 4: User Story 2 - Consultar pendencias e lista de recorrencias (Priority: P1)

**Goal**: Entregar a view `recurrences` com os blocos `Pendências` e `Recorrências`, incluindo status, edicao e exclusao com confirmacao.

**Independent Validation**: Em `/transactions?view=recurrences`, a tela exibe os dois blocos, mostra empty states corretos, aciona handlers locais e mostra status `Ilimitada` ou `N meses faltantes`.

### Manual Validation for User Story 2 (REQUIRED) ✅

- [x] T018 [P] [US2] Registrar cenarios de validacao da view de recorrencias e dos estados vazios/status em manual-validation/add-recurrences-view/recurrences-view.md
- [ ] T019 [US2] Executar validacao manual da view de recorrencias, incluindo repeticao de navegacao e status pluralizado, em manual-validation/add-recurrences-view/recurrences-view.md

### Implementation for User Story 2

- [x] T020 [US2] Adicionar branch de renderizacao `showRecurrences` na pagina de transacoes em components/transactions/transactions-page-client.tsx
- [x] T021 [P] [US2] Criar container da nova tela de recorrencias em components/recurrences/recurrences-page.tsx
- [x] T022 [P] [US2] Criar lista de recorrencias com colunas e acoes em components/recurrences/recurrences-list.tsx
- [x] T023 [US2] Integrar bloco `Pendências` com empty state `Sem confirmações pendentes` em components/recurrences/recurrences-page.tsx
- [x] T024 [US2] Integrar listagem completa de recorrencias na nova view em components/recurrences/recurrences-page.tsx
- [x] T025 [US2] Buscar pendencias e recorrencias no carregamento da view em components/transactions/transactions-page-client.tsx
- [x] T026 [US2] Implementar acao `Editar` abrindo drawer/modal e mantendo lista ao fundo em components/transactions/transactions-page-client.tsx
- [x] T027 [US2] Implementar acao `Excluir` com confirmacao explicita do usuario em components/transactions/transactions-page-client.tsx
- [x] T028 [US2] Conectar mutacoes de pendencia (`confirmar`/`cancelar`) com refresh da view em components/transactions/transactions-page-client.tsx
- [x] T029 [US2] Exibir status de recorrencia (`Ilimitada`, `1 mês faltante`, `N meses faltantes` ou `Sem ciclos restantes`) em components/recurrences/recurrences-list.tsx
- [x] T030 [US2] Garantir dispatch de `wisecash:transactions-mutated` apos mutacoes relevantes em components/transactions/transactions-page-client.tsx

**Checkpoint**: View de recorrencias funcional, com pendencias, lista completa e acoes operacionais.

---

## Phase 5: User Story 3 - Entender configuracao de recorrencia no formulario (Priority: P2)

**Goal**: Melhorar clareza da secao de recorrencia no formulario com tooltips ao lado dos selects e texto explicativo dentro do tooltip do rotulo.

**Independent Validation**: Em `/transactions?view=new`, os dois tooltips de recorrencia ficam ao lado direito dos selects e o texto explicativo nao aparece mais como frase fixa.

### Manual Validation for User Story 3 (REQUIRED) ✅

- [x] T031 [P] [US3] Registrar cenarios de validacao dos tooltips de recorrencia em manual-validation/add-recurrences-view/transaction-form-recurrence-tooltips.md
- [ ] T032 [US3] Executar validacao manual dos tooltips no formulario em manual-validation/add-recurrences-view/transaction-form-recurrence-tooltips.md

### Implementation for User Story 3

- [x] T033 [US3] Mover texto `Ative para repetir este lançamento mensalmente.` para tooltip ao lado do rotulo `Recorrência` usando `lib/ui/recurrence-tooltip-content.ts` em components/transactions/transaction-form.tsx
- [x] T034 [US3] Reposicionar tooltip do select de tipo de recorrencia para ficar imediatamente ao lado em components/transactions/transaction-form.tsx
- [x] T035 [US3] Reposicionar tooltip do select de modo de recorrencia para ficar imediatamente ao lado em components/transactions/transaction-form.tsx
- [x] T036 [US3] Remover frase explicativa fixa da secao de recorrencia em components/transactions/transaction-form.tsx
- [x] T037 [US3] Garantir ids e `aria-describedby` coerentes nos controles de recorrencia em components/transactions/transaction-form.tsx
- [x] T038 [US3] Ajustar espacos compactos do trigger de tooltip sem alterar tamanho dos campos em components/transactions/transaction-form.tsx

**Checkpoint**: Formulario de nova transacao com tooltips de recorrencia mais proximos e explicacao contextual no rotulo.

---

## Phase 6: Polish & Cross-Cutting Concerns

**Purpose**: Consolidar evidencias, validar build/lint e finalizar documentacao da feature.

- [x] T039 [P] Atualizar roteiro final da feature com evidencias de validacao em specs/020-add-recurrences-view/quickstart.md
- [x] T040 [P] Consolidar signoff da feature em manual-validation/add-recurrences-view/quickstart-signoff.md
- [x] T041 Rodar `npm run lint` e registrar resultado em manual-validation/add-recurrences-view/quickstart-signoff.md
- [x] T042 Rodar `npm run build` e registrar resultado em manual-validation/add-recurrences-view/quickstart-signoff.md
- [x] T043 Revisar consistencia textual final (`Recorrências`, `Transações`, `Pendências`) em components/dashboard/dashboard-page-client.tsx
- [x] T044 Revisar consistencia textual final da nova view em components/recurrences/recurrences-page.tsx

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: no dependencies.
- **Foundational (Phase 2)**: depends on Setup and blocks all user stories.
- **User Stories (Phase 3-5)**: depend on Foundational completion.
- **Polish (Phase 6)**: depends on completion of desired user stories.

### User Story Dependencies

- **US1 (P1)**: pode iniciar apos Foundational e e independente.
- **US2 (P1)**: pode iniciar apos Foundational; depende funcionalmente da view `recurrences` no parser, mas e validavel de forma independente de US3.
- **US3 (P2)**: pode iniciar apos Foundational e e independente da entrega de US1/US2.

### Within Each User Story

- Manual validation checklist first.
- Core implementation tasks next.
- Manual validation evidence before checkpoint closure.

### Parallel Opportunities

- Setup: T003, T004, T005 em paralelo.
- Foundational: T007 e T008 em paralelo.
- US1: T014 e T015 em paralelo apos definicao do estilo compartilhado.
- US2: T021 e T022 em paralelo; T028 e T029 em paralelo apos base da view.
- US3: T034 e T035 em paralelo.
- Polish: T039 e T040 em paralelo.

---

## Parallel Example: User Story 1

```bash
Task: T014 [US1] Adicionar CTA `Recorrências` a esquerda de `Transações` no header em components/dashboard/dashboard-page-client.tsx
Task: T015 [US1] Aplicar estilo visual compartilhado ao botao `Transações` mantendo dimensoes em components/dashboard/dashboard-page-client.tsx
```

---

## Parallel Example: User Story 2

```bash
Task: T021 [US2] Criar container da nova tela de recorrencias em components/recurrences/recurrences-page.tsx
Task: T022 [US2] Criar lista de recorrencias com colunas e acoes em components/recurrences/recurrences-list.tsx
```

---

## Parallel Example: User Story 3

```bash
Task: T034 [US3] Reposicionar tooltip do select de tipo de recorrencia para ficar imediatamente ao lado em components/transactions/transaction-form.tsx
Task: T035 [US3] Reposicionar tooltip do select de modo de recorrencia para ficar imediatamente ao lado em components/transactions/transaction-form.tsx
```

---

## Implementation Strategy

### MVP First (User Story 1)

1. Complete Phase 1 and Phase 2.
2. Complete Phase 3 (US1).
3. Validate US1 manually and record evidence.
4. Demo/review navigation outcome.

### Incremental Delivery

1. Setup + Foundational.
2. Deliver US1 (access via dashboard) and validate.
3. Deliver US2 (recurrences view) and validate.
4. Deliver US3 (form tooltip refinements) and validate.
5. Execute Polish phase and finalize signoff.

### Parallel Team Strategy

1. Developer A: US1 dashboard CTA and shared visual style.
2. Developer B: US2 recurrences view and data handlers.
3. Developer C: US3 tooltip and accessibility adjustments.

---

## Notes

- [P] tasks indicate low-coupling tasks that can run in parallel.
- All story phases include mandatory manual validation tasks.
- No automated tests are included by constitution.
- Each task includes an explicit file path for direct execution.