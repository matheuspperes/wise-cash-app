# Quickstart: Refinar Legenda, Saldo Historico e Tabela Mensal

## Objective
Aplicar ajustes visuais e de dados na dashboard com foco em leitura:
1. Reposicionar legenda de Receitas e Despesas acima do grafico, alinhada a direita e fora da area de plotagem.
2. Reduzir hierarquia do card Saldo liquido historico (desktop ~70% da largura atual, mobile full width empilhado) mantendo lado direito.
3. Adaptar tabela mensal para exibir transacoes ativas do mes atual (receitas e despesas), com colunas e ordenacao definidas.

## Implementation Steps
1. Ajustar container do grafico para suportar legenda acima do plot area sem sobreposicao de dados.
2. Reposicionar legenda para alinhamento right fora da area de plotagem e validar comportamento em desktop/mobile.
3. Ajustar composicao dos cards de resumo para manter o card historico no lado direito com menor destaque no desktop.
4. Garantir largura total do card historico em mobile quando o layout estiver empilhado.
5. Substituir fonte/escopo da tabela mensal para transacoes ativas com transactionDate no mes atual.
6. Exibir colunas Data, Descricao, Categoria, Tipo e Valor e aplicar ordenacao date-desc.
7. Manter estado vazio claro para ausencia de transacoes no mes atual.

## Manual Validation
1. Dashboard desktop: legenda acima, alinhada a direita, fora do plot area, sem encobrir linhas/pontos.
2. Dashboard mobile: legenda legivel e consistente sem colisao visual.
3. Card historico desktop: largura reduzida (~70%) e posicao no lado direito.
4. Card historico mobile: largura total em layout empilhado.
5. Tabela mensal com dados: inclui apenas transacoes ativas do mes atual (receitas e despesas).
6. Tabela mensal: colunas Data, Descricao, Categoria, Tipo e Valor em ordem desc por data.
7. Tabela mensal sem dados: estado vazio claro e sem quebra de layout.

## Evidence Artifacts
Registrar evidencias em:
- manual-validation/refine-legend-history-layout/us1-legend-layout.md
- manual-validation/refine-legend-history-layout/us2-historical-card.md
- manual-validation/refine-legend-history-layout/us3-current-month-transactions.md
- manual-validation/refine-legend-history-layout/regression-summary.md
