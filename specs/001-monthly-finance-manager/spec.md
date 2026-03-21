# Feature Specification: Gestao Financeira Mensal Simples

**Feature Branch**: `001-monthly-finance-manager`  
**Created**: 2026-03-21  
**Status**: Draft  
**Input**: User description: "Criar uma ferramenta de gestao financeira mensal com simplicidade extrema, eficiencia visual e foco em uso recorrente."

## Clarifications

### Session 2026-03-21

- Q: Qual modelo de acesso/autenticacao para a V1? -> A: Sem autenticacao na V1 (modo local/sessao unica), com login apenas no futuro.
- Q: Como tratar recorrencia quando o dia nao existir no mes de destino (ex.: dia 31)? -> A: Lancar no ultimo dia do mes.
- Q: Como tratar protecao de dados financeiros em repouso na V1? -> A: Armazenar sem criptografia em repouso na V1.
- Q: Qual regra de precisao monetaria para valores de transacao? -> A: Fixar 2 casas decimais com arredondamento comercial.
- Q: Qual escopo de exportacao/importacao de dados na V1? -> A: Exportacao manual em CSV e JSON; importacao fora do escopo da V1.

## User Scenarios & Validation *(mandatory)*

### User Story 1 - Registro rapido de transacoes (Priority: P1)

Como usuario, quero registrar ganhos e gastos em poucos passos para manter meu controle financeiro diario sem friccao.

**Why this priority**: Sem registro rapido e consistente, nao existe base de dados confiavel para qualquer analise financeira posterior.

**Independent Validation**: Pode ser validado ao cadastrar uma sequencia de ganhos e gastos em um mesmo mes e confirmar que todos os registros obrigatorios sao persistidos corretamente.

**Acceptance Scenarios**:

1. **Given** que estou na tela de registro, **When** informo nome, tipo, categoria, valor e data validos e salvo, **Then** a transacao e criada e aparece imediatamente na listagem do mes.
2. **Given** que tento salvar uma transacao sem um dos campos obrigatorios, **When** confirmo o cadastro, **Then** o sistema bloqueia o salvamento e informa exatamente quais campos faltam.
3. **Given** que marco uma transacao como recorrente mensal, **When** inicio um novo mes, **Then** o sistema gera automaticamente a nova ocorrencia da transacao para o planejamento do periodo.

---

### User Story 2 - Busca e filtros de alta velocidade (Priority: P2)

Como usuario, quero localizar qualquer transacao por texto e filtros para auditar meus lancamentos sem perder tempo.

**Why this priority**: A confianca no controle financeiro depende de encontrar rapidamente transacoes antigas e comparar periodos.

**Independent Validation**: Pode ser validado criando um conjunto variado de transacoes e comprovando que o usuario localiza um item especifico em ate tres interacoes de interface.

**Acceptance Scenarios**:

1. **Given** que tenho transacoes de meses e categorias diferentes, **When** aplico filtro por tipo e categoria, **Then** a listagem exibe apenas resultados compatveis com os filtros ativos.
2. **Given** que existe uma transacao com texto unico no nome, **When** busco por esse termo, **Then** encontro a transacao alvo em ate tres cliques ou toques.
3. **Given** que limpo filtros e busca, **When** retorno para a visao padrao do mes, **Then** todos os registros do periodo voltam a ser exibidos.

---

### User Story 3 - Dashboard com inteligencia imediata (Priority: P3)

Como usuario, quero abrir o dashboard e entender rapidamente meu saldo liquido atual e a evolucao historica para tomar decisoes financeiras melhores.

**Why this priority**: O dashboard transforma dados operacionais em visao executiva, sustentando uso recorrente e tomada de decisao.

**Independent Validation**: Pode ser validado ao abrir a tela inicial com dados historicos e confirmar exibicao clara de saldo atual e comparacao temporal visual.

**Acceptance Scenarios**:

1. **Given** que existem transacoes no periodo atual, **When** acesso a tela inicial, **Then** o saldo liquido do mes e exibido com destaque visual imediato.
2. **Given** que existem dados de periodos anteriores, **When** visualizo o grafico de area historico, **Then** consigo comparar tendencia de ganhos, gastos e saldo sem navegar para outra tela.
3. **Given** que o periodo selecionado muda, **When** alterno a referencia temporal, **Then** os indicadores e graficos refletem o novo contexto de forma consistente.

### Edge Cases

- Transacoes com valor zero, negativo indevido ou formato invalido devem ser bloqueadas com mensagem objetiva.
- Valores com mais de 2 casas decimais devem ser normalizados por arredondamento comercial antes do salvamento.
- Duas transacoes com mesmo nome e data devem ser permitidas, desde que os demais dados sejam explicitamente confirmados pelo usuario.
- Recorrencias que cairiam em datas inexistentes no mes (ex.: dia 31 em fevereiro) devem ser lancadas no ultimo dia do mes e identificadas ao usuario.
- Busca sem resultados deve manter estado de filtros e exibir retorno claro sem apagar o contexto atual.
- Mudanca de localidade ou formato regional do dispositivo nao deve quebrar exibicao em BRL e data local brasileira.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: O sistema MUST permitir criar, editar e excluir transacoes financeiras mensais.
- **FR-002**: Cada transacao MUST conter obrigatoriamente nome, tipo (ganho ou gasto), categoria, valor monetario e data.
- **FR-003**: O sistema MUST validar obrigatoriedade, formato de valor e formato de data antes de salvar qualquer transacao.
- **FR-004**: O sistema MUST suportar definicao de recorrencia mensal para transacoes e gerar automaticamente ocorrencias futuras.
- **FR-005**: O usuario MUST conseguir filtrar transacoes por periodo, tipo e categoria.
- **FR-006**: O usuario MUST conseguir buscar transacoes por texto livre no nome da transacao, no nome da categoria e nas notas da transacao.
- **FR-007**: O sistema MUST exibir no dashboard o saldo liquido atual com destaque visual na abertura da aplicacao.
- **FR-008**: O dashboard MUST exibir comparacao historica por meio de visualizacao de area clara e intuitiva.
- **FR-009**: A interface do produto MUST estar integralmente em Portugues do Brasil, com moeda em BRL e datas no padrao local brasileiro.
- **FR-010**: O sistema MUST ser estruturado para permitir expansao futura com metas de economia personalizadas e detalhamento adicional de transacoes sem reestruturacao completa do produto.
- **FR-011**: O fluxo principal de localizar uma transacao especifica MUST ser concluivel em ate tres cliques ou toques a partir da tela de listagem.
- **FR-012**: O sistema MUST priorizar interacoes de entrada rapida para reduzir o tempo de cadastro e incentivar uso recorrente.
- **FR-013**: A V1 MUST operar sem autenticacao de conta, em modo de uso local com sessao unica por ambiente.
- **FR-014**: O sistema MUST prever evolucao para autenticacao futura sem exigir redesenho completo do dominio de transacoes.
- **FR-015**: Em recorrencia mensal, quando o dia configurado nao existir no mes de destino, o sistema MUST criar a ocorrencia no ultimo dia desse mes.
- **FR-016**: Na V1, os dados financeiros MUST ser armazenados sem criptografia em repouso no nivel da aplicacao.
- **FR-017**: O sistema MUST manter possibilidade de adotar criptografia em repouso em versoes futuras sem migracao destrutiva dos dados existentes.
- **FR-018**: O valor monetario de transacoes MUST usar 2 casas decimais e arredondamento comercial para normalizacao de entrada.
- **FR-019**: A V1 MUST permitir exportacao manual de dados financeiros nos formatos CSV e JSON.
- **FR-020**: Importacao de dados financeiros MUST NOT fazer parte do escopo da V1.

### Key Entities *(include if feature involves data)*

- **Transaction**: Registro financeiro individual com nome, tipo, categoria, valor (2 casas decimais), data, indicador de recorrencia e estado de atividade.
- **Category**: Classificacao de transacao usada para agrupamento, filtro e leitura de padroes de consumo/receita.
- **RecurrenceRule**: Regra de geracao automatica de transacoes futuras, incluindo frequencia mensal, data de referencia e comportamento para meses curtos.
- **MonthlySummary**: Agregado mensal com total de ganhos, total de gastos, saldo liquido e indicadores comparativos com periodos anteriores.
- **DashboardSnapshot**: Visao consolidada de indicadores e serie historica para exibicao imediata na tela inicial.

## Assumptions

- O produto e voltado a uso pessoal individual, com um unico perfil primario de uso por ambiente.
- Na V1, o acesso e direto (sem login) e focado em um unico usuario por ambiente.
- A comparacao historica considera, por padrao, os ultimos 12 meses quando nao houver selecao explicita de periodo.
- Categorias podem ser reutilizadas em multiplas transacoes e periodos sem limite pratico para o usuario final.
- Validacao de qualidade sera baseada em cenarios manuais documentados, em conformidade com a constituicao do projeto.

## Dependencies

- Disponibilidade continua dos dados de transacoes para calculo de saldo e historico.
- Definicao e manutencao de categorias pelo usuario para viabilizar filtros e comparacoes.
- Persistencia confiavel de regras de recorrencia para geracao de planejamento de meses futuros.
- Ambiente de armazenamento local ou remoto com controles basicos de acesso operacional no dispositivo/infraestrutura.
- Disponibilidade de geracao de arquivos para download/exportacao manual em CSV e JSON.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: 90% dos cadastros de transacao completos sao concluidos em ate 20 segundos apos inicio da insercao de dados.
- **SC-002**: 95% das buscas por transacao retornam o item desejado em ate tres cliques ou toques.
- **SC-003**: 100% das transacoes salvas possuem os cinco campos obrigatorios preenchidos e validados.
- **SC-004**: 95% das transacoes marcadas como recorrentes aparecem automaticamente no mes seguinte sem intervencao manual.
- **SC-005**: Em validacao com usuarios-alvo, pelo menos 85% relatam compreender saldo atual e tendencia historica em menos de 10 segundos na tela inicial.
- **SC-006**: 100% das telas voltadas ao usuario final apresentam texto em Portugues do Brasil e formatacao monetaria/data local correta.
