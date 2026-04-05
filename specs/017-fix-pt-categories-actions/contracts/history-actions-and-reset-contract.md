# Contract: History Actions and Local Reset

## Scope
Define os contratos de comportamento para:
- Correcao de categorias em portugues (novos e historicos).
- Coluna `Acoes` no historico completo com `Pencil` (editar) e `Trash2` (remover).
- Limpeza total de dados funcionais locais no dashboard.

## Contract 1: Category Display Consistency

### Input Surface
- Presets de categoria usados por formulario e filtros.
- Registros historicos persistidos com possiveis variacoes antigas de texto.

### Behavior
- Sistema MUST exibir categoria em portugues corrigido em todos os pontos visiveis.
- Sistema MUST manter consistencia entre formulario, filtros, historico e dashboard.
- Sistema MUST cobrir registros historicos existentes sem exigir acao manual do usuario.

## Contract 2: History Row Actions

### UI Placement
- Coluna `Acoes` MUST ser a ultima coluna da tabela de historico completo no acordeao mensal.
- Cada linha MUST exibir dois controles:
  - `Pencil` para editar.
  - `Trash2` para remover.

### Edit Flow (Drawer)
- Ao clicar `Pencil`, sistema MUST abrir drawer lateral para o item selecionado.
- Drawer MUST permitir editar: data, descricao, categoria, tipo, valor, observacao/notas.
- Em salvar valido:
  - Persistir localmente.
  - Manter drawer aberto.
  - Exibir feedback de sucesso.
- Em erro de persistencia:
  - Exibir erro.
  - Nao atualizar visual consolidado (historico/dashboard).

### Remove Flow
- Ao clicar `Trash2`, sistema MUST solicitar confirmacao rapida.
- Confirmado, sistema MUST aplicar soft delete.
- Cancelado, sistema MUST nao alterar dados.

## Contract 3: Consistent Refresh After Mutation

### Trigger
- Apos edicao/remocao persistida com sucesso.

### Required Refresh Targets
- Resultados filtrados da tabela de historico.
- Historico mensal do acordeao.
- Cards do dashboard.
- Grafico do dashboard.

### Rule
- Atualizacao MUST ocorrer apenas apos confirmacao de persistencia local bem-sucedida.

## Contract 4: Full Local Functional Reset

### UI Trigger
- Botao no final da dashboard.

### Confirmation
- Sistema MUST exigir confirmacao explicita antes da limpeza.

### Data Scope
- Limpeza MUST remover stores funcionais locais:
  - `transactions`
  - `recurrenceRules`
  - `meta`
- Limpeza MUST cobrir todos os escopos locais da aplicacao no navegador:
  - `user:*`
  - `anonymous`

### Post-Reset State
- Dashboard e historico MUST refletir estado vazio sem residuos.
- Falha de limpeza MUST preservar estado anterior e exibir erro.

## Acceptance Mapping
- FR-001, FR-002, FR-016 -> Contract 1
- FR-007..FR-012, FR-015 -> Contract 2
- FR-013, FR-017 -> Contract 3
- FR-003..FR-006 -> Contract 4
