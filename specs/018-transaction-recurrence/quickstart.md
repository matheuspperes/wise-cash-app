# Quickstart: Recorrencia Mensal em Novas Transacoes

## Goal
Entregar recorrencia mensal com limited/unlimited, modo automatic/manual, idempotencia por ciclo e consistencia de dashboard/historico sem regressao no fluxo atual.

## Preconditions
- Aplicacao inicia localmente com IndexedDB habilitado.
- Fluxo atual de criacao de transacao funciona sem recorrencia.
- Ambiente possui dados suficientes para visualizar historico e dashboard.

## Implementation Sequence
1. Evoluir tipos de dominio (`RecurrenceRule`, `RecurrenceInstance`) e contratos de entrada.
2. Atualizar validacao Zod + RHF para regras condicionais de recorrencia.
3. Integrar UI do formulario com trigger `Recorrencia` e blocos expansivos condicionais.
4. Implementar processamento idempotente de projecao para limited/unlimited com horizonte dinamico.
5. Implementar criacao e confirmacao de pendencias para unlimited manual.
6. Garantir fallback de dia 29/30/31 para ultimo dia valido do mes alvo.
7. Adicionar lista de pendencias na tela inicial entre grafico e tabela com acoes Confirmar/Cancelar.
8. Integrar refresh de dashboard/historico apenas apos efetivacao/cancelamento persistido.
9. Validar desativacao/edicao de regra sem reescrita retroativa de pendencias.
10. Validar compatibilidade/migracao do storage legado em base existente.

## Manual Validation Scenarios
1. Configuracao no formulario:
   - Ativar/desativar `Recorrencia`.
   - Alternar limited/unlimited e validar campos condicionais.
   - Confirmar que sem recorrencia o fluxo antigo permanece intacto.
2. Limited:
   - Criar regra limited com `maxCycles=3`.
   - Validar inicio no proximo mes.
   - Validar encerramento apos 3 ciclos.
3. Unlimited projection:
   - Criar regra ativa.
   - Validar projecao ate o ultimo mes do ano ou 1 ano (o que for maior).
   - Reexecutar processamento e validar ausencia de duplicidade por ciclo.
4. Unlimited manual:
   - Criar regra manual e validar 1 pendencia por ciclo.
   - Acumular pendencias por meses sem confirmacao.
   - Confirmar e cancelar pendencias na lista da tela inicial, validando reflexo em dashboard/historico.
   - Validar que, no mesmo ciclo, a primeira acao terminal persistida vence e bloqueia alteracao posterior.
5. Fallback de dia:
   - Configurar dia 31 e validar meses com 30, 29 e 28 dias.
6. Desativacao e edicao:
   - Desativar regra manual e validar manutencao de pendencias antigas sem criar novas.
   - Editar regra ativa e validar que pendencias antigas preservam snapshot.
   - Editar/remover transacao base e validar que a regra recorrente permanece ativa ate alteracao explicita da propria regra.

## Evidence Files
- `manual-validation/transaction-recurrence/form-conditional-validation.md`
- `manual-validation/transaction-recurrence/limited-recurrence-cycles.md`
- `manual-validation/transaction-recurrence/unlimited-automatic-idempotency.md`
- `manual-validation/transaction-recurrence/unlimited-manual-pending-confirmation.md`
- `manual-validation/transaction-recurrence/day-fallback-29-30-31.md`
- `manual-validation/transaction-recurrence/dashboard-history-impact.md`
- `manual-validation/transaction-recurrence/legacy-storage-compatibility.md`
- `manual-validation/transaction-recurrence/quickstart-signoff.md`

## Execucao Atual (2026-04-06)
- Implementacao tecnica principal concluida para US1, US2 e US3, incluindo reconciliacao, projecao, pendencias manuais e acoes de Confirmar/Cancelar na dashboard.
- Regra de edicao aplicada somente para ciclos futuros implementada em `lib/services/recurrence-service.ts`.
- Verificacao automatizada concluida:
   - `npm run lint` sem erros.
   - `npm run build` com sucesso.
- Validacoes manuais por cenario permanecem obrigatorias para encerramento total da feature.
