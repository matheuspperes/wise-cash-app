# Contract - Recorrencia, Historico e Toggle

## Purpose
Definir contrato funcional para data civil de recorrencia, destaque do mes atual no historico e comportamento do toggle.

## Scope
- Normalizacao de datas de recorrencia como `YYYY-MM-DD`.
- Resolucao de vencimentos em meses com menos dias.
- Destaque do container do mes atual no historico completo.
- Ordem dos botoes fixos na dashboard.
- Estados visuais do toggle de recorrencia.

## Inputs and Outputs

### Input A: Recurrence date
- Input shape:
  - `year: number`
  - `month: number`
  - `dayOfMonth: number`
- Contract rules:
  - MUST gerar `YYYY-MM-DD` sem timezone.
  - MUST preservar o dia informado em criacao/edicao.

### Output A: Civil date
- `civilDate: string`
- MUST ser identico ao dia informado e consistente com o mes.

### Input B: Month group
- Input shape:
  - `monthRef: string` (`YYYY-MM`)
  - `isCurrentMonth: boolean`
- Contract rules:
  - `isCurrentMonth` true aplica destaque sutil ao container.

### Output B: Month highlight
- Container do grupo do mes atual com mudanca sutil de cor.

### Input C: Dashboard header
- Input shape:
  - `actions: string[]`
- Contract rules:
  - Ordem MUST ser ["Transacoes", "Recorrencias", "Nova Transacao"].

### Input D: Recurrence toggle
- Input shape:
  - `isEnabled: boolean`
- Contract rules:
  - `isEnabled` true => label "Ligado" e cor suave ativa.
  - `isEnabled` false => label "Desligado" e cor suave neutra.

## Invariants
- Nao usar serializacao de Date com timezone para persistir recorrencias.
- Nao alterar a semantica funcional do toggle ao mudar texto/cores.
- Nao destacar meses que nao sejam o mes atual.
