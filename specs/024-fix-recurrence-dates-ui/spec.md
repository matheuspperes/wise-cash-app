# Feature Specification: Corrigir Datas de Recorrencia e Ajustes de UI

**Feature Branch**: `024-fix-recurrence-dates-ui`  
**Created**: 2026-05-15  
**Status**: Draft  
**Input**: User description: "Dados: Corrija o bug que esta em resolveDueDate() e getLastDayOfMonth() que usam new Date(year, month, day) — isso cria uma data em timezone local, o que pode causar inconsistencias se o resultado for depois serializado incorretamente; analise se ha mais inconsistencias nas recorrencias

Design: Na tela de historico completo de transacoes por mes, faca uma leve mudanca de cor no mes indicando qual e o atual; Na dashboard, troque de lugar os botoes \"Recorrencias\" e \"Transacoes\" mantendo o padrao de ordem dos 3 botoes fixos; Na tela de nova transacao, no botao \"Recorrencia: Desligada\" faca um toggle mais intuitivo de \"Ligado\" e \"Desligado\" ajustando tambem as cores suaves relacionadas"

## Clarifications

### Session 2026-05-15

- Q: Para corrigir resolveDueDate/getLastDayOfMonth, qual modelo de data deve ser canonico nas recorrencias? -> A: Data civil `YYYY-MM-DD` em toda a cadeia (persistencia e calculo).
- Q: Onde o destaque do mes atual deve aparecer no historico completo? -> A: No container do grupo do mes.

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

### User Story 1 - Datas de recorrencia sem desvio (Priority: P1)

Como pessoa usuaria, quero que as datas de recorrencia sejam gravadas e calculadas como data civil, para evitar deslocamentos de dia por timezone e garantir previsibilidade dos vencimentos.

**Why this priority**: Erros de dia quebram a confianca e afetam diretamente o uso financeiro.

**Independent Validation**: Pode ser validada criando/alterando recorrencias em dias sensiveis (ex.: 17, 31) e confirmando que o dia persistido e exibido permanece correto.

**Acceptance Scenarios**:

1. **Given** uma recorrencia criada com dia 17, **When** a pessoa salva e reabre os dados, **Then** o dia persistido e exibido permanece 17 sem deslocamento.
2. **Given** o dispositivo em timezone diferente do UTC, **When** a pessoa cria ou edita uma recorrencia, **Then** o dia informado permanece identico no registro persistido.
3. **Given** uma recorrencia com dia acima do ultimo dia do mes, **When** o sistema resolve o vencimento, **Then** o dia e ajustado de forma consistente para o ultimo dia do mes sem variar por timezone.

---

### User Story 2 - Mes atual destacado no historico (Priority: P2)

Como pessoa usuaria, quero identificar rapidamente o mes atual no historico completo de transacoes por mes, para localizar o periodo ativo sem esforço.

**Why this priority**: Melhora orientacao visual com mudanca pequena e clara.

**Independent Validation**: Pode ser validada abrindo o historico completo e verificando a marcacao do mes atual.

**Acceptance Scenarios**:

1. **Given** o historico completo com o mes atual listado, **When** a tela e exibida, **Then** o container do grupo do mes atual aparece com uma mudanca sutil de cor (fundo com acento a 10% de opacidade e borda a 20% de opacidade).
2. **Given** um historico que nao inclui o mes atual, **When** a tela e exibida, **Then** nenhum mes recebe destaque indevido.

---

### User Story 3 - Ordem dos botoes da dashboard (Priority: P2)

Como pessoa usuaria, quero que a ordem dos botoes fixos da dashboard siga o padrao atualizado, para manter consistencia de navegacao.

**Why this priority**: Ajuste de navegacao facilita memoria muscular.

**Independent Validation**: Pode ser validada conferindo a ordem dos tres botoes fixos no cabecalho da dashboard.

**Acceptance Scenarios**:

1. **Given** a dashboard carregada, **When** o cabecalho e exibido, **Then** a ordem dos tres botoes e "Transacoes", "Recorrencias", "Nova Transacao".

---

### User Story 4 - Toggle de recorrencia mais intuitivo (Priority: P2)

Como pessoa usuaria, quero um toggle claro de "Ligado" e "Desligado" para recorrencia, com cores suaves, para entender o estado sem ambiguidade.

**Why this priority**: Reduz erro de configuracao em nova transacao.

**Independent Validation**: Pode ser validada alternando o toggle e confirmando texto e cor condizentes.

**Acceptance Scenarios**:

1. **Given** o formulario de nova transacao aberto, **When** o toggle de recorrencia esta desligado, **Then** o texto mostra "Desligado" com `text-muted` e fundo `bg-surface`.
2. **Given** o toggle de recorrencia, **When** a pessoa ativa o estado, **Then** o texto mostra "Ligado" com `text-emerald-200` e fundo `bg-[rgba(34,197,94,0.2)]` e os campos de recorrencia permanecem habilitados.

### Edge Cases

- Mudanca de timezone do dispositivo durante a sessao nao altera o dia persistido da recorrencia.
- Mes atual nao aparece no historico completo e nenhum destaque deve ser aplicado.
- Recorrencias com dia 31 em mes de 30 dias nao geram inconsistencias no dia armazenado.
- Campos de recorrencia nao devem mudar de layout ao alternar o toggle.

## Requirements *(mandatory)*

<!--
  ACTION REQUIRED: The content in this section represents placeholders.
  Fill them out with the right functional requirements.
-->

### Functional Requirements

- **FR-001**: O sistema MUST tratar todas as datas de recorrencia como datas civis `YYYY-MM-DD` sem componente de timezone.
- **FR-002**: O sistema MUST manter o dia informado pela pessoa usuaria em criacao e edicao de recorrencias, sem deslocamento.
- **FR-003**: O sistema MUST resolver vencimentos recorrentes de forma consistente quando o dia exceder o ultimo dia do mes, preservando a regra civil.
- **FR-004**: O sistema MUST aplicar a mesma regra de data civil `YYYY-MM-DD` em todas as operacoes de recorrencia (criacao, edicao, pendencias e proximos vencimentos).
- **FR-005**: O sistema MUST destacar de forma sutil o container do mes atual no historico completo de transacoes por mes, usando fundo com acento a 10% de opacidade e borda a 20% de opacidade.
- **FR-006**: O sistema MUST limitar o destaque apenas ao mes atual, sem alterar meses anteriores ou futuros.
- **FR-007**: O sistema MUST exibir os botoes fixos da dashboard na ordem "Transacoes", "Recorrencias", "Nova Transacao".
- **FR-008**: O sistema MUST manter os tres botoes fixos na dashboard sem remover nenhum deles.
- **FR-009**: O sistema MUST exibir o toggle de recorrencia com estados "Ligado" e "Desligado" e cores suaves distintas: "Desligado" usa `text-muted` com `bg-surface`; "Ligado" usa `text-emerald-200` com `bg-[rgba(34,197,94,0.2)]`.
- **FR-010**: O sistema MUST preservar o comportamento funcional do toggle de recorrencia ao alternar estados.

### Key Entities *(include if feature involves data)*

- **Recurrence Date Civil Record**: representacao de dia de recorrencia sem timezone, usada em calculos e persistencia.
- **Current Month Indicator**: estado visual aplicado ao container do mes atual no historico completo.
- **Dashboard Header Action Order**: ordem esperada dos botoes fixos na dashboard.
- **Recurrence Toggle State**: estado visual e textual do toggle de recorrencia no formulario.

## Assumptions

- O mes atual segue o calendario local do dispositivo.
- O destaque do mes atual e apenas visual e nao altera dados ou ordenacao.
- O toggle de recorrencia continua controlando o mesmo conjunto de campos.

## Success Criteria *(mandatory)*

<!--
  ACTION REQUIRED: Define measurable success criteria.
  These must be technology-agnostic and measurable.
-->

### Measurable Outcomes

- **SC-001**: Em validacao manual, 100% das recorrencias testadas preservam o dia informado sem deslocamento.
- **SC-002**: Em validacao manual, 100% dos meses atuais listados no historico completo exibem o destaque sutil.
- **SC-003**: Em revisao de UI, 100% das telas de dashboard exibem a ordem "Transacoes", "Recorrencias", "Nova Transacao".
- **SC-004**: Em validacao manual, 100% das alternancias do toggle exibem o texto e cor correspondentes ao estado.
