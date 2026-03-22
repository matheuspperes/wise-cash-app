# Data Model: Refino Visual Banner e Dados do Dashboard

## Entity: TopNavigation
- Fields:
  - id (string)
  - brandName ("Wise Cash")
  - links (array of NavLink)
  - activeRoute (string)
- Validation Rules:
  - links MUST conter exatamente duas entradas: Dashboard e Transacoes
  - brandName MUST permanecer "Wise Cash"
- Relationships:
  - 1:N com NavLink

## Entity: NavLink
- Fields:
  - id (string)
  - label ("Dashboard" | "Transacoes")
  - href (string)
  - isActive (boolean)
- Validation Rules:
  - label MUST corresponder aos rotulos aprovados no FR-007
  - href MUST apontar para rotas existentes do app
- Relationships:
  - N:1 com TopNavigation

## Entity: PrimaryActionButton
- Fields:
  - id (string)
  - symbol ("+")
  - shape ("circle")
  - colorToken (string)
  - actionTarget ("existing_transaction_flow")
- Validation Rules:
  - symbol MUST ser somente "+"
  - shape MUST ser circular
  - colorToken MUST representar roxo mais escuro que o roxo primario
  - actionTarget MUST reutilizar fluxo atual de criacao de transacao
- Relationships:
  - 1:1 com DashboardSurface

## Entity: DashboardSurface
- Fields:
  - id (string)
  - backgroundStyle ("purple-mottled")
  - contrastLevel ("legible")
  - topNavigation (TopNavigation)
  - cta (PrimaryActionButton)
- Validation Rules:
  - backgroundStyle MUST manter legibilidade de textos e cartoes
  - contrastLevel MUST permanecer adequado para uso cotidiano
- Relationships:
  - 1:1 com TopNavigation
  - 1:1 com PrimaryActionButton

## Entity: TransactionCopySet
- Fields:
  - id (string)
  - categoryPlaceholder ("Categoria")
  - notesLabel ("Observacao")
  - saveButtonVariant ("compact-moderate")
  - reviewedTexts (string[])
- Validation Rules:
  - categoryPlaceholder MUST ser exatamente "Categoria"
  - notesLabel MUST substituir "Notas" em todos os pontos visiveis alterados
  - saveButtonVariant MUST reduzir dimensao visual sem perda de legibilidade
  - reviewedTexts MUST incluir os termos listados em FR-007
- Relationships:
  - 1:1 com TransactionFormView

## Entity: DemoModeConfig
- Fields:
  - id (string)
  - enabled (boolean)
  - activationSource ("toggle" | "configuration")
- Validation Rules:
  - enabled MUST controlar exclusivamente a presenca dos dados simulados
  - activationSource MUST ser explicito para o usuario/mantenedor
- Relationships:
  - 1:1 com ChartDataEnvelope

## Entity: DemoTransactionItem
- Fields:
  - id (string)
  - type ("income" | "expense")
  - description (string)
  - category (string)
  - amount (number)
  - transactionDate (ISO date)
  - monthRef ("2026-02" | "2026-03")
  - sourceOrMethod (string)
  - observation (string)
- Validation Rules:
  - dataset MUST conter exatamente 4 itens (2 income + 2 expense)
  - monthRef MUST distribuir itens entre fevereiro e marco
  - todos os campos MUST estar preenchidos (sem placeholders vazios)
  - amount MUST ser maior que zero
- Relationships:
  - N:1 com ChartDataEnvelope

## Entity: ChartDataEnvelope
- Fields:
  - id (string)
  - realSeries (array)
  - demoSeries (DemoTransactionItem[])
  - visualLegend (object)
  - distinctionStyle ("demo-vs-real-clear")
- Validation Rules:
  - realSeries MUST permanecer visivel quando demo mode estiver ativo
  - demoSeries MUST aparecer apenas com DemoModeConfig.enabled=true
  - visualLegend MUST distinguir claramente demo e real
- Relationships:
  - 1:1 com DemoModeConfig
  - 1:N com DemoTransactionItem

## State Transitions

### DemoModeConfig.enabled
- false -> true (ativacao explicita do modo demonstracao)
- true -> false (retorno ao modo normal, removendo serie demo)

### ChartDataEnvelope rendering
- real-only -> real+demo (quando demo mode ligado)
- real+demo -> real-only (quando demo mode desligado)
