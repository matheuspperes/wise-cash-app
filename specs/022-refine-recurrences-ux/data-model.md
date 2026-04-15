# Data Model - Refinar Experiencia de Recorrencias

## Entity: CurrentMonthPendingFilter
- Purpose: Define criterio de elegibilidade de pendencia exibida no bloco de confirmacoes.
- Fields:
  - nowLocal: Date
  - scheduledDate: string | Date
  - matchesCurrentMonthYear: boolean
- Validation Rules:
  - `matchesCurrentMonthYear` MUST considerar mes+ano no fuso local do dispositivo.
  - Datas invalidas SHOULD ser tratadas como nao elegiveis para exibicao.

## Entity: RecurrencePendingBlockState
- Purpose: Controlar renderizacao do bloco "Confirmacoes pendentes de recorrencia".
- Fields:
  - pendingItemsCurrentMonth: PendingConfirmationItem[]
  - shouldRenderBlock: boolean
- Validation Rules:
  - `shouldRenderBlock = pendingItemsCurrentMonth.length > 0`.
  - Quando `shouldRenderBlock` for false, o container MUST nao ser renderizado.

## Entity: RecurrenceListItemView
- Purpose: Representar item da lista principal de recorrencias.
- Fields:
  - recurrenceId: string
  - name: string
  - amount: number
  - recurrenceType: limited | unlimited
  - recurrenceMode: auto | manual
  - nextScheduledDate: string
  - isEditing: boolean
- Validation Rules:
  - `amount` MUST seguir as regras de valor do formulario de transacao.
  - Apenas um item SHOULD estar com `isEditing = true` por vez.

## Entity: RecurrenceDeleteTelemetryParity
- Purpose: Garantir paridade de eventos de exclusao com o historico.
- Fields:
  - eventSetHistory: string[]
  - eventSetRecurrences: string[]
  - includesConfirmAction: boolean
  - includesCancelAction: boolean
- Validation Rules:
  - `eventSetRecurrences` MUST ser semanticamente equivalente a `eventSetHistory`.
  - Confirm e cancel no prompt MUST gerar os mesmos tipos de evento do historico.

## Entity: RecurrenceTooltipA11yBinding
- Purpose: Manter vinculo entre select e descricao de tooltip apos reposicionamento.
- Fields:
  - fieldId: string
  - tooltipId: string
  - ariaDescribedBy: string
  - isInlineRightAligned: boolean
- Validation Rules:
  - `ariaDescribedBy` MUST referenciar `tooltipId` valido para o campo.
  - `isInlineRightAligned` MUST permanecer true em layout desktop e mobile.

## Entity: NewTransactionGridAlignment
- Purpose: Uniformizar dimensoes visuais do grid de criacao/edicao com inputs/selects do bloco.
- Fields:
  - gridClassName: string
  - controlClassName: string
  - isVerticallyAligned: boolean
- Validation Rules:
  - `isVerticallyAligned` MUST ser true nas larguras de tela suportadas.

## Relationships
- `CurrentMonthPendingFilter` alimenta `RecurrencePendingBlockState`.
- `RecurrenceListItemView.isEditing` ativa estilo de destaque e aciona fluxo de formulario compartilhado.
- `RecurrenceDeleteTelemetryParity` depende do mesmo fluxo de exclusao do historico.
- `RecurrenceTooltipA11yBinding` liga campos de formulario a texto de apoio acessivel.
- `NewTransactionGridAlignment` atua sobre a mesma area de UI afetada pelos campos de recorrencia.

## State Transitions

### Pendencias
- carregado -> filtrado por mes atual
- filtrado vazio -> bloco nao renderizado
- item pendente -> confirmado/cancelado (sem mudar semantica existente)

### Recorrencia em edicao
- idle -> editing (item destacado)
- editing -> saved (destaque removido)
- editing -> canceled (destaque removido)

### Exclusao
- idle -> prompt aberto
- prompt confirmado -> regra removida + eventos de confirmacao
- prompt cancelado -> estado preservado + eventos de cancelamento
