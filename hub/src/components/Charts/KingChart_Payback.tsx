import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from 'recharts';

interface KingChartPaybackProps {
  data: any[];
}

const KingChart_Payback: React.FC<KingChartPaybackProps> = ({ data }) => {
  return (
    <div className="liquid-glass p-5 flex flex-col h-full">
      <div className="flex items-center justify-between mb-4">
        <div>
          <div className="text-[0.6rem] font-bold text-cyan-400 uppercase tracking-widest">King Chart C</div>
          <div className="text-sm font-black text-white tracking-tight">Timeline de Payback</div>
        </div>
        <div className="px-2 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/20 text-[0.55rem] font-bold text-emerald-400 uppercase tracking-widest">
           Payback: 42 Dias
        </div>
      </div>

      <div className="flex-1 min-h-[160px]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="splitColor" x1="0" y1="0" x2="0" y2="1">
                <stop offset={0} stopColor="#4ade80" stopOpacity={0.4} />
                <stop offset={0.5} stopColor="#4ade80" stopOpacity={0.1} />
                <stop offset={0.5} stopColor="#f87171" stopOpacity={0.1} />
                <stop offset={1} stopColor="#f87171" stopOpacity={0.4} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.03)" vertical={false} />
            <XAxis 
              dataKey="name" 
              axisLine={false} 
              tickLine={false} 
              tick={{ fontSize: 10, fill: 'rgba(255,255,255,0.3)' }}
              dy={10}
            />
            <YAxis hide />
            <Tooltip 
              contentStyle={{ 
                background: 'rgba(5, 5, 8, 0.9)', 
                border: '1px solid rgba(255, 255, 255, 0.1)',
                borderRadius: '12px',
                fontSize: '11px',
                backdropFilter: 'blur(20px)'
              }}
              itemStyle={{ color: '#fff' }}
            />
            <ReferenceLine y={0} stroke="rgba(255,255,255,0.1)" strokeWidth={1} />
            <Area 
              type="step" 
              dataKey="value" 
              stroke="#06b6d4" 
              strokeWidth={2}
              fill="url(#splitColor)" 
              isAnimationActive={true}
              style={{ filter: 'drop-shadow(0 0 5px rgba(6, 182, 212, 0.3))' }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-3 flex justify-between items-center text-[0.6rem] uppercase font-bold tracking-widest text-white/40">
        <span>Início Campanha</span>
        <span>Break-even Point</span>
        <span>Escala</span>
      </div>
    </div>
  );
};

export default KingChart_Payback;
