
import { KPICard } from '../components/Cards/KPICard';
import { RevenueChart } from '../components/Charts/RevenueChart';
import { LeadsFunnel } from '../components/Charts/LeadsFunnel';
import { useKPIs } from '../hooks/useKPIs';
import { Bot } from 'lucide-react';

export const Dashboard = () => {
  const { loading, kpis, data } = useKPIs();

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
      <header>
        <h1 style={{ marginBottom: '8px' }}>Visão Geral (Cockpit)</h1>
        <p>Acompanhe os principais indicadores da Brisa Laser em tempo real.</p>
      </header>

      {/* Seção de KPIs Principais */}
      <section>
        {loading ? (
          <div style={{ display: 'flex', gap: '24px' }}>
             <p>Carregando métricas...</p>
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px' }}>
            {kpis.map((kpi, index) => (
              <KPICard key={index} {...kpi} />
            ))}
          </div>
        )}
      </section>

      {/* Áreas Reservadas para Gráficos */}
      <section style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '24px' }}>
        <div className="glass-panel" style={{ padding: '24px', minHeight: '400px', display: 'flex', flexDirection: 'column' }}>
          <h3 style={{ marginBottom: '24px' }}>Receita Bruta vs Custos Totais</h3>
          <div style={{ flex: 1, minHeight: '300px' }}>
            {data && <RevenueChart data={[data]} />}
            {!data && <RevenueChart data={[]} />}
          </div>
        </div>
        
        <div className="glass-panel" style={{ padding: '24px', minHeight: '400px', display: 'flex', flexDirection: 'column' }}>
          <h3 style={{ marginBottom: '24px' }}>Funil Comercial (Mês)</h3>
          <div style={{ flex: 1, minHeight: '300px' }}>
             <LeadsFunnel data={data} />
          </div>
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
          <p style={{ maxWidth: '600px' }}>Você não precisa caçar números. Faça uma pergunta direta sobre sua base de clientes, custos no marketing ou projeção de vendas usando a barra superior.</p>
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
