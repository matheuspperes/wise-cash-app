# Research: Refinar Legenda, Saldo Historico e Tabela Mensal

## Decision 1: Legenda fora da area de plotagem
- Decision: Posicionar a legenda acima do grafico, alinhada a direita e fora da area de plotagem.
- Rationale: Remove risco de obstrucao de linhas/pontos e melhora leitura do grafico em diferentes amplitudes.
- Alternatives considered:
  - Legenda dentro do grafico (top-left/top-right): rejeitado por potencial conflito com dados.
  - Legenda abaixo do grafico: rejeitado por aumentar distancia visual e reduzir prioridade do grafico.

## Decision 2: Card historico com hierarquia visual reduzida
- Decision: Aplicar largura aproximada de 70% em desktop e largura total em mobile empilhado, mantendo posicionamento no lado direito.
- Rationale: Mantem contexto historico visivel sem competir com saldo principal e bloco de grafico.
- Alternatives considered:
  - Reduzir apenas tipografia: rejeitado por pouco impacto no equilibrio visual.
  - Largura fixa em pixels: rejeitado por fragilidade em responsividade.

## Decision 3: Tabela mensal com escopo transacional completo do mes atual
- Decision: Substituir "gastos do mes" por "transacoes do mes" incluindo receitas e despesas ativas com transactionDate no mes atual.
- Rationale: Entrega visao completa do periodo sem misturar registros inativos ou fora da janela mensal.
- Alternatives considered:
  - Manter apenas despesas: rejeitado por perda de contexto financeiro do mes.
  - Incluir transacoes inativas: rejeitado por ruido e inconsistencia com listagens ativas.

## Decision 4: Estrutura de colunas e ordenacao
- Decision: Exibir Data, Descricao, Categoria, Tipo e Valor, ordenadas por data decrescente.
- Rationale: Mantem consistencia com leitura temporal recente e facilita comparacao rapida entre entradas e saidas.
- Alternatives considered:
  - Omitir coluna Tipo: rejeitado por reduzir clareza entre receita e despesa.
  - Ordenacao crescente: rejeitado por priorizar eventos antigos em vez dos mais recentes.

## Decision 5: Estrategia de validacao manual orientada a evidencia
- Decision: Validar cenarios por desktop/mobile e registrar evidencias em artefatos de manual-validation da feature.
- Rationale: Alinha com constituicao de projeto sem testes automatizados e garante rastreabilidade de aceite.
- Alternatives considered:
  - Testes automatizados: rejeitado por regra de constituicao.
  - Validacao sem artefatos: rejeitado por baixa auditabilidade.
