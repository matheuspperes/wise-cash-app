# Research - Refinar Experiencia de Recorrencias

## Decision 1: Filtrar pendencias por mes/ano atual no fuso local
- Decision: Aplicar filtro por mes+ano da `scheduledDate` comparando com data corrente no fuso local do dispositivo.
- Rationale: O spec exige aderencia ao mes atual do usuario, evitando divergencia visual perto de viradas.
- Alternatives considered:
  - UTC fixo: descartado por gerar discrepancia perceptivel para uso local.
  - Fuso configuravel por usuario: descartado por aumentar escopo sem necessidade atual.

## Decision 2: Nao renderizar bloco de pendencias quando vazio
- Decision: Se nao houver pendencias elegiveis no mes atual, o container de "Confirmacoes pendentes de recorrencia" nao sera renderizado.
- Rationale: Remove ruido visual e elimina espaco residual no layout.
- Alternatives considered:
  - Estado vazio textual: descartado por conflitar com decisao de clarificacao.
  - Colapso mantendo container: descartado por manter complexidade de layout sem ganho.

## Decision 3: Reuso estrito de UX de editar/excluir do historico
- Decision: Reapontar view de recorrencias para os mesmos handlers/componentes/estados usados no historico para editar/excluir.
- Rationale: Garante consistencia visual e comportamental, com menor risco de regressao.
- Alternatives considered:
  - Implementar fluxo paralelo de recorrencias: descartado por duplicacao e risco de drift.

## Decision 4: Paridade exata de analytics de exclusao
- Decision: Em exclusao, reproduzir exatamente os mesmos eventos do historico, incluindo confirmar/cancelar no prompt.
- Rationale: Mantem rastreabilidade comparavel entre telas e evita lacunas de telemetria.
- Alternatives considered:
  - Registrar apenas evento de confirmacao: descartado por cobertura incompleta.

## Decision 5: Destaque explicito do item em edicao
- Decision: Expor estado `isEditing` na lista e aplicar classe utilitaria de destaque no item ativo.
- Rationale: Melhora orientacao visual durante edicao e reduz erro de contexto.
- Alternatives considered:
  - Sem destaque: descartado por ambiguidade visual.
  - Destaque global da lista: descartado por baixa precisao.

## Decision 6: Incluir valor/quantia no fluxo de edicao reaproveitado
- Decision: Garantir que o formulario de edicao da recorrencia inclua campo de valor/quantia com mesmas regras de validacao do historico.
- Rationale: Atende requisito funcional direto sem criar um segundo formulario.
- Alternatives considered:
  - Campo apenas para frequencia/modo: descartado por nao atender FR-006.

## Decision 7: Tooltip ao lado direito do select com acessibilidade preservada
- Decision: Manter tooltip dentro do mesmo agrupamento visual do select, imediatamente a direita, preservando `id` e `aria-describedby`.
- Rationale: Resolve legibilidade e evita quebra de acessibilidade.
- Alternatives considered:
  - Tooltip fora do container do campo: descartado por desalinhamento visual.

## Decision 8: Remover copys proibidas e colapsar espaco
- Decision: Remover todas as strings proibidas da UI e da fonte centralizada de copy, com condicional para evitar lacunas.
- Rationale: Alinha linguagem e elimina espacos mortos.
- Alternatives considered:
  - Manter copy e esconder por CSS: descartado por manter conteudo obsoleto.

## Decision 9: Alinhar altura/padding do grid de nova transacao
- Decision: Consolidar classes utilitarias para altura e padding do bloco de criacao/edicao, igualando aos demais controls.
- Rationale: Corrige inconsistencia visual com mudanca pequena e segura.
- Alternatives considered:
  - Ajustes ad hoc por tela: descartado por reduzir previsibilidade de manutencao.
