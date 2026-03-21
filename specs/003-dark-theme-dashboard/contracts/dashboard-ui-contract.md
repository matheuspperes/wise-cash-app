# Contract: Dashboard UI Experience

## Purpose
Definir requisitos contratuais minimos para a experiencia visual e comportamental do dashboard modernizado.

## Scope
- Tema e tokens visuais do dashboard
- Estados de carregamento/erro/vazio
- Apresentacao do grafico principal
- CTA de adicionar transacao
- Remocao de dados de teste da UI visivel

## Required Outputs
- Tema dark padrao em sessoes sem preferencia salva
- Respeito a preferencia de tema salva em acessos futuros
- Loader moderno com Skeleton nas superficies criticas
- Grafico com tooltip custom, gradientes suaves e animacao de mount/update
- CTA de nova transacao em desktop (topo) e mobile (fixo inferior)
- Fluxo de CTA reutilizando rota/processo existente de nova transacao
- Ausencia de dados de teste na UI visivel (cards/listas/grafico/estados)

## Validation Rules
- MUST manter contraste e legibilidade adequados para textos e estados interativos.
- MUST mapear isLoading/isFetching/isError para feedback visual consistente.
- MUST apresentar feedback de carregamento em ate 1 segundo para areas criticas.
- MUST manter comportamento coerente entre desktop e mobile.
- MUST evitar bloqueio de conteudo critico pelo CTA fixo em mobile.
- MUST manter animacoes suaves de loader e grafico ativas conforme clarificacao aprovada.

## Interface Behaviors

### Theme behavior
- Input: sessao inicial sem preferencia salva.
- Output: dark theme aplicado automaticamente.
- Input: preferencia salva existente.
- Output: preferencia salva aplicada.

### Data state behavior
- Input: query em isLoading.
- Output: skeleton visivel por superficie correspondente.
- Input: query em isFetching.
- Output: indicacao nao-bloqueante de atualizacao.
- Input: query em isError.
- Output: mensagem de erro contextual com acao de nova tentativa.
- Input: sem dados reais.
- Output: estado vazio informativo sem mock data.

### CTA behavior
- Input: clique/toque no CTA de nova transacao.
- Output: navegacao para fluxo existente de criacao de transacao.

## Out of Scope
- Migracao de biblioteca de graficos.
- Criacao de novo fluxo de negocio para transacao.
- Limpeza global de fixtures/mocks internos fora da UI do dashboard.
