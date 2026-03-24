# Contract: Transaction Form Inputs and Dashboard CTA Harmony

## Scope
Define interaction and visual contracts for:
- Segmented Control transaction type selector
- category grouped select with create-new behavior
- BRL currency input mask
- dashboard CTA padding parity and secondary visual variant

## Contract 1: Transaction Type Segmented Control
- Surface: new transaction form type selector
- Required Behavior:
  - exactly two options: Despesa and Receita
  - selection is exclusive
  - selected state has smooth background-color and text-color transition
  - selected visual profile:
    - Despesa: rgba(239, 68, 68, 0.2) + light red text
    - Receita: rgba(34, 197, 94, 0.2) + light green text
  - persisted type matches selected option
- Rule: segmented interaction must replace prior dropdown behavior without ambiguity.

## Contract 2: Category Grouped Select and Create-New
- Surface: new transaction form category field
- Required Behavior:
  - grouped presets by transaction type in alphabetical order
  - include explicit create-new category option
  - when create-new is used, category is persisted and auto-selected for current launch
  - duplicate category creation blocked by trim + case-insensitive comparison
- Rule: category quality and discoverability must improve while preserving flexibility.

## Contract 3: BRL Value Mask
- Surface: new transaction form value input
- Required Behavior:
  - display format uses BRL with R$ prefix
  - interpretation is continuous cents input (1234 -> R$ 12,34)
  - editing/deleting maintains stable mask behavior
  - persisted numeric amount equals displayed value meaning
- Rule: display and persistence must remain consistent for all valid edit paths.

## Contract 4: Dashboard CTA Harmony
- Surface: dashboard actions Transacoes and Nova Transacao
- Required Behavior:
  - equal horizontal and vertical padding values across mobile/tablet/desktop
  - Transacoes uses fixed secondary variant in same visual family as primary button
  - action hierarchy remains clear (secondary vs primary distinction preserved)
- Rule: harmonize visuals without collapsing CTA hierarchy.

## Acceptance Mapping
- FR-001, FR-002, FR-003 -> Contract 1
- FR-004, FR-005, FR-006, FR-011, FR-012 -> Contract 2
- FR-007, FR-008, FR-013 -> Contract 3
- FR-009, FR-010 -> Contract 4

## Success Criteria Mapping
- SC-001 -> Contract 1 + manual-validation/refine-transaction-form/us1-type-segmented-control.md
- SC-002 -> Contract 2 + manual-validation/refine-transaction-form/us2-category-select-and-create.md
- SC-003, SC-008 -> Contract 3 + manual-validation/refine-transaction-form/us3-brl-mask.md
- SC-004 -> Contract 4 + manual-validation/refine-transaction-form/us4-dashboard-cta-harmony.md
- SC-005 -> Contract 4 + manual-validation/refine-transaction-form/us4-dashboard-cta-harmony.md
- SC-006 -> Contract 2 + manual-validation/refine-transaction-form/us2-category-select-and-create.md
- SC-007 -> Contract 2 + manual-validation/refine-transaction-form/us2-category-select-and-create.md
