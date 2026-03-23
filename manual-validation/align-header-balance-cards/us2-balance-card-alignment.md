# US2 Validation - Balance Card Alignment

## Checklist
- [x] Net and historical cards use left-anchored title and value blocks.
- [x] Both cards apply the same internal horizontal offset (px-6) and vertical centering container.
- [x] Both cards use equivalent useful-content height via shared min-h-[7.25rem].
- [x] Loading indicator text remains inside the same aligned content block in each card.

## Evidence
- Verified both cards now share mirrored structure: article wrapper + content block + label row + value row.
- Verified historical card no longer uses right-aligned text mode.
- Verified value blocks use identical typography scale and word-wrapping guard.

## Status
- PASS
