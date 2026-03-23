# US2 Historical Card Evidence

## Status
- PASS

## Steps
1. Open dashboard on desktop viewport.
2. Confirm right-side placement and reduced emphasis of historical card.
3. Open dashboard on mobile viewport.
4. Confirm full-width stacked behavior.

## Observations
- Desktop grid updated to md:grid-cols-[1fr_0.56fr], reducing historical card prominence close to requested target band.
- Historical card keeps right-side placement and lower typography emphasis than primary net balance card.
- Mobile remains stacked with full-width cards.
- Validation method: layout class inspection in dashboard and historical card components.