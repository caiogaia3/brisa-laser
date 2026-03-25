import React, { useState, useEffect, useRef } from 'react';
import { useDREStore } from '../../store/useDREStore';
import { usePeriodStore } from '../../store/usePeriodStore';
import { supabase } from '../../lib/supabase';
import { Save, Info, PlusCircle } from 'lucide-react';

export const LancamentoForm = ({ onSaved }: { onSaved?: () => void }) => {
  const { month, year } = usePeriodStore();
  const { categorias, subcategorias, fetchCatalog, suggestCategory } = useDREStore();
  
  // Local Form State
  const [data, setData] = useState('');
  const [descricao, setDescricao] = useState('');
  const [valor, setValor] = useState('');
  const [categoriaId, setCategoriaId] = useState('');
  const [subcategoriaId, setSubcategoriaId] = useState('');
  const [tipo, setTipo] = useState<'entrada' | 'saida'>('saida');
  
  const [ghostText, setGhostText] = useState('');
  const [flashSuccess, setFlashSuccess] = useState(false);
  const valorRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (categorias.length === 0) fetchCatalog();
  }, []);

  // Sync date with Global Selector if empty
  useEffect(() => {
    if (!data) {
      const today = new Date();
      const currentMonth = today.getMonth();
      // If global selector matches current real time month, use today's day, else use 1st day
      const day = currentMonth === month ? String(today.getDate()).padStart(2, '0') : '01';
      setData(`${year}-${String(month + 1).padStart(2, '0')}-${day}`);
    }
  }, [month, year]);

  // Handle Smart Fuzzy Autocomplete
  const handleDescricaoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setDescricao(val);

    const suggestion = suggestCategory(val);
    if (suggestion && suggestion.cat) {
      setGhostText(` ➔ ${suggestion.cat.nome} ${suggestion.sub ? `(${suggestion.sub.nome})` : ''}`);
      setCategoriaId(suggestion.cat.id);
      if (suggestion.sub) setSubcategoriaId(suggestion.sub.id);
      setTipo(suggestion.cat.tipo);
    } else {
      setGhostText('');
    }
  };

  const handleDescricaoKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Tab' && ghostText) {
      // Confirm cascade
      e.preventDefault();
      setGhostText('');
      valorRef.current?.focus();
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!data || !descricao || !valor || !categoriaId) return;

    const numericValor = parseFloat(valor.replace(',', '.'));

    const { error } = await supabase.from('fin_lancamentos').insert([{
      data,
      descricao,
      valor: numericValor,
      categoria_id: categoriaId,
      subcategoria_id: subcategoriaId || null,
      tipo
    }]);

    if (!error) {
      setFlashSuccess(true);
      setTimeout(() => setFlashSuccess(false), 1000);
      setDescricao('');
      setValor('');
      setGhostText('');
      if (onSaved) onSaved();
      // Keep date and categories for rapid entry
    }
  };

  const filteredSubs = subcategorias.filter(s => s.categoria_id === categoriaId);

  return (
    <div className="glass-panel" style={{ padding: '24px', position: 'relative', overflow: 'hidden' }}>
      {flashSuccess && (
        <div style={{ position: 'absolute', inset: 0, backgroundColor: 'var(--color-success)', opacity: 0.1, zIndex: 0, transition: 'opacity 0.3s' }} />
      )}
      
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px', position: 'relative', zIndex: 1 }}>
        <h2 style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <PlusCircle color="var(--color-primary)" />
          <strong>Lançamento Rápido</strong>
        </h2>
        
        <div style={{ display: 'flex', gap: '12px' }}>
          <button style={{ 
            backgroundColor: tipo === 'entrada' ? 'var(--color-success)' : 'transparent',
            color: tipo === 'entrada' ? '#fff' : 'var(--text-muted)',
            border: `1px solid ${tipo === 'entrada' ? 'var(--color-success)' : 'var(--color-glass-border)'}`,
            padding: '4px 16px', borderRadius: 'var(--radius-full)', cursor: 'pointer', transition: 'all 0.2s'
          }} onClick={() => setTipo('entrada')} type="button">Entrada</button>
          
          <button style={{ 
             backgroundColor: tipo === 'saida' ? 'var(--color-danger)' : 'transparent',
             color: tipo === 'saida' ? '#fff' : 'var(--text-muted)',
             border: `1px solid ${tipo === 'saida' ? 'var(--color-danger)' : 'var(--color-glass-border)'}`,
             padding: '4px 16px', borderRadius: 'var(--radius-full)', cursor: 'pointer', transition: 'all 0.2s'
          }} onClick={() => setTipo('saida')} type="button">Saída</button>
        </div>
      </div>

      <form onSubmit={handleSubmit} style={{ display: 'flex', flexWrap: 'wrap', gap: '16px', position: 'relative', zIndex: 1 }}>
        <div style={{ flex: '0 0 140px' }}>
          <label style={{ display: 'block', fontSize: '12px', color: 'var(--text-muted)', marginBottom: '4px' }}>Data</label>
          <input 
            type="date" 
            value={data} onChange={e => setData(e.target.value)} required
            style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', background: 'rgba(0,0,0,0.2)', border: '1px solid var(--color-glass-border)', color: 'var(--text-main)', outline: 'none' }}
          />
        </div>

        <div style={{ flex: 1, minWidth: '250px', position: 'relative' }}>
          <label style={{ display: 'block', fontSize: '12px', color: 'var(--text-muted)', marginBottom: '4px' }}>
            Descrição <span style={{ color: 'var(--color-primary)', fontSize: '10px', marginLeft: '4px' }}>✨ Inteligência Local</span>
          </label>
          <div style={{ position: 'relative' }}>
            <input 
              type="text" 
              value={descricao} onChange={handleDescricaoChange} onKeyDown={handleDescricaoKeyDown} required placeholder="Ex: google ads..."
              style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', background: 'rgba(0,0,0,0.2)', border: '1px solid var(--color-glass-border)', color: 'var(--text-main)', outline: 'none', position: 'relative', zIndex: 2 }}
            />
            {ghostText && (
              <div style={{ position: 'absolute', top: '10px', left: '12px', color: 'rgba(255,255,255,0.2)', pointerEvents: 'none', zIndex: 1, whiteSpace: 'nowrap', overflow: 'hidden' }}>
                <span style={{ visibility: 'hidden' }}>{descricao}</span>
                {ghostText} <span style={{ border: '1px solid rgba(255,255,255,0.3)', padding: '2px 4px', borderRadius: '4px', fontSize: '10px', marginLeft: '8px' }}>TAB</span>
              </div>
            )}
          </div>
        </div>

        <div style={{ flex: '1 1 200px' }}>
          <label style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', color: 'var(--text-muted)', marginBottom: '4px' }}>
            Categoria 
            <button type="button" style={{ background: 'none', border: 'none', color: 'var(--color-primary)', display: 'flex', alignItems: 'center', gap: '2px', cursor: 'pointer' }}><Info size={12}/> Plano</button>
          </label>
          <select 
            value={categoriaId} onChange={e => setCategoriaId(e.target.value)} required
            style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', background: 'rgba(0,0,0,0.2)', border: '1px solid var(--color-glass-border)', color: 'var(--text-main)', outline: 'none', appearance: 'none' }}
          >
            <option value="" disabled>Selecione...</option>
            {categorias.filter(c => c.tipo === tipo).map(c => (
              <option key={c.id} value={c.id}>{c.nome}</option>
            ))}
          </select>
        </div>

        <div style={{ flex: '1 1 200px' }}>
          <label style={{ display: 'block', fontSize: '12px', color: 'var(--text-muted)', marginBottom: '4px' }}>Detalhamento</label>
          <select 
            value={subcategoriaId} onChange={e => setSubcategoriaId(e.target.value)}
            style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', background: 'rgba(0,0,0,0.2)', border: '1px solid var(--color-glass-border)', color: 'var(--text-main)', outline: 'none', appearance: 'none' }}
          >
            <option value="">(Opcional)</option>
            {filteredSubs.map(s => (
              <option key={s.id} value={s.id}>{s.nome}</option>
            ))}
          </select>
        </div>

        <div style={{ flex: '0 0 140px' }}>
          <label style={{ display: 'block', fontSize: '12px', color: 'var(--text-muted)', marginBottom: '4px' }}>Valor (R$)</label>
          <input 
            type="number" step="0.01" min="0" ref={valorRef}
            value={valor} onChange={e => setValor(e.target.value)} required placeholder="0,00"
            style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', background: 'rgba(0,0,0,0.2)', border: '1px solid var(--color-glass-border)', color: 'var(--color-primary)', fontWeight: 'bold', outline: 'none' }}
          />
        </div>

        <div style={{ display: 'flex', alignItems: 'flex-end' }}>
          <button type="submit" style={{ 
            height: '40px', padding: '0 24px', borderRadius: '8px',
            background: 'var(--color-primary)', color: 'var(--color-bg)', border: 'none',
            fontWeight: 'bold', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px', boxShadow: 'var(--shadow-glow)'
          }}>
            <Save size={18} /> Salvar
          </button>
        </div>
      </form>
    </div>
  );
};
