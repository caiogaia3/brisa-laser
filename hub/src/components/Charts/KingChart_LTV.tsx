import React from 'react';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, ResponsiveContainer } from 'recharts';

interface KingChartLTVProps {
  data: any[];
}

const KingChart_LTV: React.FC<KingChartLTVProps> = ({ data }) => {
  return (
    <div className="liquid-glass p-5 flex flex-col h-full relative overflow-hidden">
      {/* Background Atmosphere Blur */}
      <div className="absolute inset-0 radar-atmosphere opacity-30 pointer-events-none" />

      <div className="relative z-10 mb-2">
        <div className="text-[0.6rem] font-bold text-cyan-400 uppercase tracking-widest">King Chart B</div>
        <div className="text-sm font-black text-white tracking-tight">Matriz de LTV por Canal</div>
      </div>

      <div className="flex-1 min-h-[160px] relative z-10">
        <ResponsiveContainer width="100%" height="100%">
          <RadarChart cx="50%" cy="50%" outerRadius="70%" data={data}>
            <PolarGrid stroke="rgba(255,255,255,0.05)" />
            <PolarAngleAxis 
              dataKey="subject" 
              tick={{ fill: 'rgba(255,255,255,0.4)', fontSize: 9, fontWeight: 700 }} 
            />
            <Radar
              name="Intelligence"
              dataKey="value"
              stroke="#06b6d4"
              strokeWidth={2}
              fill="#06b6d4"
              fillOpacity={0.2}
              isAnimationActive={true}
              style={{ filter: 'drop-shadow(0 0 10px rgba(6, 182, 212, 0.4))' }}
            />
          </RadarChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-2 text-center relative z-10">
        <div className="inline-block px-3 py-1 bg-cyan-500/10 rounded-full border border-cyan-500/20 text-[0.6rem] font-bold text-cyan-400 uppercase tracking-widest">
           Canal: Meta Leads (Vibe Premium)
        </div>
      </div>
    </div>
  );
};

export default KingChart_LTV;
