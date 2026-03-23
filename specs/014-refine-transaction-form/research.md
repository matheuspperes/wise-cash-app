# Research: Refine Transaction Form Inputs and Dashboard CTA Harmony

## Decision 1: Use Segmented Control for transaction type selection
- Decision: Replace the type select with a two-option Segmented Control showing Despesa and Receita as exclusive options.
- Rationale: Improves immediate comprehension and reduces interaction cost versus dropdown selection.
- Alternatives considered:
  - Keep select input (rejected: slower and less explicit for two fixed choices).
  - Use radio list without segmented styling (rejected: lower visual affordance for quick toggle).

## Decision 2: Apply explicit visual tokens for segmented options with smooth transitions
- Decision: Use subtle translucent backgrounds and readable text contrast with smooth color transition for selected state.
- Rationale: Meets the requested visual direction while preserving hierarchy and readability.
- Alternatives considered:
  - Strong saturated background fills (rejected: visually heavy and risks competing with primary CTA areas).
  - No transition between states (rejected: abrupt feedback and lower perceived polish).

Selected visual behavior:
- Despesa selected state:
  - background: rgba(239, 68, 68, 0.2)
  - text color: light red token compatible with current palette
- Receita selected state:
  - background: rgba(34, 197, 94, 0.2)
  - text color: light green token compatible with current palette
- transition: smooth background-color and color transition on selection changes.

## Decision 3: Replace free-text category input with grouped preset select plus create-new flow
- Decision: Use category select grouped by transaction type and include explicit create-new option that persists a new category and auto-selects it in the current launch.
- Rationale: Improves consistency of categorization while preserving flexibility.
- Alternatives considered:
  - Keep free-text category only (rejected: causes category drift and duplicates).
  - Separate category-management page only (rejected: high friction in launch flow).

## Decision 4: Enforce normalized duplicate-category blocking
- Decision: Block creation when category name matches an existing category under normalized comparison (trim + case-insensitive).
- Rationale: Prevents data fragmentation and protects category quality.
- Alternatives considered:
  - Allow near-duplicate variants (rejected: inconsistent analytics and filtering).
  - Silent auto-merge without feedback (rejected: non-transparent user experience).

## Decision 5: Define canonical preset categories per type in alphabetical order
- Decision: Seed select options grouped by transaction type with alphabetic ordering inside each group.
- Rationale: Faster scan and predictable discoverability.
- Alternatives considered:
  - Frequency-based order (rejected: less predictable and can drift over time).
  - Single ungrouped list (rejected: increases cognitive load and selection errors).

Canonical presets:
- Despesas (alphabetical): Casa, Carro, Comida, Educacao, Mercado, Outros, Recreacao, Roupa, Saude, Servicos, Taxas, Transferencias, Transporte.
- Receita (alphabetical): Bonus, Investimento, Outros, Presente, Salario, Vale.

## Decision 6: Harmonize dashboard action buttons with shared padding and secondary variant rule
- Decision: Keep both dashboard buttons with identical horizontal/vertical padding in all supported breakpoints and style Transacoes as fixed secondary variant in the same visual family as the primary button.
- Rationale: Delivers visual consistency without flattening CTA hierarchy.
- Alternatives considered:
  - Match by height only (rejected: can hide unequal padding and create subtle imbalance).
  - Keep current secondary style unchanged (rejected: does not satisfy requested similarity).
