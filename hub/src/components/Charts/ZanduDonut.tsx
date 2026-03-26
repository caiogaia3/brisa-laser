import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

interface ZanduDonutProps {
  value: number;
  target: number;
  label: string;
  subValue?: string;
  color?: string;
}

const ZanduDonut: React.FC<ZanduDonutProps> = ({ 
  value, 
  target, 
  label, 
  subValue,
  color = '#06b6d4' 
}) => {
  const percentage = Math.min((value / target) * 100, 100);
  const remaining = Math.max(0, 100 - percentage);
  
  const data = [
    { name: 'Progress', value: percentage },
    { name: 'Remaining', value: remaining }
  ];

  return (
    <div className="liquid-glass p-6 h-full flex flex-col items-center justify-center relative overflow-hidden">
      {/* Background Atmosphere */}
      <div className="absolute inset-0 radar-atmosphere opacity-20" />
      
      <div className="w-full h-48 relative z-10">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={65}
              outerRadius={80}
              startAngle={90}
              endAngle={450}
              paddingAngle={0}
              dataKey="value"
              stroke="none"
              isAnimationActive={true}
            >
              <Cell fill={color} style={{ filter: `drop-shadow(0 0 8px ${color}60)` }} />
              <Cell fill="rgba(255, 255, 255, 0.05)" />
            </Pie>
          </PieChart>
        </ResponsiveContainer>

        {/* Central Content */}
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
          {subValue && (
            <div className="text-[0.65rem] font-bold text-white/40 uppercase tracking-widest mb-1">
              {subValue}
            </div>
          )}
          <div className="text-2xl font-black text-white tracking-tighter">
            R$ {value.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
          </div>
          <div className="text-[0.65rem] font-bold text-white/60 uppercase tracking-widest mt-1">
            {label}
          </div>
        </div>
      </div>

      {/* Footer Info */}
      <div className="mt-4 flex gap-8 z-10">
        <div className="text-center">
          <div className="text-[0.55rem] text-white/40 uppercase font-bold tracking-wider mb-0.5">Progresso</div>
          <div className="text-sm font-bold text-cyan-400">{percentage.toFixed(1)}%</div>
        </div>
        <div className="text-center">
          <div className="text-[0.55rem] text-white/40 uppercase font-bold tracking-wider mb-0.5">Meta</div>
          <div className="text-sm font-bold text-white/80">R$ {target.toLocaleString('pt-BR')}</div>
        </div>
      </div>
    </div>
  );
};

export default ZanduDonut;
