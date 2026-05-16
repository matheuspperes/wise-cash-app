# Manual Validation: US1 - Datas Civis Sem Deslocamento

## Objetivo
Validar que transacoes e recorrencias mantem a mesma data civil `YYYY-MM-DD` sem deslocamento por timezone.

## Checklist
- [ ] Criar recorrencia com dia 17 e salvar.
- [ ] Reabrir e confirmar que o dia permanece 17.
- [ ] Criar recorrencia com dia 31.
- [ ] Validar vencimento em mes com 30 dias resolve para o ultimo dia do mes.
- [ ] Confirmar no console/DevTools que nao ha conversoes implicitas de UTC.

## Evidencias
- Screenshot: dia 17 persistido e reaberto
- Screenshot: dia 31 ajustado para 30 em fevereiro

## Observacoes
- Implementacao usa aritmetica pura em `shiftMonthRef()` e `getLastDayOfMonth()`
- Nao ha uso de `new Date(year, month, day)` construtores
