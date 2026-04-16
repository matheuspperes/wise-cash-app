# Contract - Recorrencias, Header Global e Data Civil

## Purpose
Definir contrato funcional para: bloco de pendencias em Recorrencias, navegacao de cabecalho global em telas de UI, tooltips adjacentes aos selects e persistencia de data civil sem deslocamento.

## Scope
- Filtro local por mes/ano para pendencias.
- Renderizacao condicional do bloco de pendencias.
- Botoes globais no cabecalho de telas de UI.
- Regra de `Voltar ao Dashboard` somente fora da dashboard.
- Remocao de botoes redundantes no fim de paginas.
- Tooltip inline-right nos selects de recorrencia com `aria-describedby` valido.
- Persistencia de data civil local (`YYYY-MM-DD`) para recorrencias.

## Inputs and Outputs

### Input A: Pending item source
- Input shape:
  - `id: string`
  - `scheduledDate: string | Date`
  - `status: pending | confirmed | canceled`
- Contract rules:
  - Item so entra no bloco se mes+ano local de `scheduledDate` == mes+ano local de `new Date()`.
  - Datas invalidas nao devem quebrar renderizacao.

### Output A: Pending block
- If filtered count > 0:
  - bloco de pendencias MUST ser renderizado na tela de Recorrencias.
- If filtered count = 0:
  - bloco MUST nao ser renderizado.

### Input B: Header context
- Input shape:
  - `route: string`
  - `isUiRoute: boolean`
- Contract rules:
  - Em rotas de UI, MUST exibir `Recorrencias`, `Transacoes`, `Nova Transacao` no cabecalho.
  - `Voltar ao Dashboard` MUST aparecer apenas fora da dashboard.
  - Rotas tecnicas estao fora do escopo de validacao do contrato de cabecalho.

### Output B: Header behavior
- Botoes globais visiveis no topo da pagina (sem sticky de viewport).
- Nenhum botao de navegacao duplicado no fim das paginas afetadas.

### Input C: Recurrence select tooltip binding
- Input shape:
  - `selectId: string`
  - `tooltipId: string`
  - `ariaDescribedBy: string`
- Contract rules:
  - Tooltip MUST estar na mesma div do select e imediatamente a direita.
  - `aria-describedby` MUST incluir `tooltipId` correspondente.

### Output C: Accessibility and layout
- Posicionamento inline sem salto vertical.
- Leitor de tela encontra descricao correta por id.

### Input D: Recurrence day persistence
- Input shape:
  - `day: number`
  - `inputDate: string`
- Contract rules:
  - Persistencia MUST usar formato `YYYY-MM-DD` sem hora/timezone.
  - Dia informado MUST ser preservado em criacao e edicao.

### Output D: Stored date integrity
- Registro persistido representa exatamente o dia informado (ex.: 17 -> 17).

## Invariants
- Sem alteracao de semantica para confirmar/cancelar pendencias.
- Sem regressao do fluxo principal de navegacao em telas de UI.
- Sem perda de vinculacao de acessibilidade nos campos com tooltip.
- Sem uso de componente temporal UTC para persistir data civil de recorrencia.
