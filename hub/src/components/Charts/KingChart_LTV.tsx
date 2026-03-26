import React from 'react';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, ResponsiveContainer } from 'recharts';

interface KingChartLTVProps {
  data: any[];
}

const KingChart_LTV: React.FC<KingChartLTVProps> = ({ data }) => {
  return (
    <div className="liquid-glass" style={{ padding: '20px', display: 'flex', flexDirection: 'column', height: '100%' }}>
      <div style={{ marginBottom: '16px' }}>
        <div style={{ fontSize: '0.6rem', fontWeight: 700, color: 'var(--color-secondary)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>KING CHART B</div>
        <div style={{ fontSize: '0.875rem', fontWeight: 900, color: 'white', letterSpacing: '-0.02em' }}>Matriz de LTV por Canal</div>
      </div>

      <div style={{ flex: 1, minHeight: '160px', position: 'relative' }}>
        {/* Atmospheric Blur Background */}
        <div style={{ 
          position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
          width: '120px', height: '120px', background: 'var(--color-secondary)',
          filter: 'blur(60px)', opacity: 0.1, pointerEvents: 'none'
        }} />
        
        <ResponsiveContainer width="100%" height="100%">
          <RadarChart cx="50%" cy="50%" outerRadius="80%" data={data}>
            <PolarGrid stroke="rgba(255,255,255,0.05)" />
            <PolarAngleAxis 
              dataKey="subject" 
              tick={{ fill: 'rgba(255,255,255,0.4)', fontSize: 9, fontWeight: 600 }} 
            />
            <Radar
              name="Intelligence"
              dataKey="value"
              stroke="var(--color-secondary)"
              fill="var(--color-secondary)"
              fillOpacity={0.2}
            />
          </RadarChart>
        </ResponsiveContainer>
      </div>

      <div style={{ marginTop: '12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: 'rgba(255, 255, 255, 0.05)', borderRadius: '8px', padding: '8px 12px' }}>
        <div style={{ fontSize: '0.65rem', color: 'rgba(255, 255, 255, 0.6)', fontWeight: 500 }}>Canal: Meta Leads (Vibe Premium)</div>
      </div>
    </div>
  );
};

export default KingChart_LTV;
