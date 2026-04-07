# Data Model: Dashboard Forecast e UX de Recorrencia

## Entity: DashboardViewMode
- Description: Estado de visualizacao da dashboard para controle da janela temporal exibida.
- Values:
  - historico
  - previsoes
- Rules:
  - Valor padrao: `historico`.
  - Alteracao de modo nao altera o `TimeRangeSelection`.

## Entity: TimeRangeSelection
- Description: Quantidade de meses selecionada no controle de periodo da dashboard.
- Fields:
  - months: integer > 0
- Rules:
  - Historico usa `months` para calcular janela retroativa com mes atual como ultimo ponto.
  - Previsoes usa `months` para calcular janela progressiva com mes atual como primeiro ponto.

## Entity: DashboardSeriesWindow
- Description: Janela temporal derivada de `DashboardViewMode` + `TimeRangeSelection`.
- Fields:
  - mode: DashboardViewMode
  - startMonthRef: YYYY-MM
  - endMonthRef: YYYY-MM
  - orderedMonthRefs: YYYY-MM[]
- Rules:
  - Historico: orderedMonthRefs em ordem cronologica crescente, terminando no mes atual.
  - Previsoes: orderedMonthRefs em ordem cronologica crescente, iniciando no mes atual.
  - Quando nao houver dados suficientes para todos os pontos, manter meses disponiveis sem quebrar visualizacao.

## Entity: PrimaryBalanceCard
- Description: Card principal fixo da dashboard.
- Fields:
  - id: primary
  - label: string
  - value: number
- Rules:
  - label MUST permanecer `Saldo liquido atual`.
  - valor segue a regra atual de saldo principal, sem depender de `DashboardViewMode`.

## Entity: SecondaryBalanceCardContext
- Description: Contexto textual e numerico do card secundario que acompanha o modo da dashboard.
- Fields:
  - mode: DashboardViewMode
  - label: string
  - value: number
- Rules:
  - mode=historico -> `Saldo liquido historico`.
  - mode=previsoes -> `Saldo liquido previsto`.
  - label e value MUST alternar no mesmo ciclo de atualizacao da interface.

## Entity: TooltipAnchorLayout
- Description: Regra de ancoragem visual dos tooltips dos selects de recorrencia.
- Fields:
  - targetField: recurrenceType | recurrenceMode
  - triggerPlacement: right_of_select
  - triggerSize: small
  - selectWidthPolicy: reduced_consistent
- Rules:
  - Gatilho de tooltip fica a direita da linha de label do select, sem sobrepor o controle.
  - Selects usam largura visual reduzida e consistente entre si, com limite responsivo.
  - Alinhamento vertical entre os dois selects MUST permanecer simetrico em desktop/mobile.

## Entity: RecurrenceTooltipContent
- Description: Conteudo textual de apoio para campos recorrentes no formulario.
- Fields:
  - targetField: recurrenceType | recurrenceMode
  - lines: string[]
  - interactionMode: click_tap
- Rules:
  - Deve haver quebra de linha entre as duas definicoes de cada tooltip.
  - Texto MUST usar portugues corrigido sem alterar sentido funcional.
  - Fechamento por click fora ou ESC sem alterar estado preenchido do formulario.

## Entity: RecurrenceActivationControl
- Description: Controle visual de ativacao de recorrencia no formulario.
- Fields:
  - isEnabled: boolean
  - label: string
  - visualState: on | off
- Rules:
  - Rotulo explicito com destaque para `Recorrencia`.
  - Estado visual deve ser claramente distinguivel entre ligado e desligado.
  - Ao desligar, campos recorrentes recolhem e permanecem fora do envio final.

## Relationships
- DashboardViewMode + TimeRangeSelection -> DashboardSeriesWindow.
- DashboardViewMode -> SecondaryBalanceCardContext.
- PrimaryBalanceCard independente de DashboardViewMode.
- RecurrenceTooltipContent -> campos do formulario de recorrencia.
- TooltipAnchorLayout -> posicionamento visual dos controles de tooltip.
- RecurrenceActivationControl -> exibicao dos campos recorrentes.

## State Transitions
1. Dashboard mode:
   - historico -> previsoes (preserva months)
   - previsoes -> historico (preserva months)
2. Recurrence activation:
   - off -> on (expande secao recorrente)
   - on -> off (recolhe secao recorrente e remove impacto no payload)

## Validation Notes
- Validacao manual deve comprovar invariancia do card principal (`Saldo liquido atual`).
- Validacao manual deve comprovar alternancia consistente do card secundario (label+valor) por modo.
- Validacao manual deve comprovar ausencia de desalinhamento visual nos selects com tooltip.
- Validacao manual deve comprovar comportamento identico dos tooltips em desktop/mobile (click/tap e fechamento).
