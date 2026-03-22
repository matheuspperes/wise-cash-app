# Research: Refino de Dashboard e Historico

## Decision 1: Escala global de 20% com guardrails de legibilidade
- Decision: Aplicar escala visual de 20% no escopo da aplicacao impactada por meio de ajustes proporcionais em layout, tipografia, espacamentos e controles, com validacao explicita de overflow/truncamento.
- Rationale: Atende a prioridade principal da feature sem gerar UI desorganizada.
- Alternatives considered:
  - Escalar apenas dashboard: rejeitado pela clarificacao de escopo global.
  - Escalar apenas componentes alterados: rejeitado por inconsistencia visual entre telas.

## Decision 2: Hierarquia de cards de saldo com proporcao fixa
- Decision: Manter card principal de saldo liquido e exibir card secundario do saldo historico com tamanho aproximado 20% menor.
- Rationale: Preserva leitura de prioridade financeira e torna o resumo adicional util sem competir visualmente com o KPI principal.
- Alternatives considered:
  - Mesmo tamanho para ambos: rejeitado por reduzir hierarquia de informacao.
  - Linha de texto sem card: rejeitado por perda de consistencia visual com o dashboard atual.

## Decision 3: Eixo Y dinamico baseado no maximo da serie
- Decision: Calcular teto do eixo Y como maximo da serie + 10% de folga e usar 5 ticks principais.
- Rationale: Evita clipping visual no topo e melhora comparacao entre periodos com amplitudes diferentes.
- Alternatives considered:
  - Teto exato no maximo: rejeitado por visual comprimido.
  - Passos fixos independentes dos dados: rejeitado por baixa adaptabilidade.

## Decision 4: Tabela de gastos do mes atual abaixo do grafico
- Decision: Exibir tabela com colunas Data, Descricao, Categoria e Valor ordenada por data decrescente; mostrar estado vazio claro quando nao houver registros.
- Rationale: Complementa leitura do grafico com detalhe tabular e rastreabilidade de gastos recentes.
- Alternatives considered:
  - Exibir historico completo sem filtro de mes atual: rejeitado por reduzir foco.
  - Sem ordenacao definida: rejeitado por comportamento ambiguo.

## Decision 5: Navegacao simplificada na dashboard
- Decision: Remover botao Dashboard da nav e manter apenas botao Transacoes.
- Rationale: Reduz ruido de interface e evita acao redundante na propria tela atual.
- Alternatives considered:
  - Manter ambos os botoes: rejeitado por redundancia e poluicao visual.
