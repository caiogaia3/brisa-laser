import { usePeriodStore, type StoreLocation } from '../../store/usePeriodStore';
import { Store } from 'lucide-react';

export const StoreSelector = () => {
  const { storeId, setStoreId } = usePeriodStore();

  return (
    <div className="glass-panel" style={{ display: 'flex', alignItems: 'center', padding: '4px', borderRadius: 'var(--radius)', gap: '4px' }}>
      <div style={{ padding: '0 8px', display: 'flex', alignItems: 'center', color: 'var(--text-muted)' }}>
        <Store size={18} />
      </div>
      {(['all', 'brisa-laser', 'brisa-premium'] as StoreLocation[]).map((id) => (
        <button
          key={id}
          onClick={() => setStoreId(id)}
          style={{
            padding: '6px 12px',
            borderRadius: '6px',
            border: 'none',
            fontSize: '0.875rem',
            fontWeight: storeId === id ? 600 : 400,
            cursor: 'pointer',
            backgroundColor: storeId === id ? 'var(--color-primary-light)' : 'transparent',
            color: storeId === id ? 'var(--color-primary)' : 'var(--text-muted)',
            transition: 'all 0.2s',
            outline: 'none'
          }}
        >
          {id === 'all' ? 'Rede Brisa (Consolidado)' : id === 'brisa-laser' ? 'Brisa Laser' : 'Brisa Premium'}
        </button>
      ))}
    </div>
  );
};
