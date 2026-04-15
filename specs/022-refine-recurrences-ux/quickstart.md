# Quickstart - Refinar Experiencia de Recorrencias

## 1. Objetivo
Validar manualmente os refinamentos da tela de recorrencias: filtro de pendencias por mes atual, ocultacao de bloco vazio, paridade de UX/analytics com historico, acessibilidade/posicionamento de tooltips, remocao de copys proibidas e alinhamento visual do grid na nova transacao.

## 2. Preparacao
1. Instalar dependencias do projeto, se necessario.
2. Executar a aplicacao local em modo desenvolvimento.
3. Popular dados com recorrencias e pendencias em meses diferentes (incluindo mes atual e outro mes).
4. Garantir ambiente com suporte a simulacao de data local, quando aplicavel.

## 3. Cenarios de validacao manual

### Cenario A - Filtro de pendencias por mes/ano atual
1. Abrir `/transactions?view=recurrences`.
2. Confirmar que somente pendencias com `scheduledDate` no mes+ano atuais (fuso local) aparecem no bloco de confirmacoes.
3. Validar que pendencias de meses diferentes nao sao exibidas.

### Cenario B - Bloco vazio nao renderizado
1. Ajustar dados para nao haver pendencias do mes atual.
2. Recarregar `/transactions?view=recurrences`.
3. Confirmar que o bloco de pendencias nao aparece e nao deixa espaco em branco.

### Cenario C - Reuso de UX de editar/excluir do historico
1. Na lista de recorrencias, acionar `Editar` em um item.
2. Confirmar que o mecanismo (inline/drawer) e os controles sao os mesmos do historico.
3. Confirmar destaque visual do item em edicao.
4. Alterar valor/quantia e salvar; validar persistencia local.
5. Acionar `Excluir`; validar mesmo prompt e mesmos caminhos de confirmacao/cancelamento do historico.

### Cenario D - Paridade de analytics na exclusao
1. Abrir fluxo de exclusao de recorrencia.
2. Cancelar uma tentativa e registrar evento emitido.
3. Confirmar uma tentativa e registrar evento emitido.
4. Comparar com os eventos esperados do historico para cancel/confirm.

### Cenario E - Tooltips e acessibilidade
1. Abrir a tela de nova transacao e a view de recorrencias, conforme campos disponiveis.
2. Verificar que os tooltips de tipo/modo de recorrencia estao imediatamente a direita dos selects.
3. Validar ausencia de salto vertical na disposicao.
4. Validar que `aria-describedby` referencia ids corretos dos tooltips.

### Cenario F - Remocao de frases proibidas e ajuste de espacos
1. Verificar que as frases proibidas nao aparecem na interface.
2. Confirmar que o layout nao apresenta lacunas apos a remocao das copys.

### Cenario G - Alinhamento do grid da nova transacao
1. Abrir `/transactions?view=new`.
2. Comparar altura/padding da area em grade de criacao/edicao com inputs/selects vizinhos.
3. Validar alinhamento consistente em desktop e mobile.

## 4. Evidencias recomendadas
- Capturas da view de recorrencias com e sem bloco de pendencias.
- Captura do item em edicao com destaque visual.
- Capturas do prompt de exclusao (cancelar e confirmar).
- Registro curto dos eventos de analytics observados para comparacao com historico.
- Capturas de tooltips ao lado dos selects com inspeccao de `aria-describedby`.
- Capturas da tela de nova transacao em desktop/mobile mostrando alinhamento.

## 5. Criterio de conclusao
A feature esta pronta quando todos os cenarios A-G passarem sem regressao funcional/visual e com paridade de UX/analytics em relacao ao historico.

## 6. Execucao tecnica registrada
- Data: 2026-04-14
- `npm run lint`: aprovado
- `npm run build`: aprovado
- Varredura de frases proibidas no codigo (`components/`, `lib/`): aprovado
- Validacao de marcadores de contrato (`aria-describedby`, classes de alinhamento/destaque): aprovado
