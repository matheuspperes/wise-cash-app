# Implementation Plan: Refino de Texto Escala e Meses

**Branch**: `005-refine-copy-scale-months` | **Date**: 2026-03-22 | **Spec**: `/specs/005-refine-copy-scale-months/spec.md`
**Input**: Feature specification from `/specs/005-refine-copy-scale-months/spec.md`

**Note**: Plano preenchido pelo fluxo speckit.plan para esta feature.

## Summary

Aplicar refino visual e textual do dashboard/transacoes em ordem controlada: primeiro escalar 20% toda a camada visual (incluindo containers, margens externas e largura maxima), depois ajustar espacamento/recorte do grafico e CTA de adicionar, e por fim garantir padrao de mes MMM/AAAA consistente em eixo X e tooltip com fallback para valor original quando invalido. A implementacao prioriza alteracoes localizadas em componentes de UI e formatadores compartilhados, com validacao manual orientada a cenarios.

## Technical Context

**Language/Version**: TypeScript 5.8, React 18, Next.js 15  
**Primary Dependencies**: Tailwind CSS, Recharts, TanStack Query, Framer Motion, react-hook-form, Zod  
**Storage**: N/A (sem mudanca de persistencia; dados continuam via APIs existentes)  
**Validation**: Validacao manual por cenario com evidencias em `manual-validation/refine-copy-scale-months/`  
**Target Platform**: Web responsivo (desktop e mobile modernos)
**Project Type**: Aplicacao web Next.js (App Router)  
**Performance Goals**: Preservar fluidez visual e renderizacao sem regressao perceptivel; sem aumento de roundtrips de rede  
**Constraints**: Sem testes automatizados por constituicao; manter mudancas pequenas e legiveis; aplicar escala global antes dos demais refinamentos  
**Scale/Scope**: Dashboard principal, componentes de transacoes relacionados, formatter de meses e estados textuais visiveis

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

- Clean Code: naming clarity, single responsibility, and readability constraints defined
- Intentional Simplicity: no speculative abstractions without explicit justification
- Personal-Use Value: feature value is direct for personal usage and low operational friction
- Practical Modernity: stack choices are current and actively maintained
- No Automated Tests: validation strategy is manual, scenario-based, and documented

Resultado inicial: PASS. Nenhuma violacao prevista para iniciar pesquisa e design.

## Project Structure

### Documentation (this feature)

```text
specs/005-refine-copy-scale-months/
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
├── page.tsx
├── (dashboard)/
├── transactions/
└── api/

components/
├── dashboard/
├── transactions/
└── ui/

lib/
├── formatting/
├── i18n/
├── repositories/
├── services/
└── ui/

manual-validation/
└── [feature-name]/

specs/
└── 005-refine-copy-scale-months/
```

**Structure Decision**: Manter estrutura atual de aplicacao web unica (Next.js App Router) e concentrar mudancas em componentes de dashboard/transacoes, utilitarios de formatacao e i18n, com evidencias em manual-validation da propria feature.

## Complexity Tracking

Sem violacoes de constituicao a justificar neste plano.

## Constitution Check (Post-Design)

- Clean Code: PASS
- Intentional Simplicity: PASS
- Personal-Use Value: PASS
- Practical Modernity: PASS
- No Automated Tests: PASS (validacao manual mantida)
