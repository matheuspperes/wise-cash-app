# Feature Specification: Sync Header and Default Period

**Feature Branch**: `015-sync-header-period`  
**Created**: 2026-03-24  
**Status**: Draft  
**Input**: User description: "Design: Coloque o mesmo header da página inicial nas páginas de '/transactions', apenas mudaria o texto de 'Dashboard' para 'Transações' e ficaria apenas o botão 'Voltar ao dashboard' mantendo o estilo; Troque o valor padrão do filtro de tempo da página inicial de 12 meses para 3 meses"

## Clarifications

### Session 2026-03-24

- Q: Em quais variações da rota de transações o novo header deve ser aplicado? → A: Em todas as entradas de /transactions, incluindo variações por query string (ex.: ?view=history, ?view=new e padrão).
- Q: Como o padrão de 3 meses deve se comportar quando houver preferência de período já persistida? → A: Usar 3 meses apenas quando não houver preferência persistida; quando houver, respeitar a preferência salva.

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

### User Story 1 - Unificar Header em Transações (Priority: P1)

Como usuario, eu quero que a pagina de Transações use o mesmo padrao visual de header da pagina inicial, para manter consistencia de navegacao e reconhecimento da interface.

**Why this priority**: O header e um elemento de navegacao primario e inconsistencia visual causa atrito imediato no fluxo diario.

**Independent Validation**: Pode ser validada abrindo a rota de Transações e confirmando que estrutura/estilo do header seguem o padrao da pagina inicial, com titulo "Transações" e apenas botao "Voltar ao dashboard".

**Acceptance Scenarios**:

1. **Given** que o usuario abre a rota de Transações, **When** o header e exibido, **Then** ele usa o mesmo estilo visual da pagina inicial.
2. **Given** que o usuario esta na rota de Transações, **When** observa o texto principal do header, **Then** o titulo mostrado e "Transações".
3. **Given** que o usuario esta na rota de Transações, **When** observa as acoes do header, **Then** apenas o botao "Voltar ao dashboard" e exibido com o estilo esperado.

---

### User Story 2 - Reduzir Periodo Inicial para 3 Meses (Priority: P1)

Como usuario, eu quero que o filtro de tempo da pagina inicial carregue por padrao 3 meses, para obter leitura mais rapida dos dados recentes sem ajuste manual inicial.

**Why this priority**: O valor padrao afeta diretamente o primeiro carregamento e a rapidez de leitura da informacao mais relevante no uso diario.

**Independent Validation**: Pode ser validada abrindo a pagina inicial em novo carregamento e verificando que o controle de periodo inicia em 3 meses e os dados exibidos refletem esse periodo.

**Acceptance Scenarios**:

1. **Given** que o usuario abre a pagina inicial em novo carregamento, **When** o dashboard e renderizado, **Then** o filtro de tempo inicia com 3 meses selecionados.
2. **Given** que o filtro de tempo inicia com 3 meses, **When** os dados sao exibidos, **Then** os componentes dependentes do periodo refletem a janela de 3 meses.

---

### Edge Cases

- Se o usuario navegar para Transacoes por links internos diferentes, o header deve permanecer consistente em todas as entradas da rota.
- Se houver estado de carregamento no dashboard inicial, o periodo padrao de 3 meses deve continuar aplicado apos conclusao do carregamento.
- Se existir preferencia de periodo persistida, o carregamento inicial deve usar a preferencia salva em vez do padrao de 3 meses.
- Em viewport mobile e desktop, o header de Transacoes deve manter estrutura e legibilidade sem regressao de layout.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: System MUST aplicar na rota de Transacoes o mesmo padrao visual de header utilizado na pagina inicial.
- **FR-002**: System MUST exibir "Transacoes" como titulo principal do header na rota de Transacoes.
- **FR-003**: System MUST exibir somente a acao "Voltar ao dashboard" no header da rota de Transacoes.
- **FR-004**: System MUST manter o estilo visual do botao "Voltar ao dashboard" alinhado ao estilo de acoes equivalente na experiencia atual.
- **FR-005**: System MUST definir 3 meses como valor padrao inicial do filtro de tempo da pagina inicial.
- **FR-006**: System MUST carregar os dados e componentes dependentes do periodo inicial com base em 3 meses no primeiro carregamento da pagina inicial.
- **FR-007**: System MUST preservar o comportamento atual de navegacao do botao "Voltar ao dashboard" sem alterar destino ou semantica da acao.
- **FR-008**: System MUST aplicar o header definido nesta feature em todas as variacoes da rota /transactions, incluindo o estado padrao e variacoes por query string.
- **FR-009**: System MUST aplicar 3 meses como valor inicial apenas quando nao houver preferencia de periodo persistida; quando houver preferencia salva, MUST priorizar a preferencia persistida.

### Key Entities *(include if feature involves data)*

- **TransactionsHeaderState**: representa o conteudo e as acoes exibidas no header da rota de Transacoes, incluindo titulo e disponibilidade da acao de retorno.
- **DashboardPeriodFilterDefault**: representa o valor inicial do filtro de tempo do dashboard e a janela temporal aplicada no carregamento inicial.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: Em validacao manual, 100% das verificacoes da rota de Transacoes confirmam uso do mesmo padrao visual de header da pagina inicial.
- **SC-002**: Em validacao manual, 100% das verificacoes da rota de Transacoes confirmam titulo "Transacoes" e exibicao exclusiva da acao "Voltar ao dashboard".
- **SC-003**: Em validacao manual, 100% dos novos carregamentos da pagina inicial sem preferencia persistida iniciam com filtro de tempo em 3 meses.
- **SC-004**: Em validacao manual, 100% das verificacoes de carregamento inicial sem preferencia persistida confirmam que os dados apresentados refletem janela temporal de 3 meses.
- **SC-005**: Em validacao manual, 100% dos carregamentos com preferencia persistida confirmam uso da preferencia salva, sem sobrescrever para 3 meses.
