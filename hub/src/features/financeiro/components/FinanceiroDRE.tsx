import { useState } from 'react';
import { useDREMatrix } from '../hooks/useDREMatrix';
import { DRETable } from '../../../components/Tables/DRETable';
import { Download, ChevronDown, FileText, Table } from 'lucide-react';

export const FinanceiroDRE = () => {
  const { loading, matrixData, months } = useDREMatrix();
  const [showExport, setShowExport] = useState(false);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px' }}>
        <div style={{ position: 'relative' }}>
          <button 
            onClick={() => setShowExport(!showExport)}
            style={{ 
              backgroundColor: 'rgba(6, 182, 212, 0.1)', 
              border: '1px solid var(--color-primary)',
              color: 'var(--color-primary)',
              padding: '8px 16px',
              borderRadius: '10px',
              fontSize: '0.75rem',
              fontWeight: 700,
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              cursor: 'pointer',
              transition: 'all 0.2s'
            }}
          >
            <Download size={14} />
            Exportar DRE
            <ChevronDown size={14} style={{ transform: showExport ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }} />
          </button>

          {showExport && (
            <div className="liquid-glass" style={{ 
              position: 'absolute', 
              top: '100%', 
              right: 0, 
              marginTop: '8px', 
              width: '180px', 
              zIndex: 1000, 
              padding: '8px',
              animation: 'fadeIn 0.2s ease-out'
            }}>
              <button style={{ 
                width: '100%', padding: '10px', textAlign: 'left', background: 'transparent', border: 'none', color: 'white', fontSize: '0.75rem', display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer', borderRadius: '6px' 
              }} onMouseOver={(e) => e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.05)'} onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'transparent'}>
                <FileText size={16} color="#ef4444" /> Exportar PDF
              </button>
              <button style={{ 
                width: '100%', padding: '10px', textAlign: 'left', background: 'transparent', border: 'none', color: 'white', fontSize: '0.75rem', display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer', borderRadius: '6px' 
              }} onMouseOver={(e) => e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.05)'} onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'transparent'}>
                <Table size={16} color="#22c55e" /> Exportar CSV
              </button>
            </div>
          )}
        </div>
      </div>

      <section className="liquid-glass" style={{ padding: '0px', overflow: 'hidden' }}>
        {loading ? (
          <div style={{ padding: '60px', textAlign: 'center', color: 'var(--text-muted)' }}>Mapeando linha do tempo contábil...</div>
        ) : (
          <DRETable months={months} matrixData={matrixData} />
        )}
      </section>
    </div>
  );
};
