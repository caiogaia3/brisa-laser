# Especificações de Backend (Brisa Hub CommandCenter)
**Metodologia:** Spec-Driven Development (SDD)
**Status do Projeto:** Fase Frontend Mockada concluída. Fase de Integração Banco de Dados (Pendente).

Este documento serve como a **Única Fonte da Verdade** (Single Source of Truth) para a engenharia de dados do Backend (Supabase + n8n) em relação ao que o Frontend espera receber para plotar os gráficos do CFO Dashboard.

---

## 1. Regras de Filtro Globais (Period & Store)
Todas as requisições API/Views do Supabase precisarão receber 2 parâmetros ou reagir a eles:
- `store_id`: `'consolidado'` | `'brisa_laser'` | `'brisa_premium'`
- `period_preset`: `'today'` | `'7d'` | `'30d'` | `'custom'` (com `start_date` e `end_date`).

---
 
## 2. Especificação: Cards de KPI (Pro-Max v1.2)
Para que os cards de Resumo Executivo fiquem com a densidade visual premium ("Pro-Max"), a View do banco deve devolver:

**Objeto Esperado por KPI (Ex: Receita Bruta):**
```json
{
  "value": "R$ 150.000,00", // Retorno em STRING formatada (pt-BR)
  "change_percentage": 8.4, 
  "sparkline_data": [
      {"val": 1200}, {"val": 1500} /* ARRAY OBRIGATÓRIO DE 20 pontos */
  ]
}
```

---

## 3. Especificação: Gráficos Premium (Visual Layer)
- **Margem Donut**: O backend deve prover as 3 métricas base: `receita_bruta`, `despesas_fixas` e `despesas_totais`. O frontend calculará a "Margem Saudável" e o "Lucro Líquido" para o Donut.
- **Break-even Progress**: Requer `receita_bruta` e `breakeven` (meta). O componente linear gerencia o progresso percentual e o efeito LED.
O gráfico central em ciano e laranja interativo altera sua granularidade com base no `period_preset`:
- Se **'today'**: O backend deve agrupar de hora em hora (24 pontos).
---

## 3.1 Especificação: Resumo de Marketing (Composite Data)
A aba 'Resumo' do Marketing consolidará 4 fontes em um único payload:
- **Google Ads**: Spend, Clicks, Conversions.
- **Meta Ads**: Spend, Leads, CPL.
- **GA4**: Sessions, Bounce Rate, Events.
- **CRM (n8n)**: Leads Verificados, Status, Receita.

**Payload `/marketing/summary`:**
```json
{
  "performance": { "roas": 4.2, "roi": 1.5 },
  "sources": {
    "google": { "spend": 1200, "clicks": 450 },
    "meta": { "spend": 900, "leads": 48 },
    "ga4": { "sessions": 1500 }
  },
  "crm": { "total_leads": 60, "agendados": 12 }
}
```

---

## 4. Especificação: Motor de OKRs (Metas Dinâmicas)
Não chumbaremos metas no frontend. Elas virão de uma tabela dedicada no Supabase para permitir que a diretoria mude a meta de um mês sem precisar de *deploy* de código.

**Tabela: `okr_goals`**
- `id` (uuid)
- `store_id` (varchar) - Ex: 'brisa_laser'
- `period_month` (int) - Ex: 3
- `period_year` (int) - Ex: 2026
- `metric_name` (varchar) - Ex: 'receita_bruta', 'teto_despesas', 'margem_saudavel'
- `target_value` (numeric)

---

## 5. Especificação: Gestão de Acessos (RBAC - Tela Configurações)
O controle de qual loja um usuário pode ver:
- Usuários terão uma *role* ou *access_level* na tabela de perfis (Ex: `role = 'manager', allowed_stores = ['brisa_laser']`).
- O frontend ocultará o `StoreSelector` ou desabilitará opções não contidas nesse array.

---

## 7. Lógica dos Assets Master (King Dashboard v1.5) 👑
Esta seção define o cálculo e a origem de dados para os indicadores de v1.5 ("Liquid Glass").

### 💎 7.1 King KPIs (Elite Layer)
| KPI | Fórmula | Origem de Dados (Supabase) |
| :--- | :--- | :--- |
| **ATV** | `sum(venda_valor) / count(agendamentos_realizados)` | `zandu_sync` + `leads_consolidados` |
| **LTV/CAC** | `avg(faturamento_vida_lead) / avg(investimento_total / leads_venda)` | `crm_metrics` (v_total_ltv_cac) |
| **Gross Margin**| `(faturamento - custos_diretos) / faturamento` | `fin_dre_consolidado` |
| **Show-up Rate**| `count(status='presente') / count(agendamentos)` | `zandu_agendamentos` |
| **Asset Eff.** | `horas_disparo_laser / horas_disponiveis_agenda` | `laser_utilization_log` |

### 📊 7.2 King Charts (Intelligence Crossing)
- **ROAS por Origem**: Cruzamento de `sum(ads_spend)` (Meta/Google) vs `sum(receita_confirmada)` (CRM) agrupado por `utm_source`.
- **Matriz de LTV (Radar)**: View `v_channel_intelligence` que normaliza scores (0-100) para Volume, CAC e LTV.
- **Payback Timeline**: Cálculo cumulativo `(lucro_diário - investimento_inicial)` ao longo de 90 dias para cada campanha.
- **Eficiência de Ativo**: `receita_gerada / horas_em_uso` segmentado por `body_area` (Axila, Perna, etc).

---

## 8. Histórico de Entregas (Até o momento)
- **Estado Atual (26/03/2026)**:
    - [x] **Fase 4 (King Dashboard)**: Interface v1.5 "Liquid Glass" com Aba Resumo concluída.
    - [x] **King Charts Implementation**: ROAS, LTV Radar, Payback e Asset Efficiency em React Estável.
    - [/] **Fase 5 (Integration Logic)**: Mapeamento de lógica de assets no `BACKEND_SPEC.md` iniciado.
