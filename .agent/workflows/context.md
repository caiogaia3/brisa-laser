---
description: Workflow para gerenciar e recuperar o contexto do projeto usando o CLAUDE.md
---

# 🧠 Workflow de Contexto e Orquestração (LAP)

Este workflow dita como o sistema (eu, a IA) e você (o usuário) operam para manter o projeto rápido, com custo baixo e impecável (economia máxima de tokens).

## 1. No Início de Cada Sessão
Sempre que você abrir esta janela para um novo dia de trabalho ou precisar de foco total:
> *"Inicie o projeto lendo o `CLAUDE.md` limitando-se apenas às regras listadas ali."*

Isso fará a IA dar boot carregando apenas as diretrizes absolutas e sem ler lixo histórico.

## 2. Durante o Desenvolvimento (Auto-Registry)
A medida que formos matando tarefas ou mudindo a estratégia, a IA é obrigada a manter o seguinte bloco no fim do `CLAUDE.md` atualizado:

```markdown
## 📥 Caixa de Saída (Prontos para Arquivar)
- [x] Correção do gráfico XYZ e refatoração do botão CTA de Vendas concluídas.
```

## 3. No Final da Sessão (A Faxina de Tokens)
Quando você sentir que o chat está ficando arrastado ou que terminamos uma grande "feature":
> *"Rode o `npm run context:sync`"*

// turbo
O que esse script fará magicamente por você:
1. Ele varre o `CLAUDE.md`.
2. Move cirurgicamente as vitórias (marcadas com `[x]`) da Caixa de Saída direto para a base fria em `archive/history_sessions.md`.
3. Esazia a Caixa de Saída para o próximo ciclo de desenvolvimento.
4. Faz a **Poda de Emergência** no servidor frio, deletando do history coisas antiquadas (com limitador duro de 400 linhas).
