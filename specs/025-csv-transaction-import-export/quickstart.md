# Quickstart: CSV Import/Export (Manual Validation)

## Objetivo
Validar manualmente importacao, exportacao e consistencia do modelo unico de CSV.

## Pre-requisitos
- `npm install`
- `npm run dev`

## Cenarios de Validacao

### Scenario 1: Baixar modelo CSV
1. Acessar a tela de dados pelo CTA unico da dashboard.
2. Clicar em "Baixar modelo".
3. Verificar que o arquivo possui 11 colunas com cabecalhos em portugues e ordem correta.

Evidencia: salvar screenshot do arquivo aberto.

### Scenario 2: Importar CSV valido sem recorrencia
1. Preencher 2 linhas validas no modelo com Recorrencia Ativa = "Nao".
2. Enviar o arquivo na tela de dados.
3. Confirmar o resumo com 2 linhas validas e 0 erros.
4. Confirmar importacao e verificar transacoes criadas no historico.

Evidencia: screenshot do resumo e da listagem de transacoes.

### Scenario 3: Importar CSV com erros de validacao
1. Criar arquivo com 1 linha valida e 2 invalidas (data invalida e valor com virgula).
2. Enviar o arquivo.
3. Confirmar que o preview bloqueia a confirmacao e mostra erros por linha.

Evidencia: screenshot da lista de erros.

### Scenario 4: Importar recorrencia limitada e ilimitada
1. Criar 1 linha com Recorrencia Ativa = "Sim" e Tipo = "Limitada" com Quantidade de Meses valida.
2. Criar 1 linha com Recorrencia Ativa = "Sim" e Tipo = "Ilimitada" com Modo = "Automatica".
3. Enviar e confirmar importacao.
4. Verificar que regras aparecem na tela de recorrencias.

Evidencia: screenshot da lista de recorrencias.

### Scenario 5: Exportar e reimportar
1. Exportar CSV (todas as transacoes).
2. Reimportar o arquivo exportado.
3. Confirmar que o parser aceita o arquivo sem ajuste estrutural.

Evidencia: screenshot do preview sem erros.

### Scenario 6: Performance com 1000 linhas
1. Gerar um CSV com 1000 linhas validas seguindo o modelo.
2. Importar o arquivo e medir o tempo ate o preview ficar disponivel.
3. Confirmar que o tempo total ate o preview e <= 60 segundos.

Evidencia: anotar tempo observado e anexar screenshot do preview com contagem de linhas.

## Registro de Evidencias
Salvar evidencias em `manual-validation/csv-transaction-import-export/` com arquivos:
- `scenario-1-model-download.md`
- `scenario-2-valid-import.md`
- `scenario-3-invalid-rows.md`
- `scenario-4-recurrence-import.md`
- `scenario-5-export-reimport.md`
- `scenario-6-performance-1000-lines.md`
