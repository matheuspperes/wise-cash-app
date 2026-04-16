# Research - Refinar UX de Recorrencias e Header Global

## Decision 1: Filtrar pendencias por mes+ano local no servico/gateway
- Decision: Aplicar comparacao usando `getFullYear()` e `getMonth()` no contexto local para decidir elegibilidade das pendencias.
- Rationale: Evita inconsistencias de timezone e atende criterio de mes/ano do sistema local.
- Alternatives considered:
  - Comparacao por strings UTC (`toISOString`): rejeitada por risco de deslocamento de dia em fusos negativos.
  - Filtro apenas na UI: rejeitado para evitar divergencia entre telas/consumidores.

## Decision 2: Persistir data de recorrencia como data civil local (`YYYY-MM-DD`)
- Decision: Representar datas de recorrencia sem componente de hora/timezone na persistencia.
- Rationale: Regras mensais baseadas em dia do mes devem preservar exatamente o dia informado.
- Alternatives considered:
  - Persistir meia-noite UTC: rejeitado por provocar `-1 dia` em alguns fusos.
  - Persistir timezone fixo da criacao: rejeitado por maior complexidade para uso pessoal.

## Decision 3: Escopo de cabecalho global somente em telas de UI
- Decision: Aplicar botoes `Recorrencias`, `Transacoes`, `Nova Transacao` nas telas de UI navegaveis (dashboard e views financeiras), excluindo rotas tecnicas.
- Rationale: Mantem consistencia para o usuario sem poluir rotas nao interativas.
- Alternatives considered:
  - Aplicar em todas as rotas renderizadas: rejeitado por escopo desnecessario.
  - Aplicar apenas em transactions: rejeitado por inconsistencia de navegacao.

## Decision 4: "Fixo no cabecalho" sem sticky de viewport
- Decision: Botoes permanecem no cabecalho da pagina, sem comportamento sticky durante scroll.
- Rationale: Atende requisito com mudanca pequena e sem impacto estrutural.
- Alternatives considered:
  - Sticky global: rejeitado por alterar experiencia de scroll e aumentar risco de regressao visual.

## Decision 5: Reposicionar tooltips dentro da mesma div do select
- Decision: Estruturar select + tooltip no mesmo container horizontal para evitar quebra vertical.
- Rationale: Melhora legibilidade e reduz deslocamentos de layout.
- Alternatives considered:
  - Tooltip fora do container do select: rejeitado por desalinhamento em breakpoints.

## Decision 6: Remover botoes redundantes no fim de pagina
- Decision: Centralizar navegacao no cabecalho e remover CTAs de rodape/final de tela.
- Rationale: Evita duplicacao de acoes e simplifica hierarquia visual.
- Alternatives considered:
  - Manter ambos (header e rodape): rejeitado por redundancia e inconsistencia.
