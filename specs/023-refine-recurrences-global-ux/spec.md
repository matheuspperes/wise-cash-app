# Feature Specification: Refinar UX de Recorrencias e Header Global

**Feature Branch**: `023-refine-recurrences-global-ux`  
**Created**: 2026-04-15  
**Status**: Draft  
**Input**: User description: "Refinar UX da tela de Recorrencias e alinhamentos visuais globais: mover o bloco de pendencias para a tela de Recorrencias (apenas do mes atual), padronizar botoes fixos no cabecalho, remover botoes finais das paginas, ajustar padding do grid de Despesa/Receita, posicionar tooltips imediatamente a direita dos selects de recorrencia e corrigir bug de registro de data/timezone."

## Clarifications

### Session 2026-04-15

- Q: Qual modelo de persistencia de data deve ser usado para evitar deslocamento de dia por timezone? -> A: Persistir como data civil local no formato `YYYY-MM-DD`, sem horario/timezone.
- Q: O que significa botoes fixos no cabecalho neste contexto? -> A: Botoes sempre presentes no cabecalho da pagina (topo ao carregar), sem comportamento sticky durante scroll.
- Q: Quais paginas entram no escopo de "todas as paginas" para os botoes globais? -> A: Todas as telas de UI navegaveis do fluxo financeiro (dashboard e views de transacoes/recorrencias), excluindo rotas tecnicas.

## User Scenarios & Validation *(mandatory)*

### User Story 1 - Pendencias corretas na tela de Recorrencias (Priority: P1)

Como pessoa usuaria, quero ver o bloco de confirmacoes pendentes somente na tela de Recorrencias e apenas com itens do mes/ano atual para agir no que e relevante agora e evitar ruido visual.

**Why this priority**: Pendencias fora de contexto temporal reduzem confianca e atrapalham a acao imediata.

**Independent Validation**: Pode ser validada abrindo a tela de Recorrencias com dados em meses diferentes e confirmando que somente itens do mes/ano atual sao exibidos; quando nao houver itens, nenhum bloco deve ser renderizado.

**Acceptance Scenarios**:

1. **Given** que existem pendencias em meses distintos, **When** a pessoa abre a tela Recorrencias, **Then** somente pendencias com mes+ano iguais ao mes+ano do sistema sao listadas.
2. **Given** que nao existe pendencia no mes/ano atual, **When** a tela Recorrencias e carregada, **Then** o bloco de pendencias nao e renderizado e nao deixa espaco vazio.
3. **Given** que ha pendencias elegiveis na tela Recorrencias, **When** a pessoa confirma ou cancela um item, **Then** a funcionalidade permanece identica ao comportamento anterior.

---

### User Story 2 - Navegacao consistente com botoes no cabecalho (Priority: P1)

Como pessoa usuaria, quero os botoes Recorrencias, Transacoes e Nova Transacao sempre renderizados no cabecalho em todas as telas de UI navegaveis para navegar sem depender de botoes no fim da tela.

**Why this priority**: Navegacao consistente reduz friccao e elimina procura por acoes em diferentes posicoes.

**Independent Validation**: Pode ser validada navegando entre dashboard e demais telas de UI navegaveis e conferindo a presenca dos botoes no cabecalho, incluindo a regra do botao Voltar ao Dashboard apenas fora da dashboard e a ausencia em rotas tecnicas.

**Acceptance Scenarios**:

1. **Given** qualquer pagina da aplicacao, **When** o cabecalho e exibido, **Then** os botoes Recorrencias, Transacoes e Nova Transacao estao presentes no cabecalho.
2. **Given** uma pagina que nao e a dashboard, **When** o cabecalho e exibido, **Then** o botao Voltar ao Dashboard aparece.
3. **Given** a pagina dashboard, **When** o cabecalho e exibido, **Then** o botao Voltar ao Dashboard nao aparece.
4. **Given** qualquer pagina atualizada, **When** a pessoa percorre o fim da pagina, **Then** nao ha botoes de navegacao redundantes no rodape/final da tela.

---

### User Story 3 - Formulario de recorrencia alinhado e acessivel (Priority: P2)

Como pessoa usuaria, quero o grid de Despesa/Receita alinhado e os tooltips dos campos de recorrencia imediatamente ao lado dos selects para entender opcoes sem desalinhamento visual.

**Why this priority**: Clareza visual e acessibilidade reduzem erro de preenchimento e melhoram compreensao dos campos.

**Independent Validation**: Pode ser validada abrindo o formulario de Nova transacao e conferindo remocao do padding p-1 no grid, alinhamento dos controles, posicao dos tooltips e vinculacao correta de id/aria-describedby.

**Acceptance Scenarios**:

1. **Given** o bloco Despesa/Receita no formulario, **When** a tela e renderizada, **Then** o grid nao usa p-1 e fica alinhado com os demais inputs.
2. **Given** os campos Tipo de recorrencia e Modo de recorrencia, **When** o formulario e exibido, **Then** seus tooltips ficam na mesma div do select e imediatamente a direita, sem salto vertical perceptivel.
3. **Given** foco de acessibilidade nos selects de recorrencia, **When** leitor de tela interpreta os campos, **Then** as associacoes id e aria-describedby permanecem corretas.

---

### User Story 4 - Registro de data sem deslocamento de dia (Priority: P1)

Como pessoa usuaria, quero que o dia informado na recorrencia seja gravado exatamente como inserido para evitar erro de agenda por efeito de timezone.

**Why this priority**: Deslocamento de dia quebra confianca e gera impacto funcional direto nas recorrencias.

**Independent Validation**: Pode ser validada criando/editando recorrencia com dia especifico (ex.: 17) e verificando que o registro persistido representa o mesmo dia, sem deslocamento para 16.

**Acceptance Scenarios**:

1. **Given** uma recorrencia criada/alterada com dia 17, **When** os dados sao persistidos e consultados, **Then** o dia registrado permanece 17.
2. **Given** ambiente com timezone local diferente de UTC, **When** a pessoa cria/edita recorrencia, **Then** a normalizacao de data preserva o dia informado sem -1.

---

### Edge Cases

- Virada de mes/ano (ex.: 31/12 para 01/01) deve aplicar filtro de pendencias com base no mes/ano local corrente sem listar itens indevidos.
- Mudanca de timezone do dispositivo durante sessao nao deve causar gravacao com deslocamento de dia em novos registros.
- Datas invalidas ou incompletas nao devem quebrar a tela de Recorrencias e devem ser ignoradas para exibicao de pendencias.
- Em viewport reduzida, a posicao dos tooltips deve permanecer adjacente ao select sem sobrepor controles principais.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: O sistema MUST renderizar o bloco "Confirmacoes pendentes de recorrencia" apenas na tela Recorrencias.
- **FR-002**: O sistema MUST listar nesse bloco somente pendencias cuja `scheduledDate` tenha mes+ano iguais ao mes+ano atual do sistema no contexto local.
- **FR-003**: O sistema MUST nao renderizar o bloco de pendencias quando nao houver itens elegiveis para o mes/ano atual, sem reservar espaco vazio.
- **FR-004**: O sistema MUST manter o comportamento existente de confirmar/cancelar pendencias sem regressao funcional.
- **FR-005**: O sistema MUST exibir os botoes Recorrencias, Transacoes e Nova Transacao sempre no cabecalho em todas as telas de UI navegaveis do fluxo financeiro.
- **FR-006**: O sistema MUST exibir Voltar ao Dashboard apenas em paginas que nao sejam a dashboard.
- **FR-007**: O sistema MUST remover botoes de navegacao redundantes do final/rodape das paginas afetadas.
- **FR-008**: O sistema MUST remover o padding `p-1` do grid de Despesa/Receita e preservar alinhamento visual com os demais inputs.
- **FR-009**: O sistema MUST posicionar os tooltips de Tipo de recorrencia e Modo de recorrencia na mesma div do respectivo select, imediatamente a direita.
- **FR-010**: O sistema MUST preservar ids e `aria-describedby` validos para os campos com tooltip apos reposicionamento.
- **FR-011**: O sistema MUST persistir datas de recorrencia como data civil local (`YYYY-MM-DD`) em criacao e edicao, preservando o dia informado sem deslocamento por timezone.
- **FR-012**: O sistema MUST manter os botoes globais renderizados na estrutura do cabecalho superior, sem comportamento sticky/fixo na viewport durante scroll.
- **FR-013**: O sistema MUST excluir rotas tecnicas (ex.: API, erro tecnico) do escopo de validacao de cabecalho global.

### Key Entities *(include if feature involves data)*

- **Recurrence Pending Item**: pendencia de recorrencia com `scheduledDate`, estado de confirmacao e vinculo com regra de recorrencia.
- **Header Navigation Context**: estado de pagina atual que determina quais botoes globais aparecem no cabecalho.
- **Recurrence Field Tooltip Binding**: relacao entre select de recorrencia, id de tooltip e referencia `aria-describedby`.
- **Recurrence Date Input/Stored Date**: par de valores de dia informado e registro persistido em `YYYY-MM-DD`, com preservacao do dia informado sem timezone.

## Assumptions

- O mes/ano corrente para filtro de pendencias segue o calendario local do dispositivo.
- A barra de cabecalho e o ponto oficial de navegacao primaria entre dashboard, transacoes e recorrencias.
- Neste escopo, "fixos no cabecalho" significa fixos na estrutura do cabecalho (nao sticky de viewport).
- "Todas as paginas" significa telas de UI do fluxo financeiro, nao incluindo rotas tecnicas.
- A verificacao de bug de data considera tanto criacao quanto edicao de recorrencia como fluxos obrigatorios.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: Em validacao manual com dados de meses diferentes, 100% das pendencias exibidas na tela Recorrencias pertencem ao mes/ano atual do sistema.
- **SC-002**: Em cenarios sem pendencias do mes atual, 100% das execucoes nao renderizam o bloco de pendencias e nao apresentam espaco vazio residual.
- **SC-003**: Em revisao de navegacao, 100% das paginas exibem Recorrencias, Transacoes e Nova Transacao no cabecalho; Voltar ao Dashboard aparece apenas fora da dashboard.
- **SC-004**: Em validacao de layout/acessibilidade, 100% dos campos Tipo de recorrencia e Modo de recorrencia mantem tooltip a direita com vinculacao correta de `aria-describedby`.
- **SC-005**: Em validacao de datas, 100% dos testes com dia informado (incluindo dia 17) preservam o mesmo dia no registro persistido sem deslocamento negativo.
