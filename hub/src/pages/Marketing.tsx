import { AdsPerfChart } from '../components/Charts/AdsPerfChart';
import { LeadsFunnel } from '../components/Charts/LeadsFunnel';
import { KPICard } from '../components/Cards/KPICard';
import { useCrossMetrics } from '../hooks/useCrossMetrics';
import { useKPIs } from '../hooks/useKPIs';
import { DataTable } from '../components/Tables/DataTable';
import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { usePeriodStore } from '../store/usePeriodStore';
import { PageHeader } from '../components/Layout/PageHeader';
import { BarChart3, Target, Share2, Globe } from 'lucide-react';

interface LeadRow {
  id: number;
  phone: string;
  source: string;
  status: string;
  amount: number;
}

export const Marketing = () => {
  const { data } = useKPIs();
  const { metrics } = useCrossMetrics();
  const { startDate, endDate, storeId } = usePeriodStore();
  const [leads, setLeads] = useState<LeadRow[]>([]);
  const [leadsLoading, setLeadsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'resumo' | 'google' | 'meta' | 'analytics'>('resumo');

  const fmt = (v: number) => v.toLocaleString('pt-BR', { maximumFractionDigits: 2 });

  // Fetch real leads from Supabase (populated by n8n from the Leads Spreadsheet)
  useEffect(() => {
    async function fetchLeads() {
      setLeadsLoading(true);
      try {
        const from = startDate.toISOString().split('T')[0];
        const to = endDate.toISOString().split('T')[0];

        let query = supabase
          .from('leads_consolidados')
          .select('id, telefone, origem, status_crm, receita_gerada')
          .gte('data_entrada', from)
          .lte('data_entrada', to)
          .order('data_entrada', { ascending: false })
          .limit(50);

        if (storeId !== 'all') {
          query = query.eq('store_id', storeId);
        }

        const { data: leadsData } = await query;

        if (leadsData) {
          setLeads(leadsData.map((l: any) => ({
            id: l.id,
            phone: l.telefone || '—',
            source: l.origem || 'Desconhecida',
            status: l.status_crm || 'Novo',
            amount: l.receita_gerada || 0,
          })));
        }
      } catch (err) {
        console.error('[Marketing] Erro ao buscar leads:', err);
      } finally {
        setLeadsLoading(false);
      }
    }

    fetchLeads();
  }, [startDate, endDate, storeId]);

  const leadsColumns = [
    { key: 'phone', label: 'Telefone' },
    { key: 'source', label: 'Origem/Campanha' },
    { key: 'status', label: 'Status CRM', format: (val: string) => {
      const isSuccess = val.includes('Compareceu') || val.includes('Ganho');
      const isNeutral = val.includes('Agendou') || val.includes('Novo');
      return (
        <span style={{ 
          padding: '4px 8px', borderRadius: '4px', fontSize: '0.75rem', fontWeight: 600,
          backgroundColor: isSuccess ? 'rgba(16, 185, 129, 0.1)' : isNeutral ? 'rgba(6, 182, 212, 0.1)' : 'rgba(239, 68, 68, 0.1)',
          color: isSuccess ? 'var(--color-success)' : isNeutral ? 'var(--color-accent)' : 'var(--color-danger)'
        }}>{val}</span>
      );
    } },
    { key: 'amount', label: 'Receita Gerada', align: 'right' as const, format: (val: number) => val > 0 ? `R$ ${fmt(val)}` : '-' },
  ];

  const tabStyle = (id: string) => ({
    padding: '6px 12px',
    borderRadius: '8px',
    backgroundColor: activeTab === id ? 'rgba(6, 182, 212, 0.08)' : 'transparent',
    color: activeTab === id ? 'var(--color-primary)' : 'var(--text-muted)',
    border: activeTab === id ? '1px solid var(--color-primary)' : '1px solid transparent',
    boxShadow: activeTab === id ? '0 0 15px rgba(6, 182, 212, 0.15)' : 'none',
    cursor: 'pointer',
    fontSize: '0.7rem',
    fontWeight: activeTab === id ? 700 : 500,
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    transition: 'all 0.2s',
  });

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
      <PageHeader 
        title="Marketing & Performance" 
        subtitle="Auditoria de mídia paga e rastreamento de leads multi-canal (Consolidado)."
      >
        <button onClick={() => setActiveTab('resumo')} style={tabStyle('resumo')}>
          <BarChart3 size={14} /> Resumo
        </button>
        <button onClick={() => setActiveTab('google')} style={tabStyle('google')}>
          <Target size={14} /> Google Ads
        </button>
        <button onClick={() => setActiveTab('meta')} style={tabStyle('meta')}>
          <Share2 size={14} /> Meta Ads
        </button>
        <button onClick={() => setActiveTab('analytics')} style={tabStyle('analytics')}>
          <Globe size={14} /> Analytics
        </button>
      </PageHeader>

      {activeTab === 'resumo' && (
        <>
          <section style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px' }}>
            <KPICard title="Conversões (Mês)" value={metrics.conversoes_ads.toString()} change={0} />
            <KPICard title="Custo por Lead (CPL)" value={fmt(metrics.cpl)} change={0} prefix="R$" />
            <KPICard title="ROAS Global" value={fmt(metrics.roas)} change={0} suffix="x" />
            <KPICard title="Investimento Google" value={fmt(metrics.investimento_google)} change={0} prefix="R$" />
            <KPICard title="Investimento Meta" value={fmt(metrics.investimento_meta)} change={0} prefix="R$" />
            <KPICard title="Leads Gerados" value={metrics.leads_gerados.toString()} change={0} />
          </section>

          <section style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '24px' }}>
            <div className="glass-panel" style={{ padding: '24px', display: 'flex', flexDirection: 'column' }}>
              <h3 style={{ marginBottom: '24px' }}>Investimento em Ads (Google vs Meta)</h3>
              <div style={{ flex: 1, minHeight: '300px' }}><AdsPerfChart /></div>
            </div>
            
            <div className="glass-panel" style={{ padding: '24px', display: 'flex', flexDirection: 'column' }}>
              <h3 style={{ marginBottom: '24px' }}>Funil Geral</h3>
              <div style={{ flex: 1, minHeight: '300px' }}><LeadsFunnel data={data} /></div>
            </div>
          </section>

          <section className="glass-panel" style={{ padding: '24px' }}>
            <h3 style={{ marginBottom: '24px' }}>Últimos Leads (Consolidados via n8n)</h3>
            {leadsLoading ? (
              <p style={{ color: 'var(--text-muted)' }}>Carregando leads...</p>
            ) : leads.length > 0 ? (
              <DataTable columns={leadsColumns} data={leads} keyField="id" />
            ) : (
              <p style={{ color: 'var(--text-muted)', textAlign: 'center', padding: '32px' }}>
                Nenhum lead encontrado para o período selecionado. Verifique se o workflow n8n está ativo.
              </p>
            )}
          </section>
        </>
      )}

      {activeTab !== 'resumo' && (
        <div className="glass-panel" style={{ padding: '64px', textAlign: 'center' }}>
          <h2 style={{ color: 'var(--text-main)', marginBottom: '16px' }}>Visão {activeTab.toUpperCase()} em desenvolvimento</h2>
          <p style={{ color: 'var(--text-muted)' }}>Esta aba apresentará métricas detalhadas via API direta em breve.</p>
        </div>
      )}
    </div>
  );
};
