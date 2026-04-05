# Implementation Plan: Correcoes de Portugues e Acoes no Historico

**Branch**: `017-fix-pt-categories-actions` | **Date**: 2026-04-02 | **Spec**: `C:\apps\wise-cash-app\specs\017-fix-pt-categories-actions\spec.md`
**Input**: Feature specification from `C:\apps\wise-cash-app\specs\017-fix-pt-categories-actions\spec.md`

## Summary

Implementar tres melhorias integradas no fluxo financeiro local-first: correcao de categorias em portugues (incluindo registros historicos ja existentes), acao de limpeza total dos dados funcionais locais em todos os escopos (usuario e anonimo), e coluna de acoes no historico completo com edicao via drawer lateral e remocao com confirmacao rapida/soft delete. Toda atualizacao visual de historico e dashboard ocorrera somente apos persistencia local confirmada para manter consistencia.

## Technical Context

**Language/Version**: TypeScript 5.x, React 18, Next.js 15 (App Router)  
**Primary Dependencies**: TanStack Query, React Hook Form, Zod, Dexie, lucide-react  
**Storage**: IndexedDB (Dexie) com dados locais funcionais (transactions, recurrenceRules, meta)  
**Validation**: Validacao manual documentada em `manual-validation/` (sem testes automatizados)  
**Target Platform**: Navegadores modernos (desktop/mobile) com suporte a IndexedDB
**Project Type**: Aplicacao web single-project (frontend + API routes no mesmo repositorio)  
**Performance Goals**: Atualizacao percebida imediata apos persistencia confirmada; drawer e tabela responsivos em uso comum  
**Constraints**: Sem fallback silencioso de persistencia; manter UI consistente com design atual; manter soft delete; sem testes automatizados  
**Scale/Scope**: Fluxos de dashboard e historico de transacoes locais em uso pessoal

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

- Clean Code: PASS - mudancas separadas por camada (UI, servicos, repositorios), nomes orientados ao dominio.
- Intentional Simplicity: PASS - reutiliza contratos locais existentes e evita novas camadas desnecessarias.
- Personal-Use Value: PASS - corrige linguagem, melhora manutencao de dados e oferece reset total rapido.
- Practical Modernity: PASS - usa stack atual (Next.js/React/Dexie/lucide-react) sem dependencias obsoletas.
- No Automated Tests: PASS - validacao prevista apenas por cenarios manuais com evidencias.

## Project Structure

### Documentation (this feature)

```text
specs/017-fix-pt-categories-actions/
├── plan.md
├── research.md
├── data-model.md
├── quickstart.md
├── contracts/
│   └── history-actions-and-reset-contract.md
└── tasks.md
```

### Source Code (repository root)

```text
app/
├── api/
│   ├── dashboard/summary/route.ts
│   ├── export/route.ts
│   └── transactions/route.ts

components/
├── dashboard/
│   ├── dashboard-header.tsx
│   └── dashboard-page-client.tsx
└── transactions/
    ├── monthly-expense-history-accordion.tsx
    ├── transaction-filters.tsx
    ├── transaction-form.tsx
    └── transactions-page-client.tsx

lib/
├── repositories/
│   ├── transaction-repository.ts
│   ├── transaction-search.ts
│   └── monthly-summary-repository.ts
├── services/
│   ├── local-transactions-gateway.ts
│   ├── local-dashboard-summary.ts
│   ├── transaction-service.ts
│   └── recurrence-service.ts
├── storage/
│   └── dexie-db.ts
└── ui/
    └── transaction-category-presets.ts

manual-validation/
└── fix-pt-categories-actions/
```

**Structure Decision**: Manter arquitetura atual Next.js monolitica e implementar o recurso nas camadas ja existentes (UI, gateways locais, repositorios Dexie), evitando bifurcacao de estrutura.

## Phase 0: Research Focus

- Definir estrategia de normalizacao/correcao de categorias para registros historicos sem exigir migracao destrutiva.
- Definir contrato de limpeza total cobrindo todos os escopos locais e stores funcionais.
- Definir padrao de atualizacao nao-otimista (somente apos persistencia) para tabela, acordeao, cards e grafico.

## Phase 1: Design Focus

- Modelar entidades de edicao no drawer e estado de UI associado.
- Definir contratos de interacao para a coluna de acoes (editar/remover) e reset completo de dados.
- Definir roteiro manual objetivo para validar consistencia pos-edicao/remocao/limpeza.

## Post-Design Constitution Check

- Clean Code: PASS - design separa regras de dados, interacao e apresentacao.
- Intentional Simplicity: PASS - sem introduzir infraestrutura extra.
- Personal-Use Value: PASS - ganho direto de usabilidade e controle de dados.
- Practical Modernity: PASS - sem mudanca de stack; uso de componentes e icones atuais.
- No Automated Tests: PASS - quickstart e tarefas focados em validacao manual.

## Complexity Tracking

> **Fill ONLY if Constitution Check has violations that must be justified**

| Violation | Why Needed | Simpler Alternative Rejected Because |
|-----------|------------|-------------------------------------|
| None | N/A | N/A |
