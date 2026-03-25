import { useMemo } from 'react';
import { KPICard } from '../../components/Cards/KPICard';
import { useDREMatrix } from '../../hooks/useDREMatrix';
import { usePeriodStore } from '../../store/usePeriodStore';

import { WaterfallChart } from '../../components/Charts/WaterfallChart';
import { DoubleTrendChart } from '../../components/Charts/DoubleTrendChart';
import { BreakEvenGauge } from '../../components/Charts/BreakEvenGauge';
import { MarginStackedBar } from '../../components/Charts/MarginStackedBar';

export const FinanceiroResumo = () => {
  const { month, year } = usePeriodStore();
  const periodString = `${year}-${String(month + 1).padStart(2, '0')}`;
  const { matrixData, months } = useDREMatrix();

  const currentMonthPivot = useMemo(() => {
    const currentMonthData = matrixData.filter(d => d.period_month === periodString);
    const extract = (labelKeyword: string) => {
      const row = currentMonthData.find(d => d.line_label.toLowerCase().includes(labelKeyword));
      return row ? row.amount : 0;
    };

    const receitaBruta = extract('receita bruta') || extract('receita total');
    const margins = currentMonthData.filter(d => d.category === 'custo_variavel' || d.category === 'despesa_fixa');
    const despesasTotais = margins.reduce((acc, curr) => acc + curr.amount, 0);
    const despesasFixas = currentMonthData.filter(d => d.category === 'despesa_fixa').reduce((acc, curr) => acc + curr.amount, 0);
    const lucroLiquido = extract('lucro líquido');
    const margemContribuicao = extract('margem de contribuição') || (receitaBruta + margins.filter(m => m.category === 'custo_variavel').reduce((acc, curr) => acc + curr.amount, 0));
    const ebitda = extract('lajida');
    
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
      saldo_final: lucroLiquido
    };
  }, [matrixData, periodString]);

  const trendData = useMemo(() => {
    return months.map(mStr => {
      const ms = matrixData.filter(d => d.period_month === mStr);
      const getLine = (kw: string) => (ms.find(x => x.line_label.toLowerCase().includes(kw))?.amount || 0);
      return {
        month: new Date(mStr + 'T00:00:00').toLocaleDateString('pt-BR', { month: 'short' }),
        receita: getLine('receita bruta') || getLine('receita total'),
        ebitda: getLine('lajida')
      };
    });
  }, [matrixData, months]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
      <header>
        <h1 style={{ marginBottom: '8px' }}>Visão Executiva (CFO)</h1>
        <p>Acompanhamento de saúde financeira: KPIs de alta densidade e eficiência estrutural.</p>
      </header>

      <section style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '16px' }}>
        <KPICard title="Receita Bruta Total" value={currentMonthPivot.receita_bruta.toLocaleString('pt-BR')} change={0} prefix="R$" trend="neutral" />
        <KPICard title="Despesas Totais" value={currentMonthPivot.despesas_totais.toLocaleString('pt-BR')} change={0} prefix="R$" trend="down" />
        <KPICard title="Margem Contribuição" value={currentMonthPivot.margem_contribuicao.toLocaleString('pt-BR')} change={0} prefix="R$" trend={currentMonthPivot.margem_contribuicao >= 0 ? 'up' : 'down'} />
        <KPICard title="EBITDA" value={currentMonthPivot.ebitda.toLocaleString('pt-BR')} change={0} prefix="R$" trend={currentMonthPivot.ebitda >= 0 ? 'up' : 'down'} />
        <KPICard title="Lucro Líquido Final" value={currentMonthPivot.lucro_liquido.toLocaleString('pt-BR')} change={0} prefix="R$" trend={currentMonthPivot.lucro_liquido >= 0 ? 'up' : 'down'} />
        <KPICard title="Saldo Caixa (Mês)" value={currentMonthPivot.saldo_final.toLocaleString('pt-BR')} change={0} prefix="R$" trend="neutral" />
        <KPICard title="Break-even" value={currentMonthPivot.breakeven.toLocaleString('pt-BR')} change={0} prefix="R$" trend="neutral" />
      </section>

      <section style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(450px, 1fr))', gap: '24px' }}>
        <div className="glass-panel" style={{ padding: '24px', height: '400px', display: 'flex', flexDirection: 'column' }}>
          <h3 style={{ marginBottom: '16px', fontSize: '1rem', color: 'var(--text-main)' }}>Demonstrativo em Cascata</h3>
          <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '16px' }}>A Jornada do Dinheiro (Receita até Lucro).</p>
          <div style={{ flex: 1, minHeight: 0 }}><WaterfallChart data={currentMonthPivot} /></div>
        </div>

        <div className="glass-panel" style={{ padding: '24px', height: '400px', display: 'flex', flexDirection: 'column' }}>
          <h3 style={{ marginBottom: '16px', fontSize: '1rem', color: 'var(--text-main)' }}>Eficiência (Receita vs EBITDA)</h3>
          <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '16px' }}>Análise de crescimento longo-prazo (Tendência dupla).</p>
          <div style={{ flex: 1, minHeight: 0 }}><DoubleTrendChart data={trendData} /></div>
        </div>

        <div className="glass-panel" style={{ padding: '24px', height: '350px', display: 'flex', flexDirection: 'column' }}>
          <h3 style={{ marginBottom: '16px', fontSize: '1rem', color: 'var(--text-main)' }}>Termômetro Break-even</h3>
          <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '16px' }}>Progresso atual rumo à meta zero do mês.</p>
          <div style={{ flex: 1, minHeight: 0 }}><BreakEvenGauge data={currentMonthPivot} /></div>
        </div>

        <div className="glass-panel" style={{ padding: '24px', height: '350px', display: 'flex', flexDirection: 'column' }}>
          <h3 style={{ marginBottom: '16px', fontSize: '1rem', color: 'var(--text-main)' }}>Markup % (Composição da Base)</h3>
          <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '16px' }}>Peso dos custos e lucro sobre a fatia da receita 100%.</p>
          <div style={{ flex: 1, minHeight: 0, paddingLeft: '20px' }}><MarginStackedBar data={currentMonthPivot} /></div>
        </div>
      </section>
    </div>
  );
};
