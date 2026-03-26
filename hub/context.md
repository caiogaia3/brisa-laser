# Contexto do Projeto: Brisa Intelligence Hub (CommandCenter)

## 📌 Visão Geral
O **Brisa Intelligence Hub** é o cockpit de BI de alta performance da Brisa Laser. O objetivo é consolidar dados financeiros (DRE), marketing (Ads/Leads) e operacionais (Zandu) em uma única interface "CommandCenter" para apoio à tomada de decisão do CFO/CEO.

## 🚀 Estado Atual (26/03/2026)
- **Fase**: Desenvolvimento de UI Pro-Max e Motor de OKRs.
- **Frontend**: 
    - Layout CommandCenter implementado (High-Density).
    - Sidebar premium com logo SVG e links reorganizados.
    - Header compacto com seletores de Loja e Período (Hoje, 7d, 30d).
    - KPICards com **Sparklines** (mini-gráficos de tendência) e indicadores de variação percentual.
    - Gráfico Principal (Receita vs Despesas) com gradiente ciano e linha target tracejada.
- **Backend/Specs**:
    - [BACKEND_SPEC.md](./BACKEND_SPEC.md) criado como contrato SSOT para as Views do Supabase.
    - Planejamento de tabela `okr_goals` para metas dinâmicas.

## 🔗 Atalhos Rápidos
- [Especificações de Backend](./BACKEND_SPEC.md)
- [Guia do Oráculo (CFO)](./CFO.md)
- [Regras de Desenvolvimento (CLAUDE.md)](./CLAUDE.md)

## 🛠 Próximos Passos
1. Implementar Gerador de PDF Corporativo para o DRE (Marca d'água Brisa).
2. Integrar `okr_goals` do Supabase para substituir dados mockados.
3. Plugar as views reais de produção no Gráfico Principal.
