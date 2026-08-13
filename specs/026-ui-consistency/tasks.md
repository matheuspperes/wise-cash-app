# Tasks: Consistência visual do fluxo atual

**Feature**: Consistência visual do fluxo atual  
**Branch**: 026-ui-consistency  
**Spec**: [spec.md](spec.md)  
**Plan**: [plan.md](plan.md)

---

## Phase 1: Setup

- [x] T001 [P] Map the shared UI surfaces that will change in `components/transactions/transaction-form.tsx`, `components/transactions/transaction-history-edit-drawer.tsx`, `components/dashboard/current-month-expenses-table.tsx`, `components/transactions/monthly-expense-history-accordion.tsx`, `components/transactions/transactions-page-client.tsx`, and `app/data/page.tsx`.
- [x] T002 [P] Confirm the current money-mask helper surface in `lib/formatting/brl-currency-mask.ts` and the existing header pattern in `components/dashboard/dashboard-header.tsx` as the reuse targets for the feature.

## Phase 2: Foundational

- [x] T003 [P] Align the edit-drawer amount field implementation in `components/transactions/transaction-history-edit-drawer.tsx` with the same BRL mask flow already used by `components/transactions/transaction-form.tsx`, keeping the parsed amount behavior compatible with save.
- [x] T004 [P] Identify and centralize the visible `Tipo` column render points in `components/dashboard/current-month-expenses-table.tsx`, `components/transactions/monthly-expense-history-accordion.tsx`, and `components/transactions/transactions-page-client.tsx` so the presentation change can be applied consistently across the current `CurrentMonthTransactionRow` and `MonthlyTransactionHistoryRow` consumers.

## Phase 3: User Story 1 - Reutilizar a máscara de dinheiro na edição (Priority: P1)

**Goal**: The edit drawer should behave like the new-transaction amount field.

**Independent validation**: Open an existing transaction, edit only the amount, and confirm the same mask, formatting, and validation feel as the new-transaction form.

- [x] T005 [US1] Update `components/transactions/transaction-history-edit-drawer.tsx` to reuse the same amount input behavior as `components/transactions/transaction-form.tsx`, including display format, parsing, and validation feedback.
- [x] T006 [P] [US1] Keep the edit drawer save flow in `components/transactions/transaction-history-edit-drawer.tsx` unchanged while confirming the parsed numeric amount still reaches the existing `onSave` payload.

## Phase 4: User Story 2 - Ocultar a coluna "TIPO" nas tabelas afetadas (Priority: P2)

**Goal**: Every table or accordion that reuses the transaction history model should hide the visible `Tipo` column.

**Independent validation**: Open the dashboard, transactions page, and any other consumer of the same row model and confirm that `Tipo` is no longer visible while row data, actions, filters, and ordering stay intact.

- [x] T007 [US2] Remove the visible `Tipo` column from `components/dashboard/current-month-expenses-table.tsx` without changing row ordering, values, or action behavior.
- [x] T008 [US2] Remove the visible `Tipo` column from `components/transactions/monthly-expense-history-accordion.tsx` and the transaction history renderers in `components/transactions/transactions-page-client.tsx`, preserving the existing row actions and spacing.
- [x] T009 [P] [US2] Review any other view that renders the same transaction-history row model, starting with the current `CurrentMonthTransactionRow` and `MonthlyTransactionHistoryRow` consumers, and apply the same column-visibility rule so the presentation stays consistent.

## Phase 5: User Story 3 - Ajustar a tela de Dados e o header (Priority: P3)

**Goal**: The Data screen should visually match the rest of the app, with balanced import/export sections and the model-download block separated below.

**Independent validation**: Open the Data screen on desktop and mobile, confirm the header matches the other pages, import/export share equivalent visual weight on desktop, stack full-width on mobile, and the model-download block stays separate.

- [x] T010 [P] [US3] Update `app/data/page.tsx` so the header uses the same visual pattern and button treatment as the other main pages.
- [x] T011 [P] [US3] Rework the `app/data/page.tsx` section layout so import and export cards have equivalent size on desktop and stack in a single column on mobile.
- [x] T012 [US3] Keep `components/data/model-download.tsx` visually separated below the main import/export row and confirm the preview flow still fits the new Data screen layout.

## Phase 6: Polish & Cross-Cutting Concerns

- [x] T013 [P] Review `components/data/import-card.tsx`, `components/data/export-card.tsx`, and `components/data/import-preview.tsx` for spacing and height consistency against the updated Data screen layout.
- [x] T014 [P] Update `specs/026-ui-consistency/quickstart.md` with any manual verification notes that are useful after the UI alignment work is complete.

---

## Dependencies (story completion order)

- Setup tasks (T001..T002) should complete before the cross-cutting UI alignment work.
- Foundational tasks (T003..T004) should complete before the story phases that depend on the shared mask and table surfaces.
- US1 (T005..T006) should be completed before final polish, because the edit drawer mask influences form behavior and validation.
- US2 (T007..T009) can proceed in parallel with US3 after the shared render points are identified.
- US3 (T010..T012) depends on the existing Data screen composition and should not change the underlying import/export behavior.

## Parallel execution examples

- Example 1: One engineer updates `components/transactions/transaction-history-edit-drawer.tsx` for the mask reuse while another removes the `Tipo` column from `components/dashboard/current-month-expenses-table.tsx`.
- Example 2: One engineer reworks `app/data/page.tsx` layout while another reviews `components/data/import-preview.tsx` and `components/data/export-card.tsx` spacing.
- Example 3: After the shared render points are known, `components/transactions/monthly-expense-history-accordion.tsx` and `components/transactions/transactions-page-client.tsx` can be updated in parallel.

## Implementation strategy

1. Reuse existing helpers first: keep the new-transaction money-mask behavior as the reference and avoid introducing a second amount-formatting path.
2. Remove the `Tipo` column only at the presentation layer, leaving the row model and transaction logic untouched.
3. Adjust the Data screen layout last, because it is a visual composition change that should not affect the data flow.
4. Finish with a small polish pass to smooth spacing and document the manual checks needed to confirm parity.

## Task counts & summary

- Total tasks: 14
- Tasks per story: US1 (2), US2 (3), US3 (3), Setup (2), Foundational (2), Polish (2)
- Parallel opportunities identified: mask reuse vs table column cleanup, dashboard vs transactions column cleanup, Data layout vs Data component spacing
- Suggested MVP scope: US1 only, since mask consistency in editing is the most contained and highest-priority user-facing inconsistency
- Format validation: all tasks follow the required checklist format with checkbox, Task ID, optional `[P]`, optional story label, and explicit file paths