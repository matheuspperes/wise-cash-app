# Tasks: Importacao e exportacao de transacoes via CSV (Modelo Unico)

**Feature**: Importacao e exportacao de transacoes via CSV  
**Branch**: 025-csv-transaction-import-export  
**Spec**: [specs/025-csv-transaction-import-export/spec.md](specs/025-csv-transaction-import-export/spec.md)

---

## Phase 1: Setup

- [x] T001 Create new page route and navigation entry for Data screen at app/data/page.tsx
- [x] T002 [P] Create UI component `components/data/import-card.tsx` (Import card with file input and CTA)
- [x] T003 [P] Create UI component `components/data/export-card.tsx` (Export card with period filter)
- [x] T004 [P] Create UI component `components/data/model-download.tsx` (Download model CSV CTA)
- [x] T005 Update dashboard header to add a single discrete CTA linking to /data in components/dashboard/dashboard-header.tsx

## Phase 2: Foundational (blocking prerequisites)

- [x] T006 Create CSV parser service `lib/services/csv-parser.ts` that parses CSV text, supports quoted fields, and returns rows (CsvTemplateRow[])
- [x] T007 Create CSV validation schema `lib/validation/csv-schema.ts` (Zod) implementing all field rules and recurrence dependencies
- [x] T008 Create CSV normalization helpers `lib/formatting/csv-normalization.ts` (trim, case-insensitive mapping for controlled fields)
- [x] T009 Create CSV import service `lib/services/csv-import-service.ts` that: parses text, validates lines, returns CsvImportPreview and validRows
- [x] T010 Create CSV export service `lib/services/csv-export-service.ts` that: builds CSV using model header and normalizes values from local transactions
- [x] T011 [P] Add UI preview component `components/data/import-preview.tsx` to show preview table with errors and mapping prompts for unknown categories
- [x] T012 Create category mapping modal `components/data/category-map-modal.tsx` used by import-preview to let user map or create categories
- [x] T013 Update local transactions gateway to expose a `bulkCreateFromCsv` flow in lib/services/local-transactions-gateway.ts (wrap createLocalTransaction semantics for batch)

## Phase 3: User Story 1 - Importar transacoes com validacao (Priority: P1)

- [x] T014 [US1] Implement upload flow handler in app/data/page.tsx that accepts CSV file, reads as text and calls `parseCsvTemplate` in lib/services/csv-import-service.ts
- [x] T015 [US1] Implement preview UI integration to show CsvImportPreview in components/data/import-preview.tsx and allow user to map unknown categories using components/data/category-map-modal.tsx
- [x] T016 [US1] Implement duplicate detection inside csv-import-service (natural key: Nome+Tipo+Valor+Data+Categoria) and mark duplicates in preview (do not create on confirm)
- [x] T017 [US1] Implement confirm import action `confirmCsvImport(preview)` in lib/services/csv-import-service.ts which calls `bulkCreateFromCsv` and creates recurrence rules when applicable
- [x] T018 [US1] Wire import confirmation to dispatch `wisecash:transactions-mutated` and close UI, refresh relevant pages (Transactions and Dashboard)
- [x] T019 [US1] Add UX messages/errors for storage unavailability and line-level validation results in components/data/import-preview.tsx

## Phase 4: User Story 2 - Exportar dados no mesmo modelo (Priority: P2)

- [x] T020 [US2] Implement export action in components/data/export-card.tsx that calls `exportCsvTemplate` in lib/services/csv-export-service.ts and triggers file download
- [x] T021 [US2] Add optional period filter (from/to) UI in components/data/export-card.tsx and pass to export service
- [x] T022 [US2] Reuse or adapt existing server export route `app/api/export/route.ts` to ensure header names/order match the model; if server route is kept, create a client wrapper `lib/services/csv-export-service.ts` that calls it
- [x] T023 [US2] Add a quick e2e manual checklist in manual-validation/csv-transaction-import-export/scenario-5-export-reimport.md to verify that exported file is reimportable

## Phase 5: User Story 3 - Acessar tela de dados e baixar modelo (Priority: P3)

- [x] T024 [US3] Implement "Baixar modelo" CTA in components/data/model-download.tsx which uses csv-export-service with an empty dataset or a dedicated `generateTemplate()` function to produce a CSV with headers only
- [x] T025 [US3] Add help text and short instructions on app/data/page.tsx describing the three actions and the required formats (valor, data, recorrencia)
- [x] T026 [US3] Add link from Dashboard CTA to app/data/page.tsx (ensure single CTA exists in components/dashboard/dashboard-header.tsx)

## Phase 6: Polish & Cross-cutting Concerns

- [x] T027 Run localization pass: ensure all CSV header labels and UI labels are in PT-BR and consistent with spec (files: specs/025-csv-transaction-import-export/spec.md, components/*)
- [x] T028 Add manual-validation checklists to manual-validation/csv-transaction-import-export/ as per quickstart.md
- [x] T029 [P] Add manual validation steps documentation and short screenshots capture guide in manual-validation/
- [x] T030 [P] Accessibility pass for import preview table and file input (keyboard focus, labels)
- [x] T031 Cleanup: update docs, remove any feature-flag stubs and ensure agent context updated (run .specify/scripts/powershell/update-agent-context.ps1 -AgentType copilot)
 - [x] T032 UI adjustments: move Dashboard "Dados" CTA first, make Data page header use `DashboardHeader`, place Import+Export side-by-side and Model Download as full-width block

---

## Dependencies (story completion order)

- Foundational tasks (T006..T013) MUST complete before P1 import tasks (T014..T019).
- T014/T015 (preview) depend on T006/T007/T009/T011.
- T017 (confirm import) depends on T013 (bulk creation) and T016 (duplicate detection).
- Export tasks (T020..T023) depend on T010 (export service) and T008 (normalization).
- UI scaffolding tasks (T002..T004) can be executed in parallel with foundational coding (marked [P]).

## Parallel execution examples

- Example 1: UI team works in parallel on `components/data/*` (T002,T003,T004,T011,T012) while backend/service dev works on `lib/services/csv-parser.ts`, `lib/validation/csv-schema.ts`, `lib/services/csv-import-service.ts` (T006,T007,T009).
- Example 2: One engineer implements `csv-export-service` and updates `app/api/export/route.ts` (T010,T022) while another implements the import preview and category mapping modal (T011,T012).

## Implementation strategy

1. Implement parser & validation (T006,T007) and a minimal import-preview UI (T011) to enable iterative testing with real CSVs.
2. Implement batch persistence (T013) and confirm import (T017) to allow end-to-end local testing.
3. Implement export (T020) and model download (T024) to close the loop (export -> reimport).
4. Polish UX, errors, and manual validation artifacts.

---

## Task counts & summary

- Total tasks: 31
- Tasks per story: US1 (6), US2 (4), US3 (3), Setup (5), Foundational (8), Polish (5)
- Parallel opportunities identified: UI components, parser vs UI, export vs import preview

---

If you want, I can now:
1) Generate the scaffold files for the most critical foundational tasks (parser, validation schema, import service) and a minimal import page so you can run a local manual check immediately; or
2) Run `/speckit.review` to convert tasks into individual issues (if you use GitHub integration).

Which would you like next? (Reply with 1 or 2.)
