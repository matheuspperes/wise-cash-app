# Research - Navegacao e Gestao de Recorrencias

## Decision 1: Reutilizar query param de view existente em `/transactions`
- Decision: Implementar a nova tela em `/transactions?view=recurrences`, reaproveitando o parser de view ja usado em `transactions-page-client`.
- Rationale: Mantem arquitetura simples, evita nova rota de pagina e reduz impacto de navegacao.
- Alternatives considered:
  - Criar rota separada (`/recurrences`): descartado por duplicar contexto e header.
  - Embutir tudo no dashboard: descartado por conflitar com foco e espaco do dashboard.

## Decision 2: Reaproveitar pendencias com handlers locais existentes
- Decision: Usar `RecurrencePendingConfirmationsList` com `confirmLocalRecurrencePending` e `cancelLocalRecurrencePending` tambem na nova view.
- Rationale: Preserva comportamento conhecido e minimiza risco de regressao funcional.
- Alternatives considered:
  - Criar novo componente de pendencias do zero: descartado por duplicacao.

## Decision 3: Listar recorrencias em componente dedicado
- Decision: Criar `RecurrencesList` para exibir nome, valor, proxima data, tipo, status e acoes de editar/excluir.
- Rationale: Isola responsabilidade de apresentacao e facilita evolucao incremental da UX.
- Alternatives considered:
  - Reaproveitar acordeao historico de transacoes: descartado por semantica diferente.

## Decision 4: Fonte de dados para recorrencias cadastradas
- Decision: Expor funcao no gateway local para listar regras ativas/inativas de recorrencia com dados de exibicao (`getAllLocalRecurrences` ou equivalente nomeado no dominio atual).
- Rationale: Evita acoplamento da UI com repositorio interno e mantem padrao de acesso via services/gateway.
- Alternatives considered:
  - Ler direto de repositorio na UI: descartado por quebrar encapsulamento.

## Decision 5: Regra de status de recorrencia na UI
- Decision: Exibir `Ilimitada` para `recurrenceType=unlimited`; para `limited`, mostrar meses faltantes por `maxCycles - generatedCycles` (minimo 0).
- Rationale: Regra objetiva e consistente com os campos existentes em `RecurrenceRuleRecord`.
- Alternatives considered:
  - Exibir apenas total de ciclos: descartado por menor clareza operacional.

## Decision 6: Posicionamento de tooltips no formulario
- Decision: Manter tooltips imediatamente ao lado direito dos selects de tipo/modo de recorrencia e mover a frase de ajuda para tooltip no rotulo `Recorrência`.
- Rationale: Reduz ruido visual e melhora leitura do formulario sem alterar regras de negocio.
- Alternatives considered:
  - Manter frase fixa abaixo do titulo: descartado por ocupar espaco e duplicar contexto.

## Decision 7: Validacao da feature sem automacao
- Decision: Registrar validacao manual por cenarios (navegacao, empty states, confirm/cancel, status de recorrencia, tooltips).
- Rationale: A constituicao do projeto proibe suites automatizadas.
- Alternatives considered:
  - Adicionar testes unitarios: proibido pela constituicao vigente.
