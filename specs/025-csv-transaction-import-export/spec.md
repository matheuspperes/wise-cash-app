# Feature Specification: Importacao e exportacao de transacoes via CSV

**Feature Branch**: `025-csv-transaction-import-export`  
**Created**: 2026-05-18  
**Status**: Draft  
**Input**: User description: "Importacao e exportacao de transacoes via CSV com arquivo modelo unico"

## User Scenarios & Validation *(mandatory)*

### User Story 1 - Importar transacoes com validacao (Priority: P1)

Como usuario pessoal do app, quero importar um arquivo CSV baseado no modelo para criar meus lancamentos com rapidez e seguranca.

**Why this priority**: Importacao reduz trabalho manual e e o fluxo com maior risco de erro.

**Independent Validation**: Pode ser validado ao importar um CSV valido e confirmar que transacoes e recorrencias foram criadas corretamente.

**Acceptance Scenarios**:

1. **Given** que o usuario tem um CSV no modelo com linhas validas, **When** ele envia o arquivo e confirma o resumo, **Then** todas as linhas validas sao criadas como transacoes e, quando aplicavel, regras de recorrencia.
2. **Given** que o CSV contem linhas invalidas, **When** o usuario envia o arquivo, **Then** o sistema bloqueia a confirmacao e exibe os erros linha a linha com orientacao clara para correcao.

---

### User Story 2 - Exportar dados no mesmo modelo (Priority: P2)

Como usuario, quero exportar minhas transacoes no mesmo formato do modelo para reutilizar os dados ou reimportar sem ajustes.

**Why this priority**: Exportacao garante portabilidade e consistencia com o modelo unico.

**Independent Validation**: Pode ser validado ao exportar um CSV e reimporta-lo sem mudar a estrutura.

**Acceptance Scenarios**:

1. **Given** que o usuario escolhe exportar, **When** o arquivo e gerado, **Then** o CSV usa exatamente os mesmos cabecalhos e estrutura do modelo.
2. **Given** que o usuario exporta um recorte por periodo, **When** o arquivo e gerado, **Then** somente as transacoes do periodo escolhido aparecem no CSV no mesmo padrao.

---

### User Story 3 - Acessar tela de dados e baixar modelo (Priority: P3)

Como usuario, quero acessar uma tela dedicada de dados para baixar o modelo CSV e iniciar o processo com clareza.

**Why this priority**: Facilita a descoberta do recurso sem poluir a dashboard.

**Independent Validation**: Pode ser validado ao acessar o atalho na dashboard e baixar o modelo.

**Acceptance Scenarios**:

1. **Given** que o usuario esta na dashboard, **When** ele usa o atalho para a tela de dados, **Then** ve um unico link para essa tela e nao tres botoes separados.
2. **Given** que o usuario esta na tela de dados, **When** escolhe baixar o modelo, **Then** recebe um CSV com cabecalhos e regras do modelo.

---

### Edge Cases

- Arquivo com linhas em branco deve ser ignorado sem erro.
- Valores monetarios com virgula (ex.: 129,90) devem ser rejeitados com mensagem explicita sobre ponto decimal.
- Data fora do formato YYYY-MM-DD deve ser rejeitada com mensagem clara.
- Recorrencia Ativa = "Sim" mas campos de recorrencia incompletos devem bloquear a importacao ate correcao.
- Categoria inexistente na plataforma deve abrir um prompt no preview para o usuario mapear para uma categoria existente ou criar uma nova; se o usuario rejeitar, a linha sera considerada invalida.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: O sistema MUST oferecer uma tela dedicada de dados com tres acoes: importar CSV, exportar CSV e baixar modelo CSV.
- **FR-002**: O sistema MUST disponibilizar um arquivo modelo CSV com os cabecalhos em portugues na ordem definida: Nome, Tipo, Categoria, Valor, Data, Observacoes, Recorrencia Ativa, Dia da Recorrencia, Tipo da Recorrencia, Quantidade de Meses, Modo da Recorrencia.
- **FR-003**: O sistema MUST aceitar importacao apenas de arquivos que usem o modelo de colunas exato do template.
- **FR-004**: O sistema MUST validar linha a linha, apresentar um resumo do arquivo e bloquear a confirmacao enquanto existirem linhas invalidas.
- **FR-005**: O sistema MUST mapear "Receita" e "Despesa" para os tipos internos e rejeitar quaisquer outros valores.
- **FR-006**: O sistema MUST exigir Nome, Tipo, Categoria, Valor e Data em todas as linhas validas.
- **FR-007**: O sistema MUST exigir Valor com ponto decimal e Data no formato YYYY-MM-DD; formatos diferentes devem ser rejeitados.
- **FR-007a**: O sistema MUST exigir Valor sempre positivo; o sinal e determinado exclusivamente por Tipo.
- **FR-008**: O sistema MUST aceitar "Sim" ou "Nao" para Recorrencia Ativa e validar campos dependentes quando Recorrencia Ativa for "Sim".
- **FR-009**: Quando Recorrencia Ativa for "Sim", o sistema MUST exigir Dia da Recorrencia e Tipo da Recorrencia; se Tipo da Recorrencia for "Limitada", Quantidade de Meses MUST ser obrigatoria; se "Ilimitada", Modo da Recorrencia MUST ser obrigatorio com valores "Automatica" ou "Manual".
- **FR-010**: O sistema MUST criar transacoes para cada linha valida e criar regras de recorrencia quando os campos de recorrencia estiverem presentes e validos.
- **FR-011**: O sistema MUST ser tolerante a variacoes pequenas de texto, aplicando trim e comparacao case-insensitive apenas nos campos de texto controlados (Tipo, Recorrencia Ativa, Tipo da Recorrencia, Modo da Recorrencia).
- **FR-012**: O sistema MUST exportar dados no mesmo modelo do template e garantir que o arquivo exportado possa ser reimportado sem ajuste estrutural.
- **FR-013**: O sistema MUST permitir exportacao de todos os dados ou de um recorte por periodo definido pelo usuario.
- **FR-014**: A dashboard MUST oferecer apenas um atalho discreto para a tela de dados.
- **FR-015**: O sistema MUST detectar duplicatas por chave natural (Nome, Tipo, Valor, Data, Categoria) durante a importacao e pular a criacao dessas linhas, exibindo aviso por linha duplicada.
- **FR-016**: Quando uma `Categoria` do CSV nao for reconhecida, o sistema MUST apresentar um prompt no preview para que o usuario mapeie para uma categoria existente ou confirme a criacao de uma nova categoria; a importacao nao deve criar categorias automaticamente sem confirmacao do usuario.

### Assumptions

- Linhas em branco sao ignoradas durante a importacao.
- Quando uma categoria do CSV nao for reconhecida, o importador MUST solicitar ao usuario que mapeie para uma categoria existente ou confirme a criacao de uma nova categoria; nenhuma categoria sera criada automaticamente sem consentimento.
- Quando Recorrencia Ativa for "Nao", os demais campos de recorrencia sao ignorados.
- Dia da Recorrencia aceita valores de 1 a 31.
- Valor deve ser informado como numero positivo, sem sinal.
- Importador detecta duplicatas por chave natural e nao cria registros duplicados.

### Key Entities *(include if feature involves data)*

- **Linha CSV**: Representa um lancamento com atributos de transacao e, opcionalmente, de recorrencia.
- **Transacao**: Registro financeiro com nome, tipo, categoria, valor, data e observacoes.
- **Regra de Recorrencia**: Configuracao que descreve dia, tipo, duracao e modo da recorrencia.
- **Exportacao**: Conjunto de transacoes convertidas para o modelo CSV unico.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: 95% das importacoes com ate 1000 linhas validas concluem em ate 60 segundos apos o envio do arquivo.
- **SC-002**: 90% dos usuarios completam o fluxo de importacao sem ajuda externa na primeira tentativa.
- **SC-003**: 100% dos arquivos exportados podem ser reimportados sem alteracao de estrutura de colunas.
- **SC-004**: Usuarios conseguem baixar o modelo e gerar um export em menos de 1 minuto em 90% das tentativas.

## Clarifications

### Session 2026-05-18

- Q: Como tratar o sinal de Valor no CSV? → A: Valor sempre positivo; Tipo define receita vs despesa.

- Q: Como evitar duplicatas na importacao? → A: Detectar duplicatas por chave natural (Nome+Tipo+Valor+Data+Categoria) e pular/alertar.
- Q: Como tratar categorias desconhecidas? → A: Pedir ao usuario mapear para uma existente ou criar nova (prompt no preview).
