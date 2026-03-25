import type { DREMatrixRow } from '../../hooks/useDREMatrix';

interface DRETableProps {
  matrixData: DREMatrixRow[];
  months: string[];
}

export const DRETable = ({ matrixData, months }: DRETableProps) => {
  const formatMonth = (dateString: string) => {
    // Format: YYYY-MM
    const [year, month] = dateString.split('-');
    const date = new Date(parseInt(year), parseInt(month) - 1, 1);
    return date.toLocaleDateString('pt-BR', { month: 'short', year: '2-digit' }).replace('.', '');
  };

  const isSubtotal = (nivel: number) => {
    return [3, 5, 8, 11, 13].includes(nivel);
  };



  return (
    <div style={{ 
      width: '100%',
      overflowX: 'auto', 
      maxHeight: '70vh', 
      border: '1px solid var(--color-glass-border)', 
      borderRadius: '8px',
      backgroundColor: 'var(--color-bg)',
      position: 'relative'
    }}>
      <table style={{ 
        width: 'max-content',
        minWidth: '100%',
        borderCollapse: 'separate', 
        borderSpacing: 0,
        fontSize: '0.75rem', /* Decreased font size as requested */
      }}>
        <thead style={{ position: 'sticky', top: 0, zIndex: 20 }}>
          <tr>
            <th style={{ 
              padding: '10px 16px', 
              textAlign: 'left', 
              fontWeight: 700, 
              color: 'var(--text-muted)', 
              position: 'sticky', 
              left: 0, 
              backgroundColor: 'var(--color-surface)', 
              zIndex: 30, 
              borderRight: '1px solid var(--color-glass-border)',
              borderBottom: '1px solid var(--color-glass-border)',
              minWidth: '280px'
            }}>
              Conta / Descrição Detalhada
            </th>
            {months.map(m => (
              <th key={m} style={{ 
                padding: '10px 16px', 
                textAlign: 'right', 
                fontWeight: 700, 
                color: 'var(--text-main)', 
                backgroundColor: 'var(--color-surface)',
                borderBottom: '1px solid var(--color-glass-border)',
                borderRight: '1px solid rgba(255,255,255,0.05)',
                minWidth: '100px'
              }}>
                {formatMonth(m)}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {matrixData.map((row, idx) => {
            const subtotal = isSubtotal(row.nivel);
            const header = row.conta_descricao.toUpperCase().includes('TOTAL') || row.conta_descricao.includes('=');
            
            return (
              <tr 
                key={row.id || idx} 
                style={{ 
                  backgroundColor: subtotal || header ? 'rgba(255, 255, 255, 0.03)' : 'transparent',
                  transition: 'background 0.2s'
                }}
                className="hover:bg-white/5"
              >
                <td style={{ 
                  padding: '8px 16px', 
                  position: 'sticky', 
                  left: 0, 
                  backgroundColor: subtotal || header ? '#12121a' : 'var(--color-bg)', 
                  zIndex: 10, 
                  borderRight: '2px solid var(--color-glass-border)',
                  borderBottom: '1px solid rgba(255,255,255,0.05)',
                  color: subtotal || header ? 'var(--color-primary)' : 'var(--text-main)',
                  fontWeight: subtotal || header ? 700 : 400,
                  whiteSpace: 'nowrap'
                }}>
                  {row.conta_descricao}
                </td>
                
                {months.map(m => {
                  const val = row.valores[m] || 0;
                  const isNegative = val < 0;
                  return (
                    <td key={`${row.id}-${m}`} style={{ 
                      padding: '8px 16px', 
                      textAlign: 'right',
                      borderBottom: '1px solid rgba(255,255,255,0.05)',
                      borderRight: '1px solid rgba(255,255,255,0.03)',
                      color: isNegative ? 'var(--color-danger)' : 'var(--text-muted)',
                      fontWeight: subtotal || header ? 600 : 400
                    }}>
                      {new Intl.NumberFormat('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(val)}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
      {matrixData.length === 0 && (
        <div style={{ padding: '40px', textAlign: 'center', opacity: 0.5 }}>Carregando dados da matriz DRE...</div>
      )}
    </div>
  );
};

