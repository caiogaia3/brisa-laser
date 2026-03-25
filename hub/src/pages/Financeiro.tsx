import { useState, useMemo, useEffect } from 'react';
import { RevenueChart } from '../components/Charts/RevenueChart';
import { DRETable } from '../components/Tables/DRETable';
import { KPICard } from '../components/Cards/KPICard';
import { useKPIs } from '../hooks/useKPIs';
import { useDRE } from '../hooks/useDRE';

export const Financeiro = () => {
  const { data: historyData } = useKPIs();
  const [selectedMonth, setSelectedMonth] = useState<string>('');
  
  const { loading, dreData, availableMonths } = useDRE(selectedMonth);

  // Definir mês inicial se não houver um selecionado e tivermos meses disponíveis
  useEffect(() => {
    if (!selectedMonth && availableMonths.length > 0) {
      setSelectedMonth(availableMonths[0]);
    }
  }, [availableMonths, selectedMonth]);

  // Converter historyData para Array se necessário para o gráfico
  const chartData = useMemo(() => {
    if (!historyData) return [];
    return Array.isArray(historyData) ? historyData : [historyData];
  }, [historyData]);

  // Calcular KPIs dinamicamente da DRE
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
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div>
          <h1 style={{ marginBottom: '8px' }}>Financeiro & DRE</h1>
          <p>Acompanhamento de receita, custos detalhados e Demonstração do Resultado do Exercício.</p>
        </div>
        
        <div className="glass-panel" style={{ padding: '8px 16px', display: 'flex', alignItems: 'center', gap: '12px' }}>
          <span style={{ fontSize: '0.875rem', fontWeight: 500, color: 'var(--text-secondary)' }}>Período:</span>
          <select 
            value={selectedMonth} 
            onChange={(e) => setSelectedMonth(e.target.value)}
            style={{ 
              background: 'transparent', 
              border: 'none', 
              color: 'white', 
              fontWeight: 600,
              outline: 'none',
              cursor: 'pointer'
            }}
          >
            {availableMonths.map(m => (
              <option key={m} value={m} style={{ background: '#1a1a1a' }}>
                {new Date(m + 'T00:00:00').toLocaleDateString('pt-BR', { month: 'long', year: 'numeric' })}
              </option>
            ))}
          </select>
        </div>
      </header>

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

      <section className="glass-panel" style={{ padding: '24px' }}>
        <h3 style={{ marginBottom: '24px' }}>Evolução Mensal (Histórico BI)</h3>
        <div style={{ height: '400px' }}>
          <RevenueChart data={chartData} />
        </div>
      </section>

      <section className="glass-panel" style={{ padding: '24px' }}>
        <h3 style={{ marginBottom: '24px' }}>Demonstrativo do Resultado (DRE)</h3>
        {loading ? (
          <div style={{ padding: '40px', textAlign: 'center', color: 'var(--text-secondary)' }}>Carregando dados reais...</div>
        ) : (
          <DRETable data={dreData} />
        )}
      </section>
    </div>
  );
};


