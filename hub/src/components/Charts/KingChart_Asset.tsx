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
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.03)" vertical={false} />
            <XAxis 
              dataKey="name" 
              axisLine={false} 
              tickLine={false} 
              tick={{ fontSize: 10, fill: 'rgba(255,255,255,0.3)' }}
            />
            <YAxis hide />
            <Tooltip 
              contentStyle={{ 
                background: 'rgba(5, 5, 8, 0.9)', 
                border: '1px solid rgba(255, 255, 255, 0.1)',
                borderRadius: '12px',
                fontSize: '11px'
              }}
            />
            <Bar 
              dataKey="hours" 
              fill="rgba(34, 197, 94, 0.1)" 
              radius={[4, 4, 0, 0]}
              stroke="var(--color-success)"
              strokeDasharray="4 2"
            />
            <Bar 
              dataKey="revenuePerHour" 
              fill="var(--color-success)" 
              radius={[4, 4, 0, 0]}
              style={{ filter: 'drop-shadow(0 0 8px rgba(34, 197, 94, 0.4))' }}
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
