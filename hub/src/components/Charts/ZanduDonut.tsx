import React from 'react';
import { ChartInfo } from './ChartInfo';

interface ZanduDonutProps {
  value: number;
  target: number;
  label: string;
  subValue: string;
}

const ZanduDonut: React.FC<ZanduDonutProps> = ({ value, target, label, subValue }) => {
  const percentage = Math.min((value / target) * 100, 100);
  const radius = 70;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (percentage / 100) * circumference;

  return (
    <div className="liquid-glass" style={{ padding: '24px', height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', position: 'relative', overflow: 'hidden' }}>
      {/* Background Decorative Circles */}
      <div style={{ position: 'absolute', top: '-20px', right: '-20px', width: '100px', height: '100px', background: 'var(--color-primary)', opacity: 0.05, filter: 'blur(40px)', borderRadius: '50%' }} />
      
      <div style={{ position: 'relative', width: '180px', height: '180px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <svg width="180" height="180" viewBox="0 0 180 180" style={{ transform: 'rotate(-90deg)' }}>
          <defs>
            <linearGradient id="donutGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#06b6d4" />
              <stop offset="100%" stopColor="#22d3ee" />
            </linearGradient>
            <filter id="donutGlow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="5" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>
          {/* Base Circle */}
          <circle
            cx="90" cy="90" r={radius}
            fill="transparent"
            stroke="rgba(255,255,255,0.03)"
            strokeWidth="10"
          />
          {/* Progress Circle (Glow) */}
          <circle
            cx="90" cy="90" r={radius}
            fill="transparent"
            stroke="url(#donutGradient)"
            strokeWidth="10"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            strokeLinecap="round"
            style={{ 
              transition: 'stroke-dashoffset 1.5s cubic-bezier(0.1, 0, 0, 1)',
              filter: 'url(#donutGlow)'
            }}
          />
        </svg>

        {/* Center Content */}
        <div style={{ position: 'absolute', textAlign: 'center', display: 'flex', flexDirection: 'column' }}>
          <span style={{ fontSize: '0.65rem', fontWeight: 700, color: 'rgba(255, 255, 255, 0.4)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>{subValue}</span>
          <span style={{ fontSize: '1.25rem', fontWeight: 900, color: 'white', marginTop: '2px' }}>
            R$ {value.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
          </span>
          <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--color-primary)', marginTop: '2px' }}>{percentage.toFixed(1)}%</span>
        </div>
      </div>

      <div style={{ marginTop: '20px', textAlign: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
          <div style={{ fontSize: '0.875rem', fontWeight: 800, color: 'white' }}>{label}</div>
          <ChartInfo 
            title="Faturamento Bruto" 
            description="Monitoramento em tempo real do faturamento acumulado versus a meta mensal estabelecida no OKR estratégico." 
          />
        </div>
        <div style={{ fontSize: '0.65rem', color: 'rgba(255, 255, 255, 0.4)', marginTop: '4px' }}>Meta: R$ {target.toLocaleString('pt-BR')}</div>
      </div>
    </div>
  );
};

export default ZanduDonut;
