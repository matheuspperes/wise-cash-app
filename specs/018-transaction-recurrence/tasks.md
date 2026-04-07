# Tasks: Recorrencia Mensal em Novas Transacoes

**Input**: Design documents from `/specs/018-transaction-recurrence/`
**Prerequisites**: plan.md (required), spec.md (required for user stories), research.md, data-model.md, contracts/, quickstart.md

**Validation**: Automated test tasks are PROHIBITED by constitution. Include manual validation tasks for each user story.

**Organization**: Tasks are grouped by user story to enable independent implementation and validation of each story.

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Preparar baseline de validacao manual e artefatos de evidencias da feature.

- [x] T001 Criar pasta de evidencias da feature em manual-validation/transaction-recurrence/
- [x] T002 Criar arquivo de signoff da feature em manual-validation/transaction-recurrence/quickstart-signoff.md
- [x] T003 [P] Criar checklist de validacao de formulario em manual-validation/transaction-recurrence/form-conditional-validation.md
- [x] T004 [P] Criar checklist de ciclos limitados em manual-validation/transaction-recurrence/limited-recurrence-cycles.md
- [x] T005 [P] Criar checklist de idempotencia automatica em manual-validation/transaction-recurrence/unlimited-automatic-idempotency.md
- [x] T006 [P] Criar checklist de pendencias manuais em manual-validation/transaction-recurrence/unlimited-manual-pending-confirmation.md
- [x] T007 [P] Criar checklist de fallback de dia em manual-validation/transaction-recurrence/day-fallback-29-30-31.md
- [x] T008 [P] Criar checklist de impacto em agregados em manual-validation/transaction-recurrence/dashboard-history-impact.md
- [x] T009 [P] Criar checklist de compatibilidade legada em manual-validation/transaction-recurrence/legacy-storage-compatibility.md

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Evoluir contratos, storage e servicos de base para suportar recorrencia sem regressao.

**CRITICAL**: No user story implementation should begin before this phase is complete.

- [x] T010 Evoluir tipos de regra recorrente (limited/unlimited, mode, projection) em lib/repositories/local-finance-contracts.ts
- [x] T011 [P] Definir tipo de instancia recorrente com estados terminais em lib/repositories/local-finance-contracts.ts
- [x] T012 Ajustar schema de validacao condicional de recorrencia em lib/validation/transaction-schema.ts
- [x] T013 Evoluir schema Dexie para recurrenceRules e recurrenceInstances em lib/storage/dexie-db.ts
- [x] T014 Implementar migracao/compatibilidade para campos legados ausentes em lib/storage/dexie-db.ts
- [x] T015 Implementar utilitarios de monthRef e fallback de dia mensal em lib/services/recurrence-service.ts
- [x] T016 Implementar guarda de idempotencia por ruleId+monthRef em lib/services/recurrence-service.ts
- [x] T017 Implementar motor de projecao monthly para unlimited com horizonte dinamico em lib/services/recurrence-service.ts
- [x] T018 Implementar contagem de ciclos limited a partir do proximo ciclo completo em lib/services/recurrence-service.ts
- [x] T019 Integrar criacao de regra recorrente ao fluxo de criacao de transacao em lib/services/transaction-service.ts
- [x] T020 Integrar reconciliacao recorrente na carga da tela inicial em lib/services/local-dashboard-summary.ts
- [x] T021 Integrar reconciliacao recorrente apos criar/editar/ativar/desativar regra em lib/services/local-dashboard-summary.ts
- [x] T022 Definir contrato de refresh (invalidacao + recarga concluida) para resumo mensal e historico em lib/services/local-dashboard-summary.ts
- [x] T023 Ajustar tipos de resposta de historico/listagens para origem recorrente em lib/ui/dashboard-history-types.ts

**Checkpoint**: Base de dominio e infraestrutura de recorrencia pronta para user stories.

---

## Phase 3: User Story 1 - Configurar recorrencia no cadastro (Priority: P1)

**Goal**: Permitir configurar recorrencia mensal no formulario de novas transacoes com validacao condicional.

**Independent Validation**: Usuario ativa recorrencia, alterna limited/unlimited e salva sem quebrar fluxo sem recorrencia.

### Manual Validation for User Story 1 (REQUIRED)

- [x] T024 [P] [US1] Refinar cenarios de validacao condicional em manual-validation/transaction-recurrence/form-conditional-validation.md

### Implementation for User Story 1

- [x] T025 [US1] Adicionar trigger Recorrencia e estado de expansao em components/transactions/transaction-form.tsx
- [x] T026 [US1] Implementar bloco condicional de tipo limited/unlimited em components/transactions/transaction-form.tsx
- [x] T027 [US1] Implementar sub-bloco condicional de modo automatic/manual em components/transactions/transaction-form.tsx
- [x] T028 [US1] Integrar campos recorrentes no payload local em components/transactions/transaction-form.tsx
- [x] T029 [US1] Aplicar mensagens de erro condicionais conforme schema em components/transactions/transaction-form.tsx
- [x] T030 [US1] Limpar campos nao aplicaveis ao trocar tipo/modo em components/transactions/transaction-form.tsx
- [x] T031 [US1] Garantir compatibilidade do fluxo sem recorrencia no gateway em lib/services/local-transactions-gateway.ts
- [ ] T032 [US1] Executar validacao US1 e registrar evidencia em manual-validation/transaction-recurrence/form-conditional-validation.md

**Checkpoint**: Cadastro recorrente configuravel e validado sem regressao do fluxo tradicional.

---

## Phase 4: User Story 2 - Aplicar recorrencia no ciclo mensal (Priority: P1)

**Goal**: Processar recorrencia mensal com fallback de dia, projecao unlimited e idempotencia consistente em agregados.

**Independent Validation**: Reconciliacao gera/ignora ocorrencias corretamente por ciclo sem duplicidade e com reflexo correto no dashboard/historico.

### Manual Validation for User Story 2 (REQUIRED)

- [x] T033 [P] [US2] Refinar checklist de ciclos limitados em manual-validation/transaction-recurrence/limited-recurrence-cycles.md
- [x] T034 [P] [US2] Refinar checklist de idempotencia automatica em manual-validation/transaction-recurrence/unlimited-automatic-idempotency.md
- [x] T035 [P] [US2] Refinar checklist de fallback de dia em manual-validation/transaction-recurrence/day-fallback-29-30-31.md
- [x] T036 [P] [US2] Refinar checklist de impacto em agregados em manual-validation/transaction-recurrence/dashboard-history-impact.md

### Implementation for User Story 2

- [x] T037 [US2] Encerrar geracao ao atingir maxCycles em regras limited em lib/services/recurrence-service.ts
- [x] T038 [US2] Estender projecao unlimited ao atingir horizonte atual em lib/services/recurrence-service.ts
- [x] T039 [US2] Garantir fallback de dia 29/30/31 para ultimo dia valido em lib/services/recurrence-service.ts
- [x] T040 [US2] Reconciliar listagens e resumo apos efetivacao recorrente em lib/repositories/monthly-summary-repository.ts
- [x] T041 [US2] Implementar invalidacao e recarga concluida de resumo mensal/historico apos persistencia em components/dashboard/dashboard-page-client.tsx
- [x] T042 [US2] Garantir reflexo de efetivadas no mapper de historico/dashboard em lib/services/dashboard-history-mapper.ts
- [ ] T043 [US2] Executar validacao de ciclos limited em manual-validation/transaction-recurrence/limited-recurrence-cycles.md
- [ ] T044 [US2] Executar validacao de idempotencia automatica em manual-validation/transaction-recurrence/unlimited-automatic-idempotency.md
- [ ] T045 [US2] Executar validacao de fallback de dia em manual-validation/transaction-recurrence/day-fallback-29-30-31.md
- [ ] T046 [US2] Executar validacao de impacto em agregados em manual-validation/transaction-recurrence/dashboard-history-impact.md

**Checkpoint**: Motor mensal automatico/limited operando sem duplicidade e com agregados coerentes.

---

## Phase 5: User Story 3 - Confirmar pendencias em modo manual (Priority: P2)

**Goal**: Suportar pendencias mensais manuais com confirmacao/cancelamento, terminalidade por ciclo e preservacao historica.

**Independent Validation**: Pendencias acumulam por ciclo, primeira acao terminal persiste, e regra segue independente da transacao base.

### Manual Validation for User Story 3 (REQUIRED)

- [x] T047 [P] [US3] Refinar checklist de pendencias manuais em manual-validation/transaction-recurrence/unlimited-manual-pending-confirmation.md

### Implementation for User Story 3

- [x] T048 [US3] Persistir snapshot da instancia no momento da criacao da pendencia em lib/services/recurrence-service.ts
- [x] T049 [US3] Impedir duplicidade de pendencia por regra e ciclo em lib/services/recurrence-service.ts
- [x] T050 [US3] Preservar pendencias existentes ao desativar regra e bloquear novos ciclos em lib/services/recurrence-service.ts
- [x] T051 [US3] Aplicar edicao de regra apenas para ciclos futuros em lib/services/recurrence-service.ts
- [x] T052 [US3] Implementar cancelamento terminal de pendencia no ciclo atual em lib/services/recurrence-service.ts
- [x] T053 [US3] Implementar regra first terminal action wins para conflitos de confirmacao/cancelamento em lib/services/recurrence-service.ts
- [x] T054 [US3] Garantir independencia da regra apos edicao/remocao da transacao base em lib/services/recurrence-service.ts
- [x] T055 [US3] Expor confirmacao e cancelamento de pendencia no gateway local em lib/services/local-transactions-gateway.ts
- [x] T056 [US3] Implementar lista de pendencias entre grafico e tabela em components/dashboard/recurrence-pending-confirmations-list.tsx
- [x] T057 [US3] Integrar lista de pendencias no layout da dashboard em components/dashboard/dashboard-page-client.tsx
- [x] T058 [US3] Integrar refresh apos Confirmar/Cancelar pendencia em components/dashboard/dashboard-page-client.tsx
- [ ] T059 [US3] Executar validacao de pendencias manuais em manual-validation/transaction-recurrence/unlimited-manual-pending-confirmation.md

**Checkpoint**: Modo manual com controle explicito, terminalidade por ciclo e integridade de regra/historico validado.

---

## Phase 6: Polish & Cross-Cutting Concerns

**Purpose**: Consolidar evidencias finais e validar qualidade de entrega.

- [x] T060 [P] Revisar textos finais de UI de recorrencia em components/transactions/transaction-form.tsx
- [x] T061 [P] Revisar coerencia de contratos/tipos recorrentes em lib/repositories/local-finance-contracts.ts
- [x] T062 Consolidar resultados de validacao no signoff em manual-validation/transaction-recurrence/quickstart-signoff.md
- [x] T063 Rodar lint e registrar resultado no signoff em manual-validation/transaction-recurrence/quickstart-signoff.md
- [x] T064 Rodar build e registrar resultado no signoff em manual-validation/transaction-recurrence/quickstart-signoff.md
- [x] T065 Atualizar roteiro final com evidencias executadas em specs/018-transaction-recurrence/quickstart.md
- [x] T066 Registrar revisao de escopo (sem novos requisitos de seguranca) no signoff em manual-validation/transaction-recurrence/quickstart-signoff.md

---

## Dependencies & Execution Order

### Phase Dependencies

- Setup (Phase 1): no dependencies.
- Foundational (Phase 2): depends on Setup and blocks all user stories.
- User Stories (Phases 3-5): depend on Foundational completion.
- Polish (Phase 6): depends on all selected user stories complete.

### User Story Dependencies

- US1 (P1): can start after Foundational and is independently validatable.
- US2 (P1): can start after Foundational and is independently validatable.
- US3 (P2): can start after Foundational, independent from delivery of US1/US2, but reuses foundational contracts.

### Within Each User Story

- Manual validation checklist refinement first.
- Core implementation tasks next.
- Manual validation evidence before checkpoint.

### Parallel Opportunities

- T003-T009 can run in parallel in Setup.
- T011, T012, T013, T014 can run in parallel in Foundational.
- T033-T036 can run in parallel in US2.
- T060-T061 and T063-T064 can run in parallel in Polish.

---

## Parallel Example: User Story 2

Task: "T038 [US2] Estender projecao unlimited ao atingir horizonte atual em lib/services/recurrence-service.ts"
Task: "T041 [US2] Implementar invalidacao e recarga concluida de resumo mensal/historico apos persistencia em components/dashboard/dashboard-page-client.tsx"

## Parallel Example: User Story 3

Task: "T052 [US3] Implementar cancelamento terminal de pendencia no ciclo atual em lib/services/recurrence-service.ts"
Task: "T056 [US3] Implementar lista de pendencias entre grafico e tabela em components/dashboard/recurrence-pending-confirmations-list.tsx"

---

## Implementation Strategy

### MVP First (User Story 1)

1. Complete Setup and Foundational phases.
2. Deliver US1 end-to-end.
3. Execute manual validation for US1 and record evidence.
4. Stop for MVP review.

### Incremental Delivery

1. Ship Setup + Foundational base.
2. Deliver US1 and validate manually.
3. Deliver US2 and validate manually.
4. Deliver US3 and validate manually.
5. Run polish and signoff.

### Parallel Team Strategy

1. Developer A: formulario e validacao condicional (US1).
2. Developer B: motor mensal/projecao/idempotencia (US2).
3. Developer C: pendencias manuais e dashboard (US3).

---

## Notes

- [P] tasks indicate low-coupling tasks that can run in parallel.
- All stories include mandatory manual validation tasks.
- Automated tests are intentionally excluded per constitution.
- Each task includes an explicit file path for direct execution.
