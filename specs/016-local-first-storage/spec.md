# Feature Specification: Local-First Financial Storage

**Feature Branch**: `016-local-first-storage`  
**Created**: 2026-03-25  
**Status**: Draft  
**Input**: User description: "Nova feature: Armazenamento local dos dados financeiros no navegador (local-first). Objetivo: substituir o armazenamento em memória atual por persistência no browser para evitar perda de dados entre refresh/navegação/deploy serverless. Abordagem recomendada: IndexedDB com Dexie.js. Escopo funcional: criar/listar/editar/excluir (soft delete) transações; filtros por tipo/categoria/data; busca por nome/categoria/notas; agregações para dashboard (saldo líquido, série mensal, histórico completo com ganhos e gastos, transações do mês atual). Requisitos: persistir dados por usuário no navegador sem backend obrigatório nesta fase; manter tabela temporária de lançamentos em /transactions?view=new apenas para a sessão da página; manter compatibilidade de tipagem e payloads atuais das telas; sem foco em segurança por enquanto. Não objetivos: autenticação, sincronização multi-dispositivo, criptografia, backend persistente. Critérios de aceite: (1) transações permanecem após refresh/reabertura do navegador, (2) dashboard reflete corretamente os lançamentos locais, (3) filtros e busca retornam resultados corretos, (4) histórico completo inclui ganhos e gastos, (5) dados não somem ao navegar entre dashboard e transações. (6) Mantenha ao máximo a UI existente. Entregar spec completa com user stories, edge cases, requisitos funcionais, entidades e critérios mensuráveis."

## Clarifications

### Session 2026-03-25

- Q: Como tratar o soft delete nesta fase? -> A: Soft delete remove da experiência ativa e não há visualização/restauração nesta fase.
- Q: Como isolar "dados por usuário" sem backend obrigatório? -> A: Isolar dados por identificador de usuário quando existir sessão de usuário; se não existir, usar um bucket local anônimo separado.
- Q: Como o sistema deve se comportar quando o armazenamento local estiver indisponível? -> A: Bloquear operações de escrita/leitura persistente e exibir mensagem clara de indisponibilidade de armazenamento local.
- Q: Como tratar os limites do filtro por intervalo de datas? -> A: Intervalo de datas inclusivo nas duas pontas (de e até inclusive).
- Q: Como deve funcionar a sensibilidade da busca textual? -> A: Busca não sensível a maiúsculas/minúsculas nem a acentos.

## Assumptions

- "Dados por usuário" nesta fase significa dados isolados por perfil de navegador/dispositivo, sem conta autenticada.
- Quando houver sessão de usuário disponível, os dados locais devem ser isolados por identificador de usuário; sem sessão, deve ser usado bucket anônimo separado.
- A persistência local desta fase não depende de backend para leitura/escrita de dados financeiros.
- A interface atual deve ser preservada, com mudanças visuais mínimas e sem novos fluxos principais de navegação.
- Exclusão de transações deve ser lógica (soft delete), mantendo rastreabilidade para regras de listagem e agregação.
- A tabela temporária em `/transactions?view=new` continua efêmera na sessão da página e não compõe a persistência de longo prazo até confirmação de salvamento.
- O store `recurrenceRules` faz parte do schema de dados desta fase, sem introduzir novos comportamentos funcionais obrigatórios de recorrência.
- Migração de dados antigos em memória não é obrigatória entre sessões anteriores; a garantia de persistência vale para dados criados após a ativação da feature.

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

### User Story 1 - Persistir Lancamentos Locais (Priority: P1)

Como pessoa usuária, eu quero salvar minhas transações no navegador para que meus lançamentos não sejam perdidos ao atualizar a página, navegar no app ou reabrir o navegador.

**Why this priority**: Persistência é o núcleo da feature e resolve a dor principal de perda de dados.

**Independent Validation**: Criar, editar e excluir logicamente transações; atualizar a página e reabrir o navegador; confirmar que os dados persistem conforme esperado.

**Acceptance Scenarios**:

1. **Given** que uma transação foi salva, **When** a pessoa atualiza a página, **Then** a transação continua disponível nas listagens e cálculos aplicáveis.
2. **Given** que uma transação foi salva, **When** a pessoa fecha e reabre o navegador no mesmo perfil, **Then** a transação permanece disponível.
3. **Given** que uma transação existente foi editada, **When** a edição é confirmada, **Then** os dados atualizados passam a ser exibidos nas telas dependentes.
4. **Given** que uma transação foi excluída logicamente, **When** as listagens e agregações são carregadas, **Then** essa transação não aparece como ativa.

---

### User Story 2 - Consultar e Filtrar Dados Locais (Priority: P1)

Como pessoa usuária, eu quero filtrar e buscar transações locais com precisão para localizar rapidamente lançamentos e analisar meu histórico financeiro.

**Why this priority**: A persistência sem consulta confiável não entrega utilidade prática para uso diário.

**Independent Validation**: Com base em um conjunto conhecido de transações locais, aplicar filtros por tipo/categoria/data e busca por nome/categoria/notas; confirmar resultados esperados.

**Acceptance Scenarios**:

1. **Given** um conjunto de transações locais com tipos e categorias diferentes, **When** a pessoa aplica filtros, **Then** apenas os itens que atendem aos critérios são retornados.
2. **Given** um conjunto de transações locais com nomes, categorias e notas distintas, **When** a pessoa usa a busca textual, **Then** os resultados correspondem ao termo buscado.
3. **Given** filtros e busca combinados, **When** a pessoa executa a consulta, **Then** o resultado respeita simultaneamente todos os critérios ativos.

---

### User Story 3 - Dashboard Baseado em Dados Locais (Priority: P1)

Como pessoa usuária, eu quero que o dashboard reflita meus lançamentos locais para acompanhar saldo líquido, série mensal e histórico completo sem depender de backend nesta fase.

**Why this priority**: O dashboard é a principal visão de acompanhamento financeiro e precisa refletir a nova fonte local.

**Independent Validation**: Inserir transações de ganhos e gastos em diferentes meses e validar saldo líquido, série mensal, histórico completo e transações do mês atual no dashboard.

**Acceptance Scenarios**:

1. **Given** ganhos e gastos locais salvos, **When** o dashboard é exibido, **Then** o saldo líquido corresponde ao cálculo dos lançamentos ativos.
2. **Given** transações distribuídas em meses distintos, **When** a série mensal é exibida, **Then** cada mês apresenta valores coerentes com os lançamentos locais.
3. **Given** histórico com ganhos e gastos, **When** o histórico completo é carregado, **Then** ambos os tipos aparecem corretamente.
4. **Given** transações do mês corrente, **When** a seção do mês atual é carregada, **Then** os itens e totais refletem os dados locais ativos.

---

### Edge Cases

- Reabertura após fechamento inesperado do navegador não deve corromper nem perder transações já confirmadas.
- Em caso de falha de gravação local (limite de armazenamento ou indisponibilidade temporária), o sistema deve informar falha de forma clara e evitar estado parcialmente salvo.
- Quando o armazenamento local estiver indisponível, o sistema deve bloquear leitura/escrita persistente sem fallback silencioso para memória temporária.
- Registros com datas antigas/futuras devem respeitar regras de filtro e agregação sem desaparecer indevidamente.
- Transações exatamente nas datas limite (início e fim) devem ser incluídas no resultado do intervalo.
- Busca sem termo deve retornar comportamento padrão de listagem, sem erro.
- Busca deve ser não sensível a maiúsculas/minúsculas e não sensível a acentuação.
- Exclusões lógicas não devem aparecer em histórico, filtros, busca e agregações ativas.
- Transações excluídas logicamente não devem ter fluxo de visualização ou restauração nesta fase.
- Troca entre usuário autenticado e modo anônimo não deve misturar dados entre buckets locais distintos.
- Navegar entre dashboard e transações não deve limpar o conjunto persistido local.
- A tabela temporária de `/transactions?view=new` deve ser descartada ao encerrar a sessão da página, sem apagar transações já salvas.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: System MUST persistir transações confirmadas localmente no navegador para sobreviver a refresh e reabertura do navegador no mesmo perfil.
- **FR-002**: System MUST suportar criação de transações com os mesmos campos e formatos de payload atualmente usados pelas telas.
- **FR-003**: System MUST suportar edição de transações persistidas mantendo compatibilidade de tipagem e contrato de dados existente.
- **FR-004**: System MUST suportar exclusão lógica de transações, preservando registro e removendo-as da visualização ativa, sem oferecer visualização/restauração de excluídas nesta fase.
- **FR-005**: System MUST listar somente transações ativas por padrão nas telas de transações e dashboard.
- **FR-006**: System MUST aplicar filtros por tipo, categoria e intervalo de datas sobre os dados locais persistidos, com limites de data inclusivos (início e fim).
- **FR-007**: System MUST suportar busca por nome, categoria e notas sobre os dados locais persistidos, sem sensibilidade a maiúsculas/minúsculas e sem sensibilidade a acentuação.
- **FR-008**: System MUST combinar filtros e busca de forma determinística, retornando apenas itens que atendam aos critérios ativos.
- **FR-009**: System MUST calcular saldo líquido no dashboard com base nas transações locais ativas.
- **FR-010**: System MUST gerar série mensal no dashboard com ganhos e gastos por mês a partir das transações locais ativas.
- **FR-011**: System MUST apresentar histórico completo contendo ganhos e gastos, respeitando exclusões lógicas.
- **FR-012**: System MUST apresentar as transações do mês atual com base na mesma fonte local persistida.
- **FR-013**: System MUST manter a tabela temporária em `/transactions?view=new` restrita à sessão da página, sem persistência de longo prazo dessa tabela.
- **FR-014**: System MUST manter os comportamentos de navegação e layout existentes, com alterações visuais mínimas.
- **FR-015**: System MUST operar sem backend obrigatório nesta fase para armazenamento e leitura dos dados financeiros da feature; qualquer adaptador de API deve ser opcional e não pré-requisito de funcionamento local.
- **FR-016**: System MUST manter os dados locais ao navegar entre dashboard e transações.
- **FR-017**: System MUST isolar dados persistidos por identificador de usuário quando houver sessão disponível.
- **FR-018**: System MUST usar bucket local anônimo separado quando não houver sessão de usuário disponível.
- **FR-019**: System MUST impedir mistura de dados entre buckets locais de usuários diferentes e bucket anônimo.
- **FR-020**: System MUST bloquear operações de leitura e escrita persistente quando o armazenamento local estiver indisponível.
- **FR-021**: System MUST informar de forma clara a indisponibilidade de armazenamento local quando FR-020 ocorrer.
- **FR-022**: System MUST evitar fallback silencioso para memória temporária quando o armazenamento persistente estiver indisponível.

### Key Entities *(include if feature involves data)*

- **TransactionRecord**: representa um lançamento financeiro persistido, com identificador, escopo de proprietário (usuário autenticado ou anônimo), tipo (ganho/gasto), categoria, nome, notas, valor, data da transação, metadados de criação/atualização e estado de exclusão lógica.
- **TransactionQueryCriteria**: representa critérios de consulta aplicáveis às listagens, incluindo tipo, categoria, intervalo de datas e termo de busca.
- **DashboardAggregateSnapshot**: representa o conjunto agregado para o dashboard em um instante, incluindo saldo líquido, série mensal, histórico completo (ganhos e gastos) e subconjunto do mês atual.
- **TemporarySessionLaunchTable**: representa os lançamentos temporários visíveis apenas na sessão da página `/transactions?view=new`, separados da persistência de longo prazo até confirmação.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: Em validação manual, 100% dos cenários de persistência confirmam que transações salvas permanecem após refresh e reabertura do navegador no mesmo perfil.
- **SC-002**: Em validação manual, 100% dos cenários de dashboard confirmam saldo líquido, série mensal, histórico completo e mês atual coerentes com os lançamentos locais ativos.
- **SC-003**: Em validação manual, 100% dos cenários de filtro por tipo/categoria/data retornam resultados corretos para um conjunto de dados de referência.
- **SC-004**: Em validação manual, 100% dos cenários de busca por nome/categoria/notas retornam resultados corretos, incluindo combinação com filtros.
- **SC-005**: Em validação manual, 100% dos cenários de navegação entre dashboard e transações mantêm os dados persistidos sem perda.
- **SC-006**: Em validação manual, 100% dos cenários da tabela temporária em `/transactions?view=new` confirmam comportamento apenas por sessão da página.
- **SC-007**: Em revisão funcional, 0 mudanças obrigatórias de fluxo de navegação principal são introduzidas e a estrutura visual principal das telas de dashboard/transações permanece inalterada.
- **SC-008**: Em validação manual, 100% dos cenários com troca de escopo (usuário autenticado/anônimo ou usuário A/B) confirmam ausência de mistura de dados entre buckets.
- **SC-009**: Em validação manual, 100% dos cenários de indisponibilidade de armazenamento local confirmam bloqueio de operações persistentes e mensagem clara ao usuário.
- **SC-010**: Em validação manual, 100% dos cenários de filtro por data confirmam inclusão de transações exatamente nas datas de início e fim do intervalo.
- **SC-011**: Em validação manual, 100% dos cenários de busca com variação de caixa e acentuação retornam o mesmo conjunto esperado de resultados.
