# Feature Specification: Refine Transaction Form Inputs and Dashboard CTA Harmony

**Feature Branch**: `014-refine-transaction-form`  
**Created**: 2026-03-23  
**Status**: Approved  
**Input**: User description: "Design: Na tela de nova transação, ao invés de um select para selecionar gasto ou ganho, troque por 2 opções selecionáveis Despesa e Receita; Troque o input da categoria por um select de categorias padrão com uma opção para criar uma nova; faça uma máscara de dinheiro (R$) no campo de valor; Ajuste o padding dos botoes da dashboard para ficarem iguais (Transações e Nova Transação) e coloque uma cor suave parecida no botão de Transações"

## Clarifications

### Session 2026-03-23

- Q: Quando o usuário escolher Criar nova categoria na tela de nova transação, qual deve ser o comportamento? → A: Criar e salvar a nova categoria na lista padrão, já selecionada no lançamento atual.
- Q: Como a máscara de valor em R$ deve interpretar os dígitos digitados pelo usuário? → A: Entrada contínua em centavos (ex.: digitar 1 2 3 4 vira R$ 12,34).
- Q: Se o usuário tentar criar uma nova categoria com nome já existente (ex.: "Alimentação" e " alimentação "), qual regra deve ser aplicada? → A: Bloquear criação duplicada (comparação sem diferença de maiúsculas/minúsculas e espaços extras).
- Q: Qual regra deve definir "padding igual" entre os botões Transações e Nova Transação na dashboard? → A: Mesmos valores de padding horizontal e vertical em todos os breakpoints suportados.
- Q: Para "cor suave parecida" no botão Transações, qual regra de estilo devemos adotar? → A: Cor da mesma família visual, mas em variante secundária fixa do design system.

## User Scenarios & Validation *(mandatory)*

### User Story 1 - Escolher Tipo de Lançamento Rapidamente (Priority: P1)

Como usuário, eu quero escolher entre Despesa e Receita usando duas opções selecionáveis visíveis, para registrar transações com menos atrito e menos risco de erro.

**Why this priority**: A escolha do tipo de lançamento é obrigatória para salvar uma transação e impacta diretamente a velocidade e clareza do fluxo principal.

**Independent Validation**: Pode ser validada abrindo a tela de nova transação, alternando entre Despesa e Receita e confirmando que apenas uma opção fica ativa por vez e que o valor salvo respeita a opção selecionada.

**Acceptance Scenarios**:

1. **Given** que o usuário está na tela de nova transação, **When** visualiza o campo de tipo, **Then** ele encontra duas opções selecionáveis: Despesa e Receita.
2. **Given** que o usuário seleciona Despesa, **When** seleciona Receita, **Then** Receita fica ativa e Despesa deixa de ficar ativa.
3. **Given** que o usuário salva uma transação após escolher um tipo, **When** o lançamento é persistido, **Then** o tipo salvo corresponde à opção ativa no momento do envio.

---

### User Story 2 - Selecionar Categoria Padrão ou Criar Nova (Priority: P1)

Como usuário, eu quero escolher a categoria em um seletor com opções padrão e ter uma opção de criar nova categoria, para padronizar lançamentos sem perder flexibilidade.

**Why this priority**: Categoria influencia organização, filtros e leitura de histórico; substituir campo livre por seleção guiada melhora consistência dos dados e usabilidade.

**Independent Validation**: Pode ser validada acessando o seletor de categoria, escolhendo uma categoria padrão, escolhendo a opção de criar nova e confirmando que a nova categoria pode ser informada e usada no envio.

**Acceptance Scenarios**:

1. **Given** que o usuário abre o campo de categoria, **When** o seletor é exibido, **Then** ele vê uma lista de categorias padrão e uma opção para criar nova categoria.
2. **Given** que o usuário escolhe uma categoria padrão, **When** salva a transação, **Then** a categoria escolhida é aplicada ao lançamento.
3. **Given** que o usuário escolhe a opção de criar nova categoria, **When** informa o nome da nova categoria e salva, **Then** o lançamento utiliza a nova categoria informada.

---

### User Story 3 - Digitar Valor com Máscara Monetária BRL (Priority: P1)

Como usuário, eu quero digitar o valor com máscara de dinheiro em Real (R$), para entender imediatamente o formato e evitar entradas inválidas.

**Why this priority**: O campo de valor é central para qualquer lançamento e erros de formatação afetam diretamente confiança e precisão da transação.

**Independent Validation**: Pode ser validada digitando diferentes sequências numéricas no campo de valor e confirmando apresentação monetária em BRL durante edição e valor numérico correto no envio.

**Acceptance Scenarios**:

1. **Given** que o usuário começa a digitar no campo de valor, **When** os dígitos são inseridos, **Then** o campo exibe o valor formatado em moeda BRL com prefixo R$.
2. **Given** que o usuário apaga ou altera dígitos, **When** a edição ocorre, **Then** a máscara é atualizada de forma consistente sem quebrar o fluxo de digitação.
3. **Given** que o usuário salva a transação com valor mascarado, **When** o envio acontece, **Then** o valor persistido representa corretamente o montante exibido.

---

### User Story 4 - Harmonizar Ações da Dashboard (Priority: P2)

Como usuário, eu quero os botões Transações e Nova Transação com padding igual e estilo visual harmônico, para ter interface mais consistente e legível.

**Why this priority**: É refinamento visual importante, mas secundário em relação ao fluxo de criação de transações.

**Independent Validation**: Pode ser validada abrindo a dashboard e comparando os dois botões lado a lado para confirmar padding equivalente e cor suave semelhante no botão Transações.

**Acceptance Scenarios**:

1. **Given** que o usuário visualiza os dois botões na dashboard, **When** compara dimensões internas, **Then** Transações e Nova Transação apresentam padding equivalente.
2. **Given** que o usuário visualiza o botão Transações, **When** compara com o botão Nova Transação, **Then** o botão Transações usa variante secundária fixa da mesma família visual, mantendo distinção hierárquica.

---

### Edge Cases

- Usuário alterna repetidamente entre Despesa e Receita: o estado ativo deve continuar único e estável.
- Usuário escolhe criar nova categoria e deixa o nome vazio: sistema deve impedir envio e mostrar orientação clara.
- Usuário tenta criar categoria com variação apenas de caixa ou espaços: sistema deve bloquear por duplicidade normalizada.
- Usuário digita valor com muitos dígitos: máscara deve continuar legível e sem truncamento indevido.
- Usuário apaga totalmente o campo de valor: sistema deve tratar como vazio e não como valor monetário válido.
- Em telas menores, os botões da dashboard devem manter padding equivalente sem quebra visual.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: System MUST substituir o seletor único de tipo de transação por duas opções selecionáveis explícitas: Despesa e Receita.
- **FR-002**: System MUST garantir seleção exclusiva entre Despesa e Receita, mantendo apenas uma opção ativa por vez.
- **FR-003**: System MUST aplicar ao lançamento salvo o tipo correspondente à opção ativa no momento do envio.
- **FR-004**: System MUST substituir o campo livre de categoria por um seletor contendo categorias padrão agrupadas por tipo de transação e ordenadas alfabeticamente dentro de cada grupo.
- **FR-005**: System MUST incluir no seletor de categoria uma opção para criar nova categoria.
- **FR-006**: System MUST permitir informar o nome da nova categoria quando a opção de criação for escolhida, criar e salvar essa categoria na lista padrão, e deixá-la selecionada no lançamento atual antes do envio.
- **FR-007**: System MUST aplicar máscara monetária BRL (R$) no campo de valor durante a digitação usando entrada contínua em centavos (ex.: 1234 -> R$ 12,34).
- **FR-008**: System MUST preservar consistência entre o valor exibido com máscara e o valor efetivamente enviado no lançamento.
- **FR-009**: System MUST aplicar os mesmos valores de padding horizontal e vertical nos botões Transações e Nova Transação em todos os breakpoints suportados (mobile, tablet e desktop), preservando equivalência visual.
- **FR-010**: System MUST ajustar o botão Transações para variante secundária fixa do design system na mesma família visual do botão Nova Transação, preservando diferenciação visual entre ação secundária e primária.
- **FR-011**: System MUST bloquear criação de categoria duplicada usando comparação normalizada (sem diferença entre maiúsculas/minúsculas e sem espaços extras no início/fim).
- **FR-012**: System MUST impedir envio quando o usuário escolher criar nova categoria e informar nome vazio ou apenas com espaços, exibindo orientação clara de correção.
- **FR-013**: System MUST tratar campo de valor totalmente apagado como vazio inválido e impedir envio até que um valor monetário válido seja informado.

### Key Entities *(include if feature involves data)*

- **TransactionTypeToggleState**: representa o estado de seleção exclusiva entre Despesa e Receita.
- **CategorySelectionMode**: representa o modo de categoria escolhida, podendo ser categoria padrão ou criação de nova categoria.
- **BrlCurrencyInputState**: representa o valor digitado, sua exibição mascarada em BRL e o valor final usado no envio.
- **DashboardActionButtonVisualProfile**: representa regras visuais compartilhadas de padding e harmonia de cor dos botões Transações e Nova Transação.

### Assumptions & Dependencies

- A lista de categorias padrão já existe no produto e pode ser reutilizada no novo seletor.
- A opção de criar nova categoria ocorre no mesmo fluxo da tela de nova transação.
- O refinamento visual da dashboard não altera destino de navegação dos botões.
- A variante secundária fixa do design system já está disponível para uso no botão Transações.
- Validação e evidência desta feature seguirão abordagem manual orientada a cenários.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: Em validação manual, 100% dos cenários de tipo de transação confirmam seleção exclusiva entre Despesa e Receita e persistência correta do tipo salvo.
- **SC-002**: Em validação manual, 100% dos cenários de categoria confirmam escolha de categoria padrão e criação de nova categoria com persistência na lista padrão, seleção automática no lançamento atual e envio válido.
- **SC-003**: Em validação manual, 100% dos testes de digitação no campo de valor exibem máscara BRL com prefixo R$ usando entrada contínua em centavos e mantêm consistência com o valor enviado.
- **SC-004**: Em validação manual, 100% das verificações na dashboard confirmam igualdade de valores de padding horizontal e vertical entre os botões Transações e Nova Transação em mobile, tablet e desktop.
- **SC-005**: Em validação manual, 100% das verificações visuais confirmam uso da variante secundária fixa do design system no botão Transações, na mesma família visual do botão Nova Transação e sem perda de distinção da ação principal.
- **SC-006**: Em validação manual, 100% dos testes de tentativa de categoria duplicada confirmam bloqueio quando houver equivalência por normalização de caixa e espaços.
- **SC-007**: Em validação manual, 100% dos testes de criação de nova categoria com nome vazio ou apenas espaços confirmam bloqueio de envio e exibição de orientação clara.
- **SC-008**: Em validação manual, 100% dos testes com campo de valor totalmente apagado confirmam bloqueio de envio até preenchimento de valor monetário válido.
