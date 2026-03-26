import { PageHeader } from '../components/Layout/PageHeader';
import { KPICard } from '../components/Cards/KPICard';
import { RevenueChart } from '../components/Charts/RevenueChart';
import { LeadsFunnel } from '../components/Charts/LeadsFunnel';
import { useCrossMetrics } from '../hooks/useCrossMetrics';
import { useKPIs } from '../hooks/useKPIs';
import { Bot, TrendingUp, Users, DollarSign, Target, BarChart3, Zap, ShieldCheck } from 'lucide-react';
import SummaryTab from '../components/Dashboard/SummaryTab';

export const Dashboard = () => {
  const { loading: kpiLoading, kpis, data } = useKPIs();
  const { loading: crossLoading, metrics } = useCrossMetrics();

  const loading = kpiLoading || crossLoading;

  const fmt = (v: number) => v.toLocaleString('pt-BR', { maximumFractionDigits: 2 });

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
      <PageHeader 
        title="Dashboard Central" 
        subtitle="Visão 360° da performance financeira e operacional da Brisa Laser."
      />

      {/* 👑 The King's Summary (New v1.5 Layer) */}
      <section>
        <h2 style={{ fontSize: '1rem', color: 'var(--color-primary)', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '8px', fontWeight: 800 }}>
          <ShieldCheck size={18} /> Central de Inteligência Master
        </h2>
        <SummaryTab />
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
