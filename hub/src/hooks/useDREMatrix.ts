import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';

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

  useEffect(() => {
    async function fetchDREMatrix() {
      setLoading(true);
      try {
        const { data, error } = await supabase
          .from('fin_dre_matriz')
          .select('*')
          .order('ordem', { ascending: true });

        if (error) throw error;
        
        if (data && data.length > 0) {
          setMatrixData(data);
          
          // Months are the keys in the 'valores' object of the first row
          const firstRow = data[0];
          const sortedMonths = Object.keys(firstRow.valores).sort();
          setMonths(sortedMonths);
        }
      } catch (err) {
        console.error('Erro ao buscar DRE Matrix:', err);
      } finally {
        setLoading(false);
      }
    }

    fetchDREMatrix();
  }, []);

  return { loading, matrixData, months };
}
