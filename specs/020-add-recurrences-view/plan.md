# Implementation Plan: Navegacao e Gestao de Recorrencias

**Branch**: `020-add-recurrences-view` | **Date**: 2026-04-13 | **Spec**: `/specs/020-add-recurrences-view/spec.md`
**Input**: Feature specification from `/specs/020-add-recurrences-view/spec.md`

## Summary

Adicionar uma entrada dedicada para recorrencias no dashboard e uma nova view em
`/transactions?view=recurrences`, com dois blocos principais: pendencias de
confirmacao manual e lista completa de recorrencias editaveis. O plano reutiliza
os handlers locais ja existentes para pendencias, adiciona listagem dedicada de
regras de recorrencia no gateway local e melhora a ergonomia do formulario de
nova transacao ao reposicionar tooltips e mover a explicacao de ativacao para o
tooltip ao lado do rotulo de recorrencia.

## Technical Context

**Language/Version**: TypeScript 5.x, React 18, Next.js 15 (App Router)
**Primary Dependencies**: Next.js, react-hook-form, zod, @tanstack/react-query, Tailwind CSS, Radix primitives
**Storage**: Persistencia local via camada `local-finance` (in-memory/Dexie-style local gateway)
**Validation**: Validacao manual orientada a cenarios de navegacao, renderizacao e mutacoes locais
**Target Platform**: Web responsivo (desktop e mobile)
**Project Type**: Aplicacao web unica (frontend + camada local no mesmo repositorio)
**Performance Goals**:
- Navegacao para `?view=recurrences` perceptivelmente imediata em ambiente local
- Renderizacao de listas de recorrencia sem jank perceptivel para volume pessoal
- Operacoes de confirmar/cancelar pendencia com feedback no mesmo fluxo de tela
**Constraints**:
- Manter tamanhos atuais dos botoes no header, alterando apenas o estilo visual
- Reutilizar handlers e componentes existentes quando possivel
- Sem testes automatizados (conforme constituicao); evidencias por validacao manual
- Preservar acessibilidade basica (labels, ids e mensagens de erro consistentes)
**Scale/Scope**:
- Escopo de uso pessoal com volume de recorrencias tipico de financas pessoais
- Mudanca concentrada em dashboard, view de transacoes/recorrencias e formulario

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

### Pre-Phase 0 Gate Review

- ✅ Clean Code: mudancas concentradas por responsabilidade (`dashboard`, `transactions`, `services`)
- ✅ Intentional Simplicity: extensao de view por query param e reaproveitamento de componentes
- ✅ Personal-Use Value: fluxo direto para gestao de recorrencias com menos friccao
- ✅ Practical Modernity: stack atual do projeto mantida sem novas dependencias pesadas
- ✅ No Automated Tests: estrategia de validacao manual explicitada no quickstart

### Post-Phase 1 Gate Review

- ✅ Clean Code: entidades e contratos de recorrencia documentados com nomes claros
- ✅ Intentional Simplicity: `RecurrencesPage` desacoplada, sem abstrações prematuras
- ✅ Personal-Use Value: foco em pendencias e manutencao de recorrencias no mesmo lugar
- ✅ Practical Modernity: uso consistente de componentes e servicos existentes
- ✅ No Automated Tests: checklist manual cobre navegacao, empty states e tooltips

## Project Structure

### Documentation (this feature)

```text
specs/020-add-recurrences-view/
├── plan.md
├── research.md
├── data-model.md
├── quickstart.md
├── contracts/
│   └── recurrence-view-contract.md
└── tasks.md
```

### Source Code (repository root)

```text
app/
├── page.tsx
└── transactions/
    └── page.tsx

components/
├── dashboard/
│   ├── dashboard-header.tsx
│   └── recurrence-pending-confirmations-list.tsx
├── transactions/
│   ├── transactions-page-client.tsx
│   └── transaction-form.tsx
└── recurrences/
    ├── recurrences-page.tsx
    └── recurrences-list.tsx

components/dashboard/
└── dashboard-page-client.tsx

lib/
├── services/
│   ├── local-dashboard-summary.ts
│   ├── local-transactions-gateway.ts
│   └── recurrence-service.ts
├── repositories/
│   └── local-finance-contracts.ts
└── ui/
    ├── dashboard-history-types.ts
    ├── recurrence-tooltip-content.ts
    └── transactions-view.ts
```

**Structure Decision**: manter estrutura web unica em Next.js e expandir a view
de `transactions` por query param, compondo a navegacao a partir de
`components/dashboard/dashboard-page-client.tsx` e adicionando componentes
dedicados para recorrencias sob `components/recurrences`, sem reestruturacao ampla.

## Phase Outputs

### Phase 0 - Research
- `research.md` com decisoes para roteamento de view, reaproveitamento de handlers,
  status de recorrencia e estrategia de empty state.

### Phase 1 - Design & Contracts
- `data-model.md` com entidades de tela e mapeamento para registros locais.
- `contracts/recurrence-view-contract.md` com contrato de dados/acoes da nova view.
- `quickstart.md` com roteiro de validacao manual da feature.

## Complexity Tracking

Nenhuma violacao constitucional que exija justificativa.
