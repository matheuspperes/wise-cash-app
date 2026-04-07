# Contract: Recurrence Monthly Processing

## Scope
Define contratos funcionais para:
- configuracao de recorrencia no formulario de novas transacoes,
- processamento mensal automatico/manual com idempotencia,
- atualizacao de dashboard/historico apos efetivacao.

## Contract 1: Form Recurrence Configuration
- Trigger `Recorrencia` MUST habilitar bloco condicional no formulario atual.
- Tipo `limited` MUST exigir `dayOfMonth` e `maxCycles` validos.
- Tipo `unlimited` MUST exigir `dayOfMonth` e `unlimitedMode` (automatic/manual).
- Troca de tipo/modo MUST limpar campos nao aplicaveis.
- Salvamento sem recorrencia MUST permanecer inalterado.

## Contract 2: Monthly Cycle Resolution
- Regra limited MUST iniciar contagem no proximo ciclo mensal completo.
- Regra unlimited (automatic/manual) MUST manter projecao ate o ultimo mes do ano corrente ou 1 ano a partir da data atual, o que for maior.
- Politica de fallback dia 29/30/31 MUST usar ultimo dia valido do mes alvo.
- Regra inactive MUST nao gerar novos ciclos.

## Contract 3: Manual Pending Flow
- Unlimited manual MUST criar 1 pendencia por ciclo mensal (`ruleId + monthRef`).
- Pendencias de ciclos anteriores MUST permanecer ate tratamento explicito.
- Desativacao de regra MUST manter pendencias existentes e bloquear novas.
- Confirmacao de pendencia MUST efetivar transacao e atualizar status da instancia.
- Cancelamento de pendencia MUST marcar estado terminal no ciclo atual e impedir recriacao no mesmo `monthRef`.
- Em acoes concorrentes de confirmacao/cancelamento para a mesma pendencia, MUST prevalecer a primeira acao terminal persistida.

## Contract 4: Idempotency and Duplication Guard
- Processamento mensal MUST ser idempotente por (`ruleId`, `monthRef`).
- Reentrada no app no mesmo mes MUST nao duplicar transacao/pendencia do ciclo.
- Edicao de regra ativa MUST afetar apenas ciclos futuros.
- Instancias pendentes existentes MUST manter snapshot original.
- Regra recorrente MUST permanecer independente da transacao base apos criacao; edicao/remocao da transacao original MUST NOT desativar regra automaticamente.

## Contract 5: Aggregates and Views
- Dashboard e historico MUST considerar apenas transacoes efetivadas.
- Pendencias manuais MUST nao impactar totais ate confirmacao.
- Apos efetivacao, atualizacao de listagens e agregados MUST ocorrer com persistencia confirmada.
- Tela inicial MUST exibir lista de pendencias de recorrencia entre grafico e tabela de transacoes.
- Cada item pendente MUST expor acoes `Confirmar` e `Cancelar`.

## Type-Level Contract (logical)

### RecurrenceInput
- enabled: boolean
- dayOfMonth?: 1..31 (required if enabled)
- recurrenceType?: limited | unlimited (required if enabled)
- maxCycles?: integer > 0 (required if recurrenceType=limited)
- unlimitedMode?: automatic | manual (required if recurrenceType=unlimited)

### ProcessCycleResult
- monthRef: YYYY-MM
- generatedTransactions: number
- generatedPendings: number
- skippedByIdempotency: number
- deactivatedRulesIgnored: number

### ProjectionWindow
- horizonStart: YYYY-MM
- horizonEnd: YYYY-MM
- reason: end_of_year | one_year_minimum
