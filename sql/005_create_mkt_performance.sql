-- Tabelas de Performance de Marketing
-- Permitem que o n8n injete dados de custo e tráfego

-- 1. Performance de Ads (Meta + Google)
CREATE TABLE IF NOT EXISTS mkt_performance_ads (
    id BIGSERIAL PRIMARY KEY,
    date DATE NOT NULL,
    platform TEXT NOT NULL, -- 'google' ou 'meta'
    store_id TEXT, -- Para vincular a uma unidade específica se necessário
    campaign_name TEXT,
    cost NUMERIC DEFAULT 0,
    impressions INT DEFAULT 0,
    clicks INT DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(date, platform, campaign_name)
);

-- 2. Report de Analytics (GA4)
CREATE TABLE IF NOT EXISTS mkt_analytics_report (
    id BIGSERIAL PRIMARY KEY,
    date DATE NOT NULL UNIQUE,
    sessions INT DEFAULT 0,
    active_users INT DEFAULT 0,
    key_events INT DEFAULT 0, -- Conversões configuradas no GA4
    bounce_rate NUMERIC,
    avg_session_duration NUMERIC,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Ativar RLS (Segurança)
ALTER TABLE mkt_performance_ads ENABLE ROW LEVEL SECURITY;
ALTER TABLE mkt_analytics_report ENABLE ROW LEVEL SECURITY;

-- Sugestão: Adicionar políticas de acesso se houver múltiplos usuários
-- Por enquanto, apenas para acesso do n8n (Service Role)
