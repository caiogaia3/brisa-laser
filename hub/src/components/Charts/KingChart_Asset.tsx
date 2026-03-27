import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { ChartInfo } from './ChartInfo';

interface KingChartAssetProps {
  data: any[];
}

const KingChart_Asset: React.FC<KingChartAssetProps> = ({ data }) => {
  return (
    <div className="liquid-glass" style={{ padding: '20px', display: 'flex', flexDirection: 'column', height: '100%' }}>
      <div style={{ marginBottom: '16px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div style={{ fontSize: '0.6rem', fontWeight: 700, color: 'var(--color-success)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>KING CHART D</div>
          <ChartInfo 
            title="Eficiência de Ativo (Laser)" 
            description="Mede a ocupação das máquinas versus rentabilidade horária. Foca em maximizar o ticket médio por disparo e reduzir a ociosidade do equipamento." 
          />
        </div>
        <div style={{ fontSize: '0.875rem', fontWeight: 900, color: 'white', letterSpacing: '-0.02em' }}>Eficiência de Ativo (Laser)</div>
      </div>

      <div style={{ flex: 1, minHeight: '160px' }}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <defs>
              <filter id="glowAsset" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="3" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
              </filter>
            </defs>
            <CartesianGrid strokeDasharray="4 4" stroke="rgba(255,255,255,0.06)" vertical={false} />
            <XAxis 
              dataKey="name" 
              axisLine={false} 
              tickLine={false} 
              tick={{ fontSize: 10, fill: 'rgba(255,255,255,0.3)' }}
            />
            <YAxis hide />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: 'rgba(13, 13, 18, 0.85)', 
                border: '1px solid rgba(255, 255, 255, 0.1)',
                borderRadius: '12px',
                fontSize: '11px',
                backdropFilter: 'blur(16px)',
                boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.5)'
              }}
              labelStyle={{ color: 'var(--text-muted)', fontSize: '0.65rem', textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: 600, marginBottom: '6px' }}
              itemStyle={{ color: '#fff', fontWeight: 700 }}
            />
            <Bar 
              dataKey="hours" 
              fill="rgba(16, 185, 129, 0.05)" 
              radius={[4, 4, 0, 0]}
              stroke="rgba(16, 185, 129, 0.3)"
              strokeDasharray="4 2"
            />
            <Bar 
              dataKey="revenuePerHour" 
              fill="#10b981" 
              radius={[4, 4, 0, 0]}
              style={{ filter: 'url(#glowAsset)' }}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div style={{ marginTop: '12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: 'rgba(255, 255, 255, 0.05)', borderRadius: '8px', padding: '8px 12px' }}>
        <div style={{ fontSize: '0.65rem', color: 'rgba(255, 255, 255, 0.6)', fontWeight: 500 }}>Mix de Áreas: Coxa/Perna</div>
      </div>
    </div>
  );
};

export default KingChart_Asset;
