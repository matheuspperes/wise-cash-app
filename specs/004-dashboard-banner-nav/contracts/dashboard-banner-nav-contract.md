# Contract: Dashboard Banner, Nav, Copy e Simulacao

## 1. Scope
Este contrato define os comportamentos obrigatorios de UI para a feature 004 nas telas de dashboard e transacoes.

## 2. Header e Nav
- O topo MUST exibir banner com texto "Wise Cash".
- A barra superior MUST conter apenas dois links visiveis: "Dashboard" e "Transacoes".
- A frase "Visao financeira com carregamento suave" MUST NOT aparecer na interface final.

## 3. CTA Principal
- O CTA principal do dashboard MUST ser um botao circular com simbolo "+".
- O CTA MUST usar roxo levemente mais escuro que o roxo principal do tema.
- O CTA MUST encaminhar para o fluxo existente de criacao de transacao.

## 4. Fundo e Legibilidade
- O fundo da tela MUST aplicar efeito roxo levemente manchado/texturizado.
- A mudanca visual MUST preservar leitura clara de textos e componentes interativos.

## 5. Copy e Formulario (Transacoes)
- Placeholder de categoria MUST ser exatamente "Categoria".
- Campo antes chamado "Notas" MUST aparecer como "Observacao".
- Botao "Salvar" MUST usar variante compacta moderada (menor que estado anterior, ainda legivel).
- Textos principais MUST ser revisados conforme FR-007:
  - Dashboard
  - Transacoes
  - Categoria
  - Observacao
  - Salvar
  - Wise Cash
  - mensagens de carregamento/erro nas telas alteradas

## 6. Simulacao de Dados
- Simulacao MUST ativar somente em modo demonstracao (toggle/configuracao explicita).
- Com demo mode ativo, grafico MUST manter dados reais e adicionar dados simulados.
- Serie demo MUST ser distinguivel por legenda/estilo visual claro.
- Dataset demo MUST conter exatamente 4 itens completos:
  - 2 ganhos
  - 2 gastos
  - distribuicao entre fevereiro e marco
  - todos os campos de item preenchidos

## 7. Validation Evidence (Manual)
Validacao manual MUST registrar:
1. Presenca do banner e barra de navegacao com dois links.
2. Ausencia da frase removida.
3. CTA circular "+" com cor correta e navegacao funcional.
4. Confirmacao de copy corrigida na lista obrigatoria.
5. Confirmacao de categoria/observacao/salvar compacto na tela de transacoes.
6. Confirmacao de grafico com real + demo distinguivel no modo demonstracao.
7. Confirmacao de grafico sem serie demo fora do modo demonstracao.
