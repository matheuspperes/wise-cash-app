# Implementation Plan: Refino Visual Banner e Dados do Dashboard

**Branch**: `004-dashboard-banner-nav` | **Date**: 2026-03-21 | **Spec**: `specs/004-dashboard-banner-nav/spec.md`
**Input**: Feature specification from `/specs/004-dashboard-banner-nav/spec.md`

## Summary

Refinar a interface do dashboard com cabecalho/banner "Wise Cash", barra de navegacao superior simples (Dashboard e Transacoes), CTA principal circular com simbolo "+" e ajustes visuais de fundo roxo mais texturizado, alem de correcoes de portugues nas telas alteradas. A entrega tambem adiciona simulacao de dados para o grafico em modo demonstracao, mantendo dados reais e distinguindo claramente as series demo. A abordagem tecnica segue incrementos pequenos sobre a base Next.js existente, priorizando consistencia visual, legibilidade textual e validacao manual cenario-orientada.

## Technical Context

**Language/Version**: TypeScript 5.x, React 18, Next.js 15.x  
**Primary Dependencies**: Tailwind CSS, TanStack Query, Recharts, Zod, next-themes, Framer Motion, react-hook-form, Radix/shadcn UI primitives ja adotados no repositorio  
**Storage**: N/A para esta feature (camada visual, copy e simulacao de exibicao no dashboard)  
**Validation**: Validacao manual por cenarios do spec, checklist visual (desktop/mobile), verificacao textual em portugues e evidencias em arquivos de validacao manual  
**Target Platform**: Aplicacao web responsiva em navegadores modernos (desktop e mobile)
**Project Type**: Aplicacao web Next.js com App Router  
**Performance Goals**: Renderizacao inicial do cabecalho sem flicker perceptivel; CTA principal descoberto em ate 3 segundos em validacao guiada; grafico com dados demo e reais sem perda de legibilidade  
**Constraints**: Sem testes automatizados por constituicao; manter fluxo existente de criacao de transacao; simulacao ativa somente em modo demonstracao; preservar dados reais no grafico  
**Scale/Scope**: Telas de dashboard e transacoes, componentes de cabecalho/CTA/grafico, ajustes de copy em textos visiveis definidos no FR-007

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

### Pre-Phase 0 Gate Review

- ✅ Clean Code: alteracoes focadas em componentes e textos visiveis, com responsabilidades separadas entre layout, formulario e grafico.
- ✅ Intentional Simplicity: sem novas camadas arquiteturais; reaproveita fluxo atual de transacoes e stack visual existente.
- ✅ Personal-Use Value: melhora navegacao, clareza de interface e leitura de dados no uso diario do dashboard.
- ✅ Practical Modernity: mantem bibliotecas ativas e padroes atuais ja consolidados no projeto.
- ✅ No Automated Tests: estrategia de qualidade permanece manual, orientada pelos cenarios e criterios mensuraveis da feature.

### Post-Phase 1 Gate Review

- ✅ Clean Code: modelo de dados separa entidades de cabecalho, CTA, copy e simulacao de grafico sem acoplamento excessivo.
- ✅ Intentional Simplicity: contrato prioriza comportamento de UI e configuracao de demo mode, sem complexidade de backend adicional.
- ✅ Personal-Use Value: artefatos de design cobrem exatamente os ajustes solicitados de visual, texto e dados simulados.
- ✅ Practical Modernity: implementacao permanece no ecossistema atual Next.js + Recharts + Tailwind sem dependencia obsoleta.
- ✅ No Automated Tests: quickstart define somente validacao manual e registro de evidencias.

## Project Structure

### Documentation (this feature)

```text
specs/004-dashboard-banner-nav/
├── plan.md
├── research.md
├── data-model.md
├── quickstart.md
├── contracts/
│   └── dashboard-banner-nav-contract.md
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
├── i18n/
├── repositories/
├── services/
└── ui/

manual-validation/
└── dashboard-banner-nav/
```

**Structure Decision**: Manter estrutura unica da aplicacao Next.js e concentrar mudancas em `app/`, `components/` e `lib/`, com evidencias manuais da feature em `manual-validation/dashboard-banner-nav/`.

## Complexity Tracking

> **Fill ONLY if Constitution Check has violations that must be justified**

Nenhuma violacao constitucional identificada.
