# 🛡️ Brisa Agency OS: Holistic Workspace Rules (The Architect's Guide)

### 1. 🌌 Missão & Intencionalidade
*   **O Projeto**: Um Sistema Operacional de Inteligência para agências de marketing de alta performance (Brisa Laser).
*   **A Vibe**: Monitoramento status-dense, luxo visual "Liquid Glass", automação invisível e precisão CFO-grade.
*   **Objetivo IA**: Máxima economia de tokens através do **Lean Agent Protocol (LAP)** e execução cirúrgica.

---

### 2. 🏛️ Arquitetura do Ecossistema (Multicamadas)
1.  **Injestão & Webhooks (n8n)**:
    *   **Local**: `archive_n8n_exports/`.
    *   **Padrão**: Workflows modulares (UTM 360 v9.0, Dual Webhooks).
    *   **Regras**: Use `Parse Lead ID` (Regex/JS) e `Wait 20s` (padrão Kommo). Em nós de código, utilize `helpers.httpRequest` para interações externas.
2.  **Orquestração (Jarvis Orchestrator)**:
    *   **Local**: `jarvis_orchestrator.ts`, `zandu-api.ts`.
    *   **Pattern**: Supervisor Pattern (Coordena Kommo CRM ↔ Zandu Booking).
    *   **Workflow /genesis**: Fluxo mestre para qualificação e sincronia de novos leads.
3.  **Persistência & BI (Supabase/SQL)**:
    *   **Local**: `supabase/`, `sql/`.
    *   **Schema**: SSoT baseado em Views otimizadas (`vw_brisa_master_bi`).
    *   **Migrations**: Padrão incremental `00X_*.sql`.
4.  **Inteligência & Arsenal (Python/MCP)**:
    *   **Local**: `arsenal/`.
    *   **Stack**: Servidores MCP em Python (Meta Ads, OpenAI Research).
    *   **Vibe**: Ferramentas pydantic-first e fixtures de dados reais para simulação.
5.  **Interface de Monitoramento (Hub)**:
    *   **Local**: `/hub` (React + Vite + Tailwind).
    *   **Metodologia**: SDD (Screen-Driven Development) & Mock-Driven UI.
    *   **Estética**: **Liquid Glass v2** (Glassmorphism, Neon-Glow SVG Filters, Ultra-Blur 42px).

---

### 3. 📜 Regras de Ouro (Mandatos do Workspace)
*   **MANDATO 1 (Contract-First)**: Jamais crie telas sem antes definir o contrato JSON/SQL em `docs/BACKEND_SPEC.md`. O Front é o espelho do Spec.
*   **MANDATO 2 (Audit-First)**: Toda decisão da IA (Jarvis) e status de processamento devem ser logados em `audit_logs.md` e refletidos no `docs/CLAUDE.md`.
*   **MANDATO 3 (Visual Identity)**: Respeite rigorosamente as variáveis de `hub/src/index.css` (`--color-primary: #06b6d4`, `--color-orange: #f97316`). Proibido placeholders simples; use fixtures de alta fidelidade.
*   **MANDATO 4 (Token Economy)**: Nunca re-invente o contexto. Se estiver no `CLAUDE.md` ou `MAP.md`, é lei. Use `npm run context:sync` para poda térmica de tokens e arquivamento de sessões antigas.
*   **MANDATO 5 (Build Gate)**: Nenhuma alteração no Hub é considerada "Pronta" sem passar pelo `npm run build` com sucesso.

---
*Gerado estrategicamente pelo Jarvis para o Brisa Intelligence Hub.*
