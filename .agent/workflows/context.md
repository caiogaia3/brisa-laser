---
description: Workflow para gerenciar e recuperar o contexto do projeto usando o PROJECT_STATUS.md
---

#  Productivity Workflow: Context Management (/context)

Este workflow garante que o Jarvis (Antigravity) sempre tenha clareza do estado atual do projeto usando a nova arquitetura 4.1.

### Passos:

1. **Leitura de Contexto Ativo**:
   - Sempre comece lendo o arquivo `CLAUDE.md` na raiz do projeto.
   - Consulte o `claude-mem` (memória reflexiva) para detalhes técnicos de sessões passadas.

2. **Sincronização com AGENTS.md**:
   - Verifique se as ações planejadas respeitam a hierarquia do Jarvis 4.1.

3. **Atualização do Estado**:
   - Ao final da tarefa, execute o **/record-activity** para manter o `CLAUDE.md` e os logs em dia.

// turbo-all
4. **Comando de Status**:
   - Se o usuário perguntar "em que pé estamos?", apresente o resumo do `CLAUDE.md`.
