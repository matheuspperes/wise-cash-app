# Research - Gestao Financeira Mensal Simples

## Decision 1: Stack principal com Next.js App Router + TypeScript
- Decision: Usar Next.js (App Router) com TypeScript para UI, rotas de API e renderizacao hibrida no mesmo projeto.
- Rationale: Reduz complexidade arquitetural (uma base), melhora performance percebida com SSR/streaming e simplifica deploy em Vercel.
- Alternatives considered:
  - Separar frontend e backend em dois projetos: descartado por aumentar custo operacional para uso pessoal.
  - SPA pura com backend separado: descartado por exigir mais infraestrutura e wiring.

## Decision 2: Tailwind CSS + Shadcn/UI para velocidade de entrega de UI
- Decision: Adotar Tailwind CSS e Shadcn/UI para construir interface moderna, acessivel e consistente.
- Rationale: Combina produtividade alta com controle visual fino e componentes reutilizaveis.
- Alternatives considered:
  - CSS Modules puro: descartado por menor velocidade para prototipacao de componentes.
  - Biblioteca pesada de componentes fechados: descartada por menor flexibilidade visual.

## Decision 3: Supabase (PostgreSQL + Storage de dados) como BaaS
- Decision: Usar Supabase/PostgreSQL para persistencia relacional e escalabilidade progressiva.
- Rationale: Fornece base robusta, SQL maduro e caminho de evolucao para multiplos usuarios.
- Alternatives considered:
  - SQLite local: descartado por menor elasticidade para evolucao de produto.
  - Banco self-hosted: descartado por overhead operacional desnecessario.

## Decision 4: Politica de identidade na V1 sem login
- Decision: Manter V1 sem autenticacao ativa (sessao unica), preservando modelagem compativel com autenticacao futura.
- Rationale: Alinha com requisito clarificado de simplicidade para uso pessoal e reduz friccao inicial.
- Alternatives considered:
  - Supabase Auth desde o dia 1: adiado para evitar atrito na V1.
  - Passwordless imediato: adiado pelo mesmo motivo.

## Decision 5: Sincronizacao e cache com TanStack Query
- Decision: Usar React Query (TanStack Query) para cache de leitura, invalidacao e sincronizacao de estado do servidor.
- Rationale: Diminui requisicoes redundantes e simplifica consistencia de UI apos mutacoes.
- Alternatives considered:
  - Estado global manual com fetch ad-hoc: descartado por maior risco de inconsistencias.
  - SWR: viavel, mas descartado por preferencia de controle de cache/invalidation da equipe.

## Decision 6: Biblioteca de grafico para dashboard
- Decision: Padronizar em Recharts para graficos de area historicos.
- Rationale: Integracao simples com React, ecossistema amplo e boa performance para volume historico pessoal.
- Alternatives considered:
  - Tremor: viavel, mas descartado para evitar sobreposicao de abstrações de design system.

## Decision 7: Precisao e recorrencia monetaria
- Decision: Valores com 2 casas decimais e arredondamento comercial; recorrencia mensal em dia inexistente cai no ultimo dia do mes.
- Rationale: Regras previsiveis para conciliacao financeira e experiencia consistente em meses curtos.
- Alternatives considered:
  - Mais casas decimais: descartado por complexidade sem beneficio no contexto.
  - Pular recorrencia em mes curto: descartado por quebrar planejamento.

## Decision 8: Exportacao manual na V1
- Decision: Suportar exportacao CSV/JSON na V1 e manter importacao fora de escopo.
- Rationale: Garante portabilidade de dados sem elevar risco de qualidade e suporte na primeira entrega.
- Alternatives considered:
  - Sem exportacao: descartado por risco de lock-in percebido.
  - Importacao completa na V1: descartado por aumentar complexidade de validacao.

## Decision 9: Estrategia de validacao de qualidade
- Decision: Validacao manual por cenarios documentados (sem testes automatizados).
- Rationale: Exigencia explicita da constituicao do projeto.
- Alternatives considered:
  - Testes unitarios/integracao automatizados: proibidos pela constituicao vigente.

## Decision 10: Estrategia nao destrutiva para criptografia futura
- Decision: Definir migracao aditiva para criptografia em repouso na camada da aplicacao sem quebrar dados existentes.
- Rationale: V1 nao aplica criptografia em repouso por escopo, mas a evolucao precisa preservar dados historicos.
- Plano de migracao:
  - Adicionar colunas novas com sufixo `_enc` mantendo colunas legadas durante fase de transicao.
  - Implementar leitura dupla (preferir `_enc`, fallback para legado) durante periodo de rollout.
  - Executar backfill em lotes e validar consistencia por amostragem manual.
  - Remover colunas legadas apenas apos uma release estavel com rollback disponivel.
