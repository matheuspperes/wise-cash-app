# Tasks: Gestao Financeira Mensal Simples

**Input**: Design documents from /specs/001-monthly-finance-manager/
**Prerequisites**: plan.md (required), spec.md (required for user stories), research.md, data-model.md, contracts/

**Validation**: Automated test tasks are prohibited by constitution. Include manual validation tasks per user story.

**Organization**: Tasks are grouped by user story to enable independent implementation and validation.

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Project initialization and base technical setup.

- [x] T001 Initialize Next.js App Router baseline in app/layout.tsx
- [x] T002 Configure Tailwind global styles in app/globals.css
- [x] T003 [P] Add Shadcn/UI base component setup in components/ui/
- [x] T004 [P] Create Supabase client/server helpers in lib/supabase/client.ts
- [x] T005 [P] Configure environment variable parsing and guards in lib/validation/env.ts

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core infrastructure that must be complete before any user story.

**CRITICAL**: No user story work starts before this phase is complete.

- [x] T006 Create finance core migration for categories, recurrence_rules, and transactions in supabase/migrations/001_finance_core.sql
- [x] T007 Implement shared transaction validation schema in lib/validation/transaction-schema.ts
- [x] T008 [P] Implement BRL currency/date formatting helpers in lib/formatting/ptbr.ts
- [x] T009 [P] Configure TanStack Query provider in components/providers/query-provider.tsx
- [x] T010 Implement standardized API error response utility in lib/api/error-response.ts
- [x] T011 Create transaction repository base queries in lib/repositories/transaction-repository.ts
- [x] T012 Create recurrence generation service with last-day fallback in lib/services/recurrence-service.ts
- [x] T013 Define auth-ready ownership context seam for future login adoption in lib/domain/ownership-context.ts
- [x] T014 Define non-destructive encryption migration strategy notes in specs/001-monthly-finance-manager/research.md

**Checkpoint**: Foundation ready and user stories can proceed.

---

## Phase 3: User Story 1 - Registro rapido de transacoes (Priority: P1) MVP

**Goal**: Enable fast transaction CRUD with required fields and monthly recurrence.

**Independent Validation**: Register income/expense entries, verify required field blocking, and confirm next-month recurrence generation.

### Manual Validation for User Story 1

- [x] T015 [P] [US1] Document US1 manual validation checklist in manual-validation/monthly-finance-manager/us1-checklist.md

### Implementation for User Story 1

- [x] T016 [P] [US1] Implement list/create transaction endpoint handlers in app/api/transactions/route.ts
- [x] T017 [P] [US1] Implement update/delete transaction endpoint handlers in app/api/transactions/[id]/route.ts
- [x] T018 [US1] Build required-field transaction form in components/transactions/transaction-form.tsx
- [x] T019 [US1] Build transaction management page in app/transactions/page.tsx
- [x] T020 [US1] Integrate recurrence creation flow in lib/services/transaction-service.ts
- [x] T021 [US1] Implement 2-decimal commercial rounding normalizer in lib/validation/amount-normalization.ts

### Validation Execution for User Story 1

- [x] T022 [US1] Execute US1 manual validation and capture evidence in manual-validation/monthly-finance-manager/us1-results.md

**Checkpoint**: US1 is independently functional and validated.

---

## Phase 4: User Story 2 - Busca e filtros de alta velocidade (Priority: P2)

**Goal**: Enable rapid transaction discovery via filters and text search in up to three interactions.

**Independent Validation**: Filter by type/category/date and locate a target transaction through text search.

### Manual Validation for User Story 2

- [x] T023 [P] [US2] Document US2 manual validation checklist in manual-validation/monthly-finance-manager/us2-checklist.md

### Implementation for User Story 2

- [x] T024 [P] [US2] Implement filter and text-search repository queries in lib/repositories/transaction-search.ts
- [x] T025 [US2] Extend GET transactions query parser and validation in app/api/transactions/route.ts
- [x] T026 [US2] Build filter bar for type/category/date range in components/transactions/transaction-filters.tsx
- [x] T027 [US2] Build debounced text search input in components/transactions/transaction-search.tsx
- [x] T028 [US2] Integrate list, filters, and search state flow in app/transactions/page.tsx

### Validation Execution for User Story 2

- [x] T029 [US2] Execute US2 manual validation and capture evidence in manual-validation/monthly-finance-manager/us2-results.md

**Checkpoint**: US1 and US2 are independently functional and validated.

---

## Phase 5: User Story 3 - Dashboard com inteligencia imediata (Priority: P3)

**Goal**: Show immediate net balance and historical area-chart comparison.

**Independent Validation**: Open dashboard and confirm immediate comprehension of current balance and trend.

### Manual Validation for User Story 3

- [x] T030 [P] [US3] Document US3 manual validation checklist in manual-validation/monthly-finance-manager/us3-checklist.md

### Implementation for User Story 3

- [x] T031 [P] [US3] Implement dashboard summary endpoint in app/api/dashboard/summary/route.ts
- [x] T032 [P] [US3] Implement monthly aggregation query logic in lib/repositories/monthly-summary-repository.ts
- [x] T033 [US3] Build highlighted net balance card in components/dashboard/net-balance-card.tsx
- [x] T034 [US3] Build historical area chart component with Recharts in components/dashboard/area-history-chart.tsx
- [x] T035 [US3] Compose dashboard page and period selector in app/(dashboard)/page.tsx

### Validation Execution for User Story 3

- [x] T036 [US3] Execute US3 manual validation and capture evidence in manual-validation/monthly-finance-manager/us3-results.md

**Checkpoint**: All user stories are independently functional and validated.

---

## Phase 6: Polish & Cross-Cutting Concerns

**Purpose**: Cross-story improvements and final validation hardening.

- [x] T037 [P] Implement manual CSV and JSON export endpoint in app/api/export/route.ts
- [x] T038 [P] Improve Portuguese microcopy and validation text consistency in lib/i18n/pt-BR.ts
- [x] T039 Optimize heavy chart/list rendering paths in components/dashboard/area-history-chart.tsx
- [x] T040 Define SC-005 measurement protocol and sample method in manual-validation/monthly-finance-manager/sc005-protocol.md
- [x] T041 Run full manual regression and consolidate evidence in manual-validation/monthly-finance-manager/regression-summary.md

---

## Dependencies & Execution Order

### Phase Dependencies

- Setup (Phase 1): Starts immediately.
- Foundational (Phase 2): Depends on Phase 1 and blocks all user stories.
- User Stories (Phase 3-5): Depend on Phase 2 completion.
- Polish (Phase 6): Depends on completion of desired user stories.

### User Story Dependencies

- User Story 1 (P1): Starts after Foundational, no dependency on other stories.
- User Story 2 (P2): Starts after Foundational, can reuse US1 components but remains independently validatable.
- User Story 3 (P3): Starts after Foundational, uses shared repository foundation and remains independently validatable.

### Within Each User Story

- Manual validation checklist task first.
- Data/API tasks before UI integration tasks.
- Validation execution task after implementation tasks.

### Parallel Opportunities

- Setup tasks T003, T004, T005 can run in parallel.
- Foundational tasks T008 and T009 can run in parallel.
- US1 tasks T016 and T017 can run in parallel.
- US2 tasks T024 and T026 can run in parallel.
- US3 tasks T031 and T032 can run in parallel.

---

## Parallel Example: User Story 1

```bash
Task: "T016 [US1] Implement list/create transaction endpoint handlers in app/api/transactions/route.ts"
Task: "T017 [US1] Implement update/delete transaction endpoint handlers in app/api/transactions/[id]/route.ts"
```

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 1 and Phase 2.
2. Complete Phase 3 (US1).
3. Validate US1 manually and capture evidence.
4. Demo MVP value.

### Incremental Delivery

1. Deliver US1 (MVP), then US2, then US3.
2. Validate each story independently before moving on.
3. Execute cross-cutting polish and full regression at the end.

### Parallel Team Strategy

1. Engineer A: core API and repository foundation.
2. Engineer B: transaction UX and filter/search UX.
3. Engineer C: dashboard and chart UX.

---

## Notes

- [P] tasks indicate parallelizable work in different files.
- [USx] labels appear only in user story phases.
- No automated test tasks are included.
- Manual validation evidence is mandatory for each story and final regression.
