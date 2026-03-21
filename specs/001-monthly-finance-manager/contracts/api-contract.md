# API Contract - Monthly Finance Manager (V1)

Base path: /api
Content-Type: application/json
Locale de resposta textual de UI: pt-BR

## 1) List Transactions
- Method: GET
- Path: /api/transactions
- Query params:
  - from (date, optional)
  - to (date, optional)
  - type (income|expense, optional)
  - categoryId (uuid, optional)
  - q (string, optional; busca em transaction.name, category.name e transaction.notes)
  - page (int, optional)
  - pageSize (int, optional)
- Response 200:
  - items: Transaction[]
  - pagination: { page, pageSize, total }

## 2) Create Transaction
- Method: POST
- Path: /api/transactions
- Body:
  - name (string, required)
  - type (income|expense, required)
  - categoryId (uuid, required)
  - amount (number, required, 2 casas decimais)
  - transactionDate (date, required)
  - recurrence: { enabled: boolean, dayOfMonth?: int } (optional)
- Response 201:
  - transaction: Transaction
- Errors:
  - 400 para validacao de campos

## 3) Update Transaction
- Method: PATCH
- Path: /api/transactions/{id}
- Body: campos mutaveis de transacao
- Response 200: transaction atualizado
- Errors: 404 se nao encontrado, 400 para validacao

## 4) Delete Transaction
- Method: DELETE
- Path: /api/transactions/{id}
- Response 204

## 5) Dashboard Summary
- Method: GET
- Path: /api/dashboard/summary
- Query params:
  - months (int, optional, default 12)
- Response 200:
  - currentMonth: string
  - netBalance: number
  - totals: { income: number, expense: number }
  - areaSeries: Array<{ month: string, income: number, expense: number, net: number }>

## 6) Manual Export
- Method: GET
- Path: /api/export
- Query params:
  - format (csv|json, required)
  - from (date, optional)
  - to (date, optional)
- Response 200:
  - csv: arquivo text/csv
  - json: arquivo application/json

## Out of Scope (V1)
- POST /api/import
- Qualquer endpoint de autenticacao/login ativo

## Canonical Transaction DTO
- id: string (uuid)
- name: string
- type: income|expense
- categoryId: string
- categoryName: string
- amount: number
- transactionDate: string (YYYY-MM-DD)
- recurrence:
  - enabled: boolean
  - ruleId: string | null
- createdAt: string (ISO)
- updatedAt: string (ISO)
