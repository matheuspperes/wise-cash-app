# Feature Specification: Ajuste de Grafico e Historico Completo

**Feature Branch**: `007-fix-chart-indicators-history`  
**Created**: 2026-03-22  
**Status**: Planned  
**Input**: User description: "Design: consertar os indicadores de mes do grafico (MAR/2026) que estao em cima da borda da div; consertar o espacamento entre a legenda do grafico e o texto Historico mensal que possui uma distancia desnecessaria; criar um padrao dinamico para os indicadores verticais do plano cartesiano do grafico, pois esta repetindo 0k ou 1k. Dados: o botao Transacoes da dashboard deve mostrar uma tabela de gastos igual da dashboard, porem com o historico completo das transacoes divididas por mes."

## Clarifications

### Session 2026-03-22

- Q: Como exibir o historico completo de gastos em Transacoes? -> A: Exibir todos os meses disponiveis de uma vez, agrupados por mes em ordem do mais recente para o mais antigo.
- Q: Quais colunas e ordenacao a tabela completa em Transacoes deve usar? -> A: Colunas Data, Descricao, Categoria e Valor; dentro de cada mes, ordenar por data decrescente.
- Q: Qual estrategia para os indicadores verticais dinamicos do grafico deve ser aplicada? -> A: Limite superior baseado no maximo da serie com folga, e quantidade de ticks adaptada para evitar repeticao de labels.
- Q: Como deve ser o comportamento visual do agrupamento mensal na tabela completa de Transacoes? -> A: Usar acordeao por mes, com grupos fechados por padrao e expansao sob demanda.
- Q: Como a nova tabela mensal de gastos deve conviver com a listagem atual em Transacoes? -> A: Manter a listagem atual e adicionar a nova tabela mensal como secao dedicada na mesma tela.

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

### User Story 1 - Legibilidade do Grafico Mensal (Priority: P1)

Como usuario, quero ver os rotulos de mes e os indicadores verticais do grafico claramente para interpretar valores sem ruido visual.

**Why this priority**: O grafico e o principal resumo visual da dashboard e erros de legibilidade comprometem leitura financeira imediata.

**Independent Validation**: Carregar a dashboard com dados variados e confirmar que os rotulos de mes nao colidem com a borda, que o espacamento entre titulo e legenda e adequado e que o eixo vertical nao repete marcas inutilmente.

**Acceptance Scenarios**:

1. **Given** a dashboard carregada com historico mensal, **When** o usuario visualiza os rotulos de mes no eixo inferior, **Then** os rotulos aparecem totalmente visiveis sem sobreposicao na borda inferior do bloco.
2. **Given** a dashboard com legenda habilitada, **When** o usuario observa o titulo "Historico mensal" e a legenda, **Then** a distancia vertical entre eles permanece entre 8px e 16px, sem parecer excessiva nem comprimida.
3. **Given** uma serie mensal com amplitudes diferentes, **When** o grafico calcula o eixo vertical, **Then** as marcas verticais sao distribuidas dinamicamente de forma legivel e sem repeticoes redundantes de rotulos como "0k" ou "1k".

---

### User Story 2 - Historico Completo de Gastos em Transacoes (Priority: P2)

Como usuario, quero ver no acesso de Transacoes uma tabela de gastos no mesmo estilo da dashboard, porem com historico completo dividido por mes, para analisar periodos sem limite curto.

**Why this priority**: Complementa a visao resumida da dashboard com detalhamento completo e continuidade de consulta no fluxo de transacoes.

**Independent Validation**: Acessar Transacoes pela dashboard e confirmar que a tabela exibe gastos agrupados por mes ao longo de todo o historico disponivel.

**Acceptance Scenarios**:

1. **Given** que o usuario entra em Transacoes a partir da dashboard, **When** a tela e carregada, **Then** existe uma tabela de gastos com o mesmo padrao visual basico da tabela da dashboard.
2. **Given** que existem gastos em varios meses, **When** o usuario navega pela tabela, **Then** os registros aparecem divididos por mes cobrindo todo o historico de transacoes disponivel.
3. **Given** que nao existem gastos no historico, **When** a tabela e exibida, **Then** a interface mostra estado vazio claro sem quebra de layout.

---

### User Story 3 - Consistencia de Leitura Entre Dashboard e Transacoes (Priority: P3)

Como usuario, quero consistencia de apresentacao entre o grafico da dashboard e a tabela de Transacoes para alternar de resumo para detalhe sem confusao.

**Why this priority**: Melhora continuidade da experiencia e reduz retrabalho mental ao comparar periodos e valores.

**Independent Validation**: Verificar se o formato e a organizacao de informacao mantem padrao coerente entre dashboard e Transacoes ao alternar entre as telas.

**Acceptance Scenarios**:

1. **Given** o usuario alternando entre dashboard e Transacoes, **When** observa agrupamentos, valores e estados vazios, **Then** a estrutura visual e semantica permanece consistente para facilitar comparacao.

---

### Edge Cases

- Quando houver somente um mes na serie, o eixo vertical deve manter marcas distintas e legiveis, sem repetir rotulos.
- Quando todos os valores da serie forem muito baixos ou zero, o eixo vertical deve continuar util para leitura e nao colapsar em repeticoes confusas.
- Quando o nome do mes no eixo inferior for longo no contexto visual atual, o rotulo deve permanecer visivel sem encostar na borda do container.
- Quando houver meses sem gastos no historico completo, a divisao mensal da tabela deve continuar coerente sem quebrar a ordem temporal.
- Quando nao houver qualquer gasto registrado, a tabela de Transacoes deve exibir estado vazio explicito e informativo.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: O sistema MUST reposicionar os rotulos de mes no eixo inferior do grafico para impedir sobreposicao com a borda inferior do container.
- **FR-002**: O sistema MUST ajustar o espacamento entre o texto "Historico mensal" e a legenda para remover distancia excessiva e manter leitura equilibrada.
- **FR-003**: O sistema MUST gerar os indicadores verticais do grafico dinamicamente com base no intervalo de dados exibido, usando limite superior derivado do maximo da serie com folga.
- **FR-004**: O sistema MUST ajustar dinamicamente a quantidade de ticks do eixo vertical para manter legibilidade em cenarios de serie unica, serie com valores baixos e serie com amplitude ampla, sem repeticao redundante de labels.
- **FR-005**: O sistema MUST disponibilizar no fluxo de Transacoes uma tabela de gastos com padrao visual equivalente ao usado na dashboard para tabela de gastos.
- **FR-006**: O sistema MUST exibir na tabela de Transacoes o historico completo de gastos disponiveis, dividido por mes, carregando todos os meses de uma vez na visualizacao inicial.
- **FR-007**: O sistema MUST preservar ordem temporal consistente na divisao mensal do historico completo de gastos.
- **FR-008**: O sistema MUST exibir estado vazio claro na tabela de Transacoes quando nao houver gastos no historico.
- **FR-009**: O sistema MUST manter consistencia de linguagem visual e estrutura informacional entre dashboard e Transacoes para consulta de resumo e detalhe.
- **FR-010**: O sistema MUST exibir na tabela completa de Transacoes as colunas Data, Descricao, Categoria e Valor.
- **FR-011**: O sistema MUST ordenar os gastos por data decrescente dentro de cada grupo mensal.
- **FR-012**: O sistema MUST apresentar os grupos mensais da tabela completa de Transacoes em formato de acordeao, com grupos fechados por padrao e expansao sob demanda do usuario.
- **FR-013**: O sistema MUST manter a listagem atual de lancamentos em Transacoes e adicionar a tabela mensal de gastos como secao dedicada, sem substituir o bloco existente.

### Non-Functional Requirements

- **NFR-001**: O espacamento vertical entre o titulo "Historico mensal" e a legenda MUST permanecer entre 8px e 16px em desktop e mobile.
- **NFR-002**: A nova secao de historico mensal em Transacoes MUST renderizar sem overflow horizontal em viewport de 360px ou maior.
- **NFR-003**: Para um conjunto de ate 24 meses e ate 500 linhas totais de despesas, o tempo adicional de renderizacao da secao mensal em Transacoes MUST permanecer em ate 200ms em validacao local manual.

### Key Entities *(include if feature involves data)*

- **DynamicChartAxisProfile**: Perfil de distribuicao das marcas verticais do grafico baseado no menor e maior valor visivel, com espaco de leitura adequado.
- **MonthlyExpenseHistoryGroup**: Grupo mensal de gastos com referencia de mes e conjunto de lancamentos daquele periodo.
- **ExpenseHistoryRow**: Linha de gasto do historico completo contendo data, descricao, categoria e valor.
- **ChartLabelLayoutState**: Estado de posicionamento e espacamento para rotulos de mes, titulo do grafico e legenda.

## Assumptions

- "Historico completo" refere-se a todo o conjunto de gastos disponivel no contexto atual do usuario, sem limitar aos ultimos meses da dashboard.
- "Tabela igual da dashboard" refere-se a padrao visual e estrutura de colunas de gastos, com adaptacao de escopo para historico completo.
- O agrupamento por mes na tabela segue ordem cronologica do mes mais recente para o mais antigo por padrao.
- O historico completo em Transacoes e exibido integralmente na carga inicial da tabela, sem paginação incremental.

## Dependencies

- Disponibilidade de dados de gastos com data valida para divisao mensal no historico completo.
- Estrutura de grafico com suporte a ajuste de espacamento e escala vertical dinamica.
- Acesso navegavel da dashboard para a tela de Transacoes no fluxo atual.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: 100% das validacoes visuais do grafico confirmam que os rotulos de mes nao encostam nem sobrepoem a borda inferior do container.
- **SC-002**: 100% das validacoes de layout confirmam distancia entre 8px e 16px entre "Historico mensal" e legenda, sem espacamento excessivo percebido.
- **SC-003**: 100% dos cenarios de dados (baixo, medio, alto e unico ponto) exibem indicadores verticais sem repeticao redundante de rotulos, com limite superior do eixo baseado no maximo da serie mais folga.
- **SC-004**: 100% das validacoes de Transacoes confirmam exibicao de historico completo de gastos dividido por mes.
- **SC-005**: 100% das validacoes da tabela de Transacoes confirmam consistencia de estrutura com a tabela de gastos da dashboard.
- **SC-006**: 100% dos cenarios sem dados de gastos exibem estado vazio claro e sem quebra de layout.
- **SC-007**: 100% das validacoes de alternancia dashboard -> Transacoes confirmam continuidade de leitura entre resumo e detalhe.
- **SC-008**: 100% das validacoes da tabela completa em Transacoes confirmam presenca das colunas Data, Descricao, Categoria e Valor.
- **SC-009**: 100% das validacoes da tabela completa em Transacoes confirmam ordenacao por data decrescente dentro de cada mes.
- **SC-010**: 100% das validacoes da tabela completa em Transacoes confirmam comportamento de acordeao mensal com grupos inicialmente fechados e expansao funcional.
- **SC-011**: 100% das validacoes da tela Transacoes confirmam coexistencia da listagem atual e da nova secao de tabela mensal de gastos sem regressao de layout.
- **SC-012**: 100% das validacoes manuais de performance com ate 24 meses e ate 500 linhas confirmam acrescimo de renderizacao da secao mensal em ate 200ms em ambiente local.
