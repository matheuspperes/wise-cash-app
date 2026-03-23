# Feature Specification: Refine Dashboard and Transactions Navigation Layout

**Feature Branch**: `013-refine-dashboard-transactions-layout`  
**Created**: 2026-03-23  
**Status**: Tasks Ready  
**Input**: User description: "Reposicionar seletor de período ao lado da legenda do gráfico; ajustar espaço entre cards de saldo; corrigir Nova Transação com acento; mover botão Nova Transação para final da página de transações; criar botão simples ao lado do título Transações para voltar para dashboard"

## Clarifications

### Session 2026-03-23

- Q: Qual deve ser o destino/comportamento do botão Nova Transação no final da página de transações? → A: Navegar para /transactions?view=new (mesmo fluxo atual de criar transação).
- Q: Ao mover Nova Transação para o final da página de transações, o CTA equivalente no topo deve ficar como? → A: Remover o CTA do topo e manter apenas o CTA no final da página.
- Q: Qual rota exata o botão de retorno ao lado de Transações deve abrir? → A: Navegar sempre para `/` (dashboard principal).
- Q: No mobile (largura pequena), quando não couber lado a lado, como o seletor de período deve se comportar em relação à legenda do gráfico? → A: Permanecer na mesma linha, reduzindo largura do seletor ao mínimo.
- Q: Qual critério deve validar que o espaço entre os dois cards de saldo ficou equilibrado no desktop? → A: Usar o espaçamento padrão entre blocos da dashboard (16px, tolerância ±4px).

## User Scenarios & Validation *(mandatory)*

### User Story 1 - Reorganizar controles e composição no dashboard (Priority: P1)

Como usuário, eu quero ver o seletor de período ao lado da legenda do gráfico e os cards de saldo sem espaços visuais indevidos, para ler indicadores e contexto temporal com mais clareza.

**Why this priority**: Esta área concentra a leitura principal da dashboard; problemas de posicionamento impactam entendimento imediato.

**Independent Validation**: Pode ser validada abrindo a dashboard e confirmando novo posicionamento do seletor e eliminação do espaço vazio entre cards em desktop e mobile.

**Acceptance Scenarios**:

1. **Given** que o usuário visualiza a seção do gráfico, **When** observa legenda e filtro de período, **Then** o seletor de período aparece ao lado da legenda sem sobreposição.
2. **Given** que os cards de saldo são renderizados, **When** o usuário compara a distância entre o card esquerdo e o histórico, **Then** o espaço vazio residual é eliminado ou reduzido para manter composição equilibrada.
3. **Given** que o layout é renderizado em breakpoints suportados, **When** o usuário navega entre desktop/tablet/mobile, **Then** a reorganização permanece legível e funcional.

---

### User Story 2 - Padronizar rótulos de CTA em português correto (Priority: P2)

Como usuário, eu quero ver o texto "Nova Transação" com acento correto, para manter consistência linguística e profissionalismo visual.

**Why this priority**: Corrige qualidade de interface e reduz ruído de linguagem em ação principal recorrente.

**Independent Validation**: Pode ser validada conferindo todos os pontos alterados na dashboard e transações para garantir uso de "Nova Transação" com acento.

**Acceptance Scenarios**:

1. **Given** que o usuário visualiza CTAs de criação, **When** verifica os labels na dashboard e em transações, **Then** o texto exibido é "Nova Transação" com acento e sem variações incorretas.

---

### User Story 3 - Reorganizar ações na página de transações (Priority: P3)

Como usuário, eu quero o botão "Nova Transação" no final da página de transações e um atalho ao lado do título para voltar ao dashboard, para navegar entre fluxos com mais previsibilidade.

**Why this priority**: A navegação entre dashboard e transações fica mais direta e os CTAs ficam mais coerentes com o fluxo da tela.

**Independent Validation**: Pode ser validada abrindo /transactions e verificando o botão de retorno junto ao título e o botão de nova transação posicionado ao final da página.

**Acceptance Scenarios**:

1. **Given** que o usuário abre /transactions, **When** observa o topo da página, **Then** existe apenas um botão simples ao lado de "Transações" com indicação de voltar/dashboard, sem CTA de "Nova Transação" no topo.
2. **Given** que o usuário percorre a página de transações, **When** chega ao final da tela, **Then** encontra o botão "Nova Transação" posicionado no final da página.
3. **Given** que o usuário clica no botão de voltar/dashboard, **When** a navegação ocorre, **Then** o destino abre sempre a rota `/` da dashboard principal.

---

### User Story 4 - Preservar comportamento funcional com novo layout (Priority: P3)

Como usuário, eu quero que os ajustes de layout não alterem os comportamentos atuais de filtros e navegações existentes, para manter o fluxo habitual sem regressão.

**Why this priority**: Mudança visual sem paridade funcional gera regressão e quebra de expectativa.

**Independent Validation**: Pode ser validada executando filtros e navegações antes/depois dos ajustes e comparando os destinos esperados.

**Acceptance Scenarios**:

1. **Given** que o usuário altera o período, **When** os dados atualizam, **Then** o comportamento de filtro permanece igual ao fluxo atual.
2. **Given** que o usuário usa os novos CTAs, **When** clica em "Nova Transação" ou retorno para dashboard, **Then** os destinos são corretos e sem alteração indesejada de estado.

---

### Edge Cases

- Larguras pequenas: seletor deve permanecer na mesma linha da legenda, reduzindo largura ao mínimo necessário sem sobrepor labels ou controles.
- Legendas mais longas: seletor deve manter legibilidade e foco de interação.
- Conteúdo extenso em /transactions: botão final de "Nova Transação" deve permanecer facilmente localizável no fim da página.
- Navegação de retorno: botão de voltar/dashboard deve apontar sempre para a dashboard principal, independentemente do estado da view de transações.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: System MUST posicionar o seletor de período ao lado da legenda do gráfico na dashboard.
- **FR-002**: System MUST permitir ajuste de largura do seletor de período para acomodar a nova composição sem sobreposição.
- **FR-003**: System MUST corrigir o espaço vazio entre o card "Saldo líquido atual" e o card "Saldo líquido histórico" na dashboard para o espaçamento padrão entre blocos da dashboard (16px, tolerância ±4px) no desktop.
- **FR-004**: System MUST permitir ajuste horizontal do card esquerdo para atender ao espaçamento padrão definido sem quebrar a composição responsiva.
- **FR-005**: System MUST substituir qualquer ocorrência de "Nova Transacao" sem acento por "Nova Transação" com acento nas superfícies afetadas por esta feature.
- **FR-006**: System MUST posicionar um botão "Nova Transação" no final da página /transactions com navegação para `/transactions?view=new`.
- **FR-007**: System MUST exibir na página /transactions um botão simples ao lado do título "Transações" com rótulo "Voltar ao Dashboard".
- **FR-008**: System MUST fazer o botão ao lado do título em /transactions navegar sempre para a rota `/` da dashboard principal.
- **FR-009**: System MUST preservar o comportamento funcional atual da seleção de período após a reorganização visual.
- **FR-010**: System MUST preservar a paridade funcional pós-reposicionamento, sem alterar estado ou comportamento além dos destinos já definidos para retorno (`/`) e criação (`/transactions?view=new`).
- **FR-011**: System MUST remover da área de topo de /transactions qualquer CTA duplicado de "Nova Transação", mantendo a ação de criação apenas no final da página.
- **FR-012**: System MUST manter, em larguras pequenas, o seletor de período na mesma linha da legenda do gráfico, reduzindo sua largura ao mínimo necessário sem sobreposição.

### Key Entities *(include if feature involves data)*

- **DashboardChartControlArea**: área visual que agrupa legenda do gráfico e seletor de período com regras de proximidade e responsividade.
- **DashboardBalanceCardsGapProfile**: estado visual da distância entre card de saldo atual e card histórico, incluindo ajustes horizontais do card esquerdo.
- **TransactionsPageNavigationHeader**: cabeçalho da página /transactions com título e botão de retorno para dashboard.
- **TransactionsPageFooterCreateCTA**: CTA "Nova Transação" no final da página /transactions.

### Assumptions & Dependencies

- A feature é de refinamento visual e navegação, sem alteração de cálculo financeiro.
- Os destinos atuais de dashboard e fluxo de nova transação permanecem válidos e devem ser reaproveitados.
- A consistência de idioma português deve ser mantida nas labels alteradas.
- Validação segue abordagem manual orientada a cenário conforme constituição do projeto.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: Em validação manual, 100% dos cenários de dashboard confirmam seletor de período ao lado da legenda do gráfico sem sobreposição nos breakpoints alvo: mobile (<=767px), tablet (768-1023px) e desktop (>=1024px).
- **SC-002**: Em validação manual, 100% dos cenários de dashboard no desktop confirmam espaçamento entre os cards de saldo em 16px com tolerância de ±4px, sem gap adicional fora do intervalo de 12-20px.
- **SC-003**: Em validação manual, 100% dos labels alterados pela feature exibem "Nova Transação" com acento corretamente.
- **SC-004**: Em validação manual, 100% dos cenários em /transactions confirmam botão de retorno ao lado do título e botão "Nova Transação" no final da página.
- **SC-005**: Em validação manual, 100% dos testes de clique confirmam os destinos corretos definidos: botão de retorno para `/` e CTA "Nova Transação" para `/transactions?view=new`.
