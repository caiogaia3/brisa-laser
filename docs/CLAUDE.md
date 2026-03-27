# 🧠 Brisa Laser: Memória Central do Jarvis (Lean Context)

Este arquivo é a bússola ativa do projeto. Baseado no **Lean Agent Protocol (LAP)**.

## 📍 Estado Atual (Março 2026)
- **Fase**: Automação de Dados & BI (Fase 3).
- **Sub-fase**: Refinamento de UI e BI Conversacional.
- **Hub Master**: [brisa-laser.vercel.app](https://brisa-laser-git-main-caio-gaias-projects.vercel.app/)
- **Workflows Ativos**: `Arquivista Master`, `Zandu v5`, `Isa IA Tool`.

## 🏗️ Arquitetura Ativa
- **CRM**: Kommo (Ganho ID: 142).
- **Agenda**: Zandu (Webhook POST Roteado).
- **Banco**: Supabase (`vw_brisa_master_bi` como SSOT).
- **Hub**: React + Vite (Pattern: **Feature-Based** em `src/features/`).

## 🛠 Comandos & Protocolos (LAP Rules)
1. **Regra do Dono**: Cada Feature DEVE morar em `src/features/[feature]/`.
2. **Match de Telefone**: Limpar tudo (`Regex \D`) e pegar apenas os **8 últimos dígitos** (`slice(-8)`).
3. **Build Gate**: Nunca considere uma tarefa do Hub pronta sem rodar `npm run build`.
4. **Context Loop**: Histórico longo deve ser arquivado em `archive/history_sessions.md`.
5. **Orquestração SDD**: Mudanças de contrato DEVEM ser refletidas primeiro em [docs/BACKEND_SPEC.md](file:///Users/CaioGaia/Documents/PROJETOS%20/temp/brisa-laser/docs/BACKEND_SPEC.md).
6. **Contract-First Protocol**: Jamais crie uma funcionalidade de interface em `src/features/` sem antes definir seu JSON Schema em `BACKEND_SPEC.md`. Isso deixa as migalhas prontas para o servidor.

## 📅 Próximos Passos
1. Implementar `okr_goals` dinâmicos no Supabase.
2. Gerador de PDF Corporativo para DRE.
3. Automação de Sync Diário (n8n).

## 📥 Caixa de Saída (Prontos para Arquivar)
*(O script `npm run context:sync` moverá os itens daqui com `[x]` para o histórico e limpará esta sessão)*
- [x] Limpeza e poda de redundâncias do context-orchestration concluída com extermínio de 3 metodologias falsas.
- [x] Motor "Context Sync" implantado com poda térmica implementada em Node.

---
*Para ver o histórico completo de vitórias técnicas, emita comando de read no `archive/history_sessions.md`.*
