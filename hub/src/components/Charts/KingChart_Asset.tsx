import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface KingChartAssetProps {
  data: any[];
}

const KingChart_Asset: React.FC<KingChartAssetProps> = ({ data }) => {
  return (
    <div className="liquid-glass p-5 flex flex-col h-full">
      <div className="flex items-center justify-between mb-4">
        <div>
          <div className="text-[0.6rem] font-bold text-cyan-400 uppercase tracking-widest">King Chart D</div>
          <div className="text-sm font-black text-white tracking-tight">Eficiência de Ativo (Laser)</div>
        </div>
        <div className="flex gap-2 text-[0.5rem] font-bold text-white/40 uppercase tracking-widest">
           <span>Barras: Horas</span>
           <span>•</span>
           <span className="text-cyan-400">Pontos: R$/Hora</span>
        </div>
      </div>

      <div className="flex-1 min-h-[160px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
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
            <Bar 
              dataKey="hours" 
              fill="rgba(255,255,255,0.03)" 
              radius={[4, 4, 0, 0]} 
              isAnimationActive={true}
            />
            <Bar 
              dataKey="revenuePerHour" 
              fill="#06b6d4" 
              radius={[4, 4, 0, 0]} 
              barSize={8}
              isAnimationActive={true}
              style={{ filter: 'drop-shadow(0 0 5px rgba(6, 182, 212, 0.3))' }}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-3 flex justify-between items-center text-[0.6rem] uppercase font-bold tracking-widest text-white/40">
        <span>Mix de Áreas</span>
        <div className="flex gap-4">
          <div className="flex items-center gap-1.5">
            <span className="text-white">Axila</span>
            <div className="w-1 h-1 rounded-full bg-cyan-400" />
          </div>
          <div className="flex items-center gap-1.5">
            <span className="text-white">Perna</span>
            <div className="w-1 h-1 rounded-full bg-cyan-400" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default KingChart_Asset;
