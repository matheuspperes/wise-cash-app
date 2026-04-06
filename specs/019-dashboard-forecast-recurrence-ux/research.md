# Research: Dashboard Forecast e UX de Recorrencia (Ajuste de Alinhamento)

## Decision 1: Tooltip a direita da label em ambos os campos
- Decision: Posicionar o gatilho de tooltip na extremidade direita da linha de label de `Tipo de recorrencia` e `Modo da recorrencia`.
- Rationale: Preserva leitura natural da esquerda para direita e reduz interferencia no campo principal.
- Alternatives considered:
  - Tooltip abaixo do select (rejeitado: aumenta altura e quebra simetria).
  - Tooltip antes da label (rejeitado: piora escaneamento visual).

## Decision 2: Largura reduzida e uniforme dos selects
- Decision: Aplicar largura visual reduzida e consistente aos dois selects de recorrencia, com limite responsivo.
- Rationale: Melhora balanceamento entre label, controle e icone de ajuda, evitando areas vazias excessivas.
- Alternatives considered:
  - Manter largura total sem limite (rejeitado: composicao menos coesa).
  - Largura fixa rigida (rejeitado: fragil em telas pequenas).

## Decision 3: Wrapper compartilhado de alinhamento
- Decision: Reutilizar o mesmo wrapper de label+tooltip nos dois campos para padronizar `justify`, `gap` e alinhamento vertical.
- Rationale: Evita drift visual entre campos equivalentes e simplifica manutencao.
- Alternatives considered:
  - Ajustar cada campo isoladamente (rejeitado: aumenta risco de regressao).

## Decision 4: Comportamento e acessibilidade preservados
- Decision: Manter interacoes existentes dos tooltips (click/tap abre; outside click/ESC fecha) e sem perda de navegacao por teclado.
- Rationale: Escopo e de refinamento visual, sem alteracao de regra funcional.
- Alternatives considered:
  - Hover-only (rejeitado: pior para touch).
  - Remover ESC (rejeitado: regressao de acessibilidade).

## Decision 5: Validacao manual focada em alinhamento
- Decision: Priorizar cenarios manuais para validar posicionamento a direita, largura reduzida, simetria visual e preservacao de preenchimento.
- Rationale: Constituicao exige validacao manual e o risco principal deste recorte e visual/interacional.
- Alternatives considered:
  - Validacao apenas funcional (rejeitado: pode deixar regressao visual escapar).
