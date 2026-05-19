# Contract: CSV Import/Export (Modelo Unico)

## Scope
Define o contrato de colunas, normalizacao e validacao do CSV, alem da interface de importacao/exportacao client-side.

## Contract 1: CSV Header and Order
Header unico (ordem fixa):
1. Nome
2. Tipo
3. Categoria
4. Valor
5. Data
6. Observacoes
7. Recorrencia Ativa
8. Dia da Recorrencia
9. Tipo da Recorrencia
10. Quantidade de Meses
11. Modo da Recorrencia

Rules:
- CSV MUST incluir exatamente os 11 cabecalhos acima, na mesma ordem.
- Campos podem estar vazios apenas quando opcional pela regra de recorrencia.

## Contract 2: Value Mapping
- Tipo:
  - "Receita" -> `income`
  - "Despesa" -> `expense`
- Recorrencia Ativa:
  - "Sim" -> true
  - "Nao" -> false
- Tipo da Recorrencia:
  - "Limitada" -> `limited`
  - "Ilimitada" -> `unlimited`
- Modo da Recorrencia:
  - "Automatica" -> `automatic`
  - "Manual" -> `manual`

Rules:
- Comparacoes devem ignorar caixa e espacos extras nos valores controlados.
- Valores nao reconhecidos devem gerar erro de validacao na linha.

## Contract 3: Numeric and Date Validation
- Valor MUST ser numero positivo com ponto decimal (ex.: 129.90).
- Data MUST seguir YYYY-MM-DD.
- Dia da Recorrencia MUST ser inteiro 1..31 quando Recorrencia Ativa = Sim.

## Contract 4: Recurrence Dependency Rules
- Se Recorrencia Ativa = "Nao", os campos 8-11 devem ser ignorados.
- Se Recorrencia Ativa = "Sim":
  - Dia da Recorrencia e Tipo da Recorrencia sao obrigatorios.
  - Se Tipo da Recorrencia = "Limitada": Quantidade de Meses e obrigatoria (inteiro > 0).
  - Se Tipo da Recorrencia = "Ilimitada": Modo da Recorrencia e obrigatorio.

## Contract 5: Category Validation
- Categoria MUST existir no conjunto conhecido (presets + nomes presentes nas transacoes locais).
- Categoria nao reconhecida MUST exigir mapeamento pelo usuario para uma categoria existente ou criacao confirmada antes da importacao; sem confirmacao, a linha permanece invalida.

## Contract 6: Import Preview
Parser MUST retornar um preview antes da persistencia:
- totalLines
- validLines
- invalidLines
- errors[] com { lineNumber, field, message, value? }
- validRows[] prontos para persistir

## Contract 7: Export Rules
- Exportacao MUST gerar o mesmo header do modelo.
- Campos de recorrencia devem ser preenchidos quando a transacao tiver `recurrenceRuleId` ativo.
- Quando nao houver recorrencia, campos 7-11 ficam vazios.
- Valor exportado deve ser positivo; sinal definido por Tipo.

## Contract 8: Client-side Service Interface

### `parseCsvTemplate(text: string) -> CsvImportPreview`
Rules:
- Lidas line breaks `\n` e `\r\n`.
- Suporta campos entre aspas com escape de aspas (`""`).

### `confirmCsvImport(preview: CsvImportPreview) -> { created: number; skipped: number }`
Rules:
- MUST persistir apenas `validRows`.
- MUST criar transacao e regra de recorrencia quando aplicavel.
- MUST disparar refresh da dashboard/listagem apos concluir.

### `exportCsvTemplate(params?: { from?: string; to?: string }) -> string`
Rules:
- Gera CSV no mesmo modelo.
- Filtro por periodo e opcional; se ausente, exporta tudo.

## Acceptance Mapping
- FR-001..FR-004 -> Contracts 1, 6, 8
- FR-005..FR-011 -> Contracts 2, 3, 4, 5
- FR-012..FR-013 -> Contracts 7, 8
- FR-014 -> UI/Navigation design (plan tasks)
