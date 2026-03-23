# Research: Align Header and Balance Cards

## Decision 1: Use explicit responsive header modes per breakpoint
- Decision: Keep title and controls in a single row for desktop/tablet, and use controlled two-row layout on mobile with right-aligned controls.
- Rationale: Preserves requested hierarchy while preventing overlap and cramped controls in narrow widths.
- Alternatives considered:
  - Force one-row layout on all breakpoints (rejected: high risk of clipping/overlap on mobile).
  - Always stack on all breakpoints (rejected: weakens desktop information density and requested horizontal hierarchy).

## Decision 2: Define objective card alignment rule instead of subjective visual tuning
- Decision: Balance-card main content blocks (title + value) must share same useful height and same left internal offset.
- Rationale: Provides deterministic acceptance criteria and avoids repeated visual-only iterations.
- Alternatives considered:
  - Visual-only equivalence with no metric (rejected: ambiguous review outcomes).
  - Align only value text (rejected: can leave title/subtext visually detached).

## Decision 3: Apply left anchoring to both balance cards
- Decision: Enforce left-anchored labels/values in both net and historical cards.
- Rationale: Keeps comparison symmetric and eliminates asymmetric card reading patterns.
- Alternatives considered:
  - Left-align only one card (rejected: inconsistent rhythm between key KPIs).

## Decision 4: Preserve existing functional behavior while changing layout
- Decision: Restrict scope to structural/CSS-class adjustments and keep period-selector/query behavior and add-action navigation untouched.
- Rationale: Feature is visual; behavior regressions would add unrelated risk.
- Alternatives considered:
  - Refactor control logic with layout pass (rejected: unnecessary coupling and complexity).

## Decision 5: Keep implementation localized to dashboard composition layer
- Decision: Prioritize edits in dashboard page composition and two balance card components, with minimal supporting text token updates.
- Rationale: Achieves requested UX with smallest safe change set.
- Alternatives considered:
  - Introduce new shared layout abstraction (rejected: overengineering for one dashboard surface).
