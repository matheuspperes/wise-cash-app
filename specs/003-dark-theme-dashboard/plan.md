# Implementation Plan: Modernizacao Visual do Dashboard

**Branch**: `003-dark-theme-dashboard` | **Date**: 2026-03-21 | **Spec**: `specs/003-dark-theme-dashboard/spec.md`
**Input**: Feature specification from `/specs/003-dark-theme-dashboard/spec.md`

## Summary

Evoluir a experiencia visual do dashboard com dark theme padrao (respeitando preferencia salva), carregamentos modernos, refinamento de grafico, remocao de dados de teste da UI e destaque da acao de nova transacao. O plano tecnico adota biblioteca de componentes acessivel (shadcn/ui + Radix), camada de motion com Framer Motion, padrao de estados de dados com TanStack Query, skeleton loading, Recharts com acabamento moderno, formulacao com react-hook-form + zodResolver e tokens visuais consolidados.

## Technical Context

**Language/Version**: TypeScript 5.x, React 18, Next.js 15.x  
**Primary Dependencies**: Tailwind CSS, TanStack Query, Recharts, Zod, shadcn/ui, Radix UI, class-variance-authority, tailwind-merge, lucide-react, Framer Motion, react-hook-form, @hookform/resolvers, next-themes, Geist font via next/font  
**Storage**: N/A (feature de UX/UI; dados continuam em APIs existentes)  
**Validation**: Validacao manual por cenarios (desktop/mobile), checklist visual, estados isLoading/isFetching/isError, contraste e consistencia de interacoes  
**Target Platform**: Web responsivo (desktop e mobile) em navegadores modernos
**Project Type**: Aplicacao web Next.js (App Router)  
**Performance Goals**: Feedback visual de carregamento em ate 1 segundo; reduzir layout shift percebido; manter transicoes suaves em cards/listas/graficos sem travamentos perceptiveis  
**Constraints**: Sem testes automatizados por constituicao; manter Recharts no curto prazo; remover apenas dados de teste da UI visivel; manter fluxo existente para criar transacao  
**Scale/Scope**: Dashboard principal, componentes de grafico/cartao, estados de carregamento, CTA de nova transacao e superfices de UX de transacoes (formulario/filtros) necessarias para consistencia visual e de validacao

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

### Pre-Phase 0 Gate Review

- ✅ Clean Code: foco em componentes reutilizaveis (`ui/*`, wrappers de estado e tokens), nomes orientados a intencao e separacao visual/estado.
- ✅ Intentional Simplicity: sem migracao de charting library, sem reescrita arquitetural; adicao incremental sobre stack existente.
- ✅ Personal-Use Value: melhora direta de uso diario (leitura, percepcao de velocidade, descoberta de acao principal).
- ✅ Practical Modernity: bibliotecas propostas sao ativas e amplamente adotadas no ecossistema React/Next.
- ✅ No Automated Tests: estrategia de validacao permanece manual e cenario-orientada.

### Post-Phase 1 Gate Review

- ✅ Clean Code: contratos e modelo de dados separam tema, carregamento, apresentacao de grafico e acao de transacao.
- ✅ Intentional Simplicity: decisoes mantem Recharts e fluxo de transacao existentes, evitando overengineering.
- ✅ Personal-Use Value: cada artefato de design mapeia para ganhos de UX perceptiveis no dashboard real.
- ✅ Practical Modernity: stack final inclui padroes atuais de form, motion, design tokens e componente acessivel.
- ✅ No Automated Tests: quickstart e validacao orientam execucao manual completa.

## Project Structure

### Documentation (this feature)

```text
specs/003-dark-theme-dashboard/
├── plan.md
├── research.md
├── data-model.md
├── quickstart.md
├── contracts/
│   └── dashboard-ui-contract.md
└── tasks.md
```

### Source Code (repository root)

```text
app/
├── layout.tsx
├── globals.css
├── (dashboard)/page.tsx
└── transactions/page.tsx

components/
├── dashboard/
├── providers/
├── transactions/
└── ui/

lib/
├── formatting/
└── theme/

manual-validation/
└── dark-theme-dashboard/

tailwind.config.ts
package.json
```

**Structure Decision**: Manter estrutura unica da aplicacao Next.js e concentrar alteracoes em `app/`, `components/` e `lib/`. Artefatos de design ficam em `specs/003-dark-theme-dashboard/` e evidencias manuais serao registradas em `manual-validation/dark-theme-dashboard/` na fase de implementacao.

## Complexity Tracking

Nenhuma violacao constitucional identificada.
