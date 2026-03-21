# Implementation Plan: Gestao Financeira Mensal Simples

**Branch**: `001-monthly-finance-manager` | **Date**: 2026-03-21 | **Spec**: `/specs/001-monthly-finance-manager/spec.md`
**Input**: Feature specification from `/specs/001-monthly-finance-manager/spec.md`

## Summary

Construir um app web financeiro mensal com foco em entrada rapida de transacoes,
busca/filtros em ate tres cliques e dashboard historico claro em pt-BR.
Tecnicamente, a implementacao usa Next.js App Router + Tailwind + Shadcn/UI,
persistencia em Supabase/PostgreSQL, cache/sincronizacao via TanStack Query,
graficos em Recharts e deploy em Vercel. A V1 opera sem autenticacao ativa,
com exportacao manual CSV/JSON e validacao manual orientada a cenarios.

## Technical Context

**Language/Version**: TypeScript 5.x + React 18 + Next.js App Router (Next.js 15.x)
**Primary Dependencies**: Next.js, Tailwind CSS, Shadcn/UI, TanStack Query, Supabase JS, Recharts
**Storage**: Supabase PostgreSQL (normalizacao simples para transacoes/recorrencias/categorias)
**Validation**: Validacao manual por cenarios documentados em `quickstart.md` (sem testes automatizados)
**Target Platform**: Web responsivo (desktop/mobile), deploy Vercel
**Project Type**: Web application full-stack em monorepo unico Next.js
**Performance Goals**:
- Cadastro de transacao concluivel em ate 20s para 90% dos casos
- Busca com retorno efetivo em ate 3 cliques/toques em 95% dos casos
- Dashboard inicial compreensivel em <10s para 85% dos usuarios-alvo
**Constraints**:
- Interface integralmente em pt-BR, moeda BRL e data local brasileira
- V1 sem login ativo; autenticacao futura deve ser acoplavel
- V1 sem importacao de dados; apenas exportacao manual CSV/JSON
- Dados em repouso sem criptografia aplicada no nivel da aplicacao na V1
- Sem testes automatizados por constituicao
**Scale/Scope**:
- Uso pessoal na V1 (sessao unica por ambiente)
- Historico alvo de ate 120 meses sem perda perceptivel de fluidez no dashboard

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

### Pre-Phase 0 Gate Review

- ✅ Clean Code: modelagem separada por dominio (Transaction, Category, RecurrenceRule, agregados)
- ✅ Intentional Simplicity: arquitetura unica Next.js, sem separacao prematura frontend/backend
- ✅ Personal-Use Value: priorizacao de velocidade de registro, busca rapida e leitura imediata
- ✅ Practical Modernity: stack atual e mantida (Next.js/Supabase/TanStack/Vercel)
- ✅ No Automated Tests: estrategia declarada de validacao manual e evidencias em quickstart

### Post-Phase 1 Gate Review

- ✅ Clean Code: contratos e modelo de dados com responsabilidades claras e terminologia consistente
- ✅ Intentional Simplicity: exportacao sem importacao na V1 reduz complexidade inicial
- ✅ Personal-Use Value: decisoes de V1 minimizam friccao (sem login, UX direta)
- ✅ Practical Modernity: contrato API pronto para evolucao de auth sem retrabalho estrutural
- ✅ No Automated Tests: artefatos de design e execucao mantem apenas fluxo de validacao manual

## Project Structure

### Documentation (this feature)

```text
specs/001-monthly-finance-manager/
├── plan.md
├── research.md
├── data-model.md
├── quickstart.md
├── contracts/
│   └── api-contract.md
└── tasks.md
```

### Source Code (repository root)

```text
app/
├── (dashboard)/
├── transactions/
├── api/
│   ├── transactions/
│   ├── dashboard/
│   └── export/
└── layout.tsx

components/
├── ui/
├── dashboard/
└── transactions/

lib/
├── supabase/
├── query/
├── validation/
└── formatting/

manual-validation/
└── monthly-finance-manager/
```

**Structure Decision**: Estrutura unica Next.js App Router com rotas API internas.
Essa organizacao maximiza simplicidade operacional para uso pessoal e preserva
evolucao futura para multiplos usuarios sem cisao prematura de repositorio.

## Phase Outputs

### Phase 0 - Research
- `research.md` criado com decisoes de stack, recorrencia, precisao monetaria,
  politica de exportacao e qualidade sem testes automatizados.

### Phase 1 - Design & Contracts
- `data-model.md` criado com entidades, relacionamentos, regras de validacao e transicoes.
- `contracts/api-contract.md` criado com interfaces externas da V1.
- `quickstart.md` criado com setup e roteiro de validacao manual.

## Complexity Tracking

Nenhuma violacao constitucional que exija justificativa.
