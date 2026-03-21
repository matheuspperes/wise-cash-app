# Quickstart - Gestao Financeira Mensal Simples

## 1. Prerequisitos
- Node.js LTS
- Conta Supabase com projeto criado
- Conta Vercel (para deploy)

## 2. Configuracao inicial
1. Instalar dependencias do projeto.
2. Configurar variaveis de ambiente:
   - NEXT_PUBLIC_SUPABASE_URL
   - NEXT_PUBLIC_SUPABASE_ANON_KEY
   - SUPABASE_SERVICE_ROLE_KEY (somente backend)
3. Criar schema/tabelas conforme data-model.md.

## 3. Rodar localmente
1. Iniciar ambiente de desenvolvimento Next.js.
2. Abrir aplicacao no navegador.
3. Validar localidade pt-BR e moeda BRL em toda a interface.

## 4. Fluxo de validacao manual (sem testes automatizados)

### US1 - Registro rapido
1. Criar transacao valida (nome, tipo, categoria, valor, data).
2. Tentar salvar sem campo obrigatorio e verificar bloqueio.
3. Criar recorrencia mensal e trocar para mes seguinte para validar geracao.

### US2 - Busca e filtros
1. Criar transacoes em categorias/tipos diferentes.
2. Aplicar filtros por tipo/categoria/periodo.
3. Buscar por termo textual e confirmar localizacao em ate 3 cliques/toques.

### US3 - Dashboard
1. Abrir dashboard e confirmar saldo liquido destacado.
2. Verificar grafico de area historico com meses anteriores.
3. Alterar periodo e confirmar recarregamento consistente.

## 5. Exportacao V1
1. Executar exportacao manual em CSV.
2. Executar exportacao manual em JSON.
3. Confirmar que nao existe fluxo de importacao na V1.

## 6. Criterios de saida
- Requisitos FR-001..FR-020 atendidos.
- Success Criteria SC-001..SC-006 evidenciados em validacao manual.
- Nenhum teste automatizado adicionado ao repositorio.
