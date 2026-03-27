import React from 'react';
import InfoTooltip from '../Common/InfoTooltip';

interface OKRListItemProps {
  title: string;
  current: number;
  target: number;
  unit: string;
  prefix?: string;
  tooltipTitle: string;
  tooltipContent: string;
  secondaryOKRs: { label: string; progress: number }[];
  category?: string;
}

const OKRListItem: React.FC<OKRListItemProps> = ({ 
  title, current, target, unit, prefix = "", 
  tooltipTitle, tooltipContent, secondaryOKRs, category
}) => {
  const percentage = Math.min((current / target) * 100, 110);

  const getStatusColor = () => {
    if (percentage < 60) return 'var(--color-danger)';
    if (percentage < 85) return 'var(--color-warning)';
    return 'var(--color-success)';
  };

  return (
    <div style={{ 
      display: 'grid', 
      gridTemplateColumns: 'minmax(180px, 0.8fr) 2fr minmax(120px, 0.5fr) 100px',
      alignItems: 'center',
      gap: '24px',
      padding: '16px 24px',
      borderBottom: '1px solid rgba(255,255,255,0.04)',
      background: 'rgba(255,255,255,0.01)',
      transition: 'all 0.2s ease'
    }} className="okr-row-hover">
      {/* Category & Title */}
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        {category && (
            <span style={{ fontSize: '10px', fontWeight: 900, color: 'var(--color-primary)', letterSpacing: '0.1em', marginBottom: '2px' }}>
                {category.toUpperCase()}
            </span>
        )}
        <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
          <span style={{ fontSize: '0.85rem', fontWeight: 700, color: 'white' }}>{title}</span>
          <InfoTooltip title={tooltipTitle} content={tooltipContent} />
        </div>
        
        {/* Cascading Indicators (Secondary OKRs) */}
        <div style={{ display: 'flex', gap: '4px', marginTop: '6px' }}>
          {secondaryOKRs.map((s, idx) => (
            <div 
              key={idx} 
              style={{ 
                width: '16px', 
                height: '2px', 
                borderRadius: '4px', 
                background: s.progress >= 100 ? 'var(--color-success)' : 'rgba(255,255,255,0.1)',
                boxShadow: s.progress >= 100 ? '0 0 4px var(--color-success)' : 'none'
              }} 
            />
          ))}
        </div>
      </div>

      <div style={{ position: 'relative', height: '6px', background: 'rgba(255,255,255,0.04)', borderRadius: '10px', border: '1px solid rgba(255,255,255,0.02)' }}>
        <div style={{ 
          position: 'absolute', top: 0, left: 0, height: '100%', 
          width: `${Math.min(percentage, 100)}%`,
          background: `linear-gradient(90deg, ${getStatusColor()}22, ${getStatusColor()})`,
          borderRadius: '10px',
          boxShadow: `0 0 12px ${getStatusColor()}44`,
          transition: 'width 1.5s cubic-bezier(0.1, 0, 0, 1)'
        }} />
        <div style={{ 
          position: 'absolute', top: '-4px', left: `${Math.min(percentage, 100)}%`, height: '14px', width: '2px', 
          background: 'rgba(255,255,255,0.3)',
          boxShadow: '0 0 8px rgba(255,255,255,0.2)'
        }} />
      </div>

      {/* Values */}
      <div style={{ textAlign: 'right', display: 'flex', flexDirection: 'column' }}>
        <span style={{ fontSize: '0.9rem', fontWeight: 900, color: 'white' }}>
            {prefix}{current.toLocaleString('pt-BR')}{unit}
        </span>
        <span style={{ fontSize: '0.65rem', color: 'rgba(255,255,255,0.4)', fontWeight: 600 }}>
            MET: {prefix}{target.toLocaleString('pt-BR')}{unit}
        </span>
      </div>

      {/* Status Label */}
      <div style={{ 
        textAlign: 'center', 
        padding: '4px 8px', 
        borderRadius: '4px', 
        background: `${getStatusColor()}15`,
        border: `1px solid ${getStatusColor()}33`
      }}>
        <span style={{ fontSize: '11px', fontWeight: 900, color: getStatusColor(), letterSpacing: '0.05em' }}>
            {percentage.toFixed(0)}%
        </span>
      </div>
    </div>
  );
};

export const OKRList: React.FC<{ items: OKRListItemProps[], title: string, icon: React.ReactNode }> = ({ items, title, icon }) => {
  return (
    <div className="liquid-glass" style={{ width: '100%', padding: '0px', overflow: 'hidden' }}>
      <div style={{ padding: '20px 24px', borderBottom: '1px solid rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', gap: '12px' }}>
        {icon}
        <h3 style={{ fontSize: '0.95rem', fontWeight: 900, color: 'white', letterSpacing: '0.02em' }}>{title}</h3>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        {items.map((item, i) => (
          <OKRListItem key={i} {...item} />
        ))}
      </div>
      <style>{`
        .okr-row-hover:hover {
          background: rgba(255, 255, 255, 0.03) !important;
          transform: translateX(4px);
        }
      `}</style>
    </div>
  );
};
