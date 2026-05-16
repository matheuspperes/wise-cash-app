# Quickstart - Corrigir Datas Civis de Recorrencias

## 1. Objetivo
Validar manualmente que transacoes, recorrencias e listas de apoio preservam a mesma data civil escolhida pelo usuario, sem deslocamento por timezone.

## 2. Preparacao
1. Iniciar o app local.
2. Abrir o navegador em pelo menos dois timezones diferentes, ou simular um timezone negativo e outro positivo se possivel.
3. Ter uma transacao de teste com data `01/05/2026`.
4. Ter uma recorrencia de teste com dia 3 e outra com dia 31.

## 3. Cenarios de validacao manual

### Cenario A - Transacao civil sem deslocamento
1. Criar uma transacao com data `01/05/2026`.
2. Confirmar na lista, no detalhe e no armazenamento persistido que a data permanece `01/05/2026`.
3. Reabrir a mesma transacao em outro timezone.
4. Confirmar que a data continua sendo `01/05/2026`, sem virar `30/04/2026`.

### Cenario B - Recorrencia ilimitada no dia 3
1. Criar uma recorrencia ilimitada com dia 3.
2. Confirmar que o proximo vencimento exibido continua sendo dia 3.
3. Confirmar que a geracao de ocorrencias pendentes e a tela de recorrencias exibem a mesma data civil.

### Cenario C - Mes curto e ultimo dia util
1. Criar uma recorrencia com dia 31 em um mes com 30 dias.
2. Confirmar que o vencimento cai no ultimo dia civil do mes.
3. Reabrir a regra e confirmar que o dia informado original continua visivel como 31, com o vencimento resolvido de forma consistente.

### Cenario D - Historico, filtros e agrupamentos
1. Abrir o historico completo e validar os labels de mes.
2. Confirmar que filtros e agrupamentos mensais continuam consistentes depois da correcao.
3. Confirmar que nao ha mudanca indevida no mes exibido por conta de parsing de strings civis.

### Cenario E - Revisao de implementacao
1. Inspecionar os pontos alterados no codigo.
2. Confirmar que nao foram adicionadas novas conversoes `new Date("YYYY-MM-DD")` para datas civis.

## 4. Evidencias recomendadas
- Captura da transacao `01/05/2026` exibida de forma idêntica em dois timezones.
- Captura da recorrencia ilimitada com dia 3 preservada de ponta a ponta.
- Captura do vencimento ajustado para o ultimo dia do mes em uma recorrencia com dia 31.
- Anotacao curta da inspeção de codigo sem novas conversoes civis via `Date`.

## 5. Criterio de conclusao
Feature aprovada quando os cenarios A-E passam sem regressao e sem introduzir nova conversao timezone-sensitiva para datas civis.
