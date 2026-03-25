# 🗺️ Brisa Laser — Fluxogramas Completos (Estilizados)

> Cole cada bloco separadamente no Whimsical (botão `+` → "Mermaid to Diagram").

---

## 📋 Legenda de Cores

| Cor | Camada | Quem/O quê |
|---|---|---|
| 🟣 Roxo `#6D28D9` | 👤 Cliente/Paciente | A pessoa que quer fazer depilação a laser |
| 🔵 Ciano `#06B6D4` | ⚙️ Sistema/Automação | n8n, Scripts, Webhooks processando dados |
| 🟡 Laranja `#F59E0B` | 🤖 IA e Bots | Isa IA (WhatsApp), Jarvis Orchestrator |
| ⚪ Cinza `#94A3B8` | 🔌 Plataformas Externas | Kommo CRM, Zandu, Google Ads, Meta Ads |
| 🟢 Verde `#4ADE80` | 💾 Banco de Dados | Supabase (Postgres), Google Sheets |
| 🔴 Vermelho `#EF4444` | ❌ Erro/Exceção | Faltas, perdas, falhas |
| 🟤 Marrom `#A78BFA` | 📊 BI/Dashboard | Looker Studio, métricas consolidadas |

---

## 1️⃣ MACRO — Visão Geral do Ecossistema Brisa Laser

```
graph TD
    classDef user fill:#6D28D9,color:#fff,stroke:#fff,stroke-width:3px;
    classDef sys fill:#06B6D4,color:#000,stroke:#000,stroke-width:2px;
    classDef ai fill:#F59E0B,color:#000,stroke:#000,stroke-width:2px;
    classDef ext fill:#94A3B8,color:#000,stroke:#000,stroke-width:2px;
    classDef db fill:#4ADE80,color:#000,stroke:#000,stroke-width:2px;
    classDef err fill:#EF4444,color:#fff,stroke:#fff,stroke-width:2px;
    classDef bi fill:#A78BFA,color:#000,stroke:#000,stroke-width:2px;

    CLIENTE((👤 Cliente quer depilação a laser)):::user

    subgraph "📱 Canais de Captação"
        GADS((🔌 Google Ads)):::ext
        META((🔌 Meta Ads)):::ext
        INSTA((🔌 Instagram)):::ext
        ORG[🔌 Orgânico / Indicação]:::ext
        PASS[👤 Passante na clínica]:::user
    end

    GADS & META & INSTA & ORG & PASS -->|Lead com UTM de rastreamento| WPP[🤖 WhatsApp da Clínica]:::ai

    WPP --> ISA[🤖 Isa IA: Atendente Virtual]:::ai
    ISA -->|Busca contexto do cliente| SUPA[(💾 Supabase lead_memory)]:::db
    ISA -->|Qualifica e agenda| KOMMO((🔌 Kommo CRM Pipeline)):::ext

    KOMMO --> ZANDU((🔌 Zandu: Agenda + PDV)):::ext
    ZANDU -->|Webhooks 5 tipos de evento| N8N[⚙️ n8n Zandu Master v5]:::sys

    N8N --> SHEETS[(💾 Google Sheets: Planilha de Auditoria)]:::db
    N8N --> KOMMO_UP((🔌 Kommo: Mover card no pipeline)):::ext
    N8N ==> SUPA_SYNC[(💾 Supabase: Tabelas Operacionais)]:::db

    subgraph "📊 Camada de Inteligência"
        SYNC[⚙️ Scripts de Sync: DRE + Leads]:::sys
        VIEW[(💾 View vw_brisa_master_bi)]:::db
        LOOKER[📊 Looker Studio Dashboard]:::bi
    end

    SHEETS --> SYNC
    SYNC ==> SUPA_SYNC
    SUPA_SYNC --> VIEW
    VIEW --> LOOKER
    LOOKER -.->|Visão consolidada| DONO((👤 Dona da Clínica)):::user

    subgraph "📋 Legenda"
        L1[🟣 Roxo = Cliente / Paciente]:::user
        L2[🔵 Ciano = Automações n8n / Scripts]:::sys
        L3[🟡 Laranja = IA: Isa e Jarvis]:::ai
        L4[⚪ Cinza = Plataformas: Kommo, Zandu, Ads]:::ext
        L5[🟢 Verde = Dados: Supabase, Sheets]:::db
        L6[🔴 Vermelho = Erros e exceções]:::err
        L7[🟤 Lilás = Dashboard BI]:::bi
    end
```

---

## 2️⃣ MÓDULO A — Captação de Leads (Marketing → Primeiro Contato)

```
graph TD
    classDef user fill:#6D28D9,color:#fff,stroke:#fff,stroke-width:3px;
    classDef sys fill:#06B6D4,color:#000,stroke:#000,stroke-width:2px;
    classDef ai fill:#F59E0B,color:#000,stroke:#000,stroke-width:2px;
    classDef ext fill:#94A3B8,color:#000,stroke:#000,stroke-width:2px;
    classDef db fill:#4ADE80,color:#000,stroke:#000,stroke-width:2px;
    classDef err fill:#EF4444,color:#fff,stroke:#fff,stroke-width:2px;

    INTERESSE((👤 Pessoa interessada em depilação a laser)):::user

    INTERESSE --> GADS[🔌 Clica em anúncio Google Ads]:::ext
    INTERESSE --> META[🔌 Clica em anúncio Meta/Instagram]:::ext
    INTERESSE --> ORGANIC[🔌 Encontra no Google orgânico]:::ext
    INTERESSE --> INDICA[👤 Recebe indicação de amigo]:::user
    INTERESSE --> PASSANTE[👤 Passa na frente da clínica]:::user

    GADS -->|UTM: google_ads| LINK[⚙️ Link com UTM de rastreamento]:::sys
    META -->|UTM: meta_ads| LINK
    ORGANIC -->|UTM: organic| LINK
    INDICA -->|UTM: indicacao| LINK
    PASSANTE -->|UTM: passante| LINK

    LINK --> LP[⚙️ Landing Page ou WhatsApp direto]:::sys
    LP --> REGISTRO[(💾 Lead registrado na Planilha de Auditoria)]:::db

    REGISTRO --> CAMPOS[💾 Dados salvos: Telefone + Plataforma + Data]:::db
    CAMPOS --> TOTAL[💾 Total: mais de 600 leads rastreados]:::db

    LP --> WPP[🤖 Lead chega no WhatsApp da Brisa]:::ai
    WPP --> ISA[🤖 Isa IA assume o atendimento]:::ai
```

---

## 3️⃣ MÓDULO B — Qualificação e Atendimento (Isa IA + Kommo CRM)

```
graph TD
    classDef user fill:#6D28D9,color:#fff,stroke:#fff,stroke-width:3px;
    classDef sys fill:#06B6D4,color:#000,stroke:#000,stroke-width:2px;
    classDef ai fill:#F59E0B,color:#000,stroke:#000,stroke-width:2px;
    classDef ext fill:#94A3B8,color:#000,stroke:#000,stroke-width:2px;
    classDef db fill:#4ADE80,color:#000,stroke:#000,stroke-width:2px;
    classDef err fill:#EF4444,color:#fff,stroke:#fff,stroke-width:2px;

    LEAD((👤 Lead chega no WhatsApp)):::user --> ISA[🤖 Isa IA: Atendente Virtual Empática]:::ai

    ISA --> CONTEXTO{🤖 Lead já é cliente?}:::ai
    CONTEXTO -->|Sim| BUSCA[(💾 Supabase: Buscar histórico em lead_memory)]:::db
    CONTEXTO -->|Não| NOVO[🤖 Isa faz triagem: área do corpo, dúvidas, dor]:::ai
    BUSCA --> HISTORICO[🤖 Isa recupera agendamentos e preferências anteriores]:::ai

    NOVO & HISTORICO --> QUER{🤖 O lead quer agendar uma sessão?}:::ai

    QUER -->|Não agora| STANDBY[🔌 Kommo: Mover para Standby]:::ext
    STANDBY --> FOLLOWUP[🤖 Isa agenda lembrete de follow-up]:::ai

    QUER -->|Sim| QUALIF[🔌 Kommo: Mover para Qualificação]:::ext
    QUALIF --> AGENDAR[🤖 Isa marca horário no Zandu]:::ai

    AGENDAR --> AGENDADO[🔌 Kommo: Mover para Agendado - status 88915887]:::ext
    AGENDADO --> CONFIRM[⚙️ Webhook confirma agendamento na planilha]:::sys

    FOLLOWUP --> RETORNOU{👤 Lead retornou depois?}:::user
    RETORNOU -->|Sim| QUER
    RETORNOU -->|Não em 30 dias| PERDIDO[🔌 Kommo: Mover para Perdido - status 143]:::ext
```

---

## 4️⃣ MÓDULO C — Agendamento e Atendimento (Zandu)

```
graph TD
    classDef user fill:#6D28D9,color:#fff,stroke:#fff,stroke-width:3px;
    classDef sys fill:#06B6D4,color:#000,stroke:#000,stroke-width:2px;
    classDef ai fill:#F59E0B,color:#000,stroke:#000,stroke-width:2px;
    classDef ext fill:#94A3B8,color:#000,stroke:#000,stroke-width:2px;
    classDef db fill:#4ADE80,color:#000,stroke:#000,stroke-width:2px;
    classDef err fill:#EF4444,color:#fff,stroke:#fff,stroke-width:2px;

    AGENDA[🔌 Zandu: Agendamento criado]:::ext
    AGENDA --> WH1[⚙️ Webhook: agendamento_criado]:::sys
    WH1 --> SHEET1[(💾 Planilha: Cliente Agendou = Sim)]:::db
    WH1 --> KOMMO1[🔌 Kommo: Mover para Agendado]:::ext

    AGENDA --> DIA{👤 Dia da sessão: o que aconteceu?}:::user

    DIA -->|Compareceu| WH2[⚙️ Webhook: agendamento_compareceu]:::sys
    WH2 --> SHEET2[(💾 Planilha: Compareceu = Sim)]:::db
    WH2 --> KOMMO2[🔌 Kommo: Mover para Ganho - status 142]:::ext

    DIA -->|Faltou| WH3[⚙️ Webhook: agendamento_faltou]:::sys
    WH3 --> SHEET3[(💾 Planilha: Compareceu = Não)]:::db
    WH3 --> RECUP{🤖 Isa tenta recuperar o cliente?}:::ai
    RECUP -->|Sim remarcou| WH4[⚙️ Webhook: agendamento_remarcado]:::sys
    WH4 --> SHEET4[(💾 Planilha: Novo agendamento registrado)]:::db
    RECUP -->|Não respondeu| PERDIDO[❌ Lead perdido por falta]:::err

    DIA -->|Remarcou antes| WH4

    KOMMO2 --> PDV[🔌 Zandu PDV: Paciente paga na clínica]:::ext
    PDV --> WH5[⚙️ Webhook: pdv_compra_realizada]:::sys
    WH5 --> SHEET5[(💾 Planilha: Receita R$ + Qtd Áreas tratadas)]:::db

    WH5 --> DADOS[⚙️ Dados extraídos: data.total + data.services.length + data.payments]:::sys
```

---

## 5️⃣ MÓDULO D — Automações e Webhooks (n8n + Scripts)

```
graph TD
    classDef user fill:#6D28D9,color:#fff,stroke:#fff,stroke-width:3px;
    classDef sys fill:#06B6D4,color:#000,stroke:#000,stroke-width:2px;
    classDef ai fill:#F59E0B,color:#000,stroke:#000,stroke-width:2px;
    classDef ext fill:#94A3B8,color:#000,stroke:#000,stroke-width:2px;
    classDef db fill:#4ADE80,color:#000,stroke:#000,stroke-width:2px;
    classDef err fill:#EF4444,color:#fff,stroke:#fff,stroke-width:2px;

    ZANDU_WH[🔌 Zandu envia Webhook para n8n]:::ext
    ZANDU_WH --> PARSE[⚙️ Parse Master v5: Classifica o tipo de evento]:::sys

    PARSE --> FILTER{⚙️ Evento é válido?}:::sys
    FILTER -->|Não: agendamento_excluido etc| IGNORAR[❌ Ignorar evento inválido]:::err
    FILTER -->|Sim| SWITCH{⚙️ Switch: Qual dos 5 eventos?}:::sys

    SWITCH -->|agendamento_criado| R1[⚙️ Rota 1: Agendou = Sim + Kommo Agendado]:::sys
    SWITCH -->|agendamento_compareceu| R2[⚙️ Rota 2: Compareceu = Sim + Kommo Ganho]:::sys
    SWITCH -->|agendamento_faltou ou remarcado| R3[⚙️ Rota 3: Compareceu = Não]:::sys
    SWITCH -->|pdv_compra_realizada| R4[⚙️ Rota 4: Receita + Qtd Áreas na planilha]:::sys

    R1 & R2 & R3 & R4 --> PHONE[⚙️ Phone Matching: normalizar 8 últimos dígitos]:::sys
    PHONE --> ZANDU_API[🔌 Zandu API: GET /persons/id buscar telefone]:::ext
    ZANDU_API --> FIND[⚙️ Code Find Row v6: localizar linha exata na planilha]:::sys
    FIND --> UPDATE[(💾 Google Sheets: Atualizar via row_number)]:::db

    subgraph "⏰ Sincronizações Programadas"
        CRON1[⚙️ sync_dre.ts: DRE Sheet para Supabase - 06:00 diário]:::sys
        CRON2[⚙️ sync_leads.ts: Leads Sheet para Supabase - 06:30 diário]:::sys
        CRON3[⚙️ backfill_dashboard.ts: Zandu API para Supabase]:::sys
    end

    CRON1 --> SHEETS_DRE[(💾 Google Sheet DRE 36 categorias)]:::db
    SHEETS_DRE --> FIN_DRE[(💾 Supabase tabela fin_dre)]:::db

    CRON2 --> SHEETS_LEADS[(💾 Google Sheet Marcação de Leads)]:::db
    SHEETS_LEADS --> MKT_AUDIT[(💾 Supabase tabela mkt_lead_audit)]:::db

    CRON3 --> ZANDU_FULL[🔌 Zandu API: persons + invoices + appointments]:::ext
    ZANDU_FULL --> ZANDU_TABLES[(💾 Supabase: zandu_persons + zandu_invoices + zandu_appointments)]:::db
```

---

## 6️⃣ MÓDULO E — Financeiro (DRE — Demonstração de Resultado)

```
graph TD
    classDef user fill:#6D28D9,color:#fff,stroke:#fff,stroke-width:3px;
    classDef sys fill:#06B6D4,color:#000,stroke:#000,stroke-width:2px;
    classDef ai fill:#F59E0B,color:#000,stroke:#000,stroke-width:2px;
    classDef ext fill:#94A3B8,color:#000,stroke:#000,stroke-width:2px;
    classDef db fill:#4ADE80,color:#000,stroke:#000,stroke-width:2px;
    classDef err fill:#EF4444,color:#fff,stroke:#fff,stroke-width:2px;
    classDef bi fill:#A78BFA,color:#000,stroke:#000,stroke-width:2px;

    REC[💾 RECEITA BRUTA: PIX + Cartão + Venda de Ativos + Locações]:::db

    REC --> DED{⚙️ Subtrair Deduções: Impostos + Chargebacks}:::sys
    DED --> REC_LIQ[💾 RECEITA LÍQUIDA]:::db

    REC_LIQ --> CV{⚙️ Subtrair Custos Variáveis: Taxa Cartão + Comissões + Insumos}:::sys
    CV --> MARGEM[💾 MARGEM DE CONTRIBUIÇÃO]:::db

    MARGEM --> DF{⚙️ Subtrair Despesas Fixas: Aluguel + Salários + Marketing + Sistemas}:::sys
    DF --> EBITDA[💾 EBITDA: Lucro Operacional]:::db

    EBITDA --> FIN{⚙️ Subtrair Despesas Financeiras: Juros + Taxas bancárias}:::sys
    FIN --> LUCRO[💾 LUCRO LÍQUIDO: O que sobra no bolso da dona]:::db

    subgraph "📊 36 Categorias rastreadas x 18 meses Out/2024 a Fev/2026"
        CAT1[⚙️ Receitas: 4 categorias]:::sys
        CAT2[⚙️ Deduções: 2 categorias]:::sys
        CAT3[⚙️ Custos Variáveis: 3 categorias]:::sys
        CAT4[⚙️ Despesas Fixas: 15+ categorias]:::sys
        CAT5[⚙️ Despesas Financeiras: 3 categorias]:::sys
    end

    LUCRO --> SYNC[⚙️ sync_dre.ts sincroniza Sheet → Supabase]:::sys
    SYNC ==> SUPA[(💾 Supabase tabela fin_dre)]:::db
    SUPA --> VIEW[📊 View vw_brisa_master_bi]:::bi
```

---

## 7️⃣ MÓDULO F — Dashboard BI (Looker Studio)

```
graph TD
    classDef user fill:#6D28D9,color:#fff,stroke:#fff,stroke-width:3px;
    classDef sys fill:#06B6D4,color:#000,stroke:#000,stroke-width:2px;
    classDef ai fill:#F59E0B,color:#000,stroke:#000,stroke-width:2px;
    classDef ext fill:#94A3B8,color:#000,stroke:#000,stroke-width:2px;
    classDef db fill:#4ADE80,color:#000,stroke:#000,stroke-width:2px;
    classDef err fill:#EF4444,color:#fff,stroke:#fff,stroke-width:2px;
    classDef bi fill:#A78BFA,color:#000,stroke:#000,stroke-width:2px;

    subgraph "💾 4 Fontes de Dados no Supabase"
        CTE1[(💾 CTE Financeiro: fin_dre)]:::db
        CTE2[(💾 CTE Marketing: mkt_lead_audit)]:::db
        CTE3[(💾 CTE Operacional: zandu_invoices)]:::db
        CTE4[(💾 CTE Comparecimento: zandu_appointments)]:::db
    end

    CTE1 & CTE2 & CTE3 & CTE4 ==> VIEW[(💾 FULL OUTER JOIN → vw_brisa_master_bi)]:::db

    VIEW --> CONN[⚙️ PostgreSQL Connector direto no Supabase]:::sys
    CONN --> LOOKER[📊 Looker Studio Dashboard]:::bi

    LOOKER --> KPI_MKT[📊 KPIs Marketing: CPL + CAC + ROAS]:::bi
    LOOKER --> KPI_OPS[📊 KPIs Operacionais: Taxa Comparecimento + Conversão Lead→Agendamento]:::bi
    LOOKER --> KPI_FIN[📊 KPIs Financeiros: Margem + EBITDA + Lucro Líquido]:::bi

    KPI_MKT --> DONO((👤 Dona da Clínica visualiza)):::user
    KPI_OPS --> DONO
    KPI_FIN --> DONO

    DONO --> DECISAO{👤 Que decisão tomar?}:::user
    DECISAO -->|Marketing caro| AJUSTAR[⚙️ Reduzir ou realocar verba de Ads]:::sys
    DECISAO -->|Muitas faltas| RECUPERAR[🤖 Isa IA intensifica confirmações]:::ai
    DECISAO -->|Lucro baixo| CORTAR[⚙️ Revisar despesas fixas na DRE]:::sys
    DECISAO -->|Tudo bem| ESCALAR[👤 Pensar em abrir segunda unidade]:::user
```

---

## 8️⃣ MÓDULO G — Expansão Multi-Loja

```
graph TD
    classDef user fill:#6D28D9,color:#fff,stroke:#fff,stroke-width:3px;
    classDef sys fill:#06B6D4,color:#000,stroke:#000,stroke-width:2px;
    classDef ai fill:#F59E0B,color:#000,stroke:#000,stroke-width:2px;
    classDef ext fill:#94A3B8,color:#000,stroke:#000,stroke-width:2px;
    classDef db fill:#4ADE80,color:#000,stroke:#000,stroke-width:2px;
    classDef err fill:#EF4444,color:#fff,stroke:#fff,stroke-width:2px;
    classDef bi fill:#A78BFA,color:#000,stroke:#000,stroke-width:2px;

    HOJE((👤 Hoje: 1 unidade Brisa Laser)):::user
    HOJE --> ARQUITETURA[⚙️ Arquitetura já preparada com store_id]:::sys

    ARQUITETURA --> TABELAS[(💾 Todas as tabelas têm coluna store_id)]:::db
    TABELAS --> LOJA1[(💾 store_id = 1: Unidade atual)]:::db
    TABELAS --> LOJA2[(💾 store_id = 2: Futura segunda unidade)]:::db

    LOJA2 --> NOVO_ZANDU[🔌 Novo Zandu: Agenda separada por loja]:::ext
    LOJA2 --> NOVO_KOMMO[🔌 Mesmo Kommo: Pipeline filtrado por loja]:::ext
    LOJA2 --> MESMA_ISA[🤖 Mesma Isa IA: Atende ambas as unidades]:::ai

    NOVO_ZANDU --> MESMO_N8N[⚙️ Mesmo n8n: Webhooks separam por store_id]:::sys
    NOVO_KOMMO --> MESMO_N8N
    MESMO_N8N ==> SUPA[(💾 Supabase: Dados segregados por store_id)]:::db

    SUPA --> VIEW[(💾 View vw_brisa_master_bi: JOIN com filtro de loja)]:::db
    VIEW --> LOOKER[📊 Looker Studio: Filtro dropdown por unidade]:::bi

    LOOKER --> VISAO_GERAL[📊 Visão Consolidada: Todas as lojas juntas]:::bi
    LOOKER --> VISAO_LOJA[📊 Visão Individual: Uma loja específica]:::bi

    VISAO_GERAL & VISAO_LOJA --> DONO((👤 Dona decide: expandir ou otimizar)):::user
```

---

## 📝 RESUMO NARRATIVO

A **Brisa Laser** funciona como um funil inteligente que transforma desconhecidos em clientes recorrentes de depilação a laser, medindo cada centavo investido ao longo do caminho. Tudo começa com a **captação**: anúncios no Google e Meta Ads atraem pessoas interessadas, cada clique carrega um código UTM que identifica exatamente de qual campanha o lead veio. Quando a pessoa manda mensagem no WhatsApp, a **Isa IA** — uma atendente virtual empática e consultiva — assume o atendimento, tira dúvidas sobre dor, áreas do corpo e preços, e agenda a sessão diretamente no sistema Zandu.

A partir do agendamento, a mágica das **automações** entra em cena. O Zandu dispara webhooks para o n8n, que classifica cada evento em uma de 5 categorias (agendou, compareceu, faltou, remarcou, pagou). Cada classificação atualiza automaticamente a planilha de auditoria e move o card do lead no CRM Kommo — tudo sem intervenção humana. O sistema usa os 8 últimos dígitos do telefone como "impressão digital" para cruzar dados entre Zandu, Sheets e Kommo, garantindo que um lead nunca se perca entre sistemas.

No final do mês, três scripts programados sincronizam todos os dados para o Supabase: o DRE financeiro (36 categorias de receitas e despesas), os leads de marketing (600+ rastreados) e os dados operacionais do Zandu (agendamentos, faturas, comparecimentos). Tudo converge em uma **view SQL mestra** (vw_brisa_master_bi) que faz um FULL OUTER JOIN de 4 dimensões — financeiro, marketing, operacional e comparecimento — criando a **Fonte Única de Verdade (SSOT)** que alimenta o Looker Studio.

A dona da clínica abre o **Dashboard BI** e vê, em uma única tela: quanto gastou em marketing, quantos leads vieram, quantos compareceram, qual a receita real e qual o lucro líquido. Se o custo por lead está alto, ela realoca verba. Se muitos estão faltando, a Isa IA intensifica as confirmações. E quando o lucro justificar, toda a arquitetura já está preparada com `store_id` para suportar uma segunda unidade — mesmo pipeline, mesma Isa, mesmos dashboards, dados perfeitamente segregados por loja.
