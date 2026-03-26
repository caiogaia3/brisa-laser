import { useMemo } from 'react';
import { KPICard } from '../../components/Cards/KPICard';
import { useDREMatrix } from '../../hooks/useDREMatrix';
import { usePeriodStore } from '../../store/usePeriodStore';

import { WaterfallChart } from '../../components/Charts/WaterfallChart';
import { DoubleTrendChart } from '../../components/Charts/DoubleTrendChart';
import { BreakEvenGauge } from '../../components/Charts/BreakEvenGauge';
import { MarginStackedBar } from '../../components/Charts/MarginStackedBar';

const OKRBar = ({ title, current, goal, isReverse }: { title: string, current: number, goal: number, isReverse?: boolean }) => {
  const percent = Math.min(100, Math.max(0, goal > 0 ? (current / goal) * 100 : 0));
  const isGood = isReverse ? current <= goal : current >= goal * 0.8;
  const color = isGood ? 'var(--color-primary)' : 'var(--color-warning)';
  
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem' }}>
        <span style={{ color: 'var(--text-main)', fontWeight: 500 }}>{title}</span>
        <span style={{ color: 'var(--text-muted)' }}>
          {current.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })} / {goal.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
        </span>
      </div>
      <div style={{ height: '8px', background: 'rgba(255,255,255,0.05)', borderRadius: '4px', overflow: 'hidden' }}>
        <div style={{ height: '100%', width: `${percent}%`, backgroundColor: color, borderRadius: '4px', transition: 'width 1s ease-in-out' }} />
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
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* Top row: High Density KPI Cards */}
      <section style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '12px' }}>
        <KPICard title="Receita Bruta" value={currentMonthPivot.receita_bruta.toLocaleString('pt-BR')} change={5.2} prefix="R$" trend="neutral" />
        <KPICard title="Despesas Totais" value={currentMonthPivot.despesas_totais.toLocaleString('pt-BR')} change={2.1} prefix="R$" trend="down" />
        <KPICard title="Margem Contrib." value={currentMonthPivot.margem_contribuicao.toLocaleString('pt-BR')} change={8.4} prefix="R$" trend={currentMonthPivot.margem_contribuicao >= 0 ? 'up' : 'down'} />
        <KPICard title="EBITDA" value={currentMonthPivot.ebitda.toLocaleString('pt-BR')} change={12.5} prefix="R$" trend={currentMonthPivot.ebitda >= 0 ? 'up' : 'down'} />
        <KPICard title="Lucro Líquido" value={currentMonthPivot.lucro_liquido.toLocaleString('pt-BR')} change={18.2} prefix="R$" trend={currentMonthPivot.lucro_liquido >= 0 ? 'up' : 'down'} />
        <KPICard title="Saldo Caixa" value={currentMonthPivot.saldo_final.toLocaleString('pt-BR')} change={0.0} prefix="R$" trend="neutral" />
      </section>

      {/* Main Charts & OKRs Row */}
      <section style={{ display: 'grid', gridTemplateColumns: '1fr 300px', gap: '24px' }}>
        {/* Left: Main Performance Chart */}
        <div className="glass-panel" style={{ padding: '24px', height: '420px', display: 'flex', flexDirection: 'column' }}>
          <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <div>
              <h3 style={{ fontSize: '1rem', color: 'var(--text-main)' }}>Demonstrativo em Cascata</h3>
              <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>A Jornada do Dinheiro (Receita até Lucro).</p>
            </div>
            <div style={{ display: 'flex', gap: '16px', fontSize: '0.75rem', fontWeight: 600 }}>
              <span style={{ color: 'var(--color-primary)' }}>● Entradas</span>
              <span style={{ color: 'var(--color-danger)' }}>● Saídas</span>
            </div>
          </header>
          <div style={{ flex: 1, minHeight: 0 }}><WaterfallChart data={currentMonthPivot} /></div>
        </div>

        {/* Right: OKRs */}
        <div className="glass-panel" style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <header>
            <h3 style={{ fontSize: '1rem', color: 'var(--text-main)', marginBottom: '4px' }}>Live OKRs</h3>
            <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Realizado vs Meta Mensal</p>
          </header>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
            {/* Mockup Goals for Demo -> This will be fetched from DB */}
            <OKRBar title="Receita Bruta" current={currentMonthPivot.receita_bruta} goal={50000} />
            <OKRBar title="Despesas (Teto)" current={currentMonthPivot.despesas_totais} goal={25000} isReverse />
            <OKRBar title="Margem Contrib." current={currentMonthPivot.margem_contribuicao} goal={20000} />
            <div style={{ marginTop: 'auto', padding: '12px', background: 'rgba(59, 130, 246, 0.1)', borderRadius: '8px', border: '1px solid rgba(59, 130, 246, 0.2)' }}>
              <p style={{ fontSize: '0.75rem', color: 'var(--color-primary)', fontWeight: 600, display: 'flex', gap: '8px', alignItems: 'center' }}>
                <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--color-primary)' }} />
                IA Insight
              </p>
              <p style={{ fontSize: '0.75rem', color: 'var(--text-main)', marginTop: '4px', lineHeight: 1.4 }}>
                Receita superou 80% da meta, mas as despesas operacionais aceleraram 12% a mais que a média móvel.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Bottom Rows: Secondary Analysis */}
      <section style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px' }}>
        <div className="glass-panel" style={{ padding: '24px', height: '350px', display: 'flex', flexDirection: 'column' }}>
          <h3 style={{ marginBottom: '16px', fontSize: '1rem', color: 'var(--text-main)' }}>Eficiência (Receita vs EBITDA)</h3>
          <div style={{ flex: 1, minHeight: 0 }}><DoubleTrendChart data={trendData} /></div>
        </div>

        <div className="glass-panel" style={{ padding: '24px', height: '350px', display: 'flex', flexDirection: 'column' }}>
          <h3 style={{ marginBottom: '16px', fontSize: '1rem', color: 'var(--text-main)' }}>Termômetro Break-even</h3>
          <div style={{ flex: 1, minHeight: 0 }}><BreakEvenGauge data={currentMonthPivot} /></div>
        </div>

        <div className="glass-panel" style={{ padding: '24px', height: '350px', display: 'flex', flexDirection: 'column' }}>
          <h3 style={{ marginBottom: '16px', fontSize: '1rem', color: 'var(--text-main)' }}>Markup (Base 100%)</h3>
          <div style={{ flex: 1, minHeight: 0, paddingLeft: '12px' }}><MarginStackedBar data={currentMonthPivot} /></div>
        </div>
      </section>
    </div>
  );
};
