---
description: Como e quando registrar atividades nos logs do projeto.
---

Este protocolo garante que a "Memória Institucional" da Brisa Laser seja sempre atualizada após qualquer ação técnica ou estratégica.

### 📝 Quando usar o /record-activity?
O Jarvis deve rodar este processo automaticamente nos seguintes momentos:
1.  **Mudança Técnica**: Alteração em nós do n8n, tabelas do Supabase ou campos do Kommo.
2.  **Conclusão de Fase**: Quando um item do `task.md` for marcado como `[x]`.
3.  **Hotfix**: Após corrigir um erro (ex: Erro 400 do Gemini).

### 🛠️ Passos do Registro:

1.  **Audit Logs (`audit_logs.md`)**:
    - Adicionar data e ação técnica objetiva.
    - Registrar links de workflows e checklists de segurança.

2.  **CLAUDE.md**:
    - Atualizar o resumo executivo e o status das fases.
    - Marcar tarefas concluídas no histórico.

3.  **Task.md**:
    - Sincronizar o progresso real com a lista de tarefas.

### 💡 Exemplo de Registro (Audit Logs):
```markdown
## [2026-03-18 09:30] - Switching to OpenAI
- **Ação**: Removido nó lmChatGoogleGemini e adicionado lmChatOpenAi no workflow Ut7TP0wZNSLZ1prT.
- **Motivo**: Erros recorrentes de Schema 400 no Gemini API.
- **Resultado**: Conexão restabelecida e estável.
```
