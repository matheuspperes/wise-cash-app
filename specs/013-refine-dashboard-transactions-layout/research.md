# Research: Refine Dashboard and Transactions Navigation Layout

## Decision 1: Keep period selector on same row as chart legend across breakpoints
- Decision: Position the period selector beside the chart legend and, on narrow widths, keep both in the same row by reducing selector width to minimum readable size.
- Rationale: Matches clarified UX intent, keeps temporal control near chart context, and avoids control displacement that harms scan flow.
- Alternatives considered:
  - Wrap selector below legend (rejected: violates clarified requirement to stay on the same row).
  - Move selector above legend (rejected: reduces proximity to legend context).

## Decision 2: Use explicit desktop spacing target for balance cards
- Decision: Set desktop gap between current and historical balance cards to standard dashboard block spacing (16px with +/-4px tolerance).
- Rationale: Creates measurable acceptance criteria and aligns with existing spacing rhythm.
- Alternatives considered:
  - Relative reduction only (rejected: hard to validate consistently).
  - Pure visual judgment (rejected: subjective and non-repeatable).

## Decision 3: Normalize CTA text and route behavior without changing flow logic
- Decision: Replace affected labels so the rendered UI copy uses "Nova Transação", while preserving flow routes: footer create CTA -> /transactions?view=new, header return CTA -> /.
- Rationale: Improves language consistency while preserving known user journey and minimizing regression risk.
- Alternatives considered:
  - Introduce modal create flow (rejected: unnecessary behavior change).
  - Return to last visited route (rejected: non-deterministic behavior).

## Decision 4: Consolidate transactions-page actions by role
- Decision: Remove top "Nova Transação" CTA on /transactions and keep only a simple return-to-dashboard button next to title; place create CTA at page end.
- Rationale: Reduces header clutter and follows clarified action hierarchy.
- Alternatives considered:
  - Keep top and bottom create CTAs (rejected: duplicate action surface).
  - Desktop-only top CTA (rejected: inconsistent cross-device behavior).

## Decision 5: Preserve existing data-fetch behavior and avoid structural rewrites
- Decision: Implement via localized layout/class updates in existing dashboard and transactions components; no API/schema/state model changes.
- Rationale: Satisfies constitution simplicity principle and keeps delivery risk low.
- Alternatives considered:
  - New abstraction layer for layout profiles (rejected: speculative overengineering).
  - Shared global CTA orchestration component (rejected: unnecessary for feature scope).
