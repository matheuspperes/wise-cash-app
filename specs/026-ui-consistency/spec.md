# Feature Specification: Consistência visual do fluxo atual

**Feature Branch**: `[026-ui-consistency]`  
**Created**: [2026-06-05]  
**Status**: Draft  
**Input**: User description: "Ajustar a interface e consistência visual do fluxo atual."

## Clarifications

### Session 2026-07-06

- Q: Na tela de Dados, como a seção de importação e exportação deve se comportar no mobile? → A: Empilhar as seções em coluna, cada uma com largura total.
- Q: Onde a coluna "TIPO" deve ser removida? → A: Em qualquer tabela ou acordeão da aplicação que reutilize o mesmo modelo de transação.
- Q: Na edição de transações, qual nível de equivalência a máscara de dinheiro deve ter com o campo de novas transações? → A: Reutilizar exatamente o mesmo componente e comportamento do campo de novas transações.

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

### User Story 1 - Edição com valor consistente (Priority: P1)

Como pessoa que edita uma transação, quero que o campo de valor na edição reutilize exatamente a mesma máscara e comportamento das novas transações, para revisar e corrigir valores sem mudar o comportamento já conhecido.

**Why this priority**: A edição é uma tarefa frequente e sensível; consistência no campo de valor reduz erro visual e evita divergência entre criação e edição.

**Independent Validation**: Pode ser validado abrindo uma transação existente, editando o valor e conferindo que a formatação, validação e interação são as mesmas do fluxo de nova transação.

**Acceptance Scenarios**:

1. **Given** uma transação existente aberta para edição, **When** a pessoa altera o valor, **Then** o campo reutiliza o mesmo componente, a mesma máscara e o mesmo comportamento de formatação usado em novas transações.
2. **Given** um valor válido inserido na edição, **When** a pessoa salva a transação, **Then** o cadastro e a listagem continuam com o comportamento atual.

---

### User Story 2 - Tabelas com colunas consistentes (Priority: P2)

Como pessoa que consulta dados, quero ver a mesma apresentação das tabelas em qualquer visão que reutilize o modelo de transação, para comparar informações sem ruído visual desnecessário.

**Why this priority**: A remoção da coluna "TIPO" afeta duas telas centrais e deve ser aplicada de forma consistente onde o mesmo dado é exibido.

**Independent Validation**: Pode ser validado verificando a dashboard, a tela de transações e as visualizações que reutilizam os modelos `CurrentMonthTransactionRow` e `MonthlyTransactionHistoryRow` para confirmar que a coluna "TIPO" não é exibida, sem alteração nos dados exibidos ou na ordenação.

**Acceptance Scenarios**:

1. **Given** a dashboard com tabela de resumo visível, **When** a pessoa compara as colunas apresentadas, **Then** a coluna "TIPO" não aparece na visualização.
2. **Given** a tela de transações com acordeões/tabelas abertas, **When** a pessoa inspeciona os dados exibidos, **Then** a coluna "TIPO" não aparece em nenhuma tabela ou acordeão que consuma esse mesmo modelo de dados.

---

### User Story 3 - Tela de Dados alinhada ao padrão visual (Priority: P3)

Como pessoa que acessa a área de dados, quero que a tela de Dados siga o mesmo padrão visual das demais páginas e que suas seções tenham proporções visuais equilibradas, para reconhecer a navegação e o conteúdo com facilidade.

**Why this priority**: A tela de Dados é importante, mas a alteração é de apresentação e pode ser validada separadamente sem afetar outras funções do produto.

**Independent Validation**: Pode ser validado acessando a tela de Dados e confirmando que o header segue o padrão das demais telas e que as seções de importação e exportação possuem proporção visual equivalente, enquanto o bloco de modelo permanece destacado à parte.

**Acceptance Scenarios**:

1. **Given** a tela de Dados carregada, **When** a pessoa compara seu header com o de outras páginas principais, **Then** os botões seguem o mesmo padrão visual.
2. **Given** a tela de Dados em desktop, **When** a pessoa visualiza as seções disponíveis, **Then** importação e exportação mantêm tamanhos visuais equivalentes e o bloco de modelo CSV permanece separado.
3. **Given** a tela de Dados em mobile, **When** a pessoa visualiza as seções disponíveis, **Then** importação e exportação ficam empilhadas em coluna, cada uma com largura total, mantendo o bloco de modelo separado.

---

### Edge Cases

<!--
  ACTION REQUIRED: The content in this section represents placeholders.
  Fill them out with the right edge cases.
-->

- A tela deve continuar legível em larguras menores, sem quebrar o layout entre importação, exportação e o bloco de modelo.
- A presença ou ausência da coluna "TIPO" não pode alterar os dados retornados, apenas a forma como são apresentados.
- A máscara de edição não pode alterar o comportamento de salvar, cancelar ou listar transações.

### Assumptions

- As telas e fluxos atuais já existem e continuarão sendo usados como base para o ajuste visual.
- A máscara de valor em edição deve seguir a mesma percepção de formatação do campo de novas transações, sem alterar o significado dos dados salvos.
- A remoção da coluna "TIPO" é exclusivamente visual e não implica remoção do dado do modelo de transação.

## Requirements *(mandatory)*

<!--
  ACTION REQUIRED: The content in this section represents placeholders.
  Fill them out with the right functional requirements.
-->

### Functional Requirements

- **FR-001**: A tela de Dados MUST exibir importação e exportação com equilíbrio visual equivalente em desktop, e MUST empilhar as seções em mobile com largura total, sem que uma seção pareça dominante em relação à outra.
- **FR-002**: A tela de Dados MUST manter o cabeçalho com o mesmo padrão visual das demais páginas do fluxo atual, incluindo o estilo dos botões exibidos nessa área.
- **FR-003**: A dashboard MUST ocultar a coluna "TIPO" da tabela de resumo, preservando o restante da apresentação e a informação disponível nas demais colunas.
- **FR-004**: As visualizações que reutilizam os modelos `CurrentMonthTransactionRow` e `MonthlyTransactionHistoryRow`, além de qualquer outra tabela ou acordeão com o mesmo modelo, MUST ocultar a coluna "TIPO", mantendo a consistência entre as visualizações.
- **FR-005**: O formulário de edição de transações MUST reutilizar o mesmo componente, máscara, formatação e validação visual usada no fluxo de novas transações.
- **FR-006**: As alterações MUST preservar o comportamento atual de cadastro, edição e listagem, sem modificar regras de negócio, critérios de salvamento ou conteúdo persistido.
- **FR-007**: As alterações MUST manter a responsividade e a usabilidade no desktop e no mobile.

### Key Entities *(include if feature involves data)*

- **Transação apresentada**: registro exibido em listas, tabelas e acordeões, incluindo campos visuais como valor, data, categoria e tipo quando aplicável.
- **Campo de valor em edição**: entrada usada para alterar o valor de uma transação existente, com máscara e validação consistentes com o fluxo de criação.
- **Seção da tela de Dados**: bloco visual dedicado a importação, exportação ou download de modelo CSV, com proporção e destaque coerentes.

## Success Criteria *(mandatory)*

<!--
  ACTION REQUIRED: Define measurable success criteria.
  These must be technology-agnostic and measurable.
-->

### Measurable Outcomes

- **SC-001**: 100% das exibições de dashboard, transações e demais tabelas que reutilizem o mesmo modelo deixam de mostrar a coluna "TIPO" sem afetar o número de registros exibidos.
- **SC-002**: Em desktop, a tela de Dados apresenta importação e exportação com proporção visual equivalente em pelo menos 2 tamanhos de viewport representativos; em mobile, as seções são empilhadas em coluna com largura total e separação clara do bloco de modelo.
- **SC-003**: 100% dos campos de valor em edição reutilizam o mesmo componente e apresentam o mesmo padrão de máscara e formatação visual percebido nas novas transações.
- **SC-004**: Nenhuma das alterações reduz a capacidade de cadastrar, editar ou listar transações nos fluxos existentes.

## Affected Screens & Components

- **Dashboard**: tabela de resumo e header de navegação.
- **Tela de Transações**: acordeões/tabelas que reutilizam o mesmo modelo de dados.
- **Tela de Dados**: header, seção de importação, seção de exportação e bloco de download do modelo CSV.
- **Formulário de edição de transações**: campo de valor e sua experiência visual.
