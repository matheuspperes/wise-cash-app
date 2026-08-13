# Implementation Plan: Consistência visual do fluxo atual

**Branch**: `026-ui-consistency` | **Date**: 2026-07-06 | **Spec**: [spec.md](./spec.md)
**Input**: Feature specification from `/specs/026-ui-consistency/spec.md`

## Summary

Ajustar a apresentação de telas já existentes sem alterar regras de negócio: equalizar as sections de importação/exportação na tela de Dados, padronizar o header dessa tela com as demais, ocultar a coluna "TIPO" em tabelas que reutilizam o mesmo modelo de transação e reutilizar a máscara monetária de novas transações no campo de edição.

## Technical Context

**Language/Version**: TypeScript 5.x, React 18, Next.js 15 (App Router)  
**Primary Dependencies**: Tailwind CSS, shadcn/ui, Radix UI, React Hook Form, Zod, Lucide, Dexie  
**Storage**: IndexedDB via Dexie (local-first persistence)  
**Validation**: Validação manual guiada por cenários documentados; sem suite automatizada  
**Target Platform**: Web app responsiva para desktop e mobile  
**Project Type**: Web application  
**Performance Goals**: Manter a experiência atual sem regressão perceptível de renderização ou navegação  
**Constraints**: Preservar cadastro, edição, listagem e persistência; mudanças apenas de UI/UX e apresentação  
**Scale/Scope**: Pequena área de UI com impacto em Dashboard, Dados e Transações

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

- Clean Code: passável; mudanças podem ficar concentradas em componentes de página/tabela/formulário já existentes
- Intentional Simplicity: passável; solução deve reaproveitar componentes e helpers já presentes, sem abstrações novas desnecessárias
- Personal-Use Value: passável; o ajuste reduz atrito visual em fluxos usados frequentemente
- Practical Modernity: passável; o app já usa stack moderna e mantida
- No Automated Tests: passável; a validação será manual, com cenários curtos e reproduzíveis

## Project Structure

### Documentation (this feature)

```text
specs/026-ui-consistency/
├── plan.md
├── research.md
├── data-model.md
└── quickstart.md
```

### Source Code (repository root)

```text
app/
├── data/page.tsx
├── layout.tsx
└── transactions/page.tsx

components/
├── dashboard/
│   ├── dashboard-header.tsx
│   ├── dashboard-page-client.tsx
│   └── current-month-expenses-table.tsx
├── data/
│   ├── export-card.tsx
│   ├── import-card.tsx
│   ├── import-preview.tsx
│   └── model-download.tsx
└── transactions/
    ├── monthly-expense-history-accordion.tsx
    ├── transaction-form.tsx
    └── transaction-history-edit-drawer.tsx

lib/
├── formatting/brl-currency-mask.ts
└── ui/dashboard-history-types.ts
```

**Structure Decision**: This is a single web application. The feature stays inside the existing `app/`, `components/` and `lib/` structure, with no new package boundaries or backend/API split.

## Complexity Tracking

No constitution violations require justification. The feature is intentionally small and should reuse the existing layout, table and currency-mask patterns instead of introducing new abstractions.
