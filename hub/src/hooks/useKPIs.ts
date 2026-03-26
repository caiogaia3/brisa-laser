import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import type { KPI } from '../lib/types';
import { usePeriodStore } from '../store/usePeriodStore';

export function useKPIs() {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<any | null>(null);
  const [kpis, setKpis] = useState<KPI[]>([]);
  const { month, year, storeId } = usePeriodStore();

  useEffect(() => {
    async function fetchKPIs() {
      try {
        setLoading(true);
        const periodString = `${year}-${String(month + 1).padStart(2, '0')}-01`;

        let query = supabase
          .from('vw_kpis_executivos')
          .select('*')
          .eq('mes', periodString);

        if (storeId !== 'all') {
           query = query.eq('store_id', storeId);
        }

        // Busca do Supabase View DRE Executiva
        const { data: dreData, error } = await query.single();

        if (error && error.code !== 'PGRST116') {
          console.error("Erro Supabase:", error);
          throw error;
        }

        if (!dreData) {
          // Zeroed state if no data for the month
          setKpis([
            { title: 'Receita Bruta', value: '0', change: 0, prefix: 'R$' },
            { title: 'Margem de Contribuição', value: '0', change: 0, prefix: 'R$' },
            { title: 'Despesas Totais', value: '0', change: 0, prefix: 'R$' },
            { title: 'Despesas Fixas', value: '0', change: 0, prefix: 'R$' },
            { title: 'EBITDA (LAJIDA)', value: '0', change: 0, prefix: 'R$' },
            { title: 'Lucro Líquido Final', value: '0', change: 0, prefix: 'R$' },
            { title: 'Ponto Equilíbrio (Break-even)', value: '0', change: 0, prefix: 'R$' },
          ]);
          setData(null);
          setLoading(false);
          return;
        }

        setData(dreData);
        
        // Setup dinâmico real baseado no retorno da View
        const formattedKPIs: KPI[] = [
          { 
            title: 'Receita Bruta', 
            value: (dreData.receita_bruta || 0).toLocaleString('pt-BR'), 
            change: 0,
            prefix: 'R$' 
          },
          { 
            title: 'Margem de Contribuição', 
            value: (dreData.margem_contribuicao || 0).toLocaleString('pt-BR'), 
            change: 0, 
            prefix: 'R$' 
          },
          { 
            title: 'Despesas Totais', 
            value: (dreData.despesas_totais || 0).toLocaleString('pt-BR'), 
            change: 0, 
            prefix: 'R$' 
          },
          { 
            title: 'Despesas Fixas', 
            value: (dreData.despesas_fixas || 0).toLocaleString('pt-BR'), 
            change: 0, 
            prefix: 'R$' 
          },
          { 
            title: 'EBITDA (LAJIDA)', 
            value: (dreData.ebitda || 0).toLocaleString('pt-BR'), 
            change: 0, 
            prefix: 'R$' 
          },
          { 
            title: 'Lucro Líquido Final', 
            value: (dreData.lucro_liquido || 0).toLocaleString('pt-BR'), 
            change: 0, 
            prefix: 'R$' 
          },
          { 
            title: 'Break-even (Ponto Mágico)', 
            value: (dreData.breakeven || 0).toLocaleString('pt-BR'), 
            change: 0, 
            prefix: 'R$' 
          },
        ];
        
        setKpis(formattedKPIs);
      } catch (err) {
        console.error('Error fetching KPIs', err);
      } finally {
        setLoading(false);
      }
    }

    fetchKPIs();
  }, [month, year]);

  return { loading, data, kpis };
}
