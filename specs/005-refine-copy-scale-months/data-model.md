# Data Model: Refino de Texto Escala e Meses

## Entity: VisibleCopyTerm
- Description: Termo visivel com forma legada e forma canonica acentuada.
- Fields:
  - key: string (identificador semantico, ex.: transactions.title)
  - legacy: string (texto sem acento, ex.: Transacoes)
  - canonical: string (texto correto, ex.: Transações)
  - surfaces: string[] (locais de exibicao: titulo, label, botao, estado)
- Validation Rules:
  - canonical MUST ser exibido em todas as superficies impactadas.
  - legacy MUST NOT permanecer nas superficies alteradas.

## Entity: ScaledUIProfile
- Description: Perfil de escala global da UI para a feature.
- Fields:
  - scaleFactor: number (fixo em 1.2)
  - includeContainers: boolean (true)
  - includeOuterSpacing: boolean (true)
  - includeMaxWidth: boolean (true)
  - includeTypographyAndControls: boolean (true)
- Validation Rules:
  - Todos os elementos visuais no escopo devem refletir aumento proporcional de 20%.

## Entity: ChartLayoutProfile
- Description: Regras de layout do grafico para legibilidade e nao-clipping.
- Fields:
  - legendVerticalGap: number (valor de ajuste em px/rem)
  - chartMargins: { top: number; right: number; bottom: number; left: number }
  - markerVisibilityGuard: boolean (true quando sem corte nas bordas)
- Validation Rules:
  - Legenda MUST permanecer visualmente separada da area do grafico.
  - Marcadores circulares MUST permanecer totalmente visiveis.

## Entity: MonthDisplayPattern
- Description: Regra de exibicao de mes para eixo X e tooltip.
- Fields:
  - inputPattern: string (esperado AAAA-MM)
  - outputPattern: string (MMM/AAAA em pt-BR, caixa alta)
  - locale: string (pt-BR)
  - fallbackMode: string (original-value)
- Validation Rules:
  - Entradas validas MUST virar MMM/AAAA.
  - Entradas invalidas MUST retornar valor original sem quebrar renderizacao.

## Relationships
- ScaledUIProfile aplica-se a componentes que exibem VisibleCopyTerm.
- ChartLayoutProfile e MonthDisplayPattern aplicam-se aos mesmos pontos de exibicao do grafico (eixo X e tooltip).

## State Transitions
- MonthDisplayPattern:
  - raw-input -> parsed-valid -> formatted-mmm-yyyy
  - raw-input -> parsed-invalid -> original-value-fallback
