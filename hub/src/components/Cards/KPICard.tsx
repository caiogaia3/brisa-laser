
import { useMemo } from 'react';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';
import { ResponsiveContainer, AreaChart, Area, YAxis } from 'recharts';
import type { KPI } from '../../lib/types';

interface KPICardProps {
  title: string;
  value: string;
  change: number;
  prefix?: string;
  suffix?: string;
}

export const KPICard = ({ title, value, change, prefix, suffix }: KPICardProps) => {
  const isPositive = change > 0;
  const isNegative = change < 0;
  const color = isPositive ? '#4ade80' : isNegative ? '#f87171' : 'var(--text-muted)';
  const badgeBg = isPositive ? 'rgba(74, 222, 128, 0.1)' : isNegative ? 'rgba(248, 113, 113, 0.1)' : 'rgba(255, 255, 255, 0.05)';
  const gradientId = useId();

  const sparklineData = Array.from({ length: 20 }, (_, i) => ({
    val: 40 + Math.random() * 40 + (isPositive ? i * 2 : isNegative ? -i * 2 : 0)
  }));

  return (
    <div className="glass-panel" style={{ 
      padding: '16px', 
      display: 'flex', 
      flexDirection: 'column', 
      justifyContent: 'space-between',
      height: '110px',
      borderRadius: 'var(--radius-lg)',
      position: 'relative'
    }}>
      <div>
        <h3 style={{ 
          fontSize: '0.6rem', 
          fontWeight: 600, 
          color: 'var(--text-dim)', 
          textTransform: 'uppercase', 
          letterSpacing: '0.12em', 
          margin: '0 0 8px 0',
        }}>{title}</h3>
        
        <div style={{ 
          fontSize: '1.5rem', 
          fontWeight: 700, 
          color: 'var(--text-main)', 
          display: 'flex', 
          alignItems: 'baseline', 
          gap: '2px'
        }}>
          {prefix && <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 500 }}>{prefix}</span>}
          {value}
          {suffix && <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 500 }}>{suffix}</span>}
        </div>
      </div>

      <div style={{ 
        display: 'flex', 
        alignItems: 'center', 
        gap: '12px',
        marginTop: 'auto'
      }}>
        {/* Pill Badge Indicator */}
        <div style={{ 
          display: 'inline-flex', 
          alignItems: 'center', 
          gap: '3px',
          padding: '2px 8px',
          borderRadius: '20px',
          fontSize: '0.65rem', 
          fontWeight: 700,
          color: color,
          backgroundColor: badgeBg,
          border: `1px solid ${color}20`
        }}>
          {isPositive ? <ArrowUp size={10} strokeWidth={3} /> : isNegative ? <ArrowDown size={10} strokeWidth={3} /> : <Minus size={10} />}
          <span>{Math.abs(change)}%</span>
        </div>

        {/* Sparkline - Aligned & Clean */}
        <div style={{ flex: 1, height: '24px', opacity: 0.8 }}>
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={sparklineData} margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
               <defs>
                 <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
                   <stop offset="0%" stopColor={color} stopOpacity={0.15}/>
                   <stop offset="100%" stopColor={color} stopOpacity={0}/>
                 </linearGradient>
               </defs>
               <YAxis domain={['dataMin - 10', 'dataMax + 10']} hide />
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
    </div>
  );
};
