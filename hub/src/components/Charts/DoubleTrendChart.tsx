import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

export const DoubleTrendChart = ({ data }: { data: any[] }) => {
  // Expecting data to be the DRE matrix array transformed into months:
  // [{ month: 'jan', receita: 10000, ebitda: 4000 }]

  if (!data || data.length === 0) return null;

  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.1)" />
        <XAxis dataKey="month" stroke="var(--text-muted)" fontSize={12} tickLine={false} axisLine={false} />
        <YAxis yAxisId="left" stroke="var(--text-muted)" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(val) => `R$${(val/1000).toFixed(0)}k`} />
        
        <Tooltip 
          contentStyle={{ backgroundColor: 'var(--color-surface)', border: '1px solid var(--color-glass-border)', borderRadius: '8px' }}
          formatter={(value: any) => new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value)}
        />
        <Legend wrapperStyle={{ fontSize: '12px', paddingTop: '10px' }} />
        
        <Line yAxisId="left" type="monotone" dataKey="receita" name="Receita" stroke="var(--color-primary)" strokeWidth={3} dot={{ r: 4 }} activeDot={{ r: 6 }} />
        <Line yAxisId="left" type="monotone" dataKey="ebitda" name="EBITDA" stroke="var(--color-accent)" strokeWidth={3} dot={{ r: 4 }} activeDot={{ r: 6 }} />
      </LineChart>
    </ResponsiveContainer>
  );
};
