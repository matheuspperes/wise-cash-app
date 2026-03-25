# US1 Manual Validation: Transactions Header

## Checklist
- [x] `/transactions` renders shared header container.
- [x] `/transactions?view=history` renders same header pattern.
- [x] `/transactions?view=new` renders same header pattern.
- [x] Header title is `Transações` in all variants.
- [x] Only one header control exists: `Voltar ao Dashboard`.
- [x] Back control navigates to `/`.

## Evidence Notes
- Verified header component replaced local transactions top row.
- Verified navigation target remains dashboard root route.
