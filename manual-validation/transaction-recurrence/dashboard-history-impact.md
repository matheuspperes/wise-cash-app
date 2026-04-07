# Validacao Manual - Impacto em Dashboard e Historico

## Objetivo
Validar reflexo de transacoes efetivadas em agregados e historico.

## Cenarios
- [ ] Criar regra `unlimited manual` e confirmar que item pendente aparece na lista sem alterar totais do dashboard.
- [ ] Confirmar pendencia pela lista da tela inicial e validar inclusao no historico de transacoes.
- [ ] Cancelar pendencia diferente e validar que nao entra nos agregados nem no historico efetivado.
- [ ] Validar contrato de refresh: apos Confirmar/Cancelar, resumo mensal e historico devem refletir estado persistido em ate 1 ciclo de invalidacao + recarga.
- [ ] Validar consistencia de origem recorrente (`source=recurrence_generated`) no historico exibido.

## Resultado
- Status: Checklist refinado
- Evidencias:
	- Data da execucao:
	- IDs das pendencias avaliadas:
	- Comportamento antes/depois (dashboard/historico):
	- Tempo/percepcao de refresh:
	- Observacoes:
