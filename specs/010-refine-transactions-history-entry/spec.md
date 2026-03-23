# Feature Specification: Refine Transactions History Entry

**Feature Branch**: `010-refine-transactions-history-entry`  
**Created**: 2026-03-23  
**Status**: Ready for Planning  
**Input**: User description: "Design: Em '/transactions?view=history' mude o titulo de 'Historico de transacoes' para algo que indique que sao resultados do filtro que usuario colocou, essa section so deve aparecer se o usuario preencher algo do filtro, se achar melhor pode aproveitar a section existente com os acordeoes; Mude 'Historico completo de gastos' para 'Historico completo' tambem acrescentando transacoes de ganhos; Em '/transactions?view=new' faca uma tabela de 'Lancamentos' para mostrar a transacao que o usuario acabou de salvar quando clicar em 'Salvar', essa tabela devera ser temporaria e especifica para a pagina e nao precisa ser salva."

## Clarifications

### Session 2026-03-23

- Q: Quando considerar filtro "ativo" para exibir a secao de resultados filtrados? → A: Apenas quando o usuario alterar/preencher manualmente ao menos um campo de filtro na sessao atual.
- Q: O que fazer com a tabela temporaria de "Lancamentos" ao sair de `/transactions?view=new`? → A: Limpar a tabela ao sair de `view=new`; ao voltar, iniciar vazia.
- Q: Qual deve ser a ordenacao dos lancamentos temporarios em `/transactions?view=new`? → A: Mostrar do mais recente para o mais antigo (novo no topo).
- Q: Qual deve ser o titulo canonico da secao de resultados filtrados? → A: Usar exatamente "Resultados dos filtros aplicados".

## User Scenarios & Validation *(mandatory)*

### User Story 1 - Visualizar resultados de filtro com contexto claro (Priority: P1)

Como usuario, eu quero ver uma secao de resultados apenas quando eu realmente aplicar filtros, com um titulo que deixe claro que os itens exibidos sao resultado dos filtros escolhidos.

**Why this priority**: Esta historia evita ruido visual e deixa o comportamento da tela previsivel, reduzindo interpretacoes erradas sobre o que esta sendo exibido.

**Independent Validation**: Pode ser validada acessando `/transactions?view=history`, testando campos de filtro vazios e preenchidos, e confirmando exibicao condicional da secao com titulo contextual.

**Acceptance Scenarios**:

1. **Given** que o usuario acessa `/transactions?view=history` sem preencher nenhum filtro, **When** a tela renderiza, **Then** a secao de resultados filtrados nao e exibida.
2. **Given** que o usuario preenche ao menos um criterio de filtro, **When** aplica o filtro, **Then** a secao de resultados filtrados aparece com titulo indicando que se trata de resultados do filtro.
3. **Given** que o usuario limpa todos os filtros ativos, **When** confirma a limpeza, **Then** a secao de resultados filtrados deixa de ser exibida.

---

### User Story 2 - Consultar historico completo de gastos e ganhos (Priority: P2)

Como usuario, eu quero que a visao de historico completo mostre tanto gastos quanto ganhos e use uma nomenclatura neutra para representar ambos os tipos de transacao.

**Why this priority**: Garante compreensao correta do escopo da listagem e melhora a confianca do usuario ao analisar todo o seu movimento financeiro.

**Independent Validation**: Pode ser validada acessando `/transactions?view=history`, verificando o titulo da secao principal e confirmando a presenca de itens de gasto e ganho no historico completo.

**Acceptance Scenarios**:

1. **Given** que o usuario acessa a visao de historico, **When** observa o titulo da secao de historico completo, **Then** o texto exibido e "Historico completo".
2. **Given** que existem transacoes de gasto e ganho no periodo consultado, **When** o usuario visualiza o historico completo, **Then** ambos os tipos aparecem na mesma experiencia de historico.

---

### User Story 3 - Confirmar lancamento recem-salvo em lista temporaria (Priority: P3)

Como usuario, eu quero ver imediatamente o lancamento que acabei de salvar em uma tabela local da pagina `/transactions?view=new`, sem depender de persistencia adicional.

**Why this priority**: Fornece feedback imediato apos salvar e reduz duvida sobre sucesso da acao, sem alterar regras de armazenamento.

**Independent Validation**: Pode ser validada acessando `/transactions?view=new`, salvando uma nova transacao e confirmando a exibicao do item em tabela temporaria de "Lancamentos" durante a sessao da pagina.

**Acceptance Scenarios**:

1. **Given** que o usuario esta em `/transactions?view=new`, **When** salva uma transacao valida, **Then** a tabela "Lancamentos" e exibida contendo a transacao recem-salva.
2. **Given** que o usuario recarrega a pagina ou inicia nova sessao da pagina, **When** retorna para `/transactions?view=new`, **Then** os lancamentos temporarios anteriores nao sao reapresentados automaticamente.

---

### Edge Cases

- Usuario preenche parcialmente um filtro (ex.: apenas valor minimo) e aplica: a secao de resultados filtrados deve aparecer e respeitar o criterio informado.
- Usuario aplica filtro que nao retorna itens: a secao de resultados filtrados deve aparecer com estado vazio explicito, sem confundir com ausencia de filtro.
- Usuario salva mais de uma transacao em sequencia em `/transactions?view=new`: a tabela temporaria deve refletir cada lancamento salvo com o mais recente no topo.
- Usuario tenta salvar transacao invalida: nenhuma linha nova deve ser adicionada na tabela temporaria.
- Usuario navega entre `view=history` e `view=new`: o comportamento de exibicao de secoes deve continuar coerente para cada contexto.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: System MUST interpret the history view (`/transactions?view=history`) as the context for displaying full transaction history and filtered results.
- **FR-002**: System MUST use the exact filtered-results section title "Resultados dos filtros aplicados" in history view.
- **FR-003**: System MUST display the filtered-results section only when the user has manually edited or filled at least one filter input in the current page session.
- **FR-004**: System MUST hide the filtered-results section whenever there is no active filter criterion, including right after clearing previously applied criteria.
- **FR-005**: System MUST preserve existing filter behavior and apply all selected filter criteria when generating filtered results.
- **FR-006**: System MUST present a clear empty-results state when filters are active but no transaction matches.
- **FR-007**: System MUST rename "Historico completo de gastos" to "Historico completo" in the history experience.
- **FR-008**: System MUST ensure the full history scope includes both expense and income transactions.
- **FR-009**: System MUST provide a "Lancamentos" table in `/transactions?view=new` to show transactions saved during the current page session.
- **FR-010**: System MUST add the newly saved transaction to the temporary "Lancamentos" table immediately after a successful save.
- **FR-011**: System MUST NOT persist the temporary "Lancamentos" table entries beyond the current page session.
- **FR-012**: System MUST NOT add entries to the temporary "Lancamentos" table when save validation fails or save action is unsuccessful.
- **FR-013**: Users MUST be able to continue registering new transactions while viewing previously saved temporary entries in the same page session.
- **FR-014**: System MUST clear the temporary "Lancamentos" table when the user leaves `/transactions?view=new` and reinitialize it as empty when returning to that view.
- **FR-015**: System MUST order temporary "Lancamentos" table entries from most recent save to oldest save (newest first).
- **FR-016**: System MUST publish unified grouped history with `fullTransactionsHistoryGroups` and keep `fullExpenseHistoryGroups` only as a temporary compatibility alias during migration.

### Assumptions & Dependencies

- The existing `/transactions` filtering inputs and interaction model remain available and unchanged in purpose.
- A filter is considered "active" only after at least one user-editable filtering field is manually changed by the user in the current page session.
- Existing transaction records already include both income and expense categories in the available history data.
- Temporary launch visibility is scoped to the current page session and can reset on refresh or new navigation session.
- Leaving `view=new` is considered an explicit boundary that ends the temporary table lifecycle for that navigation context.
- Feature content remains in Portuguese, consistent with current product language.

### Key Entities *(include if feature involves data)*

- **Filter Input State**: Current set of user-provided filter values used to determine whether filtered results should appear.
- **Filtered Result Set**: Collection of transactions returned after applying active filters, including explicit empty-result state when no matches exist.
- **Full History Collection**: Unified view of all eligible transactions, containing both expense and income records.
- **Session Launch Entry**: Newly saved transaction shown in the temporary "Lancamentos" table for the current page session only.
- **Temporary Launch Table State**: Session-scoped list of launch entries built from successful save actions in `/transactions?view=new`.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: In manual validation, 100% of history-view checks confirm filtered-results section visibility only after the user manually changes at least one filter input in the current page session.
- **SC-002**: In manual validation, 100% of history-view checks confirm the filtered-results title communicates that items are filter results.
- **SC-003**: In manual validation, 100% of full-history checks confirm both income and expense transactions are represented under "Historico completo".
- **SC-004**: In manual validation, at least 95% of successful save attempts in `/transactions?view=new` show the new entry in the temporary "Lancamentos" table within the same interaction flow.
- **SC-005**: In manual validation, 100% of page refresh checks confirm temporary "Lancamentos" entries are not automatically restored.
- **SC-006**: In manual validation, 100% of `view=new` to `view=history` to `view=new` navigation checks confirm the temporary "Lancamentos" table returns empty.
- **SC-007**: In manual validation, 100% of multiple-save checks in `/transactions?view=new` confirm the newest saved transaction appears at the top row.
