# Quickstart - Navegacao e Gestao de Recorrencias

## 1. Objetivo
Validar manualmente a nova navegacao para recorrencias, a view dedicada com blocos `Pendências` e `Recorrências`, e os ajustes de tooltip no formulario de nova transacao.

## 2. Preparacao
1. Instalar dependencias do projeto (se necessario).
2. Rodar aplicacao local em modo desenvolvimento.
3. Garantir que existem dados de recorrencia para validar lista e pendencias.

## 3. Cenarios de validacao manual

### Cenario A - Botao Recorrencias no Dashboard
1. Abrir Dashboard.
2. Verificar novo botao `Recorrências` ao lado esquerdo de `Transações`.
3. Confirmar mesmo tamanho do botao `Transações` e novo estilo visual compartilhado.
4. Clicar no botao e validar URL final: `/transactions?view=recurrences`.

### Cenario B - Bloco Pendências
1. Na view de recorrencias, validar secao `Pendências` visivel.
2. Com pendencias existentes: confirmar render da lista e operacoes de `Confirmar`/`Cancelar`.
3. Sem pendencias: confirmar texto simples `Sem confirmações pendentes`.

### Cenario C - Bloco Recorrências
1. Validar secao `Recorrências` visivel.
2. Confirmar exibicao por item: nome, valor, proxima data, tipo, status e acoes.
3. Verificar status:
   - Limitada -> `1 mês faltante`, `N meses faltantes` ou `Sem ciclos restantes`.
   - Ilimitada -> `Ilimitada`.
4. Acionar `Editar` e confirmar abertura de drawer/modal com lista ainda visivel ao fundo.
5. Acionar `Excluir` e confirmar existencia de confirmacao explicita antes da remocao.

### Cenario D - Tooltips na Nova Transacao
1. Abrir `/transactions?view=new`.
2. Ativar recorrencia.
3. Verificar tooltip ao lado do rótulo `Recorrência` com texto: `Ative para repetir este lançamento mensalmente.`
4. Verificar os dois tooltips de recorrencia posicionados imediatamente a direita dos selects de tipo e modo.
5. Confirmar que a frase fixa nao aparece mais no corpo da secao.

## 4. Evidencias recomendadas
- Captura de tela do header com os botoes `Recorrências` e `Transações`.
- Captura da view `?view=recurrences` com ambos blocos.
- Captura da nova transacao com os tooltips reposicionados.
- Registro curto de resultado por cenario (Passou/Falhou + observacao).

## 5. Criterio de conclusao
A feature esta pronta quando todos os cenarios A-D passarem em validacao manual e sem regressao visual evidente nas views de transacoes.
