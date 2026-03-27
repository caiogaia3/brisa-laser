import { useState, useEffect } from 'react';
import { supabase } from '../../../lib/supabase';

import { usePeriodStore } from '../../../store/usePeriodStore';

export interface DREMatrixRow {
  id: string;
  nivel: number;
  conta_descricao: string;
  ordem: number;
  valores: Record<string, number>;
}

export function useDREMatrix() {
  const [loading, setLoading] = useState(true);
  const [matrixData, setMatrixData] = useState<DREMatrixRow[]>([]);
  const [months, setMonths] = useState<string[]>([]);
  const { storeId } = usePeriodStore();

  useEffect(() => {
    async function fetchHybridDRE() {
      setLoading(true);
      try {
        // 1. Fetch History Matrix
        const { data: history, error: historyError } = await supabase
          .from('fin_matriz')
          .select('*')
          .order('ordem', { ascending: true });

        if (historyError) throw historyError;
        
        // 2. Determine Current Month
        const now = new Date();
        const currentMonthKey = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`;
        
        let liveQuery = supabase
          .from('fin_lancamentos')
          .select('*, fin_categorias(nome, secao_dre)')
          .gte('data', `${currentMonthKey}-01`)
          .lte('data', `${currentMonthKey}-31`);

        if (storeId !== 'all') {
          liveQuery = liveQuery.eq('store_id', storeId);
        }

        // 3. Fetch Live Lancamentos for current month
        const { data: liveData, error: liveError } = await liveQuery;

        if (liveError) throw liveError;

        if (history && history.length > 0) {
          // Identify all months across history
          let allMonths = Object.keys(history[0].valores).sort();
          
          // Force current month into columns if missing
          if (!allMonths.includes(currentMonthKey)) {
            allMonths.push(currentMonthKey);
          }
          allMonths = allMonths.sort();
          setMonths(allMonths);

          // 4. Merge Live data into Matrix Rows
          const merged = history.map((row: any) => {
            const updatedValores = { ...row.valores };
            
            // Initial zero for current month if it's new
            if (!updatedValores[currentMonthKey]) updatedValores[currentMonthKey] = 0;

            if (liveData) {
              const liveSum = liveData.reduce((acc: number, l: any) => {
                const secao = l.fin_categorias?.secao_dre;
                
                // Logic to match DRE rows to account sections based on Spreadsheet Niveis
                const isReceitaTotal = row.conta_descricao.includes('FATURAMENTO TOTAL BRUTO') && secao === 1;
                const isDeducaoTotal = row.conta_descricao.includes('DEDUÇÕES DA RECEITA BRUTA') && secao === 2;
                const isDespesaFixaTotal = row.conta_descricao.includes('DESPESAS FIXAS') && secao === 3;
                const isProLaboreTotal = row.conta_descricao.includes('PRO-LABORE') && secao === 4;
                const isInvestimentoTotal = row.conta_descricao.includes('INVESTIMENTOS') && secao === 5;

                if (isReceitaTotal || isDeducaoTotal || isDespesaFixaTotal || isProLaboreTotal || isInvestimentoTotal) {
                   return acc + (l.tipo === 'entrada' ? l.valor : -l.valor);
                }
                return acc;
              }, 0);

              // Update the current month value if we found entries
              if (liveSum !== 0) {
                 updatedValores[currentMonthKey] = liveSum;
              }
            }

            return { ...row, valores: updatedValores };
          });

          setMatrixData(merged);
        }
      } catch (err) {
        console.error('Erro ao buscar DRE Híbrido:', err);
      } finally {
        setLoading(false);
      }
    }

    fetchHybridDRE();
  }, []);

  return { loading, matrixData, months };
}
