# Quickstart: Correcoes de Portugues e Acoes no Historico

## Goal
Entregar correcao de categorias, acoes por linha no historico completo (editar/remover) e reset total de dados funcionais locais com consistencia imediata apos persistencia confirmada.

## Preconditions
- Projeto instala e inicia normalmente.
- IndexedDB disponivel no navegador.
- Base local com algumas transacoes (income e expense) para validar historico e dashboard.

## Implementation Sequence
1. Corrigir presets e normalizacao de exibicao de categorias para dados novos e historicos.
2. Adicionar coluna `Acoes` como ultima coluna do historico completo no acordeao.
3. Implementar botao `Pencil` abrindo drawer lateral com formulario completo de edicao.
4. Implementar botao `Trash2` com confirmacao rapida e soft delete.
5. Garantir recarga de historico e dashboard somente apos persistencia local bem-sucedida.
6. Executar reset local no cliente via servico local-first (IndexedDB no navegador).
7. Adicionar botao no final da dashboard para limpeza total dos dados funcionais locais em todos os escopos.
8. Disparar/consumir evento de mutacao para refetch de cards e grafico no dashboard apos alteracoes persistidas no historico.
9. Exibir mensagens claras em sucesso/erro sem atualizar visual consolidado em falha de persistencia.

## Manual Validation Scenarios
1. Categorias corretas em portugues:
   - Verificar formulario, filtros, historico e dashboard.
   - Confirmar correcao tambem para registros antigos ja salvos.
2. Edicao no drawer:
   - Abrir `Pencil` em um item do historico completo.
   - Editar data, descricao, categoria, tipo, valor e notas.
   - Salvar e confirmar drawer aberto + feedback de sucesso.
3. Remocao por linha:
   - Clicar `Trash2`, cancelar e confirmar que nada mudou.
   - Clicar novamente, confirmar e validar soft delete.
4. Coerencia de atualizacao:
   - Apos edicao/remocao bem-sucedida, validar atualizacao de tabela filtrada, acordeao mensal, cards e grafico.
5. Falha de persistencia (cenario controlado):
   - Simular falha de gravacao local.
   - Confirmar feedback de erro e ausencia de atualizacao visual consolidada.
6. Limpeza total na dashboard:
   - Acionar botao no final da dashboard, confirmar.
   - Validar estado vazio de historico/dashboard e ausencia de residuos em todos os escopos locais.

## Evidence Files
- `manual-validation/fix-pt-categories-actions/categories-pt.md`
- `manual-validation/fix-pt-categories-actions/history-actions-edit-delete.md`
- `manual-validation/fix-pt-categories-actions/persistence-confirmed-refresh.md`
- `manual-validation/fix-pt-categories-actions/full-local-reset.md`
- `manual-validation/fix-pt-categories-actions/quickstart-signoff.md`
