# 🧠 Brisa Laser: Memória Central do Jarvis (Antigravity)

Este arquivo é a bússola do projeto. Ele contém o estado atual, a arquitetura e os comandos necessários para manter a Brisa Laser operando em alta performance.

## 📍 Estado Atual (Março 2026)
- **Fase**: Automação de Dados & BI (Fase 3). Dashboard Mestre SSOT em construção.
- **Sub-fase**: Implementação BI — Plano completo em `PLANO_BI_DASHBOARD.md`
- **Workflows Ativos (RE-AUTORIZADOS)**:
  - `I4zsFxPBCBjxYbQv`: O Arquivista Master (Integrado) 🏛️
  - `KT0EQr8ocoBKuKEq`: Sistema Zandu Master (Unificado & Enriquecido) ✅
  - `Ut7TP0wZNSLZ1prT`: Isa IA (Tool `get_lead_context` corrigida/autorizada) 🤖
  - `vXyz123...`: Sistema Classificação Origem do Lead (VIA NOVO CLIENT_ID BRISA) 🎯
- **Status Atual**:
    - **Credenciais Google**: BLINDAGEM TOTAL. Independência entre Brisa Laser e Agência Grooway estabelecida via Client IDs distintos.
    - **G-Sheets (Agendamento & Comparecimento)**: SUCESSO VALIDADO. Bugs corrigidos ("Cliente Agendou" apagando, formatação de Receita em Moeda). A esteira está cravando a linha exata sem sobrescrever dados vitais. A Receita agora entra limpa ("R$ 479,20") para o Sheets somar automaticamente.
    - **Kommo (Mover Cards)**: SUCESSO VALIDADO. Erro 400 (Bad Request - InvalidType) solucionado alterando o payload de string para Integer (`={{142}}`) no nó HTTP do Kommo API v4.
    - **Sistema Zandu Master v5 (25/03/26)**: Evolução completa do fluxo com 4 rotas de eventos:
        - `agendamento_criado` → Agendou = "Sim" + Kommo Agendado
        - `agendamento_compareceu` → Compareceu = "Sim" + Kommo Ganho
        - `agendamento_faltou/remarcado/remarcado_descontar` → Compareceu = "Não" (sem Kommo)
        - `pdv_compra_realizada` → Receita + Qtd_Areas na planilha (sem Kommo)
    - **Lógica "Não" → "Sim"**: Campo com valor "Não" agora é sobrescrevível. Só bloqueia se ambos (Agendou + Compareceu) = "Sim" (jornada completa).
    - **PDV separado do Comparecimento**: `agendamento_compareceu` NÃO traz dados financeiros. Receita e Qtd_Areas vêm exclusivamente do evento `pdv_compra_realizada` (via `data[0].total` e `data[0].services.length`).
- **Ação Recomendada (Próxima Sessão)**: Testar o fluxo completo end-to-end (agendar → compareceu → PDV) com um lead real para validar que Receita e Qtd_Areas preenchem corretamente na planilha. Validar eventuais novos fluxos de recuperação de carrinho ou integração de novas filiais.
- **🔨 BI Dashboard SSOT — Progresso (25/03/26)**:
    - [x] Step 1: `.env` padronizado com SUPABASE_URL + SUPABASE_KEY
    - [x] Step 2: Scripts refatorados (backfill_dashboard.ts/.cjs, map_utms.cjs) — sem mais hardcode
    - [x] Step 3: SQL concluído — `sql/001_add_store_id.sql`
    - [x] Step 4: SQL concluído — `sql/002_create_fin_dre.sql`
    - [x] Step 5: SQL concluído — `sql/003_create_mkt_lead_audit.sql`
    - [x] Step 6: Script `scripts/sync_dre.ts` corrigido e testado (612 registros sync)
    - [x] Step 7: Script `scripts/sync_leads.ts` corrigido e testado (447 leads sync)
    - [x] Step 9: SQL concluído — `sql/004_create_view_master.sql` (Invoices Closed + Labels Acentuadas)
    - [x] **VITÓRIA TÉCNICA**: View `vw_brisa_master_bi` operacional (SSOT unificado)
    - [ ] **PRÓXIMO**: Step 8: Configurar automação n8n para rodar scripts sync diários
    - [ ] Step 10: Conectar Looker Studio com as KPIs mapeadas
    - **Plano completo**: Ver `PLANO_BI_DASHBOARD.md` na raiz do projeto
    - **Novos npm scripts**: `sync:dre`, `sync:leads`, `backfill`
## 🏗️ Arquitetura Técnica
- **CRM**: Kommo (Status Ganho: 142 | Agendado: 88915887).
- **Agenda**: Zandu (Uso de **URL Única + lastEvent** para roteamento). Eventos relevantes: `agendamento_criado`, `agendamento_compareceu`, `agendamento_faltou`, `agendamento_remarcado`, `agendamento_remarcado_descontar`, `pdv_compra_realizada`. Todos os demais são ignorados pelo Parse Master v5.
- **Banco de Dados**: Supabase (`nrvazcesqvuqtlunqtnw`).
    - Tabelas ativas: `lead_memory`, `zandu_persons`, `zandu_invoices`, `zandu_appointments`, `fin_dre`, `mkt_lead_audit`
    - View ativa: `vw_brisa_master_bi` (SSOT para Looker Studio)
- **Visualização**: Looker Studio (conexão PostgreSQL direto no Supabase → `vw_brisa_master_bi`)
- **Inteligência**: Brisa Intelligence Hub (Conversational BI)
    - **Arsenal**: `ca-demos-and-tools` (Looker Studio + AI) e `genai-toolbox` (Agentes).
- **Servidores MCP**: Localizados em `.agent/mcp-servers/`.

## 🛠 Comandos & Protocolos
### Desenvolvimento Seguro (Jarvis Protocols)
1.  **Protocolo de Memória**: Sempre que o usuário sinalizar pausa ou saída, o JARVIS deve atualizar este `CLAUDE.md`.
2.  **No PROJECT_STATUS.md**: Nunca mais use ou crie este arquivo. Toda a verdade reside no `CLAUDE.md`.
3.  **Tratamento e Match de Telefone (Zandu/GSheets)**: 
    - O Zandu **não envia telefone** no webhook. Sempre use o `personId` para buscar os detalhes na API Zandu (`GET /persons/:id`) ANTES de processar.
    - Match na Planilha: Limpar telefone (remover tudo que não é dígito) e pegar os **8 últimos dígitos** (`slice(-8)`). 
    - **Update by row_number**: Ler toda a aba, casar os 8 dígitos em memória (JS), e atualizar via `row_number`.
    - Os nomes das colunas de saída devem ser os **reais da linha 2** (ex: `Cliente Agendou`, `Receita`, `Qtd_Areas`). **PROIBIDO usar Pontos em nomes de colunas**.
4.  **No GSheets Node**: Usar sempre `headerRow: 2`. No n8n v4.5+, preferir o modo **"Map Automatically"** precedido de um nó `Set` para evitar bugs de mapeamento manual.
5.  **Documentação de Blindagem**: Consultar sempre [protocolo.md](file:///Users/CaioGaia/Documents/brisa-laser/protocolo.md) para detalhes de erros comuns e soluções.

## 📜 Histórico & Lições Aprendidas
- [x] Unificação Master Zandu (URL Única + lastEvent) - Mar/26.
- [x] Enriquecimento Zandu API (Busca Automática de Telefone) - Mar/26.
- [x] Correção 401 Unauthorized na ISA IA (get_lead_context) - Mar/26.
- [x] **VITÓRIA TÉCNICA (Sheets & Zandu)**: Automação Zandu -> GSheets cravando na linha exata (Caso Suzeli) e preservando status anteriores na mesma linha (v4). - Mar/26.
- [x] **VITÓRIA TÉCNICA (Kommo CRM)**: O lead não moveu na última execução devido à tipagem de string (`"142"`) vs int (`142`) na API v4. Corrigido forçando Integers via expressões - Mar/26.
- [x] **VITÓRIA TÉCNICA (Sheets NumberFormatting)**: Formatação de Moeda BRL no Sheets (Parse Master alterado para injetar Float em string via `format()` habilitando USER_ENTERED).
- [x] **BLINDAGEM (IF Filter & Docs)**: Adicionado Nó IF Valid Events (Filtro de Segurança após Parse Master v5 para barrar falsos gatilhos como `agendamento_excluido` devolvendo `ignorar`) e Canvas Documentado 100% com grande StickyNote visual p/ equipe.
- [x] **ERRO DE NOMENCLATURA**: Pontos finais (ex: `Qtd.`) no nó Set criam objetos aninhados e quebram o GSheets. Usar `_`.
- [x] **BLINDAGEM (Credenciais Google)**: Migração profissional concluída. Brisa Laser agora possui seu próprio Client ID/Secret independente da Grooway. Re-autorização OAuth2 realizada nos fluxos principais. - 25/03/26.
- [x] **EVOLUÇÃO (Zandu Master v5)**: Parse Master v5 + Code Find Row v6. Classificação restrita a 5 eventos (agendamento_criado, agendamento_compareceu, agendamento_faltou, agendamento_remarcado*, pdv_compra_realizada). Todos os outros → ignorar. Switch com 4 rotas. "Não" sobrescrevível → "Sim". PDV separado do comparecimento. - 25/03/26.
- [x] **PAYLOAD PDV MAPEADO**: `pdv_compra_realizada` traz `data[0].total` (receita float), `data[0].services[]` (array de serviços = qtd áreas), `data[0].payments[]` (método pgto). personId presente → match por telefone funciona. Teste real: Camila Saud, R$ 59,90, 1 área, Pix. - 25/03/26.
- [x] **SESSÃO BI DASHBOARD (25/03/26)**: Sessão completa de arquitetura e implementação do Dashboard Mestre SSOT. Detalhes:
    - Analisado plano do Gemini (Antigravity) e identificados 5 gaps (naming inconsistente, falta de schema, JOIN sem chave clara, Supabase hardcoded, escopo confuso)
    - Plano próprio criado com 10 steps concretos, DDLs reais, mapeamentos de campo confirmados
    - Visualizadas ambas planilhas (DRE: 36 categorias × 18 meses | Leads: ~600 registros, 6 plataformas)
    - `.env` padronizado (SUPABASE_URL + SUPABASE_KEY), 3 scripts refatorados para usar process.env
    - 4 SQLs criados: `001_add_store_id`, `002_create_fin_dre`, `003_create_mkt_lead_audit`, `004_create_view_master`
    - 2 scripts criados: `sync_dre.ts` (DRE CSV público → Supabase) e `sync_leads.ts` (Leads → Supabase com match Zandu)
    - View `vw_brisa_master_bi` desenhada com 4 CTEs + FULL OUTER JOIN (resolve granularidades diferentes)
    - `SKILL_LOOKER_COPILOT.md` criado como guia para o Antigravity configurar o Looker Studio (conexão, campos, KPIs, paleta)
    - `package.json` atualizado com npm scripts: `sync:dre`, `sync:leads`, `backfill`
    - **VITÓRIA TÉCNICA**: View master operacional integrando DRE, Leads e Zandu.
- [x] **DOCUMENTAÇÃO VISUAL (Fluxogramas Whimsical — 25/03/26)**: Sessão completa de documentação visual do ecossistema Brisa Laser via Jarvis (Antigravity). Detalhes:
    - 8 fluxogramas Mermaid estilizados criados, prontos para import no Whimsical
    - **Macro**: Visão geral do ecossistema (Ads → Isa IA → Kommo → Zandu → n8n → Supabase → Looker)
    - **Captação**: 6 canais com UTM tracking, 600+ leads rastreados
    - **Qualificação**: Isa IA + Supabase `lead_memory` + Pipeline Kommo (status IDs mapeados)
    - **Zandu**: 5 webhooks detalhados (criado, compareceu, faltou, remarcado, pdv_compra)
    - **Automações n8n**: Parse Master v5 + Phone Matching 8 dígitos + 3 scripts sync diários
    - **DRE Financeiro**: Fluxo Receita → Deduções → Custos → EBITDA → Lucro (36 categorias × 18 meses)
    - **Dashboard BI**: 4 CTEs FULL OUTER JOIN → `vw_brisa_master_bi` → Looker Studio
    - **Multi-Loja**: Arquitetura `store_id` para expansão futura
    - Cores padronizadas por camada: Roxo (Cliente), Ciano (Sistema), Laranja (IA), Cinza (APIs), Verde (Banco), Vermelho (Erros), Lilás (BI)
    - **Arquivo salvo**: `docs/FLUXOGRAMAS.md`

## 📂 Mapa de Arquivos do Projeto

### Raiz
| Arquivo | Propósito |
|---------|-----------|
| `CLAUDE.md` | Memória central (este arquivo) |
| `CREDENTIALS.md` | Credenciais de todas as APIs |
| `AGENTS.md` | Arquitetura Jarvis 4.1 (Antigravity) |
| `protocolo.md` | Blindagens técnicas e lições aprendidas |
| `audit_logs.md` | Log de troubleshooting |
| `PLANO_BI_DASHBOARD.md` | Plano completo do Dashboard Mestre SSOT |
| `SKILL_LOOKER_COPILOT.md` | Guia/skill para o Antigravity montar o Looker Studio |
| `jarvis_orchestrator.ts` | Orquestrador Kommo ↔ Zandu |
| `zandu-api.ts` | Wrapper da API Zandu |
| `package.json` | Scripts: health, discover, genesis, sync:dre, sync:leads, backfill |

### scripts/
| Arquivo | Propósito |
|---------|-----------|
| `backfill_dashboard.ts` | Sync Zandu → Supabase (persons, invoices, appointments) |
| `backfill_dashboard.cjs` | Versão JS do backfill |
| `map_utms.cjs` | Mapeia UTMs do CSV → zandu_persons |
| `sync_dre.ts` | DRE Sheet → fin_dre (Supabase) |
| `sync_leads.ts` | Marcação Leads Sheet → mkt_lead_audit (Supabase) |
| `campanhas.csv` | Dados de marketing exportados |

### sql/
| Arquivo | Propósito |
|---------|-----------|
| `001_add_store_id.sql` | ALTER TABLE store_id nas 3 tabelas zandu_* |
| `002_create_fin_dre.sql` | CREATE TABLE fin_dre (DRE) |
| `003_create_mkt_lead_audit.sql` | CREATE TABLE mkt_lead_audit (Marketing) |
| `004_create_view_master.sql` | CREATE VIEW vw_brisa_master_bi (SSOT) |
