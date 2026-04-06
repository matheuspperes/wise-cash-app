# Implementation Plan: Recorrencia de Transacoes

**Branch**: `018-transaction-recurrence` | **Date**: 2026-04-05 | **Spec**: `/specs/018-transaction-recurrence/spec.md`
**Input**: Feature specification from `/specs/018-transaction-recurrence/spec.md`

**Note**: This template is filled in by the `/speckit.plan` command. See `.specify/templates/plan-template.md` for the execution workflow.

## Summary

Implementar recorrencia mensal no cadastro de novas transacoes com tipos limited e unlimited, incluindo modo automatic/manual, validacoes condicionais, idempotencia por ciclo e impacto consistente em dashboard/historico. A abordagem tecnica usa evolucao incremental de contratos locais (Dexie/IndexedDB), projecao mensal para regras unlimited (horizonte dinamico), instancia mensal opcional para pendencias manuais e reconciliacao na carga da tela inicial e apos manutencao de regra.

## Technical Context

**Language/Version**: TypeScript 5.x, React 18, Next.js 15 (App Router)  
**Primary Dependencies**: Dexie (IndexedDB), React Hook Form, Zod, TanStack Query  
**Storage**: Local-first IndexedDB (Dexie): transactions, recurrenceRules, recurrenceInstances (novo), meta  
**Validation**: Validacao manual orientada a cenario com evidencias em `manual-validation/transaction-recurrence/*.md`  
**Target Platform**: Web app browser moderno (desktop/mobile) com persistencia local
**Project Type**: Aplicacao web full-stack (Next.js) com logica de dominio local no cliente  
**Performance Goals**: Reconciliacao sem duplicidade por ciclo e refresh perceptivel em ate 1 ciclo de atualizacao da UI  
**Constraints**: Sem testes automatizados; manter simplicidade; sem background job; compatibilidade com base legada local  
**Scale/Scope**: Escopo de feature unica no fluxo de novas transacoes, dashboard e historico

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

- Clean Code: naming clarity, single responsibility, and readability constraints defined
- Intentional Simplicity: no speculative abstractions without explicit justification
- Personal-Use Value: feature value is direct for personal usage and low operational friction
- Practical Modernity: stack choices are current and actively maintained
- No Automated Tests: validation strategy is manual, scenario-based, and documented

Gate status before Phase 0: PASS
- Clean Code: contratos e servicos focados em responsabilidade unica (formulario, motor de recorrencia, agregados).
- Intentional Simplicity: sem introducao de infraestrutura externa; processamento local e idempotente.
- Personal-Use Value: reduz lancamentos repetitivos e melhora controle de pendencias.
- Practical Modernity: stack e bibliotecas ativas no ecossistema atual do projeto.
- No Automated Tests: estrategia manual definida em quickstart e tasks.

## Project Structure

### Documentation (this feature)

```text
specs/018-transaction-recurrence/
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
├── api/
├── dashboard/
└── transactions/

components/
├── dashboard/
└── transactions/

lib/
├── repositories/
├── services/
├── storage/
└── validation/

manual-validation/
└── transaction-recurrence/

specs/
└── 018-transaction-recurrence/
```

**Structure Decision**: Feature implementada no monorepo web atual (Next.js) com mudancas concentradas em formulario de transacoes, servicos locais de recorrencia, storage Dexie e componentes de dashboard, mantendo validacao manual em pasta dedicada.

## Phase 0: Research Output

Arquivo gerado: `/specs/018-transaction-recurrence/research.md`

Resumo das decisoes:
- Evoluir `RecurrenceRuleRecord` sem ruptura de arquitetura local-first.
- Introduzir `RecurrenceInstance` para modo manual com snapshot imutavel.
- Adotar projecao mensal idempotente para unlimited sem gatilho de primeiro acesso.
- Aplicar fallback de dia 29/30/31 para ultimo dia valido do mes alvo.
- Garantir idempotencia por chave logica (`ruleId`, `monthRef`).
- Atualizar agregados apenas com transacoes efetivadas.

Pendencias de clarificacao: nenhuma.

## Phase 1: Design & Contracts Output

Arquivos gerados/atualizados:
- `/specs/018-transaction-recurrence/data-model.md`
- `/specs/018-transaction-recurrence/contracts/recurrence-monthly-contract.md`
- `/specs/018-transaction-recurrence/quickstart.md`

Escopo de design consolidado:
- Entidades: `Transaction`, `RecurrenceRule`, `RecurrenceInstance`.
- Estados terminais de pendencia no ciclo (`confirmed` ou `canceled`) com regra first terminal action wins.
- Regra recorrente independente da transacao base apos criacao.
- Compatibilidade de storage legado para novos campos (`projectionUntilMonthRef`, `unlimitedMode`) sem recriar historico.
- UX da dashboard com lista de pendencias entre grafico e tabela e acoes Confirmar/Cancelar.

## Constitution Check (Post-Design)

Gate status after Phase 1: PASS
- Clean Code: separacao entre UI, contratos e servicos permanece clara.
- Intentional Simplicity: sem filas, cron ou backend adicional; fluxo local idempotente.
- Personal-Use Value: automacao mensal + controle manual de pendencias atende uso diario.
- Practical Modernity: nenhuma dependencia obsoleta adicionada ao desenho.
- No Automated Tests: plano e quickstart mantem validacao manual obrigatoria com evidencias.

## Complexity Tracking

Nenhuma violacao de constituicao identificada. Nao ha complexidade extra que exija justificativa.
