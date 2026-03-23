# Research: Refine Balance Card and CTA Layout

## Decision 1: Use a single Transacoes access point in dashboard controls
- Decision: Remove Transacoes from the current dashboard navigation and keep it only in the top control cluster beside period filter and Nova Transacao.
- Rationale: Eliminates duplicate actions, clarifies hierarchy, and reduces cognitive noise in the header area.
- Alternatives considered:
  - Keep both access points (rejected: duplicates intent and weakens CTA hierarchy).
  - Keep only old nav location (rejected: conflicts with requested clustered actions design).

## Decision 2: Define responsive 20% reduction rule for historical balance card
- Decision: Apply approximately 20% reduction to text scale and useful horizontal occupancy in desktop/tablet; in mobile, use proportional reduction focused on readability and alignment stability.
- Rationale: Preserves the requested visual compactness where space exists while avoiding cramped mobile layouts.
- Alternatives considered:
  - Enforce exact 20% in all breakpoints (rejected: may cause readability and spacing regressions on small widths).
  - Reduce only typography (rejected: does not fully satisfy requested horizontal compactness).

## Decision 3: Make Transacoes subtly more prominent without resizing
- Decision: Increase perceived prominence of Transacoes using subtle background/contrast adjustment only, keeping button dimensions unchanged.
- Rationale: Delivers "slightly more noticeable" outcome while preserving primary CTA role for Nova Transacao.
- Alternatives considered:
  - Increase button size and weight (rejected: competes with primary CTA and changes cluster balance).
  - Hover-only emphasis (rejected: does not improve resting-state discoverability enough).

## Decision 4: Replace '+' with textual Nova Transacao CTA in dashboard
- Decision: Use a text CTA "Nova Transacao" in the dashboard control cluster, with proportional spacing adjustments and unchanged destination behavior.
- Rationale: Improves immediate comprehension of action intent without introducing route changes.
- Alternatives considered:
  - Keep icon-only '+' (rejected: lower clarity compared to explicit action label).
  - Icon + text hybrid with heavy styling (rejected: may over-emphasize and crowd cluster).

## Decision 5: Reuse same style-base for history-page Nova transacao button
- Decision: Use the same base component/variant style as "Ver historico de transacoes" in transactions new view, allowing only responsive width/size adjustments.
- Rationale: Guarantees cross-flow visual consistency and lower maintenance.
- Alternatives considered:
  - Approximate visual style with separate classes (rejected: drifts over time and weakens consistency).
  - Clone styling into a new dedicated button variant (rejected: unnecessary abstraction for a local refinement).
