import { AdsPerfChart } from '../components/Charts/AdsPerfChart';
import { LeadsFunnel } from '../components/Charts/LeadsFunnel';
import { KPICard } from '../components/Cards/KPICard';
import { useKPIs } from '../hooks/useKPIs';
import { DataTable } from '../components/Tables/DataTable';

export const Marketing = () => {
  const { data } = useKPIs();

  const leadsData = [
    { id: 1, phone: '(11) 988xx-xxxx', source: 'Google Ads', status: 'Agendou', amount: 0 },
    { id: 2, phone: '(11) 977xx-xxxx', source: 'Zandu Orgânico', status: 'Compareceu (Ganho)', amount: 150 },
    { id: 3, phone: '(11) 966xx-xxxx', source: 'Meta Ads', status: 'Faltou', amount: 0 },
    { id: 4, phone: '(11) 955xx-xxxx', source: 'Indicação', status: 'Agendou', amount: 0 },
  ];

  const leadsColumns = [
    { key: 'phone', label: 'Telefone' },
    { key: 'source', label: 'Origem/Campanha' },
    { key: 'status', label: 'Status CRM', format: (val: string) => {
      const isSuccess = val.includes('Compareceu');
      const isNeutral = val.includes('Agendou');
      return (
        <span style={{ 
          padding: '4px 8px', borderRadius: '4px', fontSize: '0.75rem', fontWeight: 600,
          backgroundColor: isSuccess ? 'rgba(16, 185, 129, 0.1)' : isNeutral ? 'rgba(6, 182, 212, 0.1)' : 'rgba(239, 68, 68, 0.1)',
          color: isSuccess ? 'var(--color-success)' : isNeutral ? 'var(--color-accent)' : 'var(--color-danger)'
        }}>{val}</span>
      );
    } },
    { key: 'amount', label: 'Receita Gerada', align: 'right' as const, format: (val: number) => val > 0 ? `R$ ${val}` : '-' },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
      <header>
        <h1 style={{ marginBottom: '8px' }}>Marketing & Ads</h1>
        <p>Acompanhamento de performance de mídia paga e auditoria de Leads Zandu.</p>
      </header>

      <section style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px' }}>
        <KPICard title="Conversões (Mês)" value={142} change={5.2} trend="up" />
        <KPICard title="Custo por Lead (CPL)" value="12,50" change={-1.5} prefix="R$" trend="down" />
        <KPICard title="ROAS Global" value="4.2" change={0} suffix="x" trend="neutral" />
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
        <h3 style={{ marginBottom: '24px' }}>Últimos Leads (Match Zandu)</h3>
        <DataTable columns={leadsColumns} data={leadsData} keyField="id" />
      </section>
    </div>
  );
};
