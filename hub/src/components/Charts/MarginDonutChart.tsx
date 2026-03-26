import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';

export const MarginDonutChart = ({ data }: { data: any }) => {
  if (!data) return null;

  const receita = Number(data.receita_bruta || 1);
  const cVar = Number(data.despesas_totais || 0) - Number(data.despesas_fixas || 0);
  const cFixo = Number(data.despesas_fixas || 0);
  const lucro = Number(data.lucro_liquido || 0);

  const chartData = [
    { name: 'Custos Variáveis', value: Math.max(0, cVar), color: '#f59e0b' },
    { name: 'Despesas Fixas', value: Math.max(0, cFixo), color: '#3b82f6' },
    { name: 'Lucro Líquido', value: Math.max(0, lucro), color: '#10b981' },
  ];

  return (
    <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column' }}>
      <ResponsiveContainer width="100%" height="80%">
        <PieChart>
          <Pie
            data={chartData}
            cx="50%"
            cy="50%"
            innerRadius="60%"
            outerRadius="80%"
            paddingAngle={5}
            dataKey="value"
            stroke="none"
          >
            {chartData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip 
            contentStyle={{ 
              backgroundColor: '#0d0d12', 
              border: '1px solid rgba(255,255,255,0.1)', 
              borderRadius: '12px',
              backdropFilter: 'blur(10px)'
            }}
            formatter={(val: any) => [`R$ ${Number(val).toLocaleString('pt-BR')}`, 'Valor']}
          />
        </PieChart>
      </ResponsiveContainer>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '8px', padding: '0 10px' }}>
        {chartData.map((item) => (
          <div key={item.name} style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '0.6rem', color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '2px' }}>{item.name}</div>
            <div style={{ fontSize: '0.8rem', fontWeight: 700, color: item.color }}>
              {((item.value / receita) * 100).toFixed(1)}%
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
