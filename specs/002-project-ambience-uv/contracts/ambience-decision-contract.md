# Contract - Ambience Decision Output

## Purpose
Definir o formato minimo obrigatorio para uma decisao de ambiencia valida neste repositorio.

## Required Output Sections
- Contexto do projeto
- Recomendacao principal
- Alternativas consideradas
- Trade-offs
- Suposicoes e dependencias
- Baseline operacional
- Gatilhos de reavaliacao

## Validation Rules
- Deve existir exatamente 1 recomendacao principal.
- Devem existir ao menos 2 alternativas.
- A recomendacao deve declarar se o projeto e Python ou nao-Python.
- Para Python, baseline MUST usar `uv`.
- Para nao-Python neste repositorio, baseline MUST usar `npm`.
- Reavaliacao MUST ser definida por evento (mudanca grande de stack) OU janela (6 meses).

## Minimal Decision Schema (Human-readable)
- project_scope: string
- stack_profile: string
- primary_recommendation:
  - tool: string
  - reason: string
- alternatives:
  - tool: string
  - reason: string
- assumptions: string[]
- dependencies: string[]
- operational_baseline:
  - setup_steps: string[]
  - maintenance_steps: string[]
- reevaluation:
  - trigger_event: string
  - interval_months: number
