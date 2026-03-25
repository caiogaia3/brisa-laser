import { ChevronLeft, ChevronRight, Calendar } from 'lucide-react';
import { usePeriodStore } from '../../store/usePeriodStore';

const MONTHS = [
  'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
  'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
];

export const PeriodSelector = () => {
  const { month, year, nextMonth, prevMonth } = usePeriodStore();

  return (
    <div className="glass-panel" style={{ 
      display: 'inline-flex', 
      alignItems: 'center', 
      gap: '12px', 
      padding: '8px 16px',
      borderRadius: 'var(--radius-full)'
    }}>
      <Calendar size={18} color="var(--color-primary)" />
      
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <button 
          onClick={prevMonth}
          className="hover:bg-white/10 p-1 rounded-full transition-colors"
          style={{ background: 'transparent', border: 'none', cursor: 'pointer', color: 'var(--text-main)' }}
        >
          <ChevronLeft size={20} />
        </button>
        
        <span style={{ 
          minWidth: '110px', 
          textAlign: 'center', 
          fontWeight: 600,
          color: 'var(--text-main)'
        }}>
          {MONTHS[month]} {year}
        </span>
        
        <button 
          onClick={nextMonth}
          className="hover:bg-white/10 p-1 rounded-full transition-colors"
          style={{ background: 'transparent', border: 'none', cursor: 'pointer', color: 'var(--text-main)' }}
        >
          <ChevronRight size={20} />
        </button>
      </div>
    </div>
  );
};
