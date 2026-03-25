import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';

export const BreakEvenGauge = ({ data }: { data: any }) => {
  if (!data) return null;

  const receita = Number(data.receita_bruta || 0);
  const breakeven = Number(data.breakeven || 0);

  // If breakeven is 0 or invalid, or if we surpassed it heavily, handle boundaries.
  const target = breakeven > 0 ? breakeven : 10000; // safe fallback
  
  // Percentage of breakeven achieved
  const percentage = Math.min((receita / target) * 100, 100);
  const remaining = 100 - percentage;

  const gaugeData = [
    { name: 'Receita Atual', value: percentage, color: percentage >= 100 ? 'var(--color-success)' : 'var(--color-warning)' },
    { name: 'Falta p/ Empate', value: remaining, color: 'rgba(255,255,255,0.05)' }
  ];

  return (
    <div style={{ width: '100%', height: '100%', position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
      <ResponsiveContainer width="100%" height="80%">
        <PieChart>
          <Pie
            data={gaugeData}
            cx="50%"
            cy="100%"
            startAngle={180}
            endAngle={0}
            innerRadius="70%"
            outerRadius="90%"
            paddingAngle={2}
            dataKey="value"
            stroke="none"
          >
            {gaugeData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip 
            formatter={(val: any) => [`${Number(val).toFixed(1)}% do Break-even`, 'Progresso']}
            contentStyle={{ backgroundColor: 'var(--color-surface)', border: 'none', borderRadius: '8px' }}
          />
        </PieChart>
      </ResponsiveContainer>
      <div style={{ position: 'absolute', bottom: '5%', textAlign: 'center' }}>
        <p style={{ fontSize: '1.5rem', fontWeight: 'bold', margin: 0, color: percentage >= 100 ? 'var(--color-success)' : 'var(--text-main)' }}>
          {percentage.toFixed(1)}%
        </p>
        <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', margin: 0 }}>
          Meta: R$ {(target / 1000).toFixed(1)}k
        </p>
      </div>
    </div>
  );
};
