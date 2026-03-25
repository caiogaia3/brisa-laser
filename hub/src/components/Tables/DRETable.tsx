import type { FinDRE } from '../../lib/types';

interface DRETableProps {
  uniqueLines: { id: number; label: string; is_subtotal: boolean; category: string }[];
  months: string[];
  matrixData: FinDRE[];
}

export const DRETable = ({ uniqueLines, months, matrixData }: DRETableProps) => {
  const getValue = (lineId: number, month: string) => {
    const item = matrixData.find(d => d.id === lineId && d.period_month === month);
    return item ? item.amount : 0;
  };

  const formatMonth = (dateString: string) => {
    const date = new Date(dateString + 'T00:00:00');
    return date.toLocaleDateString('pt-BR', { month: 'short', year: '2-digit' }).replace(' de ', '/');
  };

  return (
    <div style={{ overflowX: 'auto', maxHeight: '600px', border: '1px solid var(--color-glass-border)', borderRadius: '8px' }}>
      <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.85rem', minWidth: '800px' }}>
        <thead style={{ position: 'sticky', top: 0, zIndex: 10, backgroundColor: 'var(--color-surface)', boxShadow: '0 2px 4px rgba(0,0,0,0.5)' }}>
          <tr style={{ borderBottom: '1px solid var(--color-glass-border)' }}>
            <th style={{ padding: '8px 12px', textAlign: 'left', fontWeight: 'bold', color: 'var(--text-muted)', position: 'sticky', left: 0, backgroundColor: 'var(--color-surface)', zIndex: 11, borderRight: '1px solid var(--color-glass-border)' }}>Conta / Descrição Detalhada</th>
            {months.map(m => (
              <th key={m} style={{ padding: '8px 12px', textAlign: 'right', fontWeight: 'bold', color: 'var(--text-main)', borderRight: '1px solid var(--color-glass-border)' }}>
                {formatMonth(m)}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {uniqueLines.map((line) => (
            <tr 
              key={line.id} 
              style={{ 
                borderBottom: '1px solid var(--color-glass-border)',
                fontWeight: line.is_subtotal ? 700 : 400,
                backgroundColor: line.is_subtotal ? 'rgba(59, 130, 246, 0.1)' : 'transparent',
              }}
              className="hover:bg-white/5 transition-colors"
            >
              <td style={{ 
                padding: '8px 12px', 
                position: 'sticky', 
                left: 0, 
                backgroundColor: line.is_subtotal ? '#0f172a' : 'var(--color-bg)', 
                zIndex: 5, 
                borderRight: '1px solid var(--color-glass-border)',
                color: line.is_subtotal ? 'var(--color-primary)' : 'var(--text-main)',
                whiteSpace: 'nowrap'
              }}>
                {line.label}
              </td>
              
              {months.map(m => {
                const val = getValue(line.id, m);
                const isNegative = val < 0 && !line.is_subtotal;
                return (
                  <td key={`${line.id}-${m}`} style={{ 
                    padding: '8px 12px', 
                    textAlign: 'right',
                    borderRight: '1px solid var(--color-glass-border)',
                    color: isNegative ? 'var(--color-danger)' : (line.is_subtotal && val < 0 ? 'var(--color-danger)' : 'inherit')
                  }}>
                    {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(val)}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
      {uniqueLines.length === 0 && (
        <div style={{ padding: '40px', textAlign: 'center', opacity: 0.5 }}>Nenhum dado DRE histórico encontrado.</div>
      )}
    </div>
  );
};
