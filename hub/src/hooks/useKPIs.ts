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
             { title: 'Receita Bruta', value: 'R$ 0,00', change: 0, sparkline_data: [] },
             { title: 'Margem de Contribuição', value: 'R$ 0,00', change: 0, sparkline_data: [] },
             { title: 'Despesas Totais', value: 'R$ 0,00', change: 0, sparkline_data: [] },
             { title: 'Despesas Fixas', value: 'R$ 0,00', change: 0, sparkline_data: [] },
             { title: 'EBITDA (LAJIDA)', value: 'R$ 0,00', change: 0, sparkline_data: [] },
             { title: 'Lucro Líquido Final', value: 'R$ 0,00', change: 0, sparkline_data: [] },
             { title: 'Break-even (Ponto Mágico)', value: 'R$ 0,00', change: 0, sparkline_data: [] },
          ]);
          setData(null);
          setLoading(false);
          return;
        }

        setData(dreData);
        
        // Helper to format currency if backend sent number, or use string directly from backend spec
        const formatValue = (val: any) => {
          if (typeof val === 'string') return val;
          return `R$ ${(val || 0).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`;
        };

        // Extrai dados reais se existirem na view, caso contrário usa default
        const parseSparklines = (raw: any) => Array.isArray(raw) ? raw : [];

        // Setup dinâmico real baseado no retorno da View (Spec 100% Aligned)
        const formattedKPIs: KPI[] = [
          { 
            title: 'Receita Bruta', 
            value: formatValue(dreData.receita_bruta_formatted || dreData.receita_bruta), 
            change: dreData.receita_bruta_change || 0,
            sparkline_data: parseSparklines(dreData.receita_bruta_sparkline)
          },
          { 
            title: 'Margem de Contribuição', 
            value: formatValue(dreData.margem_contribuicao_formatted || dreData.margem_contribuicao), 
            change: dreData.margem_contribuicao_change || 0, 
            sparkline_data: parseSparklines(dreData.margem_contribuicao_sparkline)
          },
          { 
            title: 'Despesas Totais', 
            value: formatValue(dreData.despesas_totais_formatted || dreData.despesas_totais), 
            change: dreData.despesas_totais_change || 0, 
            sparkline_data: parseSparklines(dreData.despesas_totais_sparkline)
          },
          { 
            title: 'Despesas Fixas', 
            value: formatValue(dreData.despesas_fixas_formatted || dreData.despesas_fixas), 
            change: dreData.despesas_fixas_change || 0, 
            sparkline_data: parseSparklines(dreData.despesas_fixas_sparkline)
          },
          { 
            title: 'EBITDA (LAJIDA)', 
            value: formatValue(dreData.ebitda_formatted || dreData.ebitda), 
            change: dreData.ebitda_change || 0, 
            sparkline_data: parseSparklines(dreData.ebitda_sparkline)
          },
          { 
            title: 'Lucro Líquido Final', 
            value: formatValue(dreData.lucro_liquido_formatted || dreData.lucro_liquido), 
            change: dreData.lucro_liquido_change || 0, 
            sparkline_data: parseSparklines(dreData.lucro_liquido_sparkline)
          },
          { 
            title: 'Break-even (Ponto Mágico)', 
            value: formatValue(dreData.breakeven_formatted || dreData.breakeven), 
            change: dreData.breakeven_change || 0, 
            sparkline_data: parseSparklines(dreData.breakeven_sparkline)
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
  }, [month, year, storeId]);

  return { loading, data, kpis };
}
