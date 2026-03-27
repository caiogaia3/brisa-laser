import React, { useState } from 'react';
import { Target, Save, CheckCircle2 } from 'lucide-react';
import InfoTooltip from '../Common/InfoTooltip';

interface OKRItemProps {
  label: string;
  value: number;
  onChange: (val: number) => void;
  tooltip: string;
  prefix?: string;
}

const OKRItem: React.FC<OKRItemProps> = ({ label, value, onChange, tooltip, prefix }) => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', marginBottom: '12px' }}>
    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
      <label style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
        {label}
      </label>
      <InfoTooltip title={label} content={tooltip} />
    </div>
    <div style={{ position: 'relative' }}>
      {prefix && <span style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'rgba(255,255,255,0.4)', fontSize: '0.85rem' }}>{prefix}</span>}
      <input 
        type="number"
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        style={{
          width: '100%',
          padding: '8px 12px 8px ' + (prefix ? '36px' : '12px'),
          backgroundColor: 'rgba(255, 255, 255, 0.02)',
          border: '1px solid var(--color-glass-border)',
          borderRadius: '10px',
          color: 'white',
          fontSize: '0.85rem',
          fontWeight: 600,
          outline: 'none',
          transition: 'border-color 0.2s'
        }}
        onFocus={(e) => e.target.style.borderColor = 'var(--color-primary)'}
        onBlur={(e) => e.target.style.borderColor = 'var(--color-glass-border)'}
      />
    </div>
  </div>
);

export const OKRInputPanel: React.FC = () => {
  const [goals, setGoals] = useState({
    receita: 150000,
    despesa: 12000,
    margem: 98,
    ticket: 300
  });

  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSave = () => {
    setSaving(true);
    setTimeout(() => {
      setSaving(false);
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    }, 1200);
  };

  return (
    <div className="liquid-glass" style={{ padding: '16px', height: '100%', border: 'none', borderLeft: '1px solid var(--color-glass-border)', borderRadius: 0 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px' }}>
        <div style={{ padding: '6px', backgroundColor: 'rgba(6, 182, 212, 0.1)', borderRadius: '8px' }}>
          <Target size={18} color="var(--color-primary)" />
        </div>
        <div>
          <h2 style={{ fontSize: '0.9rem', fontWeight: 800, color: 'white', display: 'flex', alignItems: 'center' }}>
            Quadro de Metas
            <span style={{ fontSize: '0.55rem', color: 'var(--color-orange)', marginLeft: '8px', backgroundColor: 'rgba(249, 115, 22, 0.1)', padding: '2px 6px', borderRadius: '4px', textTransform: 'uppercase' }}>em breve</span>
          </h2>
          <p style={{ fontSize: '0.65rem', color: 'var(--text-muted)' }}>Projeções estratégicas</p>
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <OKRItem 
          label="Meta de Receita" 
          value={goals.receita} 
          onChange={(v) => setGoals({...goals, receita: v})}
          prefix="R$"
          tooltip="Faturamento total bruto esperado para o período. Alimenta o King Chart A."
        />
        <OKRItem 
          label="Teto de Despesas" 
          value={goals.despesa} 
          onChange={(v) => setGoals({...goals, despesa: v})}
          prefix="R$"
          tooltip="Limite máximo de gastos fixos e variáveis. Essencial para o cálculo de Break-even."
        />
        <OKRItem 
          label="Margem de Contribuição" 
          value={goals.margem} 
          onChange={(v) => setGoals({...goals, margem: v})}
          tooltip="Métrica de saúde financeira. Ideal > 45% para Brisa Premium."
        />
        <OKRItem 
          label="Ticket Médio (ATV)" 
          value={goals.ticket} 
          onChange={(v) => setGoals({...goals, ticket: v})}
          prefix="R$"
          tooltip="Valor médio gasto por cliente. Meta ideal: R$ 300,00."
        />

        <button 
          onClick={handleSave}
          disabled={saving}
          style={{ 
            marginTop: '20px',
            padding: '16px',
            borderRadius: '14px',
            backgroundColor: success ? 'var(--color-accent)' : 'var(--color-primary)',
            color: 'white',
            border: 'none',
            fontWeight: 700,
            fontSize: '0.85rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '10px',
            cursor: saving ? 'wait' : 'pointer',
            transition: 'all 0.3s ease',
            boxShadow: success ? '0 0 20px rgba(74, 222, 128, 0.2)' : 'var(--shadow-glow)'
          }}
        >
          {saving ? 'Atualizando Motor...' : success ? (
            <>
              <CheckCircle2 size={18} />
              Metas Atualizadas
            </>
          ) : (
            <>
              <Save size={18} />
              Aplicar Estratégia
            </>
          )}
        </button>
      </div>

      <div style={{ marginTop: '24px', padding: '12px', backgroundColor: 'rgba(255,255,255,0.02)', borderRadius: '10px', border: '1px dashed rgba(255,255,255,0.05)' }}>
        <p style={{ fontSize: '0.6rem', color: 'var(--text-muted)', lineHeight: '1.4' }}>
          💡 <strong>Dica do CFO:</strong> Suas projeções à esquerda serão recalculadas instantaneamente.
        </p>
      </div>
    </div>
  );
};
