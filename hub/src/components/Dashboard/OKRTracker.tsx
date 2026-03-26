import React from 'react';
import InfoTooltip from '../Common/InfoTooltip';

interface OKRTrackerProps {
  title: string;
  current: number;
  target: number;
  unit: string;
  prefix?: string;
  tooltipTitle: string;
  tooltipContent: string;
  secondaryOKRs: { label: string; progress: number }[];
}

const OKRTracker: React.FC<OKRTrackerProps> = ({ 
  title, current, target, unit, prefix = "", 
  tooltipTitle, tooltipContent, secondaryOKRs 
}) => {
  const percentage = Math.min((current / target) * 100, 110); // Allow slight overflow for "Over-achievement"

  const getStatusColor = () => {
    if (percentage < 60) return 'var(--color-danger)';
    if (percentage < 85) return 'var(--color-warning)';
    return 'var(--color-success)';
  };

  return (
    <div className="liquid-glass" style={{ 
      padding: '20px', 
      display: 'flex', 
      flexDirection: 'column', 
      gap: '12px',
      position: 'relative',
      overflow: 'hidden'
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <h4 style={{ fontSize: '0.8rem', fontWeight: 800, color: 'white', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            {title}
          </h4>
          <InfoTooltip title={tooltipTitle} content={tooltipContent} />
        </div>
        <div style={{ textAlign: 'right' }}>
          <div style={{ fontSize: '1rem', fontWeight: 900, color: 'white' }}>
            {prefix}{current.toLocaleString('pt-BR')}{unit}
          </div>
          <div style={{ fontSize: '0.6rem', color: 'rgba(255,255,255,0.4)', fontWeight: 600 }}>
            META: {prefix}{target.toLocaleString('pt-BR')}{unit}
          </div>
        </div>
      </div>

      {/* Progress Track */}
      <div style={{ position: 'relative', height: '6px', width: '100%', background: 'rgba(255,255,255,0.05)', borderRadius: '10px' }}>
        {/* The Progress Bar */}
        <div style={{ 
          position: 'absolute', top: 0, left: 0, height: '100%', 
          width: `${Math.min(percentage, 100)}%`,
          background: `linear-gradient(90deg, ${getStatusColor()}22, ${getStatusColor()})`,
          borderRadius: '10px',
          boxShadow: `0 0 10px ${getStatusColor()}44`,
          transition: 'width 1.5s cubic-bezier(0.1, 0, 0, 1)'
        }} />
        
        {/* Over-achievement (Glow Extension) */}
        {percentage > 100 && (
          <div style={{ 
            position: 'absolute', top: 0, left: '100%', height: '100%', 
            width: `${percentage - 100}%`,
            background: 'var(--color-primary)',
            borderRadius: '0 10px 10px 0',
            opacity: 0.5
          }} />
        )}

        {/* Target Marker */}
        <div style={{ 
          position: 'absolute', top: '-4px', left: '100%', height: '14px', width: '2px', 
          background: 'rgba(255,255,255,0.2)', zIndex: 2
        }} />
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span style={{ fontSize: '0.65rem', fontWeight: 700, color: getStatusColor() }}>
          {percentage.toFixed(1)}% CONCLUÍDO
        </span>
        
        {/* Mini Secondary OKRs (Preview) */}
        <div style={{ display: 'flex', gap: '8px' }}>
          {secondaryOKRs.map((s, i) => (
            <div key={i} style={{ 
              width: '12px', height: '4px', borderRadius: '10px', 
              background: s.progress >= 100 ? 'var(--color-success)' : 'rgba(255,255,255,0.1)' 
            }} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default OKRTracker;
