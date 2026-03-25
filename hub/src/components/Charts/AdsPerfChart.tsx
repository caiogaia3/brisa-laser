import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend
} from 'recharts';

export const AdsPerfChart = () => {
  const chartData = [
    { period: 'Semana 1', google: 2500, meta: 3200 },
    { period: 'Semana 2', google: 2800, meta: 3500 },
    { period: 'Semana 3', google: 3200, meta: 3100 },
    { period: 'Semana 4', google: 3800, meta: 3900 },
  ];

  return (
    <div style={{ width: '100%', height: '100%', minHeight: '300px' }}>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={chartData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="var(--color-glass-border)" vertical={false} />
          <XAxis dataKey="period" stroke="var(--text-muted)" fontSize={12} axisLine={false} tickLine={false} />
          <YAxis stroke="var(--text-muted)" fontSize={12} tickFormatter={(val) => `R$${val}`} axisLine={false} tickLine={false} />
          <Tooltip 
            contentStyle={{ backgroundColor: 'var(--color-surface)', border: '1px solid var(--color-glass-border)', borderRadius: 'var(--radius)' }}
            itemStyle={{ color: 'var(--text-main)' }}
          />
          <Legend wrapperStyle={{ paddingTop: '20px' }} />
          <Bar dataKey="google" name="Google Ads" fill="var(--color-primary)" radius={[4, 4, 0, 0]} />
          <Bar dataKey="meta" name="Meta Ads" fill="var(--color-accent)" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};
