# Quickstart: Refine Transaction Form Inputs and Dashboard CTA Harmony

## Goal
Deliver a faster and more consistent transaction-creation UX by replacing type/category/value inputs with clearer controls and harmonizing dashboard CTA visuals.

## Implementation Steps
1. Replace transaction type select with Segmented Control containing Despesa and Receita.
2. Enforce exclusive selection and bind selected option to transaction type payload.
3. Apply selected-state visual tokens and smooth transition for Segmented Control:
   - Despesa: rgba(239, 68, 68, 0.2) background + light red text
   - Receita: rgba(34, 197, 94, 0.2) background + light green text
4. Replace free-text category with grouped select using preset categories by transaction type.
5. Populate grouped presets in alphabetical order:
   - Despesas: Casa, Carro, Comida, Educacao, Mercado, Outros, Recreacao, Roupa, Saude, Servicos, Taxas, Transferencias, Transporte
   - Receita: Bonus, Investimento, Outros, Presente, Salario, Vale
6. Add create-new category option in the same select flow.
7. Persist newly created category, auto-select it in current launch, and block duplicates by normalized comparison (trim + case-insensitive).
8. Apply BRL money mask in value input using continuous cents interpretation.
9. Ensure masked display remains consistent with persisted numeric payload.
10. Standardize equal horizontal and vertical padding for dashboard Transacoes and Nova Transacao buttons in all breakpoints.
11. Apply fixed secondary variant from design system to Transacoes button in the same visual family as the primary button.

## Manual Validation Scenarios
1. Type selection toggles only one active option and persists correct transaction type.
2. Segmented Control selected-state colors and text transition match expected visual behavior.
3. Category select shows grouped alphabetical presets per type.
4. Create-new category persists, becomes selected, cannot duplicate existing names by normalized rules, and blocks empty names with clear guidance.
5. Value input mask displays BRL with R$ prefix and continuous cents behavior (1234 -> R$ 12,34).
6. Empty amount blocks submit until a valid monetary value is informed.
7. Submitted value matches masked amount meaning.
8. Stress interaction remains stable: 30 consecutive digits and 20 type-toggle alternations without input loss or visual update delay greater than 1 second.
9. Dashboard Transacoes and Nova Transacao buttons have equal horizontal/vertical padding in mobile/tablet/desktop.
10. Transacoes button uses fixed secondary variant and remains visually distinct from primary CTA.

## Evidence Files (manual validation)
- manual-validation/refine-transaction-form/setup-baseline.md
- manual-validation/refine-transaction-form/us1-type-segmented-control.md
- manual-validation/refine-transaction-form/us2-category-select-and-create.md
- manual-validation/refine-transaction-form/us3-brl-mask.md
- manual-validation/refine-transaction-form/us4-dashboard-cta-harmony.md
- manual-validation/refine-transaction-form/regression-checklist.md
- manual-validation/refine-transaction-form/regression-summary.md
- manual-validation/refine-transaction-form/quickstart-signoff.md
