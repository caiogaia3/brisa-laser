import React, { useState, useEffect, useRef } from 'react';
import { useDREStore } from '../../store/useDREStore';
import { usePeriodStore } from '../../store/usePeriodStore';
import { supabase } from '../../lib/supabase';
import { Save, PlusCircle } from 'lucide-react';

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

    const result = suggestCategory(val);
    if (result && result.cat) {
      setGhostText(` ➔ ${result.cat.nome} ${result.sub ? `(${result.sub.nome})` : ''}`);
      setCategoriaId(result.cat.id);
      if (result.sub) setSubcategoriaId(result.sub.id);
      if (result.tipo) setTipo(result.tipo as 'entrada' | 'saida');
    } else {
      setGhostText('');
    }
  };

  const handleDescricaoKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Tab' && ghostText) {
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
    }
  };

  const filteredSubs = subcategorias.filter(s => s.categoria_id === categoriaId);

  // Group categories by DRE sections
  const sections = [
    { label: '🔵 1. RECEITA BRUTA (+)', secao: 1, color: 'var(--color-primary)' },
    { label: '🔴 2. DEDUÇÕES E CUSTOS VARIÁVEIS (-)', secao: 2, color: 'var(--color-danger)' },
    { label: '🟡 3. DESPESAS FIXAS / G&A (-)', secao: 3, color: '#f1c40f' },
    { label: '🟣 4. DISTRIBUIÇÃO E FINANCEIRO (-)', secao: 4, color: '#9b59b6' },
    { label: '⚫ 5. CAPEX E RESERVAS (-)', secao: 5, color: '#34495e' }
  ];

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
        
        <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
          <div style={{ 
            fontSize: '10px', textTransform: 'uppercase', letterSpacing: '1px', 
            padding: '4px 8px', borderRadius: '4px',
            backgroundColor: tipo === 'entrada' ? 'rgba(76, 175, 80, 0.1)' : 'rgba(244, 67, 54, 0.1)',
            color: tipo === 'entrada' ? 'var(--color-success)' : 'var(--color-danger)',
            border: `1px solid ${tipo === 'entrada' ? 'var(--color-success)' : 'var(--color-danger)'}`
          }}>
            Tipo: {tipo === 'entrada' ? 'Entrada (+)' : 'Saída (-)'}
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} style={{ display: 'flex', flexWrap: 'wrap', gap: '16px', position: 'relative', zIndex: 1 }}>
        <div style={{ flex: '0 0 160px' }}>
          <label style={{ display: 'block', fontSize: '12px', color: 'var(--text-muted)', marginBottom: '4px' }}>Data</label>
          <input 
            type="date" 
            value={data} onChange={e => setData(e.target.value)} required
            style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', background: 'rgba(0,0,0,0.2)', border: '1px solid var(--color-glass-border)', color: 'var(--text-main)', outline: 'none' }}
          />
        </div>

        <div style={{ flex: 1, minWidth: '300px', position: 'relative' }}>
          <label style={{ display: 'block', fontSize: '12px', color: 'var(--text-muted)', marginBottom: '4px' }}>
            Descrição <span style={{ color: 'var(--color-primary)', fontSize: '10px', marginLeft: '4px' }}>✨ Sugestão Inteligente</span>
          </label>
          <div style={{ position: 'relative' }}>
            <input 
              type="text" 
              value={descricao} onChange={handleDescricaoChange} onKeyDown={handleDescricaoKeyDown} required placeholder="Ex: Codau, Google Ads..."
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

        <div style={{ flex: '1 1 250px' }}>
          <label style={{ fontSize: '12px', color: 'var(--text-muted)', marginBottom: '4px', display: 'block' }}>Grupo DRE (Categoria)</label>
          <select 
            value={categoriaId} 
            onChange={e => {
              const cat = categorias.find(c => c.id === e.target.value);
              setCategoriaId(e.target.value);
              if (cat) setTipo(cat.tipo);
              setSubcategoriaId('');
            }} 
            required
            style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', background: 'rgba(0,0,0,0.2)', border: '1px solid var(--color-glass-border)', color: 'var(--text-main)', outline: 'none', appearance: 'none' }}
          >
            <option value="" disabled>Selecione o Grupo...</option>
            {sections.map(sec => (
               <optgroup key={sec.secao} label={sec.label} style={{ background: '#111', color: sec.color }}>
                  {categorias.filter(c => c.secao_dre === sec.secao).map(c => (
                    <option key={c.id} value={c.id} style={{ color: '#fff' }}>{c.nome}</option>
                  ))}
               </optgroup>
            ))}
          </select>
        </div>

        <div style={{ flex: '1 1 200px' }}>
          <label style={{ display: 'block', fontSize: '12px', color: 'var(--text-muted)', marginBottom: '4px' }}>Subcategoria (Opcional)</label>
          <select 
            value={subcategoriaId} onChange={e => setSubcategoriaId(e.target.value)}
            style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', background: 'rgba(0,0,0,0.2)', border: '1px solid var(--color-glass-border)', color: 'var(--text-main)', outline: 'none', appearance: 'none' }}
          >
            <option value="">Selecione Detalhe...</option>
            {filteredSubs.map(s => (
              <option key={s.id} value={s.id}>{s.nome}</option>
            ))}
          </select>
        </div>

        <div style={{ flex: '0 0 160px' }}>
          <label style={{ display: 'block', fontSize: '12px', color: 'var(--text-muted)', marginBottom: '4px' }}>Valor (R$)</label>
          <input 
            type="text" 
            ref={valorRef}
            value={valor} 
            onChange={e => {
              // Simple comma to dot masker
              const val = e.target.value.replace(/[^0-9,.]/g, '');
              setValor(val);
            }} 
            required placeholder="0,00"
            style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', background: 'rgba(0,0,0,0.2)', border: '1px solid var(--color-glass-border)', color: 'var(--color-primary)', fontWeight: 'bold', outline: 'none' }}
          />
        </div>

        <div style={{ display: 'flex', alignItems: 'flex-end' }}>
          <button type="submit" style={{ 
            height: '42px', padding: '0 32px', borderRadius: '8px',
            background: 'var(--color-primary)', color: 'var(--color-bg)', border: 'none',
            fontWeight: 'bold', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px', boxShadow: 'var(--shadow-glow)'
          }}>
            <Save size={18} /> Salvar Lançamento
          </button>
        </div>
      </form>
    </div>
  );
};
