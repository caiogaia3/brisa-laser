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
      {/* Esquerda: Lojas */}
      <div style={{ flex: 1, display: 'flex', alignItems: 'center' }}>
        <StoreSelector />
      </div>

      {/* Centro: Período */}
      <div style={{ flex: 1, display: 'flex', justifyContent: 'center' }}>
        <DateSegmentedControl />
      </div>

      {/* Direita: Jarvis e Usuário */}
      <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '24px' }}>
        <button className="liquid-glass" onClick={onOpenChat} style={{
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

        <div style={{ 
          padding: '4px 12px 4px 4px', display: 'flex', gap: '12px', alignItems: 'center', 
          borderRadius: 'var(--radius-full)', background: 'var(--color-surface)', 
          border: '1px solid var(--color-glass-border)', cursor: 'pointer' 
        }}>
          <div style={{ 
            minWidth: '32px', height: '32px', borderRadius: '50%', backgroundColor: 'var(--color-primary)', 
            display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '13px', fontWeight: 'bold' 
          }}>
            MB
          </div>
          <div>
            <p style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-main)', margin: 0, lineHeight: 1.2 }}>Marcio Brisa</p>
            <p style={{ fontSize: '0.65rem', color: 'var(--text-muted)', margin: 0 }}>CFO / CEO</p>
          </div>
        </div>
      </div>
    </header>
  );
};
