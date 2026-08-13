# Research: Consistência visual do fluxo atual

## Decision 1: Reuse the existing dashboard header component

- **Decision**: Use the current `DashboardHeader` pattern as the visual reference for the Data screen header.
- **Rationale**: The app already has a consistent header layout with brand label, title and button cluster. Reusing it reduces layout drift and avoids a new header variant.
- **Alternatives considered**: Building a custom header just for `/data`, or copying styles into a local header block. Both increase duplication and risk visual inconsistency.

## Decision 2: Keep Data screen sections in the same component family

- **Decision**: Adjust the existing Data screen layout rather than splitting it into new containers or routes.
- **Rationale**: Import, export and model-download are already grouped in `app/data/page.tsx` and `components/data/*`. Reusing that surface keeps the change small and reversible.
- **Alternatives considered**: Moving sections to a new layout shell or page-specific wrapper. That would add complexity without user-facing value.

## Decision 3: Hide the transaction type column only in presentation layers

- **Decision**: Remove the visible `Tipo` column from the dashboard table and from all transaction tables/accordeons that reuse the same history model, while leaving the underlying data unchanged.
- **Rationale**: The requirement is visual consistency, not data model simplification. The same row data can still power actions, totals and filters.
- **Alternatives considered**: Removing the field from the model or replacing it with another visual indicator. That would change behavior beyond the requested scope.

## Decision 4: Reuse the money-mask behavior from the new transaction form

- **Decision**: Reuse the same money-mask helper/component behavior already used by the new transaction flow for the edit drawer field.
- **Rationale**: The spec explicitly requires identical format, validation and user interaction. Reuse avoids subtle divergences in typing, formatting or parsing.
- **Alternatives considered**: Keeping the current edit drawer parsing logic and matching output only. That would preserve the current inconsistency risk.

## Decision 5: Validation stays manual

- **Decision**: Validate the feature with manual scenarios documented in quickstart and feature notes.
- **Rationale**: The repository constitution explicitly rejects automated test suites. Manual validation is sufficient for a UI consistency change.
- **Alternatives considered**: Adding unit or snapshot tests. This conflicts with the project rules.