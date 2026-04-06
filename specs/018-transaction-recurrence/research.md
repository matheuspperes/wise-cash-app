# Research: Recorrencia Mensal em Novas Transacoes

## Decision 1: Evoluir regra existente sem ruptura
- Decision: Estender `RecurrenceRuleRecord` atual para suportar tipo (limited/unlimited), modo (automatic/manual), limite de ciclos e controle de ciclo processado.
- Rationale: Reduz retrabalho e reaproveita fluxo local-first ja funcional.
- Alternatives considered:
  - Criar tabela totalmente nova de regras (rejeitado: alto custo de migracao e retrabalho).
  - Manter regra minima e espalhar estado em `meta` (rejeitado: pior rastreabilidade).

## Decision 2: Introduzir RecurrenceInstance para modo manual
- Decision: Adotar `RecurrenceInstance` opcional para representar cada ciclo pendente/efetivado, com snapshot dos dados da transacao no momento da criacao.
- Rationale: Atende acumulacao de pendencias por ciclo, preserva historico e evita sobrescrita retroativa.
- Alternatives considered:
  - Reusar apenas `TransactionRecord` com status pendente (rejeitado: mistura semantica de pendencia e efetivacao).
  - Nao persistir pendencia e recalcular em runtime (rejeitado: risco de duplicidade e perda de auditabilidade).

## Decision 3: Projecao mensal para regras ilimitadas
- Decision: Processar recorrencias por projecao mensal idempotente, mantendo horizonte ate o ultimo mes do ano ou 1 ano a partir do mes corrente (o que for maior).
- Rationale: Elimina dependencia de gatilho de primeiro acesso e preserva previsibilidade no ambiente browser/local-first.
- Alternatives considered:
  - Processamento em virada de mes em background (rejeitado: nao confiavel em navegador).
  - Processar apenas ao abrir tela de novas transacoes (rejeitado: cobertura funcional incompleta).

## Decision 4: Politica de fallback de dia 29/30/31
- Decision: Usar ultimo dia valido do mes alvo quando `dayOfMonth` exceder o calendario do mes.
- Rationale: Deterministico, previsivel e alinhado aos requisitos de edge cases.
- Alternatives considered:
  - Pular mes sem dia correspondente (rejeitado: comportamento confuso para usuario).
  - Avancar para proximo mes com o dia exato (rejeitado: quebra semantica mensal).

## Decision 5: Idempotencia por ruleId + monthRef
- Decision: Tratar cada ciclo mensal por chave logica (`ruleId`, `monthRef`) para impedir geracao duplicada de automaticos e pendencias manuais.
- Rationale: Resolve duplicidade em reabertura do app e tentativas repetidas de processamento.
- Alternatives considered:
  - Apenas comparar por data de transacao (rejeitado: suscetivel a colisao e falhas em edicoes).
  - Marcar somente ultimo processamento global (rejeitado: nao cobre pendencias por regra).

## Decision 6: Atualizacao de dashboard/historico somente com efetivadas
- Decision: Incluir nos agregados apenas transacoes efetivadas; pendencias manuais ficam fora ate confirmacao.
- Rationale: Mantem coerencia financeira e evita distorcao de saldo.
- Alternatives considered:
  - Incluir pendencias com marcador visual (rejeitado: altera semantica dos totais atuais).
  - Agregados separados de pendencias nesta fase (rejeitado: amplia escopo da feature).

## Decision 7: Politica terminal para pendencias manuais
- Decision: Tratar `confirmed` e `canceled` como estados terminais por ciclo mensal e aplicar regra first terminal action wins em conflitos.
- Rationale: Evita inconsistencias de concorrencia (duplo clique/multiplas abas) e simplifica idempotencia no modo manual.
- Alternatives considered:
  - Last write wins (rejeitado: pode sobrescrever decisao ja persistida).
  - Confirmacao sempre prevalece (rejeitado: cria comportamento assimetrico e menos previsivel).

## Decision 8: Independencia da regra recorrente da transacao base
- Decision: Apos criada, a regra recorrente permanece independente da transacao original; remocao/edicao da transacao base nao desativa regra automaticamente.
- Rationale: Preserva continuidade operacional da automacao e reduz efeitos colaterais inesperados.
- Alternatives considered:
  - Desativar regra ao remover transacao base (rejeitado: alto risco de perda acidental de recorrencia ativa).
  - Remover pendencias futuras junto com a transacao base (rejeitado: conflita com preservacao de historico e controle manual).
