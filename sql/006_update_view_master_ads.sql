-- View Master BI v3 (com colunas alinhadas ao Frontend Hub)
-- Unifica Financeiro (DRE), Marketing Leads, Performance de Ads e Analytics
-- Mantém: period_month, ebitda, lucro_liquido, leads_gerados, taxa_comparecimento

DROP VIEW IF EXISTS vw_brisa_master_bi;

CREATE OR REPLACE VIEW vw_brisa_master_bi AS
WITH mkt_ads AS (
    SELECT 
        DATE_TRUNC('month', date)::DATE as period,
        store_id,
        SUM(cost) as total_ads_spend,
        SUM(clicks) as total_ads_clicks,
        SUM(impressions) as total_ads_impressions
    FROM mkt_performance_ads
    GROUP BY 1, 2
),
mkt_ga4 AS (
    SELECT 
        DATE_TRUNC('month', date)::DATE as period,
        SUM(sessions) as total_sessions,
        SUM(key_events) as total_conversions
    FROM mkt_analytics_report
    GROUP BY 1
),
fin AS (
    SELECT 
        period_month as period,
        store_id,
        SUM(CASE WHEN line_label ILIKE '%TOTAL RECEITA BRUTA%' THEN amount ELSE 0 END) as receita_bruta,
        SUM(CASE WHEN line_label ILIKE '%LAJIDA%' OR line_label ILIKE '%EBITDA%' THEN amount ELSE 0 END) as ebitda,
        SUM(CASE WHEN line_label ILIKE '%LUCRO L%QUIDO%' THEN amount ELSE 0 END) as lucro_liquido,
        SUM(CASE WHEN line_label ILIKE '%Marketing%' THEN amount ELSE 0 END) as mkt_dre_spend
    FROM fin_dre
    WHERE is_subtotal = TRUE OR line_label ILIKE '%Marketing%'
    GROUP BY 1, 2
),
leads AS (
    SELECT 
        DATE_TRUNC('month', CAST(data_primeiro_contato AS DATE))::DATE as period,
        store_id,
        COUNT(*) as total_leads,
        COUNT(CASE WHEN agendou = true THEN 1 END) as total_agendados,
        COUNT(CASE WHEN compareceu = true THEN 1 END) as total_comparecidos,
        SUM(COALESCE(receita, 0)) as receita_atribuida_leads
    FROM mkt_lead_audit
    GROUP BY 1, 2
)
SELECT 
    COALESCE(f.period, l.period, a.period, g.period) as period_month,
    COALESCE(f.store_id, l.store_id, a.store_id, 'brisa-matriz') as store_id,
    
    -- Financeiro
    COALESCE(f.receita_bruta, 0) as receita_total,
    COALESCE(f.ebitda, 0) as ebitda,
    COALESCE(f.lucro_liquido, 0) as lucro_liquido,
    
    -- Marketing Investimento
    GREATEST(COALESCE(f.mkt_dre_spend, 0), COALESCE(a.total_ads_spend, 0)) as investimento_mkt_real,
    
    -- Marketing Performance (Leads)
    COALESCE(l.total_leads, 0) as leads_gerados,
    COALESCE(l.total_agendados, 0) as agendamentos,
    COALESCE(l.total_comparecidos, 0) as comparecimentos,
    
    -- Taxa de comparecimento
    CASE WHEN COALESCE(l.total_agendados, 0) > 0 
         THEN ROUND(COALESCE(l.total_comparecidos, 0)::NUMERIC / l.total_agendados * 100, 1)
         ELSE 0 END as taxa_comparecimento,
    
    -- Conversão & ROI
    CASE WHEN COALESCE(l.total_leads, 0) > 0 
         THEN GREATEST(COALESCE(f.mkt_dre_spend, 0), COALESCE(a.total_ads_spend, 0)) / l.total_leads 
         ELSE 0 END as custo_por_lead,
         
    CASE WHEN GREATEST(COALESCE(f.mkt_dre_spend, 0), COALESCE(a.total_ads_spend, 0)) > 0 
         THEN COALESCE(f.receita_bruta, 0) / GREATEST(COALESCE(f.mkt_dre_spend, 0), COALESCE(a.total_ads_spend, 0))
         ELSE 0 END as roas,
         
    -- Tráfego (GA4)
    COALESCE(g.total_sessions, 0) as sessoes_site,
    COALESCE(g.total_conversions, 0) as conversoes_site

FROM fin f
FULL OUTER JOIN leads l ON f.period = l.period AND f.store_id = l.store_id
FULL OUTER JOIN mkt_ads a ON COALESCE(f.period, l.period) = a.period AND COALESCE(f.store_id, l.store_id) = a.store_id
FULL OUTER JOIN mkt_ga4 g ON COALESCE(f.period, l.period, a.period) = g.period;
