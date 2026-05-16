# Implementation Plan: Corrigir Datas Civis de Recorrencias

**Branch**: `024-fix-recurrence-dates-ui` | **Date**: 2026-05-16 | **Spec**: [spec.md](spec.md)
**Input**: Feature specification from `/specs/024-fix-recurrence-dates-ui/spec.md`

## Summary

Preserve civil dates end to end for transactions and recurrence records by treating user-selected dates as `YYYY-MM-DD` strings wherever the intent is to keep the chosen day, month, and year stable. The implementation will replace implicit UTC/local parsing for civil strings in formatting, form defaults, recurrence resolution, and summary/grouping code, and it will normalize existing records so previously shifted dates are rewritten into canonical civil form.

## Technical Context

**Language/Version**: TypeScript 5.8 with Next.js 15 and React 18  
**Primary Dependencies**: Next.js, React Hook Form, Zod, Dexie, TanStack Query, Intl APIs  
**Storage**: Client-side IndexedDB via Dexie, with transaction and recurrence fields stored as strings  
**Validation**: Manual scenario validation documented in `manual-validation/fix-recurrence-dates-ui/`  
**Target Platform**: Browser-based web application  
**Project Type**: Web application  
**Performance Goals**: Keep date rendering and recurrence projection immediate in the UI; no measurable runtime overhead beyond existing local-data work  
**Constraints**: Do not introduce automated tests; do not add new `new Date("YYYY-MM-DD")` paths for civil dates; preserve existing local storage shape while normalizing records  
**Scale/Scope**: Personal finance app with a small set of transaction, recurrence, dashboard, and history views

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

- Clean Code: pass; the plan keeps logic in the owning date/recurrence helpers and avoids scattering ad hoc conversions
- Intentional Simplicity: pass; the chosen approach is string-first civil-date handling instead of new abstractions
- Personal-Use Value: pass; the fix removes visible date drift in daily finance workflows
- Practical Modernity: pass; the stack is current and the plan stays within supported browser and framework APIs
- No Automated Tests: pass; validation remains manual and scenario-based

## Project Structure

### Documentation (this feature)

```text
specs/024-fix-recurrence-dates-ui/
├── plan.md
├── research.md
├── data-model.md
├── quickstart.md
├── contracts/
└── tasks.md
```

### Source Code (repository root)

```text
app/
components/
lib/
manual-validation/
```

**Structure Decision**: This is a single Next.js web application. The date fix belongs in `lib/services/` and `lib/formatting/`, while the visible behaviors live in `components/` and the manual verification steps stay under `manual-validation/`.

## Complexity Tracking

No constitution violations require justification for this feature.
