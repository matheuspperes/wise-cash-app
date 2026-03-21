<!--
Sync Impact Report
- Version change: 0.0.0 -> 1.0.0
- Modified principles:
	- Placeholder Principle 1 -> I. Clareza Sobre Esperteza
	- Placeholder Principle 2 -> II. Simplicidade Intencional
	- Placeholder Principle 3 -> III. Projeto Pessoal Orientado a Valor
	- Placeholder Principle 4 -> IV. Modernidade Pratica
	- Placeholder Principle 5 -> V. Sem Testes Automatizados
- Added sections:
	- Limites Tecnicos e de Escopo
	- Fluxo de Entrega e Revisao
- Removed sections:
	- Nenhuma
- Templates requiring updates:
	- ✅ .specify/templates/plan-template.md
	- ✅ .specify/templates/spec-template.md
	- ✅ .specify/templates/tasks-template.md
	- ⚠ pending: .specify/templates/commands/*.md (diretorio nao encontrado no repositorio)
- Deferred follow-ups:
	- Nenhum
-->

# Wise Cash App Constitution

## Core Principles

### I. Clareza Sobre Esperteza
Todo codigo MUST priorizar legibilidade e manutencao sobre truques tecnicos. Nomes
de classes, funcoes e variaveis MUST descrever intencao de negocio; funcoes MUST
ter responsabilidade unica; duplicacao acidental MUST ser removida quando detectada.
Racional: projeto pessoal tem poucos mantenedores e alta rotatividade de contexto,
entao clareza reduz custo de retorno ao codigo.

### II. Simplicidade Intencional
Cada incremento MUST comecar pela menor solucao que entregue valor real. Abstracoes
genericas, camadas extras e padroes arquiteturais sofisticados MUST NOT ser
introduzidos sem necessidade concreta documentada no plano. Racional: evitar
overengineering preserva velocidade e reduz divida cognitiva.

### III. Projeto Pessoal Orientado a Valor
Decisoes tecnicas MUST refletir uso pessoal: produtividade, confiabilidade percebida
no uso diario e baixo atrito operacional. Requisitos que nao tragam beneficio direto
ao uso pessoal SHOULD ser descartados ou adiados. Racional: o projeto existe para
resolver necessidades reais do mantenedor, nao para atender burocracia externa.

### IV. Modernidade Pratica
Tecnologias e interfaces MUST seguir praticas modernas estaveis (ferramentas ativas,
APIs suportadas e UX atual), mantendo compatibilidade com o escopo do projeto.
Dependencias sem manutencao recente ou com risco claro de abandono MUST NOT ser
adotadas. Racional: modernidade sem estabilidade gera retrabalho e fragilidade.

### V. Sem Testes Automatizados
O repositorio MUST NOT incluir suites de testes automatizados (unitarios,
integracao, E2E ou contrato). A qualidade MUST ser verificada por validacao manual
orientada a cenarios, com passos claros em especificacoes, planos e tarefas.
Racional: para este contexto pessoal, o custo de manutencao de automacao supera o
beneficio esperado.

## Limites Tecnicos e de Escopo

- O escopo MUST permanecer enxuto: cada feature deve resolver um problema objetivo.
- Refatoracoes amplas MUST ser divididas em etapas pequenas e reversiveis.
- Documentacao de uso e operacao MUST ser mantida junto de cada feature entregue.
- Toda mudanca MUST preservar funcionamento local simples, com setup minimo.

## Fluxo de Entrega e Revisao

1. Especificar objetivo e cenarios de validacao manual antes da implementacao.
2. Implementar em incrementos pequenos, com foco em leitura e simplicidade.
3. Executar validacao manual de cada cenario critico e registrar evidencias curtas.
4. Revisar aderencia aos principios desta constituicao antes de concluir a entrega.

## Governance

- Esta constituicao prevalece sobre praticas locais conflitantes.
- Emendas MUST incluir: motivacao, impacto esperado e atualizacao dos templates
	afetados.
- Politica de versao da constituicao segue SemVer:
	- MAJOR: remocao ou redefinicao incompativel de principios/governanca.
	- MINOR: adicao de principio ou expansao material de regras.
	- PATCH: clarificacoes editoriais sem mudanca de comportamento.
- Revisao de conformidade MUST ocorrer em cada plano e tarefas gerados, verificando
	explicitamente: clean code, simplicidade, alinhamento a uso pessoal, modernidade
	pratica e ausencia de testes automatizados.

**Version**: 1.0.0 | **Ratified**: 2026-03-21 | **Last Amended**: 2026-03-21
