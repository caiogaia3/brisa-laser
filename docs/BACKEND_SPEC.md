# 🚦 Brisa Intelligence: Backend-Frontend Contract (SPEC)

Este arquivo é o **Contrato de Migalhas**. Ele define exatamente o que o React espera receber do Supabase para que a interface "acenda" sem ajustes de código.

---

## 💎 1. View Master: `vw_brisa_master_bi`
Usada nos King KPIs da Home e nos Sparklines de tendência.

### JSON Contract
```json
{
  "period_month": "2024-03",
  "receita_total": 450000.00,
  "ebitda": 120000.00,
  "lucro_liquido": 85000.00,
  "investimento_mkt_real": 35000.00,
  "leads_gerados": 1250,
  "agendamentos": 450,
  "comparecimentos": 320,
  "taxa_comparecimento": 0.71,
  "custo_por_lead": 28.00,
  "roas": 12.8
}
```

### SQL Sugerido
```sql
CREATE OR REPLACE VIEW vw_brisa_master_bi AS
SELECT 
  DATE_TRUNC('month', created_at) as period_month,
  SUM(receita) as receita_total,
  SUM(investimento_ads) as investimento_mkt_real,
  COUNT(DISTINCT lead_id) filter (where status = 'ganho') as leads_gerados,
  -- Adicionar demais métricas calculadas aqui
FROM raw_data
GROUP BY 1, 2;
```

---

## 📜 2. Tabela OKR: `okr_goals`
Usada no componente `OKRList` para acompanhamento estratégico.

### JSON Contract
```json
{
  "id": "uuid",
  "category": "MARKETING",
  "title": "ROAS Premium (META)",
  "current": 4.2,
  "target": 5.0,
  "unit": "x",
  "prefix": "",
  "tooltip_title": "ROAS por Canal",
  "tooltip_content": "Métrica de eficiência de Ads...",
  "secondary_okrs": [
    {"label": "Direct Traffic", "progress": 85},
    {"label": "Referral", "progress": 100}
  ]
}
```

---

## 📊 3. Gráficos Pro-Max: `vw_financeiro_trends`
Dados temporais para o `ProMaxRevenueChart` e `DoubleTrendChart`.

### JSON Contract (Time-Series)
```json
[
  { "name": "01/03", "revenue": 15000, "spend": 4000, "margin": 0.73 },
  { "name": "02/03", "revenue": 18000, "spend": 4200, "margin": 0.76 }
]
```

---

## 🚦 Regras de Sincronia (IA Rules)
1. **Contract-First**: Todo novo componente de dados em `src/features/` DEVE ter seu contrato definido aqui antes de ser implementado com mocks.
2. **Interface Parity**: As interfaces em `hub/src/lib/types.ts` devem ser o espelho fiel deste arquivo.
3. **Mock Validation**: O arquivo `use[Feature]Mock.ts` deve usar este JSON como base.

---
*Para dúvidas sobre o histórico de dados, consulte [archive/history_sessions.md](file:///Users/CaioGaia/Documents/PROJETOS%20/temp/brisa-laser/archive/history_sessions.md).*
