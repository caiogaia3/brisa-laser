-- Step 8: View Master para Looker Studio (SSOT)
-- FULL OUTER JOIN entre 4 CTEs agregadas por (store_id, period_month)
-- Resolve granularidades diferentes: tudo vira mensal antes do JOIN

CREATE OR REPLACE VIEW public.vw_brisa_master_bi AS
WITH
-- Financeiro: usa subtotais da DRE (ja calculados na planilha)
-- Usando ILIKE com % para ignorar acentos e prefixos (=)
financeiro AS (
  SELECT
    store_id,
    period_month,
    MAX(CASE WHEN line_label ILIKE '%TOTAL RECEITA BRUTA%' THEN amount ELSE 0 END) AS receita_bruta,
    MAX(CASE WHEN line_label ILIKE '%RECEITA L%QUIDA%' THEN amount ELSE 0 END) AS receita_liquida,
    MAX(CASE WHEN line_label ILIKE '%MARGEM DE CONTRIBUI%' THEN amount ELSE 0 END) AS margem_contribuicao,
    MAX(CASE WHEN line_label ILIKE '%TOTAL DESPESAS FIXAS%' THEN amount ELSE 0 END) AS despesas_fixas,
    MAX(CASE WHEN line_label ILIKE '%Marketing%' THEN amount ELSE 0 END) AS investimento_mkt,
    MAX(CASE WHEN line_label ILIKE '%LAJIDA%' THEN amount ELSE 0 END) AS ebitda,
    MAX(CASE WHEN line_label ILIKE '%LUCRO L%QUIDO%' THEN amount ELSE 0 END) AS lucro_liquido
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

-- Operacional: faturamento real (invoices do Zandu)
-- Status 'closed' é o status final para invoices pagas no Zandu
operacional AS (
  SELECT
    i.store_id,
    DATE_TRUNC('month', i.issued_at)::DATE AS period_month,
    SUM(i.amount) AS faturamento_real,
    COUNT(DISTINCT i.id) AS total_invoices
  FROM zandu_invoices i
  WHERE i.status IN ('closed', 'paid')
  GROUP BY i.store_id, DATE_TRUNC('month', i.issued_at)
),

-- Taxa de comparecimento (appointments do Zandu)
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
  COALESCE(m.receita_leads, 0) AS receita_leads,
  -- Operacional (Zandu)
  COALESCE(o.faturamento_real, 0) AS faturamento_real,
  COALESCE(o.total_invoices, 0) AS total_invoices,
  COALESCE(att.total_appointments, 0) AS total_appointments,
  COALESCE(att.attended, 0) AS attended,
  CASE WHEN att.total_appointments > 0
    THEN ROUND(att.attended::NUMERIC / att.total_appointments * 100, 1)
    ELSE 0
  END AS taxa_comparecimento
FROM financeiro f
FULL OUTER JOIN marketing m
  ON f.store_id = m.store_id AND f.period_month = m.period_month
FULL OUTER JOIN operacional o
  ON COALESCE(f.store_id, m.store_id) = o.store_id
  AND COALESCE(f.period_month, m.period_month) = o.period_month
FULL OUTER JOIN attendance att
  ON COALESCE(f.store_id, m.store_id, o.store_id) = att.store_id
  AND COALESCE(f.period_month, m.period_month, o.period_month) = att.period_month
ORDER BY period_month DESC, store_id;
