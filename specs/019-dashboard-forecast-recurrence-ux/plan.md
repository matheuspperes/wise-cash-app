# Implementation Plan: Dashboard Forecast e UX de Recorrencia (Ajuste de Linha Única)

**Branch**: `019-dashboard-forecast-recurrence-ux` | **Date**: 2026-04-06 | **Spec**: `/specs/019-dashboard-forecast-recurrence-ux/spec.md`
**Input**: Feature specification from `/specs/019-dashboard-forecast-recurrence-ux/spec.md` + solicitacao de manter a tag `<p>` explicativa e o respectivo tooltip na mesma linha do select, com icone menor se necessario, preservando alinhamento e simetria do formulario

**Note**: This template is filled in by the `/speckit.plan` command. See `.specify/templates/plan-template.md` for the execution workflow.

## Summary

Aplicar um refinamento localizado no formulario de recorrencia para que a tag `<p>` explicativa e o tooltip fiquem na mesma linha do select correspondente, com gatilho compacto e espacamento controlado, sem quebrar a largura util do campo nem o alinhamento visual entre `Tipo de recorrencia` e `Modo da recorrencia`. A mudanca nao altera regras de negocio, apenas composicao visual, acessibilidade e clareza do layout.

## Technical Context

**Language/Version**: TypeScript 5.x, React 18, Next.js 15 (App Router)  
**Primary Dependencies**: React Hook Form, Zod, componentes UI internos, Tailwind utilities existentes  
**Storage**: IndexedDB local-first (Dexie), sem alteracoes de schema  
**Validation**: Validacao manual guiada por checklist em `manual-validation/dashboard-forecast-recurrence-ux/`  
**Target Platform**: Web responsiva (desktop/mobile)
**Project Type**: Aplicacao web full-stack com camada de UI no cliente  
**Performance Goals**: Refinamento de layout sem impacto perceptivel em renderizacao, foco ou interacao  
**Constraints**: Sem testes automatizados por constituicao; nao reduzir area clicavel do select; manter comportamento de tooltip por click/tap, outside click e ESC  
**Scale/Scope**: Mudanca localizada em `components/transactions/transaction-form.tsx`, `components/ui/simple-tooltip.tsx` e documentacao manual da feature

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

- Clean Code: encapsular a composicao de label+select+tooltip em um wrapper claro e reutilizavel.
- Intentional Simplicity: ajustar apenas classes, alinhamento e dimensoes, sem introduzir infraestrutura nova.
- Personal-Use Value: melhora leitura, densidade visual e descobribilidade do formulario no uso diario.
- Practical Modernity: manter suporte a teclado, click/tap e fechamento padrao do tooltip.
- No Automated Tests: validacao manual documentada.

Gate status before Phase 0: PASS

## Project Structure

### Documentation (this feature)

```text
specs/019-dashboard-forecast-recurrence-ux/
├── plan.md
├── research.md
├── data-model.md
├── quickstart.md
├── contracts/
└── tasks.md
```

### Source Code (repository root)

```text
components/
├── transactions/
│   └── transaction-form.tsx
└── ui/
    └── simple-tooltip.tsx

lib/
└── ui/
    └── recurrence-tooltip-content.ts

manual-validation/
└── dashboard-forecast-recurrence-ux/
```

**Structure Decision**: concentrar a mudanca em componentes ja existentes, com ajuste do gatilho de tooltip e do espaçamento/width do select no mesmo bloco visual.

## Phase 0: Research Output

Arquivo gerado: `/specs/019-dashboard-forecast-recurrence-ux/research.md`

Resultados consolidados:
- Tooltip permanece acoplado ao respectivo select na mesma linha.
- O gatilho deve ser compacto para evitar quebras de largura.
- O wrapper de label+select+tooltip deve ser simetrico entre `Tipo` e `Modo`.
- O comportamento funcional do tooltip nao muda.

Pendencias de clarificacao: nenhuma.

## Phase 1: Design & Contracts Output

Arquivos gerados/atualizados:
- `/specs/019-dashboard-forecast-recurrence-ux/data-model.md`
- `/specs/019-dashboard-forecast-recurrence-ux/contracts/dashboard-recurrence-ux-contract.md`
- `/specs/019-dashboard-forecast-recurrence-ux/quickstart.md`

### Impacto por Componente

- `components/transactions/transaction-form.tsx`
  - manter a `<p>` explicativa, o select e o tooltip na mesma linha usando um wrapper horizontal consistente.
  - aplicar largura reduzida responsiva ao select para acomodar o gatilho compacto.
  - preservar a ordem de leitura e a area clicavel do controle.
- `components/ui/simple-tooltip.tsx`
  - preservar variante compacta do icone/gatilho.
  - manter abertura por click/tap e fechamento por outside click/ESC.
  - garantir o tooltip renderizado nao empurre o layout do formulario.
- `lib/ui/recurrence-tooltip-content.ts`
  - manter textos em portugues corrigido e sem alteracao semantica.

### Ajustes de Layout/Spacing/Alinhamento

- Colocar a `<p>` explicativa, o select e o tooltip em uma unica linha visual por campo.
- Utilizar um wrapper flexivel com alinhamento central e `gap` curto para evitar quebra de linha.
- Reduzir a largura util do select apenas o suficiente para abrir espaco ao gatilho, sem truncar a leitura do valor selecionado.
- Garantir que o mesmo padrao funcione para `Tipo de recorrencia` e `Modo da recorrencia`.
- Validar o resultado em desktop e mobile, especialmente em larguras estreitas.

### Estrategia de Tooltip Sem Desalinhamento

- Preferir um gatilho pequeno alinhado ao final da linha da `<p>` explicativa e do select.
- O tooltip deve abrir fora do fluxo, sem reservar nova linha.
- Se necessario, manter um trigger menor em desktop/mobile para preservar densidade visual.
- Evitar que o icone ou o popup alterem a largura da coluna do formulario.

### Acessibilidade

- Trigger com `aria-label` descritivo e `aria-expanded` atualizado.
- Tooltip acessivel por teclado, com fechamento por ESC.
- O select nao deve perder foco ou area util por causa do gatilho.
- A ordem de tabulacao deve permanecer previsivel: campo, gatilho, proximos controles.

### Risco E Mitigacao

- Risco: o select ficar estreito demais em telas pequenas.
  - Mitigacao: usar largura responsiva com limite minimo util e revisar em mobile.
- Risco: o tooltip sair da mesma linha em breakpoints estreitos.
  - Mitigacao: validar o wrapper horizontal em mobile antes de concluir.
- Risco: sobreposicao visual entre gatilho e valor selecionado.
  - Mitigacao: reduzir apenas o necessario e usar gap curto mas consistente.
- Risco: regressao de acessibilidade por ajuste visual excessivo.
  - Mitigacao: confirmar tab, click/tap e ESC no roteiro manual.

### Validacao Manual

- Confirmar que a `<p>` explicativa e o tooltip permanecem na mesma linha do select em `Tipo` e `Modo`.
- Confirmar que o gatilho compacto nao quebra a largura util do select.
- Confirmar simetria visual entre os dois blocos de campo.
- Confirmar comportamento de abertura e fechamento por click/tap, outside click e ESC.
- Confirmar que o formulario permanece legivel em desktop e mobile.

## Constitution Check (Post-Design)

Gate status after Phase 1: PASS
- Clean Code: wrapper horizontal reduz divergencia entre campos equivalentes.
- Intentional Simplicity: mudanca restrita a classes e estrutura visual.
- Personal-Use Value: layout mais denso e legivel.
- Practical Modernity: interacoes acessiveis preservadas.
- No Automated Tests: validacao manual mantida como criterio principal.

## Complexity Tracking

Nenhuma violacao da constituicao identificada.
