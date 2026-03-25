
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';
import type { KPI } from '../../lib/types';

export const KPICard = ({ title, value, change, trend, prefix = '', suffix = '' }: KPI) => {
  const isPositive = trend === 'up';

  const isNegative = trend === 'down';
  
  return (
    <div className="glass-panel" style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <h3 style={{ fontSize: '0.875rem', fontWeight: 500, color: 'var(--text-muted)' }}>{title}</h3>
      
      <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between' }}>
        <div style={{ fontSize: '2rem', fontWeight: 700, color: 'var(--text-main)', display: 'flex', alignItems: 'baseline', gap: '4px' }}>
          {prefix && <span style={{ fontSize: '1rem', color: 'var(--text-muted)' }}>{prefix}</span>}
          {value}
          {suffix && <span style={{ fontSize: '1rem', color: 'var(--text-muted)' }}>{suffix}</span>}
        </div>
        
        <div style={{
          display: 'flex', alignItems: 'center', gap: '4px',
          padding: '4px 8px', borderRadius: 'var(--radius-full)',
          fontSize: '0.75rem', fontWeight: 600,
          backgroundColor: isPositive ? 'rgba(16, 185, 129, 0.1)' : isNegative ? 'rgba(239, 68, 68, 0.1)' : 'var(--color-glass)',
          color: isPositive ? 'var(--color-success)' : isNegative ? 'var(--color-danger)' : 'var(--text-muted)'
        }}>
          {isPositive ? <TrendingUp size={14} /> : isNegative ? <TrendingDown size={14} /> : <Minus size={14} />}
          <span>{Math.abs(change)}%</span>
        </div>
      </div>
    </div>
  );
};
