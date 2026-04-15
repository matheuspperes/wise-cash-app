# US1 Manual Checklist - Edit/Delete Parity

## Objective
Confirm recurrence edit/delete interactions match history behavior and support amount editing.

## Preconditions
- Open /transactions?view=recurrences
- At least one recurrence available

## Checklist
- [ ] Edit action uses same visual language as history actions
- [ ] Selected recurrence is visually highlighted while editing
- [ ] Amount can be edited and saved
- [ ] Delete action uses confirm/cancel inline flow
- [ ] Delete confirm triggers mutation and refresh
- [ ] Delete cancel keeps data unchanged
- [ ] No storage errors in nominal flow

## Telemetry Assertions
- [ ] Confirm emits same delete-action semantics as history (scope/action pair)
- [ ] Cancel emits same delete-action semantics as history (scope/action pair)

## Evidence
- Date: 2026-04-14
- Browser: N/A (terminal validation)
- Notes:
	- Implementacao concluida com paridade visual de acoes (icones/confirm-cancel inline) e destaque de item em edicao.
	- Persistencia de valor de recorrencia integrada via gateway/service edit pipeline.
	- Validacao tecnica executada com `npm run lint` e `npm run build` (PASS).
	- Validacao manual visual em navegador permanece recomendada para fechamento humano final.
