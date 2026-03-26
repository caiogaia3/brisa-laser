import { useState, useRef, useEffect } from 'react';
import { usePeriodStore } from '../../store/usePeriodStore';
import { Calendar } from 'lucide-react';

export const DateSegmentedControl = () => {
  const { preset, startDate, endDate, setPreset, setCustomRange } = usePeriodStore();
  const [showCustom, setShowCustom] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const [tempStart, setTempStart] = useState(
    startDate ? startDate.toISOString().split('T')[0] : ''
  );
  const [tempEnd, setTempEnd] = useState(
    endDate ? endDate.toISOString().split('T')[0] : ''
  );

  const presets = [
    { id: 'today', label: 'Hoje' },
    { id: '7d', label: '7 Dias' },
    { id: '30d', label: '30 Dias' },
    { id: 'custom', label: 'Personalizado' }
  ];

  const handleSelect = (id: string) => {
    if (id === 'custom') {
      setShowCustom(!showCustom);
      setPreset('custom');
    } else {
      setShowCustom(false);
      setPreset(id as any);
    }
  };

  const applyCustom = () => {
    if (tempStart && tempEnd) {
      setCustomRange(new Date(tempStart), new Date(tempEnd));
      setShowCustom(false);
    }
  };

  // Click outside to close custom popover
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowCustom(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div style={{ position: 'relative' }} ref={dropdownRef}>
      <div style={{ 
        display: 'flex', 
        alignItems: 'center', 
        background: 'rgba(28, 28, 30, 0.8)', 
        borderRadius: '99px',
        padding: '4px',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        backdropFilter: 'blur(10px)',
        boxShadow: '0 4px 12px rgba(0,0,0,0.5)'
      }}>
        {presets.map((p) => {
          const isActive = preset === p.id;
          return (
            <button
              key={p.id}
              onClick={() => handleSelect(p.id)}
              style={{
                background: isActive ? '#0f172a' : 'transparent',
                color: isActive ? 'var(--text-main)' : 'var(--text-muted)',
                border: 'none',
                borderRadius: '99px',
                padding: '6px 16px',
                fontSize: '0.85rem',
                fontWeight: isActive ? 500 : 400,
                cursor: 'pointer',
                transition: 'all 0.2s',
                boxShadow: isActive ? '0 2px 8px rgba(0,0,0,0.4)' : 'none',
                outline: 'none'
              }}
            >
              {p.label}
            </button>
          );
        })}
      </div>

      {showCustom && (
        <div className="liquid-glass" style={{
          position: 'absolute',
          top: 'calc(100% + 12px)',
          right: 0,
          background: 'rgba(10, 10, 15, 0.95)',
          backdropFilter: 'blur(24px)',
          border: '1px solid var(--color-glass-border)',
          borderRadius: '12px',
          padding: '12px',
          minWidth: '280px',
          zIndex: 50,
          boxShadow: '0 20px 40px rgba(0,0,0,0.6), 0 0 20px rgba(6, 182, 212, 0.05)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
            <Calendar size={14} color="var(--color-primary)" />
            <h4 style={{ margin: 0, fontSize: '0.8rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Período Custom</h4>
          </div>
          
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', marginBottom: '12px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.65rem', color: 'var(--text-muted)', marginBottom: '4px', textTransform: 'uppercase' }}>Início</label>
              <input 
                type="date" 
                value={tempStart} 
                onChange={e => setTempStart(e.target.value)}
                style={{ 
                  width: '100%', padding: '6px 8px', borderRadius: '6px', 
                  background: 'rgba(0,0,0,0.3)', border: '1px solid var(--color-glass-border)', 
                  color: 'var(--text-main)', colorScheme: 'dark', fontSize: '0.75rem', outline: 'none'
                }} 
              />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '0.65rem', color: 'var(--text-muted)', marginBottom: '4px', textTransform: 'uppercase' }}>Fim</label>
              <input 
                type="date" 
                value={tempEnd} 
                onChange={e => setTempEnd(e.target.value)}
                style={{ 
                  width: '100%', padding: '6px 8px', borderRadius: '6px', 
                  background: 'rgba(0,0,0,0.3)', border: '1px solid var(--color-glass-border)', 
                  color: 'var(--text-main)', colorScheme: 'dark', fontSize: '0.75rem', outline: 'none'
                }} 
              />
            </div>
          </div>
          
          <button 
            onClick={applyCustom}
            style={{
              width: '100%', padding: '10px', borderRadius: '8px',
              background: 'linear-gradient(135deg, var(--color-primary), #0891b2)', 
              border: 'none', color: '#fff',
              fontSize: '0.75rem', fontWeight: 700, cursor: 'pointer',
              transition: 'all 0.2s', boxShadow: '0 4px 12px rgba(6, 182, 212, 0.3)'
            }}
            onMouseOver={(e) => e.currentTarget.style.filter = 'brightness(1.1)'}
            onMouseOut={(e) => e.currentTarget.style.filter = 'brightness(1.0)'}
          >
            APLICAR FILTRO
          </button>
        </div>
      )}
    </div>
  );
};
