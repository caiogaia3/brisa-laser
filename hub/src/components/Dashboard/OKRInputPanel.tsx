import React, { useState, useEffect } from 'react';
import { Target, Save, CheckCircle2 } from 'lucide-react';
import InfoTooltip from '../Common/InfoTooltip';
import { supabase } from '../../lib/supabase';
import { usePeriodStore } from '../../store/usePeriodStore';

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
  const { month, year, storeId } = usePeriodStore();
  
  const [goals, setGoals] = useState({
    receita: 150000,
    despesa: 12000,
    margem: 98,
    ticket: 300
  });

  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(true);

  // Fetch OKR goals from Supabase
  useEffect(() => {
    async function fetchOKRs() {
       setLoading(true);
       try {
         const currentStore = storeId === 'all' ? 'brisa_laser' : storeId;
         const { data, error } = await supabase
           .from('okr_goals')
           .select('*')
           .eq('store_id', currentStore)
           .eq('period_month', month + 1)
           .eq('period_year', year);
           
         if (error && error.code !== 'PGRST116') throw error;
         
         if (data && data.length > 0) {
            const newGoals = { ...goals };
            data.forEach(item => {
               if (item.metric_name === 'receita_bruta') newGoals.receita = item.target_value;
               if (item.metric_name === 'teto_despesas') newGoals.despesa = item.target_value;
               if (item.metric_name === 'margem_saudavel') newGoals.margem = item.target_value;
               if (item.metric_name === 'ticket_medio') newGoals.ticket = item.target_value;
            });
            setGoals(newGoals);
         }
       } catch (error) {
         console.error('Error fetching OKRs:', error);
       } finally {
         setLoading(false);
       }
    }
    fetchOKRs();
  }, [month, year, storeId]);

  const handleSave = async () => {
    setSaving(true);
    const currentStore = storeId === 'all' ? 'brisa_laser' : storeId;
    
    const basePayload = {
      store_id: currentStore,
      period_month: month + 1,
      period_year: year
    };

    const metricsToUpsert = [
      { ...basePayload, metric_name: 'receita_bruta', target_value: goals.receita },
      { ...basePayload, metric_name: 'teto_despesas', target_value: goals.despesa },
      { ...basePayload, metric_name: 'margem_saudavel', target_value: goals.margem },
      { ...basePayload, metric_name: 'ticket_medio', target_value: goals.ticket }
    ];

    try {
      const { error } = await supabase
        .from('okr_goals')
        .upsert(metricsToUpsert, { onConflict: 'store_id, period_month, period_year, metric_name' });
        
      if (error) throw error;
      
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    } catch (err) {
      console.error('Erro ao salvar OKRs:', err);
      alert('Erro ao salvar metas operacionais no servidor.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="liquid-glass" style={{ padding: '16px', height: '100%', border: 'none', borderLeft: '1px solid var(--color-glass-border)', borderRadius: 0 }}>
      {/* Rest of the component is identical to the previous one, rendering the inputs with the bounds logic */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px' }}>
        <div style={{ padding: '6px', backgroundColor: 'rgba(6, 182, 212, 0.1)', borderRadius: '8px' }}>
          <Target size={18} color="var(--color-primary)" />
        </div>
        <div>
          <h2 style={{ fontSize: '0.9rem', fontWeight: 800, color: 'white', display: 'flex', alignItems: 'center' }}>
            Quadro de Metas
            <span style={{ fontSize: '0.55rem', color: 'var(--color-orange)', marginLeft: '8px', backgroundColor: 'rgba(249, 115, 22, 0.1)', padding: '2px 6px', borderRadius: '4px', textTransform: 'uppercase' }}>{loading ? 'Sincronizando...' : 'Live 🟢'}</span>
          </h2>
          <p style={{ fontSize: '0.65rem', color: 'var(--text-muted)' }}>Projeções estratégicas do board</p>
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
          disabled={saving || loading}
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
            boxShadow: success ? '0 0 20px rgba(74, 222, 128, 0.2)' : 'var(--shadow-glow)',
            opacity: loading ? 0.5 : 1
          }}
        >
          {saving ? 'Sincronizando BD...' : success ? (
            <>
              <CheckCircle2 size={18} />
              Metas Salvas!
            </>
          ) : (
            <>
              <Save size={18} />
              Aplicar ao C-Level
            </>
          )}
        </button>
      </div>

      <div style={{ marginTop: '24px', padding: '12px', backgroundColor: 'rgba(255,255,255,0.02)', borderRadius: '10px', border: '1px dashed rgba(255,255,255,0.05)' }}>
        <p style={{ fontSize: '0.6rem', color: 'var(--text-muted)', lineHeight: '1.4' }}>
          💡 <strong>Regra Cloud:</strong> Ao aplicar, as views e os King Charts são atualizados via Supabase Sync.
        </p>
      </div>
    </div>
  );
};
