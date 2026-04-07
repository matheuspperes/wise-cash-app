# Validacao Manual - Ciclos Limited

## Objetivo
Validar inicio no proximo ciclo e encerramento ao atingir maxCycles.

## Cenarios
- [ ] Criar transacao com recorrencia `limited`, `dayOfMonth=10` e `maxCycles=3`.
- [ ] Abrir dashboard e confirmar que a primeira ocorrencia recorrente inicia em `mes seguinte` ao da criacao da regra.
- [ ] Reexecutar reconciliacao (reabrindo dashboard) e confirmar que nao ocorre duplicidade por ciclo ja projetado.
- [ ] Confirmar que existem exatamente 3 ocorrencias geradas para a regra.
- [ ] Confirmar que, apos atingir 3 ciclos, nao ha nova geracao em ciclos seguintes.
- [ ] Verificar no storage local (IndexedDB) que a regra limited foi marcada inativa ao atingir `generatedCycles == maxCycles`.

## Resultado
- Status: Checklist refinado
- Evidencias:
	- Data da execucao:
	- IDs da regra/transacoes avaliadas:
	- Mes inicial esperado vs observado:
	- Quantidade final de ocorrencias observada:
	- Observacoes:
