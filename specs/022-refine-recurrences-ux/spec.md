# Feature Specification: Refinar Experiencia de Recorrencias

**Feature Branch**: `022-refine-recurrences-ux`  
**Created**: 2026-04-14  
**Status**: Draft  
**Input**: User description: "Refinar a apresentacao e o comportamento da pagina de recorrencias para corresponder ao padrao visual e usabilidade do historico, melhorar acessibilidade dos tooltips e ajustar espacos visuais"

## Clarifications

### Session 2026-04-14

- Q: O fluxo de edicao em recorrencias deve copiar exatamente o modo de edicao vigente no historico (inline ou drawer)? -> A: Sim, reproduzir exatamente o fluxo vigente no historico.
- Q: Quando nao houver pendencias do mes atual, o bloco deve colapsar ou nao ser renderizado? -> A: Nao renderizar o bloco quando vazio.
- Q: Qual referencia de fuso deve ser usada para comparar mes/ano atual nas pendencias? -> A: Fuso horario local do dispositivo.
- Q: Na exclusao de recorrencia, o analytics deve reproduzir exatamente os mesmos eventos do historico (incluindo confirmar/cancelar no prompt)? -> A: Sim, reproduzir exatamente os mesmos eventos do historico.

## User Scenarios & Validation *(mandatory)*

### User Story 1 - Operar recorrencias com consistencia visual (Priority: P1)

Como pessoa usuaria que gerencia recorrencias, quero editar e excluir regras de recorrencia com a mesma experiencia do historico para reduzir erro de operacao e manter previsibilidade no uso.

**Why this priority**: Acoes de editar/excluir sao criticas para evitar cobrancas indevidas e manter confianca na gestao financeira.

**Independent Validation**: Pode ser validada editando e excluindo uma regra na pagina de recorrencias e comparando o comportamento visual e de confirmacao com o padrao ja usado no historico.

**Acceptance Scenarios**:

1. **Given** que a lista de recorrencias esta visivel, **When** a pessoa usuaria inicia edicao de uma regra, **Then** o item em edicao e destacado visualmente e o fluxo de edicao reproduz exatamente o mecanismo vigente no historico (inline ou drawer, conforme o historico).
2. **Given** que a pessoa usuaria esta editando uma regra, **When** altera valor/quantia e salva, **Then** a atualizacao e refletida na regra com feedback consistente ao padrao existente.
3. **Given** que a pessoa usuaria solicita exclusao de uma regra, **When** confirma ou cancela no prompt, **Then** o comportamento de confirmacao e o rastreio de eventos reproduzem exatamente o padrao do historico.

---

### User Story 2 - Visualizar somente pendencias relevantes do mes atual (Priority: P1)

Como pessoa usuaria, quero ver apenas confirmacoes pendentes do mes e ano atuais para priorizar o que precisa de acao imediata.

**Why this priority**: Evita ruido visual e decisoes equivocadas em pendencias fora do periodo atual.

**Independent Validation**: Pode ser validada comparando as pendencias exibidas com a data do sistema (ou data simulada), incluindo casos com e sem pendencias no mes corrente.

**Acceptance Scenarios**:

1. **Given** que existem pendencias em diferentes meses, **When** a tela de recorrencias e carregada, **Then** apenas pendencias com mes+ano iguais ao mes+ano atuais sao exibidas no bloco de confirmacoes.
2. **Given** que nao existem pendencias no mes atual, **When** a tela e carregada, **Then** o bloco de confirmacoes pendentes nao e renderizado e nao deixa espaco vazio residual.
3. **Given** que existe pendencia do mes atual, **When** a pessoa usuaria confirma ou cancela, **Then** o comportamento funcional permanece inalterado em relacao ao fluxo atual.

---

### User Story 3 - Ler e compreender campos com melhor acessibilidade e layout (Priority: P2)

Como pessoa usuaria, quero tooltips claros e posicionamento consistente ao lado dos campos de recorrencia, sem textos redundantes, para compreender opcoes rapidamente e com suporte a tecnologias assistivas.

**Why this priority**: Melhora compreensao dos campos e reduz friccao visual, mantendo acessibilidade.

**Independent Validation**: Pode ser validada inspecionando posicao dos tooltips, associacao de acessibilidade, remocao de copys antigas e alinhamento do bloco de nova transacao.

**Acceptance Scenarios**:

1. **Given** os campos "Tipo de recorrencia" e "Modo de recorrencia", **When** a tela e exibida, **Then** cada tooltip aparece na mesma area do respectivo select, imediatamente a direita, sem deslocamento vertical.
2. **Given** uso de leitor de tela, **When** foco entra nos selects relacionados, **Then** a associacao descritiva permanece correta e identifica o conteudo do tooltip associado.
3. **Given** a tela de recorrencias apos remocao das copys definidas, **When** a pessoa usuaria percorre o layout, **Then** nao ha lacunas visuais e o conteudo flui sem espacos vazios.
4. **Given** a tela de nova transacao no bloco de criacao/edicao, **When** comparada aos campos vizinhos, **Then** a altura e o espaco vertical do grid ficam visualmente alinhados.

### Edge Cases

- Pendencias na virada de mes/ano (ex.: 31/12 para 01/01) devem respeitar estritamente o mes+ano da data corrente no momento da renderizacao.
- Mudanca de data do sistema durante sessao aberta deve refletir corretamente o conjunto de pendencias apos atualizacao da tela.
- Se uma recorrencia entrar e sair de modo edicao rapidamente, somente um item pode permanecer destacado por vez.
- Ao remover textos de apoio, a ausencia de pendencias nao pode gerar bloco visual vazio entre secoes.
- Em tamanhos de tela menores, tooltips a direita nao devem sobrepor controles a ponto de impedir interacao principal.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: O sistema MUST exibir no bloco "Confirmacoes pendentes de recorrencia" apenas itens cuja data prevista compartilhe o mesmo mes e ano da data corrente do sistema considerando o fuso horario local do dispositivo.
- **FR-002**: O sistema MUST nao renderizar o bloco de confirmacoes pendentes quando nao houver itens elegiveis para o mes/ano atuais, sem ocupar espaco residual no layout.
- **FR-003**: O sistema MUST preservar integralmente o comportamento existente de confirmar e cancelar pendencias elegiveis.
- **FR-004**: O sistema MUST apresentar acoes de editar e excluir recorrencias com a mesma linguagem visual e fluxo de interacao adotados no historico, reproduzindo exatamente o mecanismo de edicao vigente no historico (inline ou drawer).
- **FR-005**: O sistema MUST destacar visualmente a recorrencia que estiver em modo de edicao enquanto a edicao estiver ativa.
- **FR-006**: O sistema MUST permitir alterar valor/quantia durante a edicao de uma recorrencia, alem dos demais campos ja editaveis.
- **FR-007**: O sistema MUST aplicar na exclusao de recorrencia o mesmo padrao de confirmacao e exatamente os mesmos eventos de rastreamento usados na exclusao do historico, incluindo acoes de confirmar e cancelar no prompt.
- **FR-008**: O sistema MUST posicionar os tooltips de "Tipo de recorrencia" e "Modo de recorrencia" imediatamente a direita de seus selects, dentro do mesmo agrupamento visual de campo.
- **FR-009**: O sistema MUST manter identificadores e associacoes descritivas de acessibilidade corretos para os campos com tooltip apos o ajuste de posicionamento.
- **FR-010**: O sistema MUST remover da tela de recorrencias as tres copys especificadas e reorganizar o layout para eliminar espacos vazios resultantes.
- **FR-011**: O sistema MUST alinhar visualmente a altura/espacamento vertical da area em grade do bloco de criacao/edicao de nova transacao com os demais inputs e selects do mesmo bloco.

### Key Entities *(include if feature involves data)*

- **Pendencia de Recorrencia**: Item agendado ainda nao efetivado, com data prevista, estado de confirmacao e vinculo com uma regra de recorrencia.
- **Regra de Recorrencia**: Definicao recorrente que inclui tipo, modo, valor/quantia e estado atual de edicao/exclusao.
- **Contexto Temporal Atual**: Mes e ano correntes usados como criterio de filtragem para exibicao de pendencias.
- **Vinculo de Acessibilidade de Campo**: Relacao entre campo interativo e texto descritivo auxiliar para leitura assistiva.

## Assumptions

- A data de referencia para filtro de pendencias utiliza o relogio local ativo no momento de uso da aplicacao, com comparacao de mes/ano no fuso horario local do dispositivo.
- O padrao de interacao do historico citado nos criterios e considerado a referencia oficial de UX para editar/excluir nesta feature.
- Os eventos de rastreamento ja existentes para exclusao no historico sao o comportamento esperado tambem em recorrencias.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: Em validacao manual com dados contendo meses distintos, 100% das pendencias exibidas pertencem ao mes+ano correntes no fuso horario local do dispositivo.
- **SC-002**: Em cenarios sem pendencias do mes atual, 100% das execucoes nao renderizam o bloco de confirmacoes pendentes e nao reservam espaco para ele.
- **SC-003**: Em validacao de usabilidade e rastreio, 100% das acoes de editar/excluir em recorrencias seguem o mesmo fluxo do historico e emitem o mesmo conjunto de eventos (incluindo confirmar/cancelar no prompt de exclusao).
- **SC-004**: Em validacao de acessibilidade dos campos com tooltip, 100% dos campos alvo mantem associacao descritiva correta e tooltip posicionado imediatamente a direita do select.
- **SC-005**: Em revisao visual da tela de nova transacao, o bloco em grade apresenta alinhamento vertical consistente com os demais controles em todas as larguras de tela suportadas pelo produto.
