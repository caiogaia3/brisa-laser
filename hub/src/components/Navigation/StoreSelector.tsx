import { usePeriodStore, type StoreLocation } from '../../store/usePeriodStore';
import { Store } from 'lucide-react';

export const StoreSelector = () => {
  const { storeId, setStoreId } = usePeriodStore();

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
      <div style={{ color: 'var(--text-muted)' }}>
        <Store size={16} />
      </div>
      <div style={{ position: 'relative', display: 'inline-flex', alignItems: 'center' }}>
        <select 
          value={storeId} 
          onChange={(e) => setStoreId(e.target.value as StoreLocation)}
          style={{
            background: 'var(--color-surface)',
            color: 'var(--text-main)',
            border: '1px solid var(--color-glass-border)',
            borderRadius: 'var(--radius)',
            padding: '8px 32px 8px 12px',
            fontSize: '0.875rem',
            fontWeight: 500,
            appearance: 'none',
            cursor: 'pointer',
            outline: 'none',
            boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
            minWidth: '160px'
          }}
        >
          <option value="all">Rede Brisa</option>
          <option value="brisa-laser">Brisa Laser</option>
          <option value="brisa-premium">Brisa Premium</option>
        </select>
        <div style={{ position: 'absolute', right: '12px', pointerEvents: 'none', color: 'var(--text-muted)' }}>
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>
        </div>
      </div>
    </div>
  );
};
