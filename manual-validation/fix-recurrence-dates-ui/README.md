# Manual Validation: Corrigir Datas de Recorrencia e Ajustes de UI

## Objetivo
Registrar evidencias manuais para a feature 024 de datas civis de recorrencia e ajustes de UI.

## Estrutura de Validacao
- **us1-civil-date.md**: Validacao de data civil sem deslocamento por timezone
- **us2-current-month-highlight.md**: Validacao de destaque visual do mes atual
- **us3-dashboard-order.md**: Validacao de ordem dos botoes fixos
- **us4-toggle-states.md**: Validacao de estados visuais do toggle
- **quickstart-signoff.md**: Resumo final e consolidacao de evidencias

## Fluxo de Validacao
1. Executar cada cenario em `quickstart-signoff.md`
2. Preencher checklists em cada arquivo us*.md
3. Capturar evidencias (screenshots, console logs)
4. Consolidar resultado final em quickstart-signoff.md
5. Marcar como PASS se todos os cenarios funcionarem

## Notas
- Validar com timezone local diferente de UTC
- Documentar qualquer comportamento inesperado
- Registrar versao do navegador e SO
