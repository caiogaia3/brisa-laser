import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

export const MarginStackedBar = ({ data }: { data: any }) => {
  if (!data) return null;

  const receita = Number(data.receita_bruta || 1); // fallback to 1 to avoid div0
  const cVar = Number(data.despesas_totais || 0) - Number(data.despesas_fixas || 0);
  const impostos = 0; // Se houver imposto real, mapear
  const cFixo = Number(data.despesas_fixas || 0);
  const lucro = Number(data.lucro_liquido || 0);

  // Normalize to 100%
  const pVar = (cVar / receita) * 100;
  const pFixo = (cFixo / receita) * 100;
  const pImp = (impostos / receita) * 100;
  const pLucro = (lucro / receita) * 100;

  const stackData = [
    {
      name: 'Composição de Custos (%)',
      'Custos Variáveis': pVar > 0 ? parseFloat(pVar.toFixed(1)) : 0,
      'Impostos': pImp > 0 ? parseFloat(pImp.toFixed(1)) : 0,
      'Despesas Fixas': pFixo > 0 ? parseFloat(pFixo.toFixed(1)) : 0,
      'Lucro Líquido': pLucro > 0 ? parseFloat(pLucro.toFixed(1)) : 0,
    }
  ];

  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart
        layout="vertical"
        data={stackData}
        margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="rgba(255,255,255,0.1)" />
        <XAxis type="number" domain={[0, 100]} stroke="var(--text-muted)" fontSize={12} tickFormatter={val => `${val}%`} />
        <YAxis dataKey="name" type="category" stroke="var(--text-muted)" fontSize={12} width={150} />
        <Tooltip 
          cursor={{ fill: 'rgba(255,255,255,0.05)' }} 
          contentStyle={{ backgroundColor: 'var(--color-surface)', border: '1px solid var(--color-glass-border)', borderRadius: '8px' }}
          formatter={(val) => `${val}% da Receita`}
        />
        <Legend wrapperStyle={{ fontSize: '12px', paddingTop: '10px' }} />
        <Bar dataKey="Custos Variáveis" stackId="a" fill="#f59e0b" />
        <Bar dataKey="Impostos" stackId="a" fill="#ef4444" />
        <Bar dataKey="Despesas Fixas" stackId="a" fill="#3b82f6" />
        <Bar dataKey="Lucro Líquido" stackId="a" fill="#10b981" />
      </BarChart>
    </ResponsiveContainer>
  );
};
