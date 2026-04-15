# US3 Manual Checklist - Tooltips, Copy, and Layout

## Objective
Validate recurrence field tooltips, accessibility bindings, forbidden copy removal, and grid alignment.

## Preconditions
- Open /transactions?view=new and /transactions?view=recurrences

## Checklist
- [ ] Recurrence type tooltip appears inline-right of its select
- [ ] Recurrence mode tooltip appears inline-right of its select
- [ ] recurrenceType select has aria-describedby including tooltip id
- [ ] recurrenceMode select has aria-describedby including tooltip id
- [ ] Forbidden phrase 1 is absent
- [ ] Forbidden phrase 2 is absent
- [ ] Forbidden phrase 3 is absent
- [ ] New transaction recurrence grid is vertically aligned with adjacent controls (desktop)
- [ ] New transaction recurrence grid is vertically aligned with adjacent controls (mobile)

## Evidence
- Date: 2026-04-14
- Browser: N/A (terminal validation)
- Notes:
	- `aria-describedby` com ids de tooltip verificado por busca em codigo para campos de tipo/modo.
	- Classes de alinhamento do grid (`transaction-recurrence-grid`/`transaction-recurrence-control`) aplicadas.
	- Frases proibidas verificadas como ausentes no escopo `components/` e `lib/`.
	- Validacao tecnica executada com `npm run lint` e `npm run build` (PASS).
	- Confirmacao visual/manual em navegador permanece recomendada para checklist humano final.
