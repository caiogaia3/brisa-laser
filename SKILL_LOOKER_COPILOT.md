# Skill: Looker Studio Copilot — Brisa Laser Dashboard Mestre

> **Para**: Antigravity (Jarvis) usar como contexto ao configurar o Looker Studio
> **Projeto**: Brisa Laser — Dashboard Mestre SSOT
> **Atualizado**: 25/03/2026

---

## 1. Conexao com o Supabase

### Credenciais PostgreSQL (Looker Studio Data Source)

| Campo | Valor |
|-------|-------|
| **Tipo** | PostgreSQL |
| **Host** | `db.nrvazcesqvuqtlunqtnw.supabase.co` |
| **Port** | `5432` |
| **Database** | `postgres` |
| **Schema** | `public` |
| **Tabela/View** | `vw_brisa_master_bi` |

> **IMPORTANTE**: Usar a **view** `vw_brisa_master_bi`, nunca as tabelas diretamente. A view ja faz todos os JOINs e agregacoes.

### Credenciais de acesso
- Buscar usuario e senha do Supabase em: **Settings → Database → Connection String** no painel do Supabase
- Projeto Supabase: `nrvazcesqvuqtlunqtnw`

---

## 2. Campos disponiveis na View

A `vw_brisa_master_bi` retorna **1 linha por mes por loja** com os seguintes campos:

### Dimensoes (filtros)
| Campo | Tipo | Descricao |
|-------|------|-----------|
| `store_id` | TEXT | Identificador da loja (`brisa-matriz`, futuras lojas) |
| `period_month` | DATE | Primeiro dia do mes (ex: `2026-03-01`) |

### Metricas Financeiras (DRE)
| Campo | Tipo | Fonte | Descricao |
|-------|------|-------|-----------|
| `receita_bruta` | NUMERIC | Planilha DRE | Total de vendas (PIX + Cartao + Ativos + Locacao) |
| `receita_liquida` | NUMERIC | Planilha DRE | Receita bruta - impostos - estornos |
| `margem_contribuicao` | NUMERIC | Planilha DRE | Receita liquida - custos variaveis |
| `despesas_fixas` | NUMERIC | Planilha DRE | Aluguel + salarios + sistemas + etc |
| `investimento_mkt` | NUMERIC | Planilha DRE | Gasto com Marketing e Trafego |
| `ebitda` | NUMERIC | Planilha DRE | LAJIDA (margem - despesas - pro-labore) |
| `lucro_liquido` | NUMERIC | Planilha DRE | Lucro final apos financeiro |

### Metricas de Marketing (Funil)
| Campo | Tipo | Fonte | Descricao |
|-------|------|-------|-----------|
| `leads_gerados` | INTEGER | Planilha Leads | Total de leads no mes |
| `agendamentos` | INTEGER | Planilha Leads | Leads que agendaram |
| `comparecimentos` | INTEGER | Planilha Leads | Leads que compareceram |
| `receita_leads` | NUMERIC | Planilha Leads | Receita atribuida aos leads |

### Metricas Operacionais (Zandu)
| Campo | Tipo | Fonte | Descricao |
|-------|------|-------|-----------|
| `faturamento_real` | NUMERIC | Zandu API | Soma de invoices pagas (receita real confirmada) |
| `total_invoices` | INTEGER | Zandu API | Qtd de invoices pagas |
| `total_appointments` | INTEGER | Zandu API | Total de agendamentos no Zandu |
| `attended` | INTEGER | Zandu API | Agendamentos concluidos |
| `taxa_comparecimento` | NUMERIC | Calculado | `attended / total_appointments * 100` (%) |

---

## 3. KPIs sugeridos para o Dashboard

### Pagina 1: Visao Executiva (CEO View)

| KPI | Formula | Visualizacao |
|-----|---------|--------------|
| **Receita Bruta** | `SUM(receita_bruta)` | Scorecard com comparativo MoM |
| **Lucro Liquido** | `SUM(lucro_liquido)` | Scorecard com cor (verde/vermelho) |
| **Margem Liquida %** | `lucro_liquido / receita_bruta * 100` | Gauge (0-30%) |
| **EBITDA** | `SUM(ebitda)` | Scorecard |
| **Evolucao Mensal** | receita_bruta + lucro_liquido por `period_month` | Line chart (2 series) |
| **DRE Resumida** | Todos os campos financeiros por mes | Table chart |

### Pagina 2: Marketing & Funil

| KPI | Formula | Visualizacao |
|-----|---------|--------------|
| **CPL (Custo por Lead)** | `investimento_mkt / leads_gerados` | Scorecard |
| **CAC (Custo de Aquisicao)** | `investimento_mkt / comparecimentos` | Scorecard |
| **ROAS** | `receita_leads / investimento_mkt` | Scorecard |
| **Taxa de Conversao** | `comparecimentos / leads_gerados * 100` | Gauge (0-50%) |
| **Taxa de Agendamento** | `agendamentos / leads_gerados * 100` | Gauge |
| **Funil** | leads → agendamentos → comparecimentos | Funnel chart |
| **Evolucao do Funil** | Por `period_month` | Stacked bar chart |

### Pagina 3: Operacional

| KPI | Formula | Visualizacao |
|-----|---------|--------------|
| **Faturamento Real** | `SUM(faturamento_real)` | Scorecard vs receita_bruta |
| **Taxa de Comparecimento** | `AVG(taxa_comparecimento)` | Gauge (meta: 70%+) |
| **Ticket Medio** | `faturamento_real / total_invoices` | Scorecard |
| **No-show Rate** | `100 - taxa_comparecimento` | Scorecard (vermelho se > 30%) |
| **Comparativo DRE vs Real** | receita_bruta vs faturamento_real | Combo chart |

---

## 4. Filtros obrigatorios

Toda pagina deve ter:
1. **Date Range** → `period_month` (tipo DATE, filtro de intervalo)
2. **Loja** → `store_id` (dropdown, default: "brisa-matriz")

---

## 5. Tabelas auxiliares (se precisar de drill-down)

Alem da view master, estas tabelas estao disponiveis para data sources adicionais no Looker:

| Tabela | Granularidade | Campos-chave |
|--------|--------------|--------------|
| `fin_dre` | Linha DRE por mes | `category`, `line_label`, `is_subtotal`, `amount`, `period_month` |
| `mkt_lead_audit` | Por lead individual | `nome`, `phone_clean`, `utm_source`, `agendou`, `compareceu`, `receita`, `qtd_areas` |
| `zandu_persons` | Por pessoa | `full_name`, `utm_source`, `utm_campaign` |
| `zandu_invoices` | Por invoice | `person_id`, `status`, `amount`, `issued_at` |
| `zandu_appointments` | Por agendamento | `person_id`, `start_time`, `status` |

### Drill-down sugerido: Marketing por plataforma
```sql
-- Data source custom para breakdown por plataforma
SELECT
  store_id,
  DATE_TRUNC('month', data_primeiro_contato)::DATE AS period_month,
  utm_source AS plataforma,
  COUNT(*) AS leads,
  COUNT(*) FILTER (WHERE agendou) AS agendou,
  COUNT(*) FILTER (WHERE compareceu) AS compareceu,
  SUM(receita) AS receita
FROM mkt_lead_audit
WHERE data_primeiro_contato IS NOT NULL
GROUP BY store_id, DATE_TRUNC('month', data_primeiro_contato), utm_source
ORDER BY period_month DESC, leads DESC;
```

### Drill-down sugerido: DRE detalhada
```sql
-- Data source custom para DRE completa (todas as linhas)
SELECT
  store_id,
  period_month,
  category,
  line_label,
  is_subtotal,
  amount
FROM fin_dre
ORDER BY period_month DESC,
  CASE category
    WHEN 'receita' THEN 1
    WHEN 'deducao' THEN 2
    WHEN 'custo_variavel' THEN 3
    WHEN 'despesa_fixa' THEN 4
    WHEN 'pro_labore' THEN 5
    WHEN 'financeiro' THEN 6
    WHEN 'caixa' THEN 7
  END;
```

---

## 6. Paleta de cores sugerida (Brisa Laser)

| Uso | Cor | Hex |
|-----|-----|-----|
| Primaria (Receita, positivo) | Azul Brisa | `#1A73E8` |
| Secundaria (Marketing) | Roxo | `#7B1FA2` |
| Sucesso (Lucro, Compareceu) | Verde | `#0F9D58` |
| Alerta (Custo, No-show) | Vermelho | `#DB4437` |
| Neutro (Labels) | Cinza | `#5F6368` |
| Background | Branco | `#FFFFFF` |

---

## 7. Checklist de criacao

- [ ] Criar Data Source PostgreSQL apontando para `vw_brisa_master_bi`
- [ ] Configurar `period_month` como tipo DATE (nao STRING)
- [ ] Criar filtro global de `store_id` e `period_month`
- [ ] Pagina 1: Visao Executiva (scorecards + line chart + table DRE)
- [ ] Pagina 2: Marketing & Funil (CPL, CAC, ROAS, funnel chart)
- [ ] Pagina 3: Operacional (faturamento real, taxa comparecimento, ticket medio)
- [ ] (Opcional) Data source adicional: query custom de breakdown por plataforma
- [ ] (Opcional) Data source adicional: DRE detalhada para table drill-down
- [ ] Testar filtros por loja e periodo
- [ ] Compartilhar dashboard com stakeholders

---

## 8. Blindagens no Looker

1. **Nunca editar a view SQL pelo Looker** — alteracoes na `vw_brisa_master_bi` devem ser feitas no Supabase SQL Editor e commitadas no repo (`sql/004_create_view_master.sql`)
2. **Custom queries** para drill-down devem ser criadas como Data Sources separados, nao alterar a view master
3. **Campos calculados no Looker** (CPL, CAC, ROAS, margens %) devem usar os campos da view, nao fazer calculos brutos
4. **Ao adicionar nova loja**: nenhuma alteracao no Looker necessaria — o filtro `store_id` ja suporta multiplas lojas automaticamente
