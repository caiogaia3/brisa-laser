
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';
import type { KPI } from '../../lib/types';

export const KPICard = ({ title, value, change, trend, prefix = '', suffix = '' }: KPI) => {
  const isPositive = trend === 'up';

  const isNegative = trend === 'down';
  
  return (
    <div className="glass-panel" style={{ padding: '16px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
      <h3 style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{title}</h3>
      
      <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between' }}>
        <div style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--text-main)', display: 'flex', alignItems: 'baseline', gap: '4px' }}>
          {prefix && <span style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>{prefix}</span>}
          {value}
          {suffix && <span style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>{suffix}</span>}
        </div>
        
        <div style={{
          display: 'flex', alignItems: 'center', gap: '4px',
          fontSize: '0.75rem', fontWeight: 600,
          color: isPositive ? 'var(--color-success)' : isNegative ? 'var(--color-danger)' : 'var(--text-muted)'
        }}>
          {isPositive ? <TrendingUp size={14} /> : isNegative ? <TrendingDown size={14} /> : <Minus size={14} />}
          <span>{Math.abs(change)}%</span>
        </div>
      </div>
    </div>
  );
};
