# Data Model: CSV Import/Export de Transacoes

## Entity: CsvTemplateRow
- Description: Linha de CSV no modelo unico (import/export).
- Fields:
  - nome: string (required)
  - tipo: "Receita" | "Despesa" (required)
  - categoria: string (required)
  - valor: string (required, ponto decimal)
  - data: string (required, YYYY-MM-DD)
  - observacoes: string (optional)
  - recorrenciaAtiva: "Sim" | "Nao" (required)
  - diaRecorrencia: string (required if recorrenciaAtiva = Sim)
  - tipoRecorrencia: "Limitada" | "Ilimitada" (required if recorrenciaAtiva = Sim)
  - quantidadeMeses: string (required if tipoRecorrencia = Limitada)
  - modoRecorrencia: "Automatica" | "Manual" (required if tipoRecorrencia = Ilimitada)
- Validation Rules:
  - `valor` MUST be positivo e com ponto decimal.
  - `data` MUST follow YYYY-MM-DD.
  - `tipo` mapeia para `income`/`expense`.

## Entity: CsvImportLine
- Description: Linha importada apos normalizacao e parsing.
- Fields:
  - lineNumber: number
  - raw: CsvTemplateRow
  - normalized: {
      name: string;
      type: "income" | "expense";
      categoryName: string;
      amount: number;
      transactionDate: string;
      notes?: string;
      recurrence?: {
        enabled: boolean;
        dayOfMonth?: number;
        recurrenceType?: "limited" | "unlimited";
        maxCycles?: number;
        unlimitedMode?: "automatic" | "manual";
      };
    }
- Validation Rules:
  - Campos obrigatorios nao podem ser vazios.
  - Campo recorrencia so existe quando `enabled = true`.

## Entity: CsvImportError
- Description: Erro de validacao por linha.
- Fields:
  - lineNumber: number
  - field: string
  - message: string
  - value?: string

## Entity: CsvImportPreview
- Description: Resumo apresentado antes da confirmacao final.
- Fields:
  - totalLines: number
  - validLines: number
  - invalidLines: number
  - errors: CsvImportError[]
  - validRows: CsvImportLine[]

## Entity: CsvExportRow
- Description: Linha exportada no modelo unico.
- Fields:
  - nome, tipo, categoria, valor, data, observacoes
  - recorrenciaAtiva, diaRecorrencia, tipoRecorrencia, quantidadeMeses, modoRecorrencia
- Validation Rules:
  - Campos de recorrencia devem ficar vazios quando nao houver regra ativa.
  - `valor` exportado deve ser positivo e com ponto decimal.
  - `data` exportada em YYYY-MM-DD.

## Relationships
- CsvImportLine -> TransactionRecord (1:1 quando linha valida)
- CsvImportLine (recurrence enabled) -> RecurrenceRuleRecord (0..1)

## State Transitions
- CsvImportLine: raw -> normalized -> valid/invalid
- CsvImportPreview: draft -> confirmed (persiste transacoes)
