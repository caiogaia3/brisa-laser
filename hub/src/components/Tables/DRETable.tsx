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
      maxWidth: '100%', 
      overflowX: 'auto', 
      maxHeight: 'calc(100vh - 300px)', 
      border: '1px solid var(--color-glass-border)', 
      borderRadius: '12px',
      backgroundColor: 'rgba(5, 5, 8, 0.4)',
      position: 'relative',
      boxShadow: '0 20px 50px rgba(0, 0, 0, 0.5)'
    }}>
      <table style={{ 
        width: 'max-content',
        minWidth: '100%',
        borderCollapse: 'separate',
        borderSpacing: 0,
        fontSize: '0.65rem', /* Super Compact */
        fontVariantNumeric: 'tabular-nums'
      }}>
        <thead style={{ position: 'sticky', top: 0, zIndex: 100 }}>
          <tr>
            <th style={{ 
              padding: '8px 12px', 
              textAlign: 'left', 
              fontWeight: 800, 
              color: '#06b6d4', 
              position: 'sticky', 
              left: 0, 
              backgroundColor: '#0a0a14', 
              zIndex: 110, 
              borderRight: '2px solid rgba(255, 255, 255, 0.1)',
              borderBottom: '2px solid rgba(255, 255, 255, 0.1)',
              minWidth: '240px',
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
              boxShadow: '4px 0 10px rgba(0,0,0,0.3)'
            }}>
              CONTA / DESCRIÇÃO
            </th>
            {months.map(m => (
              <th key={m} style={{ 
                padding: '8px 12px', 
                textAlign: 'right', 
                fontWeight: 800, 
                color: 'white', 
                backgroundColor: '#0a0a14',
                borderBottom: '2px solid rgba(255, 255, 255, 0.1)',
                borderRight: '1px solid rgba(255,255,255,0.05)',
                minWidth: '90px'
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
                  backgroundColor: subtotal || header ? 'rgba(6, 182, 212, 0.03)' : 'transparent',
                  transition: 'background 0.2s'
                }}
              >
                <td style={{ 
                  padding: '6px 12px', 
                  position: 'sticky', 
                  left: 0, 
                  backgroundColor: subtotal || header ? '#12121a' : '#050508', 
                  zIndex: 20, 
                  borderRight: '2px solid rgba(255, 255, 255, 0.1)',
                  borderBottom: '1px solid rgba(255, 255, 255, 0.05)',
                  color: subtotal || header ? '#06b6d4' : 'rgba(255, 255, 255, 0.9)',
                  fontWeight: subtotal || header ? 700 : 500,
                  whiteSpace: 'nowrap',
                  boxShadow: '4px 0 10px rgba(0,0,0,0.3)'
                }}>
                  {row.conta_descricao}
                </td>
                
                {months.map(m => {
                  const val = row.valores[m] || 0;
                  const isNegative = val < 0;
                  return (
                    <td key={`${row.id}-${m}`} style={{ 
                      padding: '6px 12px', 
                      textAlign: 'right',
                      borderBottom: '1px solid rgba(255, 255, 255, 0.05)',
                      borderRight: '1px solid rgba(255, 255, 255, 0.03)',
                      color: isNegative ? '#f87171' : 'rgba(255, 255, 255, 0.7)',
                      fontWeight: subtotal || header ? 700 : 400
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
