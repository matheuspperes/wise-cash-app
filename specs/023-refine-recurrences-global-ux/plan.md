# Implementation Plan: Refinar UX de Recorrencias e Header Global

**Branch**: `023-refine-recurrences-global-ux` | **Date**: 2026-04-15 | **Spec**: `/specs/023-refine-recurrences-global-ux/spec.md`
**Input**: Feature specification from `/specs/023-refine-recurrences-global-ux/spec.md`

## Summary

Aplicar ajustes pequenos e seguros no front-end para: consolidar o bloco de pendencias
na tela de Recorrencias com filtro local por mes/ano atual, padronizar navegacao de
cabecalho em telas de UI, remover botoes duplicados no fim das paginas, corrigir
alinhamento do grid Despesa/Receita, reposicionar tooltips de recorrencia mantendo
acessibilidade e corrigir bug de deslocamento de data por timezone com persistencia
como data civil local (`YYYY-MM-DD`).

## Technical Context

**Language/Version**: TypeScript 5.x, React 18, Next.js 15 (App Router)  
**Primary Dependencies**: Next.js, react-hook-form, zod, @tanstack/react-query, Tailwind CSS  
**Storage**: Persistencia local (Dexie/repositories locais)  
**Validation**: Validacao manual orientada a cenarios + evidencias em `manual-validation/`  
**Target Platform**: Web responsivo (desktop e mobile)
**Project Type**: Aplicacao web unica (UI + camada local no mesmo repositorio)  
**Performance Goals**:
- Sem regressao perceptivel na abertura de `Recorrencias`
- Sem custo extra perceptivel em renderizacao de header global
**Constraints**:
- Mudancas pequenas, sem refatoracao ampla
- Reuso de componentes e handlers existentes
- Sem suites de testes automatizados (constituicao)
- Escopo de cabecalho restrito a telas de UI (nao rotas tecnicas)
**Scale/Scope**:
- Ajustes focados em `components/*-page-client.tsx`, `transaction-form.tsx`, `recurrences-page.tsx`, `recurrence-service.ts`, `local-transactions-gateway.ts`, `app/globals.css`

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

### Pre-Phase 0 Gate Review

- ✅ Clean Code: ajuste incremental em arquivos existentes, com responsabilidades por camada preservadas
- ✅ Intentional Simplicity: reapontamento de renderizacao/comportamento, sem nova arquitetura
- ✅ Personal-Use Value: melhorias diretas na navegacao, previsibilidade de data e clareza de UI
- ✅ Practical Modernity: stack atual mantida, sem dependencia nova
- ✅ No Automated Tests: estrategia de validacao manual definida na quickstart

### Post-Phase 1 Gate Review

- ✅ Clean Code: contratos e modelo de dados separam pendencias, navegacao, tooltip e normalizacao de data
- ✅ Intentional Simplicity: solucao prioriza filtros e composicao de UI existentes
- ✅ Personal-Use Value: fluxo diario mais rapido e sem bug de dia deslocado
- ✅ Practical Modernity: acessibilidade e layout alinhados com padroes atuais da base
- ✅ No Automated Tests: validacao manual documentada por cenario

## Project Structure

### Documentation (this feature)

```text
specs/023-refine-recurrences-global-ux/
├── plan.md
├── research.md
├── data-model.md
├── quickstart.md
├── contracts/
│   └── recurrences-header-date-contract.md
└── tasks.md
```

### Source Code (repository root)

```text
app/
└── globals.css

components/
├── dashboard/
│   └── dashboard-page-client.tsx
├── recurrences/
│   ├── recurrences-page.tsx
│   └── recurrences-list.tsx
└── transactions/
    ├── transaction-form.tsx
    └── transactions-page-client.tsx

lib/
└── services/
    ├── local-transactions-gateway.ts
    └── recurrence-service.ts
```

**Structure Decision**: manter aplicacao web unica e concentrar mudancas nos pontos
de extensao ja existentes (servico/gateway e componentes de pagina/formulario),
evitando criacao de novas rotas ou camadas.

## Phase Outputs

### Phase 0 - Research
- `research.md` com decisoes sobre filtro de pendencias local, escopo de cabecalho,
  posicao de tooltip e normalizacao de data civil local.

### Phase 1 - Design & Contracts
- `data-model.md` com entidades de pendencia filtrada, contexto de cabecalho global,
  binding de tooltip e regra de persistencia de data civil local.
- `contracts/recurrences-header-date-contract.md` com invariantes de renderizacao,
  acessibilidade e persistencia de data.
- `quickstart.md` com checklist manual cobrindo todos os criterios da feature.

## Complexity Tracking

Nenhuma violacao constitucional que exija justificativa.
