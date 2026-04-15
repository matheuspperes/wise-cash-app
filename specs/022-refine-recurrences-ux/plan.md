# Implementation Plan: Refinar Experiencia de Recorrencias

**Branch**: `022-refine-recurrences-ux` | **Date**: 2026-04-14 | **Spec**: `/specs/022-refine-recurrences-ux/spec.md`
**Input**: Feature specification from `/specs/022-refine-recurrences-ux/spec.md`

## Summary

Refinar a view de recorrencias para alinhar totalmente com o historico em UX de
edicao/exclusao e analytics, filtrar pendencias apenas por mes/ano atual no fuso
local, remover blocos/copys vazios, ajustar tooltips acessiveis ao lado dos selects
e alinhar visualmente o grid de nova transacao. A implementacao sera incremental,
reusando handlers/componentes existentes em vez de duplicar fluxos.

## Technical Context

**Language/Version**: TypeScript 5.x, React 18, Next.js 15 (App Router)
**Primary Dependencies**: Next.js, react-hook-form, zod, @tanstack/react-query, Tailwind CSS
**Storage**: Persistencia local via repositories/gateway (local-finance e servicos locais)
**Validation**: Validacao manual por cenarios com checklist e evidencias curtas em `manual-validation/`
**Target Platform**: Web responsivo (desktop e mobile)
**Project Type**: Aplicacao web unica (UI + camada local no mesmo repositorio)
**Performance Goals**:
- Renderizacao da view de recorrencias sem jank perceptivel para volume pessoal
- Filtro de pendencias por mes/ano sem custo perceptivel adicional na abertura da view
- Fluxos de editar/excluir com feedback imediato e consistente com o historico
**Constraints**:
- Reusar componentes/handlers e eventos do historico (DRY), evitando forks de fluxo
- Sem suites de testes automatizados (constituicao), com foco em validacao manual
- Manter ids e `aria-describedby` corretos apos reposicionamento de tooltips
- Aplicar filtro de mes/ano no fuso local do dispositivo
**Scale/Scope**:
- Escopo de uso pessoal em tela `transactions?view=recurrences` e formulario de transacao
- Mudancas concentradas em `components/transactions`, `components/recurrences`, `lib/services` e `lib/ui`

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

### Pre-Phase 0 Gate Review

- ✅ Clean Code: responsabilidades separadas por camada (service, gateway, componente) e sem duplicacao de fluxo
- ✅ Intentional Simplicity: estrategia principal e reapontar comportamento para fluxos existentes do historico
- ✅ Personal-Use Value: reduz friccao de uso diario ao tornar recorrencias previsivel e visualmente consistente
- ✅ Practical Modernity: mantém stack atual (Next.js + React + Tailwind + RHF/Zod) sem nova dependencia
- ✅ No Automated Tests: validacao planejada exclusivamente por cenarios manuais documentados

### Post-Phase 1 Gate Review

- ✅ Clean Code: modelo e contrato separam filtro temporal, acao de pendencia, edicao, exclusao e acessibilidade
- ✅ Intentional Simplicity: contrato reforca reuso de fluxos existentes em vez de novas abstractions
- ✅ Personal-Use Value: decisoes priorizam rapidez operacional e clareza visual na rotina pessoal
- ✅ Practical Modernity: padroes de acessibilidade e UI atuais preservados com IDs/aria estaveis
- ✅ No Automated Tests: quickstart cobre todos os cenarios de validacao manual requeridos

## Project Structure

### Documentation (this feature)

```text
specs/022-refine-recurrences-ux/
├── plan.md
├── research.md
├── data-model.md
├── quickstart.md
├── contracts/
│   └── recurrences-refinement-contract.md
└── tasks.md
```

### Source Code (repository root)

```text
app/
├── globals.css
└── transactions/
    └── page.tsx

components/
├── recurrences/
│   ├── recurrences-page.tsx
│   └── recurrences-list.tsx
└── transactions/
    ├── transaction-form.tsx
    └── transactions-page-client.tsx

lib/
├── services/
│   ├── local-transactions-gateway.ts
│   └── recurrence-service.ts
└── ui/
    └── recurrence-tooltip-content.ts

specs/
└── 020-add-recurrences-view/
    └── tasks.md
```

**Structure Decision**: manter arquitetura de aplicacao web unica e concentrar a
feature em pontos de extensao ja existentes (service/gateway + componentes de
recorrencia/transacao), evitando criar novas rotas ou camadas adicionais.

## Phase Outputs

### Phase 0 - Research
- `research.md` com decisoes para filtro temporal local, reuso de UX/analytics do historico,
  posicionamento de tooltips, remocao de copys e alinhamento visual do grid.

### Phase 1 - Design & Contracts
- `data-model.md` com entidades de UI e regras de estado (pendencias do mes atual,
  item em edicao, tooltip accessibility link, delete telemetry parity).
- `contracts/recurrences-refinement-contract.md` com contrato de entradas/saidas
  da view refinada e invariantes de comportamento.
- `quickstart.md` com roteiro de validacao manual cobrindo todos os criterios do spec.

## Complexity Tracking

Nenhuma violacao constitucional que exija justificativa.
