import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell
} from 'recharts';
import type { ViewMasterBI } from '../../lib/types';

interface LeadsFunnelProps {
  data: ViewMasterBI | null;
}

export const LeadsFunnel = ({ data }: LeadsFunnelProps) => {
  // Usamos um gráfico de barra horizontal como proxy para funil
  const funnelData = data ? [
    { step: 'Leads', count: data.leads_gerados || 0, color: 'var(--color-primary)' },
    { step: 'Agendou', count: data.agendamentos || 0, color: 'var(--color-accent)' },
    { step: 'Compareceu', count: data.comparecimentos || 0, color: 'var(--color-success)' },
  ] : [
    { step: 'Leads', count: 894, color: 'var(--color-primary)' },
    { step: 'Agendou', count: 256, color: 'var(--color-accent)' },
    { step: 'Compareceu', count: 160, color: 'var(--color-success)' },
  ];

  return (
    <div style={{ width: '100%', height: '100%', minHeight: '300px' }}>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart 
          data={funnelData} 
          layout="vertical"
          margin={{ top: 20, right: 30, left: 40, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="var(--color-glass-border)" horizontal={false} />
          <XAxis type="number" stroke="var(--text-muted)" fontSize={12} axisLine={false} tickLine={false} />
          <YAxis dataKey="step" type="category" stroke="var(--text-muted)" fontSize={12} axisLine={false} tickLine={false} />
          <Tooltip 
            cursor={{ fill: 'var(--color-glass)' }}
            contentStyle={{ backgroundColor: 'var(--color-surface)', border: '1px solid var(--color-glass-border)', borderRadius: 'var(--radius)' }} 
          />
          <Bar dataKey="count" radius={[0, 4, 4, 0]} maxBarSize={40}>
            {funnelData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};
