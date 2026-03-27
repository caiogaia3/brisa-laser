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
                <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.25}/>
                <stop offset="95%" stopColor="#06b6d4" stopOpacity={0}/>
              </linearGradient>
              <filter id="glowCyan" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="4" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
              </filter>
              <filter id="glowOrange" x="-20%" y="-20%" width="140%" height="140%">
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
              dy={10}
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
              cursor={{ stroke: 'rgba(255,255,255,0.1)', strokeWidth: 1 }}
            />
            <Area 
              type="monotone" 
              dataKey="revenue" 
              stroke="none" 
              fillOpacity={1} 
              fill="url(#colorRevenue)" 
              isAnimationActive={true}
              style={{ filter: 'url(#glowCyan)' }}
            />
            <Line 
              type="monotone" 
              dataKey="spend" 
              stroke="#fb923c" 
              strokeWidth={2} 
              dot={{ r: 3, fill: '#fb923c', strokeWidth: 0 }}
              activeDot={{ r: 6, fill: '#fb923c', stroke: '#fff', strokeWidth: 2 }}
              style={{ filter: 'url(#glowOrange)' }}
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
