# Research: CSV Import/Export (Modelo Unico)

## Decision 1: Modelo CSV unico com cabecalhos em PT-BR e ordem fixa
- Decision: Usar um unico modelo CSV para importacao e exportacao com cabecalhos em portugues e ordem fixa.
- Rationale: Garante consistencia e permite reimportacao sem ajuste estrutural.
- Alternatives considered:
  - Modelos separados para import/export (rejected: aumenta ambiguidade e retrabalho).
  - Cabecalhos tecnicos (rejected: piora a experiencia do usuario).

## Decision 2: Parser CSV client-side com suporte a aspas
- Decision: Processar CSV no navegador com parser simples que suporta campos entre aspas e escape de aspas.
- Rationale: Evita dependencia externa e mantem fluxo local-first.
- Alternatives considered:
  - Adicionar biblioteca pesada de CSV (rejected: custo extra sem necessidade).
  - Enviar para API server-side (rejected: contraria fluxo local-first).

## Decision 3: Normalizacao leve para textos controlados
- Decision: Aplicar trim e case-insensitive nos campos controlados (Tipo, Recorrencia Ativa, Tipo da Recorrencia, Modo da Recorrencia).
- Rationale: Tolera variacoes pequenas sem perder rigor de formatos.
- Alternatives considered:
  - Normalizacao agressiva com substituicoes extensas (rejected: risco de aceitar dados ambiguidos).

## Decision 4: Validacao rigorosa de numero e data
- Decision: Valor deve usar ponto decimal e ser positivo; Data deve ser YYYY-MM-DD.
- Rationale: Mantem consistencia com dominio e evita interpretacoes erradas.
- Alternatives considered:
  - Aceitar virgula decimal (rejected: cria ambiguidade e divergencia com exportacao).
  - Aceitar datas locais (rejected: risco de parsing inconsistente).

## Decision 5: Recorrencia opcional com dependencias obrigatorias
- Decision: Recorrencia so e aplicada quando Recorrencia Ativa = Sim, exigindo campos dependentes.
- Rationale: Evita criacao parcial de regras e reduz inconsistencias.
- Alternatives considered:
  - Inferir defaults para campos faltantes (rejected: alto risco de erro).

## Decision 6: Exportacao preenche recorrencia a partir da regra
- Decision: Para transacoes com `recurrenceRuleId`, exportar campos de recorrencia baseados na regra atual; caso contrario, deixar campos vazios.
- Rationale: Mantem alinhamento com regras persistidas e evita dados inventados.
- Alternatives considered:
  - Duplicar campos a partir da transacao apenas (rejected: pode divergir da regra ativa).

## Decision 7: Categoria deve existir no conjunto conhecido
- Decision: Considerar valida quando corresponder a categoria atual (preset ou existente nas transacoes locais) apos normalizacao.
- Rationale: Evita criar categorias inconsistentes e atende regra do modelo.
- Alternatives considered:
  - Criar categoria automaticamente (rejected: fora de escopo).
