---
description: Workflow para inicialização de novos leads e processos operacionais do zero.
---

# Workflow: Operational Genesis (/genesis)

Este workflow é acionado quando um novo lead entra no ecossistema ou quando um novo processo de atendimento precisa ser "nascido".

### Passos:

1. **Captura e Qualificação**:
   - O Agente Comercial (Kommo) detecta a entrada via n8n.
   - Qualificação humanizada baseada em contexto histórico.

2. **Trigger de Agendamento**:
   - Se houver intenção de agendamento, o Jarvis passa o bastão para o Agente de Agendamento (Zandu).

3. **Registro de Nascimento**:
   - O Agente de Dados registra a origem e o sucesso do `Genesis` na planilha Google Sheets.

4. **Auditoria**:
   - Todas as etapas do `Genesis` devem ser logadas em tempo real.
