# 🧠 Brisa Laser: Memória Central do Jarvis (Antigravity)

Este arquivo é a bússola do projeto. Ele contém o estado atual, a arquitetura e os comandos necessários para manter a Brisa Laser operando em alta performance.

## 📍 Estado Atual (Março 2026)
- **Fase**: Automação de Dados & BI (Fase 3). Zandu Unificado & Enriquecido via API.
- **Workflows Ativos**:
  - `I4zsFxPBCBjxYbQv`: O Arquivista Master (Integrado) 🏛️
  - `KT0EQr8ocoBKuKEq`: Sistema Zandu Master (Unificado & Enriquecido) ✅
  - `Ut7TP0wZNSLZ1prT`: Isa IA (Tool `get_lead_context` corrigida/autorizada) 🤖
- **Status Atual**:
    - **G-Sheets (Agendamento & Comparecimento)**: SUCESSO VALIDADO. Bugs corrigidos ("Cliente Agendou" apagando, formatação de Receita em Moeda). A esteira está cravando a linha exata sem sobrescrever dados vitais. A Receita agora entra limpa ("R$ 479,20") para o Sheets somar automaticamente.
    - **Kommo (Mover Cards)**: SUCESSO VALIDADO. Erro 400 (Bad Request - InvalidType) solucionado alterando o payload de string para Integer (`={{142}}`) no nó HTTP do Kommo API v4.
- **Ação Recomendada (Próxima Sessão)**: O fluxo Base de agendamento está 100% BLINDADO. Validar eventuais novos fluxos de recuperação de carrinho ou integração de novas filiais com a mesma arquitetura.
## 🏗️ Arquitetura Técnica
- **CRM**: Kommo (Status Ganho: 142 | Agendado: 88915887).
- **Agenda**: Zandu (Uso de **URL Única + lastEvent** para roteamento).
- **Banco de Dados**: Supabase (`nrvazcesqvuqtlunqtnw`). Tabela `lead_memory` ativa.
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
