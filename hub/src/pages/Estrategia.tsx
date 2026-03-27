import { PageHeader } from '../components/Layout/PageHeader';
import { TrendingUp, Zap, BarChart3, TrendingDown } from 'lucide-react';
import { KingChart_Growth } from '../components/Charts/KingChart_Growth';
import { OKRInputPanel } from '../components/Dashboard/OKRInputPanel';
import KingChart_ROAS from '../components/Charts/KingChart_ROAS';
import InfoTooltip from '../components/Common/InfoTooltip';

export const Estrategia = () => {
  const scalingData = [
    { name: 'Atual', revenue: 150000, spend: 32000 },
    { name: '+20% Budget', revenue: 178000, spend: 38400 },
    { name: '+50% Budget', revenue: 215000, spend: 48000 },
    { name: 'Dobra Budget', revenue: 280000, spend: 64000 },
  ];

  return (
    <div style={{ display: 'flex', minHeight: 'calc(100vh - 80px)', margin: '-24px' }}>
      {/* 🚀 Main Strategy Column */}
      <div style={{ flex: 1, padding: '24px', display: 'flex', flexDirection: 'column', gap: '24px', overflowY: 'auto' }}>
        <PageHeader 
          title="Estratégia & Projeções" 
          subtitle="O laboratório de escala e simuladores de performance da Brisa Laser."
        />

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '24px' }}>
          {/* King Chart Growth (Integrated) */}
          <div style={{ height: '350px' }}>
            <KingChart_Growth />
          </div>

          {/* Scaling Simulator Chart (Clean) */}
          <KingChart_ROAS 
            data={scalingData} 
            subtitle="SIMULADOR DE ESCALA" 
          />
        </div>

        {/* Tactical Insights Cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px' }}>
          <div className="liquid-glass" style={{ padding: '20px', display: 'flex', alignItems: 'center', gap: '16px' }}>
            <div style={{ padding: '12px', backgroundColor: 'rgba(74, 222, 128, 0.1)', borderRadius: '12px' }}>
              <TrendingUp size={24} color="var(--color-accent)" />
            </div>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <p style={{ fontSize: '0.65rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 700 }}>Oportunidade</p>
                <InfoTooltip 
                  title="Escalar Google Ads" 
                  content="Análise de ROI por canal indica que o Google Ads possui custo por conversão estável e alto faturamento escalável." 
                />
              </div>
              <h4 style={{ fontSize: '1rem', fontWeight: 800, color: 'white' }}>Escalar Google</h4>
              <p style={{ fontSize: '0.6rem', color: 'var(--color-accent)' }}>+ R$ 12k de Lucro Projetado</p>
            </div>
          </div>

          <div className="liquid-glass" style={{ padding: '20px', display: 'flex', alignItems: 'center', gap: '16px' }}>
            <div style={{ padding: '12px', backgroundColor: 'rgba(239, 68, 68, 0.1)', borderRadius: '12px' }}>
              <TrendingDown size={24} color="var(--color-orange)" />
            </div>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <p style={{ fontSize: '0.65rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 700 }}>Risco Detectado</p>
                <InfoTooltip 
                  title="Erosão de CPA" 
                  content="Aumento do custo por aquisição detectado devido à fadiga de criativos no Meta Ads. Frequência > 2.8 exige novos assets." 
                />
              </div>
              <h4 style={{ fontSize: '1rem', fontWeight: 800, color: 'white' }}>Erosão de CPA</h4>
              <p style={{ fontSize: '0.6rem', color: 'var(--color-warning)' }}>Frequência Meta Ads &gt; 2.8</p>
            </div>
          </div>

          <div className="liquid-glass" style={{ padding: '20px', display: 'flex', alignItems: 'center', gap: '16px' }}>
            <div style={{ padding: '12px', backgroundColor: 'rgba(168, 85, 247, 0.1)', borderRadius: '12px' }}>
              <Zap size={24} color="#a855f7" />
            </div>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <p style={{ fontSize: '0.65rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 700 }}>Inteligência LTV</p>
                <InfoTooltip 
                  title="Retenção Máxima" 
                  content="Clientes que tratam mais de 4 áreas simultâneas possuem LTV 3.5x maior que a média da base Brisa." 
                />
              </div>
              <h4 style={{ fontSize: '1rem', fontWeight: 800, color: 'white' }}>Retenção Máxima</h4>
              <p style={{ fontSize: '0.6rem', color: '#a855f7' }}>Média de 4.2 áreas p/ cliente</p>
            </div>
          </div>
        </div>

        {/* LTV Maturation Simulation Placeholder */}
        <div className="liquid-glass" style={{ padding: '32px', display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '200px', borderStyle: 'dashed' }}>
           <div style={{ textAlign: 'center' }}>
             <BarChart3 size={48} color="rgba(255,255,255,0.05)" />
             <p style={{ marginTop: '16px', color: 'var(--text-muted)', fontSize: '0.85rem' }}>Matriz de Maturação de LTV (Cohorts) sendo processada pela IA...</p>
           </div>
        </div>
      </div>

      {/* 🎯 The OKR Selection Side-Panel (30%) */}
      <div style={{ width: '360px', backgroundColor: 'rgba(5, 5, 8, 0.4)', backdropFilter: 'blur(10px)' }}>
        <OKRInputPanel />
      </div>
    </div>
  );
};
