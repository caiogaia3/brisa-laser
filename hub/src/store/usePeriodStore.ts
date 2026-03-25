import { create } from 'zustand';

type PeriodPreset = 'today' | '7d' | '30d' | 'custom';

interface PeriodState {
  preset: PeriodPreset;
  startDate: Date;
  endDate: Date;
  
  // Legacy support parameters (temporary to prevent breaking other pages immediately)
  month: number;
  year: number;

  setPreset: (preset: PeriodPreset) => void;
  setCustomRange: (start: Date, end: Date) => void;
}

export const usePeriodStore = create<PeriodState>((set) => {
  const getDatesForPreset = (preset: PeriodPreset) => {
    const end = new Date();
    const start = new Date();
    
    if (preset === 'today') {
      start.setHours(0,0,0,0);
    } else if (preset === '7d') {
      start.setDate(end.getDate() - 7);
    } else if (preset === '30d') {
      start.setDate(end.getDate() - 30);
    }
    
    return { startDate: start, endDate: end, month: start.getMonth(), year: start.getFullYear() };
  };

  const initialDates = getDatesForPreset('30d');

  return {
    preset: '30d',
    startDate: initialDates.startDate,
    endDate: initialDates.endDate,
    month: initialDates.month,
    year: initialDates.year,
    
    setPreset: (preset) => set(() => ({ 
      preset, 
      ...(preset !== 'custom' ? getDatesForPreset(preset) : {})
    })),
    
    setCustomRange: (start, end) => set({ 
      preset: 'custom', 
      startDate: start, 
      endDate: end,
      month: start.getMonth(), 
      year: start.getFullYear()
    }),
  };
});
