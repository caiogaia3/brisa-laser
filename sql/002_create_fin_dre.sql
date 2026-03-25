-- Step 3: Tabela DRE (Demonstrativo de Resultado do Exercicio)
-- Fonte: Planilha "Controle Financeiro Brisa" (aba DRE)
-- Layout: 36 categorias (linhas) x 18 meses (colunas)
-- Sheet ID: 15LOh89f0hS2GriYC_ay1Lq296rmwOcNYV3Yc1EXmBWs

CREATE TABLE IF NOT EXISTS public.fin_dre (
  id            UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  store_id      TEXT NOT NULL DEFAULT 'brisa-matriz',
  period_month  DATE NOT NULL,            -- primeiro dia do mes (ex: 2026-03-01)
  category      TEXT NOT NULL,            -- 'receita', 'deducao', 'custo_variavel', 'despesa_fixa', 'pro_labore', 'financeiro', 'caixa'
  line_label    TEXT NOT NULL,            -- label original da DRE: "(+) Vendas PIX / Dinheiro"
  is_subtotal   BOOLEAN DEFAULT FALSE,    -- TRUE para linhas totalizadoras (TOTAL, MARGEM, EBITDA, LUCRO, SALDO)
  amount        NUMERIC(12,2) NOT NULL DEFAULT 0,
  created_at    TIMESTAMPTZ DEFAULT NOW(),
  updated_at    TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(store_id, period_month, line_label)
);

CREATE INDEX IF NOT EXISTS idx_fin_dre_period ON fin_dre(period_month);
CREATE INDEX IF NOT EXISTS idx_fin_dre_store ON fin_dre(store_id);
CREATE INDEX IF NOT EXISTS idx_fin_dre_category ON fin_dre(category);
