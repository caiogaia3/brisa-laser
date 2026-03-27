import { 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  ReferenceLine,
  ComposedChart
} from 'recharts';
import { ChartInfo } from './ChartInfo';

interface GrowthData {
  name: string;
  actual?: number;
  projected?: number;
}

const mockData: GrowthData[] = [
  { name: 'S1', actual: 25000 },
  { name: 'S2', actual: 32000 },
  { name: 'S3', actual: 41000 },
  { name: 'S4', actual: 48000 },
  { name: 'S5', projected: 55000 },
  { name: 'S6', projected: 62000 },
  { name: 'S7', projected: 75000 },
  { name: 'S8', projected: 88000 },
];

export const KingChart_Growth: React.FC = () => {
  return (
    <div className="liquid-glass" style={{ padding: '20px', display: 'flex', flexDirection: 'column', height: '100%', minHeight: '260px' }}>
      <div style={{ marginBottom: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div style={{ fontSize: '0.6rem', fontWeight: 700, color: 'var(--color-primary)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>KING CHART E</div>
            <ChartInfo 
              title="Previsão de Faturamento" 
              description="Algoritmo preditivo que projeta o faturamento mensal acumulado (Run-rate) cruzando a velocidade atual de vendas com o histórico sazonal da Brisa." 
            />
          </div>
          <div style={{ fontSize: '0.875rem', fontWeight: 900, color: 'white', letterSpacing: '-0.02em' }}>Previsão de Faturamento</div>
        </div>
        <div style={{ padding: '4px 8px', borderRadius: '4px', backgroundColor: 'rgba(6, 182, 212, 0.1)', border: '1px solid rgba(6, 182, 212, 0.2)' }}>
          <span style={{ fontSize: '0.6rem', color: 'var(--color-primary)', fontWeight: 700 }}>AI FORECAST</span>
        </div>
      </div>

      <div style={{ flex: 1 }}>
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart data={mockData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.03)" vertical={false} />
            <XAxis 
              dataKey="name" 
              axisLine={false} 
              tickLine={false} 
              tick={{ fontSize: 10, fill: 'rgba(255,255,255,0.3)' }}
            />
            <YAxis hide domain={['auto', 'auto']} />
            <Tooltip 
              contentStyle={{ 
                background: 'rgba(5, 5, 8, 0.9)', 
                border: '1px solid rgba(255, 255, 255, 0.1)',
                borderRadius: '12px',
                fontSize: '11px'
              }}
              formatter={(value: any) => [`R$ ${Number(value).toLocaleString()}`, 'Valor']}
            />
            
            {/* Real Data */}
            <Line 
              type="monotone" 
              dataKey="actual" 
              stroke="var(--color-primary)" 
              strokeWidth={3}
              dot={{ fill: 'var(--color-primary)', r: 4, strokeWidth: 0 }}
              activeDot={{ r: 6, strokeWidth: 0, fill: 'var(--color-primary)' }}
              style={{ filter: 'drop-shadow(0 0 8px rgba(6, 182, 212, 0.5))' }}
            />
            
            {/* Projected Data */}
            <Line 
              type="monotone" 
              dataKey="projected" 
              stroke="var(--color-primary)" 
              strokeWidth={2}
              strokeDasharray="5 5"
              dot={false}
              opacity={0.5}
            />

            <ReferenceLine y={80000} stroke="var(--color-warning)" strokeDasharray="3 3" label={{ position: 'right', value: 'Meta OKR', fill: 'var(--color-warning)', fontSize: 10 }} />
          </ComposedChart>
        </ResponsiveContainer>
      </div>

      <div style={{ marginTop: '12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <span style={{ fontSize: '0.6rem', color: 'var(--text-muted)' }}>Tendência</span>
          <span style={{ fontSize: '0.9rem', fontWeight: 800, color: 'var(--color-accent)' }}>+24.5%</span>
        </div>
        <div style={{ textAlign: 'right' }}>
          <span style={{ fontSize: '0.6rem', color: 'var(--text-muted)' }}>Projeção Fim de Mês</span>
          <div style={{ fontSize: '0.9rem', fontWeight: 800, color: 'white' }}>R$ 164.200</div>
        </div>
      </div>
    </div>
  );
};
