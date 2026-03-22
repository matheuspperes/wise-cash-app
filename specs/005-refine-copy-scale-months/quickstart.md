# Quickstart: Refino de Texto Escala e Meses

## Objective
Aplicar os ajustes da feature em ordem segura:
1. Escala global de 20%.
2. Refinos visuais de grafico/legenda/CTA.
3. Padrao consistente de meses MMM/AAAA com fallback.
4. Correcao de copy em todas as superficies visiveis do escopo.

## Implementation Steps
1. Atualize base de escala dos componentes impactados (dashboard e transacoes), incluindo largura maxima e espacamentos externos.
2. Reajuste o grafico para remover clipping das tags circulares e alinhar o espacamento vertical da legenda.
3. Reduza levemente o botao "+" e centralize o simbolo nos breakpoints desktop/mobile.
4. Centralize a formatacao de mes em utilitario compartilhado e aplique no eixo X e tooltip.
5. Garanta fallback para mes invalido exibindo valor original recebido.
6. Corrija textos com acentuacao nos titulos, labels, botoes e estados (erro/loading/vazio).

## Manual Validation
1. Execute a aplicacao localmente e percorra dashboard e transacoes em desktop e mobile.
2. Confirme que todos os elementos no escopo estao 20% maiores versus baseline.
3. Confirme ausencia de colisao entre legenda e grafico e ausencia de clipping dos marcadores.
4. Confirme que o botao "+" esta levemente menor e centralizado.
5. Confirme que meses aparecem como MMM/AAAA no eixo X e tooltip.
6. Injete/force um valor de mes invalido e confirme exibicao do valor original sem erro visual.
7. Confirme que nao restaram termos legados sem acentuacao nas superficies alteradas.

## Evidence Artifacts
Registrar evidencias em:
- manual-validation/refine-copy-scale-months/us1-copy.md
- manual-validation/refine-copy-scale-months/us2-scale-layout.md
- manual-validation/refine-copy-scale-months/us3-month-format.md
- manual-validation/refine-copy-scale-months/regression-summary.md
