import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from 'recharts';
import type { ViewMasterBI } from '../../lib/types';

interface RevenueChartProps {
  data: ViewMasterBI[];
}

export const RevenueChart = ({ data }: RevenueChartProps) => {
  // Mock data for design if no database records
  const chartData: any[] = data.length > 0 ? data : [
    { period_month: 'Out 2025', receita_total: 110000, investimento_mkt_real: 12000 },
    { period_month: 'Nov 2025', receita_total: 125000, investimento_mkt_real: 14000 },
    { period_month: 'Dez 2025', receita_total: 160000, investimento_mkt_real: 18000 },
    { period_month: 'Jan 2026', receita_total: 135000, investimento_mkt_real: 15000 },
    { period_month: 'Fev 2026', receita_total: 142500, investimento_mkt_real: 16000 },
  ];

  return (
    <div style={{ width: '100%', height: '100%', minHeight: '300px' }}>
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={chartData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
          <defs>
            <linearGradient id="colorReceita" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="var(--color-success)" stopOpacity={0.3}/>
              <stop offset="95%" stopColor="var(--color-success)" stopOpacity={0}/>
            </linearGradient>
            <linearGradient id="colorCusto" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="var(--color-danger)" stopOpacity={0.3}/>
              <stop offset="95%" stopColor="var(--color-danger)" stopOpacity={0}/>
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="var(--color-glass-border)" vertical={false} />
          <XAxis dataKey="period_month" stroke="var(--text-muted)" fontSize={12} tickMargin={10} axisLine={false} tickLine={false} />
          <YAxis 
            stroke="var(--text-muted)" 
            fontSize={12} 
            tickFormatter={(value) => `R$${(value/1000).toFixed(0)}k`}
            axisLine={false} tickLine={false} 
          />
          <Tooltip 
            contentStyle={{ backgroundColor: 'var(--color-surface)', border: '1px solid var(--color-glass-border)', borderRadius: 'var(--radius)' }}
            itemStyle={{ color: 'var(--text-main)' }}
            formatter={(value: any) => [`R$ ${Number(value).toLocaleString('pt-BR')}`, '']}
          />
          <Area type="monotone" name="Receita" dataKey="receita_total" stroke="var(--color-success)" fillOpacity={1} fill="url(#colorReceita)" strokeWidth={2} />
          <Area type="monotone" name="Investimento MKT" dataKey="investimento_mkt_real" stroke="var(--color-danger)" fillOpacity={1} fill="url(#colorCusto)" strokeWidth={2} />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};
