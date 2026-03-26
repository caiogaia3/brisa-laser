import { usePeriodStore, type StoreLocation } from '../../store/usePeriodStore';
import { Store } from 'lucide-react';

export const StoreSelector = () => {
  const { storeId, setStoreId } = usePeriodStore();

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
      <div style={{ color: 'var(--text-muted)' }}>
        <Store size={16} />
      </div>
      {(['all', 'brisa-laser', 'brisa-premium'] as StoreLocation[]).map((id) => {
        let activeColor = 'var(--text-main)';
        if (id === 'brisa-laser') activeColor = '#3b82f6'; // Azul
        if (id === 'brisa-premium') activeColor = '#10b981'; // Verde
        if (id === 'all') activeColor = '#8b5cf6'; // Roxo

        return (
          <button
            key={id}
            onClick={() => setStoreId(id)}
            style={{
              padding: '4px 8px',
              background: 'none',
              border: 'none',
              fontSize: '0.85rem',
              fontWeight: storeId === id ? 600 : 400,
              cursor: 'pointer',
              color: storeId === id ? activeColor : 'var(--text-muted)',
              opacity: storeId === id ? 1 : 0.6,
              transition: 'all 0.2s ease',
              borderBottom: storeId === id ? `2px solid ${activeColor}` : '2px solid transparent',
              outline: 'none'
            }}
          >
            {id === 'all' ? 'Rede Brisa' : id === 'brisa-laser' ? 'Brisa Laser' : 'Brisa Premium'}
          </button>
        );
      })}
    </div>
  );
};
