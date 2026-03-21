# Tasks: Definicao de Ambiencia do Projeto

**Input**: Design documents from /specs/002-project-ambience-uv/
**Prerequisites**: plan.md (required), spec.md (required for user stories), research.md, data-model.md, contracts/

**Validation**: Automated test tasks are prohibited by constitution. Include manual validation tasks per user story.

**Organization**: Tasks are grouped by user story to enable independent implementation and validation.

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Criar base documental e area de evidencias para aplicar a decisao de ambiencia no repositorio atual.

- [x] T001 Create ambience documentation entrypoint in docs/ambience/README.md
- [x] T002 Create decision snapshot template in docs/ambience/templates/decision-template.md
- [x] T003 [P] Create setup baseline evidence log in manual-validation/project-ambience-uv/setup-baseline.md

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Estabelecer artefatos comuns e regras de avaliacao que bloqueiam todas as user stories.

**CRITICAL**: No user story work starts before this phase is complete.

- [x] T004 Create current stack inventory in docs/ambience/current-stack-inventory.md
- [x] T005 [P] Create ambience option scoring rubric in docs/ambience/rubric.md
- [x] T006 [P] Create project context source file in docs/ambience/project-context.yaml
- [x] T007 Create contract validation checklist in manual-validation/project-ambience-uv/contract-validation-checklist.md
- [x] T008 Create recommendation report skeleton aligned with contract in docs/ambience/recommendation-report.md
- [x] T009 Create reevaluation register in docs/ambience/reevaluation-log.md
- [x] T010 Define SC measurement protocol in manual-validation/project-ambience-uv/sc-metrics-protocol.md

**Checkpoint**: Foundation ready and user stories can proceed.

---

## Phase 3: User Story 1 - Escolha de Ambiencia Recomendada (Priority: P1) MVP

**Goal**: Entregar recomendacao principal executavel para o repositorio atual com alternativas e trade-offs claros.

**Independent Validation**: Revisar o recommendation report e confirmar que existe 1 opcao principal, no minimo 2 alternativas, justificativas, suposicoes e dependencias.

### Manual Validation for User Story 1

- [x] T011 [P] [US1] Document US1 manual validation checklist in manual-validation/project-ambience-uv/us1-checklist.md

### Implementation for User Story 1

- [x] T012 [P] [US1] Populate ProjectContext data in docs/ambience/project-context.yaml
- [x] T013 [P] [US1] Document AmbienceOption candidates in docs/ambience/options-catalog.md
- [x] T014 [US1] Select 1 primary recommendation and at least 2 alternatives in docs/ambience/recommendation-report.md
- [x] T015 [US1] Record assumptions and dependencies in docs/ambience/recommendation-report.md
- [x] T016 [US1] Validate recommendation output against contract in manual-validation/project-ambience-uv/us1-contract-check.md

### Validation Execution for User Story 1

- [x] T017 [US1] Execute US1 manual validation and capture evidence in manual-validation/project-ambience-uv/us1-results.md

**Checkpoint**: US1 is independently functional and validated.

---

## Phase 4: User Story 2 - Padrao Minimo de Operacao (Priority: P2)

**Goal**: Definir baseline operacional reproduzivel para stack atual (npm) e stack Python (uv).

**Independent Validation**: Executar dry-run de onboarding com o baseline e verificar consistencia dos passos e resultados.

### Manual Validation for User Story 2

- [x] T018 [P] [US2] Document US2 manual validation checklist in manual-validation/project-ambience-uv/us2-checklist.md

### Implementation for User Story 2

- [x] T019 [P] [US2] Define npm baseline workflow for current repository in docs/ambience/operational-baseline.md
- [x] T020 [P] [US2] Define uv baseline workflow for Python projects in docs/ambience/operational-baseline.md
- [x] T021 [US2] Add rollback and troubleshooting steps in docs/ambience/operational-baseline.md
- [x] T022 [US2] Sync baseline steps with feature quickstart in specs/002-project-ambience-uv/quickstart.md
- [x] T023 [US2] Capture onboarding dry-run evidence in manual-validation/project-ambience-uv/us2-dry-run-log.md

### Validation Execution for User Story 2

- [x] T024 [US2] Execute US2 manual validation and capture evidence in manual-validation/project-ambience-uv/us2-results.md

**Checkpoint**: US1 and US2 are independently functional and validated.

---

## Phase 5: User Story 3 - Evolucao Segura da Ambiencia (Priority: P3)

**Goal**: Definir politica objetiva de reavaliacao semestral e por mudanca de stack, com processo de supersession.

**Independent Validation**: Simular uma mudanca de stack e uma revisao semestral, confirmando que o processo gera decisao rastreavel.

### Manual Validation for User Story 3

- [x] T025 [P] [US3] Document US3 manual validation checklist in manual-validation/project-ambience-uv/us3-checklist.md

### Implementation for User Story 3

- [x] T026 [P] [US3] Define reevaluation policy and triggers in docs/ambience/reevaluation-policy.md
- [x] T027 [P] [US3] Create change-impact assessment template in docs/ambience/templates/change-impact-template.md
- [x] T028 [US3] Define reevaluation register operating process in docs/ambience/reevaluation-log.md
- [x] T029 [US3] Add recommendation supersession workflow in docs/ambience/recommendation-report.md

### Validation Execution for User Story 3

- [x] T030 [US3] Execute US3 manual validation and capture evidence in manual-validation/project-ambience-uv/us3-results.md

**Checkpoint**: All user stories are independently functional and validated.

---

## Phase 6: Polish & Cross-Cutting Concerns

**Purpose**: Consolidar playbook final e validar regressao manual completa da ambiencia.

- [x] T031 [P] Consolidate final ambience playbook in docs/ambience/playbook.md
- [x] T032 [P] Update ambience documentation entrypoint with cross-links in docs/ambience/README.md
- [x] T033 Define full manual regression checklist in manual-validation/project-ambience-uv/regression-checklist.md
- [x] T034 Measure baseline setup time vs new baseline and calculate SC-004 delta in manual-validation/project-ambience-uv/sc004-measurement.md
- [x] T035 Run full manual regression and publish summary in manual-validation/project-ambience-uv/regression-summary.md
- [x] T036 Record semestral reevaluation reminder process in docs/ambience/reevaluation-policy.md
- [x] T037 Validate accessibility language criteria with 1 non-technical reviewer and capture evidence in manual-validation/project-ambience-uv/non-technical-review.md

---

## Dependencies & Execution Order

### Phase Dependencies

- Setup (Phase 1): Starts immediately.
- Foundational (Phase 2): Depends on Phase 1 and blocks all user stories.
- User Stories (Phase 3-5): Depend on Phase 2 completion.
- Polish (Phase 6): Depends on completion of desired user stories.

### User Story Dependencies

- User Story 1 (P1): Starts after Foundational, no dependency on other stories.
- User Story 2 (P2): Starts after Foundational and depends on US1 recommendation output for consistency.
- User Story 3 (P3): Starts after Foundational and depends on US1 recommendation report and US2 baseline inputs.

### Within Each User Story

- Manual validation checklist task first.
- Data and documentation artifacts before process integration artifacts.
- Validation execution task after implementation tasks.

### Parallel Opportunities

- Setup task T003 can run in parallel with T001 and T002.
- Foundational tasks T005 and T006 can run in parallel.
- US1 tasks T012 and T013 can run in parallel.
- US2 tasks T019 and T020 can run in parallel.
- US3 tasks T026 and T027 can run in parallel.
- Polish tasks T031 and T032 can run in parallel.

---

## Parallel Example: User Story 2

```bash
Task: "T019 [US2] Define npm baseline workflow for current repository in docs/ambience/operational-baseline.md"
Task: "T020 [US2] Define uv baseline workflow for Python projects in docs/ambience/operational-baseline.md"
```

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 1 and Phase 2.
2. Complete Phase 3 (US1).
3. Validate US1 manually and capture evidence.
4. Review recommendation quality before extending baseline/process.

### Incremental Delivery

1. Deliver US1 (decision quality), then US2 (operational baseline), then US3 (reevaluation governance).
2. Validate each story independently before moving on.
3. Execute cross-cutting polish and full regression at the end.

### Parallel Team Strategy

1. Contributor A: recommendation and contract consistency (US1).
2. Contributor B: operational baseline and onboarding evidence (US2).
3. Contributor C: reevaluation governance and supersession flow (US3).

---

## Notes

- [P] tasks indicate parallelizable work in different files.
- [USx] labels appear only in user story phases.
- No automated test tasks are included.
- Manual validation evidence is mandatory for each story and final regression.
