# Feature Specification: Refino de Texto Escala e Meses

**Feature Branch**: `005-refine-copy-scale-months`  
**Created**: 2026-03-22  
**Status**: Draft  
**Input**: User description: "Textos visíveis: corrija 'Transacoes' para 'Transações', 'Transacao' para 'Transação', 'Lancamentos' para 'Lançamentos', 'Observacao' para 'Observação', 'Historico' para 'Histórico', 'liquido' para 'líquido'. Design: Tudo deve aumentar proporcionalmente em 20%. Ajustar o espaçamento vertical da legenda do gráfico com o gráfico; Ajustar o espaço do gráfico porque as tags 'circle' estão levemente cortadas; Diminuir levemente o botão com símbolo '+' e centralizar o símbolo melhor dentro do botão. Padrões: Trocar visualização dos meses de '2026-02' para 'FEV/2026' executando o padrão das 3 primeiras letras do mês seguido de '/' e seguido do ano"

## Clarifications

### Session 2026-03-22

- Q: O aumento de 20% deve aplicar em quais camadas visuais? -> A: Em absolutamente tudo na tela, incluindo containers, margens externas e largura maxima de layout.
- Q: Onde o padrao MMM/AAAA deve ser aplicado no grafico? -> A: No eixo X e no tooltip do grafico.
- Q: Qual escopo de textos deve receber acentuacao corrigida? -> A: Titulos, labels, botoes e mensagens de estado (erro/loading/vazio).
- Q: Qual fallback usar quando o mes vier em formato invalido? -> A: Exibir o valor original recebido.

## User Scenarios & Validation *(mandatory)*

<!--
  IMPORTANT: User stories should be PRIORITIZED as user journeys ordered by importance.
  Each user story/journey must be INDEPENDENTLY VALIDATABLE - meaning if you implement just ONE of them,
  you should still have a viable MVP (Minimum Viable Product) that delivers value.
  
  Assign priorities (P1, P2, P3, etc.) to each story, where P1 is the most critical.
  Think of each story as a standalone slice of functionality that can be:
  - Developed independently
  - Validated independently
  - Deployed independently
  - Demonstrated to users independently
-->

### User Story 1 - Textos Corrigidos em Portugues (Priority: P1)

Como usuario, quero ver todos os textos visiveis principais com acentuacao correta para compreender melhor a interface e reduzir ambiguidade de leitura.

**Why this priority**: Clareza textual e compreensao do produto sao criticas em qualquer interacao e afetam todas as telas principais.

**Independent Validation**: Pode ser validado navegando pelas telas impactadas e conferindo que os termos especificados aparecem com acentuacao correta.

**Acceptance Scenarios**:

1. **Given** que o usuario acessa dashboard e transacoes, **When** observa os titulos, labels e textos de apoio, **Then** os termos "Transações", "Transação", "Lançamentos", "Observação", "Histórico" e "líquido" aparecem corretamente.
2. **Given** que o usuario encontra termos anteriormente sem acento, **When** a interface e carregada apos a atualizacao, **Then** nenhuma ocorrencia legada sem acento permanece nas superficies alteradas.

---

### User Story 2 - Escala Visual e Ajustes de Layout (Priority: P2)

Como usuario, quero os elementos visuais 20% maiores e melhor alinhados para facilitar leitura, interacao e percepcao de acabamento.

**Why this priority**: O ganho de legibilidade e hierarquia visual melhora uso diario e reduz esforco cognitivo.

**Independent Validation**: Pode ser validado comparando as telas antes/depois e conferindo aumento proporcional de 20% nos elementos alvo, ajuste da legenda do grafico e botao "+" menor e centralizado.

**Acceptance Scenarios**:

1. **Given** que o usuario visualiza a tela atualizada, **When** compara com o estado anterior, **Then** os componentes de interface impactados apresentam aumento proporcional de 20%.
2. **Given** que o usuario observa o grafico e sua legenda, **When** a tela e exibida em desktop e mobile, **Then** o espacamento vertical entre legenda e grafico e adequado e sem colisao visual.
3. **Given** que o usuario observa o botao circular com "+", **When** o componente e renderizado, **Then** o botao fica levemente menor que o estado atual e o simbolo permanece visualmente centralizado.

---

### User Story 3 - Padrao de Meses no Grafico (Priority: P3)

Como usuario, quero ver os meses no formato abreviado local (ex.: FEV/2026) para leitura rapida e padronizada do historico.

**Why this priority**: O formato de periodo impacta diretamente a interpretacao do grafico e a consistencia visual de dados temporais.

**Independent Validation**: Pode ser validado observando o eixo temporal e tooltips do grafico e confirmando o padrao MMM/AAAA em portugues com tres letras.

**Acceptance Scenarios**:

1. **Given** que o grafico exibe mes no formato "2026-02", **When** a transformacao de exibicao e aplicada, **Then** o usuario ve "FEV/2026" seguindo o padrao de 3 letras + "/" + ano.
2. **Given** que ha meses diferentes no historico, **When** os rotulos sao gerados, **Then** todos seguem o mesmo padrao abreviado em portugues sem inconsistencias.

---

### Edge Cases

- Quando o texto estiver em caixa mista (maiúsculas/minúsculas), a correcao ortografica deve preservar estilo visual definido para aquele contexto.
- Quando o aumento de 20% provocar risco de quebra de linha ou corte, o layout deve reajustar espacamentos sem sobrepor componentes criticos.
- Quando o grafico tiver muitos pontos, os marcadores circulares (tags circle) devem permanecer totalmente visiveis, sem corte na borda.
- Quando o mes de origem vier em formato inesperado, a interface deve exibir o valor original recebido, sem quebrar renderizacao do grafico.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: O sistema MUST corrigir os textos visiveis "Transacoes" para "Transações" e "Transacao" para "Transação" nas telas impactadas, cobrindo titulos, labels, botoes e mensagens de estado.
- **FR-002**: O sistema MUST corrigir os textos visiveis "Lancamentos" para "Lançamentos", "Observacao" para "Observação", "Historico" para "Histórico" e "liquido" para "líquido" nas telas impactadas, cobrindo titulos, labels, botoes e mensagens de estado.
- **FR-003**: O sistema MUST remover ocorrencias legadas sem acento dos termos listados em FR-001 e FR-002 nas superficies alteradas por esta feature, incluindo estados de erro, loading e vazio.
- **FR-004**: O sistema MUST aumentar em 20% o tamanho visual de absolutamente todos os elementos das telas impactadas, incluindo tipografia, controles, cards, containers, margens externas, espacamentos e largura maxima de layout, preservando proporcao entre eles.
- **FR-005**: O sistema MUST ajustar o espacamento vertical entre legenda e area do grafico para eliminar colisao visual.
- **FR-006**: O sistema MUST ajustar a area util do grafico para evitar corte dos marcadores circulares nas bordas.
- **FR-007**: O sistema MUST reduzir o diametro visual do botao circular com simbolo "+" entre 8% e 12% em relacao ao baseline da feature e manter o simbolo centralizado horizontal e verticalmente.
- **FR-008**: O sistema MUST exibir os meses no padrao "MMM/AAAA" com tres primeiras letras do mes em portugues e ano numerico de quatro digitos no eixo X e no tooltip do grafico.
- **FR-009**: O sistema MUST aplicar a transformacao para "MMM/AAAA" somente quando a entrada vier em formato "AAAA-MM" (ex.: "2026-02"), preservando fallback para valores fora do formato conforme FR-011.
- **FR-010**: O sistema MUST preservar legibilidade e interacao confortavel apos os ajustes de escala e layout em desktop e mobile, sem overflow horizontal e sem truncamento de textos criticos nas telas impactadas.
- **FR-011**: O sistema MUST, quando receber valor de mes fora do formato esperado, exibir o valor original recebido no eixo X e tooltip, mantendo estabilidade visual.

### Key Entities *(include if feature involves data)*

- **VisibleCopySet**: Conjunto de termos visiveis com acentuacao obrigatoria para dashboard e transacoes.
- **ScaledUIProfile**: Perfil de escala visual contendo fator de aumento de 20% e regras de proporcao entre elementos.
- **ChartLayoutProfile**: Conjunto de regras para espacamento de legenda, area util do grafico e visibilidade de marcadores circulares.
- **MonthDisplayPattern**: Regra de transformacao de exibicao de mes para formato "MMM/AAAA" em portugues.

## Assumptions

- O aumento de 20% aplica-se a todas as camadas visiveis das telas impactadas por esta feature (dashboard e transacoes), incluindo estrutura externa de layout.
- "Diminuir levemente" o botao "+" significa reducao perceptivel pequena em relacao ao estado atual, mantendo prioridade visual da acao principal.
- O padrao de mes abreviado usa tres letras em portugues em caixa alta (ex.: JAN, FEV, MAR).

## Dependencies

- Disponibilidade dos textos atualmente renderizados nas telas para substituicao ortografica completa.
- Estrutura de grafico com suporte a ajuste de area util e formatacao de labels de mes.
- Validacao manual comparativa antes/depois para confirmar escala de 20% e alinhamentos visuais.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: 100% das ocorrencias visiveis dos termos listados em FR-001 e FR-002 aparecem com acentuacao correta nas telas impactadas.
- **SC-002**: 100% dos elementos visuais definidos no escopo da feature apresentam aumento proporcional de 20% em comparacao ao baseline validado.
- **SC-003**: 100% das validacoes em desktop e mobile confirmam ausencia de corte dos marcadores circulares no grafico.
- **SC-004**: 100% das validacoes visuais confirmam espacamento vertical adequado entre legenda e grafico sem sobreposicao.
- **SC-005**: 100% dos labels de mes exibidos nos pontos impactados seguem o padrao "MMM/AAAA" em portugues (ex.: FEV/2026).
- **SC-006**: 100% das validacoes do CTA principal confirmam reducao entre 8% e 12% do diametro do botao versus baseline e simbolo "+" centralizado.
- **SC-007**: 100% dos casos com mes invalido exibem o valor original recebido sem erro visual ou quebra de renderizacao.
- **SC-008**: 100% das telas impactadas validam ausencia de overflow horizontal e ausencia de truncamento de textos criticos em desktop e mobile.
