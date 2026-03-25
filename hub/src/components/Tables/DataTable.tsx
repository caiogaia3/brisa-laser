import React from 'react';

interface Column {
  key: string;
  label: string;
  align?: 'left' | 'center' | 'right';
  format?: (value: any) => React.ReactNode;
}

interface TableProps {
  columns: Column[];
  data: any[];
  keyField: string;
}

export const DataTable = ({ columns, data, keyField }: TableProps) => {
  return (
    <div className="glass-panel" style={{ overflowX: 'auto' }}>
      <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
        <thead>
          <tr style={{ borderBottom: '1px solid var(--color-glass-border)', backgroundColor: 'rgba(255,255,255,0.02)' }}>
            {columns.map((col) => (
              <th key={col.key} style={{ 
                padding: '16px', fontSize: '0.875rem', fontWeight: 600, 
                color: 'var(--text-muted)', textAlign: col.align || 'left' 
              }}>
                {col.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.length === 0 ? (
            <tr>
              <td colSpan={columns.length} style={{ padding: '32px', textAlign: 'center', color: 'var(--text-muted)' }}>
                Nenhum dado encontrado
              </td>
            </tr>
          ) : (
            data.map((row) => (
              <tr key={row[keyField]} style={{ borderBottom: '1px solid var(--color-glass-border)' }} className="row-hover">
                {columns.map((col) => (
                  <td key={col.key} style={{ 
                    padding: '16px', fontSize: '0.875rem', color: 'var(--text-main)', 
                    textAlign: col.align || 'left' 
                  }}>
                    {col.format ? col.format(row[col.key]) : row[col.key]}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
      
      {/* Classe local provisória */}
      <style>{`
        .row-hover:hover { background-color: rgba(255,255,255,0.02); }
      `}</style>
    </div>
  );
};
