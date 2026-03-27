import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

export const DoubleTrendChart = ({ data }: { data: any[] }) => {
  // Expecting data to be the DRE matrix array transformed into months:
  // [{ month: 'jan', receita: 10000, ebitda: 4000 }]

  if (!data || data.length === 0) return null;

  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
        <defs>
          <filter id="glowLinePrimary" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
          <filter id="glowLineAccent" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>
        <CartesianGrid strokeDasharray="4 4" vertical={false} stroke="rgba(255,255,255,0.06)" />
        <XAxis dataKey="month" stroke="var(--text-muted)" fontSize={11} tickLine={false} axisLine={false} tickMargin={12} />
        <YAxis yAxisId="left" stroke="var(--text-muted)" fontSize={11} tickLine={false} axisLine={false} tickFormatter={(val) => `R$${(val/1000).toFixed(0)}k`} tickMargin={12} />
        
        <Tooltip 
          contentStyle={{ backgroundColor: 'rgba(13, 13, 18, 0.85)', backdropFilter: 'blur(16px)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px', boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.5)' }}
          formatter={(value: any) => new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value)}
          labelStyle={{ color: 'var(--text-muted)', fontSize: '0.65rem', textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: 600, marginBottom: '6px' }}
          itemStyle={{ fontSize: '0.8rem', fontWeight: 700 }}
        />
        <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '10px' }} iconType="circle" />
        
        <Line yAxisId="left" type="monotone" dataKey="receita" name="Receita" stroke="#06b6d4" strokeWidth={3} dot={{ r: 4, fill: '#06b6d4', stroke: '#0d0d12', strokeWidth: 2 }} activeDot={{ r: 6, stroke: '#fff', strokeWidth: 2 }} style={{ filter: 'url(#glowLinePrimary)' }} />
        <Line yAxisId="left" type="monotone" dataKey="ebitda" name="EBITDA" stroke="#10b981" strokeWidth={3} dot={{ r: 4, fill: '#10b981', stroke: '#0d0d12', strokeWidth: 2 }} activeDot={{ r: 6, stroke: '#fff', strokeWidth: 2 }} style={{ filter: 'url(#glowLineAccent)' }} />
      </LineChart>
    </ResponsiveContainer>
  );
};
