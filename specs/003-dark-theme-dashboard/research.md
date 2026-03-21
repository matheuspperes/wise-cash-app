# Research: Modernizacao Visual do Dashboard

## Decision 1: UI Foundation padrao
- Decision: Adotar shadcn/ui com base em Radix UI, class-variance-authority, tailwind-merge e lucide-react.
- Rationale: Entrega componentes acessiveis e consistentes (botao, input, select, dialog, toast, foco/disabled) com baixo atrito de implementacao.
- Alternatives considered:
  - Componentes totalmente custom com Tailwind puro: maior custo de manutencao e risco de inconsistencias.
  - Biblioteca UI monolitica fechada: menor flexibilidade para identidade visual do projeto.

## Decision 2: Camada de motion
- Decision: Usar Framer Motion para transicoes de entrada, troca de estado e microinteracoes.
- Rationale: Permite carregamento suave de cards/listas/graficos e feedback moderno com controle fino de intensidade.
- Alternatives considered:
  - Apenas animacoes CSS utilitarias: limitadas para transicoes compostas.
  - Sem camada dedicada de motion: UX menos fluida.

## Decision 3: Data UX padronizado
- Decision: Padronizar telas com TanStack Query (queries/mutations), usando isLoading, isFetching e isError.
- Rationale: Estados de dados coerentes reduzem divergencia visual e melhoram previsibilidade de carregamento/erro.
- Alternatives considered:
  - fetch manual com useEffect/useState em cada tela: maior duplicacao e risco de comportamento inconsistente.
  - Solucao global custom de estado remoto: complexidade desnecessaria para o escopo.

## Decision 4: Loaders
- Decision: Adotar Skeleton em componente proprio com Tailwind e animate-pulse.
- Rationale: Melhora percepcao de performance e reduz layout shift sem adicionar dependencia obrigatoria.
- Alternatives considered:
  - Spinner unico para toda a tela: pior percepcao de progresso por contexto.
  - react-loading-skeleton como padrao: util, mas nao necessario para primeira entrega.

## Decision 5: Charts no curto prazo
- Decision: Manter Recharts e elevar acabamento (tooltip custom, gradientes suaves, animacao de mount/update, eixos limpos, legenda moderna).
- Rationale: Evita custo de migracao enquanto moderniza a experiencia visual conforme requisito.
- Alternatives considered:
  - Migrar para outra lib de charting agora: custo alto para pouco ganho imediato.
  - Manter chart atual sem refinamento: nao atende objetivo de modernizacao.

## Decision 6: Form UX
- Decision: Adotar react-hook-form com zodResolver.
- Rationale: Validacao robusta e mensagens consistentes com melhor DX e menor boilerplate.
- Alternatives considered:
  - Estado manual por input: maior risco de regressao e inconsistencias.
  - Outra lib de forms sem integracao natural com zod: menor reaproveitamento do schema existente.

## Decision 7: Typography e tokens
- Decision: Usar next/font com Geist e consolidar design tokens (cores, radius, spacing, shadow, duration).
- Rationale: Garante identidade visual atualizada e consistencia entre componentes e telas.
- Alternatives considered:
  - Fonte de sistema sem tokenizacao: menor consistencia visual.
  - Tokens dispersos por arquivo: dificulta evolucao e manutencao.

## Decision 8: Comportamentos clarificados do spec
- Decision: Dark como padrao inicial, respeitando preferencia salva; remocao de dados de teste restrita a UI visivel; botao de nova transacao reutiliza fluxo existente; desktop com CTA no topo e mobile com CTA fixo inferior.
- Rationale: Mantem escopo objetivo, reduz risco e respeita as clarificacoes aprovadas.
- Alternatives considered:
  - Forcar dark em todos os acessos: conflita com preferencia salva.
  - Criar fluxo novo de transacao: escopo desnecessariamente amplo.
