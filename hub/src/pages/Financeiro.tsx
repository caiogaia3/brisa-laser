import { useMemo } from 'react';
import { RevenueChart } from '../components/Charts/RevenueChart';
import { DRETable } from '../components/Tables/DRETable';
import { KPICard } from '../components/Cards/KPICard';
import { useKPIs } from '../hooks/useKPIs';
import { useDRE } from '../hooks/useDRE';
import { usePeriodStore } from '../store/usePeriodStore';
import { LancamentoForm } from '../components/Financeiro/LancamentoForm';

export const Financeiro = () => {
  const { data: historyData } = useKPIs();
  const { month, year } = usePeriodStore();
  
  // Convert standard month/year to YYYY-MM
  const periodString = `${year}-${String(month + 1).padStart(2, '0')}`;
  
  const { loading, dreData } = useDRE(periodString);

  // Convert historyData to Array if needed
  const chartData = useMemo(() => {
    if (!historyData) return [];
    return Array.isArray(historyData) ? historyData : [historyData];
  }, [historyData]);

  // Transform DRE data for KPIs dynamically
  const kpis = useMemo(() => {
    const faturamentoRow = dreData.find(d => d.line_label.toLowerCase().includes('receita bruta'));
    const faturamento = faturamentoRow ? faturamentoRow.amount : 0;
    
    const lucroLiquidoRow = dreData.find(d => d.line_label.toLowerCase().includes('lucro líquido'));
    const lucroLiquido = lucroLiquidoRow ? lucroLiquidoRow.amount : 0;
    
    const custos = dreData
      .filter(d => d.category === 'custo_variavel' || d.category === 'despesa_fixa')
      .reduce((acc, curr) => acc + curr.amount, 0);
      
    const margem = faturamento > 0 ? (lucroLiquido / faturamento) * 100 : 0;

    return { faturamento, lucroLiquido, custos, margem };
  }, [dreData]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
      <header>
        <h1 style={{ marginBottom: '8px' }}>Controle Financeiro & DRE</h1>
        <p>Lançamentos diários e fluxo contábil mensal (conectado ao seletor superior).</p>
      </header>

      {/* NOVO: Formulário de Lançamento Tático */}
      <LancamentoForm />

      <section style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px' }}>
        <KPICard 
          title="Faturamento Bruto" 
          value={kpis.faturamento.toLocaleString('pt-BR')} 
          change={0} 
          prefix="R$" 
          trend="neutral" 
        />
        <KPICard 
          title="Custo Total (Variável + Fixo)" 
          value={Math.abs(kpis.custos).toLocaleString('pt-BR')} 
          change={0} 
          prefix="R$" 
          trend="neutral" 
        />
        <KPICard 
          title="Lucro Líquido" 
          value={kpis.lucroLiquido.toLocaleString('pt-BR')} 
          change={0} 
          prefix="R$" 
          trend={kpis.lucroLiquido >= 0 ? 'up' : 'down'} 
        />
        <KPICard 
          title="Margem Líquida" 
          value={Math.round(kpis.margem)} 
          change={0} 
          suffix="%" 
          trend={kpis.margem >= 20 ? 'up' : 'neutral'} 
        />
      </section>

      <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 1fr)', gap: '24px' }}>
        <section className="glass-panel" style={{ padding: '24px' }}>
          <h3 style={{ marginBottom: '24px' }}>Evolução Mensal</h3>
          <div style={{ height: '400px' }}>
            {historyData ? <RevenueChart data={chartData} /> : <p>Carregando histórico...</p>}
          </div>
        </section>

        <section className="glass-panel" style={{ padding: '24px' }}>
          <h3 style={{ marginBottom: '24px' }}>DRE Resumido ({periodString})</h3>
          {loading ? (
            <div style={{ padding: '40px', textAlign: 'center', color: 'var(--text-muted)' }}>Mapeando contas de {periodString}...</div>
          ) : (
            <DRETable data={dreData} />
          )}
        </section>
      </div>
    </div>
  );
};
