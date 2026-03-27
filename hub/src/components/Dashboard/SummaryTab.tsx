import React from 'react';
import { KPICard } from '../Cards/KPICard';
import ZanduDonut from '../Charts/ZanduDonut';
import KingChart_ROAS from '../Charts/KingChart_ROAS';
import KingChart_LTV from '../Charts/KingChart_LTV';
import KingChart_Payback from '../Charts/KingChart_Payback';
import KingChart_Asset from '../Charts/KingChart_Asset';
import { KingChart_Growth } from '../Charts/KingChart_Growth';

const SummaryTab: React.FC = () => {
  // 💎 The 5 King KPIs (Elite Metrics)
  const kingKPIs = [
    {
      title: "Valor Médio / Visita",
      value: "254,80",
      change: 8.4,
      prefix: "R$",
      isGolden: true,
      tooltipTitle: "ATV (Average Transaction Value)",
      tooltipContent: "Diferencia clínica premium de popular. Foca na venda de pacotes de alto valor vs sessões avulsas de retoque. Meta > R$ 248,75 garante faturamento escalável."
    },
    {
      title: "Ratio LTV/CAC",
      value: "3.4x",
      change: 12.1,
      isGolden: true,
      tooltipTitle: "LTV to CAC Ratio",
      tooltipContent: "O motor de crescimento patrimonial. Mede quanto cada Real investido gera de lucro vitalício. Se > 3.0x, a empresa está criando valor real de mercado."
    },
    {
      title: "Margem Bruta",
      value: "96.2",
      change: 0.8,
      suffix: "%",
      isGolden: true,
      tooltipTitle: "Gross Margin %",
      tooltipContent: "No laser, o custo marginal do disparo é mínimo. Uma queda aqui indica vazamento de lucro, erro de precificação ou excesso de descontos agressivos."
    },
    {
      title: "Taxa Comparecimento",
      value: "72.4",
      change: -2.1,
      suffix: "%",
      isGolden: false,
      tooltipTitle: "Show-up Rate (Real)",
      tooltipContent: "Mede a eficiência do funil comercial e dos lembretes. Comparecimento < 70% desperdiça investimento em Ads e ociosa a equipe da clínica."
    },
    {
      title: "Utilização Máquina",
      value: "64.8",
      change: 5.2,
      suffix: "%",
      isGolden: true,
      tooltipTitle: "Asset Efficiency",
      tooltipContent: "Sua máquina de laser é seu maior custo de capital. Cada hora parada é lucro perdido. Meta > 60% garante que o investimento se pague no tempo previsto."
    }
  ];

  // 📈 King Charts Data (Cross-Metric Logic)
  const roasData = [
    { name: 'Google', revenue: 45000, spend: 12000 },
    { name: 'Meta Ads', revenue: 58000, spend: 15400 },
    { name: 'Indicação', revenue: 15000, spend: 500 },
    { name: 'Organic', revenue: 8000, spend: 100 },
  ];

  const ltvData = [
    { subject: 'Volume', value: 85 },
    { subject: 'Velocidade', value: 70 },
    { subject: 'CAC', value: 90 },
    { subject: 'LTV', value: 95 },
    { subject: 'Conversão', value: 75 },
  ];

  const paybackData = [
    { name: 'D1', value: -1000 },
    { name: 'D10', value: -800 },
    { name: 'D20', value: -400 },
    { name: 'D30', value: -100 },
    { name: 'D42', value: 0 },
    { name: 'D50', value: 400 },
    { name: 'D60', value: 1200 },
  ];

  const assetData = [
    { name: 'Axila', hours: 80, revenuePerHour: 120 },
    { name: 'Perna', hours: 65, revenuePerHour: 210 },
    { name: 'Barba', hours: 45, revenuePerHour: 150 },
    { name: 'Virilha', hours: 70, revenuePerHour: 180 },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* 🚀 Top Row: The 5 King KPIs */}
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
        gap: '16px' 
      }}>
        {kingKPIs.map((kpi, index) => (
          <KPICard key={index} {...kpi} />
        ))}
      </div>

      {/* 📊 High-Density Intelligence Grid */}
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(12, 1fr)', 
        gap: '24px' 
      }}>
        
        {/* Sales Progress (Zandu Style) */}
        <div style={{ gridColumn: 'span 4', height: '320px' }} className="mobile-col-12">
          <ZanduDonut 
            value={22720.50} 
            target={30000} 
            label="Vendas no mês" 
            subValue="Meta Março"
          />
        </div>

        {/* King Charts Grid (Cross-Metric Analysis) */}
        <div style={{ gridColumn: 'span 8' }} className="mobile-col-12">
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(2, 1fr)', 
            gap: '24px' 
          }}>
            <KingChart_ROAS data={roasData} />
            <KingChart_LTV data={ltvData} />
            <KingChart_Growth />
            <KingChart_Payback data={paybackData} />
            <KingChart_Asset data={assetData} />
          </div>
        </div>
      </div>
      
      <style>{`
        @media (max-width: 1200px) {
          .mobile-col-12 { grid-column: span 12 !important; }
        }
        @media (max-width: 768px) {
          div[style*="gridTemplateColumns: repeat(2, 1fr)"] {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
};

export default SummaryTab;
