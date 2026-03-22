# Research: Refino de Texto Escala e Meses

## Decision 1: Executar ajustes na ordem escala global -> refinos visuais -> padrao de meses
- Decision: Implementar primeiro o aumento global de 20% em toda a base visual impactada e somente depois aplicar ajustes finos de grafico, CTA e copy.
- Rationale: A ordem reduz retrabalho de tune visual, porque espacamentos, tamanhos e alinhamentos finais dependem da escala base.
- Alternatives considered:
  - Aplicar refinos item a item sem baseline de escala: rejeitado por alto risco de retrabalho.
  - Aplicar padrao de mes antes da escala: rejeitado por nao atacar a prioridade visual definida.

## Decision 2: Centralizar formatacao de mes em utilitario unico com fallback explicito
- Decision: Usar um formatter compartilhado para produzir MMM/AAAA em portugues (caixa alta), aplicando no eixo X e tooltip, e retornar valor original quando entrada for invalida.
- Rationale: Evita divergencia entre pontos de exibicao e torna regra de fallback consistente e previsivel.
- Alternatives considered:
  - Formatar inline em cada componente: rejeitado por risco de inconsistencias.
  - Substituir invalido por placeholder fixo: rejeitado pela clarificacao do usuario (preservar valor original).

## Decision 3: Ajustar clipping e legenda do Recharts por margem e area util
- Decision: Ajustar margin/padding do AreaChart e espacamento da legenda para impedir corte de pontos circulares e colisao visual.
- Rationale: A causa principal de clipping em Recharts costuma ser area util insuficiente nas bordas; margem controlada corrige sem alterar dados.
- Alternatives considered:
  - Reduzir tamanho dos marcadores para evitar corte: rejeitado por impacto visual indesejado.
  - Remover legenda para abrir espaco: rejeitado por perda de contexto de series.

## Decision 4: Corrigir copy em todas as superficies visiveis alteradas (incluindo estados)
- Decision: Atualizar termos acentuados em titulos, labels, botoes e mensagens de estado (erro/loading/vazio) dentro do escopo da feature.
- Rationale: Garante conformidade completa com os FRs e reduz ambiguidade linguistica para uso diario.
- Alternatives considered:
  - Corrigir somente titulos principais: rejeitado por cobertura incompleta frente aos requisitos.

## Decision 5: Validacao manual guiada por cenarios e evidencias
- Decision: Registrar validacao manual por historia de usuario, cobrindo desktop/mobile, copy, escala, grafico, CTA e fallback de mes invalido.
- Rationale: A constituicao do projeto exige validacao manual e proibe suites automatizadas.
- Alternatives considered:
  - Testes automatizados de UI: rejeitado por conflito com a constituicao.
