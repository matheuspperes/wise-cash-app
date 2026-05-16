# Manual Validation: US4 - Toggle de Recorrencia

## Objetivo
Validar textos e cores do toggle de recorrencia em ambos estados.

## Checklist
- [ ] Abrir formulario de nova transacao.
- [ ] Confirmar estado inicial "Desligado" com texto muted e fundo surface.
- [ ] Clicar para alternar para "Ligado".
- [ ] Confirmar texto verde (emerald-200) e fundo verde suave.
- [ ] Confirmar que campos de recorrencia aparecem quando ligado.
- [ ] Confirmar que campos de recorrencia desaparecem quando desligado.

## Evidencias
- Screenshot: toggle no estado "Desligado"
- Screenshot: toggle no estado "Ligado"

## Observacoes
- Classe aplicada: `recurrence-toggle-off` e `recurrence-toggle-on`
- Mudanca de label para "Ligado"/"Desligado" (nao "Recorrencia: Ativa/Desligada")
