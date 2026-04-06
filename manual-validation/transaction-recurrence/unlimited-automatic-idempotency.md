# Validacao Manual - Unlimited Automatico e Idempotencia

## Objetivo
Validar projecao unlimited e guarda de idempotencia por ciclo.

## Cenarios
- [ ] Criar transacao com recorrencia `unlimited` em modo `automatic`.
- [ ] Capturar `mes atual` e calcular horizonte esperado: `max(fim do ano, +12 meses do mes atual)`.
- [ ] Confirmar que as ocorrencias foram projetadas ate o horizonte esperado.
- [ ] Reabrir dashboard (disparando nova reconciliacao) e confirmar que a contagem de ocorrencias nao aumenta para meses ja processados.
- [ ] Confirmar unicidade logica por ciclo (`ruleId + monthRef`) sem duplicatas no historico.
- [ ] Simular avanco de referencia temporal (quando aplicavel) e confirmar extensao da janela de projecao.

## Resultado
- Status: Checklist refinado
- Evidencias:
	- Data da execucao:
	- Regra avaliada (id):
	- Horizonte esperado vs observado:
	- Contagem antes/depois da reentrada:
	- Observacoes:
