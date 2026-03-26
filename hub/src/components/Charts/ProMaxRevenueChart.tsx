import { useMemo } from 'react';
import { ComposedChart, Area, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { usePeriodStore } from '../../store/usePeriodStore';

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div style={{
        background: 'rgba(15, 23, 42, 0.95)',
        border: '1px solid rgba(255,255,255,0.1)',
        backdropFilter: 'blur(8px)',
        padding: '12px',
        borderRadius: '8px',
        color: '#fff',
        boxShadow: '0 4px 6px rgba(0,0,0,0.5)',
        minWidth: '200px'
      }}>
        <p style={{ margin: '0 0 12px 0', fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{label}</p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {payload.map((entry: any) => (
            <div key={entry.name} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: entry.color }} />
                <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                  {entry.name === 'receita' ? 'Receita' : 'Despesa'}
                </span>
              </div>
              <span style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--text-main)' }}>
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
            <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.4}/>
            <stop offset="95%" stopColor="#06b6d4" stopOpacity={0}/>
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.05)" />
        <XAxis dataKey="time" stroke="var(--text-muted)" fontSize={11} tickLine={false} axisLine={false} tickMargin={12} />
        <YAxis stroke="var(--text-muted)" fontSize={11} tickLine={false} axisLine={false} tickFormatter={(val) => `R$${val/1000}k`} tickMargin={12} />
        <Tooltip content={<CustomTooltip />} cursor={{ stroke: 'rgba(255,255,255,0.1)', strokeWidth: 1, strokeDasharray: '5 5' }} />
        <Area type="monotone" dataKey="receita" stroke="#06b6d4" strokeWidth={3} fillOpacity={1} fill="url(#colorReceita)" />
        <Line type="monotone" dataKey="despesa" stroke="#fb923c" strokeWidth={2} strokeDasharray="5 5" opacity={0.8} dot={false} isAnimationActive={true} />
      </ComposedChart>
    </ResponsiveContainer>
  );
};
