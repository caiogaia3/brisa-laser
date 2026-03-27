import { useMemo } from 'react';
import { ComposedChart, Area, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { usePeriodStore } from '../../store/usePeriodStore';

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div style={{
        backgroundColor: 'rgba(13, 13, 18, 0.75)',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        backdropFilter: 'blur(16px)',
        padding: '10px 14px',
        borderRadius: '12px',
        color: '#fff',
        boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.5), 0 4px 6px -2px rgba(0, 0, 0, 0.5)',
        minWidth: '180px'
      }}>
        <p style={{ 
          margin: '0 0 10px 0', 
          fontSize: '0.65rem', 
          color: 'var(--text-muted)', 
          textTransform: 'uppercase', 
          letterSpacing: '0.1em',
          fontWeight: 600
        }}>{label}</p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
          {payload.map((entry: any) => (
            <div key={entry.name} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span style={{ 
                  width: '6px', 
                  height: '6px', 
                  borderRadius: '50%', 
                  backgroundColor: entry.color,
                  boxShadow: `0 0 6px ${entry.color}`
                }} />
                <span style={{ fontSize: '0.7rem', color: 'rgba(255,255,255,0.7)', fontWeight: 500 }}>
                  {entry.name === 'receita' ? 'Receita' : 'Despesa'}
                </span>
              </div>
              <span style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-main)' }}>
                {entry.value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
              </span>
            </div>
          ))}
        </div>
      </div>
    );
  }
  return null;
};

export const ProMaxRevenueChart = () => {
  const { preset } = usePeriodStore();

  const mockData = useMemo(() => {
    const data = [];
    if (preset === 'today') {
      // Hours
      const hours = ['08:00', '10:00', '12:00', '14:00', '16:00', '18:00', '20:00'];
      hours.forEach(h => {
        data.push({
          time: h,
          receita: 1000 + Math.random() * 5000,
          despesa: 500 + Math.random() * 3000
        });
      });
    } else if (preset === '7d') {
      // Days of week
      const days = ['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb', 'Dom'];
      days.forEach(d => {
        data.push({
          time: d,
          receita: 10000 + Math.random() * 15000,
          despesa: 8000 + Math.random() * 8000
        });
      });
    } else {
      // 30 days or custom
      for (let i = 1; i <= 30; i++) {
        data.push({
          time: `${i} Mar`,
          receita: 4000 + Math.random() * 8000,
          despesa: 2000 + Math.random() * 5000
        });
      }
    }
    return data;
  }, [preset]);

  return (
    <ResponsiveContainer width="100%" height="100%">
      <ComposedChart data={mockData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
        <defs>
          <linearGradient id="colorReceita" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.6}/>
            <stop offset="95%" stopColor="#06b6d4" stopOpacity={0}/>
          </linearGradient>
          <filter id="glowCyan" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="4" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
          <filter id="glowOrange" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>
        <CartesianGrid strokeDasharray="4 4" vertical={false} stroke="rgba(255,255,255,0.06)" />
        <XAxis dataKey="time" stroke="var(--text-muted)" fontSize={11} tickLine={false} axisLine={false} tickMargin={12} />
        <YAxis stroke="var(--text-muted)" fontSize={11} tickLine={false} axisLine={false} tickFormatter={(val) => `R$${val/1000}k`} tickMargin={12} />
        <Tooltip content={<CustomTooltip />} cursor={{ stroke: 'rgba(255,255,255,0.1)', strokeWidth: 1, strokeDasharray: '5 5' }} />
        <Area type="monotone" dataKey="receita" stroke="#06b6d4" strokeWidth={3} fillOpacity={1} fill="url(#colorReceita)" style={{ filter: 'url(#glowCyan)' }} />
        <Line type="monotone" dataKey="despesa" stroke="#fb923c" strokeWidth={2} strokeDasharray="5 5" opacity={0.9} dot={false} isAnimationActive={true} style={{ filter: 'url(#glowOrange)' }} />
      </ComposedChart>
    </ResponsiveContainer>
  );
};
