# Manual Validation: US2 - Destaque do Mes Atual

## Objetivo
Validar que o mes atual e destacado no historico completo com opcao sutil de cor.

## Checklist
- [ ] Abrir historico completo com o mes atual listado.
- [ ] Confirmar que o container do mes atual tem destaque sutil (fundo com acento a 10%).
- [ ] Abrir historico em mes anterior/proximo sem destaque visual indevido.

## Evidencias
- Screenshot: container do mes atual com fundo `color-mix(in srgb, var(--accent) 10%, transparent)`
- Screenshot: mes anterior/futuro sem destaque

## Observacoes
- Classe aplicada: `transaction-history-current-month`
- Deteccao baseada em `buildMonthRef()` comparando com mes atual do dispositivo
