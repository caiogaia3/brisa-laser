import { Bell, Sparkles } from 'lucide-react';
import { DateSegmentedControl } from '../Navigation/DateSegmentedControl';
import { StoreSelector } from '../Navigation/StoreSelector';

export const Header = ({ onOpenChat }: { onOpenChat?: () => void }) => {
  return (
    <header style={{
      height: '80px',
      borderBottom: '1px solid var(--color-glass-border)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '0 32px',
      backgroundColor: 'var(--color-bg)',
      position: 'sticky',
      top: 0,
      zIndex: 10
    }}>
      <div style={{ flex: 1 }}>
        {/* Espaço reservado para manter o alinhamento do seletor de lojas à direita */}
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
        <StoreSelector />
        <DateSegmentedControl />

        <button className="glass-panel" onClick={onOpenChat} style={{
          display: 'flex', alignItems: 'center', gap: '8px', 
          padding: '8px 16px', borderRadius: 'var(--radius-full)',
          background: 'linear-gradient(90deg, var(--color-primary-light), transparent)',
          border: '1px solid rgba(59,130,246,0.3)', color: 'var(--color-primary)',
          cursor: 'pointer', outline: 'none'
        }}>
          <Sparkles size={16} />
          <span style={{ fontSize: '0.875rem', fontWeight: 500 }}>Jarvis Online</span>
        </button>
        
        <div style={{ position: 'relative', cursor: 'pointer' }}>
          <Bell size={24} color="var(--text-muted)" />
          <span style={{
            position: 'absolute', top: '-4px', right: '-4px',
            width: '10px', height: '10px', borderRadius: '50%',
            backgroundColor: 'var(--color-danger)', border: '2px solid var(--color-bg)'
          }}></span>
        </div>
      </div>
    </header>
  );
};
