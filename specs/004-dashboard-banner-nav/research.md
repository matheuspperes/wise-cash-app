# Research: Refino Visual Banner e Dados do Dashboard

## Decision 1: Header e navegacao superior
- Decision: Implementar cabecalho com banner "Wise Cash" e barra superior com dois links fixos: "Dashboard" e "Transacoes".
- Rationale: Atende diretamente os cenarios P1 com baixo risco, sem alterar arquitetura de rotas.
- Alternatives considered:
  - Menu expansivel com mais secoes: adiciona complexidade sem requisito.
  - Navegacao lateral dedicada: conflita com escopo de barra superior simples.

## Decision 2: CTA principal circular com simbolo +
- Decision: Substituir CTA textual por botao circular contendo somente "+", usando roxo um tom mais escuro que o roxo base da interface.
- Rationale: Aumenta destaque visual e reduz ruicao textual mantendo a mesma acao existente de criar transacao.
- Alternatives considered:
  - Manter texto "Adicionar transacao": nao atende requisito visual.
  - Botao com icone e texto: descaracteriza objetivo de simplificacao.

## Decision 3: Fundo com atmosfera roxa mais manchada
- Decision: Aplicar fundo com camada sutil de gradiente/textura roxa em baixa opacidade para manter legibilidade.
- Rationale: Entrega mudanca perceptivel de identidade sem reduzir contraste dos componentes.
- Alternatives considered:
  - Fundo totalmente solido roxo: perde profundidade visual.
  - Textura forte com manchas contrastantes: maior risco de prejudicar leitura.

## Decision 4: Correcao de portugues nas telas alteradas
- Decision: Corrigir textos visiveis principais definidos no FR-007, incluindo rotulos de navegacao, formulario e mensagens de feedback.
- Rationale: Garante consistencia linguistica e reduz friccao no uso diario.
- Alternatives considered:
  - Corrigir apenas textos novos: deixa erros legados em areas alteradas.
  - Correcao global em todo o produto agora: escopo amplo para esta feature.

## Decision 5: Categoria e Observacao no formulario
- Decision: Manter placeholder do campo de categoria exatamente como "Categoria" e renomear "Notas" para "Observacao" em todos os pontos visiveis relacionados ao formulario.
- Rationale: Alinha UX com a clarificacao aprovada e evita divergencia de termos.
- Alternatives considered:
  - Placeholder contextual por tipo: nao solicitado e aumenta variacao de copy.
  - Manter "Notas" internamente e so trocar label: gera inconsistencias visiveis em feedbacks.

## Decision 6: Simulacao em modo demonstracao com dados reais preservados
- Decision: Ativar simulacao apenas quando demo mode estiver habilitado por configuracao explicita, mesclando dados reais com dados simulados e diferenciando serie demo por legenda/estilo proprio.
- Rationale: Atende clarificacao C sem remover fidelidade dos dados reais.
- Alternatives considered:
  - Substituir completamente dados reais por simulados: reduz utilidade do dashboard real.
  - Simulacao sempre ligada: conflita com requisito de modo demonstracao.

## Decision 7: Conjunto simulado minimo com itens completos
- Decision: Definir exatamente 4 lancamentos simulados (2 ganhos e 2 gastos) distribuidos entre fevereiro e marco, todos com campos de item preenchidos (descricao, categoria, data, valor, origem/metodo e observacao).
- Rationale: Cumpre FR-011 e pedido adicional de preenchimento completo de informacoes dos itens.
- Alternatives considered:
  - Dados agregados por mes sem itens: impede validar detalhes de tooltip/legenda/lista.
  - Mais de 4 itens: ultrapassa requisito minimo e aumenta manutencao.
