
import { useMemo } from 'react';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';
import { ResponsiveContainer, AreaChart, Area, YAxis } from 'recharts';
import type { KPI } from '../../lib/types';

export const KPICard = ({ title, value, change, trend, prefix = '', suffix = '' }: KPI) => {
  const isPositive = trend === 'up';
  const isNegative = trend === 'down';
  
  const sparklineData = useMemo(() => {
    return Array.from({ length: 15 }, (_, i) => ({
      val: 50 + Math.random() * 50 + (isPositive ? i * 2 : isNegative ? -i * 2 : Math.sin(i))
    }));
  }, [isPositive, isNegative]);
  
  const color = isPositive ? '#10b981' : isNegative ? '#ef4444' : '#64748b';
  const gradientId = `grad-${title.replace(/\\s+/g, '')}`;

  return (
    <div className="glass-panel" style={{ padding: '16px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
      <h3 style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em', margin: 0 }}>{title}</h3>
      
      <div style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--text-main)', display: 'flex', alignItems: 'baseline', gap: '4px', margin: '4px 0' }}>
        {prefix && <span style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>{prefix}</span>}
        {value}
        {suffix && <span style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>{suffix}</span>}
      </div>
        
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', height: '28px' }}>
        <div style={{
          display: 'flex', alignItems: 'center', gap: '4px',
          padding: '4px 8px', borderRadius: '4px',
          backgroundColor: `${color}15`,
          border: `1px solid ${color}30`,
          fontSize: '0.75rem', fontWeight: 600,
          color: color
        }}>
          {isPositive ? <TrendingUp size={14} /> : isNegative ? <TrendingDown size={14} /> : <Minus size={14} />}
          <span>{Math.abs(change)}%</span>
        </div>
        
        <div style={{ flex: 1, height: '100%' }}>
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={sparklineData}>
               <defs>
                 <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
                   <stop offset="5%" stopColor={color} stopOpacity={0.3}/>
                   <stop offset="95%" stopColor={color} stopOpacity={0}/>
                 </linearGradient>
               </defs>
               <YAxis domain={['dataMin - 10', 'dataMax + 10']} hide />
               <Area type="monotone" dataKey="val" stroke={color} strokeWidth={2} fillOpacity={1} fill={`url(#${gradientId})`} isAnimationActive={false} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};
