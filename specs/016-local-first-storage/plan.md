# Implementation Plan: Local-First Financial Storage

**Branch**: `016-local-first-storage` | **Date**: 2026-03-25 | **Spec**: `C:/apps/wise-cash-app/specs/016-local-first-storage/spec.md`
**Input**: Feature specification from `C:/apps/wise-cash-app/specs/016-local-first-storage/spec.md`

**Note**: This template is filled in by the `/speckit.plan` command. See `.specify/templates/plan-template.md` for the execution workflow.

## Summary

Migrar o armazenamento de transacoes de in-memory para persistencia local no navegador, sem backend obrigatorio nesta fase, preservando contratos atuais de payload e comportamento de UI. A estrategia adota IndexedDB via Dexie.js com schema versionado (`transactions`, `recurrenceRules`, `meta`), repositorios assincronos e adaptacao incremental da camada cliente/servicos para manter compatibilidade funcional de filtros, busca, historico completo e agregacoes do dashboard.

## Technical Context

**Language/Version**: TypeScript 5.8, React 18, Next.js 15 App Router  
**Primary Dependencies**: Dexie.js (IndexedDB wrapper), TanStack Query, React Hook Form, Zod  
**Storage**: IndexedDB local-first com schema versionado (`transactions`, `recurrenceRules`, `meta`) e isolamento por bucket de usuario/anomimo  
**Validation**: Validacao manual orientada a cenarios, com evidencias em `manual-validation/local-first-storage/`  
**Target Platform**: Web moderno (desktop/mobile) com suporte a IndexedDB
**Project Type**: Aplicacao web Next.js (single project)  
**Performance Goals**: sem regressao perceptivel de UX; leituras de dashboard e listagem devem permanecer imediatas no uso local; nenhuma chamada extra de rede para persistencia local  
**Constraints**: manter UI atual; manter tabela temporaria de `/transactions?view=new` apenas na sessao da pagina; sem fallback silencioso para memoria quando storage falhar; sem testes automatizados  
**Scale/Scope**: migracao de repositorios/servicos financeiros principais e componentes cliente de transacoes/dashboard

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

- Clean Code: naming clarity, single responsibility, and readability constraints defined
- Intentional Simplicity: no speculative abstractions without explicit justification
- Personal-Use Value: feature value is direct for personal usage and low operational friction
- Practical Modernity: stack choices are current and actively maintained
- No Automated Tests: validation strategy is manual, scenario-based, and documented

Gate Assessment (Pre-Phase 0): PASS
- Clean Code: separacao por repositorios (persistencia), servicos (regras), mapeadores (payload).
- Intentional Simplicity: migracao incremental sem reescrever UI e sem introduzir backend.
- Personal-Use Value: elimina perda de dados em refresh/reabertura, principal dor da app.
- Practical Modernity: IndexedDB + Dexie sao padrao estavel para local-first no navegador.
- No Automated Tests: plano usa roteiro de validacao manual com evidencias por fluxo.

## Project Structure

### Documentation (this feature)

```text
specs/016-local-first-storage/
├── plan.md
├── research.md
├── data-model.md
├── quickstart.md
├── contracts/
│   └── local-finance-storage-contract.md
└── tasks.md
```

### Source Code (repository root)
```text
app/
├── api/
│   ├── dashboard/summary/route.ts
│   ├── transactions/route.ts
│   └── transactions/[id]/route.ts

components/
├── dashboard/dashboard-page-client.tsx
└── transactions/
    ├── transaction-form.tsx
    └── transactions-page-client.tsx

lib/
├── repositories/
│   ├── in-memory-db.ts                # legado a ser descontinuado
│   ├── transaction-repository.ts
│   ├── monthly-summary-repository.ts
│   └── transaction-search.ts
├── services/
│   ├── transaction-service.ts
│   └── recurrence-service.ts
└── storage/
    ├── dexie-db.ts                    # novo
    ├── scoped-db.ts                   # novo
    └── local-storage-health.ts        # novo

manual-validation/
└── local-first-storage/
```

**Structure Decision**: manter estrutura monolitica Next.js, adicionando camada `lib/storage/` para Dexie e adaptando repositorios/servicos existentes com contratos assincronos para migracao incremental.

## Target Architecture

- Persistencia principal em IndexedDB via Dexie com tres stores versionados:
  - `transactions`
  - `recurrenceRules`
  - `meta`
- Isolamento por escopo de dono (`ownerScope`), com buckets:
  - usuario autenticado (`user:<id>`)
  - anonimo (`anonymous`)
- Repositorios passam de sincronos para assincronos (`Promise`) e encapsulam queries Dexie.
- Camada cliente passa a consumir repositorios locais assincronos diretamente, sem dependencia obrigatoria de backend.
- Tabela temporaria de `/transactions?view=new` permanece em estado local da pagina (nao persistida).

## Dexie Schema and Index Strategy

- `transactions`:
  - chave primaria: `id`
  - campos indexados: `[ownerScope+status+transactionDate]`, `[ownerScope+type+transactionDate]`, `[ownerScope+categoryId+transactionDate]`, `[ownerScope+status+updatedAt]`, `[ownerScope+nameNormalized]`, `[ownerScope+categoryNameNormalized]`
  - observacao: `notesNormalized` pode ser index dedicado se custo de busca justificar
- `recurrenceRules`:
  - chave primaria: `id`
  - indices: `[ownerScope+isActive]`, `[ownerScope+dayOfMonth]`
- `meta`:
  - chave primaria: `key`
  - indices: `[ownerScope+key]`
  - uso: versao de migracao, health flags, metadados de bootstrap

Trade-off de indices:
- Mais indices aceleram filtros/busca e agregacoes, mas aumentam custo de escrita.
- Estrategia inicial privilegia leitura (dashboard e historico) por ser fluxo dominante do app.

## Async Repository Contracts

- `transaction-repository` (assincrono):
  - `listTransactions(params, scope): Promise<Transaction[]>`
  - `createTransaction(tx, scope): Promise<Transaction>`
  - `findTransactionById(id, scope): Promise<Transaction | null>`
  - `updateTransaction(id, patch, scope): Promise<Transaction | null>`
  - `softDeleteTransaction(id, scope): Promise<Transaction | null>`
- `transaction-search`:
  - `searchTransactions(params, scope): Promise<Transaction[]>`
  - normalizacao para busca case-insensitive e accent-insensitive
- `monthly-summary-repository`:
  - `getMonthlySummary(months, scope): Promise<MonthlyPoint[]>`
  - `getMonthlySummaryContext(months, scope): Promise<MonthlySummaryContext>`
  - `listFullTransactionsHistoryRows(scope): Promise<...[]>`

## Impact Mapping (Files)

- `components/transactions/transactions-page-client.tsx`
  - manter UX atual; lidar com loading/error de fetch quando storage indisponivel
- `components/transactions/transaction-form.tsx`
  - manter payload/validacoes; tratar falha de persistencia com mensagem clara
- `components/dashboard/dashboard-page-client.tsx`
  - manter visualizacao e query flow; refletir dados locais persistidos sem regressao
- `lib/repositories/transaction-repository.ts`
  - substituicao do acesso a `in-memory-db` por Dexie
- `lib/repositories/transaction-search.ts`
  - busca accent-insensitive e case-insensitive
- `lib/repositories/monthly-summary-repository.ts`
  - agregacoes assicronas por `ownerScope`
- `lib/services/local-transactions-gateway.ts`
  - novo gateway cliente para CRUD/listagem local com tratamento de erro de storage
- `lib/services/local-dashboard-summary.ts`
  - novo gateway cliente para agregacoes de dashboard sem backend obrigatorio
- `lib/services/transaction-service.ts`
  - criar/editar com contratos assincronos mantendo payloads
- `lib/repositories/in-memory-db.ts`
  - descontinuacao gradual (compatibilidade de transicao)

## Incremental Migration Strategy

1. Introduzir camada Dexie (`lib/storage/*`) sem alterar UI.
2. Implementar repositorios Dexie com mesma semantica funcional dos repositorios atuais.
3. Migrar servicos para contratos assincronos e adaptar camada cliente.
4. Garantir compatibilidade de payloads nas respostas (`transaction`, `items`, aliases legados do dashboard).
5. Remover dependencia ativa de `in-memory-db` apos validacao manual completa.

Compatibilidade:
- manter shape de payloads atuais para minimizar risco no frontend.
- manter aliases de dashboard existentes durante transicao.

## Loading/Error Handling Strategy

- Loading:
  - preservar estados atuais de carregamento nas telas (query loading, fetching).
- Error:
  - quando storage indisponivel, retornar erro explicito na camada cliente e exibir mensagem amigavel no frontend.
  - bloquear leitura/escrita persistente sem fallback silencioso para memoria.
- Recovery:
  - permitir retry manual apos falha temporaria de disponibilidade de storage.

## Risks and Mitigations

- Risco: inconsistencias de busca com acentos
  - Mitigacao: normalizacao deterministica (`NFD` + remocao de diacriticos + lowercase) na indexacao e consulta.
- Risco: regressao de performance em agregacoes do dashboard
  - Mitigacao: indices compostos por `ownerScope/status/date` e agregacao incremental por mes.
- Risco: mistura de dados entre usuario autenticado e anonimo
  - Mitigacao: requisito explicito de `ownerScope` em toda operacao de repositorio.
- Risco: incompatibilidade de payload quebrar UI existente
  - Mitigacao: contratos de resposta mantidos e mapeamento de compatibilidade em rotas.
- Risco: indisponibilidade de IndexedDB em ambientes restritos
  - Mitigacao: health-check de storage e erro claro bloqueando operacoes persistentes.

## Validation Roadmap (Manual)

- Persistencia:
  - criar/editar/excluir, refresh, reabertura do navegador
- Isolamento:
  - usuario A/B e bucket anonimo sem mistura
- Consulta:
  - filtros por tipo/categoria/data (intervalo inclusivo)
  - busca por nome/categoria/notas case/accent-insensitive
- Dashboard:
  - saldo liquido, serie mensal, historico completo (ganhos/gastos), mes atual
- Resiliencia:
  - indisponibilidade de storage com bloqueio de operacoes + mensagem clara

## Phase 0: Research and Decisions

Research output: `C:/apps/wise-cash-app/specs/016-local-first-storage/research.md`

Topicos resolvidos:
- arquitetura alvo local-first com Dexie
- schema versionado e indices
- contratos de repositorio assincronos
- estrategia de migracao incremental sem quebrar UI
- tratamento de loading/error e indisponibilidade de storage

## Phase 1: Design and Contracts

Design outputs:
- Data model: `C:/apps/wise-cash-app/specs/016-local-first-storage/data-model.md`
- Contracts: `C:/apps/wise-cash-app/specs/016-local-first-storage/contracts/local-finance-storage-contract.md`
- Quickstart/manual validation: `C:/apps/wise-cash-app/specs/016-local-first-storage/quickstart.md`

Agent context update:
- Run `C:/apps/wise-cash-app/.specify/scripts/powershell/update-agent-context.ps1 -AgentType copilot`

## Post-Design Constitution Check

Gate Assessment (Post-Phase 1): PASS
- Clean Code: desenho separa storage/repositorio/servico e preserva responsabilidades.
- Intentional Simplicity: reaproveita rotas e UI existentes, mudando principalmente persistencia.
- Personal-Use Value: elimina perda de dados e melhora confiabilidade diaria.
- Practical Modernity: Dexie/IndexedDB e contratos async sao escolha atual e estavel para local-first web.
- No Automated Tests: estrategia formalizada com quickstart e evidencias manuais.

## Complexity Tracking

> **Fill ONLY if Constitution Check has violations that must be justified**

| Violation | Why Needed | Simpler Alternative Rejected Because |
|-----------|------------|-------------------------------------|
| None | N/A | N/A |
