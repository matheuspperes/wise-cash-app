# Data Model: Modernizacao Visual do Dashboard

## Entity: ThemeProfile
- Fields:
  - id (string)
  - defaultMode (dark)
  - savedPreferenceBehavior (respect_saved)
  - palette (object)
  - contrastLevel (aa_minimum)
  - typographyFamily (string)
- Validation Rules:
  - defaultMode MUST ser dark
  - palette MUST conter tons suaves de roxo, azul e cinza
  - contrastLevel MUST atender legibilidade minima definida para o projeto
- Relationships:
  - 1:N com UIComponentStyle

## Entity: UIComponentStyle
- Fields:
  - id (string)
  - componentName (string)
  - stateVariant (default|hover|focus|disabled|loading|error)
  - tokenRefs (string[])
  - motionPreset (string)
- Validation Rules:
  - stateVariant MUST cobrir focus e disabled para componentes interativos principais
  - tokenRefs MUST apontar para tokens existentes
- Relationships:
  - N:1 com ThemeProfile

## Entity: LoadingStateModel
- Fields:
  - id (string)
  - surface (dashboard-card|list|chart|cta)
  - queryState (isLoading|isFetching|isError|success|empty)
  - visualFeedback (skeleton|inline-indicator|error-message|empty-state)
  - responseFeedbackMs (number)
- Validation Rules:
  - queryState MUST mapear para um visualFeedback valido
  - responseFeedbackMs MUST ser <= 1000 para estados criticos
- Relationships:
  - N:1 com DashboardViewModel

## Entity: ChartPresentationProfile
- Fields:
  - id (string)
  - chartType (area)
  - tooltipStylePreset (string)
  - gradientPreset (string)
  - axisStylePreset (string)
  - animationPreset (mount|update)
- Validation Rules:
  - tooltipStylePreset MUST ser legivel no dark theme
  - animationPreset MUST priorizar suavidade sem saltos abruptos
- Relationships:
  - 1:1 com DashboardViewModel

## Entity: TransactionActionCTA
- Fields:
  - id (string)
  - desktopPlacement (top)
  - mobilePlacement (fixed_bottom)
  - actionTarget (existing_transaction_flow)
  - emphasisLevel (high)
- Validation Rules:
  - actionTarget MUST reutilizar fluxo existente
  - mobilePlacement MUST nao bloquear conteudo critico
- Relationships:
  - 1:1 com DashboardViewModel

## Entity: DashboardViewModel
- Fields:
  - id (string)
  - hasTestDataVisible (boolean)
  - cards (array)
  - list (array)
  - chart (ChartPresentationProfile)
  - cta (TransactionActionCTA)
- Validation Rules:
  - hasTestDataVisible MUST ser false em ambiente de uso final
  - estados vazios MUST ser exibidos quando nao houver dados reais
- Relationships:
  - 1:N com LoadingStateModel
  - 1:1 com ChartPresentationProfile
  - 1:1 com TransactionActionCTA

## State Transitions

### LoadingStateModel.queryState
- isLoading -> success (dados iniciais carregados)
- isLoading -> isError (falha inicial)
- success -> isFetching (atualizacao em background)
- isFetching -> success (atualizacao concluida)
- success -> empty (sem dados reais)
- empty -> isFetching (nova consulta)

### ThemeProfile runtime behavior
- dark_default_applied -> saved_preference_applied (quando preferencia salva existe)
- saved_preference_applied -> dark_default_applied (quando preferencia e removida)
