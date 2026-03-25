import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';

export const WaterfallChart = ({ data }: { data: any }) => {
  // We need to shape data like this:
  // [ { name: 'Receita', start: 0, end: 10000, val: 10000 },
  //   { name: 'C. Var', start: 8000, end: 10000, val: -2000 },
  //   { name: 'C. Fixo', start: 5000, end: 8000, val: -3000 },
  //   { name: 'Lucro Líquido', start: 0, end: 5000, val: 5000 } ]

  if (!data) return null;

  const receita = Number(data.receita_bruta || 0);
  const cVar = Number(data.despesas_totais || 0) - Number(data.despesas_fixas || 0); // Approx custo var if not explicit
  const cFixo = Number(data.despesas_fixas || 0);
  const lucro = Number(data.lucro_liquido || 0);

  const chartData = [
    { name: 'Receita', base: 0, amount: receita, total: receita, isTotal: true },
    { name: 'C. Variáveis', base: receita - cVar, amount: cVar, total: -cVar, isTotal: false },
    { name: 'C. Fixos', base: receita - cVar - cFixo, amount: cFixo, total: -cFixo, isTotal: false },
    { name: 'Lucro', base: 0, amount: lucro > 0 ? lucro : 0, total: lucro, isTotal: true, isFinal: true }
  ];

  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.1)" />
        <XAxis dataKey="name" stroke="var(--text-muted)" fontSize={12} tickLine={false} axisLine={false} />
        <YAxis stroke="var(--text-muted)" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(val) => `R$${(val/1000).toFixed(0)}k`} />
        
        <Tooltip 
          cursor={{ fill: 'rgba(255,255,255,0.05)' }}
          contentStyle={{ backgroundColor: 'var(--color-surface)', border: '1px solid var(--color-glass-border)', borderRadius: '8px' }}
          formatter={(_value: any, name: any, props: any) => {
            if (name === 'base') return [];
            return [new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(props.payload.total), 'Valor'];
          }}
        />
        
        <Bar dataKey="base" stackId="a" fill="transparent" />
        <Bar dataKey="amount" stackId="a" radius={[4,4,4,4]}>
          {chartData.map((entry, index) => {
            let color = 'var(--text-muted)';
            if (entry.isTotal && !entry.isFinal) color = 'var(--color-primary)';
            else if (entry.isFinal) color = entry.total >= 0 ? 'var(--color-success)' : 'var(--color-danger)';
            else color = 'var(--color-danger)';
            return <Cell key={`cell-${index}`} fill={color} />;
          })}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
};
