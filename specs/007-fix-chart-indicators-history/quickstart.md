# Quickstart: Ajuste de Grafico e Historico Completo

## Objective
Aplicar ajustes eficientes de grafico e ampliar leitura de gastos em Transacoes:
1. Corrigir posicao dos labels de mes na base do grafico.
2. Ajustar espacamento entre "Historico mensal" e legenda.
3. Tornar labels verticais do eixo Y dinamicos, intuitivos e sem repeticao.
4. Adicionar secao de historico completo de gastos em Transacoes, agrupada por mes em acordeao.

## Implementation Steps
1. Ajuste o layout do grafico para afastar labels de mes da borda inferior (tickMargin/margens do chart).
2. Recalibre espacamento entre titulo e legenda com ajuste de margem/padding para eliminar distancia desnecessaria.
3. Implemente perfil dinamico do eixo Y: dominio com maximo+folga e distribuicao adaptativa de ticks para evitar labels repetidos.
4. Preserve o bloco atual de lancamentos em Transacoes e adicione uma nova secao dedicada para historico completo de gastos.
5. Monte grupos mensais em acordeao (fechados por padrao), com colunas Data, Descricao, Categoria e Valor.
6. Aplique ordenacao por data desc dentro de cada grupo mensal e ordem de grupos do mais recente para o mais antigo.
7. Garanta estado vazio claro quando nao houver gastos no historico.

## Manual Validation
1. Validar dashboard em desktop/mobile: labels de mes sem colisao na borda inferior.
2. Validar espacamento entre titulo e legenda: sem gap excessivo e sem sobreposicao.
3. Validar eixo Y em cenarios de baixa/alta amplitude e ponto unico: sem repeticao redundante de labels.
4. Abrir Transacoes a partir da dashboard e por acesso direto: nova secao mensal deve existir em ambos os casos.
5. Confirmar coexistencia sem regressao entre listagem atual e nova secao de historico mensal.
6. Confirmar acordeoes mensais fechados por padrao e expansao funcional.
7. Confirmar colunas e ordenacao por data desc dentro de cada mes.
8. Confirmar estado vazio da secao mensal quando nao houver gastos.

## Evidence Artifacts
Registrar evidencias em:
- manual-validation/fix-chart-indicators-history/us1-chart-legibility.md
- manual-validation/fix-chart-indicators-history/us2-full-history-table.md
- manual-validation/fix-chart-indicators-history/us3-consistency.md
- manual-validation/fix-chart-indicators-history/regression-summary.md
