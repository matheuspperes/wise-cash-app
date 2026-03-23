# Feature Specification: Remover Demo e Ajustar Fluxo de Transacoes

**Feature Branch**: `009-remove-demo-transactions-flow`  
**Created**: 2026-03-22  
**Status**: Ready for Implementation  
**Input**: User description: "Dados: tire tudo relacionado ao modo demo, os botoes demo e os dados demo; Design: A informacao e o texto do Saldo liquido historico devem ser menores e referenciadas para o lado direito utilizando melhor o espaco do quadro, pode posicionar em outro lugar se achar melhor; o botao Transacoes da dashboard deve apenas abrir a parte do filtro e do historico de gastos ja existente da tela /transactions, porem a tabela mostrara as transacoes e nao apenas os gastos; o botao de + devera abrir apenas a section para criacao de novas transacoes ja criada da rota /transactions, se precisar crie um novo endpoint de new transaction; tire a aba de lancamentos"

## Clarifications

### Session 2026-03-23

- Q: Qual estrategia de navegacao direciona as secoes da tela /transactions? -> A: Usar query params em /transactions para abrir secao especifica (`?view=history` e `?view=new`).
- Q: Qual escopo padrao do historico de transacoes no fluxo unificado? -> A: Historico completo de transacoes, respeitando filtros existentes (data/tipo/categoria).
- Q: Onde remover a aba "Lancamentos"? -> A: Remover "Lancamentos" de `/transactions`.
- Q: Como tornar o card de saldo historico "menor" com criterio objetivo? -> A: Reduzir largura para ~70% da largura anterior no desktop (tolerancia +/-5%) e manter alinhamento a direita.
- Q: Deve existir endpoint/rota nova para criacao de transacao? -> A: Nao criar rota nova; usar `/transactions?view=new`.
- Q: Qual comportamento padrao para `view` ausente/invalido em `/transactions`? -> A: Abrir `history` por padrao.

## User Scenarios & Validation *(mandatory)*

### User Story 1 - Dashboard Sem Demo (Priority: P1)

Como pessoa usuaria, quero ver somente dados reais na dashboard sem botoes ou mensagens de demo, para tomar decisao com informacao confiavel e sem ruido.

**Why this priority**: Mistura de dados reais e simulados compromete confianca e leitura do painel principal.

**Independent Validation**: Validar acessando a dashboard em desktop e mobile e confirmando ausencia completa de controles, textos e dados demo.

**Acceptance Scenarios**:

1. **Given** a dashboard carregada, **When** a pessoa usuaria visualiza cabecalho e componentes, **Then** nao existe controle de ativar/desativar demo.
2. **Given** o resumo historico carregado, **When** o grafico e indicadores sao exibidos, **Then** nao existe serie, label ou sinalizador de demo.

---

### User Story 2 - Acesso Direto no Fluxo de Transacoes (Priority: P1)

Como pessoa usuaria, quero que os atalhos da dashboard me levem direto para as secoes corretas de transacoes, para reduzir cliques e acelerar meu fluxo.

**Why this priority**: A navegacao direta impacta uso diario e produtividade em tarefas frequentes.

**Independent Validation**: Validar clicando no botao Transacoes e no botao +, confirmando abertura direta das secoes de filtro/historico e criacao de transacao.

**Acceptance Scenarios**:

1. **Given** a dashboard aberta, **When** a pessoa usuaria aciona Transacoes, **Then** abre diretamente a area de filtro e historico ja existente no fluxo de transacoes.
2. **Given** a dashboard aberta, **When** a pessoa usuaria aciona +, **Then** abre diretamente a area de criacao de nova transacao.
3. **Given** a listagem de historico aberta, **When** a tabela e exibida, **Then** mostra transacoes (entradas e saidas) e nao apenas gastos.
4. **Given** a dashboard aberta, **When** a pessoa usuaria aciona um atalho de transacoes, **Then** a navegacao para `/transactions` inclui `view=history` ou `view=new` conforme a intencao.
5. **Given** a tela de historico aberta, **When** a pessoa usuaria nao aplica filtros adicionais, **Then** o escopo inicial exibe historico completo de transacoes.

---

### User Story 3 - Hierarquia Visual do Saldo Historico (Priority: P2)

Como pessoa usuaria, quero o card de saldo liquido historico menor e alinhado a direita para usar melhor o espaco e melhorar leitura da prioridade visual.

**Why this priority**: Ajuste visual melhora escaneabilidade sem alterar regra de negocio principal.

**Independent Validation**: Validar em desktop e mobile confirmando texto e valor do saldo historico menores, referenciados a direita e sem quebra de layout.

**Acceptance Scenarios**:

1. **Given** os cards de resumo renderizados, **When** a pessoa usuaria visualiza o saldo historico, **Then** o texto e o valor aparecem com menor destaque e alinhados a direita.
2. **Given** o layout responsivo da dashboard, **When** o tamanho da tela muda, **Then** o card historico permanece legivel e melhor aproveita o espaco do quadro.

---

### User Story 4 - Navegacao Simplificada (Priority: P2)

Como pessoa usuaria, quero remover a aba de lancamentos em `/transactions` para simplificar a navegacao e manter foco no fluxo de transacoes.

**Why this priority**: Reduz complexidade de interface e evita redundancia de navegacao.

**Independent Validation**: Validar a tela `/transactions` garantindo ausencia da aba de lancamentos sem perder acesso ao historico de transacoes.

**Acceptance Scenarios**:

1. **Given** a tela `/transactions`, **When** a pessoa usuaria visualiza as abas/opcoes, **Then** nao existe aba de lancamentos.
2. **Given** a aba removida, **When** a pessoa usuaria precisa consultar historico, **Then** consegue pelo fluxo de transacoes sem perda funcional.

---

### Edge Cases

- Quando a pessoa usuaria acessar links antigos com parametro de demo, o sistema deve ignorar o parametro e manter carregamento normal com dados reais.
- Quando nao houver transacoes no periodo, a secao de historico deve continuar com estado vazio claro, mesmo sem a aba de lancamentos.
- Quando `view` vier ausente ou invalido em `/transactions`, o sistema deve abrir `history` por padrao na mesma rota.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: O sistema MUST remover controles, labels e mensagens de modo demo da dashboard.
- **FR-002**: O sistema MUST remover dados demo do resumo da dashboard e de todos os componentes consumidores desse resumo.
- **FR-003**: O sistema MUST exibir apenas dados reais nos indicadores e grafico historico.
- **FR-004**: O sistema MUST ignorar entradas legadas relacionadas a demo sem falha funcional no carregamento.
- **FR-004a**: O sistema MUST ignorar o query param `demo` legado sem alterar estado visual ou de dados do dashboard.
- **FR-005**: O sistema MUST fazer com que o atalho Transacoes da dashboard abra diretamente a secao existente de filtro e historico no fluxo de transacoes.
- **FR-006**: O sistema MUST fazer com que o atalho + da dashboard abra diretamente a secao existente de criacao de nova transacao.
- **FR-006a**: O sistema MUST usar query parameter `view` na rota `/transactions` para representar a intencao de abertura direta de secao.
- **FR-006b**: O sistema MUST usar o valor `history` em `view` para o atalho Transacoes.
- **FR-006c**: O sistema MUST usar o valor `new` em `view` para o atalho +.
- **FR-006d**: O sistema MUST reutilizar a rota `/transactions` para criacao direta e nao introduzir rota/endpoint adicional para esse fluxo nesta feature.
- **FR-006e**: O sistema MUST abrir a secao `history` quando `view` estiver ausente ou invalido em `/transactions`.
- **FR-007**: O sistema MUST exibir na tabela de historico do fluxo de transacoes tanto entradas quanto saidas.
- **FR-007a**: O sistema MUST manter o historico com escopo completo por padrao (nao limitado ao mes atual).
- **FR-007b**: O sistema MUST manter filtros existentes de data, tipo e categoria no historico unificado.
- **FR-008**: O sistema MUST remover a aba de lancamentos da tela `/transactions`.
- **FR-009**: O sistema MUST manter acesso ao historico e filtros de transacoes em `/transactions` apos remocao da aba de lancamentos.
- **FR-010**: O sistema MUST reduzir o destaque visual do card de saldo liquido historico.
- **FR-011**: O sistema MUST alinhar para a direita o texto e o valor do card de saldo liquido historico.
- **FR-012**: O sistema MUST preservar consistencia responsiva e legibilidade do card historico apos reposicionamento e ajuste de tamanho.
- **FR-012a**: O sistema MUST aplicar no desktop uma largura-alvo aproximada de 70% da largura anterior do card historico, com tolerancia de +/-5%.
- **FR-012b**: O sistema MUST manter alinhamento visual a direita do card historico apos ajuste de largura.

### Key Entities *(include if feature involves data)*

- **DashboardSummaryView**: Conjunto de informacoes agregadas exibidas na dashboard, agora limitado a dados reais.
- **TransactionsNavigationIntent**: Intencao de entrada para secoes especificas do fluxo de transacoes (filtro/historico ou nova transacao).
- **HistoricalBalanceCardState**: Estado visual do card de saldo historico com hierarquia reduzida e alinhamento a direita.
- **TransactionsHistoryView**: Tabela de historico que lista transacoes de entrada e saida no mesmo escopo de consulta.

### Assumptions

- O fluxo de transacoes ja possui secoes existentes de filtro/historico e criacao, faltando apenas acesso direto por atalhos da dashboard.
- O fluxo de criacao direta de transacao sera resolvido por `/transactions?view=new`, sem rota dedicada nova no escopo desta feature.
- A remocao de demo aplica-se ao escopo de dashboard e fluxo correlato de leitura de dados historicos.
- A remocao da aba de lancamentos em `/transactions` nao remove capacidades, apenas consolida navegacao dentro do fluxo de transacoes.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: Em 100% das validacoes da dashboard (desktop e mobile), nao ha qualquer controle, texto ou dado demo visivel.
- **SC-001a**: Em 100% dos acessos com query param `demo` legado, o dashboard carrega normalmente com dados reais e sem elementos demo.
- **SC-002**: Em 100% dos testes de navegacao, o atalho Transacoes abre diretamente a secao de filtro/historico sem etapa intermediaria manual.
- **SC-003**: Em 100% dos testes de navegacao, o atalho + abre diretamente a secao de criacao de nova transacao.
- **SC-003a**: Em 100% dos acessos com `view` ausente/invalido, `/transactions` abre a secao de historico (`history`).
- **SC-004**: Em 100% das validacoes de historico, a tabela de transacoes inclui entradas e saidas no mesmo fluxo.
- **SC-004a**: Em 100% das validacoes sem filtro manual adicional, o historico inicial representa escopo completo de transacoes.
- **SC-005**: Em 100% das validacoes de interface, o card de saldo historico aparece com menor destaque e alinhamento a direita sem quebra de responsividade.
- **SC-005a**: Em 100% das validacoes desktop, a largura do card historico fica no intervalo de 65% a 75% da referencia anterior.
- **SC-006**: A remocao da aba de lancamentos em `/transactions` ocorre sem perda de acesso as funcionalidades de historico de transacoes.
