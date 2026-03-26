
import { useMemo } from 'react';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';
import { ResponsiveContainer, AreaChart, Area, YAxis } from 'recharts';
import type { KPI } from '../../lib/types';

export const KPICard = ({ title, value, change, trend, prefix = '', suffix = '' }: KPI) => {
  const isPositive = trend === 'up';
  const isNegative = trend === 'down';
  
  // Fake sparkline data for trend visualization (independent of period)
  const sparklineData = useMemo(() => {
    return Array.from({ length: 20 }, (_, i) => ({
      val: 40 + Math.random() * 40 + (isPositive ? i * 2 : isNegative ? -i * 2 : 0)
    }));
  }, [isPositive, isNegative]);
  
  const color = isPositive ? 'var(--color-success)' : isNegative ? 'var(--color-danger)' : 'var(--text-muted)';
  const gradientId = `grad-${title.replace(/\s+/g, '')}`;

  return (
    <div className="glass-panel" style={{ 
      padding: '12px', 
      display: 'flex', 
      flexDirection: 'column', 
      gap: '4px',
      position: 'relative',
      overflow: 'hidden',
      height: '100px',
      justifyContent: 'space-between'
    }}>
      <div style={{ zIndex: 1 }}>
        <h3 style={{ 
          fontSize: '0.65rem', 
          fontWeight: 600, 
          color: 'var(--text-muted)', 
          textTransform: 'uppercase', 
          letterSpacing: '0.1em', 
          margin: 0,
          opacity: 0.8
        }}>{title}</h3>
        
        <div style={{ 
          fontSize: '1.25rem', 
          fontWeight: 700, 
          color: 'var(--text-main)', 
          display: 'flex', 
          alignItems: 'baseline', 
          gap: '2px', 
          marginTop: '2px' 
        }}>
          {prefix && <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 500 }}>{prefix}</span>}
          {value}
          {suffix && <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 500 }}>{suffix}</span>}
        </div>

        <div style={{
          display: 'inline-flex', 
          alignItems: 'center', 
          gap: '2px',
          marginTop: '4px',
          fontSize: '0.7rem', 
          fontWeight: 600,
          color: color
        }}>
          {isPositive ? <TrendingUp size={12} /> : isNegative ? <TrendingDown size={12} /> : <Minus size={12} />}
          <span>{Math.abs(change)}%</span>
          <span style={{ color: 'var(--text-dim)', fontWeight: 400, marginLeft: '2px' }}>prev.</span>
        </div>
      </div>
      
      {/* Background Sparkline - Premium Integration */}
      <div style={{ 
        position: 'absolute', 
        bottom: 0, 
        left: 0, 
        right: 0, 
        height: '45%', 
        zIndex: 0,
        opacity: 0.6,
        pointerEvents: 'none'
      }}>
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={sparklineData} margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
             <defs>
               <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
                 <stop offset="0%" stopColor={color} stopOpacity={0.2}/>
                 <stop offset="100%" stopColor={color} stopOpacity={0}/>
               </linearGradient>
             </defs>
             <YAxis domain={['dataMin - 5', 'dataMax + 5']} hide />
             <Area 
               type="monotone" 
               dataKey="val" 
               stroke={color} 
               strokeWidth={1.5} 
               fillOpacity={1} 
               fill={`url(#${gradientId})`} 
               isAnimationActive={false} 
             />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
