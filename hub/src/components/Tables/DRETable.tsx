import type { FinDRE } from '../../lib/types';

interface DRETableProps {
  data: FinDRE[];
}

export const DRETable = ({ data }: DRETableProps) => {
  return (
    <div style={{ overflowX: 'auto' }}>
      <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.925rem' }}>
        <thead>
          <tr style={{ textAlign: 'left', borderBottom: '1px solid var(--border-color)' }}>
            <th style={{ padding: '12px 16px', color: 'var(--text-secondary)', fontWeight: 500 }}>Descrição</th>
            <th style={{ padding: '12px 16px', color: 'var(--text-secondary)', fontWeight: 500 }}>Categoria</th>
            <th style={{ padding: '12px 16px', color: 'var(--text-secondary)', fontWeight: 500, textAlign: 'right' }}>Valor</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr 
              key={item.id} 
              style={{ 
                borderBottom: '1px solid rgba(255,255,255,0.05)',
                fontWeight: item.is_subtotal ? 700 : 400,
                background: item.is_subtotal ? 'rgba(255,255,255,0.02)' : 'transparent',
                color: item.amount < 0 && !item.is_subtotal ? '#ff4d4d' : 'inherit'
              }}
            >
              <td style={{ padding: '12px 16px' }}>{item.line_label}</td>
              <td style={{ padding: '12px 16px', fontSize: '0.75rem', opacity: 0.6, textTransform: 'uppercase' }}>
                {item.category.replace('_', ' ')}
              </td>
              <td style={{ padding: '12px 16px', textAlign: 'right' }}>
                {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(item.amount)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {data.length === 0 && (
        <div style={{ padding: '40px', textAlign: 'center', opacity: 0.5 }}>Nenhum dado encontrado para este período.</div>
      )}
    </div>
  );
};

