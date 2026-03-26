import { KPICard } from '../components/Cards/KPICard';
import { RevenueChart } from '../components/Charts/RevenueChart';
import { LeadsFunnel } from '../components/Charts/LeadsFunnel';
import { useCrossMetrics } from '../hooks/useCrossMetrics';
import { useKPIs } from '../hooks/useKPIs';
import { Bot, TrendingUp, Users, DollarSign, Target, BarChart3, Zap, ShieldCheck } from 'lucide-react';
import SummaryTab from '../components/Dashboard/SummaryTab';
import { OKRList } from '../components/Dashboard/OKRList';

export const Dashboard = () => {
  const { loading: kpiLoading, kpis, data } = useKPIs();
  const { loading: crossLoading, metrics } = useCrossMetrics();

  const loading = kpiLoading || crossLoading;

  const fmt = (v: number) => v.toLocaleString('pt-BR', { maximumFractionDigits: 2 });

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
      {/* 👑 The King's Summary (Consolidated Intelligence) */}
      <section>
        <h2 style={{ fontSize: '1rem', color: 'var(--text-muted)', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '8px', fontWeight: 800 }}>
          <Zap size={18} color="var(--color-primary)" /> Central de Inteligência Master
        </h2>
        <SummaryTab />
      </section>

      {/* 🎯 Strategic OKR Engine: List View (v1.6) */}
      <section>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <OKRList 
            title="Diretoria: OKRs Rei (Macro-Estratégia)" 
            icon={<ShieldCheck size={20} color="var(--color-primary)" />}
            items={[
              {
                category: "Patrimonial",
                title: "Dominância Patrimonial",
                current: 3.4,
                target: 3.5,
                unit: "x",
                tooltipTitle: "LTV/CAC Ratio",
                tooltipContent: "O motor de escala. Mede o valor patrimonial criado por real investido. Meta do C-Level: 3.5x.",
                secondaryOKRs: [{label: 'CPL', progress: 95}, {label: 'Conv', progress: 80}]
              },
              {
                category: "Eficiência",
                title: "Excelência Operacional",
                current: 64.8,
                target: 72,
                unit: "%",
                tooltipTitle: "Asset Efficiency",
                tooltipContent: "Mede a utilização real da capacidade instalada. Uma máquina parada é lucro perdido. Meta: 72%.",
                secondaryOKRs: [{label: 'Agenda', progress: 85}, {label: 'Turnover', progress: 100}]
              },
              {
                category: "Liquidez",
                title: "Lucratividade Blindada",
                current: 42,
                target: 40,
                unit: " Dias",
                tooltipTitle: "Payback Speed",
                tooltipContent: "Em quanto tempo o investimento em mídia paga se paga. Meta CFO: < 40 dias.",
                secondaryOKRs: [{label: 'Margem', progress: 98}, {label: 'Burn', progress: 100}]
              },
              {
                category: "Marca",
                title: "Brand Value (ATV)",
                current: 254.8,
                target: 300,
                prefix: "R$ ",
                unit: "",
                tooltipTitle: "Average Transaction Value",
                tooltipContent: "Mede o posicionamento premium. Indica se vendemos pacotes master ou serviços avulsos.",
                secondaryOKRs: [{label: 'Mix', progress: 70}, {label: 'Tickets', progress: 60}]
              }
            ]}
          />

          <OKRList 
            title="Operacional: OKRs Financeiros (Impacto no Lucro)" 
            icon={<DollarSign size={20} color="var(--color-orange)" />}
            items={[
              {
                category: "Receita",
                title: "Meta Faturamento Bruto",
                current: 142500,
                target: 150000,
                prefix: "R$ ",
                unit: "",
                tooltipTitle: "Gross Revenue Goal",
                tooltipContent: "O combustível para a meta de Dominância. Meta mensal baseada no OKR Engine.",
                secondaryOKRs: [{label: 'Pacotes', progress: 95}, {label: 'Upgrade', progress: 60}]
              },
              {
                category: "Custos",
                title: "Gestão de Despesas Fixas",
                current: 11200,
                target: 12000,
                prefix: "R$ ",
                unit: "",
                tooltipTitle: "Fixed OpEx Ceiling",
                tooltipContent: "Controlar o fixo é o que protege a 'Lucratividade Blindada'. Teto máximo: R$ 12k.",
                secondaryOKRs: [{label: 'Manutenção', progress: 100}, {label: 'Insumos', progress: 85}]
              },
              {
                category: "Saúde",
                title: "Margem de Contribuição",
                current: 97.2,
                target: 98,
                unit: "%",
                tooltipTitle: "Contribution Margin",
                tooltipContent: "Reflete quanto sobra após pagar os custos variáveis. Vital para a saúde do CFO.",
                secondaryOKRs: [{label: 'Diretos', progress: 98}, {label: 'Comissões', progress: 95}]
              },
              {
                category: "Marca",
                title: "Erosão de Preço (Burn)",
                current: 12.4,
                target: 15,
                unit: "%",
                tooltipTitle: "Price Erosion / Discounts",
                tooltipContent: "Monitora o volume de descontos. Acima de 15% destrói o valor da marca Brisa.",
                secondaryOKRs: [{label: 'Cupons', progress: 40}, {label: 'Black Friday', progress: 10}]
              }
            ]}
          />
        </div>
      </section>

      <div style={{ height: '32px' }} />

      {/* Seção de KPIs Financeiros (Supabase DRE) */}
      <section>
        <h2 style={{ fontSize: '1rem', color: 'var(--text-muted)', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <DollarSign size={16} /> Financeiro (DRE Executivo)
        </h2>
        {loading ? (
          <div style={{ display: 'flex', gap: '24px' }}>
             <p>Carregando métricas...</p>
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '20px' }}>
            {kpis.map((kpi, index) => (
              <KPICard key={index} {...kpi} />
            ))}
          </div>
        )}
      </section>

      {/* Seção de KPIs Multi-Fonte (Cross Metrics) */}
      <section>
        <h2 style={{ fontSize: '1rem', color: 'var(--text-muted)', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Target size={16} /> Performance Ads × Clínica (Multi-Fonte)
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '20px' }}>
          <KPICard title="Faturamento Zandu" value={fmt(metrics.faturamento_total)} change={0} prefix="R$" />
          <KPICard title="Ticket Médio" value={fmt(metrics.ticket_medio)} change={0} prefix="R$" />
          <KPICard title="Agendamentos" value={metrics.agendamentos_total.toString()} change={0} />
          <KPICard title="Taxa Comparecimento" value={fmt(metrics.taxa_comparecimento)} change={0} suffix="%" />
          <KPICard title="Leads Gerados" value={metrics.leads_gerados.toString()} change={0} />
          <KPICard title="Investimento Ads" value={fmt(metrics.investimento_total)} change={0} prefix="R$" />
          <KPICard title="CPL (Custo por Lead)" value={fmt(metrics.cpl)} change={0} prefix="R$" />
          <KPICard title="ROAS" value={fmt(metrics.roas)} change={0} suffix="x" />
          <KPICard title="CAC" value={fmt(metrics.cac)} change={0} prefix="R$" />
          <KPICard title="LTV Estimado" value={fmt(metrics.ltv_estimado)} change={5} prefix="R$" />
        </div>
      </section>

      {/* Gráficos */}
      <section style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '24px' }}>
        <div className="liquid-glass" style={{ padding: '24px', minHeight: '400px', display: 'flex', flexDirection: 'column' }}>
          <h3 style={{ marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <TrendingUp size={18} /> Receita Bruta vs Custos Totais
          </h3>
          <div style={{ flex: 1, minHeight: '300px' }}>
            {data && <RevenueChart data={[data]} />}
            {!data && <RevenueChart data={[]} />}
          </div>
        </div>
        
        <div className="liquid-glass" style={{ padding: '24px', minHeight: '400px', display: 'flex', flexDirection: 'column' }}>
          <h3 style={{ marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Users size={18} /> Funil Comercial (Mês)
          </h3>
          <div style={{ flex: 1, minHeight: '300px' }}>
             <LeadsFunnel data={data} />
          </div>
        </div>
      </section>
      
      {/* Summary Row - Sessões GA4 + Conversões */}
      <section style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px' }}>
        <div className="liquid-glass" style={{ padding: '24px', textAlign: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', marginBottom: '8px' }}>
            <BarChart3 size={18} color="var(--color-accent)" />
            <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Sessões GA4</span>
          </div>
          <span style={{ fontSize: '2rem', fontWeight: 700, color: 'var(--text-main)' }}>{metrics.sessoes_site.toLocaleString('pt-BR')}</span>
        </div>
        <div className="liquid-glass" style={{ padding: '24px', textAlign: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', marginBottom: '8px' }}>
            <Zap size={18} color="var(--color-warning)" />
            <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Conversões Ads</span>
          </div>
          <span style={{ fontSize: '2rem', fontWeight: 700, color: 'var(--text-main)' }}>{metrics.conversoes_ads}</span>
        </div>
        <div className="liquid-glass" style={{ padding: '24px', textAlign: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', marginBottom: '8px' }}>
            <Target size={18} color="var(--color-success)" />
            <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Tx. Conversão Site</span>
          </div>
          <span style={{ fontSize: '2rem', fontWeight: 700, color: 'var(--text-main)' }}>{fmt(metrics.taxa_conversao_site)}%</span>
        </div>
      </section>

      {/* Botão de Call To Action Jarvis */}
      <div style={{ 
        marginTop: '24px', padding: '32px', borderRadius: 'var(--radius-lg)',
        background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.1), rgba(6, 182, 212, 0.1))',
        border: '1px solid rgba(59, 130, 246, 0.2)',
        display: 'flex', justifyContent: 'space-between', alignItems: 'center'
      }}>
        <div>
          <h2 style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
            <Bot color="var(--color-primary)" />
            <span>Fale com o Copilot Jarvis</span>
          </h2>
          <p style={{ maxWidth: '600px' }}>Pergunte sobre CAC, ROAS, tendências de faturamento ou projeções — com dados cruzados de todas as 5 fontes em tempo real.</p>
        </div>
        <button style={{ 
          padding: '12px 24px', backgroundColor: 'var(--color-primary)', 
          color: 'white', border: 'none', borderRadius: 'var(--radius-full)',
          fontWeight: 600, cursor: 'pointer', boxShadow: 'var(--shadow-glow)'
        }}>Abrir Intelligence Chat</button>
      </div>
    </div>
  );
};
