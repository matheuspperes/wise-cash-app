# Data Model - Refinar UX de Recorrencias e Header Global

## Entity: CurrentMonthPendingView
- Purpose: Representar conjunto de pendencias elegiveis para exibicao na tela de Recorrencias.
- Fields:
  - referenceNowLocal: Date
  - scheduledDate: string | Date
  - isCurrentMonthYear: boolean
  - visibleItems: PendingItem[]
- Validation Rules:
  - `isCurrentMonthYear` MUST usar `getFullYear()` + `getMonth()` no contexto local.
  - Quando `visibleItems.length === 0`, bloco de pendencias MUST nao ser renderizado.

## Entity: HeaderNavigationState
- Purpose: Definir renderizacao de botoes globais por contexto de pagina de UI.
- Fields:
  - route: string
  - isUiRoute: boolean
  - showBackToDashboard: boolean
  - showGlobalActions: boolean
- Validation Rules:
  - `showGlobalActions` MUST ser true em telas de UI navegaveis.
  - `showBackToDashboard` MUST ser false na dashboard e true fora dela (em rotas de UI).

## Entity: RecurrenceTooltipBinding
- Purpose: Manter associacao de acessibilidade para selects de recorrencia e tooltips adjacentes.
- Fields:
  - fieldId: string
  - tooltipId: string
  - ariaDescribedBy: string
  - isInlineRight: boolean
- Validation Rules:
  - `ariaDescribedBy` MUST referenciar `tooltipId` valido.
  - `isInlineRight` MUST permanecer true em desktop e mobile suportados.

## Entity: RecurrenceDateCivilRecord
- Purpose: Garantir persistencia de dia de recorrencia sem deslocamento por timezone.
- Fields:
  - inputDay: number
  - persistedDate: string (`YYYY-MM-DD`)
  - hasTimezoneComponent: boolean
  - dayPreserved: boolean
- Validation Rules:
  - `persistedDate` MUST nao incluir hora/timezone.
  - `dayPreserved` MUST ser true para criacao e edicao.

## Relationships
- `CurrentMonthPendingView` depende de `RecurrenceDateCivilRecord` para comparacao de mes/ano correta.
- `HeaderNavigationState` governa exibicao de CTAs globais e remocao de botoes de fim de pagina.
- `RecurrenceTooltipBinding` atua sobre campos no `transaction-form` e pontos similares de recorrencia.

## State Transitions

### Pendencias
- carregado -> filtrado por mes/ano local
- filtrado vazio -> bloco oculto
- confirmar/cancelar -> lista atualizada sem mudar semantica funcional

### Cabecalho
- rota UI -> botoes globais exibidos
- rota dashboard -> esconder `Voltar ao Dashboard`
- rota UI fora dashboard -> exibir `Voltar ao Dashboard`

### Data de recorrencia
- entrada do usuario -> normalizacao para `YYYY-MM-DD`
- persistido -> consulta/manipulacao sem deslocamento de dia
