import { create } from 'zustand';

interface PeriodState {
  month: number; // 0-11
  year: number;
  setPeriod: (month: number, year: number) => void;
  nextMonth: () => void;
  prevMonth: () => void;
}

export const usePeriodStore = create<PeriodState>((set) => {
  const today = new Date();
  
  return {
    month: today.getMonth(),
    year: today.getFullYear(),
    
    setPeriod: (month, year) => set({ month, year }),
    
    nextMonth: () => set((state) => {
      const isDecember = state.month === 11;
      return {
        month: isDecember ? 0 : state.month + 1,
        year: isDecember ? state.year + 1 : state.year
      };
    }),
    
    prevMonth: () => set((state) => {
      const isJanuary = state.month === 0;
      return {
        month: isJanuary ? 11 : state.month - 1,
        year: isJanuary ? state.year - 1 : state.year
      };
    })
  };
});
