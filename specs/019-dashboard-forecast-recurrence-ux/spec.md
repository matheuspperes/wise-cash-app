# Feature Specification: Dashboard Forecast e UX de Recorrencia

**Feature Branch**: `019-dashboard-forecast-recurrence-ux`  
**Created**: 2026-04-06  
**Status**: Draft  
**Input**: User description: "Design: dashboard com toggle Historico/Previsoes no contexto do filtro de tempo, tooltips explicativos em Tipo e Modo de recorrencia, e ativacao de recorrencia mais intuitiva no formulario."

## Clarifications

### Session 2026-04-06

- Q: Em "Previsoes", qual fonte de dados deve ser usada? -> A: Apenas meses futuros baseados em lancamentos ja previstos no dominio, sem heuristicas extras.
- Q: Como os tooltips de recorrencia devem abrir/fechar em desktop e mobile? -> A: Abrir por click/tap e fechar ao clicar fora ou ESC.
- Q: Ao alternar Historico/Previsoes, como tratar a quantidade de meses selecionada? -> A: Manter a mesma quantidade de meses selecionada ao alternar os modos.

## User Scenarios & Validation *(mandatory)*

### User Story 1 - Alternar Historico e Previsoes no grafico (Priority: P1)

Como usuario, quero alternar rapidamente entre visao historica e previsao na dashboard para comparar o passado recente com o comportamento futuro esperado.

**Why this priority**: Essa interacao afeta diretamente a leitura do grafico principal e do saldo consolidado, com impacto imediato no entendimento financeiro.

**Independent Validation**: Pode ser validada alterando o toggle entre Historico e Previsoes, conferindo a ordenacao mensal e a rotulagem do saldo sem depender de mudancas no formulario.

**Acceptance Scenarios**:

1. **Given** que o usuario esta na dashboard, **When** ele abre a pagina, **Then** a visao padrao deve ser Historico.
2. **Given** que a visao Historico esta ativa, **When** o usuario seleciona um intervalo de meses, **Then** o grafico deve mostrar os ultimos meses do intervalo com o mes atual como ultimo ponto.
3. **Given** que o usuario alterna para Previsoes, **When** o mesmo intervalo esta selecionado, **Then** o grafico deve mostrar os proximos meses do intervalo com o mes atual como primeiro ponto.
4. **Given** que o usuario alterna entre Historico e Previsoes, **When** a visao muda, **Then** o card principal deve permanecer com "Saldo liquido atual" e o card secundario deve refletir o contexto ativo, usando "Saldo liquido historico" em Historico e "Saldo liquido previsto" em Previsoes.
5. **Given** que o usuario selecionou uma quantidade de meses, **When** ele alterna entre Historico e Previsoes, **Then** a mesma quantidade selecionada deve ser preservada.

---

### User Story 2 - Entender opcoes de recorrencia com ajuda contextual (Priority: P1)

Como usuario, quero ver explicacoes curtas nos campos de recorrencia para entender rapidamente o que muda entre as opcoes disponiveis.

**Why this priority**: Reduz duvidas de configuracao no momento de cadastro e melhora a taxa de preenchimento correto no primeiro uso.

**Independent Validation**: Pode ser validada abrindo o formulario, acessando os tooltips em "Tipo de recorrencia" e "Modo da recorrencia" e verificando o texto esperado.

**Acceptance Scenarios**:

1. **Given** que o usuario esta no formulario com recorrencia ativa, **When** ele abre o tooltip de "Tipo de recorrencia", **Then** deve visualizar a explicacao de limitada e ilimitada em duas linhas distintas.
2. **Given** que o usuario seleciona recorrencia ilimitada, **When** ele abre o tooltip de "Modo da recorrencia", **Then** deve visualizar a explicacao de automatica e manual em duas linhas distintas.
3. **Given** que os tooltips estao visiveis, **When** o usuario fecha o tooltip, **Then** o formulario deve permanecer no mesmo estado sem perda de dados preenchidos.
4. **Given** que o usuario abre qualquer tooltip de recorrencia, **When** ele compara os dois componentes, **Then** ambos devem apresentar mesmo padrao de borda, sombra, tipografia e espacamento de conteudo.
5. **Given** que o usuario alterna entre desktop e mobile, **When** ele interage com os tooltips, **Then** o comportamento de abrir e fechar deve permanecer consistente por click/tap, outside click e ESC.

---

### User Story 3 - Ativar recorrencia de forma mais intuitiva (Priority: P2)

Como usuario, quero um controle de ativacao de recorrencia mais evidente para identificar rapidamente onde habilitar essa funcionalidade.

**Why this priority**: Eleva descobribilidade e reduz erro de configuracao por nao perceber o controle atual.

**Independent Validation**: Pode ser validada apenas no formulario, comparando clareza de rotulo/posicionamento e comportamento do controle ao habilitar e desabilitar recorrencia.

**Acceptance Scenarios**:

1. **Given** que o usuario esta no formulario, **When** ele visualiza a secao de recorrencia, **Then** o controle de ativacao deve indicar claramente a acao "Recorrencia".
2. **Given** que o usuario aciona o controle de recorrencia, **When** o estado muda para ativo, **Then** o componente deve exibir indicacao visual de estado ligado.
3. **Given** que o usuario desativa recorrencia, **When** o controle retorna ao estado inicial, **Then** os campos de recorrencia devem ser recolhidos e o formulario deve continuar utilizavel para cadastro sem recorrencia.
4. **Given** que o usuario precisa identificar o controle rapidamente, **When** ele observa a secao de recorrencia, **Then** o rótulo, a proximidade com a secao e o estado visual devem tornar a acao evidente sem instrucoes adicionais.

---

### Edge Cases

- Quando nao houver meses suficientes anteriores para o intervalo selecionado em Historico, o sistema deve mostrar apenas os meses disponiveis sem inverter a ordem esperada.
- Quando nao houver projecoes futuras suficientes para o intervalo selecionado em Previsoes, o sistema deve mostrar os meses disponiveis sem quebrar o grafico.
- Quando o usuario alternar Historico/Previsoes repetidamente, o rótulo do saldo e o eixo temporal devem permanecer consistentes com o modo ativo.
- Quando o tooltip for aberto em telas menores, seu conteudo deve permanecer legivel e sem sobrepor controles criticos de forma impeditiva.
- Quando o usuario desativar recorrencia apos preencher campos recorrentes, os valores nao aplicaveis devem permanecer fora do envio final.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: O sistema MUST exibir um toggle na dashboard, posicionado ao lado esquerdo do seletor de tempo, com as opcoes "Historico" e "Previsoes".
- **FR-002**: O sistema MUST iniciar a dashboard com "Historico" como modo padrao.
- **FR-003**: Em modo "Historico", o sistema MUST mostrar os ultimos meses conforme quantidade selecionada, com o mes atual como ultimo ponto do grafico.
- **FR-004**: Em modo "Previsoes", o sistema MUST mostrar a projecao dos proximos meses conforme quantidade selecionada, com o mes atual como primeiro ponto do grafico.
- **FR-005**: O sistema MUST manter o card principal com o rótulo fixo "Saldo liquido atual" e atualizar dinamicamente o card secundario para "Saldo liquido historico" em Historico e "Saldo liquido previsto" em Previsoes.
- **FR-006**: O sistema MUST apresentar tooltip no campo "Tipo de recorrencia" contendo as definicoes de "Limitada" e "Ilimitada" em linhas separadas.
- **FR-007**: O sistema MUST apresentar tooltip no campo "Modo da recorrencia" contendo as definicoes de "Automatica" e "Manual" em linhas separadas.
- **FR-008**: O sistema MUST manter o estilo visual dos dois tooltips consistente entre si.
- **FR-008A**: Os tooltips MUST abrir por click/tap em desktop e mobile.
- **FR-008B**: Os tooltips MUST fechar ao clicar fora ou pressionar ESC, sem limpar dados do formulario.
- **FR-009**: O sistema MUST tornar a ativacao de recorrencia mais intuitiva por meio de rotulo/posicionamento claro com destaque para "Recorrencia".
- **FR-010**: O sistema MUST indicar visualmente quando a recorrencia estiver ativada.
- **FR-011**: O sistema MUST manter o fluxo de cadastro sem recorrencia funcional e sem regressao.
- **FR-012**: O sistema MUST preservar os dados ja preenchidos no formulario ao abrir e fechar tooltips informativos.
- **FR-013**: O sistema MUST garantir consistencia entre modo selecionado (Historico/Previsoes), serie apresentada e rótulo do saldo no mesmo ciclo de atualizacao da interface.
- **FR-014**: Em modo "Previsoes", o sistema MUST considerar apenas meses futuros baseados em lancamentos ja previstos no dominio, sem extrapolacao ou heuristicas adicionais.
- **FR-015**: Ao alternar entre Historico e Previsoes, o sistema MUST preservar a quantidade de meses selecionada no filtro de tempo.

### Key Entities *(include if feature involves data)*

- **Dashboard View Mode**: Estado de visualizacao da dashboard com valores permitidos Historico e Previsoes, responsavel por orientar janela temporal do grafico e rótulo de saldo.
- **Time Range Selection**: Quantidade de meses escolhida pelo usuario no seletor de tempo, aplicada de forma diferente conforme o modo da dashboard.
- **Recurrence Help Content**: Conteudo textual de ajuda para os campos Tipo de recorrencia e Modo da recorrencia, exibido em tooltip contextual.
- **Recurrence Activation State**: Estado ligado/desligado da recorrencia no formulario, com impacto na exibicao dos campos recorrentes.

## Assumptions

- O seletor de tempo da dashboard continua sendo a referencia de quantidade de meses para ambas as visoes.
- A semantica atual de dados historicos e previsoes ja existe no dominio; esta feature foca em apresentacao e interacao.
- O texto dos tooltips deve priorizar linguagem direta para usuarios nao tecnicos.
- A melhoria de intuicao no controle de recorrencia pode ser atendida por ajuste de rotulo, proximidade e destaque visual sem incluir novo fluxo de navegacao.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: 100% das alternancias entre Historico e Previsoes exibem serie temporal coerente com o modo ativo e com o limite de meses selecionado.
- **SC-002**: Em 95% das verificacoes manuais, o card principal permanece com "Saldo liquido atual" e o card secundario corresponde corretamente ao modo ativo sem inconsistencias visuais.
- **SC-003**: Em uma amostra de pelo menos 5 verificacoes manuais representando usuarios internos ou revisores, no minimo 4 devem identificar a diferenca entre limitada/ilimitada e automatica/manual apenas pelos tooltips, sem orientacao adicional.
- **SC-004**: Em 100% dos testes de formulario sem recorrencia, o cadastro continua concluido sem impacto de regressao.
- **SC-005**: Em 95% das verificacoes manuais, o controle de ativacao de recorrencia e identificado em ate 5 segundos na observacao inicial.
