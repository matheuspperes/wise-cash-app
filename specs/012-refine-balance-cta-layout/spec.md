# Feature Specification: Refine Balance Card and CTA Layout

**Feature Branch**: `012-refine-balance-cta-layout`  
**Created**: 2026-03-23  
**Status**: Ready for Planning  
**Input**: User description: "Diminua em 20% o texto e o tamanho horizontal do article onde o Saldo liquido historico esta localizado mantendo os alinhamentos; reposicione o botao Transacoes da dashboard ao lado do filtro e do botao de adicionar; substitua o botao '+' por 'Nova Transacao' com ajuste proporcional suave; criar botao 'Nova transacao' na pagina de historico com o mesmo estilo de 'Ver historico de transacoes' da pagina de nova transacao"

## Clarifications

### Session 2026-03-23

- Q: Qual nivel de equivalencia visual deve ser aplicado entre o botao "Nova transacao" da pagina de historico e o botao de referencia da pagina de nova transacao? -> A: Mesmo estilo-base (mesmo componente/variant), com ajuste apenas de largura/tamanho por responsividade.
- Q: Como aplicar a reducao de 20% do card historico entre breakpoints? -> A: Aplicar reducao de 20% no desktop/tablet e no mobile usar ajuste proporcional sem exigir 20% exatos.
- Q: Como tratar o ponto de acesso do botao Transacoes na dashboard apos reposicionamento? -> A: Remover da navegacao atual e manter somente no novo cluster de controles.
- Q: Qual deve ser o destino funcional do botao Transacoes no novo cluster da dashboard? -> A: Abrir diretamente a pagina de historico de transacoes.
- Q: Como definir "levemente mais chamativo" para o botao Transacoes? -> A: Manter tamanho e ajustar destaque apenas com fundo/contraste sutil.

## User Scenarios & Validation *(mandatory)*

### User Story 1 - Consolidar controles de acao no topo da dashboard (Priority: P1)

Como usuario, eu quero ver filtro de periodo, botao de adicionar e botao Transacoes agrupados no mesmo bloco de controles da dashboard, para encontrar e executar acoes principais com menos deslocamento visual.

**Why this priority**: O topo da dashboard e o ponto de entrada principal das acoes; melhorar esse agrupamento reduz atrito imediato.

**Independent Validation**: Pode ser validada abrindo a dashboard em desktop e mobile e verificando que os tres controles ficam no mesmo cluster, com alinhamento e legibilidade preservados.

**Acceptance Scenarios**:

1. **Given** que o usuario abre a dashboard, **When** observa o bloco de controles no topo, **Then** o botao Transacoes aparece ao lado do filtro e do botao de adicionar como unico ponto de acesso para essa acao na dashboard.
2. **Given** que o layout da dashboard e renderizado em diferentes larguras, **When** o usuario alterna entre breakpoints suportados, **Then** o agrupamento dos tres controles permanece consistente e sem sobreposicao.
3. **Given** que o usuario visualiza o botao Transacoes no novo posicionamento, **When** compara com a versao anterior, **Then** o botao possui menor espaco vazio interno e destaque visual levemente maior por fundo/contraste sutil, sem aumento de tamanho e sem quebrar hierarquia do cabecalho.
4. **Given** que o usuario clica no botao Transacoes no novo cluster, **When** a navegacao ocorre, **Then** o destino abre diretamente a pagina de historico de transacoes.

---

### User Story 2 - Ajustar proporcao do card de saldo liquido historico (Priority: P2)

Como usuario, eu quero que o card de saldo liquido historico fique visualmente mais compacto, mantendo os alinhamentos definidos, para equilibrar melhor a leitura entre os dois cards de saldo.

**Why this priority**: O card historico estava ocupando mais destaque horizontal do que o desejado para comparacao rapida com o saldo liquido atual.

**Independent Validation**: Pode ser validada comparando a largura e tipografia do card historico antes/depois e checando manutencao de alinhamento interno e entre cards.

**Acceptance Scenarios**:

1. **Given** que os cards de saldo sao exibidos em desktop/tablet, **When** o card de saldo liquido historico e renderizado, **Then** seu bloco textual e reduzido em aproximadamente 20% e o card ocupa aproximadamente 20% menos largura horizontal util em relacao ao baseline anterior.
2. **Given** que os cards de saldo sao exibidos em mobile, **When** o card de saldo liquido historico e renderizado, **Then** a reducao segue ajuste proporcional responsivo sem exigir 20% exatos, preservando legibilidade e alinhamentos.
3. **Given** que o card historico foi compactado, **When** o usuario compara ambos os cards, **Then** os alinhamentos vertical e horizontal definidos para os conteudos continuam preservados.

---

### User Story 3 - Trocar CTA de adicionar por texto explicito (Priority: P3)

Como usuario, eu quero ver o botao de adicionar com o texto "Nova Transacao" em vez de apenas "+", para entender a acao de forma imediata.

**Why this priority**: O texto explicito melhora clareza sem exigir interpretacao de icone isolado.

**Independent Validation**: Pode ser validada conferindo o rótulo exibido no CTA principal da dashboard e se a acao continua levando ao mesmo fluxo.

**Acceptance Scenarios**:

1. **Given** que o usuario esta na dashboard, **When** observa o CTA de adicao, **Then** o botao exibe o texto "Nova Transacao" com proporcoes ajustadas para manter equilibrio visual no cluster de controles.
2. **Given** que o usuario clica em "Nova Transacao", **When** a navegacao ocorre, **Then** o destino funcional permanece o mesmo comportamento ja existente para criar nova transacao.

---

### User Story 4 - Padronizar CTA na pagina de historico (Priority: P3)

Como usuario, eu quero um botao "Nova transacao" na pagina de historico com o mesmo estilo visual do botao "Ver historico de transacoes" da pagina de nova transacao, para manter consistencia visual entre fluxos.

**Why this priority**: A consistencia de estilo entre CTAs reduz carga cognitiva ao alternar entre telas relacionadas.

**Independent Validation**: Pode ser validada abrindo a pagina de historico e comparando estilo visual do novo botao com o botao de referencia da pagina de nova transacao.

**Acceptance Scenarios**:

1. **Given** que o usuario abre a pagina de historico, **When** observa as acoes disponiveis, **Then** existe um botao "Nova transacao" visivel e clicavel.
2. **Given** que o usuario compara estilos entre telas, **When** contrasta o novo botao com "Ver historico de transacoes" da pagina de nova transacao, **Then** ambos usam o mesmo estilo-base de componente/variant, permitindo apenas ajuste de largura/tamanho por responsividade.
3. **Given** que o usuario usa o novo botao da pagina de historico, **When** clica em "Nova transacao", **Then** a navegacao abre o fluxo de nova transacao sem regressao.

---

### Edge Cases

- Labels longos (por exemplo "Nova Transacao") em larguras menores nao devem causar sobreposicao entre controles.
- Valores monetarios extensos no card historico compactado devem permanecer legiveis sem quebrar alinhamentos.
- Caso o botao de historico nao possa usar exatamente o mesmo tamanho por restricao de espaco, a equivalencia de estilo deve ser mantida por prioridade visual e linguagem de componentes.
- Estados de carregamento (fetching) devem manter estabilidade visual nos cards e no cluster de controles.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: System MUST exibir o botao Transacoes no mesmo cluster horizontal de controles que contem filtro de periodo e CTA de adicao na dashboard.
- **FR-014**: System MUST remover o acesso Transacoes da navegacao atual da dashboard para evitar duplicidade, mantendo somente o acesso no novo cluster de controles.
- **FR-015**: System MUST manter o destino do botao Transacoes da dashboard apontando diretamente para a pagina de historico de transacoes.
- **FR-002**: System MUST manter o cluster de controles do topo da dashboard sem sobreposicao em breakpoints suportados.
- **FR-003**: System MUST reduzir o padding interno horizontal do botao Transacoes em desktop/tablet em relacao ao baseline anterior, mantendo altura visual equivalente (sem aumento de dimensao total).
- **FR-004**: System MUST aumentar de forma sutil o destaque visual do botao Transacoes por ajuste de fundo/contraste no estado de repouso, sem transformar seu nivel de enfase no principal CTA da tela.
- **FR-016**: System MUST manter o tamanho do botao Transacoes no novo estado visual (sem aumento de dimensao) ao aplicar o destaque sutil.
- **FR-005**: System MUST substituir o CTA de adicao representado por "+" por um CTA textual "Nova Transacao" na dashboard.
- **FR-006**: System MUST ajustar proporcoes do CTA "Nova Transacao" da dashboard para manter equilibrio visual no cluster de controles, preservando legibilidade do label sem quebra indevida em breakpoints alvo.
- **FR-007**: System MUST manter o comportamento funcional do CTA de adicao da dashboard para o mesmo destino de nova transacao.
- **FR-008**: System MUST reduzir a escala tipografica principal do conteudo do card de saldo liquido historico em desktop/tablet dentro de uma faixa de aproximadamente 20% (tolerancia de 15% a 25%) em relacao ao baseline anterior.
- **FR-009**: System MUST reduzir a ocupacao horizontal util do card de saldo liquido historico em desktop/tablet dentro de uma faixa de aproximadamente 20% (tolerancia de 15% a 25%) em relacao ao baseline anterior, preservando alinhamentos internos e entre cards.
- **FR-013**: System MUST aplicar ajuste proporcional responsivo para o card historico em mobile, sem exigir 20% exatos, mantendo legibilidade e alinhamentos definidos.
- **FR-010**: System MUST exibir um botao "Nova transacao" na pagina de historico.
- **FR-011**: System MUST aplicar ao botao "Nova transacao" da pagina de historico o mesmo estilo-base (mesmo componente/variant) do botao "Ver historico de transacoes" da pagina de nova transacao, permitindo somente ajuste de largura/tamanho por responsividade.
- **FR-012**: System MUST manter no novo botao da pagina de historico o comportamento de navegacao para o fluxo de nova transacao.

### Key Entities *(include if feature involves data)*

- **DashboardControlCluster**: bloco de acoes no topo da dashboard contendo filtro de periodo, CTA de adicionar e botao Transacoes.
- **HistoricalNetBalanceCardVisualProfile**: perfil visual do card de saldo liquido historico, incluindo escala textual e ocupacao horizontal.
- **PrimaryAddTransactionCTA**: CTA textual "Nova Transacao" na dashboard, com prioridade visual principal para acao de criar.
- **HistoryPageNewTransactionCTA**: CTA "Nova transacao" da pagina de historico, que deve seguir estilo base de referencia entre paginas.

### Assumptions & Dependencies

- O baseline de comparacao de 20% considera a interface atual imediatamente anterior a esta feature.
- A solicitacao e estritamente de refinamento visual e de posicionamento, sem alteracao de regras de negocio.
- A navegacao existente para criacao de transacao ja esta implementada e deve ser reaproveitada.
- O estilo de referencia "Ver historico de transacoes" na pagina de nova transacao permanece disponivel para paridade visual.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: Em validacao manual, 100% dos cenarios de dashboard confirmam filtro, Transacoes e "Nova Transacao" no mesmo cluster de controles, sem sobreposicao e sem duplicidade de acesso Transacoes na tela.
- **SC-007**: Em validacao manual, 100% dos cliques no botao Transacoes do novo cluster da dashboard abrem diretamente a pagina de historico de transacoes.
- **SC-008**: Em validacao manual, 100% dos cenarios confirmam que o botao Transacoes ficou mais destacado apenas por fundo/contraste sutil, sem aumento de tamanho.
- **SC-002**: Em validacao manual, 100% dos cenarios desktop/tablet confirmam reducao na faixa de 15% a 25% na escala textual principal e na ocupacao horizontal util do card de saldo liquido historico versus baseline, com alinhamentos preservados.
- **SC-006**: Em validacao manual, 100% dos cenarios mobile confirmam ajuste proporcional do card historico sem sobreposicao e com legibilidade preservada.
- **SC-003**: Em validacao manual, 100% dos cenarios confirmam que o CTA da dashboard exibe "Nova Transacao" sem truncamento e sem quebra indevida de linha nos breakpoints alvo.
- **SC-004**: Em validacao manual, 100% dos cenarios da pagina de historico confirmam presenca do botao "Nova transacao" com mesmo estilo-base do botao de referencia e apenas variacao responsiva de largura/tamanho.
- **SC-005**: Em validacao manual, 100% dos testes de clique confirmam navegacao correta em todos os fluxos criticos: dashboard->history via Transacoes, dashboard->new via Nova Transacao e history->new via Nova transacao.
