import { useState, useEffect } from 'react';
import { supabase } from '../../../lib/supabase';
import type { FinDRE } from '../../../lib/types';

export function useDRE(selectedMonth: string) {
  const [loading, setLoading] = useState(true);
  const [dreData, setDreData] = useState<FinDRE[]>([]);
  const [availableMonths, setAvailableMonths] = useState<string[]>([]);

  // 1. Buscar meses disponíveis para o seletor
  useEffect(() => {
    async function fetchMonths() {
      const { data } = await supabase
        .from('fin_dre')
        .select('period_month')
        .order('period_month', { ascending: false });
      
      if (data) {
        const unique = Array.from(new Set(data.map(d => d.period_month)));
        setAvailableMonths(unique);
      }
    }
    fetchMonths();
  }, []);

  // 2. Buscar dados da DRE para o mês selecionado
  useEffect(() => {
    async function fetchDRE() {
      if (!selectedMonth) return;
      
      setLoading(true);
      try {
        const { data, error } = await supabase
          .from('fin_dre')
          .select('*')
          .eq('period_month', selectedMonth)
          .order('id', { ascending: true }); // A ordem de inserção do script preserva a ordem da planilha

        if (error) throw error;
        setDreData(data || []);
      } catch (err) {
        console.error('Erro ao buscar DRE:', err);
      } finally {
        setLoading(false);
      }
    }

    fetchDRE();
  }, [selectedMonth]);

  return { loading, dreData, availableMonths };
}
