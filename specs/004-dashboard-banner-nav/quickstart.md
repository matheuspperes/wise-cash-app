# Quickstart: Refino Visual Banner e Dados do Dashboard

## Objetivo
Aplicar ajustes visuais e textuais do dashboard/transacoes com simulacao controlada de dados para demonstracao do grafico.

## Pre-requisitos
- Node.js 20+
- Dependencias instaladas (`npm install`)
- Projeto executando localmente

## Setup
1. Executar `npm install`.
2. Executar `npm run dev`.
3. Abrir dashboard e tela de transacoes em desktop e mobile.

## Ordem recomendada de implementacao
1. Atualizar cabecalho do dashboard com banner "Wise Cash" e nav superior (Dashboard/Transacoes).
2. Remover texto legado "Visao financeira com carregamento suave".
3. Ajustar CTA para botao circular com "+" e roxo mais escuro.
4. Aplicar fundo roxo levemente manchado mantendo legibilidade.
5. Corrigir copy nas telas alteradas (FR-007), incluindo "Observacao" no lugar de "Notas".
6. Ajustar formulario de transacoes: placeholder "Categoria" e botao "Salvar" compacto moderado.
7. Implementar demo mode para serie simulada no grafico mantendo dados reais.
8. Inserir dataset demo com 4 itens completos (2 ganhos, 2 gastos) distribuido entre fevereiro e marco.

## Validacao manual minima
1. Verificar banner + nav com dois links no topo do dashboard.
2. Verificar ausencia da frase removida.
3. Verificar CTA circular "+" e navegacao para fluxo existente de transacao.
4. Verificar fundo roxo texturizado sem queda de contraste.
5. Verificar textos principais corrigidos: Dashboard, Transacoes, Categoria, Observacao, Salvar, Wise Cash.
6. Verificar campo "Categoria" e botao "Salvar" compacto na tela de transacoes.
7. Ativar demo mode e confirmar serie real + demo com distincao visual clara.
8. Desativar demo mode e confirmar remocao da serie demo, mantendo dados reais.

## Evidencias esperadas
- Checklist de validacao por historia de usuario.
- Registro de conformidade do contrato em `specs/004-dashboard-banner-nav/contracts/dashboard-banner-nav-contract.md`.
- Registro de criterios de sucesso SC-001 a SC-007 em pasta de validacao manual da feature.
