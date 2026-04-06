# Contract: Dashboard Forecast e UX de Recorrencia

## Scope
Define contratos de comportamento para:
- toggle Historico/Previsoes e calculo de janela temporal,
- separacao entre card principal fixo e card secundario dinamico,
- tooltips de recorrencia,
- controle de ativacao de recorrencia.

## Contract 1: Dashboard Mode Toggle
- Dashboard MUST exibir toggle com opcoes `Historico` e `Previsoes` ao lado esquerdo do seletor de tempo.
- Estado default MUST ser `Historico`.
- Alternar modo MUST preservar quantidade de meses selecionada.

## Contract 2: Temporal Window Rules
- `Historico` MUST mostrar ultimos N meses, com mes atual no ultimo ponto do grafico.
- `Previsoes` MUST mostrar proximos N meses, com mes atual no primeiro ponto do grafico.
- `Previsoes` MUST usar apenas lancamentos previstos no dominio, sem heuristica adicional.

## Contract 3: Primary And Secondary Balance Cards
- Card principal MUST manter rótulo `Saldo liquido atual` sem alteracao por modo.
- Card secundario MUST alternar rótulo e valor conforme modo ativo:
  - Em `Historico`, rótulo `Saldo liquido historico`.
  - Em `Previsoes`, rótulo `Saldo liquido previsto`.
- Troca de modo MUST refletir card secundario correto no mesmo ciclo de atualizacao da interface.

## Contract 4: Recurrence Tooltips
- Campo `Tipo de recorrencia` MUST exibir tooltip com duas linhas:
  - `Limitada: recorrencia encerrada apos a quantidade de meses definida`
  - `Ilimitada: recorrencia encerrada apenas manualmente`
- Campo `Modo da recorrencia` MUST exibir tooltip com duas linhas:
  - `Automatica: recorrencia confirmada automaticamente a cada ciclo mensal`
  - `Manual: recorrencia que exige confirmacao antes de registrar`
- Ambos os tooltips MUST compartilhar estilo visual consistente.
- Tooltips MUST abrir por click/tap e fechar por click fora ou ESC.
- O gatilho de tooltip MUST ficar a direita da linha de label do select com icone menor.
- Os selects de `Tipo de recorrencia` e `Modo da recorrencia` MUST usar largura visual reduzida e consistente entre os campos.
- O ajuste de largura MUST preservar legibilidade do valor selecionado em desktop e mobile.

## Contract 5: Recurrence Activation Control
- Secao de recorrencia MUST destacar controle de ativacao com rótulo claro `Recorrencia`.
- Controle MUST indicar visualmente estado ligado/desligado.
- Desativar recorrencia MUST recolher campos recorrentes e manter fluxo sem recorrencia sem regressao.

## Contract 6: Accessibility and Interaction
- Toggle e tooltips MUST ser operaveis por teclado.
- Tooltips MUST manter legibilidade em viewport mobile e desktop.
- Abrir/fechar tooltip MUST NOT limpar dados preenchidos no formulario.
- Reposicionamento de tooltip MUST NOT reduzir area clicavel do select.

## File Impact Map
- `components/dashboard/dashboard-page-client.tsx`: estado do modo, integracao com seletor de tempo e derivacao do card secundario.
- `components/dashboard/dashboard-header.tsx` (ou componente equivalente de controles): posicao visual do toggle ao lado do seletor.
- `components/dashboard/net-balance-card.tsx`: manter card principal como saldo atual.
- `components/dashboard/historical-total-balance-card.tsx`: receber derivacao dinamica de nome/valor por modo.
- `components/dashboard/chart*` (componentes de grafico): aplicacao da janela temporal por modo.
- `components/transactions/transaction-form.tsx`: reposicionamento dos gatilhos de tooltip sem desalinhamento dos selects.
- `components/ui/simple-tooltip.tsx`: suporte a tamanho compacto de trigger e ancoragem consistente.
- `lib/ui/*` e `lib/services/*` relacionados a resumo/historico: derivacao do segundo saldo e textos corrigidos.
