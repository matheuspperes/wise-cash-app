# Contract - Recurrences Refinement View

## Purpose
Definir o contrato funcional e de interface para os refinamentos da view `transactions?view=recurrences`, mantendo paridade de comportamento com o historico.

## Scope
- Filtro de pendencias por mes/ano atual no fuso local.
- Renderizacao condicional do bloco de pendencias.
- Reuso do fluxo de editar/excluir do historico.
- Destaque visual do item em edicao.
- Edicao de valor/quantia.
- Paridade de analytics de exclusao (confirm/cancel).
- Tooltips ao lado dos selects com associacao acessivel.
- Remocao de copys proibidas e ajuste de espaco.
- Alinhamento visual do grid de nova transacao.

## Inputs and Outputs

### Input A: Pending confirmations source
- Input shape:
  - `id: string`
  - `scheduledDate: string | Date`
  - `name: string`
  - `amount: number`
  - `type: income | expense`
- Contract rules:
  - Item entra no bloco de pendencias somente se `scheduledDate` tiver mesmo mes+ano da data corrente local.
  - Datas invalidas nao devem causar quebra de renderizacao.

### Output A: Pending confirmations block
- If filtered list length > 0:
  - bloco "Confirmacoes pendentes de recorrencia" MUST ser renderizado.
- If filtered list length = 0:
  - bloco MUST nao ser renderizado.

### Input B: Recurrence list item interaction
- Input shape:
  - `recurrenceId: string`
  - `isEditing: boolean`
  - `amount: number`
- Contract rules:
  - Acao de editar MUST abrir o mesmo mecanismo do historico (inline/drawer vigente).
  - Acao de excluir MUST usar mesmo prompt de confirmacao do historico.

### Output B: Editing and deletion behavior
- Editing:
  - item ativo MUST receber destaque visual enquanto edicao estiver ativa.
  - formulario MUST permitir editar valor/quantia com mesmas regras do historico.
- Deletion:
  - confirmar e cancelar no prompt MUST seguir mesmo fluxo do historico.
  - eventos de analytics MUST ser equivalentes aos do historico para confirm/cancel.

### Input C: Recurrence tooltip field metadata
- Input shape:
  - `fieldId: string`
  - `tooltipId: string`
  - `ariaDescribedBy: string`
- Contract rules:
  - tooltip MUST estar no mesmo grupo visual do select e imediatamente a direita.
  - `aria-describedby` MUST apontar para `tooltipId` valido.

### Output C: Accessible tooltip behavior
- Tooltip visivel no trigger sem salto vertical de layout.
- Leitor de tela recebe descricao correta via vinculo de ids.

## Forbidden Copy Contract
As frases abaixo MUST NOT aparecer na UI final:
1. "Confirme ou cancele recorrencias em modo manual."
2. "Gerencie regras recorrentes e ajuste ciclos futuros."
3. "Confirme ou cancele as pendencias antes da efetivacao no historico."

## Layout Consistency Contract
- O bloco de criacao/edicao da nova transacao MUST manter altura/padding alinhados aos inputs/selects vizinhos.
- Ajustes MUST preservar responsividade desktop/mobile.

## Invariants
- Nao criar fluxo paralelo de editar/excluir se fluxo equivalente ja existir no historico.
- Nao quebrar acoes existentes de confirmar/cancelar pendencias.
- Nao remover associacoes de acessibilidade dos campos de recorrencia.
