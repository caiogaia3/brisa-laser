# Contexto do Projeto: Brisa Intelligence Hub (CommandCenter)

## 📌 Visão Geral
O **Brisa Intelligence Hub** é o cockpit de BI de alta performance da Brisa Laser. O objetivo é consolidar dados financeiros (DRE), marketing (Ads/Leads) e operacionais (Zandu) em uma única interface "CommandCenter" para apoio à tomada de decisão do CFO/CEO.

## 🚀 Estado Atual (26/03/2026)
- **Fase**: Finalização do Frontend Pro-Max / Pronto para Integração de Dados.
- **Frontend**: 
    - [x] **CommandCenter Redesign**: Layout de cockpit ultra-compacto com design Pro-Max v1.2.
    - [x] **KPICards v1.2**: Layout de alta densidade (Extra-Bold numbers / Vertical rhythm otimizado).
    - [x] **Charts Premium**: Donut Chart interativo com brilho neon e barra de progresso Break-even linear.
    - [x] **Estabilidade**: Build 100% verificado com TypeScript rigoroso.
- **Backend/Specs**:
    - [x] [`BACKEND_SPEC.md`](./BACKEND_SPEC.md) centralizado com contrato de objetos ricos de KPI e sparklines.

## 🔗 Atalhos Rápidos
- [Especificações de Backend](./BACKEND_SPEC.md)
- [Guia do Oráculo (CFO)](./CFO.md)
- [Regras de Desenvolvimento (CLAUDE.md)](./CLAUDE.md)

## 🛠 Próximos Passos
1. Implementar Gerador de PDF Corporativo para o DRE (Marca d'água Brisa).
2. Integrar `okr_goals` do Supabase para substituir dados mockados.
3. Plugar as views reais de produção no Gráfico Principal.
