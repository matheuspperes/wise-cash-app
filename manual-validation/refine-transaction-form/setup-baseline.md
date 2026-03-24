# Setup Baseline

## Scope
Feature 014 baseline notes captured before implementation changes.

## Pre-change observations
- Transaction type uses a select input with values Ganho/Gasto.
- Category is currently a free-text input bound to categoryId.
- Amount field accepts decimal text without BRL masking.
- Dashboard CTA buttons use different horizontal paddings (Transacoes px-3 vs Nova Transacao px-4).
- Dashboard CTA buttons already share h-10 but need harmonized horizontal and vertical padding tokens across breakpoints.

## Environment
- Date: 2026-03-23
- Workspace: wise-cash-app
- Branch: 014-refine-transaction-form
