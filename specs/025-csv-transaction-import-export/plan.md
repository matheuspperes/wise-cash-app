# Implementation Plan: Importacao e exportacao de transacoes via CSV

**Branch**: `025-csv-transaction-import-export` | **Date**: 2026-05-18 | **Spec**: [specs/025-csv-transaction-import-export/spec.md](specs/025-csv-transaction-import-export/spec.md)
**Input**: Feature specification from [specs/025-csv-transaction-import-export/spec.md](specs/025-csv-transaction-import-export/spec.md)

**Note**: This template is filled in by the `/speckit.plan` command. See `.specify/templates/plan-template.md` for the execution workflow.

## Summary

Entregar uma tela dedicada de dados com importacao e exportacao CSV usando um unico modelo de colunas. O parser roda no navegador, valida linha a linha, gera resumo antes da confirmacao e cria transacoes + regras de recorrencia quando aplicavel. A exportacao gera o mesmo cabecalho e pode ser reimportada sem ajuste estrutural, mantendo datas em YYYY-MM-DD e valores com ponto decimal.

## Technical Context

**Language/Version**: TypeScript 5.x, React 18, Next.js 15 App Router  
**Primary Dependencies**: Tailwind CSS, shadcn/ui, TanStack Query, React Hook Form, Zod, Dexie (IndexedDB)  
**Storage**: IndexedDB local-first via Dexie (`transactions`, `recurrenceRules`, `recurrenceInstances`, `meta`)  
**Validation**: Validacao manual orientada a cenarios com evidencias em `manual-validation/csv-transaction-import-export/`  
**Target Platform**: Web moderno (desktop/mobile) com suporte a IndexedDB
**Project Type**: Aplicacao web Next.js (single project)  
**Performance Goals**: Importacao de ate 1000 linhas validas em <= 60s; exportacao imediata sem etapa intermediaria  
**Constraints**: Parser e normalizacao no cliente; sem testes automatizados; modelo unico de CSV; sem importacao parcial silenciosa  
**Scale/Scope**: Uma nova tela de dados, servicos locais de import/export e integracao com repositorios existentes

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

- Clean Code: naming clarity, single responsibility, and readability constraints defined
- Intentional Simplicity: no speculative abstractions without explicit justification
- Personal-Use Value: feature value is direct for personal usage and low operational friction
- Practical Modernity: stack choices are current and actively maintained
- No Automated Tests: validation strategy is manual, scenario-based, and documented

Gate Assessment (Pre-Phase 0): PASS
- Clean Code: separacao entre parser CSV, normalizacao e persistencia local.
- Intentional Simplicity: fluxo client-side sem backend novo e sem passos extras.
- Personal-Use Value: reduz trabalho manual com importacao/exportacao consistente.
- Practical Modernity: stack atual do projeto sem dependencias obsoletas.
- No Automated Tests: validacao manual documentada no quickstart.

## Project Structure

### Documentation (this feature)

```text
specs/025-csv-transaction-import-export/
├── plan.md
├── research.md
├── data-model.md
├── quickstart.md
├── contracts/
│   └── csv-import-export-contract.md
└── tasks.md
```

### Source Code (repository root)

```text
app/
├── data/                          # nova tela dedicada de importacao/exportacao
└── api/
    └── export/                    # avaliar substituicao por export local

components/
├── data/                          # novos cards e preview de importacao
└── dashboard/                     # CTA unico para tela de dados

lib/
├── services/                      # import/export CSV client-side
├── validation/                    # schema e regras de validacao CSV
├── repositories/                  # transacao/recorrencia existentes
└── formatting/                    # normalizacao de data e moeda

manual-validation/
└── csv-transaction-import-export/
```

**Structure Decision**: Manter estrutura monolitica Next.js e adicionar pagina `app/data` com componentes e servicos locais de CSV, reutilizando repositorios Dexie e validacao Zod existentes.

## Phase 0: Research and Decisions

Research output: [specs/025-csv-transaction-import-export/research.md](specs/025-csv-transaction-import-export/research.md)

Topicos resolvidos:
- Contrato CSV unico com cabecalhos em PT-BR e mapeamento interno.
- Parser no navegador com suporte a campos entre aspas e separacao por virgula.
- Normalizacao de textos controlados (trim + case-insensitive) sem tolerar formatos numericos/data invalidos.
- Regra de recorrencia opcional, com dependencias obrigatorias quando ativa.
- Exportacao com mesma estrutura do template e preenchimento de recorrencia via regras existentes.

## Phase 1: Design and Contracts

Design outputs:
- Data model: [specs/025-csv-transaction-import-export/data-model.md](specs/025-csv-transaction-import-export/data-model.md)
- Contracts: [specs/025-csv-transaction-import-export/contracts/csv-import-export-contract.md](specs/025-csv-transaction-import-export/contracts/csv-import-export-contract.md)
- Quickstart/manual validation: [specs/025-csv-transaction-import-export/quickstart.md](specs/025-csv-transaction-import-export/quickstart.md)

Agent context update:
- Run `C:/apps/wise-cash-app/.specify/scripts/powershell/update-agent-context.ps1 -AgentType copilot`

## Post-Design Constitution Check

Gate Assessment (Post-Phase 1): PASS
- Clean Code: contratos e modelo de dados mantem responsabilidades separadas e claras.
- Intentional Simplicity: fluxo direto, client-side, sem novos servicos externos.
- Personal-Use Value: import/export reutilizavel reduz atrito no uso pessoal.
- Practical Modernity: stack existente e APIs atuais do navegador.
- No Automated Tests: validacao manual definida no quickstart.

## Complexity Tracking

| Violation | Why Needed | Simpler Alternative Rejected Because |
|-----------|------------|-------------------------------------|
| None | N/A | N/A |
