# Quickstart: Refino de Dashboard e Historico

## Objective
Planejar e implementar ajustes visuais consistentes sem baguncar a UI:
1. Escala global de 20% no escopo impactado da aplicacao.
2. Refinos do grafico (legenda, eixo Y dinamico, espacamento dos meses).
3. Nav simplificado na dashboard.
4. Card secundario de saldo historico (20% menor) e tabela de gastos do mes atual.

## Implementation Steps
1. Aplique baseline de escala visual proporcional em layouts, containers, tipografia e controles.
2. Ajuste cabecalho/nav da dashboard para manter apenas acao de Transacoes.
3. Refine o bloco do grafico: espacamento entre titulo e legenda, deslocamento inferior dos labels de mes e eixo Y dinamico (maximo + 10% com 5 ticks).
4. Adicione card secundario do saldo historico proximo ao saldo principal com hierarquia visual secundaria.
5. Adicione tabela abaixo do grafico com colunas Data, Descricao, Categoria e Valor, ordenada por data decrescente e com estado vazio.
6. Valide consistencia de UI em desktop e mobile sem overflow horizontal.

## Manual Validation
1. Compare baseline e estado final para confirmar incremento de 20% no escopo impactado.
2. Confirme hierarquia visual do card secundario (aprox. 20% menor que o card principal).
3. Confirme nav com apenas botao Transacoes.
4. Confirme eixo Y com maximo + 10% e 5 ticks em diferentes amplitudes de dados.
5. Confirme tabela de gastos do mes atual com colunas e ordenacao padrao corretas.
6. Confirme estado vazio da tabela quando nao houver gastos do mes atual.
7. Confirme ausencia de overflow horizontal e truncamento critico.

## Evidence Artifacts
Registrar evidencias em:
- manual-validation/refine-dashboard-history/us1-scale-consistency.md
- manual-validation/refine-dashboard-history/us2-chart-nav.md
- manual-validation/refine-dashboard-history/us3-history-summary-table.md
- manual-validation/refine-dashboard-history/regression-summary.md
