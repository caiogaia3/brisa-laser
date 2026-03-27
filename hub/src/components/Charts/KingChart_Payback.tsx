import React from 'react';
import { Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart } from 'recharts';
import { ChartInfo } from './ChartInfo';

interface KingChartPaybackProps {
  data: any[];
}

const KingChart_Payback: React.FC<KingChartPaybackProps> = ({ data }) => {
  return (
    <div className="liquid-glass" style={{ padding: '20px', display: 'flex', flexDirection: 'column', height: '100%' }}>
      <div style={{ marginBottom: '16px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div style={{ fontSize: '0.6rem', fontWeight: 700, color: 'var(--color-warning)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>KING CHART C</div>
          <ChartInfo 
            title="Timeline de Payback" 
            description="Mede o tempo médio para o lucro bruto acumulado de um cliente cobrir seu custo de aquisição (CAC). Crucial para gestão de caixa." 
          />
        </div>
        <div style={{ fontSize: '0.875rem', fontWeight: 900, color: 'white', letterSpacing: '-0.02em' }}>Timeline de Payback</div>
      </div>

      <div style={{ flex: 1, minHeight: '160px' }}>
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="colorPayback" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="var(--color-warning)" stopOpacity={0.2}/>
                <stop offset="95%" stopColor="var(--color-warning)" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.03)" vertical={false} />
            <XAxis 
              dataKey="name" 
              axisLine={false} 
              tickLine={false} 
              tick={{ fontSize: 10, fill: 'rgba(255,255,255,0.3)' }}
            />
            <YAxis hide domain={['auto', 'auto']} />
            <Tooltip 
              contentStyle={{ 
                background: 'rgba(5, 5, 8, 0.9)', 
                border: '1px solid rgba(255, 255, 255, 0.1)',
                borderRadius: '12px',
                fontSize: '11px'
              }}
            />
            <Area 
              type="stepAfter" 
              dataKey="value" 
              stroke="var(--color-warning)" 
              strokeWidth={3}
              fillOpacity={1} 
              fill="url(#colorPayback)" 
              style={{ filter: 'drop-shadow(0 0 10px rgba(245, 158, 11, 0.3))' }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      <div style={{ marginTop: '12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: 'rgba(255, 255, 255, 0.05)', borderRadius: '8px', padding: '8px 12px' }}>
        <div style={{ fontSize: '0.65rem', color: 'rgba(255, 255, 255, 0.6)', fontWeight: 500 }}>Payback: 42 Dias</div>
        <div style={{ fontSize: '0.7rem', fontWeight: 700, color: 'var(--color-warning)' }}>Início Campanha</div>
      </div>
    </div>
  );
};

export default KingChart_Payback;
