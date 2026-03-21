# Tasks: Modernizacao Visual do Dashboard

**Input**: Design documents from /specs/003-dark-theme-dashboard/
**Prerequisites**: plan.md (required), spec.md (required for user stories), research.md, data-model.md, contracts/

**Validation**: Automated test tasks are prohibited by constitution. Include manual validation tasks for each user story.

**Organization**: Tasks are grouped by user story to enable independent implementation and validation of each story.

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Preparar base tecnica e estrutural para modernizacao visual com novos componentes e tokens.

- [x] T001 Install UI/UX dependencies in package.json (shadcn-ui deps, framer-motion, react-hook-form, @hookform/resolvers, next-themes, lucide-react)
- [x] T002 Initialize shadcn base configuration in components.json
- [x] T003 [P] Create UI components directory scaffold in components/ui/
- [x] T004 [P] Create manual validation directory scaffold in manual-validation/dark-theme-dashboard/
- [x] T005 Configure base utilities for class composition in lib/utils.ts

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Estabelecer fundacao de tema, tokens, providers e componentes base que bloqueia todas as user stories.

**CRITICAL**: No user story work starts before this phase is complete.

- [x] T006 Create design tokens module in lib/theme/tokens.ts
- [x] T007 Apply Geist font and root class strategy in app/layout.tsx
- [x] T008 Implement theme provider wrapper in components/providers/theme-provider.tsx
- [x] T009 Integrate theme provider with existing query provider in components/providers/query-provider.tsx
- [x] T010 Refactor global CSS variables for dark-default palette in app/globals.css
- [x] T011 Extend Tailwind theme to consume design tokens in tailwind.config.ts
- [x] T012 [P] Add reusable skeleton primitive in components/ui/skeleton.tsx
- [x] T013 [P] Add reusable button primitive with variants in components/ui/button.tsx
- [x] T014 [P] Add reusable input/select foundations in components/ui/input.tsx
- [x] T015 [P] Add reusable toast and dialog foundations in components/ui/toast.tsx
- [x] T016 Create shared data-state helpers (loading/error/empty mapping) in lib/ui/data-state.ts

**Checkpoint**: Foundation ready and user stories can proceed.

---

## Phase 3: User Story 1 - Tema Dark Padrao e Consistente (Priority: P1) MVP

**Goal**: Entregar dark theme padrao consistente, profissional e legivel, respeitando preferencia salva.

**Independent Validation**: Abrir dashboard em sessao nova e em sessao com preferencia salva, confirmando tema correto, contraste adequado e coerencia visual entre componentes principais.

### Manual Validation for User Story 1

- [x] T017 [P] [US1] Create US1 manual validation checklist in manual-validation/dark-theme-dashboard/us1-checklist.md

### Implementation for User Story 1

- [x] T018 [US1] Apply dark-default theme behavior with saved-preference override in app/layout.tsx
- [x] T019 [US1] Refine dashboard container and typography tokens in app/(dashboard)/page.tsx
- [x] T020 [P] [US1] Update balance card visual states for dark palette in components/dashboard/net-balance-card.tsx
- [x] T021 [P] [US1] Update transactions page visual states for dark palette in app/transactions/page.tsx
- [x] T022 [US1] Implement modern add-transaction CTA styles for desktop and mobile in app/(dashboard)/page.tsx
- [x] T023 [US1] Ensure focus and disabled accessibility states for core controls in components/ui/button.tsx

### Validation Execution for User Story 1

- [x] T024 [US1] Execute US1 manual validation and capture results in manual-validation/dark-theme-dashboard/us1-results.md

**Checkpoint**: US1 is independently functional and validated.

---

## Phase 4: User Story 2 - Carregamento Moderno e Fluido (Priority: P2)

**Goal**: Padronizar Data UX com estados de loading/fetching/error e transicoes suaves em cards/listas/graficos.

**Independent Validation**: Acionar carregamento inicial e recarregamento em background, verificando skeleton, feedback de fetching, erro contextual e transicao suave no grafico.

### Manual Validation for User Story 2

- [x] T025 [P] [US2] Create US2 manual validation checklist in manual-validation/dark-theme-dashboard/us2-checklist.md

### Implementation for User Story 2

- [x] T026 [US2] Refactor dashboard summary fetching to TanStack Query in app/(dashboard)/page.tsx
- [x] T027 [P] [US2] Add dashboard loading skeleton composition in components/dashboard/dashboard-loading.tsx
- [x] T028 [P] [US2] Add dashboard error and empty states composition in components/dashboard/dashboard-feedback.tsx
- [x] T029 [US2] Integrate isLoading/isFetching/isError state mapping in app/(dashboard)/page.tsx
- [x] T030 [US2] Add Framer Motion transitions for dashboard cards and list sections in app/(dashboard)/page.tsx
- [x] T031 [US2] Refine chart mount/update animation and visual smoothness in components/dashboard/area-history-chart.tsx
- [x] T032 [US2] Implement custom dark-theme tooltip and axis cleanup in components/dashboard/area-history-chart.tsx

### Validation Execution for User Story 2

- [x] T033 [US2] Execute US2 manual validation and capture results in manual-validation/dark-theme-dashboard/us2-results.md

**Checkpoint**: US1 and US2 are independently functional and validated.

---

## Phase 5: User Story 3 - Dashboard Limpo e Acao de Nova Transacao (Priority: P3)

**Goal**: Remover dados de teste da UI visivel e garantir CTA de nova transacao claro, moderno e conectado ao fluxo existente.

**Independent Validation**: Revisar dashboard para ausencia de dados ficticios, validar estado vazio real e confirmar navegacao do CTA para fluxo atual de nova transacao.

### Manual Validation for User Story 3

- [x] T034 [P] [US3] Create US3 manual validation checklist in manual-validation/dark-theme-dashboard/us3-checklist.md

### Implementation for User Story 3

- [x] T035 [US3] Remove dashboard-level mock/test data usage from UI surfaces in app/(dashboard)/page.tsx
- [x] T036 [US3] Ensure chart and card components render empty-state content without synthetic data in components/dashboard/area-history-chart.tsx
- [x] T037 [P] [US3] Migrate transaction form state handling to react-hook-form with zodResolver in components/transactions/transaction-form.tsx
- [x] T038 [P] [US3] Align transaction filters/search visual behavior with new UI primitives in components/transactions/transaction-filters.tsx
- [x] T039 [US3] Wire add-transaction CTA to existing transaction creation flow in app/(dashboard)/page.tsx
- [x] T040 [US3] Validate mobile fixed-bottom CTA visibility and non-overlap behavior in app/(dashboard)/page.tsx

### Validation Execution for User Story 3

- [x] T041 [US3] Execute US3 manual validation and capture results in manual-validation/dark-theme-dashboard/us3-results.md

**Checkpoint**: All user stories are independently functional and validated.

---

## Phase 6: Polish & Cross-Cutting Concerns

**Purpose**: Consolidar consistencia final, qualidade visual global e evidencia manual completa.

- [x] T042 [P] Create consolidated regression checklist in manual-validation/dark-theme-dashboard/regression-checklist.md
- [x] T043 [P] Document SC measurement protocol for SC-001..SC-006 in manual-validation/dark-theme-dashboard/sc-measurement.md
- [x] T044 Run full manual regression and capture summary evidence in manual-validation/dark-theme-dashboard/regression-summary.md
- [x] T045 Validate contract compliance against required outputs in manual-validation/dark-theme-dashboard/contract-compliance.md
- [x] T046 Update quickstart validation evidence notes in specs/003-dark-theme-dashboard/quickstart.md
- [x] T047 Measure and record FR-011/SC-002 feedback timing (<=1s) across critical loading surfaces in manual-validation/dark-theme-dashboard/fr011-feedback-timing.md

---

## Dependencies & Execution Order

### Phase Dependencies

- Setup (Phase 1): Starts immediately.
- Foundational (Phase 2): Depends on Setup completion and blocks all user stories.
- User Stories (Phase 3-5): Depend on Foundational completion.
- Polish (Phase 6): Depends on completion of all user stories.

### User Story Dependencies

- User Story 1 (P1): Starts after Phase 2 and delivers MVP visual baseline.
- User Story 2 (P2): Starts after Phase 2; depends on US1 thematic foundation for consistent motion and loading UX.
- User Story 3 (P3): Starts after Phase 2; depends on US1 visual primitives and US2 data-state patterns for final cleanup and CTA hardening.

### Within Each User Story

- Manual validation checklist first.
- Core implementation tasks next.
- Manual validation execution task last.

### Parallel Opportunities

- Setup: T003 and T004 can run in parallel.
- Foundational: T012, T013, T014 and T015 can run in parallel after T011.
- US1: T020 and T021 can run in parallel.
- US2: T027 and T028 can run in parallel; T031 and T032 can run in parallel after T029.
- US3: T037 and T038 can run in parallel.
- Polish: T042 and T043 can run in parallel; T047 can run in parallel with T045.

---

## Parallel Example: User Story 2

```bash
Task: "T027 [US2] Add dashboard loading skeleton composition in components/dashboard/dashboard-loading.tsx"
Task: "T028 [US2] Add dashboard error and empty states composition in components/dashboard/dashboard-feedback.tsx"
```

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 1 and Phase 2.
2. Complete Phase 3 (US1).
3. Execute T024 and validate dark baseline before expanding scope.

### Incremental Delivery

1. Deliver US1 (visual identity baseline).
2. Deliver US2 (data-state and motion quality).
3. Deliver US3 (real-data cleanliness and CTA finalization).
4. Run Phase 6 regression and contract compliance.

### Parallel Team Strategy

1. Developer A: Theme/tokens + dashboard composition (US1/US2).
2. Developer B: UI primitives and form UX (Foundational/US3).
3. Developer C: Chart refinements and manual validation evidence (US2/Polish).

---

## Notes

- [P] tasks indicate parallelizable work on different files.
- [USx] labels appear only in user story phases.
- All tasks include explicit file paths.
- Automated tests are intentionally omitted per constitution.
- Manual validation evidence is required for each story and final regression.
- FR-011 and SC-002 require explicit timing evidence in T047.
