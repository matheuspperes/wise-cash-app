# US2 Manual Checklist - Current Month Pendings

## Objective
Validate only local current month/year pending confirmations are shown and block is hidden when empty.

## Preconditions
- Create pending instances across current month and other months
- Open /transactions?view=recurrences

## Checklist
- [ ] Only pending items from local current month/year are rendered
- [ ] Pending items from other months/years are not rendered
- [ ] When no current-month pendings exist, pending block is not rendered
- [ ] No empty vertical gap remains where pending block would be
- [ ] Confirm/cancel actions still work as before

## Evidence
- Date: 2026-04-14
- Browser: N/A (terminal validation)
- Timezone: local-device dependent (rule implemented)
- Notes:
	- Filtro de pendencias por mes/ano local implementado em `recurrence-service` e aplicado no gateway local.
	- Regra de nao renderizar bloco vazio aplicada na pagina de recorrencias.
	- Validacao tecnica executada com `npm run lint` e `npm run build` (PASS).
	- Confirmacao visual/manual em navegador permanece recomendada para checklist humano final.
