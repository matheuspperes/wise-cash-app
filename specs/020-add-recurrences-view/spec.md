# Feature Specification: Navegacao e Gestao de Recorrencias

**Feature Branch**: `020-add-recurrences-view`  
**Created**: 2026-04-13  
**Status**: Draft  
**Input**: User description: "Adicionar navegação para página de Recorrências a partir do Dashboard; criar página de Recorrências com blocos Pendências e Recorrências; reposicionar tooltips e mover explicação da recorrência para tooltip ao lado do rótulo Recorrência."

## Clarifications

### Session 2026-04-13

- Q: How should editing a recurrence work on the new Recorrencias page? -> A: Open an edit drawer/modal using the existing recurrence form and keep the list visible in the background.
- Q: What should the data/chronology column show for each recurrence item? -> A: The next scheduled execution date.
- Q: How should months remaining be shown for limited recurrences? -> A: Use "1 mês faltante" for one month, "N meses faltantes" for more than one, and "Sem ciclos restantes" when there are no cycles left.

## User Scenarios & Validation *(mandatory)*

### User Story 1 - Acessar a view de Recorrencias pelo Dashboard (Priority: P1)

Como usuario, quero acessar a tela de Recorrencias diretamente do Dashboard para consultar e operar minhas recorrencias sem navegar por fluxos indiretos.

**Why this priority**: O acesso direto destrava a principal jornada de uso da nova funcionalidade e reduz friccao de navegacao.

**Independent Validation**: Pode ser validada apenas abrindo o Dashboard e acionando o botao de Recorrencias no header, confirmando o destino correto e o estado inicial da view.

**Acceptance Scenarios**:

1. **Given** que o usuario esta no Dashboard, **When** ele visualiza o header principal, **Then** deve existir um botao "Recorrencias" junto ao botao "Transacoes" com mesmo tamanho e destaque visual leve.
2. **Given** que o botao "Recorrencias" esta visivel, **When** o usuario clica nele, **Then** a navegacao deve abrir a rota `/transactions?view=recurrences`.
3. **Given** que o usuario entrou em `/transactions?view=recurrences`, **When** a tela carrega, **Then** ele deve visualizar os blocos "Pendencias" e "Recorrencias".

---

### User Story 2 - Consultar pendencias e lista de recorrencias (Priority: P1)

Como usuario, quero ver pendencias e recorrencias cadastradas na mesma tela para acompanhar status e tomar acoes rapidamente.

**Why this priority**: Entrega valor funcional direto na gestao de recorrencias e aproveita os handlers locais ja existentes.

**Independent Validation**: Pode ser validada diretamente em `/transactions?view=recurrences`, sem depender da tela de nova transacao.

**Acceptance Scenarios**:

1. **Given** que existem confirmacoes pendentes, **When** o usuario abre a view de Recorrencias, **Then** o bloco "Pendencias" deve exibir a lista de pendencias com os handlers locais de confirmacao/edicao.
2. **Given** que nao existem confirmacoes pendentes, **When** o usuario abre a view de Recorrencias, **Then** o bloco "Pendencias" deve exibir "Sem confirmações pendentes".
3. **Given** que existem recorrencias cadastradas, **When** o bloco "Recorrencias" e exibido, **Then** cada item deve mostrar nome, valor, data/cronologia, tipo, status e acoes de editar/excluir.
4. **Given** uma recorrencia limitada, **When** o status e exibido, **Then** deve aparecer a quantidade de meses faltantes com pluralizacao adequada e a mensagem "Sem ciclos restantes" quando aplicavel.
5. **Given** uma recorrencia ilimitada, **When** o status e exibido, **Then** deve aparecer "Ilimitada".
6. **Given** que o usuario aciona editar em uma recorrencia, **When** o item abre o fluxo de edicao, **Then** a lista permanece visivel ao fundo enquanto o editor e exibido em um drawer/modal.
7. **Given** que o usuario aciona excluir em uma recorrencia, **When** a confirmacao e exibida, **Then** a exclusao so ocorre apos confirmacao explicita do usuario.
8. **Given** que o usuario observa a coluna de data/cronologia, **When** a lista e exibida, **Then** ela deve mostrar a proxima data agendada de execucao da recorrencia.

---

### User Story 3 - Entender configuracao de recorrencia no formulario (Priority: P2)

Como usuario, quero tooltips posicionados ao lado dos controles de recorrencia e a explicacao de ativacao no proprio icone de ajuda para reduzir ruido visual e manter clareza.

**Why this priority**: Melhora usabilidade do formulario sem alterar regras de negocio, diminuindo confusao visual.

**Independent Validation**: Pode ser validada apenas na tela de nova transacao, sem depender da nova view de recorrencias.

**Acceptance Scenarios**:

1. **Given** que o usuario abre a nova transacao com recorrencia ativa, **When** ele visualiza os campos de tipo e modo, **Then** os respectivos tooltips devem estar imediatamente a direita dos selects.
2. **Given** que o usuario visualiza a secao "Recorrencia", **When** ele busca a frase "Ative para repetir este lançamento mensalmente.", **Then** a frase nao deve aparecer no corpo da secao.
3. **Given** que o usuario interage com o tooltip ao lado do rótulo "Recorrencia", **When** o tooltip abre, **Then** ele deve exibir o conteudo "Ative para repetir este lançamento mensalmente.".

### Edge Cases

- Quando o usuario acessa `/transactions?view=recurrences` sem pendencias e sem recorrencias, a tela deve manter os dois blocos visiveis com estados vazios claros.
- Quando uma recorrencia limitada nao tem ciclos restantes, a apresentacao de status deve indicar fim de ciclo sem ambiguidades.
- Quando os handlers locais retornam erro ao confirmar/editar pendencia, a view deve manter consistencia dos dados exibidos e feedback de falha ao usuario.
- Quando o usuario alterna rapidamente entre views de transacoes e recorrencias, a navegacao deve preservar o destino correto sem quebrar o header.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: O sistema MUST exibir no header do Dashboard um novo botao "Recorrencias" ao lado do botao "Transacoes", mantendo o mesmo tamanho e com leve destaque visual.
- **FR-002**: O sistema MUST navegar para `/transactions?view=recurrences` ao acionar o botao "Recorrencias".
- **FR-003**: A view `/transactions?view=recurrences` MUST exibir os blocos "Pendencias" e "Recorrencias".
- **FR-004**: O bloco "Pendencias" MUST reutilizar o componente/listagem de confirmacoes pendentes existente ou equivalente funcional.
- **FR-005**: O bloco "Pendencias" MUST exibir a mensagem "Sem confirmações pendentes" quando nao houver itens.
- **FR-006**: O bloco "Recorrencias" MUST listar todas as recorrencias cadastradas com, no minimo, nome, valor, proxima data agendada, tipo, status e acoes de editar/excluir.
- **FR-007**: O status de recorrencia limitada MUST exibir quantidade de meses faltantes.
- **FR-008**: O status de recorrencia ilimitada MUST exibir "Ilimitada".
- **FR-009**: A acao de editar recorrencia MUST abrir um drawer/modal de edicao usando o formulario existente ou equivalente funcional, preservando a lista visivel ao fundo.
- **FR-010**: Na tela de nova transacao, os tooltips de tipo e modo de recorrencia MUST permanecer imediatamente a direita dos selects correspondentes.
- **FR-011**: A frase "Ative para repetir este lançamento mensalmente." MUST ser removida do corpo da secao e exibida no tooltip ao lado do rótulo "Recorrencia".
- **FR-012**: A interacao de editar/confirmar pendencia na view de recorrencias MUST disparar os handlers locais existentes.
- **FR-013**: O comportamento de abrir a view correta pelo botao de header MUST funcionar em fluxos de navegacao repetidos, preservando a selecao de view e o estado visual essencial da interface.
- **FR-014**: A acao de excluir recorrencia MUST exigir confirmacao explicita antes da remocao.

### Key Entities *(include if feature involves data)*

- **RecurrencesViewState**: Estado da view de recorrencias, com secoes "Pendencias" e "Recorrencias" e seus estados vazios.
- **PendingConfirmationItem**: Item pendente de confirmacao com dados suficientes para acao local de confirmar/editar.
- **RecurrenceListItem**: Recorrencia cadastrada contendo nome, valor, proxima data agendada, tipo, status e acoes de manutencao.
- **RecurrenceStatusSummary**: Representacao de status da recorrencia com tres formatos: "Ilimitada", "1 mês faltante" ou "N meses faltantes"; quando nao houver ciclos restantes, exibir "Sem ciclos restantes".

## Assumptions

- A rota `/transactions` ja suporta segmentacao por query param `view`.
- Os handlers locais para pendencias ja existem e estao funcionais, exigindo apenas integracao na nova view.
- "Data/cronologia" sera apresentada seguindo o padrao de leitura ja utilizado na aplicacao para datas de transacao/recorrencia.
- Acoes de editar/excluir recorrencias usam os fluxos existentes de manutencao, sem redefinir regras de autorizacao ou permissao.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: 100% dos acessos pelo novo botao "Recorrencias" abrem `/transactions?view=recurrences` em validacao manual.
- **SC-002**: Em 100% dos cenarios sem pendencias, o bloco "Pendencias" mostra "Sem confirmações pendentes" sem erro visual.
- **SC-003**: Em 100% dos itens de recorrencia exibidos, nome, valor, cronologia, tipo, status e acoes de editar/excluir estao presentes.
- **SC-004**: Em 100% das recorrencias limitadas da amostra de validacao, o status exibe meses faltantes; em 100% das ilimitadas, exibe "Ilimitada".
- **SC-005**: Em 95% das verificacoes manuais da tela de nova transacao, os tooltips de recorrencia permanecem ao lado direito dos selects sem quebra de alinhamento.
- **SC-006**: Em 100% dos testes manuais de editar/confirmar pendencia na nova view, os handlers locais sao acionados corretamente.
