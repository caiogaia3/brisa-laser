import { useMemo } from 'react';
import { RevenueChart } from '../components/Charts/RevenueChart';
import { DRETable } from '../components/Tables/DRETable';
import { KPICard } from '../components/Cards/KPICard';
import { useKPIs } from '../hooks/useKPIs';
import { useDREMatrix } from '../hooks/useDREMatrix';
import { usePeriodStore } from '../store/usePeriodStore';
import { LancamentoForm } from '../components/Financeiro/LancamentoForm';

export const Financeiro = () => {
  const { data: historyData } = useKPIs();
  const { month, year } = usePeriodStore();
  
  // Convert standard month/year to YYYY-MM
  const periodString = `${year}-${String(month + 1).padStart(2, '0')}`;
  
  const { loading, matrixData, months, uniqueLines } = useDREMatrix();

  // Convert historyData to Array if needed
  const chartData = useMemo(() => {
    if (!historyData) return [];
    return Array.isArray(historyData) ? historyData : [historyData];
  }, [historyData]);

  // Transform DRE data for KPIs dynamically by slicing the matrix for the current period
  const kpis = useMemo(() => {
    const currentMonthData = matrixData.filter(d => d.period_month === periodString);
    
    const faturamentoRow = currentMonthData.find(d => d.line_label.toLowerCase().includes('receita bruta'));
    const faturamento = faturamentoRow ? faturamentoRow.amount : 0;
    
    const lucroLiquidoRow = currentMonthData.find(d => d.line_label.toLowerCase().includes('lucro líquido'));
    const lucroLiquido = lucroLiquidoRow ? lucroLiquidoRow.amount : 0;
    
    const custos = currentMonthData
      .filter(d => d.category === 'custo_variavel' || d.category === 'despesa_fixa')
      .reduce((acc, curr) => acc + curr.amount, 0);
      
    const margem = faturamento > 0 ? (lucroLiquido / faturamento) * 100 : 0;

    return { faturamento, lucroLiquido, custos, margem };
  }, [matrixData, periodString]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
      <header id="kpis">
        <h1 style={{ marginBottom: '8px' }}>Controle Financeiro & DRE</h1>
        <p>Lançamentos diários e fluxo contábil mensal (conectado ao seletor superior).</p>
      </header>

      {/* NOVO: Formulário de Lançamento Tático */}
      <LancamentoForm />

      <section style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px' }}>
        <KPICard 
          title="Faturamento Bruto (Mês Corrente)" 
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
          title="Lucro Líquido (Mês Corrente)" 
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

      <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
        <section className="glass-panel" style={{ padding: '24px', flex: 1 }}>
          <h3 style={{ marginBottom: '24px' }}>Evolução Mensal (Resumo BI)</h3>
          <div style={{ height: '400px' }}>
            {historyData ? <RevenueChart data={chartData} /> : <p>Carregando histórico...</p>}
          </div>
        </section>

        <section id="dre" className="glass-panel" style={{ padding: '24px', flex: 2, overflow: 'hidden' }}>
          <h3 style={{ marginBottom: '8px' }}>Matriz DRE (Visão Contábil Consolidada)</h3>
          <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)', marginBottom: '24px' }}>Espelho em tempo-real do histórico de meses via Banco de Dados Supabase.</p>
          {loading ? (
            <div style={{ padding: '40px', textAlign: 'center', color: 'var(--text-muted)' }}>Mapeando toda a linha do tempo...</div>
          ) : (
            <DRETable uniqueLines={uniqueLines} months={months} matrixData={matrixData} />
          )}
        </section>
      </div>
    </div>
  );
};
