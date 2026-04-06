# Validacao Manual - Fallback de Dia 29/30/31

## Objetivo
Validar politica de fallback para ultimo dia valido do mes alvo.

## Cenarios
- [ ] Configurar regra com `dayOfMonth=31` e validar ocorrencia em mes de 30 dias (esperado: dia 30).
- [ ] Configurar regra com `dayOfMonth=31` e validar fevereiro em ano nao bissexto (esperado: dia 28).
- [ ] Configurar regra com `dayOfMonth=30` e validar fevereiro em ano nao bissexto (esperado: dia 28).
- [ ] Quando aplicavel, validar fevereiro em ano bissexto (esperado: dia 29 para regra 30/31).
- [ ] Confirmar que o fallback nao altera mes de referencia (`monthRef`) e apenas ajusta `dueDate`.
- [ ] Confirmar ausencia de erro bloqueante durante criacao/processamento da recorrencia.

## Resultado
- Status: Checklist refinado
- Evidencias:
	- Data da execucao:
	- Casos avaliados (mes/ano):
	- Datas esperadas vs observadas:
	- Observacoes:
