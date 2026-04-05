# Research: Correcoes de Portugues e Acoes no Historico

## Decision 1: Corrigir categorias em duas frentes (preset + exibicao historica)
- Decision: Corrigir nomes em `transaction-category-presets` e aplicar normalizacao de exibicao para registros historicos ja persistidos.
- Rationale: Garante consistencia para novos e antigos registros sem exigir acao manual do usuario.
- Alternatives considered:
  - Corrigir apenas presets novos (rejeitado: dados antigos continuam errados na UI).
  - Script de migracao obrigatorio de todo banco local (rejeitado: maior risco e complexidade para uso pessoal).

## Decision 2: Limpeza total cobre stores funcionais e todos os escopos locais
- Decision: Botao de reset remove `transactions`, `recurrenceRules` e `meta` em todos os escopos locais (`user:*` e `anonymous`) do banco da aplicacao.
- Rationale: Alinha com expectativa de “zerar a aplicacao” e evita residuos invisiveis entre escopos.
- Alternatives considered:
  - Limpar apenas escopo ativo (rejeitado: residuos em outro escopo podem reaparecer em mudancas de sessao).
  - Limpar apenas transacoes (rejeitado: recorrencias/metadados remanescentes geram comportamento inesperado).

## Decision 3: Atualizacao de UI apenas apos persistencia confirmada
- Decision: Fluxos de edicao/remocao/reset atualizam tabela, acordeao e dashboard somente apos sucesso de persistencia local.
- Rationale: Mantem tela coerente com fonte de dados e evita rollback visual.
- Alternatives considered:
  - Atualizacao otimista com rollback (rejeitado: aumento de complexidade e risco de estado intermitente).
  - Hibrido (rejeitado: sem ganho relevante para escopo atual).

## Decision 4: Drawer lateral para edicao in-place
- Decision: Usar drawer lateral simples e consistente com UI atual para editar todos os campos da transacao selecionada.
- Rationale: Preserva contexto da tabela/mes aberto e reduz navegacao.
- Alternatives considered:
  - Modal central (rejeitado: menor area util para formulario completo).
  - Navegar para pagina dedicada (rejeitado: quebra fluxo do historico).

## Decision 5: Remocao com confirmacao rapida e soft delete
- Decision: Acao de remover na coluna final usa confirmacao curta e aplica soft delete existente.
- Rationale: Evita exclusao acidental sem introduzir novo modelo de dados.
- Alternatives considered:
  - Exclusao imediata sem confirmacao (rejeitado: alto risco de erro do usuario).
  - Hard delete (rejeitado: quebra compatibilidade com regras atuais).

## Decision 6: Re-hidratacao centralizada apos mutacoes
- Decision: Encadear recarregamento de historico filtrado, historico mensal e resumo do dashboard logo apos mutacao persistida.
- Rationale: Cumpre FR-013/FR-017 com baixa complexidade e previsibilidade.
- Alternatives considered:
  - Atualizar apenas a linha localmente (rejeitado: nao garante coerencia dos agregados).
  - Recalculo manual parcial por componente (rejeitado: risco de divergencia).
