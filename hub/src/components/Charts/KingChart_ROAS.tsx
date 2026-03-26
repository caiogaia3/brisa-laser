import React from 'react';
import { Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Line, ComposedChart } from 'recharts';

interface KingChartROASProps {
  data: any[];
}

const KingChart_ROAS: React.FC<KingChartROASProps> = ({ data }) => {
  return (
    <div className="liquid-glass p-5 flex flex-col h-full">
      <div className="flex items-center justify-between mb-4">
        <div>
          <div className="text-[0.6rem] font-bold text-cyan-400 uppercase tracking-widest">King Chart A</div>
          <div className="text-sm font-black text-white tracking-tight">ROAS Real por Origem</div>
        </div>
        <div className="flex gap-4">
          <div className="flex items-center gap-1.5">
            <div className="w-2 h-2 rounded-full bg-cyan-500/40" />
            <span className="text-[0.6rem] text-white/60 uppercase font-bold">Vendas</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-2 h-2 rounded-full bg-cyan-400" />
            <span className="text-[0.6rem] text-white/60 uppercase font-bold">Ads Spend</span>
          </div>
        </div>
      </div>

      <div className="flex-1 min-h-[160px]">
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.15}/>
                <stop offset="95%" stopColor="#06b6d4" stopOpacity={0}/>
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
              cursor={{ stroke: 'rgba(255,255,255,0.1)', strokeWidth: 1 }}
            />
            <Area 
              type="monotone" 
              dataKey="revenue" 
              stroke="none" 
              fillOpacity={1} 
              fill="url(#colorRevenue)" 
              isAnimationActive={true}
            />
            <Line 
              type="monotone" 
              dataKey="spend" 
              stroke="#06b6d4" 
              strokeWidth={2} 
              dot={{ r: 3, fill: '#06b6d4', strokeWidth: 0 }}
              activeDot={{ r: 6, fill: '#06b6d4', stroke: '#fff', strokeWidth: 2 }}
              style={{ filter: 'drop-shadow(0 0 8px rgba(6, 182, 212, 0.6))' }}
            />
          </ComposedChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-3 flex justify-between items-center bg-white/5 rounded-lg p-2 px-3">
        <div className="text-[0.65rem] text-white/60 font-medium">ROAS Médio do Período</div>
        <div className="text-sm font-black text-cyan-400">3.8x</div>
      </div>
    </div>
  );
};

export default KingChart_ROAS;
