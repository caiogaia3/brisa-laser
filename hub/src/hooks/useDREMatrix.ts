import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import type { FinDRE } from '../lib/types';

export function useDREMatrix() {
  const [loading, setLoading] = useState(true);
  const [matrixData, setMatrixData] = useState<FinDRE[]>([]);
  const [months, setMonths] = useState<string[]>([]);
  const [uniqueLines, setUniqueLines] = useState<{ id: number; label: string; is_subtotal: boolean; category: string }[]>([]);

  useEffect(() => {
    async function fetchAllDRE() {
      setLoading(true);
      try {
        const { data, error } = await supabase
          .from('fin_dre')
          .select('*')
          .order('period_month', { ascending: true })
          .order('id', { ascending: true }); 

        if (error) throw error;
        
        if (data && data.length > 0) {
          setMatrixData(data);
          
          // Get unique months sorted
          const uniqueMonths = Array.from(new Set(data.map(d => d.period_month))).sort();
          setMonths(uniqueMonths);
          
          // Get unique lines by ID to preserve vertical DRE order
          const linesMap = new Map();
          data.forEach(d => {
            if (!linesMap.has(d.id)) {
              linesMap.set(d.id, { 
                id: d.id, 
                label: d.line_label, 
                is_subtotal: d.is_subtotal,
                category: d.category 
              });
            }
          });
          setUniqueLines(Array.from(linesMap.values()).sort((a, b) => a.id - b.id));
        }
      } catch (err) {
        console.error('Erro ao buscar DRE Matrix:', err);
      } finally {
        setLoading(false);
      }
    }

    fetchAllDRE();
  }, []);

  return { loading, matrixData, months, uniqueLines };
}
