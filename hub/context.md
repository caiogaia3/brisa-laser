# Contexto do Projeto: Brisa Intelligence Hub (CommandCenter)

## 📌 Visão Geral
O **Brisa Intelligence Hub** é o cockpit de BI de alta performance da Brisa Laser. O objetivo é consolidar dados financeiros (DRE), marketing (Ads/Leads) e operacionais (Zandu) em uma única interface "CommandCenter" para apoio à tomada de decisão do CFO/CEO.

## 🚀 Estado Atual (26/03/2026)
- **Fase**: Finalização do Frontend / Início Integração Real.
- **Frontend**: 
    - [x] **CommandCenter Redesign**: Layout ultra-compacto com Pro-Max UI.
    - [x] **KPICards v1.0**: Mirror da Foto 2 (Pílula + Sparkline Row).
    - [x] **Design System**: Centralizado em [`DESIGN_SYSTEM.md`](./DESIGN_SYSTEM.md) e `index.css`.
- **Backend/Specs**:
    - [x] [`BACKEND_SPEC.md`](./BACKEND_SPEC.md) atualizado com contrato de objetos ricos de KPI.

## 🔗 Atalhos Rápidos
- [Especificações de Backend](./BACKEND_SPEC.md)
- [Guia do Oráculo (CFO)](./CFO.md)
- [Regras de Desenvolvimento (CLAUDE.md)](./CLAUDE.md)

## 🛠 Próximos Passos
1. Implementar Gerador de PDF Corporativo para o DRE (Marca d'água Brisa).
2. Integrar `okr_goals` do Supabase para substituir dados mockados.
3. Plugar as views reais de produção no Gráfico Principal.
