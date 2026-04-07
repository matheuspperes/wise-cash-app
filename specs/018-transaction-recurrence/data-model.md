# Data Model: Recorrencia Mensal em Novas Transacoes

## Entity: Transaction
- Description: Lancamento efetivado que impacta dashboard e historico.
- Fields relevantes:
  - id: string
  - ownerScope: string
  - name, type, categoryId/categoryName, amount, transactionDate
  - recurrenceRuleId: string | null
  - source: manual | recurrence_generated
  - status: active | deleted
- Rules:
  - So transacoes efetivadas participam de agregados.
  - `source=recurrence_generated` identifica origem automatica/confirmada.

## Entity: RecurrenceRule
- Description: Regra de recorrencia mensal vinculada ao cadastro base.
- Fields:
  - id: string
  - ownerScope: string
  - dayOfMonth: 1..31
  - recurrenceType: limited | unlimited
  - unlimitedMode: automatic | manual | null
  - maxCycles: number | null (obrigatorio em limited)
  - generatedCycles: number
  - lastProcessedMonthRef: string | null (YYYY-MM)
  - projectionUntilMonthRef: string | null (YYYY-MM)
  - isActive: boolean
  - createdAt, updatedAt
- Rules:
  - Limited inicia no proximo ciclo mensal completo.
  - Limited encerra ao atingir `maxCycles`.
  - Unlimited processa por projecao mensal idempotente ate o ultimo mes do ano ou 1 ano a partir do mes corrente (o que for maior).
  - `projectionUntilMonthRef` registra o limite de projecao mais recente para evitar recalculo ambiguo.

## Entity: RecurrenceInstance (optional)
- Description: Ocorrencia mensal por ciclo para suporte ao modo manual e idempotencia.
- Fields:
  - id: string
  - ownerScope: string
  - recurrenceRuleId: string
  - monthRef: string (YYYY-MM)
  - status: pending | confirmed | skipped | canceled
  - dueDate: string (YYYY-MM-DD)
  - snapshot: { name, type, categoryId, categoryName, amount, notes }
  - transactionId: string | null
  - createdAt, updatedAt
- Rules:
  - Unicidade logica por (`recurrenceRuleId`, `monthRef`).
  - Em modo manual, cria uma instancia pendente por ciclo.
  - Instancias `pending` devem ser listadas na dashboard para acao explicita de Confirmar/Cancelar.
  - A primeira transicao terminal persistida (`confirmed` ou `canceled`) deve bloquear mudancas posteriores no mesmo ciclo.
  - Edicao da regra nao altera snapshot de instancias ja criadas.

## Relationships
- `RecurrenceRule` 1:N `Transaction` (por `recurrenceRuleId`) para efetivadas.
- `RecurrenceRule` 1:N `RecurrenceInstance` por ciclos mensais.
- `RecurrenceInstance` 0:1 `Transaction` apos confirmacao manual.

## State Transitions
1. Rule lifecycle:
   - active -> inactive (sem novos ciclos)
   - inactive -> active (retoma ciclos futuros)
  - regra permanece ativa mesmo com remocao/edicao da transacao base, ate acao explicita sobre a propria regra
2. Unlimited manual instance:
   - pending -> confirmed (gera/e associa transaction)
  - pending -> canceled (nao efetiva no ciclo)
  - confirmed/canceled -> terminal (sem mudanca adicional no mesmo ciclo)
3. Limited rule:
   - active + generatedCycles < maxCycles -> processa proximo ciclo
   - generatedCycles == maxCycles -> no-op para novos ciclos

## Legacy Compatibility
- Base existente sem `projectionUntilMonthRef` deve ser tratada como `null` e migrada sem perda de dados.
- Regras antigas sem `unlimitedMode` explicito devem manter comportamento compativel com os dados ja persistidos.
- Migracao nao deve recriar transacoes historicas nem gerar pendencias retroativas indevidas.
