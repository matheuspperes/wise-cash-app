# Quickstart - Definicao de Ambiencia do Projeto

## 1. Objetivo
Aplicar a decisao de ambiencia no repositorio atual com padrao operacional simples e repetivel.

## 2. Baseline aprovado
- Python (quando existir no escopo): usar `uv`.
- Stack atual nao-Python (Next.js/Node): usar `npm`.

## 3. Fluxo de setup inicial (repositorio atual)
1. Validar versao do Node suportada no projeto.
2. Executar instalacao de dependencias com `npm install`.
3. Confirmar comandos principais do ciclo local (`npm run dev`, `npm run build`).
4. Registrar eventuais desvios operacionais no documento da feature.

## 4. Fluxo de setup para projetos Python futuros
1. Instalar `uv` no ambiente local.
2. Inicializar/gerenciar ambiente Python com `uv`.
3. Registrar dependencias e comandos padrao no README/quickstart do projeto Python.

## 5. Reavaliacao de ambiencia
- Reavaliar quando houver mudanca grande de stack (troca de runtime, troca de gerenciador oficial ou alteracao >=30% dos comandos de setup).
- Reavaliar obrigatoriamente a cada 6 meses, mesmo sem incidente.

## 5.1 Rollback
- Se uma alteracao de ambiencia falhar, retornar ao ultimo recommendation-report aprovado e ao ultimo conjunto de comandos validado.

## 6. Evidencias manuais
- Registrar data da avaliacao.
- Registrar opcao principal e duas alternativas.
- Registrar justificativa de adocao e impacto esperado.
- Registrar aprovacao de 1 revisor nao tecnico para criterio de linguagem acessivel.
