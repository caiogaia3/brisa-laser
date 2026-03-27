import React from 'react';
import { Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Line, ComposedChart } from 'recharts';
import { ChartInfo } from './ChartInfo';

interface KingChartROASProps {
  data: any[];
  subtitle?: string;
  isSubcomponent?: boolean;
}

const KingChart_ROAS: React.FC<KingChartROASProps> = ({ data, subtitle, isSubcomponent }) => {
  return (
    <div className={isSubcomponent ? "" : "liquid-glass"} style={{ padding: isSubcomponent ? '0' : '20px', display: 'flex', flexDirection: 'column', height: '100%' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div style={{ fontSize: '0.6rem', fontWeight: 700, color: 'var(--color-primary)', textTransform: 'uppercase', letterSpacing: '0.1em' } as any}>
              {subtitle || 'KING CHART A'}
            </div>
            <ChartInfo 
              title={isSubcomponent ? "Simulador de Escala" : "ROAS Real por Origem"} 
              description="Simulador de escala que projeta a receita incremental versus investimento em Ads, calibrado para a perda natural de eficiência em orçamentos elevados." 
            />
          </div>
          <div style={{ fontSize: '0.875rem', fontWeight: 900, color: 'white', letterSpacing: '-0.02em' }}>
            {isSubcomponent ? 'Impacto de Mídia vs Receita' : 'ROAS Real por Origem'}
          </div>
        </div>
        <div style={{ display: 'flex', gap: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: 'rgba(6, 182, 212, 0.4)' }} />
            <span style={{ fontSize: '0.6rem', color: 'rgba(255, 255, 255, 0.6)', fontWeight: 700, textTransform: 'uppercase' }}>Vendas</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: 'var(--color-primary)' }} />
            <span style={{ fontSize: '0.6rem', color: 'rgba(255, 255, 255, 0.6)', fontWeight: 700, textTransform: 'uppercase' }}>Ads Spend</span>
          </div>
        </div>
      </div>

      <div style={{ flex: 1, minHeight: '160px' }}>
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.15}/>
                <stop offset="95%" stopColor="#06b6d4" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.03)" vertical={false} />
            <XAxis 
              dataKey="name" 
              axisLine={false} 
              tickLine={false} 
              tick={{ fontSize: 10, fill: 'rgba(255,255,255,0.3)' }}
              dy={10}
            />
            <YAxis hide />
            <Tooltip 
              contentStyle={{ 
                background: 'rgba(5, 5, 8, 0.9)', 
                border: '1px solid rgba(255, 255, 255, 0.1)',
                borderRadius: '12px',
                fontSize: '11px',
                backdropFilter: 'blur(20px)'
              }}
              itemStyle={{ color: '#fff' }}
              cursor={{ stroke: 'rgba(255,255,255,0.1)', strokeWidth: 1 }}
            />
            <Area 
              type="monotone" 
              dataKey="revenue" 
              stroke="none" 
              fillOpacity={1} 
              fill="url(#colorRevenue)" 
              isAnimationActive={true}
            />
            <Line 
              type="monotone" 
              dataKey="spend" 
              stroke="#06b6d4" 
              strokeWidth={2} 
              dot={{ r: 3, fill: '#06b6d4', strokeWidth: 0 }}
              activeDot={{ r: 6, fill: '#06b6d4', stroke: '#fff', strokeWidth: 2 }}
              style={{ filter: 'drop-shadow(0 0 8px rgba(6, 182, 212, 0.6))' }}
            />
          </ComposedChart>
        </ResponsiveContainer>
      </div>

      <div style={{ marginTop: '12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: 'rgba(255, 255, 255, 0.05)', borderRadius: '8px', padding: '8px 12px' }}>
        <div style={{ fontSize: '0.65rem', color: 'rgba(255, 255, 255, 0.6)', fontWeight: 500 }}>ROAS Médio do Período</div>
        <div style={{ fontSize: '0.875rem', fontWeight: 900, color: 'var(--color-primary)' }}>3.8x</div>
      </div>
    </div>
  );
};

export default KingChart_ROAS;
