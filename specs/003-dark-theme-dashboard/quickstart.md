# Quickstart: Modernizacao Visual do Dashboard

## Objetivo
Guiar implementacao e validacao manual da nova fundacao visual do dashboard com dark theme padrao, motion suave e UX de dados consistente.

## Pre-requisitos
- Node.js 20+
- Dependencias instaladas com npm
- Ambiente local funcional do projeto

## Setup
1. Executar `npm install`.
2. Garantir que dependencias de UI e UX estejam disponiveis (shadcn/Radix/CVA/tailwind-merge/lucide-react, framer-motion, react-hook-form, resolvers, next-themes).
3. Executar `npm run dev`.

## Fluxo de implementacao (ordem recomendada)
1. Consolidar tokens e tipografia (Geist + cores/radius/spacing/shadow/duration).
2. Aplicar tema dark padrao com respeito a preferencia salva.
3. Criar base de componentes UI (button/input/select/dialog/toast/skeleton) com estados de foco e disabled.
4. Padronizar Data UX em telas alvo com TanStack Query (isLoading/isFetching/isError).
5. Refinar grafico com tooltip custom, gradientes suaves e animacao de mount/update.
6. Ajustar CTA de nova transacao (desktop topo, mobile fixo inferior) reutilizando fluxo existente.
7. Remover dados de teste da UI visivel do dashboard e garantir empty states reais.

## Validacao manual minima
1. Sessao nova abre com tema dark.
2. Sessao com preferencia salva respeita preferencia.
3. Estados de loading usam skeleton sem layout shift perceptivel.
4. Erros de query exibem mensagem clara e possibilidade de nova tentativa.
5. Grafico atualiza com transicao suave e tooltip legivel no dark theme.
6. CTA de nova transacao e facilmente encontrado em desktop e mobile.
7. Clique/toque no CTA leva ao fluxo existente de criar transacao.
8. Dashboard nao exibe dados de teste em componentes visiveis.

## Evidencias esperadas para implementacao
- Capturas ou notas de validacao manual para desktop e mobile.
- Lista curta de verificacao dos SC-001 a SC-006.
- Registro de conformidade com contrato de UI em `contracts/dashboard-ui-contract.md`.
- Evidencias consolidadas em `manual-validation/dark-theme-dashboard/`:
	- `us1-checklist.md`, `us1-results.md`
	- `us2-checklist.md`, `us2-results.md`
	- `us3-checklist.md`, `us3-results.md`
	- `regression-checklist.md`, `regression-summary.md`
	- `contract-compliance.md`, `fr011-feedback-timing.md`, `sc-measurement.md`
