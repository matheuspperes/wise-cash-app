# Regression Checklist

Date: 2026-03-23
Feature: 013-refine-dashboard-transactions-layout

## Functional invariants

- [x] Period selector updates query parameter payload via dashboard summary fetch and refreshes data.
- [x] Legend and selector stay readable with no overlap on mobile (<=767px), tablet (768-1023px), desktop (>=1024px).
- [x] Return action on transactions page always navigates to /.
- [x] Footer create CTA on transactions history always navigates to /transactions?view=new.
- [x] No duplicate top create CTA remains in /transactions history.
- [x] Affected create labels render as "Nova Transação".

## Route invariants

- [x] /transactions?view=history loads history mode.
- [x] /transactions?view=new loads create mode.
- [x] Return from /transactions via "Voltar ao Dashboard" opens /.

## Visual invariants

- [x] Desktop gap between dashboard balance cards is within 12-20px (target 16px).
- [x] Dashboard controls maintain legibility and spacing rhythm after selector relocation.
