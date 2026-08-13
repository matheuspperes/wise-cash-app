# Feature Specification: Consistencia visual do fluxo atual

**Branch sugerida**: `026-ui-consistency-flow`  
**Status**: Draft  
**Escopo**: Ajustes de interface e consistencia visual, sem mudança de regras de negocio.

## Objetivo

Padronizar a apresentacao do fluxo atual para que a tela de Dados siga a mesma linguagem visual das demais telas, as tabelas exibam apenas as colunas relevantes para leitura rapida e o campo de edicao de transacoes use a mesma experiencia de mascara monetaria ja aplicada em novas transacoes.

## User Scenarios & Testing

### US1 - Ver a tela de Dados com equilibrio visual

Como usuario, quero que a area de importacao tenha o mesmo peso visual da area de exportacao, para que a tela fique mais consistente e facil de escanear.

**Cenario de teste**:
- Abrir a tela de Dados em desktop e mobile.
- Verificar que a secao de importacao e a secao de exportacao ocupam areas visuais equivalentes.
- Verificar que o bloco de download do modelo CSV permanece em area separada.

### US2 - Manter o header da tela de Dados consistente com as demais paginas

Como usuario, quero encontrar na tela de Dados o mesmo padrao visual usado nas outras paginas, para nao ter quebra de contexto entre telas.

**Cenario de teste**:
- Abrir a tela de Dados e comparar o header com o das telas de Dashboard e Transacoes.
- Confirmar que a hierarquia visual, espacamento e estilo dos botoes seguem o mesmo padrao.

### US3 - Reduzir ruido nas tabelas de leitura

Como usuario, quero ver menos colunas nas tabelas de resumo, para conseguir ler os dados mais rapidamente.

**Cenario de teste**:
- Abrir a tabela da dashboard e verificar que a coluna "Tipo" nao aparece.
- Abrir os acordeoes de transacoes e verificar que a coluna "Tipo" nao aparece nas tabelas internas.

### US4 - Editar valores com a mesma experiencia de novas transacoes

Como usuario, quero editar o valor de uma transacao com a mesma mascara e o mesmo comportamento usados na criacao de novas transacoes, para evitar divergencias entre criar e editar.

**Cenario de teste**:
- Abrir uma transacao existente em edicao.
- Verificar que o campo de valor apresenta a mesma formatacao, validacao e comportamento de entrada usados em novas transacoes.
- Salvar a edicao sem alterar o resultado final esperado do registro.

## Functional Requirements

- FR-001 A tela de Dados deve apresentar a secao de importacao com dimensao visual equivalente a secao de exportacao.
- FR-002 A tela de Dados deve manter o mesmo padrao visual de cabecalho usado nas demais telas principais da aplicacao.
- FR-003 O bloco de download do modelo CSV deve permanecer em area separada das secoes de importacao e exportacao.
- FR-004 A tabela de dashboard nao deve exibir a coluna "Tipo".
- FR-005 As tabelas internas dos acordeoes de transacoes nao devem exibir a coluna "Tipo".
- FR-006 O campo de edicao de valor de transacao deve usar a mesma mascara monetaria, validacao e experiencia de interacao ja aplicada ao campo de novas transacoes.
- FR-007 As alteracoes de UI nao devem modificar o fluxo de cadastro, edicao, listagem ou persistencia dos dados.
- FR-008 As alteracoes devem preservar o comportamento responsivo em desktop e mobile.

## Scope Boundaries

- Fora de escopo: alterar regras de negocio de transacoes, recorrencias, filtros, exportacao ou importacao.
- Fora de escopo: mudar ordem de informacoes, campos persistidos ou formato dos dados salvos.
- Fora de escopo: criar novas colunas ou novos fluxos de edicao.

## Assumptions

- A mascara monetaria de novas transacoes representa o padrao de referencia para o campo de edicao.
- A coluna "Tipo" removida da dashboard e dos acordeoes nao sera substituida por outro indicador visual nesta etapa.
- A consistencia visual do header deve seguir o padrao ja estabelecido nas telas existentes, sem introduzir um novo layout.

## Success Criteria

- Pelo menos 95% dos testes manuais de navegacao entre Dashboard, Dados e Transacoes confirmam consistencia visual do header e da estrutura principal.
- A tela de Dados pode ser usada em desktop e mobile sem que a area de importacao pareca visualmente menor que a de exportacao.
- Usuarios conseguem identificar rapidamente acoes principais na tela de Dados sem confundir o bloco de download do modelo com as secoes operacionais.
- A edicao de valor nao produz discrepancia perceptivel de formato em relacao ao fluxo de criacao de novas transacoes.

## Impacted Screens and Components

- Tela de Dados
- Dashboard
- Tela de Transacoes
- Componente de edicao de transacao
- Tabela de resumo da dashboard
- Tabelas internas dos acordeoes de transacoes

## Acceptance Criteria

- AC-001 A tela de Dados mostra importacao e exportacao com proporcao visual equivalente em desktop.
- AC-002 A tela de Dados preserva a consistencia visual do header com as demais paginas principais.
- AC-003 O bloco "Baixar modelo CSV" permanece isolado das secoes de importacao e exportacao.
- AC-004 A coluna "Tipo" nao aparece na tabela da dashboard.
- AC-005 A coluna "Tipo" nao aparece nas tabelas internas dos acordeoes de transacoes.
- AC-006 O campo de edicao de transacoes usa a mesma mascara monetaria do fluxo de novas transacoes.
- AC-007 O comportamento no mobile continua funcional e legivel apos os ajustes.