# Plano de Implementacao — Brisa Laser Dashboard Mestre (SSOT)

## Context

O projeto Brisa Laser esta na Fase 3 (Automacao de Dados & BI). O pilar **Operacional (Zandu)** ja esta no Supabase via `backfill_dashboard.ts`. Faltam os pilares **Financeiro (DRE)** e **Marketing (Leads)**, alem da view master que unifica tudo para o Looker Studio. A segunda loja esta proxima, entao tudo precisa de `store_id`.

**Problema**: Dados financeiros e de marketing estao isolados em Google Sheets, sem conexao com os dados operacionais do Zandu no Supabase. Nao ha um dashboard unico (SSOT).

**Outcome**: Um unico dashboard no Looker Studio consumindo `vw_brisa_master_bi` do Supabase, com dados de DRE + Leads + Zandu agregados por periodo e loja.

---

## Arquivos Criticos

| Arquivo | Acao |
|---------|------|
| `/temp/brisa-laser/.env` | MODIFICAR — adicionar SUPABASE_URL + SUPABASE_SERVICE_KEY |
| `/temp/brisa-laser/scripts/backfill_dashboard.ts` | MODIFICAR — usar .env para Supabase |
| `/temp/brisa-laser/scripts/backfill_dashboard.cjs` | MODIFICAR — usar .env para Supabase |
| `/temp/brisa-laser/scripts/map_utms.cjs` | MODIFICAR — usar .env para Supabase |
| `/temp/brisa-laser/zandu-api.ts` | NAO MEXER |
| `/temp/brisa-laser/jarvis_orchestrator.ts` | NAO MEXER |
| `/temp/brisa-laser/scripts/sync_dre.ts` | CRIAR — espelhamento DRE Sheet -> Supabase |
| `/temp/brisa-laser/scripts/sync_leads.ts` | CRIAR — sync Marcacao Leads -> Supabase |
| `/temp/brisa-laser/sql/` | CRIAR — DDLs e views |

---

## Step 1: Padronizar .env (Supabase)

**Arquivo**: `.env`

Adicionar:
```
SUPABASE_URL=https://nrvazcesqvuqtlunqtnw.supabase.co
SUPABASE_KEY=<publishable_key_atual>
```

Refatorar `backfill_dashboard.ts`, `backfill_dashboard.cjs` e `map_utms.cjs` para ler de `process.env` ao inves de hardcoded.

**Risco**: Zero — os scripts continuam funcionando, so muda a fonte da variavel.

---

## Step 2: ALTER TABLE — adicionar store_id nas tabelas existentes

**Arquivo**: `sql/001_add_store_id.sql`

```sql
-- Adicionar store_id com default para loja atual
ALTER TABLE zandu_persons
  ADD COLUMN IF NOT EXISTS store_id TEXT DEFAULT 'brisa-matriz';

ALTER TABLE zandu_invoices
  ADD COLUMN IF NOT EXISTS store_id TEXT DEFAULT 'brisa-matriz';

ALTER TABLE zandu_appointments
  ADD COLUMN IF NOT EXISTS store_id TEXT DEFAULT 'brisa-matriz';
```

**Risco**: Baixo — ADD COLUMN com DEFAULT nao quebra queries existentes.

---

## Step 3: CREATE TABLE fin_dre

**Arquivo**: `sql/002_create_fin_dre.sql`

**Layout confirmado da aba DRE** (Planilha `15LOh89f0hS2GriYC_ay1Lq296rmwOcNYV3Yc1EXmBWs`):
- **Coluna A**: "Conta / Descricao Detalhada" (36 linhas de categorias)
- **Colunas B+**: Meses (10/2024, 11/2024, ..., 02/2026) — 18 meses

**Categorias da DRE (36 linhas)**:
```
RECEITA:
  (+) Vendas PIX / Dinheiro
  (+) Venda de Ativos/Equipamentos
  (+) Locacao
  (+) Vendas Cartao de Credito/Debito
  = TOTAL RECEITA BRUTA

DEDUCOES:
  (-) Impostos sobre Notas (Simples Nacional/ISS)
  (-) Estornos e Cancelamentos de Pacotes
  = RECEITA LIQUIDA

CUSTOS VARIAVEIS:
  (-) Taxas de Maquininha e Antecipacao
  (-) Comissoes (Aplicadoras/Esteticistas)
  (-) Locacao/Frete
  (-) Insumos da Variavel
  (-) Insumos da Sessao (Gel, Lencol, Laminas, EPIs)
  = MARGEM DE CONTRIBUICAO

DESPESAS FIXAS:
  (-) Aluguel, Condominio, IPTU, Seguro
  (-) Agua, Energia Eletrica e Telefone
  (-) Salarios Fixos (Recepcao, Limpeza) + Encargos
  (-) Sistemas e Softwares (KOMMO, Zandu, etc.)
  (-) Honorarios Contabilidade
  (-) Marketing e Trafego
  (-) Manutencao Infra e Equipam.
  (-) Material de Limpeza, Escritorio e Copa
  = TOTAL DESPESAS FIXAS

PRO-LABORE:
  (-) Pro-labore Socia 1
  (-) Pro-labore Socia 2
  = LAJIDA (EBITDA)

FINANCEIRO:
  (-) Tarifas Bancarias e Manutencao de Conta
  (-) Juros e Multas
  (-) Parcela de Financiamento da Maquina de Laser
  (-) Investimento - Aborte
  (-) Investimento - Equip., Marca e Infraestrutura
  (-) Fundo de Reserva / Manutencao de Disparos
  = LUCRO LIQUIDO FINAL

CAIXA:
  (-) Transferencia para Reserva/Aplicacao
  (-) Saida de Socio / Pagamento de Haveres
  = SALDO FINAL DE CAIXA
```

**DDL**: Estrutura flexivel com `line_label` para preservar o nome original da DRE + `category` para agrupamento:

```sql
CREATE TABLE IF NOT EXISTS public.fin_dre (
  id            UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  store_id      TEXT NOT NULL DEFAULT 'brisa-matriz',
  period_month  DATE NOT NULL,            -- primeiro dia do mes (2026-03-01)
  category      TEXT NOT NULL,            -- 'receita', 'deducao', 'custo_variavel', 'despesa_fixa', 'pro_labore', 'financeiro', 'caixa'
  line_label    TEXT NOT NULL,            -- label original da DRE: "(+) Vendas PIX / Dinheiro"
  is_subtotal   BOOLEAN DEFAULT FALSE,    -- TRUE para linhas "=" (TOTAL, MARGEM, EBITDA, etc.)
  amount        NUMERIC(12,2) NOT NULL DEFAULT 0,
  created_at    TIMESTAMPTZ DEFAULT NOW(),
  updated_at    TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(store_id, period_month, line_label)
);

CREATE INDEX idx_fin_dre_period ON fin_dre(period_month);
CREATE INDEX idx_fin_dre_store ON fin_dre(store_id);
CREATE INDEX idx_fin_dre_category ON fin_dre(category);
```

**Mapeamento category** (no script sync_dre.ts):
```ts
const CATEGORY_MAP: Record<string, string> = {
  '(+) Vendas PIX': 'receita',
  '(+) Venda de Ativos': 'receita',
  '(+) Locacao': 'receita',
  '(+) Vendas Cartao': 'receita',
  'TOTAL RECEITA BRUTA': 'receita',        // is_subtotal=true
  '(-) Impostos': 'deducao',
  '(-) Estornos': 'deducao',
  'RECEITA LIQUIDA': 'deducao',            // is_subtotal=true
  '(-) Taxas de Maquininha': 'custo_variavel',
  '(-) Comissoes': 'custo_variavel',
  '(-) Locacao/Frete': 'custo_variavel',
  '(-) Insumos': 'custo_variavel',
  'MARGEM DE CONTRIBUICAO': 'custo_variavel', // is_subtotal=true
  '(-) Aluguel': 'despesa_fixa',
  '(-) Agua': 'despesa_fixa',
  '(-) Salarios': 'despesa_fixa',
  '(-) Sistemas': 'despesa_fixa',
  '(-) Honorarios': 'despesa_fixa',
  '(-) Marketing': 'despesa_fixa',
  '(-) Manutencao': 'despesa_fixa',
  '(-) Material': 'despesa_fixa',
  'TOTAL DESPESAS FIXAS': 'despesa_fixa',  // is_subtotal=true
  '(-) Pro-labore': 'pro_labore',
  'LAJIDA': 'pro_labore',                  // is_subtotal=true
  '(-) Tarifas': 'financeiro',
  '(-) Juros': 'financeiro',
  '(-) Parcela': 'financeiro',
  '(-) Investimento': 'financeiro',
  '(-) Fundo': 'financeiro',
  'LUCRO LIQUIDO': 'financeiro',           // is_subtotal=true
  '(-) Transferencia': 'caixa',
  '(-) Saida': 'caixa',
  'SALDO FINAL': 'caixa',                 // is_subtotal=true
};
```

---

## Step 4: CREATE TABLE mkt_lead_audit

**Arquivo**: `sql/003_create_mkt_lead_audit.sql`

```sql
CREATE TABLE IF NOT EXISTS public.mkt_lead_audit (
  id              UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  store_id        TEXT NOT NULL DEFAULT 'brisa-matriz',
  zandu_person_id TEXT REFERENCES zandu_persons(id),
  kommo_lead_id   BIGINT,
  phone_clean     TEXT,                 -- 8 ultimos digitos
  nome            TEXT,
  utm_source      TEXT,                 -- 'Meta Ads', 'Google Ads', 'Organico'
  utm_campaign    TEXT,
  data_primeiro_contato DATE,
  data_ultimo_contato   DATE,
  agendou         BOOLEAN DEFAULT FALSE,
  compareceu      BOOLEAN DEFAULT FALSE,
  qtd_areas       NUMERIC(4,2),
  receita         NUMERIC(12,2) DEFAULT 0,
  audit_status    TEXT DEFAULT 'pendente', -- 'pendente', 'validado', 'descartado'
  created_at      TIMESTAMPTZ DEFAULT NOW(),
  updated_at      TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(store_id, phone_clean)
);

CREATE INDEX idx_mkt_lead_phone ON mkt_lead_audit(phone_clean);
CREATE INDEX idx_mkt_lead_store ON mkt_lead_audit(store_id);
```

**Decisao**: `mkt_lead_audit` e a unica tabela de marketing. Nao criar `mkt_leads_full` separada — isso evita duplicacao com `zandu_persons`. O cruzamento e feito via `zandu_person_id` FK.

**Planilha Marcacao de Leads confirmada** (Sheet `14Lxf4lJoKRFTkzGyDgNYvLzJZlLY7WUZb25YzI1cUQU`, GID `551067343`):
- ~600+ leads, Jun/2025 a Mar/2026
- Colunas: Nome | Telefone | Plataforma | Data Primeiro Contato | Data Ultimo Contato | Observacao | Qtd Areas | Agendou (Sim/Nao) | Compareceu (Sim/Nao) | Receita | Quantidade
- Plataformas: Google Ads, Meta Ads, Organic, Instagram, Indication, Passante
- Receita: R$ 0,00 a R$ 1.916,80
- Qtd Areas: 0.5 a 32+

**Mapeamento Sheet → mkt_lead_audit**:
```
Nome                    → nome
Telefone                → phone_clean (normalizado slice(-8))
Plataforma              → utm_source
Data Primeiro Contato   → data_primeiro_contato (parse DD/MM/YYYY → DATE)
Data Ultimo Contato     → data_ultimo_contato (parse DD/MM/YYYY → DATE)
Qtd Areas               → qtd_areas (parse "1,00" → 1.00)
Agendou                 → agendou ("Sim" → true, else false)
Compareceu              → compareceu ("Sim" → true, else false)
Receita                 → receita (parse "R$ 59,90" → 59.90)
```

---

## Step 5: Script sync_dre.ts

**Arquivo**: `scripts/sync_dre.ts`

**Sheet ID**: `15LOh89f0hS2GriYC_ay1Lq296rmwOcNYV3Yc1EXmBWs`

Logica:
1. Ler aba DRE via Google Sheets API (export CSV ou n8n Google Sheets node)
2. Row 1 = headers: `["Conta / Descricao Detalhada", "10/2024", "11/2024", ..., "02/2026"]`
3. Rows 2-37 = dados: cada row e uma linha da DRE
4. Para cada row, para cada coluna de mes:
   - `line_label` = valor da coluna A (ex: "(+) Vendas PIX / Dinheiro")
   - `period_month` = parse "MM/YYYY" → "YYYY-MM-01" (ex: "10/2024" → "2024-10-01")
   - `category` = lookup no CATEGORY_MAP via startsWith match
   - `is_subtotal` = TRUE se line_label comeca com "(=)" ou "TOTAL" ou "SALDO"
   - `amount` = parse valor BRL (remover R$, trocar virgula por ponto)
5. Upsert batch em `fin_dre` via Supabase REST (Prefer: resolution=merge-duplicates)
6. Log: `[DRE] X registros sincronizados para Y meses`

**Pattern**: Mesmo do `backfill_dashboard.ts` (axios + Supabase REST + dotenv).

**Parsing BRL**:
```ts
function parseBRL(val: string): number {
  if (!val || val.trim() === '' || val.trim() === '-') return 0;
  return parseFloat(val.replace(/[R$\s.]/g, '').replace(',', '.'));
}
```

---

## Step 6: Script sync_leads.ts

**Arquivo**: `scripts/sync_leads.ts`

Logica:
1. Ler aba CAMPANHAS da planilha Marcacao de Leads (Sheet ID: `14Lxf4lJoKRFTkzGyDgNYvLzJZlLY7WUZb25YzI1cUQU`)
2. Para cada lead: normalizar telefone (slice(-8)), mapear campos
3. Tentar match com `zandu_persons` pelo phone_clean para preencher `zandu_person_id`
4. Upsert em `mkt_lead_audit`
5. Log: `[MKT] X leads sincronizados`

**Phone matching**: Reutilizar pattern existente do `map_utms.cjs`:
```ts
const phoneClean = phone.replace(/\D/g, '').slice(-8);
```

---

## Step 7: Fluxos n8n (Schedule Triggers)

### 7a. Fluxo "Espelhamento DRE"
```
Schedule Trigger (diario 06:00)
  -> Google Sheets (Read aba DRE, Header Row 2)
  -> Set Node (mapear campos: category, subcategory, amount, period_month)
  -> HTTP Request (POST Supabase /fin_dre, Prefer: merge-duplicates)
```

### 7b. Fluxo "Sync Marketing Leads"
```
Schedule Trigger (diario 06:30)
  -> Google Sheets (Read aba CAMPANHAS, Header Row 2)
  -> Set Node (normalizar: phone_clean, agendou bool, compareceu bool, receita float)
  -> HTTP Request (GET Supabase /zandu_persons?phone_clean=eq.{phone})  // match
  -> Set Node (adicionar zandu_person_id se match)
  -> HTTP Request (POST Supabase /mkt_lead_audit, Prefer: merge-duplicates)
```

**Blindagem n8n**:
- Header Row: 2, Data Row: 3
- Sem pontos em nomes de colunas (usar `Qtd_Areas`, nao `Qtd.`)
- Sempre Set node antes de Sheets/HTTP
- Credential: Google Sheets OAuth2 (UjCbXnN1VkFY6mjA)

---

## Step 8: VIEW vw_brisa_master_bi

**Arquivo**: `sql/004_create_view_master.sql`

```sql
CREATE OR REPLACE VIEW public.vw_brisa_master_bi AS
WITH
-- Financeiro: usa subtotais da DRE (ja calculados na planilha)
financeiro AS (
  SELECT
    store_id,
    period_month,
    MAX(CASE WHEN line_label ILIKE '%TOTAL RECEITA BRUTA%' THEN amount ELSE 0 END) AS receita_bruta,
    MAX(CASE WHEN line_label ILIKE '%RECEITA LIQUIDA%' THEN amount ELSE 0 END) AS receita_liquida,
    MAX(CASE WHEN line_label ILIKE '%MARGEM DE CONTRIBUI%' THEN amount ELSE 0 END) AS margem_contribuicao,
    MAX(CASE WHEN line_label ILIKE '%TOTAL DESPESAS FIXAS%' THEN amount ELSE 0 END) AS despesas_fixas,
    MAX(CASE WHEN line_label ILIKE '%Marketing e Trafego%' THEN amount ELSE 0 END) AS investimento_mkt,
    MAX(CASE WHEN line_label ILIKE '%LAJIDA%' THEN amount ELSE 0 END) AS ebitda,
    MAX(CASE WHEN line_label ILIKE '%LUCRO LIQUIDO%' THEN amount ELSE 0 END) AS lucro_liquido
  FROM fin_dre
  WHERE is_subtotal = TRUE OR line_label ILIKE '%Marketing%'
  GROUP BY store_id, period_month
),

-- Marketing: agregado por mes/loja
marketing AS (
  SELECT
    store_id,
    DATE_TRUNC('month', data_primeiro_contato)::DATE AS period_month,
    COUNT(*) AS leads_gerados,
    COUNT(*) FILTER (WHERE agendou = TRUE) AS agendamentos,
    COUNT(*) FILTER (WHERE compareceu = TRUE) AS comparecimentos,
    SUM(receita) AS receita_leads
  FROM mkt_lead_audit
  WHERE data_primeiro_contato IS NOT NULL
  GROUP BY store_id, DATE_TRUNC('month', data_primeiro_contato)
),

-- Operacional: agregado por mes/loja (Zandu real)
operacional AS (
  SELECT
    i.store_id,
    DATE_TRUNC('month', i.issued_at)::DATE AS period_month,
    SUM(i.amount) AS faturamento_real,
    COUNT(DISTINCT i.id) AS total_invoices
  FROM zandu_invoices i
  WHERE i.status = 'paid'
  GROUP BY i.store_id, DATE_TRUNC('month', i.issued_at)
),

-- Attendance rate
attendance AS (
  SELECT
    a.store_id,
    DATE_TRUNC('month', a.start_time)::DATE AS period_month,
    COUNT(*) AS total_appointments,
    COUNT(*) FILTER (WHERE a.status = 'completed') AS attended
  FROM zandu_appointments a
  GROUP BY a.store_id, DATE_TRUNC('month', a.start_time)
)

-- JOIN por periodo + loja
SELECT
  COALESCE(f.store_id, m.store_id, o.store_id, att.store_id) AS store_id,
  COALESCE(f.period_month, m.period_month, o.period_month, att.period_month) AS period_month,
  -- Financeiro (DRE)
  COALESCE(f.receita_bruta, 0) AS receita_bruta,
  COALESCE(f.receita_liquida, 0) AS receita_liquida,
  COALESCE(f.margem_contribuicao, 0) AS margem_contribuicao,
  COALESCE(f.despesas_fixas, 0) AS despesas_fixas,
  COALESCE(f.investimento_mkt, 0) AS investimento_mkt,
  COALESCE(f.ebitda, 0) AS ebitda,
  COALESCE(f.lucro_liquido, 0) AS lucro_liquido,
  -- Marketing
  COALESCE(m.leads_gerados, 0) AS leads_gerados,
  COALESCE(m.agendamentos, 0) AS agendamentos,
  COALESCE(m.comparecimentos, 0) AS comparecimentos,
  -- Operacional
  COALESCE(o.faturamento_real, 0) AS faturamento_real,
  COALESCE(o.total_invoices, 0) AS total_invoices,
  COALESCE(att.total_appointments, 0) AS total_appointments,
  COALESCE(att.attended, 0) AS attended,
  CASE WHEN att.total_appointments > 0
    THEN ROUND(att.attended::NUMERIC / att.total_appointments * 100, 1)
    ELSE 0
  END AS taxa_comparecimento
FROM financeiro f
FULL OUTER JOIN marketing m ON f.store_id = m.store_id AND f.period_month = m.period_month
FULL OUTER JOIN operacional o ON COALESCE(f.store_id, m.store_id) = o.store_id
  AND COALESCE(f.period_month, m.period_month) = o.period_month
FULL OUTER JOIN attendance att ON COALESCE(f.store_id, m.store_id, o.store_id) = att.store_id
  AND COALESCE(f.period_month, m.period_month, o.period_month) = att.period_month
ORDER BY period_month DESC, store_id;
```

**Design**: FULL OUTER JOIN entre 4 CTEs agregadas por (store_id, period_month). Isso resolve o problema de granularidades diferentes — tudo vira mensal antes do JOIN.

---

## Step 9: Looker Studio

1. Criar Data Source no Looker Studio → PostgreSQL connector
2. Host: `db.nrvazcesqvuqtlunqtnw.supabase.co`, Port: 5432, DB: `postgres`
3. Apontar para `vw_brisa_master_bi`
4. Criar dashboards com filtro por `store_id` e `period_month`

---

## Ordem de Execucao

| # | Step | Depende de | Estimativa |
|---|------|-----------|------------|
| 1 | Padronizar .env (Supabase) | — | Rapido |
| 2 | Refatorar scripts existentes (.env) | Step 1 | Rapido |
| 3 | ALTER TABLE store_id | — | Rapido |
| 4 | CREATE TABLE fin_dre | — | Rapido |
| 5 | CREATE TABLE mkt_lead_audit | — | Rapido |
| 6 | Script sync_leads.ts | Steps 1, 5 | Medio |
| 7 | Script sync_dre.ts | Steps 1, 4 + **layout DRE confirmado** | Medio |
| 8 | Fluxos n8n (DRE + Marketing) | Steps 6, 7 | Medio |
| 9 | CREATE VIEW vw_brisa_master_bi | Steps 3, 4, 5 | Rapido |
| 10 | Conectar Looker Studio | Step 9 | Rapido |

---

## Verificacao

1. **Apos Step 2**: Rodar `npx tsx scripts/backfill_dashboard.ts` — deve funcionar identico
2. **Apos Step 3**: Query `SELECT store_id FROM zandu_persons LIMIT 5` — deve retornar 'brisa-matriz'
3. **Apos Steps 4-5**: Query `SELECT * FROM fin_dre LIMIT 1` e `SELECT * FROM mkt_lead_audit LIMIT 1` — tabelas existem
4. **Apos Step 6**: Rodar `npx tsx scripts/sync_leads.ts` — deve popular mkt_lead_audit com dados da planilha
5. **Apos Step 7**: Rodar `npx tsx scripts/sync_dre.ts` — deve popular fin_dre
6. **Apos Step 9**: Query `SELECT * FROM vw_brisa_master_bi` — deve retornar dados cruzados
7. **Apos Step 10**: Dashboard Looker mostra dados filtrados por loja e periodo

---

## Decisoes Tomadas

1. **Layout DRE**: Confirmado — categorias nas linhas (36), meses nas colunas (18). Sheet ID: `15LOh89f0hS2GriYC_ay1Lq296rmwOcNYV3Yc1EXmBWs`
2. **Execucao**: Scripts locais (backfill manual) + fluxos n8n (sync automatico diario)
3. **Tabela marketing unica**: `mkt_lead_audit` (sem `mkt_leads_full` separada)
4. **~600 leads** na planilha de marcacao, com plataformas: Google Ads, Meta Ads, Organic, Instagram, Indication, Passante
