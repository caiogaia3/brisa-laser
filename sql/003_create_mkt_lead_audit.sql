-- Step 4: Tabela de Auditoria de Leads (Marketing)
-- Fonte: Planilha "Marcacao de Leads" (aba CAMPANHAS)
-- Sheet ID: 14Lxf4lJoKRFTkzGyDgNYvLzJZlLY7WUZb25YzI1cUQU (GID 551067343)
-- ~600+ leads, Jun/2025 a Mar/2026

CREATE TABLE IF NOT EXISTS public.mkt_lead_audit (
  id                    UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  store_id              TEXT NOT NULL DEFAULT 'brisa-matriz',
  zandu_person_id       TEXT,              -- FK logica para zandu_persons.id (match por telefone)
  kommo_lead_id         BIGINT,
  phone_clean           TEXT,              -- 8 ultimos digitos do telefone
  nome                  TEXT,
  utm_source            TEXT,              -- 'Meta Ads', 'Google Ads', 'Organic', 'Instagram', 'Indication', 'Passante'
  utm_campaign          TEXT,
  data_primeiro_contato DATE,
  data_ultimo_contato   DATE,
  agendou               BOOLEAN DEFAULT FALSE,
  compareceu            BOOLEAN DEFAULT FALSE,
  qtd_areas             NUMERIC(4,2),
  receita               NUMERIC(12,2) DEFAULT 0,
  audit_status          TEXT DEFAULT 'pendente',  -- 'pendente', 'validado', 'descartado'
  created_at            TIMESTAMPTZ DEFAULT NOW(),
  updated_at            TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(store_id, phone_clean)
);

CREATE INDEX IF NOT EXISTS idx_mkt_lead_phone ON mkt_lead_audit(phone_clean);
CREATE INDEX IF NOT EXISTS idx_mkt_lead_store ON mkt_lead_audit(store_id);
CREATE INDEX IF NOT EXISTS idx_mkt_lead_source ON mkt_lead_audit(utm_source);
