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

## 2. Especificação: Cards de KPI (Pro-Max Sparklines)
Para que os cards de Resumo Executivo fiquem com a densidade visual premium ("Pro-Max"), a View do banco não deve devolver apenas o valor fechado, mas sim um objeto rico:

**Objeto Esperado por KPI (Ex: Receita Bruta):**
```json
{
  "value": 150000.00,
  "previous_period_percentage": 8.4, 
  // Regra: Se o preset for '7d', compara com os 7 dias ANTERIORES.
  "trend": "up", // 'up' | 'down'
  "sparkline_data": [
      // Regra: ARRAY OBRIGATÓRIO DE 15 a 30 DIAS FIXOS (Independente do preset selecionado).
      // Isso serve apenas para desenhar a ondinha de mini-gráfico de fundo de tendência mensal.
      {"val": 1200}, {"val": 1500}, /* ... */
  ]
}
```

---

## 3. Especificação: Gráfico Principal (Receita vs Despesas Estratégicas)
O gráfico central em ciano e laranja interativo altera sua granularidade com base no `period_preset`:
- Se **'today'**: O backend deve agrupar de hora em hora (24 pontos).
- Se **'7d'**: O backend deve agrupar por Dia da Semana (7 pontos - Seg, Ter, Qua).
- Se **'30d'** ou **'custom'**: O backend deve agrupar por data corrida (Ex: 1 Mar, 2 Mar...).

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

## 6. Histórico de Entregas (Até o momento)
- [x] Construção do Layout Base (Sidebar SVG Brisa Premium, Menu Superior).
- [x] Componentização de DateSegmentedControl (Hoje, 7d, 30d).
- [x] Mockagem dos módulos DRE (Matriz Híbrida) e Resumo.
- [x] Otimização "Command Center": Cards ultracompactos com minis gráficos (Sparklines).
- [x] Otimização Gráfico Principal com efeitos de vidro, preenchimento cíano e linha target tracejada.
- [x] Telas de Gestão de OKRs e Status da Integração prontas no lado do cliente.
