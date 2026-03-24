# Implementation Plan: Refine Transaction Form Inputs and Dashboard CTA Harmony

**Branch**: `014-refine-transaction-form` | **Date**: 2026-03-23 | **Spec**: `C:/apps/wise-cash-app/specs/014-refine-transaction-form/spec.md`
**Input**: Feature specification from `C:/apps/wise-cash-app/specs/014-refine-transaction-form/spec.md`

**Note**: This template is filled in by the `/speckit.plan` command. See `.specify/templates/plan-template.md` for the execution workflow.

## Summary

Refinar a tela de nova transacao com quatro melhorias de alto impacto de UX: (1) substituir seletor de tipo por Segmented Control com estados visuais claros para Despesa/Receita e transicao suave, (2) substituir categoria livre por select agrupado por tipo com categorias predefinidas em ordem alfabetica e opcao de criacao de nova categoria persistente, (3) aplicar mascara monetaria BRL com interpretacao de centavos em entrada continua, e (4) harmonizar os botoes Transacoes e Nova Transacao na dashboard com padding igual por breakpoint e variante secundaria fixa para Transacoes na mesma familia visual da acao primaria.

## Technical Context

**Language/Version**: TypeScript 5.8, React 18, Next.js 15 App Router  
**Primary Dependencies**: React Hook Form, Zod, Tailwind CSS utility classes, Next Link/navigation, existing UI primitives (`components/ui/button`, `components/ui/input`)  
**Storage**: Existing app persistence paths for categories/transactions (no schema migration planned for this feature)  
**Validation**: Manual scenario-based validation with evidence in `manual-validation/refine-transaction-form/`  
**Target Platform**: Responsive web app (mobile, tablet, desktop)
**Project Type**: Single-project Next.js web application  
**Performance Goals**: During manual validation, maintain smooth interaction while typing 30 consecutive digits in the value field and alternating type toggle 20 times in sequence, with no input loss and no visual update delay greater than 1 second  
**Constraints**: No automated tests by constitution; preserve existing transaction-save flow and route behavior; avoid speculative abstractions  
**Scale/Scope**: New transaction form controls and dashboard CTA styling only; no broad cross-screen redesign

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

- Clean Code: naming clarity, single responsibility, and readability constraints defined
- Intentional Simplicity: no speculative abstractions without explicit justification
- Personal-Use Value: feature value is direct for personal usage and low operational friction
- Practical Modernity: stack choices are current and actively maintained
- No Automated Tests: validation strategy is manual, scenario-based, and documented

Gate Assessment (Pre-Phase 0): PASS
- Clean Code: responsibilities split by form field concerns and dashboard CTA profile.
- Intentional Simplicity: local component-level refinements without architectural layering.
- Personal-Use Value: direct gain in speed, consistency, and launch confidence for daily usage.
- Practical Modernity: uses maintained stack and existing design-system primitives.
- No Automated Tests: validation remains manual and scenario-oriented.

## Project Structure

### Documentation (this feature)

```text
specs/014-refine-transaction-form/
├── plan.md              # This file (/speckit.plan command output)
├── research.md          # Phase 0 output (/speckit.plan command)
├── data-model.md        # Phase 1 output (/speckit.plan command)
├── quickstart.md        # Phase 1 output (/speckit.plan command)
├── contracts/           # Phase 1 output (/speckit.plan command)
└── tasks.md             # Phase 2 output (/speckit.tasks command - NOT created by /speckit.plan)
```

### Source Code (repository root)
```text
app/
└── transactions/
  └── page.tsx

components/
├── transactions/
│   └── transaction-form.tsx
└── dashboard/
  └── dashboard-page-client.tsx

lib/
└── ui/
  └── (existing transaction/category helpers as needed)

manual-validation/
└── refine-transaction-form/
```

**Structure Decision**: Reusar estrutura existente do app, concentrando mudancas em formulario de transacao, configuracao de categorias e estilo dos CTAs da dashboard, com evidencias manuais dedicadas.

## Phase 0: Research and Decisions

Research output: `C:/apps/wise-cash-app/specs/014-refine-transaction-form/research.md`

Resolved items from technical context:
- Segmented Control com estados visuais e transicao suave para tipo de transacao.
- Regra canonical de categorias por tipo em ordem alfabetica.
- Persistencia de nova categoria com selecao automatica e bloqueio de duplicidade normalizada.
- Mascara BRL com interpretacao continua de centavos.
- Harmonizacao de padding e variante secundaria fixa para CTA Transacoes.

## Phase 1: Design and Contracts

Design outputs:
- Data model: `C:/apps/wise-cash-app/specs/014-refine-transaction-form/data-model.md`
- Contracts: `C:/apps/wise-cash-app/specs/014-refine-transaction-form/contracts/transaction-form-and-dashboard-cta-contract.md`
- Quickstart/manual validation: `C:/apps/wise-cash-app/specs/014-refine-transaction-form/quickstart.md`

Agent context update:
- Run `C:/apps/wise-cash-app/.specify/scripts/powershell/update-agent-context.ps1 -AgentType copilot`

## Post-Design Constitution Check

Gate Assessment (Post-Phase 1): PASS
- Clean Code: entidades e contratos isolam regras de tipo, categoria, valor e CTA sem ambiguidade.
- Intentional Simplicity: solucoes baseadas em componentes existentes e regras diretas de validacao.
- Personal-Use Value: reduz friccao no fluxo principal e melhora previsibilidade visual.
- Practical Modernity: mantem padroes atuais de UI e validacao da base.
- No Automated Tests: quickstart e contratos orientam validacao manual completa.

## Complexity Tracking

> **Fill ONLY if Constitution Check has violations that must be justified**

| Violation | Why Needed | Simpler Alternative Rejected Because |
|-----------|------------|-------------------------------------|
| None | N/A | N/A |
