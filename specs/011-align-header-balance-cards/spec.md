# Feature Specification: Align Header and Balance Cards

**Feature Branch**: `011-align-header-balance-cards`  
**Created**: 2026-03-23  
**Status**: Ready for Implementation  
**Input**: User description: "Design: Coloque o seletor de período e o botão de adicionar na mesma linha horizontal do título, mantenha o filtro e o botão de adicionar na direita e os títulos na esquerda; Centralize verticalmente os 2 saldos igualmente e horizontalmente a esquerda de cada card considerando não deixar os textos 'soltos'"

## Clarifications

### Session 2026-03-23

- Q: Qual contexto visual deve ser considerado para o alinhamento solicitado? -> A: Aplicar no dashboard principal, mantendo consistencia entre desktop e mobile sem alterar comportamento funcional.
- Q: Como deve se comportar a linha do header em telas pequenas? -> A: Desktop/tablet em uma linha; mobile com controles na linha seguinte, mantendo titulo a esquerda e controles alinhados a direita no bloco.
- Q: Qual criterio objetivo define o equilibrio entre os dois cards de saldo? -> A: Bloco principal (titulo + valor) com mesma altura util e mesmo offset horizontal interno em ambos os cards.
- Q: Em quais cards o alinhamento a esquerda deve ser aplicado? -> A: Aplicar em ambos os cards de saldo (saldo liquido atual e saldo liquido historico).

## User Scenarios & Validation *(mandatory)*

### User Story 1 - Alinhar titulo e controles no topo (Priority: P1)

Como usuario, eu quero ver o titulo na esquerda e os controles de periodo/adicao na direita na mesma linha horizontal, para leitura e acao rapidas sem quebra visual.

**Why this priority**: O topo do dashboard e o primeiro ponto de orientacao e acao; desalinhamento ali aumenta friccao imediatamente.

**Independent Validation**: Pode ser validada abrindo o dashboard em desktop e mobile e verificando alinhamento horizontal no topo com distribuicao esquerda/direita consistente.

**Acceptance Scenarios**:

1. **Given** que o usuario abre o dashboard em largura desktop, **When** observa a barra superior principal, **Then** o titulo fica na esquerda e seletor de periodo + botao de adicionar ficam na direita na mesma linha horizontal.
2. **Given** que o usuario alterna o periodo, **When** a interface atualiza, **Then** o alinhamento da barra superior permanece estavel sem sobreposicao de elementos.
3. **Given** que o usuario abre em tela estreita, **When** a barra superior renderiza, **Then** o titulo permanece na esquerda e os controles descem para a linha seguinte alinhados a direita sem perda de legibilidade.

---

### User Story 2 - Centralizar os dois saldos de forma equilibrada (Priority: P2)

Como usuario, eu quero que os dois cards de saldo tenham alinhamento vertical equivalente e textos ancorados a esquerda dentro de cada card, para comparacao visual imediata.

**Why this priority**: Esses cards representam os indicadores principais; desalinhamento reduz compreensao e passa sensacao de interface quebrada.

**Independent Validation**: Pode ser validada comparando os dois cards lado a lado e conferindo alinhamento vertical equivalente e ancoragem horizontal a esquerda de titulos/valores.

**Acceptance Scenarios**:

1. **Given** que os dois cards de saldo estao visiveis, **When** o usuario compara altura visual de titulos e valores, **Then** ambos exibem bloco principal com mesma altura util e centralizacao vertical equivalente.
2. **Given** que o usuario observa o conteudo interno dos cards, **When** le os textos e valores, **Then** os blocos de texto permanecem alinhados horizontalmente a esquerda nos dois cards sem aspecto de elementos soltos.

---

### User Story 3 - Preservar comportamento funcional ao ajustar layout (Priority: P3)

Como usuario, eu quero que os ajustes visuais nao alterem filtros, selecao de periodo e acao de adicionar, para manter o fluxo atual intacto.

**Why this priority**: Mudancas de layout nao devem introduzir regressao funcional em acoes ja utilizadas.

**Independent Validation**: Pode ser validada executando o fluxo de troca de periodo e clique no botao de adicionar antes/depois do ajuste visual e comparando resultado esperado.

**Acceptance Scenarios**:

1. **Given** que o usuario muda o periodo selecionado, **When** o dashboard atualiza dados, **Then** o comportamento funcional permanece igual ao fluxo atual.
2. **Given** que o usuario clica no botao de adicionar, **When** a navegacao ocorre, **Then** o destino permanece o mesmo definido atualmente.

---

### Edge Cases

- Texto de titulo maior que o habitual: a barra superior deve manter distribuicao esquerda/direita sem sobrepor seletor/botao.
- Valores de saldo com numeros longos: conteudo deve permanecer ancorado a esquerda sem invadir espacos adjacentes.
- Larguras intermediarias de viewport: componentes devem se reorganizar sem quebra abrupta de hierarquia visual.
- Estado de carregamento nos cards: alinhamento visual base deve continuar consistente com o estado pronto.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: System MUST render dashboard title area with title content anchored on the left side.
- **FR-002**: System MUST render period selector and add-action button in the right side of the same horizontal header row as the title in desktop context.
- **FR-003**: System MUST preserve clear left/right hierarchy of title vs controls in responsive breakpoints without overlap, with desktop/tablet in one row and mobile in two rows with right-aligned controls.
- **FR-004**: System MUST maintain stable horizontal alignment of header elements when period value changes.
- **FR-005**: System MUST present the two balance cards with equivalent vertical centering behavior for their main content blocks.
- **FR-006**: System MUST align textual content inside both balance cards to the left using the same internal horizontal offset for each card main content block.
- **FR-007**: System MUST preserve existing functional behavior of period selection after layout adjustments.
- **FR-008**: System MUST preserve existing functional behavior of the add-action navigation after layout adjustments.
- **FR-009**: System MUST keep layout readability in loading and ready states for the two balance cards.

### Assumptions & Dependencies

- Scope is limited to dashboard layout and alignment, without changes to data calculation logic.
- Existing controls and routing behavior remain the source of truth and are only repositioned visually.
- Typography and spacing tokens from current design system remain in use.
- Content language remains Portuguese in user-visible labels.

### Key Entities *(include if feature involves data)*

- **Header Layout Region**: visual container that holds title area on left and control area (period selector + add button) on right.
- **Header Control Cluster**: grouped controls in top row that must remain horizontally aligned and functionally unchanged.
- **Balance Card Content Block**: textual and numeric content area in each balance card requiring equivalent vertical centering and left anchoring.
- **Responsive Alignment State**: breakpoint-dependent arrangement rules preserving hierarchy and readability.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: In manual validation, 100% of desktop checks confirm title-left and controls-right alignment in one horizontal header row.
- **SC-002**: In manual validation, 100% of responsive checks confirm no overlap between title and control cluster across target breakpoints, including controlled two-row behavior on mobile.
- **SC-003**: In manual validation, 100% of balance-card checks confirm equivalent vertical centering and same main-content useful-height between both cards.
- **SC-004**: In manual validation, 100% of balance-card checks confirm left-anchored labels and values in both cards with no visually detached text blocks.
- **SC-005**: In manual validation, 100% of period-change and add-action checks confirm unchanged functional behavior after layout adjustments.
