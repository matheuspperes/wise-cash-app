# Feature Specification: Correcoes de Portugues e Acoes no Historico

**Feature Branch**: `017-fix-pt-categories-actions`  
**Created**: 2026-04-02  
**Status**: Draft  
**Input**: User description: "Design: conserte os erros de português nas categorias mostradas pro usuário; crie um botão no final da dashboard que faz a remoção de todos os dados registrados no navegador para a aplicação; Dados: Na tela de histórico de transações, na tabela de \"histórico completo\" acrescente mais uma coluna \"Ações\" dentro do acordeão para cada item. A coluna deve ser a última e deve ter 2 ícones/botões modernos e bonitos, um de edição e outro de remoção do item. Faça um drawer lateral simples e moderno de edição mantendo a UI consistente no espaço. - Use dois ícones na coluna Ações: Pencil para editar, Trash2 para remover (lucide-react já está no projeto). - No clique de editar, abra drawer e permita editar tudo da linha: data, descrição, categoria, tipo, valor, observação/notas; - No clique de remover, use confirmação rápida e soft delete. Atualize imediatamente: tabela filtrada, histórico mensal, cards e gráfico do dashboard"

## Clarifications

### Session 2026-04-02

- Q: Qual escopo da limpeza total de dados locais deve ser aplicado? → A: Limpar todos os dados funcionais locais da aplicacao (transacoes, recorrencias e metadados).
- Q: A limpeza total deve considerar qual escopo de ownerScope? → A: Limpar todos os escopos locais da aplicacao no navegador (usuario e anonimo).
- Q: Ao salvar a edicao no drawer, qual deve ser o comportamento? → A: Salvar e manter drawer aberto com feedback de sucesso.
- Q: A correcao de categorias deve cobrir apenas presets novos ou tambem registros existentes? → A: Corrigir categorias em presets e tambem normalizar/exibir corretamente registros ja existentes.
- Q: A UI deve atualizar de forma otimista ou somente apos persistencia local confirmada? → A: Atualizar UI apenas apos sucesso da persistencia local.

## User Scenarios & Validation *(mandatory)*

### User Story 1 - Corrigir categorias em portugues (Priority: P1)

Como usuario, quero ver nomes de categorias corretos em portugues em todos os fluxos visiveis para evitar erros de entendimento e manter consistencia de linguagem na aplicacao.

**Why this priority**: Texto incorreto afeta compreensao diaria do produto e gera percepcao de baixa qualidade mesmo sem alterar regras de negocio.

**Independent Validation**: Pode ser validado revisando visualmente as categorias em cadastro, filtros, historico e dashboard, confirmando padrao correto de portugues sem depender das demais historias.

**Acceptance Scenarios**:

1. **Given** que existem categorias padrao cadastradas, **When** o usuario abre formulario de transacao e filtros, **Then** os nomes de categorias sao exibidos com portugues correto e consistente.
2. **Given** transacoes ja registradas, **When** o usuario navega por dashboard e historico, **Then** as categorias mostradas ao usuario mantem ortografia correta em todos os pontos.

---

### User Story 2 - Limpar dados locais da aplicacao (Priority: P1)

Como usuario, quero um botao no final do dashboard para apagar todos os dados locais da aplicacao no navegador, para reiniciar meu uso sem sobras de dados antigos.

**Why this priority**: Controle de dados locais e requisito funcional direto, com impacto forte em confianca e capacidade de reset da aplicacao.

**Independent Validation**: Pode ser validado criando dados locais, acionando limpeza total e confirmando estado vazio em dashboard e historico apos a acao.

**Acceptance Scenarios**:

1. **Given** que existem dados locais no navegador, **When** o usuario aciona a limpeza total e confirma a acao, **Then** todos os dados da aplicacao armazenados localmente sao removidos.
2. **Given** que a limpeza total foi concluida, **When** o usuario revisita dashboard e historico, **Then** o sistema exibe estado sem dados e sem registros residuais anteriores.

---

### User Story 3 - Editar e remover itens no historico completo (Priority: P1)

Como usuario, quero uma coluna Acoes no historico completo com opcoes de editar e remover por linha, para manter meus registros corretos diretamente na tabela.

**Why this priority**: Edicao e remocao no contexto do historico melhora produtividade e reduz friccao para manter dados confiaveis.

**Independent Validation**: Pode ser validado no historico completo abrindo edicao lateral, alterando campos, removendo com confirmacao rapida e verificando atualizacao imediata em historico e dashboard.

**Acceptance Scenarios**:

1. **Given** um item no historico completo, **When** o usuario clica em editar, **Then** abre um painel lateral de edicao contendo data, descricao, categoria, tipo, valor e observacao/notas da linha selecionada.
2. **Given** alteracoes validas no painel lateral, **When** o usuario salva a edicao, **Then** a linha do historico e os resumos relacionados sao atualizados imediatamente apos confirmacao da persistencia local, sem recarregamento manual da pagina.
3. **Given** um item no historico completo, **When** o usuario clica em remover e confirma rapidamente, **Then** o item recebe remocao logica e deixa de aparecer em listagens ativas, totais, cards e grafico.
4. **Given** filtros e busca ativos no historico, **When** uma edicao ou remocao e aplicada, **Then** os resultados filtrados permanecem coerentes com os dados atualizados.

---

### Edge Cases

- Quando nao houver dados locais, a limpeza total deve manter estado vazio sem erro e com feedback claro.
- Quando o usuario cancelar a confirmacao de remocao, nenhum dado deve ser alterado.
- Quando um item for removido enquanto o drawer de edicao estiver aberto para esse mesmo item, o painel deve impedir salvamento inconsistente e orientar o usuario.
- Quando um campo obrigatorio da edicao estiver invalido, o salvamento deve ser bloqueado com mensagem de validacao compreensivel.
- Quando o item editado deixar de atender filtros ativos apos a alteracao, ele deve desaparecer da tabela filtrada imediatamente.
- Quando houver falha de persistencia local em edicao ou remocao, a tela deve manter os dados anteriores e apresentar feedback de erro sem atualizar cards e grafico.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: O sistema MUST corrigir erros de portugues nas categorias exibidas ao usuario em todos os pontos de interface relacionados a transacoes e dashboard, incluindo registros ja existentes apresentados na interface.
- **FR-002**: O sistema MUST manter consistencia de nomenclatura de categorias entre cadastro, filtros, historico e visualizacoes de resumo.
- **FR-003**: O sistema MUST disponibilizar, ao final do dashboard, uma acao de limpeza total dos dados funcionais locais da aplicacao no navegador.
- **FR-004**: O sistema MUST exigir confirmacao explicita antes de executar a limpeza total dos dados locais.
- **FR-005**: O sistema MUST remover, apos confirmacao da limpeza total, todos os dados funcionais locais da aplicacao (transacoes, recorrencias e metadados) em todos os escopos locais do navegador (usuario e anonimo).
- **FR-006**: O sistema MUST refletir imediatamente o estado pos-limpeza em dashboard, historico, filtros e visualizacoes agregadas.
- **FR-007**: O sistema MUST adicionar a coluna "Acoes" como ultima coluna da tabela de historico completo dentro do acordeao mensal.
- **FR-008**: O sistema MUST exibir dois controles visuais na coluna Acoes por linha: um para edicao e outro para remocao.
- **FR-009**: O sistema MUST abrir um drawer lateral de edicao ao acionar o controle de editar em uma linha do historico.
- **FR-010**: O drawer de edicao MUST permitir alterar data, descricao, categoria, tipo, valor e observacao/notas da transacao selecionada.
- **FR-011**: O sistema MUST validar os campos obrigatorios de edicao antes de salvar e impedir persistencia de dados invalidos.
- **FR-012**: O sistema MUST aplicar remocao logica (soft delete) ao acionar remover com confirmacao rapida.
- **FR-013**: O sistema MUST atualizar, apos confirmacao de persistencia local bem-sucedida da edicao ou remocao, os resultados filtrados do historico, o historico mensal, os cards e o grafico do dashboard.
- **FR-014**: O sistema MUST preservar comportamento consistente da interface durante atualizacoes, sem exigir recarregamento manual.
- **FR-015**: Ao salvar uma edicao valida no drawer, o sistema MUST manter o drawer aberto e exibir feedback de sucesso sem perder o contexto do item editado.
- **FR-016**: O sistema MUST garantir consistencia de categorias corrigidas tanto para novos lancamentos quanto para registros historicos ja persistidos, sem exigir acao manual adicional do usuario.
- **FR-017**: O sistema MUST evitar exibir atualizacoes de historico e dashboard antes da confirmacao da persistencia local, exibindo erro sem alterar a visao consolidada em caso de falha de gravacao.
- **FR-018**: A confirmacao rapida de remocao MUST usar um padrao unico de interacao na tela de historico (popover/dialog curto com opcoes Confirmar e Cancelar) para evitar ambiguidades de UX.

### Key Entities *(include if feature involves data)*

- **Registro de Transacao**: Representa um lancamento financeiro com atributos editaveis visiveis no historico (data, descricao, categoria, tipo, valor, observacao/notas) e estado de remocao logica.
- **Estado de Historico Filtrado**: Representa o conjunto de linhas visiveis no historico completo conforme busca e filtros ativos, que deve ser recalculado apos cada alteracao.
- **Resumo de Dashboard**: Representa os indicadores e series visuais (cards e grafico) derivados de registros ativos e atualizados em tempo imediato.
- **Conjunto de Dados Locais da Aplicacao**: Representa todos os dados persistidos no navegador para a aplicacao e alvo da acao de limpeza total.
- **Dados Funcionais Locais**: Subconjunto de dados locais composto por transacoes, recorrencias e metadados operacionais, que deve ser removido na limpeza total.

## Assumptions

- A acao de limpeza total afeta apenas dados desta aplicacao no navegador atual, sem impactar dados de outras aplicacoes.
- A limpeza total remove todos os dados funcionais locais da aplicacao (transacoes, recorrencias e metadados) em todos os escopos locais do navegador (usuario e anonimo).
- A confirmacao rapida de remocao usa interacao curta e objetiva, adequada para evitar exclusoes acidentais.
- As regras de remocao logica ja existentes permanecem validas e devem ser reutilizadas.
- A consistencia visual deve seguir o padrao de design ja adotado na aplicacao.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: 100% das categorias visiveis nos fluxos cobertos pela feature sao exibidas com portugues correto em validacao manual.
- **SC-002**: Usuarios conseguem concluir a limpeza total dos dados locais em ate 10 segundos apos acionar o botao no dashboard.
- **SC-003**: Em pelo menos 95% das operacoes de edicao/remocao validadas manualmente, historico filtrado, historico mensal, cards e grafico refletem o novo estado sem recarregamento manual.
- **SC-004**: A taxa de conclusao da edicao completa de um item do historico (todos os campos) atinge 100% nos cenarios manuais planejados sem erro bloqueante.
- **SC-005**: Nenhuma remocao ocorre sem confirmacao explicita do usuario nos cenarios de validacao manual.
