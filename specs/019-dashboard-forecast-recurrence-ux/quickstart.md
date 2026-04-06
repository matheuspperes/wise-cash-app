# Quickstart: Dashboard Forecast e UX de Recorrencia

## Goal
Validar e entregar o refinamento de layout dos tooltips de recorrencia para que cada gatilho permaneça ao lado direito do respectivo select, com trigger compacto se necessario, sem quebrar a simetria do formulario.

## Preconditions
- A aplicacao inicia localmente.
- O formulario de transacao carrega a secao de recorrencia.
- Os tooltips de `Tipo de recorrencia` e `Modo da recorrencia` estao disponiveis no formulario.

## Incremental Implementation Strategy
1. Reutilizar o wrapper de label + select + tooltip na secao de recorrencia.
2. Manter o tooltip ao lado direito do select correspondente.
3. Aplicar trigger compacto se houver risco de quebra de linha.
4. Ajustar a largura visual do select apenas o necessario para preservar espacamento.
5. Garantir que `Tipo de recorrencia` e `Modo da recorrencia` usem o mesmo padrao de alinhamento.
6. Preservar click/tap, outside click e ESC sem alterar o fluxo do formulario.
7. Validar o resultado em desktop e mobile.

## Risk and Mitigation
- Risco: o tooltip cair para uma segunda linha em telas estreitas.
  - Mitigacao: usar trigger compacto e revisar o wrapper horizontal em mobile.
- Risco: o select perder largura util demais.
  - Mitigacao: reduzir apenas o necessario e testar legibilidade do valor selecionado.
- Risco: desalinhamento entre Tipo e Modo.
  - Mitigacao: aplicar o mesmo layout nos dois campos e validar comparativamente.
- Risco: regressao de interacao do tooltip.
  - Mitigacao: confirmar abertura/fechamento por click/tap, outside click e ESC.

## Manual Validation Script
1. Formulario - alinhamento em linha:
   - Abrir o formulario de transacao.
   - Ativar recorrencia e localizar `Tipo de recorrencia`.
  - Confirmar que o trigger do tooltip fica ao lado direito do select.
   - Repetir para `Modo da recorrencia`.
2. Formulario - largura e simetria:
   - Confirmar que os selects mantem largura util suficiente para leitura.
   - Confirmar que o tooltip nao cria nova linha nem quebra o alinhamento.
   - Comparar visualmente os dois blocos e verificar simetria.
3. Formulario - interacao:
   - Abrir cada tooltip por click/tap.
   - Fechar por outside click e por ESC.
   - Confirmar que os valores preenchidos permanecem intactos.
4. Regressao desktop/mobile:
   - Repetir os cenarios em desktop e mobile.
  - Confirmar que a posicao do tooltip permanece estável em larguras estreitas.

## Evidence Files
- `manual-validation/dashboard-forecast-recurrence-ux/validation-runbook.md` (reuso para execucao consolidada)
- `manual-validation/dashboard-forecast-recurrence-ux/quickstart-signoff.md` (consolidacao de resultados)

## Execucao Atual (2026-04-06)
- Escopo revisado para layout de linha unica do tooltip.
- Tooltip continua acessivel por click/tap, outside click e ESC.
- Validacoes manuais permanecem pendentes para fechamento completo da mudanca.
