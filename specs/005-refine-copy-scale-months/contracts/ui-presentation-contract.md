# Contract: UI Presentation Rules (Feature 005)

## Scope
Define o contrato de exibicao para copy acentuada, escala visual global, ajustes de grafico e formato de meses no dashboard/transacoes.

## Consumer Components
- components/dashboard/dashboard-page-client.tsx
- components/dashboard/area-history-chart.tsx
- components/dashboard/dashboard-feedback.tsx
- components/transactions/transaction-form.tsx

## Contract 1: Copy Normalization
- Input: Strings de UI visiveis no escopo da feature.
- Output Required:
  - Transações
  - Transação
  - Lançamentos
  - Observação
  - Histórico
  - líquido
- Rule: Formas legadas sem acento nao podem permanecer em titulos, labels, botoes e estados (erro/loading/vazio).

## Contract 2: Global Scale
- Input: Estilos base dos componentes no escopo.
- Output Required: Todos os elementos com fator visual proporcional de 1.2, incluindo containers, margens externas e largura maxima.
- Rule: Aplicar escala-base antes de ajustes finos de layout.

## Contract 3: Chart Layout Integrity
- Input: Serie mensal e configuracao do AreaChart.
- Output Required:
  - Espacamento vertical adequado entre legenda e grafico.
  - Nenhum marcador circular cortado nas bordas.
- Rule: Ajustes de margem/padding nao podem reduzir legibilidade de eixos e tooltip.

## Contract 4: Month Display Formatting
- Input:
  - Valor esperado: AAAA-MM
  - Valor invalido: qualquer formato nao parseavel na regra da feature
- Output Required:
  - Valido: MMM/AAAA em pt-BR (caixa alta), aplicado no eixo X e tooltip.
  - Invalido: exibir valor original recebido.
- Rule: Regra de formatacao deve ser consistente nos dois pontos de exibicao.

## Acceptance Mapping
- FR-001..FR-003 -> Contract 1
- FR-004 -> Contract 2
- FR-005..FR-007 -> Contract 3 (e CTA de adicionar)
- FR-008..FR-009..FR-011 -> Contract 4
