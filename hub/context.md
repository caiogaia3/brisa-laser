# Contexto do Projeto: Brisa Intelligence Hub (CommandCenter)

## 📌 Visão Geral
O **Brisa Intelligence Hub** é o cockpit de BI de alta performance da Brisa Laser. O objetivo é consolidar dados financeiros (DRE), marketing (Ads/Leads) e operacionais (Zandu) em uma única interface "CommandCenter" para apoio à tomada de decisão do CFO/CEO.

## 🚀 Estado Atual (26/03/2026) - v1.6 "Finance Edition"
- **Fase**: Maturação Estratégica / Engine de OKRs Operacional.
- **Strategic Layer (v1.6)**: 
    - [x] **King OKRs**: Camada de comando no topo do Dashboard com visual "Liquid Progress".
    - [x] **Cascata Financeira**: OKRs secundários integrados (Faturamento, OpEx, Margem, Erosão).
    - [x] **Intelligence Refinement**: Tooltips de alta densidade (11px) com insights do CFO.
- **Frontend v1.5/v1.6**: 
    - [x] **King Dashboard**: Resumo consolidado com 4 Gráficos Reis (ROAS, LTV, Payback, Asset).
    - [x] **Visual Polish**: Alertas red-glow suavizados e tipografia 100% nativa.
    - [x] **Estabilidade**: Build fix (Tailwind removed) para deploy contínuo estável.
- **Backend/Specs**:
    - [x] [`BACKEND_SPEC.md`](./BACKEND_SPEC.md) atualizado com fórmulas de ATV, LTV/CAC e ROI.
    - [x] [`BRISA_STRATEGY_PLAYBOOK.md`](./BRISA_STRATEGY_PLAYBOOK.md) oficializado como Bíblia de Métricas.

## 🔗 Atalhos Rápidos
- [Especificações de Backend](./BACKEND_SPEC.md)
- [Guia do Oráculo (CFO)](./CFO.md)
- [Regras de Desenvolvimento (CLAUDE.md)](./CLAUDE.md)

## 🛠 Próximos Passos
1. Implementar Gerador de PDF Corporativo para o DRE (Marca d'água Brisa).
2. Integrar `okr_goals` do Supabase para substituir dados mockados.
3. Plugar as views reais de produção no Gráfico Principal.
