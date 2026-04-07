# Feature Specification: Recorrencia de Transacoes

**Feature Branch**: `018-transaction-recurrence`  
**Created**: 2026-04-05  
**Status**: Draft  
**Input**: User description: "Nova feature: recorrência de transações na tela de novas transações. Regras: recorrência mensal em dia específico; tipos de recorrência: limitada e ilimitada; limitada exige quantidade de meses; ilimitada permanece até desativação e possui modo automática (lançamento automático) e manual (marcada como pendente e depende de confirmação do usuário para efetivar). UX: adicionar botão/trigger 'Recorrência' no quadro de novas transações; ao ativar, expandir campos de recorrência; ao escolher ilimitada, expandir novamente para escolher automática/manual e campos relacionados. Incluir validações condicionais, edge cases de dia 29/30/31 com política de fallback, critérios de aceite mensuráveis, entidades de dados (transaction, recurrenceRule e opcional recurrenceInstance), cenários Given/When/Then e impacto em dashboard/histórico. Sem foco em segurança neste momento."

## Clarifications

### Session 2026-04-05

- Q: Para recorrencia limitada, como deve ser contado o total de meses? -> A: Sempre iniciar no proximo mes/ciclo; quantidade conta a partir dele.
- Q: Se a recorrencia ilimitada manual ficar sem confirmacao por varios meses, qual comportamento deve ser adotado? -> A: Criar 1 pendencia por mes/ciclo (acumulando pendencias nao confirmadas).
- Q: Para recorrencia automatica, como deve ocorrer a geracao mensal nesta iteracao? -> A: Por projecao mensal idempotente ate o ultimo mes do ano ou 1 ano a partir do mes corrente, o que for maior.
- Q: Quando uma regra ilimitada manual for desativada, como tratar pendencias ja criadas antes da desativacao? -> A: Manter pendencias ja criadas; apenas impedir criacao de novas pendencias futuras.
- Q: Quando o usuario editar uma regra recorrente ativa (ex. valor/categoria), como tratar pendencias manuais ja existentes? -> A: Manter pendencias ja criadas com snapshot original; aplicar mudancas so em novos ciclos.
- Q: Ao cancelar uma pendencia manual, qual deve ser o comportamento no mesmo ciclo mensal? -> A: Cancelamento deve ser definitivo no ciclo; a pendencia nao deve reaparecer no mesmo mes/ciclo.
- Q: Em conflito no mesmo ciclo (confirmar/cancelar concorrentes), qual acao deve prevalecer? -> A: A primeira acao terminal persistida vence; mudancas posteriores no mesmo ciclo devem ser bloqueadas.
- Q: Como tratar regra recorrente quando a transacao original for editada/removida? -> A: A regra deve ser independente; edicoes/remocao da transacao original nao removem nem desativam a regra automaticamente.

## User Scenarios & Validation *(mandatory)*

### User Story 1 - Configurar recorrencia no cadastro (Priority: P1)

Como usuario, quero ativar recorrencia diretamente no quadro de novas transacoes para nao precisar cadastrar manualmente os mesmos lancamentos todos os meses.

**Why this priority**: Esse fluxo cria o valor base da feature e reduz o maior atrito operacional no uso diario.

**Independent Validation**: Pode ser validado criando uma nova transacao com recorrencia ligada, alternando limitada/ilimitada e verificando validacoes condicionais sem depender da confirmacao de pendencias.

**Acceptance Scenarios**:

1. **Given** que o usuario esta no quadro de novas transacoes, **When** ele aciona o trigger "Recorrencia", **Then** campos de recorrencia sao exibidos no mesmo contexto.
2. **Given** que o usuario seleciona recorrencia limitada, **When** informa dia mensal e quantidade de meses validos, **Then** o cadastro permite salvar e cria a regra com limite definido.
3. **Given** que o usuario seleciona recorrencia ilimitada, **When** escolhe o modo (automatica ou manual), **Then** os campos especificos do modo aparecem e validam obrigatoriedades.

---

### User Story 2 - Aplicar recorrencia no ciclo mensal (Priority: P1)

Como usuario, quero que a regra recorrente gere os lancamentos de cada mes conforme configurado para manter dashboard e historico atualizados sem retrabalho.

**Why this priority**: Sem aplicacao mensal da regra, a configuracao de recorrencia nao gera impacto real no produto.

**Independent Validation**: Pode ser validado com regras limitadas e ilimitadas observando geracao no ciclo mensal, politica de fallback de dia e reflexo no dashboard/historico.

**Acceptance Scenarios**:

1. **Given** uma regra ativa com dia 31, **When** ocorre um mes com menos dias, **Then** o sistema aplica fallback para o ultimo dia disponivel do mes.
2. **Given** uma regra limitada com N meses, **When** atinge a ultima ocorrencia prevista, **Then** a regra deixa de gerar novos lancamentos automaticamente.
3. **Given** uma regra ilimitada em modo automatico, **When** inicia um novo ciclo mensal, **Then** o lancamento e efetivado automaticamente e aparece em dashboard e historico.
4. **Given** uma regra ilimitada em modo automatico, **When** o sistema executa a reconciliacao recorrente, **Then** as ocorrencias sao mantidas projetadas ate o ultimo mes do ano ou 1 ano a partir do mes corrente, sem duplicidade por ciclo.

---

### User Story 3 - Confirmar pendencias em modo manual (Priority: P2)

Como usuario, quero que recorrencias ilimitadas em modo manual criem pendencias para eu confirmar antes da efetivacao, mantendo controle sobre cada lancamento.

**Why this priority**: O modo manual entrega controle fino de operacao sem bloquear o valor principal da automacao recorrente.

**Independent Validation**: Pode ser validado criando regra ilimitada manual, verificando criacao de pendencia e confirmacao do usuario para efetivar a transacao.

**Acceptance Scenarios**:

1. **Given** uma regra ilimitada manual ativa, **When** inicia novo ciclo mensal, **Then** e criada uma pendencia nao efetivada.
2. **Given** uma pendencia recorrente, **When** o usuario confirma a efetivacao, **Then** a transacao e registrada e atualiza historico e dashboard.
3. **Given** uma regra ilimitada desativada, **When** um novo ciclo mensal ocorre, **Then** nenhuma nova pendencia ou lancamento automatico e criado.
4. **Given** que existem pendencias mensais, **When** o usuario abre a tela inicial, **Then** o sistema exibe uma lista de confirmacoes pendentes posicionada entre o grafico e a tabela de transacoes, com acoes "Cancelar" e "Confirmar" por item.

---

### Edge Cases

- Quando o usuario escolher dia 29, 30 ou 31 em meses menores, a ocorrencia deve cair no ultimo dia valido do mes alvo.
- Quando a quantidade de meses da recorrencia limitada for 0, negativa ou nao inteira, o salvamento deve ser bloqueado com mensagem clara.
- Quando o usuario trocar de ilimitada para limitada (ou vice-versa), campos nao aplicaveis devem ser limpos para evitar persistencia inconsistente.
- Quando regra ilimitada estiver desativada, nao pode haver geracao de novas ocorrencias nem pendencias.
- Quando houver pendencia manual ja existente para o mesmo ciclo, nao deve ser criada duplicata para esse ciclo.
- Quando pendencias manuais acumularem por varios meses, cada ciclo mensal deve manter sua pendencia independente ate confirmacao.
- Quando regra ilimitada manual for desativada, pendencias antigas devem permanecer disponiveis para tratamento, mas nenhum novo ciclo deve gerar pendencia.
- Quando uma regra ativa for editada, pendencias manuais ja existentes nao devem ser sobrescritas retroativamente.
- Quando a transacao original for removida ou alterada, a regra recorrente deve permanecer ativa de forma independente ate acao explicita de edicao/desativacao da propria regra.
- Quando a projecao ilimitada atingir o horizonte atual, o sistema deve estender a janela para manter o criterio "ultimo mes do ano ou 1 ano, o que for maior".
- Quando uma pendencia for cancelada na lista da tela inicial, ela nao deve impactar dashboard/historico como efetivada.
- Quando uma pendencia for cancelada na lista da tela inicial, ela deve permanecer cancelada no ciclo corrente e nao pode ser recriada ate o proximo ciclo mensal.
- Quando houver acoes concorrentes (confirmar/cancelar) para a mesma pendencia no mesmo ciclo, somente a primeira acao terminal persistida deve valer.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: O sistema MUST disponibilizar um trigger "Recorrencia" no quadro de novas transacoes.
- **FR-002**: O sistema MUST expandir os campos de recorrencia ao ativar o trigger, sem redirecionar para outra tela.
- **FR-003**: O sistema MUST suportar recorrencia mensal com dia especifico do mes.
- **FR-004**: O sistema MUST oferecer tipo de recorrencia limitada e ilimitada.
- **FR-005**: O sistema MUST exigir quantidade de meses quando o tipo selecionado for limitada.
- **FR-006**: O sistema MUST bloquear o salvamento de recorrencia limitada sem quantidade de meses valida.
- **FR-007**: O sistema MUST permitir desativacao de regra ilimitada, interrompendo novas geracoes.
- **FR-008**: O sistema MUST oferecer modos automatica e manual quando o tipo selecionado for ilimitada.
- **FR-009**: O sistema MUST expandir campos adicionais ao selecionar ilimitada, incluindo escolha de modo e campos relacionados.
- **FR-010**: O sistema MUST aplicar validacoes condicionais conforme combinacao de tipo e modo selecionados.
- **FR-011**: O sistema MUST aplicar politica de fallback para dias 29/30/31 em meses menores, usando o ultimo dia valido do mes alvo.
- **FR-012**: O sistema MUST gerar automaticamente lancamentos em recorrencias ilimitadas automaticas enquanto a regra estiver ativa.
- **FR-012A**: O sistema MUST projetar recorrencias ilimitadas ate o ultimo mes do ano corrente ou ate 1 ano a partir da data atual, o que resultar no horizonte mais longo.
- **FR-012B**: O sistema MUST executar reconciliacao de recorrencia em toda carga da tela inicial e apos criar, editar, ativar ou desativar uma regra, sem depender de gatilho de primeiro acesso mensal.
- **FR-013**: O sistema MUST criar pendencia para recorrencias ilimitadas manuais, exigindo confirmacao explicita do usuario para efetivar.
- **FR-014**: O sistema MUST manter no maximo 1 pendencia por (`regra`, `ciclo mensal`) e MUST criar nova pendencia para cada novo ciclo nao confirmado.
- **FR-015**: O sistema MUST encerrar geracao automatica ao atingir o limite de meses da recorrencia limitada.
- **FR-015A**: O sistema MUST iniciar a contagem da recorrencia limitada a partir do proximo ciclo mensal completo apos o cadastro da regra.
- **FR-016**: O sistema MUST refletir lancamentos efetivados de recorrencia no dashboard e no historico completo em no maximo 1 ciclo de refresh apos confirmacao de persistencia, sendo 1 ciclo definido como invalidacao e recarga concluida das consultas de resumo mensal e historico.
- **FR-017**: O sistema MUST manter coerencia entre status da regra (ativa/inativa), pendencias e lancamentos efetivados.
- **FR-017A**: O sistema MUST preservar pendencias ja criadas ao desativar regra ilimitada manual e MUST bloquear novas pendencias apos a desativacao.
- **FR-017B**: O sistema MUST manter snapshot original das pendencias manuais ja criadas quando a regra recorrente for editada, aplicando as mudancas somente a novos ciclos.
- **FR-017C**: O sistema MUST exibir, na tela inicial, uma lista de confirmacoes de recorrencias pendentes entre o grafico e a tabela de transacoes.
- **FR-017D**: O sistema MUST disponibilizar acoes "Confirmar" e "Cancelar" por pendencia na lista da tela inicial, com persistencia confirmada antes de atualizar dashboard/historico.
- **FR-017E**: O sistema MUST tratar cancelamento de pendencia como estado terminal no ciclo mensal atual, impedindo recriacao da mesma pendencia ate o proximo ciclo.
- **FR-017F**: O sistema MUST aplicar regra "first terminal action wins" para pendencias do mesmo ciclo, bloqueando qualquer tentativa posterior de mudar estado apos confirmacao ou cancelamento persistido.
- **FR-017G**: O sistema MUST manter a regra recorrente independente da transacao original apos criacao, sem desativacao/remocao automatica por edicao ou exclusao da transacao base.
- **FR-018**: O sistema MUST apresentar mensagens de validacao claras para campos obrigatorios condicionais.
- **FR-019**: O sistema MUST permitir que o cadastro de transacao sem recorrencia continue funcionando sem regressao de UX.
- **FR-020**: O sistema MUST manter foco desta feature em comportamento funcional e UX, sem introduzir novos requisitos de seguranca nesta iteracao.
- **FR-021**: O sistema MUST preservar compatibilidade com storage legado, tratando campos novos ausentes sem erro, sem recriar transacoes historicas e sem gerar pendencias retroativas indevidas.

### Non-Functional Requirements

- **NFR-001**: O processamento de reconciliacao recorrente MUST ser idempotente por (`ruleId`, `monthRef`) em reentradas e repeticoes de execucao.
- **NFR-002**: A atualizacao visual de dashboard/historico apos confirmacao/cancelamento MUST ocorrer em no maximo 1 ciclo de refresh da interface, definido como invalidacao e recarga concluida das consultas de resumo mensal e historico no cliente.
- **NFR-003**: A feature MUST operar em modo local-first sem dependencias de jobs em background ou servicos externos para processamento mensal.
- **NFR-004**: A implementacao MUST preservar simplicidade de manutencao, evitando abstracoes especulativas sem necessidade concreta documentada.

### Key Entities *(include if feature involves data)*

- **Transaction**: Lancamento financeiro efetivado que impacta dashboard e historico; pode ser originado por cadastro direto, recorrencia automatica ou confirmacao manual de pendencia.
- **RecurrenceRule**: Regra de recorrencia mensal vinculada a uma configuracao de transacao, com atributos como dia do mes, tipo (limitada/ilimitada), quantidade de meses (quando limitada), modo (automatica/manual quando ilimitada), status ativo/inativo e contagem de ocorrencias efetivadas.
- **RecurrenceInstance (opcional)**: Representacao de ocorrencia mensal derivada da regra, com estado de ciclo (pendente, efetivada, cancelada), referencia ao mes alvo, snapshot dos dados no momento da criacao e relacionamento com a transacao efetivada quando houver confirmacao.

## Assumptions

- O primeiro momento de configuracao de recorrencia acontece no fluxo de novas transacoes.
- O processamento mensal considera calendario civil padrao e aplica fallback para ultimo dia valido quando necessario.
- O modo manual de recorrencia ilimitada depende de acao explicita do usuario para efetivar o lancamento.
- O impacto em dashboard/historico considera apenas transacoes efetivadas, nao pendencias nao confirmadas.
- A reconciliacao recorrente ocorre na carga da tela inicial e apos operacoes de manutencao de regra (criar/editar/ativar/desativar).
- Nao ha novos requisitos de seguranca ou compliance nesta fase, conforme escopo solicitado.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: 95% dos usuarios conseguem configurar uma recorrencia valida no cadastro de nova transacao em ate 2 minutos, incluindo escolha de tipo e modo quando aplicavel.
- **SC-002**: 100% dos cenarios de fallback para dias 29/30/31 resultam em ocorrencia no ultimo dia valido do mes alvo, sem erro bloqueante.
- **SC-003**: 100% das recorrencias limitadas param de gerar novas ocorrencias apos atingir a quantidade de meses configurada.
- **SC-004**: 100% das recorrencias ilimitadas manuais geram pendencia mensal e somente efetivam apos confirmacao do usuario.
- **SC-005**: Em pelo menos 95% dos casos validados manualmente, lancamentos recorrentes efetivados aparecem corretamente no dashboard e no historico no mesmo fluxo de uso.
- **SC-006**: A taxa de erros de validacao por campos condicionais sem mensagem compreensivel deve ser 0 nos cenarios de validacao manual definidos.
- **SC-007**: Em 100% dos cenarios manuais planejados, pendencias exibidas na lista da tela inicial permitem "Confirmar" ou "Cancelar" com reflexo consistente em no maximo 1 ciclo de refresh.
