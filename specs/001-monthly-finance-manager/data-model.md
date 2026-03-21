# Data Model - Gestao Financeira Mensal Simples

## Entity: Category
- Fields:
  - id (uuid, PK)
  - name (text, unique case-insensitive por usuario/escopo)
  - kind (enum: income | expense | mixed)
  - is_active (boolean)
  - created_at (timestamp)
  - updated_at (timestamp)
- Validation Rules:
  - name obrigatorio, 2-40 caracteres
  - kind obrigatorio
- Relationships:
  - 1:N com Transaction

## Entity: RecurrenceRule
- Fields:
  - id (uuid, PK)
  - frequency (enum: monthly)
  - day_of_month (int, 1-31)
  - fallback_policy (enum: last_day_of_month)
  - starts_on (date)
  - ends_on (date, nullable)
  - is_active (boolean)
  - created_at (timestamp)
  - updated_at (timestamp)
- Validation Rules:
  - day_of_month entre 1 e 31
  - ends_on >= starts_on quando informado
- Relationships:
  - 1:N com Transaction (origem de recorrencia)

## Entity: Transaction
- Fields:
  - id (uuid, PK)
  - name (text)
  - type (enum: income | expense)
  - category_id (uuid, FK -> Category.id)
  - amount_brl (numeric(14,2))
  - transaction_date (date)
  - recurrence_rule_id (uuid, nullable, FK -> RecurrenceRule.id)
  - source (enum: manual | recurrence_generated)
  - status (enum: active | deleted)
  - notes (text, nullable)
  - created_at (timestamp)
  - updated_at (timestamp)
- Validation Rules:
  - name obrigatorio (1-120)
  - type obrigatorio
  - amount_brl > 0 e normalizado para 2 casas (arredondamento comercial)
  - transaction_date obrigatoria
- Relationships:
  - N:1 com Category
  - N:1 opcional com RecurrenceRule

## Entity: MonthlySummary (view/materialized view logica)
- Fields:
  - year_month (YYYY-MM)
  - total_income (numeric(14,2))
  - total_expense (numeric(14,2))
  - net_balance (numeric(14,2))
  - transaction_count (int)
- Validation Rules:
  - net_balance = total_income - total_expense
- Relationships:
  - Derivada de Transaction

## Entity: DashboardSnapshot (DTO de agregacao)
- Fields:
  - current_month (YYYY-MM)
  - current_net_balance (numeric(14,2))
  - area_series (array de pontos mensais)
  - comparison_window_months (int, default 12)
- Validation Rules:
  - area_series ordenada por data crescente

## State Transitions

### Transaction.status
- active -> deleted (soft delete por acao do usuario)
- deleted -> active (opcional em versao futura; fora do escopo da V1)

### RecurrenceRule.is_active
- true -> false (usuario interrompe recorrencia)
- false -> true (reativacao manual)

## Query/Index Strategy (logical)
- Index em Transaction(transaction_date DESC)
- Index composto em Transaction(type, category_id, transaction_date)
- Busca textual por name com indice apropriado para contains/prefix
- Index em RecurrenceRule(is_active, day_of_month)
