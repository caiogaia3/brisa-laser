import { useDREMatrix } from '../../hooks/useDREMatrix';
import { DRETable } from '../../components/Tables/DRETable';

export const FinanceiroDRE = () => {
  const { loading, matrixData, months } = useDREMatrix();

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
      <section className="glass-panel" style={{ padding: '24px' }}>
        {loading ? (
          <div style={{ padding: '40px', textAlign: 'center', color: 'var(--text-muted)' }}>Mapeando linha do tempo contábil...</div>
        ) : (
          <DRETable months={months} matrixData={matrixData} />
        )}
      </section>
    </div>
  );
};
