import { useMemo } from 'react';
import { KPICard } from '../../components/Cards/KPICard';
import { useDREMatrix } from '../../hooks/useDREMatrix';
import { usePeriodStore } from '../../store/usePeriodStore';

import { ProMaxRevenueChart } from '../../components/Charts/ProMaxRevenueChart';
import { DoubleTrendChart } from '../../components/Charts/DoubleTrendChart';
import { BreakEvenGauge } from '../../components/Charts/BreakEvenGauge';
import { MarginStackedBar } from '../../components/Charts/MarginStackedBar';

const OKRBar = ({ title, current, goal, isReverse }: { title: string, current: number, goal: number, isReverse?: boolean }) => {
  const percent = Math.min(100, Math.max(0, goal > 0 ? (current / goal) * 100 : 0));
  const isGood = isReverse ? current <= goal : current >= goal * 0.8;
  const color = isGood ? 'var(--color-primary)' : 'var(--color-warning)';
  
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem' }}>
        <span style={{ color: 'var(--text-main)', fontWeight: 500 }}>{title}</span>
        <span style={{ color: 'var(--text-muted)' }}>
          {percent.toFixed(0)}%
        </span>
      </div>
      <div style={{ height: '6px', background: 'rgba(255,255,255,0.05)', borderRadius: '3px', overflow: 'hidden' }}>
        <div style={{ height: '100%', width: `${percent}%`, backgroundColor: color, borderRadius: '3px', transition: 'width 1s ease-in-out' }} />
      </div>
    </div>
  );
};

export const FinanceiroResumo = () => {
  const { month, year } = usePeriodStore();
  const periodString = `${year}-${String(month + 1).padStart(2, '0')}`;
  const { matrixData, months } = useDREMatrix();

  const currentMonthPivot = useMemo(() => {
    const extract = (labelKeywords: string[]) => {
      const row = matrixData.find(d => 
        labelKeywords.some(kw => d.conta_descricao.toLowerCase().includes(kw.toLowerCase()))
      );
      return row ? (row.valores[periodString] || 0) : 0;
    };

    const receitaBruta = extract(['TOTAL RECEITA BRUTA']);
    const despesasFixas = extract(['TOTAL DESPESAS FIXAS']);
    const lucroLiquido = extract(['LUCRO LÍQUIDO FINAL']);
    const margemContribuicao = extract(['MARGEM DE CONTRIBUIÇÃO']);
    const ebitda = extract(['LAJIDA (EBITDA)']);
    const saldoFinal = extract(['SALDO FINAL DE CAIXA']);

    // Para despesas totais (Operacionais + Fixas) no dashboard
    // No CSV, temos RECEITA LÍQUIDA (Nivel 3). Despesas totais seriam Receita Bruta - Lucro?
    // Vamos usar a lógica: Receita Bruta - Margem = Variáveis. Variáveis + Fixas = Totais.
    const despesasVariaveis = receitaBruta - margemContribuicao; 
    const despesasTotais = despesasVariaveis + Math.abs(despesasFixas);
    
    let margemPercent = receitaBruta > 0 ? (margemContribuicao / receitaBruta) : 0.0001;
    if (margemPercent <= 0) margemPercent = 0.0001; 
    const breakeven = Math.abs(despesasFixas) / margemPercent;

    return {
      receita_bruta: receitaBruta,
      despesas_totais: Math.abs(despesasTotais),
      margem_contribuicao: margemContribuicao,
      ebitda,
      lucro_liquido: lucroLiquido,
      breakeven,
      despesas_fixas: Math.abs(despesasFixas),
      saldo_final: saldoFinal
    };
  }, [matrixData, periodString]);

  const trendData = useMemo(() => {
    const receitaRow = matrixData.find(d => d.conta_descricao.includes('TOTAL RECEITA BRUTA'));
    const ebitdaRow = matrixData.find(d => d.conta_descricao.includes('LAJIDA (EBITDA)'));

    return months.map(mStr => {
      const date = new Date(mStr + '-01T12:00:00');
      return {
        month: date.toLocaleDateString('pt-BR', { month: 'short' }),
        receita: receitaRow ? (receitaRow.valores[mStr] || 0) : 0,
        ebitda: ebitdaRow ? (ebitdaRow.valores[mStr] || 0) : 0
      };
    });
  }, [matrixData, months]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      {/* Top row: High Density KPI Cards */}
      <section style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: '8px' }}>
        <KPICard title="Receita Bruta" value={currentMonthPivot.receita_bruta.toLocaleString('pt-BR')} change={5.2} prefix="R$" trend="neutral" />
        <KPICard title="Despesas Totais" value={currentMonthPivot.despesas_totais.toLocaleString('pt-BR')} change={2.1} prefix="R$" trend="down" />
        <KPICard title="Margem Contrib." value={currentMonthPivot.margem_contribuicao.toLocaleString('pt-BR')} change={8.4} prefix="R$" trend={currentMonthPivot.margem_contribuicao >= 0 ? 'up' : 'down'} />
        <KPICard title="EBITDA" value={currentMonthPivot.ebitda.toLocaleString('pt-BR')} change={12.5} prefix="R$" trend={currentMonthPivot.ebitda >= 0 ? 'up' : 'down'} />
        <KPICard title="Lucro Líquido" value={currentMonthPivot.lucro_liquido.toLocaleString('pt-BR')} change={18.2} prefix="R$" trend={currentMonthPivot.lucro_liquido >= 0 ? 'up' : 'down'} />
        <KPICard title="Saldo Caixa" value={currentMonthPivot.saldo_final.toLocaleString('pt-BR')} change={0.0} prefix="R$" trend="neutral" />
      </section>

      {/* Main Charts & OKRs Row */}
      <section style={{ display: 'grid', gridTemplateColumns: '1fr 280px', gap: '16px' }}>
        {/* Left: Main Performance Chart */}
        <div className="glass-panel" style={{ padding: '16px', height: '380px', display: 'flex', flexDirection: 'column', border: '1px solid rgba(6, 182, 212, 0.15)' }}>
          <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
            <div>
              <h3 style={{ fontSize: '0.9rem', color: 'var(--text-main)', display: 'flex', gap: '8px', alignItems: 'center', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#06b6d4', display: 'inline-block', boxShadow: '0 0 8px #06b6d4' }}></span>
                Performance de Fluxo
              </h3>
            </div>
            <div style={{ display: 'flex', gap: '12px', fontSize: '0.65rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              <span style={{ color: '#06b6d4', display: 'flex', alignItems: 'center', gap: '4px' }}>
                <span style={{ display: 'inline-block', width: '8px', height: '3px', background: '#06b6d4', borderRadius: '1.5px' }}></span>
                Receita
              </span>
              <span style={{ color: '#fb923c', display: 'flex', alignItems: 'center', gap: '4px' }}>
                <span style={{ display: 'inline-block', width: '8px', height: '1.5px', borderBottom: '1.5px dashed #fb923c' }}></span>
                Despesas
              </span>
            </div>
          </header>
          <div style={{ flex: 1, minHeight: 0 }}>
             <ProMaxRevenueChart />
          </div>
        </div>

        {/* Right: OKRs */}
        <div className="glass-panel" style={{ padding: '16px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <header>
            <h3 style={{ fontSize: '0.9rem', color: 'var(--text-main)', marginBottom: '2px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Live OKRs</h3>
            <p style={{ fontSize: '0.65rem', color: 'var(--text-muted)' }}>Realizado vs Meta</p>
          </header>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {/* Mockup Goals */}
            <OKRBar title="Faturamento" current={currentMonthPivot.receita_bruta} goal={50000} />
            <OKRBar title="Teto Despesas" current={currentMonthPivot.despesas_totais} goal={25000} isReverse />
            <OKRBar title="Margem Contrib." current={currentMonthPivot.margem_contribuicao} goal={20000} />
            <div style={{ marginTop: '4px', padding: '10px', background: 'rgba(6, 182, 212, 0.05)', borderRadius: '6px', border: '1px solid rgba(6, 182, 212, 0.1)' }}>
              <p style={{ fontSize: '0.65rem', color: 'var(--color-primary)', fontWeight: 700, display: 'flex', gap: '6px', alignItems: 'center', textTransform: 'uppercase' }}>
                <span style={{ width: '5px', height: '5px', borderRadius: '50%', background: 'var(--color-primary)' }} />
                Jarvis AI
              </p>
              <p style={{ fontSize: '0.7rem', color: 'var(--text-muted)', marginTop: '4px', lineHeight: 1.4 }}>
                Receita em 80% da meta. Despesas aceleraram 12% acima da média móvel.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Bottom Rows: Secondary Analysis */}
      <section style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }}>
        <div className="glass-panel" style={{ padding: '16px', height: '300px', display: 'flex', flexDirection: 'column' }}>
          <h3 style={{ marginBottom: '12px', fontSize: '0.85rem', color: 'var(--text-main)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Eficiência (Receita/EBITDA)</h3>
          <div style={{ flex: 1, minHeight: 0 }}><DoubleTrendChart data={trendData} /></div>
        </div>

        <div className="glass-panel" style={{ padding: '16px', height: '300px', display: 'flex', flexDirection: 'column' }}>
          <h3 style={{ marginBottom: '12px', fontSize: '0.85rem', color: 'var(--text-main)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Termômetro Break-even</h3>
          <div style={{ flex: 1, minHeight: 0 }}><BreakEvenGauge data={currentMonthPivot} /></div>
        </div>

        <div className="glass-panel" style={{ padding: '16px', height: '300px', display: 'flex', flexDirection: 'column' }}>
          <h3 style={{ marginBottom: '12px', fontSize: '0.85rem', color: 'var(--text-main)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>M. Contribuição (Base 100%)</h3>
          <div style={{ flex: 1, minHeight: 0, paddingLeft: '8px' }}><MarginStackedBar data={currentMonthPivot} /></div>
        </div>
      </section>
    </div>
  );
};
