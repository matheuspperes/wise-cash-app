# US3 Results - Formatação de Meses

## Resultado
PASS

## Evidências
- Função `formatMonthYearLabel` adicionada em `lib/formatting/ptbr.ts`.
- Repositório mensal aplica formatação após ordenação por `monthRef`.
- Serviço de merge demo/real preserva `monthRef` para ordenação estável.
- Gráfico aplica formatter no eixo X e tooltip.
- Regra de fallback: valor fora de `AAAA-MM` é exibido sem alteração.

## Conclusão
- FR-008, FR-009 e FR-011 atendidos.
