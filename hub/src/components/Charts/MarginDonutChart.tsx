import { useState } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Sector } from 'recharts';

const renderActiveShape = (props: any) => {
  const { cx, cy, innerRadius, outerRadius, startAngle, endAngle, fill } = props;

  return (
    <g>
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius + 4}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
        style={{ filter: `drop-shadow(0 0 8px ${fill}80)` }}
      />
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius - 2}
        outerRadius={outerRadius + 2}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
        fillOpacity={0.3}
      />
    </g>
  );
};

export const MarginDonutChart = ({ data }: { data: any }) => {
  const [activeIndex, setActiveIndex] = useState<number | undefined>(undefined);

  if (!data) return null;

  const receita = Number(data.receita_bruta || 1);
  const cVar = Number(data.despesas_totais || 0) - Number(data.despesas_fixas || 0);
  const cFixo = Number(data.despesas_fixas || 0);
  const lucro = Number(data.lucro_liquido || 0);

  const chartData = [
    { name: 'Custos Variáveis', value: Math.max(0, cVar), color: '#f59e0b', id: 'cvar' },
    { name: 'Despesas Fixas', value: Math.max(0, cFixo), color: '#3b82f6', id: 'cfixo' },
    { name: 'Lucro Líquido', value: Math.max(0, lucro), color: '#10b981', id: 'lucro' },
  ];

  const onPieEnter = (_: any, index: number) => {
    setActiveIndex(index);
  };

  const onPieLeave = () => {
    setActiveIndex(undefined);
  };

  // Type cast for Pie to avoid activeIndex error
  const PieAny = Pie as any;

  return (
    <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center' }}>
      <div style={{ width: '55%', height: '100%', position: 'relative' }}>
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <PieAny
              activeIndex={activeIndex}
              activeShape={renderActiveShape}
              data={chartData}
              cx="50%"
              cy="50%"
              innerRadius="65%"
              outerRadius="85%"
              paddingAngle={4}
              dataKey="value"
              stroke="none"
              onMouseEnter={onPieEnter}
              onMouseLeave={onPieLeave}
            >
              {chartData.map((entry: any, index: number) => (
                <Cell 
                  key={`cell-${index}`} 
                  fill={entry.color} 
                  style={{ 
                    transition: 'all 0.3s ease',
                    cursor: 'pointer'
                  }} 
                />
              ))}
            </PieAny>
            <Tooltip 
              contentStyle={{ 
                backgroundColor: 'rgba(13, 13, 18, 0.85)', 
                border: '1px solid rgba(255,255,255,0.1)', 
                borderRadius: '12px',
                backdropFilter: 'blur(16px)',
                padding: '10px 14px',
                boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.5)'
              }}
              itemStyle={{ fontSize: '0.8rem', fontWeight: 700 }}
              formatter={(val: any) => [`R$ ${Number(val).toLocaleString('pt-BR')}`, 'Valor']}
            />
          </PieChart>
        </ResponsiveContainer>
        {/* Center Text */}
        <div style={{ 
          position: 'absolute', 
          top: '50%', 
          left: '50%', 
          transform: 'translate(-50%, -50%)', 
          textAlign: 'center',
          pointerEvents: 'none'
        }}>
          <div style={{ fontSize: '0.65rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Margem</div>
          <div style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--text-main)' }}>
            {((lucro / receita) * 100).toFixed(1)}%
          </div>
        </div>
      </div>

      <div style={{ 
        width: '45%', 
        display: 'flex', 
        flexDirection: 'column', 
        gap: '12px', 
        paddingLeft: '20px',
        borderLeft: '1px solid rgba(255,255,255,0.05)'
      }}>
        {chartData.map((item, index) => (
          <div 
            key={item.id} 
            onMouseEnter={() => setActiveIndex(index)}
            onMouseLeave={() => setActiveIndex(undefined)}
            style={{ 
              display: 'flex', 
              flexDirection: 'column', 
              gap: '2px', 
              cursor: 'pointer',
              opacity: activeIndex === undefined || activeIndex === index ? 1 : 0.5,
              transition: 'all 0.2s ease'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: item.color, boxShadow: `0 0 8px ${item.color}80` }} />
              <span style={{ fontSize: '0.65rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 600 }}>
                {item.name}
              </span>
            </div>
            <div style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--text-main)', paddingLeft: '14px' }}>
              {((item.value / receita) * 100).toFixed(1)}%
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
