# Research: Ajuste de Grafico e Historico Completo

## Decision 1: Reposicionamento de labels de mes por margem e tickMargin
- Decision: Ajustar margem inferior util do grafico e margem dos ticks do eixo X para afastar os indicadores de mes da borda inferior sem alterar o dataset.
- Rationale: Corrige o problema visual na origem (layout de plotagem), mantendo implementacao simples e previsivel.
- Alternatives considered:
  - Reduzir fonte dos labels: rejeitado por piorar legibilidade.
  - Rotacionar labels: rejeitado por aumentar ruído visual para poucos meses.

## Decision 2: Distancia entre titulo e legenda com ajuste pontual e consistente
- Decision: Reduzir espaco vertical entre "Historico mensal" e legenda via ajustes finos em margem superior da area de grafico e padding da legenda.
- Rationale: Remove distancia desnecessaria sem aproximar a ponto de causar colisao visual.
- Alternatives considered:
  - Ocultar legenda: rejeitado por perda de contexto de series.
  - Reposicionar legenda para fora do bloco: rejeitado por quebrar consistencia atual.

## Decision 3: Eixo Y dinamico com teto por maximo+folga e ticks adaptativos
- Decision: Calcular dominio vertical por maximo da serie + folga e adaptar tickCount/intervalo para evitar labels repetidos (ex.: 0k, 1k duplicados).
- Rationale: Mantem leitura intuitiva em cenarios de baixa e alta amplitude com menor risco de repeticao de labels.
- Alternatives considered:
  - TickCount fixo universal: rejeitado por gerar repeticoes em intervalos estreitos.
  - Exibir valores completos sem sufixo: rejeitado por poluir visual em valores altos.

## Decision 4: Historico completo em Transacoes agrupado por mes em acordeao
- Decision: Exibir todos os meses na carga inicial com grupos mensais em acordeao (fechados por padrao), mantendo colunas Data, Descricao, Categoria e Valor, com ordenacao desc dentro do mes.
- Rationale: Atende ao requisito de historico completo sem comprometer escaneabilidade da tela.
- Alternatives considered:
  - Carregamento incremental: rejeitado pela clarificacao de exibir historico completo de uma vez.
  - Grupos sempre abertos: rejeitado por alta ocupacao vertical inicial.

## Decision 5: Coexistencia da listagem atual com nova secao mensal
- Decision: Preservar bloco atual de lancamentos e adicionar secao dedicada de historico mensal de gastos na mesma tela de Transacoes.
- Rationale: Evita regressao funcional e reduz risco de quebra em fluxos ja usados.
- Alternatives considered:
  - Substituir listagem atual: rejeitado por alto risco de regressao de uso.
  - Exibir secao nova apenas via origem dashboard: rejeitado por regra de consistencia e previsibilidade.
