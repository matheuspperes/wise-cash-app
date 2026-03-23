# Setup Baseline

Date: 2026-03-23
Feature: 013-refine-dashboard-transactions-layout

## Pre-change observations

- Dashboard period selector appeared in top header controls.
- Chart legend and period selector were not grouped in the same chart control row.
- Dashboard balance cards had asymmetric visual composition due to narrow historical card profile.
- Dashboard create CTA label had unaccented variant in at least one affected surface.
- Transactions history view exposed create CTA at top area instead of page end.
- Transactions page lacked explicit return button next to title with deterministic route.

## Baseline routes checked

- Dashboard: /
- Transactions history: /transactions?view=history
- Transactions create: /transactions?view=new

## Environment

- App runs on Next.js 15 + React 18 + TypeScript 5.8.
- Manual validation only (constitution: no automated tests).
