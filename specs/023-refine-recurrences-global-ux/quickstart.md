# Quickstart - Refinar UX de Recorrencias e Header Global

## 1. Objetivo
Validar manualmente: bloco de pendencias somente em Recorrencias (mes/ano atual), padronizacao do cabecalho em telas de UI, remocao de botoes finais, alinhamento do grid Despesa/Receita, tooltips de recorrencia inline-right com acessibilidade e correcao do bug de data.

## 2. Preparacao
1. Instalar dependencias e iniciar app local.
2. Garantir dados de recorrencia com pendencias em meses diferentes.
3. Garantir um caso de criacao/edicao com dia de recorrencia 17.
4. Definir timezone local do dispositivo para validacao.

## 3. Cenarios de validacao manual

### Cenario A - Bloco de pendencias na tela Recorrencias
1. Abrir tela Recorrencias.
2. Verificar que o bloco de pendencias aparece apenas nessa tela.
3. Verificar que somente itens do mes/ano atual local sao listados.
4. Se nao houver itens elegiveis, confirmar que o bloco nao renderiza e nao deixa espaco vazio.

### Cenario B - Confirmar/cancelar sem regressao
1. Executar confirmar e cancelar em pendencias elegiveis.
2. Validar que comportamento funcional permanece igual ao fluxo atual.

### Cenario C - Cabecalho global em telas de UI
1. Navegar por dashboard e views de transacoes/recorrencias.
2. Confirmar presenca de `Recorrencias`, `Transacoes`, `Nova Transacao` no cabecalho.
3. Confirmar `Voltar ao Dashboard` apenas fora da dashboard.
4. Confirmar ausencia de botoes duplicados no fim das paginas.

### Cenario D - Grid Despesa/Receita
1. Abrir formulario Nova transacao.
2. Confirmar remocao de `p-1` no grid Despesa/Receita.
3. Confirmar alinhamento visual com demais inputs.

### Cenario E - Tooltips dos selects de recorrencia
1. Abrir campos Tipo de recorrencia e Modo de recorrencia.
2. Confirmar tooltip na mesma div do select, imediatamente a direita.
3. Confirmar ausencia de salto vertical perceptivel.
4. Inspecionar `id` e `aria-describedby` e validar associacao em leitor de tela.

### Cenario F - Bug de data (dia 17)
1. Criar recorrencia com dia 17.
2. Editar recorrencia mantendo dia 17.
3. Validar no registro persistido que o dia continua 17.
4. Repetir em timezone local configurado (nao UTC) para confirmar ausencia de deslocamento -1 dia.

## 4. Evidencias recomendadas
- Capturas de Recorrencias com/sem bloco de pendencias.
- Capturas de cabecalho em dashboard e outras telas de UI.
- Captura do formulario sem `p-1` no grid.
- Capturas do posicionamento de tooltip + inspecao de `aria-describedby`.
- Evidencia do registro persistido dia 17 -> 17 (criacao e edicao).

## 5. Criterio de conclusao
Feature aprovada quando cenarios A-F passam sem regressao funcional/visual e com preservacao de dia na persistencia de recorrencia.

## 6. Execution Notes (2026-04-15)
- Status atual: Implementacao concluida no codigo, validacao manual ainda pendente.
- Evidencias preparadas em `manual-validation/refine-recurrences-global-ux/`.
- Proximo passo: executar os cenarios A-F em navegador e registrar resultado final de pass/fail no signoff.
