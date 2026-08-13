# Data Model: Consistência visual do fluxo atual

## Entity 1: Transaction Presentation Row

- **Purpose**: Represent a transaction as shown in dashboard tables, history accordions and edit-related listings.
- **Relevant fields**: date, description, category, type, amount, notes, actions.
- **Presentation rules**:
  - `type` remains available to the row logic and actions.
  - `type` is hidden from the table UI wherever the same model is reused.
  - Removing the visible column must not affect sorting, filtering or row-level actions.

## Entity 2: Data Screen Section Card

- **Purpose**: Represent the visible blocks on the Data screen.
- **Relevant fields**: title, description, content area, action button(s), layout width behavior.
- **Presentation rules**:
  - Import and export cards must occupy balanced visual space on desktop.
  - On mobile, the cards stack vertically with full width.
  - The CSV model download block remains separated from the operational cards.

## Entity 3: Money Input Presentation

- **Purpose**: Represent the value field used in new transaction creation and transaction editing.
- **Relevant fields**: display value, parsed numeric amount, input mode, validation state.
- **Presentation rules**:
  - Editing must reuse the same money-mask component/behavior as creation.
  - The display format and validation expectations must remain consistent across both flows.

## Relationships

- Transaction Presentation Row feeds dashboard summary tables and monthly history accordions.
- Data Screen Section Card groups the import, export and model-download actions on `/data`.
- Money Input Presentation is shared between creation and editing flows.

## State / Transition Notes

- No business-state transitions are introduced by this feature.
- Existing data continues to flow through the same creation, edit and listing states.
- The feature only changes how some existing values are presented.