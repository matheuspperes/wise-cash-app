# Feature Specification: Refinar Legenda, Saldo Historico e Tabela Mensal

**Feature Branch**: `008-refine-legend-history-layout`  
**Created**: 2026-03-22  
**Status**: Draft  
**Input**: User description: "Design: Reposicione a legenda existente de 'Receitas e Despesas' em um lugar melhor em relação ao gráfico; Deixe o 'Saldo líquido histórico' menor e e posicionado no lado direito; Dados: Na dashboard mude a tabela de gastos do mês atual para mostrar as transações do mês atual."

## Clarifications

### Session 2026-03-22

- Q: Como definir de forma objetiva o "Saldo liquido historico menor"? -> A: Em desktop, largura aproximada de 70% da largura atual do card; em mobile, largura total quando layout estiver empilhado.
- Q: Quais colunas e ordenacao a tabela do mes atual deve usar para transacoes? -> A: Colunas Data, Descricao, Categoria, Tipo e Valor; ordenacao por data decrescente.
- Q: Qual deve ser a posicao final da legenda de Receitas e Despesas em relacao ao grafico? -> A: Legenda acima do grafico, alinhada a direita e fora da area de plotagem.
- Q: Quais transacoes entram na tabela do mes atual? -> A: Apenas transacoes ativas (receitas e despesas) com transactionDate no mes atual.

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

### User Story 1 - Leitura Clara do Grafico (Priority: P1)

Como usuario da dashboard, quero ver a legenda de Receitas e Despesas em uma posicao mais adequada ao grafico para interpretar os dados sem obstrucao visual.

**Why this priority**: O grafico mensal e um resumo principal da tela; se a legenda estiver em local ruim, compromete leitura imediata.

**Independent Validation**: Pode ser validada abrindo a dashboard com historico visivel e confirmando que a legenda esta posicionada sem competir com a area do grafico.

**Acceptance Scenarios**:

1. **Given** a dashboard com serie mensal carregada, **When** o usuario observa legenda e grafico, **Then** a legenda aparece acima do grafico, alinhada a direita e fora da area de plotagem, sem encobrir informacao relevante.
2. **Given** diferentes larguras de tela usuais (mobile e desktop), **When** a dashboard e exibida, **Then** a legenda permanece legivel e bem posicionada em relacao ao grafico.

---

### User Story 2 - Hierarquia do Saldo Historico (Priority: P2)

Como usuario da dashboard, quero o bloco de Saldo liquido historico menor e no lado direito para melhorar hierarquia visual e priorizar o que e mais importante na leitura inicial.

**Why this priority**: Apos melhorar o grafico, a distribuicao dos cards precisa reforcar entendimento rapido sem poluicao visual.

**Independent Validation**: Pode ser validada ao abrir a dashboard e comparar o tamanho/posicao do bloco historico com os demais blocos, confirmando alinhamento no lado direito.

**Acceptance Scenarios**:

1. **Given** a dashboard carregada, **When** o usuario visualiza os cards de resumo, **Then** o card de Saldo liquido historico aparece menor que antes e posicionado no lado direito do conjunto principal.
2. **Given** a dashboard em desktop e mobile, **When** o layout e renderizado, **Then** o card historico usa largura aproximada de 70% em desktop e largura total em mobile com empilhamento, mantendo posicionamento coerente.

---

### User Story 3 - Tabela do Mes Atual com Transacoes (Priority: P3)

Como usuario da dashboard, quero que a tabela do mes atual mostre as transacoes do mes atual para ter visao completa do periodo no mesmo contexto.

**Why this priority**: Completa a leitura da dashboard, unindo resumo visual e detalhamento transacional do mes em um unico fluxo.

**Independent Validation**: Pode ser validada carregando a dashboard com dados do mes atual e confirmando que a tabela lista transacoes do periodo, nao apenas gastos.

**Acceptance Scenarios**:

1. **Given** que existem receitas e despesas ativas no mes atual, **When** a dashboard e exibida, **Then** a tabela do mes atual apresenta transacoes ativas do mes atual com informacao de tipo e valor.
2. **Given** que existem transacoes no mes atual, **When** a tabela e exibida, **Then** as colunas apresentadas sao Data, Descricao, Categoria, Tipo e Valor com ordenacao por data decrescente.
3. **Given** que nao existem transacoes no mes atual, **When** a tabela e exibida, **Then** o estado vazio informa claramente ausencia de transacoes no periodo.

### Edge Cases

- Quando houver somente um tipo de transacao (apenas receitas ou apenas despesas) no mes atual, a tabela deve continuar clara e correta.
- Quando houver muitas transacoes no mes atual, a tabela deve manter legibilidade sem quebra de layout.
- Quando o nome de categorias ou descricoes for longo, a apresentacao deve preservar leitura sem sobreposicao.
- Quando o historico mensal do grafico estiver vazio, a legenda nao deve ocupar espaco de forma confusa.
- Quando o usuario alternar entre tamanhos de tela, legenda e card historico devem manter posicionamento consistente.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: O sistema MUST reposicionar a legenda existente de Receitas e Despesas em relacao ao grafico mensal para melhorar leitura.
- **FR-002**: O sistema MUST garantir que a legenda nao encubra dados, linhas ou pontos relevantes do grafico.
- **FR-013**: O sistema MUST posicionar a legenda de Receitas e Despesas acima do grafico, alinhada a direita e fora da area de plotagem.
- **FR-003**: O sistema MUST exibir o bloco Saldo liquido historico com largura equivalente a 70% (+/- 5%) da largura pre-mudanca do card, medida no breakpoint desktop >= 1024px.
- **FR-004**: O sistema MUST posicionar o bloco Saldo liquido historico no lado direito da area principal de resumo da dashboard.
- **FR-011**: O sistema MUST exibir o bloco Saldo liquido historico com largura total quando o layout estiver empilhado em mobile.
- **FR-005**: O sistema MUST substituir o escopo da tabela de Gastos do mes atual para exibir Transacoes do mes atual.
- **FR-006**: O sistema MUST incluir na tabela do mes atual registros de receitas e despesas do periodo atual.
- **FR-007**: O sistema MUST exibir identificacao de tipo da transacao na tabela do mes atual para diferenciar entradas e saidas.
- **FR-008**: O sistema MUST manter ordenacao temporal consistente das transacoes do mes atual, da mais recente para a mais antiga.
- **FR-009**: O sistema MUST manter estado vazio claro quando nao houver transacoes no mes atual.
- **FR-010**: O sistema MUST preservar consistencia visual da dashboard apos os ajustes de legenda, card historico e tabela mensal.
- **FR-012**: O sistema MUST exibir na tabela do mes atual as colunas Data, Descricao, Categoria, Tipo e Valor.
- **FR-014**: O sistema MUST incluir na tabela do mes atual apenas transacoes ativas cujo transactionDate esteja dentro do mes atual.

### Key Entities *(include if feature involves data)*

- **ChartLegendLayoutState**: Estado de posicionamento da legenda do grafico em relacao ao bloco de visualizacao mensal.
- **HistoricalNetBalanceCardState**: Estado de apresentacao do card de saldo historico com atributos de tamanho relativo e posicao lateral.
- **CurrentMonthTransactionRow**: Linha de transacao do mes atual contendo data, descricao, categoria, tipo e valor.
- **CurrentMonthTransactionsView**: Conjunto ordenado de linhas de transacao do mes atual com comportamento de estado vazio.

## Assumptions

- "Lugar melhor" para legenda significa posicao com leitura clara, sem competir com area de dados do grafico.
- "Saldo liquido historico menor" significa reducao visual perceptivel de destaque em relacao ao layout atual.
- "Transacoes do mes atual" inclui receitas e despesas do mes vigente no contexto do usuario.
- Nomes tecnicos legados (por exemplo, componentes com "expenses" no nome) podem ser mantidos por compatibilidade, desde que o comportamento funcional reflita "transacoes".

## Dependencies

- Disponibilidade de transacoes com data valida para filtragem por mes atual.
- Manutencao da estrutura de dashboard existente para receber ajustes de layout sem regressao.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: 100% das validacoes visuais confirmam que a legenda de Receitas e Despesas nao encobre informacoes relevantes do grafico.
- **SC-008**: 100% das validacoes de layout confirmam a legenda acima do grafico, alinhada a direita e fora da area de plotagem, em desktop e mobile.
- **SC-002**: 100% das validacoes de layout confirmam o card Saldo liquido historico com largura equivalente a 70% (+/- 5%) no breakpoint desktop >= 1024px e no lado direito da composicao principal.
- **SC-006**: 100% das validacoes em mobile confirmam o card Saldo liquido historico com largura total quando o layout estiver empilhado, sem quebra visual.
- **SC-003**: 100% das validacoes da tabela do mes atual confirmam presenca de receitas e despesas do periodo quando houver dados.
- **SC-004**: 100% dos cenarios sem transacoes no mes atual exibem estado vazio claro e sem quebra de layout.
- **SC-005**: 100% das validacoes em mobile e desktop confirmam consistencia visual apos os ajustes de legenda, card historico e tabela mensal.
- **SC-007**: 100% das validacoes da tabela do mes atual confirmam colunas Data, Descricao, Categoria, Tipo e Valor com ordenacao por data decrescente.
- **SC-009**: 100% das validacoes da tabela do mes atual confirmam inclusao apenas de transacoes ativas com transactionDate no mes atual.
- **SC-010**: 100% das validacoes combinadas (legenda + card historico + tabela mensal) em desktop e mobile confirmam ausencia de regressao visual conjunta.
