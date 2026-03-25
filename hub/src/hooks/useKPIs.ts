import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import type { ViewMasterBI, KPI } from '../lib/types';

export function useKPIs() {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<ViewMasterBI | null>(null);
  const [kpis, setKpis] = useState<KPI[]>([]);

  useEffect(() => {
    async function fetchKPIs() {
      try {
        setLoading(true);
        // Busca do Supabase View Master BI (último mês com dados)
        const { data, error } = await supabase
          .from('vw_brisa_master_bi')
          .select('*')
          .order('period_month', { ascending: false })
          .limit(1)
          .single();

        if (error && error.code !== 'PGRST116') {
          console.error("Erro Supabase:", error);
          throw error;
        }

        // Se não existir dados reais ainda (banco zerado ou falha no RLS anon), usamos mock de alta qualidade para design
        if (!data || error) {
          console.warn("Sem dados reais, exibindo mock");
          setKpis([
            { title: 'Receita Total', value: '142.500', change: 12.5, prefix: 'R$', trend: 'up' },
            { title: 'Lucro Líquido', value: '38.400', change: 8.2, prefix: 'R$', trend: 'up' },
            { title: 'Custos Totais', value: '85.200', change: -2.4, prefix: 'R$', trend: 'down' },
            { title: 'Total Leads (Mês)', value: '894', change: 15.3, trend: 'up' },
            { title: 'Agendamentos', value: '256', change: 5.1, trend: 'up' },
            { title: 'Taxa Comparecimento', value: '62.5', change: 0, suffix: '%', trend: 'neutral' },
          ]);
          setLoading(false);
          return;
        }

        setData(data as ViewMasterBI);
        
        // Setup dinâmico real baseado no retorno
        const formattedKPIs: KPI[] = [
          { 
            title: 'Receita Total (Mês)', 
            value: (data.receita_total || 0).toLocaleString('pt-BR'), 
            change: 0, // Precisaria da comparação com mês passado 
            prefix: 'R$', 
            trend: 'neutral' 
          },
          { 
            title: 'EBITDA', 
            value: (data.ebitda || 0).toLocaleString('pt-BR'), 
            change: 0, 
            prefix: 'R$', 
            trend: 'neutral' 
          },
          { 
            title: 'Leads Gerados', 
            value: data.leads_gerados || 0, 
            change: 0, 
            trend: 'neutral' 
          },
          { 
            title: 'Taxa Comparecimento', 
            value: ((data.taxa_comparecimento || 0) * 100).toFixed(1), 
            change: 0, 
            suffix: '%', 
            trend: 'neutral' 
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
  }, []);

  return { loading, data, kpis };
}
