# Feature Specification: Refino de Dashboard e Historico

**Feature Branch**: `006-refine-dashboard-history`  
**Created**: 2026-03-22  
**Status**: Draft  
**Input**: User description: "Design: perto do saldo liquido atual faca algo parecido e menor um saldo total do historico escolhido; Ajuste o espacamento da legenda do grafico em relacao ao texto Historico mensal; Ajuste a escala dos valores usados para o dinheiro na parte vertical tornando dinamico os valores de acordo com os maximos do grafico; Espace levemente para baixo os indicadores de meses do grafico na parte de baixo; Retire o botao Dashboard da tag nav e mantenha apenas o botao Transacoes; Aumente 20% em absolutamente tudo na tela, incluindo containers, margens externas e largura maxima de layout. Dados: Na dashboard, embaixo do grafico, mostre uma tabela do historico de gastos do mes atual"

## Clarifications

### Session 2026-03-22

- Q: Quais colunas e ordem a tabela de gastos do mes atual deve usar? -> A: Colunas Data, Descricao, Categoria e Valor; ordenacao por data decrescente.
- Q: Como calcular o saldo total do historico escolhido? -> A: Como saldo liquido do periodo (receitas - despesas).
- Q: Como definir a escala dinamica do eixo vertical do grafico? -> A: Maximo da serie + 10% de folga, com 5 ticks principais.
- Q: Onde aplicar o aumento de 20%? -> A: Em toda a aplicacao.
- Q: Qual proporcao visual usar no card secundario de saldo total historico? -> A: Card secundario com tamanho aproximado 20% menor que o card principal.

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

### User Story 1 - Escala Global e Hierarquia Visual (Priority: P1)

Como usuario, quero a aplicacao inteira maior e melhor organizada para leitura mais confortavel e melhor percepcao de prioridade das informacoes.

**Why this priority**: A escala global impacta toda a experiencia e serve de base para os outros ajustes visuais.

**Independent Validation**: Validar visualmente desktop e mobile comparando com baseline anterior e confirmando aumento de 20% nas telas da aplicacao, incluindo containers, margens externas e largura maxima.

**Acceptance Scenarios**:

1. **Given** a aplicacao atualizada, **When** o usuario compara com o baseline da feature, **Then** todos os elementos visuais impactados exibem aumento proporcional de 20%.
2. **Given** a aplicacao com escala aplicada, **When** o usuario navega em desktop e mobile, **Then** nao existe quebra de layout com sobreposicao de blocos principais.

---

### User Story 2 - Leitura do Grafico e Navegacao Simplificada (Priority: P2)

Como usuario, quero ler o grafico com eixos e legenda mais claros e navegar com foco em Transacoes para usar a dashboard com menos ruido.

**Why this priority**: Melhor legibilidade do grafico e simplificacao da navegacao reduzem esforco cognitivo em uso diario.

**Independent Validation**: Confirmar espacamento entre titulo "Historico mensal" e legenda, deslocamento inferior dos meses no eixo X, escala vertical dinamica baseada no maximo dos dados, e remocao do botao "Dashboard" do nav.

**Acceptance Scenarios**:

1. **Given** o grafico renderizado, **When** o usuario observa titulo e legenda, **Then** existe espacamento vertical claro entre "Historico mensal" e legenda sem colisao visual.
2. **Given** o grafico com diferentes amplitudes de valores, **When** os dados variam entre meses, **Then** os valores do eixo vertical se ajustam dinamicamente ao maximo da serie exibida.
3. **Given** o eixo de meses no rodape do grafico, **When** o usuario observa os indicadores de mes, **Then** eles aparecem levemente mais abaixo com melhor separacao visual da area de plotagem.
4. **Given** a navegacao principal da dashboard, **When** o usuario abre o nav, **Then** apenas o botao "Transacoes" permanece disponivel e o botao "Dashboard" nao e exibido.

---

### User Story 3 - Resumo Historico e Tabela de Gastos do Mes Atual (Priority: P3)

Como usuario, quero ver um saldo total do periodo historico selecionado e uma tabela de gastos do mes atual para complementar a leitura do grafico com detalhe tabular.

**Why this priority**: O resumo numerico e a tabela aumentam entendimento financeiro sem depender apenas de leitura visual do grafico.

**Independent Validation**: Confirmar exibicao de um card menor de saldo total historico proximo ao saldo liquido atual e conferir tabela abaixo do grafico contendo apenas gastos do mes atual.

**Acceptance Scenarios**:

1. **Given** um periodo historico selecionado, **When** a dashboard carrega os dados, **Then** um saldo total do historico escolhido e exibido proximo ao saldo liquido atual com destaque menor.
2. **Given** o mes atual com gastos registrados, **When** o usuario rola para a secao abaixo do grafico, **Then** uma tabela lista os gastos do mes atual com informacoes essenciais de cada lancamento.
3. **Given** o mes atual sem gastos registrados, **When** o usuario acessa a tabela, **Then** a interface exibe estado vazio claro sem quebrar o layout.

---

### Edge Cases

- Quando todos os valores do periodo historico forem zero, o eixo vertical deve permanecer legivel e sem divisao invalida.
- Quando existir apenas um ponto mensal no grafico, os espacamentos e labels devem continuar legiveis sem sobreposicao.
- Quando nao houver gastos no mes atual, a tabela deve exibir estado vazio amigavel no lugar de linhas vazias.
- Quando o periodo selecionado mudar, saldo total historico e tabela devem refletir os dados atualizados sem inconsistencias visiveis.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: O sistema MUST aumentar em 20% o tamanho visual de todos os elementos impactados da aplicacao, incluindo containers, margens externas, largura maxima de layout, tipografia e controles.
- **FR-002**: O sistema MUST exibir um card secundario de saldo total do historico selecionado, calculado como saldo liquido do periodo (receitas - despesas), proximo ao card de saldo liquido atual, com menor destaque visual relativo e tamanho aproximado 20% menor que o card principal.
- **FR-003**: O sistema MUST ajustar o espacamento vertical entre o texto "Historico mensal" e a legenda do grafico para evitar proximidade excessiva.
- **FR-004**: O sistema MUST ajustar o eixo vertical de valores monetarios do grafico usando maximo da serie exibida + 10% de folga, com 5 ticks principais.
- **FR-005**: O sistema MUST deslocar levemente para baixo os indicadores de meses no eixo inferior do grafico para melhorar separacao visual.
- **FR-006**: O sistema MUST remover o botao "Dashboard" do nav da dashboard, mantendo apenas o acesso por botao para "Transacoes".
- **FR-007**: O sistema MUST exibir abaixo do grafico uma tabela com o historico de gastos do mes atual.
- **FR-008**: O sistema MUST exibir estado vazio claro na tabela quando nao houver gastos no mes atual.
- **FR-009**: O sistema MUST manter consistencia visual e de leitura dos novos componentes em desktop e mobile sem overflow horizontal no escopo da feature.
- **FR-010**: O sistema MUST exibir na tabela de gastos do mes atual as colunas Data, Descricao, Categoria e Valor, com ordenacao padrao por data decrescente.

### Key Entities *(include if feature involves data)*

- **CurrentMonthExpenseRow**: Registro de gasto do mes atual com campos de exibicao (descricao, categoria, data e valor).
- **HistoricalTotalBalance**: Saldo liquido agregado do periodo historico selecionado (receitas - despesas).
- **DynamicYAxisProfile**: Configuracao de escala vertical derivada do maximo da serie exibida no grafico.
- **DashboardNavActionSet**: Conjunto de acoes de navegacao visiveis no nav da dashboard apos simplificacao.

## Assumptions

- "Historico escolhido" refere-se ao periodo atualmente selecionado no filtro de meses da dashboard.
- "Parecido e menor" para o novo saldo historico significa card visualmente relacionado ao saldo liquido atual, com hierarquia secundaria.
- "Levemente para baixo" nos indicadores de meses sera tratado como ajuste visual perceptivel sem comprometer legibilidade.

## Dependencies

- Disponibilidade de dados agregados por periodo para calcular saldo total historico.
- Disponibilidade de dados de transacoes para filtrar gastos do mes atual na nova tabela.
- Estrutura do grafico com suporte a ajuste dinamico de escala de eixo e espacamentos.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: 100% das telas impactadas da aplicacao validam aumento visual de 20% no escopo definido (containers, margens externas, largura maxima, tipografia e controles).
- **SC-002**: 100% das validacoes visuais confirmam separacao clara entre "Historico mensal" e legenda do grafico sem sobreposicao.
- **SC-003**: 100% dos cenarios com variacao de dados no grafico validam eixo vertical dinamico coerente com o maximo da serie exibida.
- **SC-004**: 100% das validacoes de navegacao confirmam ausencia do botao "Dashboard" no nav e presenca de "Transacoes".
- **SC-005**: 100% das validacoes de dados confirmam exibicao da tabela de gastos do mes atual abaixo do grafico, incluindo estado vazio quando aplicavel.
- **SC-006**: 100% das validacoes desktop/mobile no escopo da feature confirmam ausencia de overflow horizontal e manutencao de legibilidade dos blocos impactados da aplicacao.
- **SC-007**: 100% das validacoes da tabela de gastos confirmam presenca das colunas Data, Descricao, Categoria e Valor, com ordenacao por data decrescente.
- **SC-008**: 100% das validacoes do card secundario confirmam calculo de saldo liquido do periodo historico como receitas - despesas.
- **SC-009**: 100% das validacoes do eixo Y confirmam teto em maximo + 10% de folga e 5 ticks principais no grafico.
- **SC-010**: 100% das validacoes visuais do resumo historico confirmam card secundario com tamanho aproximado 20% menor que o card principal.
