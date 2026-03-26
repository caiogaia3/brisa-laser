import { useState } from 'react';
import { usePeriodStore } from '../store/usePeriodStore';
import { Save, AlertCircle } from 'lucide-react';

const mockGoals = {
  'consolidado': { receita: 150000, despesa: 75000, margem: 50000 },
  'brisa_laser': { receita: 100000, despesa: 50000, margem: 40000 },
  'brisa_premium': { receita: 50000, despesa: 25000, margem: 10000 }
};

export const OKRs = () => {
  const { month, year, storeId } = usePeriodStore();
  const periodString = `${year}-${String(month + 1).padStart(2, '0')}`;
  
  const currentMock = mockGoals[storeId as keyof typeof mockGoals] || mockGoals['consolidado'];
  
  const [goals, setGoals] = useState(currentMock);
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = () => {
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      alert('Metas salvas com sucesso! (Modo Demonstração)');
    }, 800);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
      <header>
        <h1 style={{ fontSize: '1.5rem', color: 'var(--text-main)', marginBottom: '8px' }}>Gestão de OKRs Mensais</h1>
        <p style={{ color: 'var(--text-muted)' }}>Defina os alvos financeiros e de performance para {periodString} na loja selecionada.</p>
      </header>

      <div className="liquid-glass" style={{ padding: '32px', maxWidth: '600px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '16px', backgroundColor: 'rgba(59, 130, 246, 0.1)', border: '1px solid rgba(59, 130, 246, 0.2)', borderRadius: '8px', marginBottom: '32px' }}>
          <AlertCircle size={20} style={{ color: 'var(--color-primary)' }} />
          <p style={{ fontSize: '0.875rem', color: 'var(--text-main)' }}>Estas metas alimentarão os gráficos de progresso do Resumo Executivo em tempo real.</p>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <label style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--text-main)' }}>Meta de Receita Bruta (R$)</label>
            <input 
              type="number" 
              value={goals.receita}
              onChange={e => setGoals({...goals, receita: Number(e.target.value)})}
              style={{ padding: '12px', borderRadius: '8px', border: '1px solid var(--color-glass-border)', backgroundColor: 'rgba(0,0,0,0.2)', color: 'white', outline: 'none' }}
            />
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <label style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--text-main)' }}>Teto de Despesas Totais (R$)</label>
            <input 
              type="number" 
              value={goals.despesa}
              onChange={e => setGoals({...goals, despesa: Number(e.target.value)})}
              style={{ padding: '12px', borderRadius: '8px', border: '1px solid var(--color-glass-border)', backgroundColor: 'rgba(0,0,0,0.2)', color: 'white', outline: 'none' }}
            />
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <label style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--text-main)' }}>Meta de Margem Saudável (R$)</label>
            <input 
              type="number" 
              value={goals.margem}
              onChange={e => setGoals({...goals, margem: Number(e.target.value)})}
              style={{ padding: '12px', borderRadius: '8px', border: '1px solid var(--color-glass-border)', backgroundColor: 'rgba(0,0,0,0.2)', color: 'white', outline: 'none' }}
            />
          </div>

          <button 
            onClick={handleSave}
            disabled={isSaving}
            style={{ 
              marginTop: '16px', padding: '12px', borderRadius: '8px', 
              backgroundColor: 'var(--color-primary)', color: 'white', border: 'none', 
              fontWeight: 'bold', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
              cursor: isSaving ? 'wait' : 'pointer', opacity: isSaving ? 0.7 : 1
            }}
          >
            <Save size={18} />
            {isSaving ? 'Salvando...' : 'Salvar Metas Mensais'}
          </button>
        </div>
      </div>
    </div>
  );
};
