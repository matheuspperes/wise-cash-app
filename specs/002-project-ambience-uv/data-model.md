# Data Model - Definicao de Ambiencia do Projeto

## Entity: ProjectContext
- Fields:
  - id (string)
  - repository_scope (string)
  - primary_stack (string)
  - secondary_stacks (string[])
  - constraints (string[])
  - priorities (string[])
  - created_at (datetime)
  - updated_at (datetime)
- Validation Rules:
  - repository_scope obrigatorio
  - primary_stack obrigatoria
  - priorities com pelo menos 1 valor
- Relationships:
  - 1:N com AmbienceOption
  - 1:1 com RecommendationReport

## Entity: AmbienceOption
- Fields:
  - id (string)
  - name (string)
  - stack_family (python|node|other)
  - status (recommended|alternative|not_applicable)
  - setup_effort_level (low|medium|high)
  - rationale (string)
  - tradeoffs (string[])
- Validation Rules:
  - name obrigatorio
  - status obrigatorio
  - rationale obrigatoria
- Relationships:
  - N:1 com ProjectContext

## Entity: RecommendationReport
- Fields:
  - id (string)
  - primary_option_id (string)
  - alternative_option_ids (string[])
  - assumptions (string[])
  - dependencies (string[])
  - reevaluation_trigger (string)
  - review_window_months (number)
  - created_at (datetime)
- Validation Rules:
  - primary_option_id obrigatorio
  - pelo menos 2 alternativas
  - reevaluation_trigger obrigatorio
- Relationships:
  - 1:1 com ProjectContext
  - 1:N com AmbienceOption
  - 1:1 com OperationalBaseline

## Entity: OperationalBaseline
- Fields:
  - id (string)
  - package_manager_python (string)
  - package_manager_non_python (string)
  - setup_steps (string[])
  - maintenance_steps (string[])
  - rollback_notes (string[])
- Validation Rules:
  - setup_steps com no minimo 1 passo
  - package_manager_non_python definido para o repositorio atual
- Relationships:
  - 1:1 com RecommendationReport

## State Transitions

### AmbienceOption.status
- alternative -> recommended (quando selecionada como opcao principal)
- recommended -> alternative (apos reavaliacao)
- any -> not_applicable (quando stack deixa de ser relevante)

### RecommendationReport lifecycle
- draft -> approved (apos revisao manual)
- approved -> superseded (quando nova avaliacao semestral/evento for concluida)
