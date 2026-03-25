import { RevenueChart } from '../components/Charts/RevenueChart';
import { DRETable } from '../components/Tables/DRETable';
import { KPICard } from '../components/Cards/KPICard';
import { useKPIs } from '../hooks/useKPIs';

export const Financeiro = () => {
  const { data } = useKPIs();

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
      <header>
        <h1 style={{ marginBottom: '8px' }}>Financeiro & DRE</h1>
        <p>Acompanhamento de receita, custos detalhados e Demonstração do Resultado do Exercício.</p>
      </header>

      <section style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px' }}>
        <KPICard title="Receita (Mês Atual)" value="142.500" change={12.5} prefix="R$" trend="up" />
        <KPICard title="Custos Gasto" value="85.200" change={-2.4} prefix="R$" trend="down" />
        <KPICard title="EBITDA" value="57.300" change={5.1} prefix="R$" trend="up" />
        <KPICard title="Margem Média" value="40" change={2} suffix="%" trend="up" />
      </section>

      <section className="glass-panel" style={{ padding: '24px' }}>
        <h3 style={{ marginBottom: '24px' }}>Evolução Mensal (Receita vs Custo)</h3>
        <div style={{ height: '400px' }}>
          <RevenueChart data={data ? [data] : []} />
        </div>
      </section>

      <section className="glass-panel" style={{ padding: '24px' }}>
        <h3 style={{ marginBottom: '24px' }}>Lançamentos Recentes (DRE)</h3>
        <DRETable />
      </section>
    </div>
  );
};
