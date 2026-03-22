# Feature Specification: Refino Visual Banner e Dados do Dashboard

**Feature Branch**: `004-dashboard-banner-nav`  
**Created**: 2026-03-21  
**Status**: Approved  
**Input**: User description: "Design: Faca um banner com nome Wise Cash e uma barra de navegacao superior simples. Retire a frase Visao financeira com carregamento suave. Ao inves de Adicionar transacao, coloque um simbolo de + e faca um botao circular com um roxo levemente mais escuro. Faca o fundo do site levemente mais manchado de roxo. Corrija os erros de portugues nos textos mostrados para o usuario. Na tela de transacoes, deixe a categoria apenas com o placeholder Categoria e diminua o tamanho do botao Salvar. Dados: simule 2 gastos e 2 ganhos nos meses de fevereiro e marco para simular o funcionamento do grafico. Troque o espaco Notas para Observacao e faca as adaptacoes necessarias."

## Clarifications

### Session 2026-03-21

- Q: Como a simulacao de 2 ganhos e 2 gastos (fevereiro/marco) deve ser ativada? -> A: Simulacao ativa somente em modo de demonstracao (toggle/configuracao).
- Q: Qual conteudo funcional a barra de navegacao superior deve ter? -> A: Barra com 2 links: Dashboard e Transacoes.
- Q: Como os dados simulados devem conviver com dados reais no grafico? -> A: Manter dados reais e adicionar simulados com distincao visual clara (legenda/serie demo).
- Q: Qual nivel de reducao deve ser aplicado ao botao "Salvar" na tela de transacoes? -> A: Reducao moderada para tamanho compacto e legivel.
- Q: Qual escopo de correcao de textos em portugues deve ser aplicado? -> A: Corrigir textos das telas alteradas mais lista explicita de mensagens/chamadas principais visiveis ao usuario.

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

### User Story 1 - Cabecalho e Identidade Visual (Priority: P1)

Como usuario do dashboard, quero ver um cabecalho com banner "Wise Cash" e navegacao superior simples para reconhecer rapidamente a identidade do produto e navegar com clareza.

**Why this priority**: O primeiro contato visual impacta percepcao de qualidade e orientacao de uso.

**Independent Validation**: Pode ser validado abrindo a pagina principal e confirmando presenca do banner, barra superior e ausencia da frase antiga no subtitulo.

**Acceptance Scenarios**:

1. **Given** que o usuario acessa a pagina principal, **When** a interface carrega, **Then** o banner "Wise Cash" aparece no topo com barra de navegacao superior simples.
2. **Given** que o cabecalho foi carregado, **When** o usuario observa o texto introdutorio, **Then** a frase "Visao financeira com carregamento suave" nao e exibida.
3. **Given** que a barra de navegacao superior esta visivel, **When** o usuario observa os itens de navegacao, **Then** encontra os links "Dashboard" e "Transacoes".

---

### User Story 2 - Acoes e Textos Mais Claros (Priority: P2)

Como usuario, quero a acao principal simplificada com simbolo "+" em botao circular roxo e textos em portugues corrigidos para interagir com mais rapidez e confianca.

**Why this priority**: O fluxo principal depende de CTA claro e linguagem correta para reduzir duvida e erro.

**Independent Validation**: Pode ser validado revisando o CTA no dashboard e os textos de interface na pagina de transacoes, incluindo renomeacao de "Notas" para "Observacao".

**Acceptance Scenarios**:

1. **Given** que o usuario esta no dashboard, **When** ele procura a acao principal, **Then** encontra um botao circular roxo (tom levemente mais escuro) com simbolo "+".
2. **Given** que o usuario visualiza formularios e mensagens, **When** le os textos, **Then** os termos em portugues estao corrigidos e o campo antes chamado "Notas" aparece como "Observacao".

---

### User Story 3 - Simulacao de Dados no Grafico (Priority: P3)

Como usuario avaliando o dashboard, quero ver dados simulados minimos e coerentes em fevereiro e marco para validar visualmente o funcionamento do grafico.

**Why this priority**: O grafico precisa de dados suficientes para demonstrar comportamento e leitura da tela.

**Independent Validation**: Pode ser validado ao carregar o dashboard e verificar 2 ganhos e 2 gastos distribuidos entre fevereiro e marco, sem quebrar o restante da interface.

**Acceptance Scenarios**:

1. **Given** que o usuario abre o dashboard com simulacao habilitada, **When** o grafico e exibido, **Then** existem 2 ganhos e 2 gastos simulados nos meses de fevereiro e marco.
2. **Given** que os dados simulados sao exibidos junto com dados reais, **When** o usuario interage com o grafico, **Then** as series simuladas permanecem claramente distinguidas por legenda/estilo visual proprio.

---

### Edge Cases

- Quando a navegacao superior tiver poucos itens, o layout deve continuar equilibrado sem espacamento quebrado.
- Quando a largura da tela for pequena, o botao circular com "+" deve permanecer visivel e nao sobrepor conteudo critico.
- Quando houver textos legados com erro de portugues, a interface deve priorizar as versoes corrigidas em todos os pontos visiveis.
- Quando os dados simulados forem usados junto com dados reais, o criterio de exibicao deve evitar duplicidade confusa no grafico.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: O sistema MUST exibir um banner com o nome "Wise Cash" no topo da interface principal.
- **FR-002**: O sistema MUST manter uma barra de navegacao superior simples e visualmente consistente com o restante da tela, contendo os links "Dashboard" e "Transacoes".
- **FR-003**: O sistema MUST remover da experiencia visivel a frase "Visao financeira com carregamento suave".
- **FR-004**: O sistema MUST substituir o texto da acao principal por simbolo "+" dentro de um botao circular.
- **FR-005**: O sistema MUST aplicar ao botao circular um roxo levemente mais escuro em relacao ao roxo principal da interface.
- **FR-006**: O sistema MUST ajustar o fundo geral para um aspecto levemente mais manchado de roxo, preservando legibilidade.
- **FR-007**: O sistema MUST corrigir erros de portugues nos textos das telas impactadas e garantir revisao explicita dos seguintes textos visiveis principais: "Dashboard", "Transacoes", "Categoria", "Salvar", "Wise Cash" e mensagens de feedback de carregamento/erro nessas telas.
- **FR-008**: O sistema MUST manter, na tela de transacoes, o campo de categoria com placeholder "Categoria".
- **FR-009**: O sistema MUST reduzir o tamanho visual do botao "Salvar" na tela de transacoes em nivel moderado (compacto), mantendo legibilidade e interacao confortavel.
- **FR-010**: O sistema MUST renomear o campo "Notas" para "Observacao" e refletir a mudanca nos fluxos visiveis relacionados.
- **FR-011**: O sistema MUST disponibilizar simulacao com exatamente 2 ganhos e 2 gastos nos meses de fevereiro e marco, ativa somente em modo de demonstracao (toggle/configuracao explicita).
- **FR-012**: O sistema MUST preservar coerencia visual e textual entre dashboard e tela de transacoes com os seguintes criterios verificaveis em checklist: (1) labels equivalentes usam exatamente os termos aprovados em FR-007; (2) botoes de acao primaria nas telas alteradas exibem estados visiveis de hover e foco; (3) os termos legados "Notas" e "Adicionar transacao" nao aparecem nas superficies impactadas.
- **FR-013**: O sistema MUST manter dados reais no grafico quando o modo demonstracao estiver ativo e adicionar as series simuladas com distincao visual clara (legenda/estilo especifico de demo).

### Key Entities *(include if feature involves data)*

- **HeaderBanner**: Elemento de cabecalho com nome do produto e estrutura visual de topo.
- **PrimaryActionButton**: Acao principal representada por botao circular com simbolo "+" e estilo roxo ajustado.
- **TransactionFormLabels**: Conjunto de textos de formulario visiveis ao usuario, incluindo renomeacao para "Observacao".
- **ChartSimulationSet**: Conjunto de dados simulados minimos (2 ganhos, 2 gastos) distribuidos entre fevereiro e marco.

## Assumptions

- A barra de navegacao superior simples nao exige novos fluxos de navegacao complexos nesta entrega.
- O ajuste de fundo "mais manchado de roxo" sera mantido em nivel leve para nao reduzir contraste.
- A simulacao de dados solicitada e voltada a demonstracao visual do grafico nesta feature.
- A reducao do botao "Salvar" refere-se ao tamanho visual do componente, sem alterar sua funcao.

## Dependencies

- Disponibilidade de textos atuais para revisao ortografica nas telas impactadas.
- Presenca de estrutura de grafico ativa para receber os dados simulados de fevereiro e marco.
- Validacao manual da legibilidade apos ajustes de fundo e cor do botao principal.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: 100% das visualizacoes da pagina principal exibem banner "Wise Cash" e barra de navegacao superior.
- **SC-002**: 100% das ocorrencias da frase "Visao financeira com carregamento suave" deixam de aparecer nas telas visiveis ao usuario.
- **SC-003**: Em validacao guiada com 5 execucoes (3 desktop e 2 mobile), 100% das execucoes localizam a acao principal "+" em ate 3 segundos, medidos do fim do carregamento inicial ate o primeiro clique/toque no CTA.
- **SC-004**: 100% dos textos da lista explicita definida no FR-007 passam por verificacao ortografica sem erro de portugues visivel.
- **SC-005**: 100% das execucoes com modo de demonstracao ativo exibem exatamente 2 ganhos e 2 gastos distribuidos entre fevereiro e marco.
- **SC-006**: 100% das validacoes da tela de transacoes confirmam placeholder "Categoria", campo "Observacao" e botao "Salvar" em tamanho compacto moderado, menor que o estado anterior e com legibilidade preservada.
- **SC-007**: 100% das validacoes com modo de demonstracao ativo confirmam distincao clara entre series demo e reais por meio de legenda com rotulo "Demo", estilo visual exclusivo da serie demo e identificacao de "Demo" no tooltip.
