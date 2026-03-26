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
- **Estado Atual (26/03/2026)**:
    - [x] **Fase 2 (UI Polish)**: Layout Pro-Max v1.2 concluído e estável.
    - [x] **KPICards**: Redesenhados com Densidade Extra-Bold (800) e ritmo vertical otimizado.
    - [x] **Charts Premium**: Donut Chart interativo com brilho neon e layout de legendas laterais.
    - [x] **Deploy Fix**: Resolução de conflitos de tipos TS para deploy contínuo.
    - [ ] **Fase 3 (Backend Integration)**: Implementação de PDF Export e Metas Dinâmicas (OKR Engine).
