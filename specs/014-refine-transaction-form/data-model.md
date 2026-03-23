# Data Model: Refine Transaction Form Inputs and Dashboard CTA Harmony

## Entity: TransactionTypeToggleState
- Description: Exclusive state for Segmented Control options in new transaction flow.
- Fields:
  - selectedType: "expense" | "income"
  - options: ["Despesa", "Receita"]
  - selectionMode: "exclusive"
  - visualProfile:
    - expenseSelectedBackground: "rgba(239, 68, 68, 0.2)"
    - incomeSelectedBackground: "rgba(34, 197, 94, 0.2)"
    - selectedTextContrast: "light-red|light-green"
    - transition: "background-color + color smooth"
- Validation Rules:
  - Exactly one option is selected at any time.
  - Saved transaction type matches selected option.

## Entity: CategorySelectionMode
- Description: Category selection model for new transaction form.
- Fields:
  - mode: "preset" | "create-new"
  - selectedPresetCategory: string | null
  - newCategoryName: string | null
  - createNewOptionVisible: true
  - duplicateComparison: "trim + case-insensitive"
- Validation Rules:
  - Preset mode requires a category from grouped list.
  - Create-new mode requires non-empty category name.
  - Duplicate normalized names are blocked.
  - Created category persists and becomes selected in current launch.

## Entity: CategoryPresetCatalog
- Description: Canonical preset categories grouped by transaction type.
- Fields:
  - expenseCategoriesAlphabetical:
    - Casa
    - Carro
    - Comida
    - Educacao
    - Mercado
    - Outros
    - Recreacao
    - Roupa
    - Saude
    - Servicos
    - Taxas
    - Transferencias
    - Transporte
  - incomeCategoriesAlphabetical:
    - Bonus
    - Investimento
    - Outros
    - Presente
    - Salario
    - Vale
- Validation Rules:
  - Categories are grouped by type and sorted alphabetically.
  - Grouped options are available in select before create-new entry.

## Entity: BrlCurrencyInputState
- Description: BRL currency input with masked display and numeric persistence.
- Fields:
  - rawDigits: string
  - displayValue: string (prefix "R$")
  - interpretationMode: "continuous-cents"
  - persistedNumericValue: number
- Validation Rules:
  - Typing 1234 displays R$ 12,34.
  - Deleting/retyping keeps mask stable.
  - Persisted value equals masked display meaning.

## Entity: DashboardActionButtonVisualProfile
- Description: Shared visual rules for dashboard Transacoes and Nova Transacao buttons.
- Fields:
  - equalPaddingAllBreakpoints: true
  - sharedPaddingHorizontal: token
  - sharedPaddingVertical: token
  - transacoesVariant: "fixed-secondary"
  - transacoesFamilyMatchPrimary: true
- Validation Rules:
  - Both buttons share equal horizontal and vertical padding across mobile/tablet/desktop.
  - Transacoes uses fixed secondary variant while remaining visually related to primary CTA.

## Relationships
- TransactionTypeToggleState influences which CategoryPresetCatalog group is prioritized in CategorySelectionMode.
- CategorySelectionMode reads CategoryPresetCatalog and can append persisted created category.
- BrlCurrencyInputState is coupled to transaction submission payload consistency.
- DashboardActionButtonVisualProfile governs CTA consistency independently of transaction-form submission flow.
