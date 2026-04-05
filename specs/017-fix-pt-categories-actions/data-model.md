# Data Model: Correcoes de Portugues e Acoes no Historico

## Entity: TransactionRecord
- Description: Registro financeiro persistido localmente e exibido em tabela, filtros, acordeao mensal e dashboard.
- Fields relevantes:
  - id: string
  - ownerScope: string
  - name: string
  - type: `income` | `expense`
  - categoryId: string
  - categoryName: string
  - amount: number
  - transactionDate: string (`YYYY-MM-DD`)
  - notes: string | null
  - status: `active` | `deleted`
  - updatedAt: string
- Validation Rules:
  - Campos obrigatorios de edicao: data, descricao, categoria, tipo, valor.
  - `amount` deve ser numerico positivo.
  - `status=deleted` deve excluir registro de listagens/aggregados ativos.

## Entity: HistoryRowActionState
- Description: Estado de interacao por linha da tabela de historico completo.
- Fields:
  - transactionId: string
  - isEditingOpen: boolean
  - isSaving: boolean
  - isDeleting: boolean
  - feedbackMessage: string | null
- Validation Rules:
  - Apenas uma instancia de drawer ativa por linha selecionada.
  - Em erro de persistencia, estado visual consolidado nao deve ser alterado.

## Entity: EditDrawerForm
- Description: Modelo de formulario do drawer lateral para edicao completa.
- Fields:
  - transactionDate: string
  - description: string
  - categoryName: string
  - type: `income` | `expense`
  - amount: string | number
  - notes: string
- Validation Rules:
  - Salvar apenas com campos obrigatorios validos.
  - Drawer permanece aberto apos salvar com sucesso e mostra feedback.

## Entity: LocalFunctionalDataSet
- Description: Conjunto de dados funcionais que a limpeza total remove.
- Collections:
  - transactions
  - recurrenceRules
  - meta
- Scope Rules:
  - Aplicar limpeza em todos os escopos locais da aplicacao (`user:*` e `anonymous`).

## Relationships
- `TransactionRecord` alimenta `HistoryRowActionState` durante interacoes de edicao/remocao.
- `EditDrawerForm` mapeia para `TransactionRecord` em operacao de patch persistente.
- `LocalFunctionalDataSet` impacta diretamente `TransactionRecord` e agregados de dashboard apos reset.

## State Transitions
1. Edicao:
   - `idle -> editing-open -> saving -> success (editing-open)`
   - `saving -> error (editing-open, sem atualizar visao consolidada)`
2. Remocao:
   - `idle -> confirm-delete -> deleting -> success (status=deleted)`
   - `deleting -> error (registro permanece ativo)`
3. Limpeza total:
   - `idle -> confirm-reset -> clearing -> success (stores funcionais vazios)`
   - `clearing -> error (estado anterior preservado)`
