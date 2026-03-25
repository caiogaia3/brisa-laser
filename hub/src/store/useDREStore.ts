import { create } from 'zustand';
import { supabase } from '../lib/supabase';
import Fuse from 'fuse.js';

export interface Categoria {
  id: string;
  nome: string;
  tipo: 'entrada' | 'saida';
  secao_dre: number;
}

export interface Subcategoria {
  id: string;
  categoria_id: string;
  nome: string;
}

interface DREState {
  categorias: Categoria[];
  subcategorias: Subcategoria[];
  isLoading: boolean;
  fetchCatalog: () => Promise<void>;
  suggestCategory: (query: string) => { cat?: Categoria; sub?: Subcategoria; tipo?: string } | null;
}

export const useDREStore = create<DREState>((set, get) => ({
  categorias: [],
  subcategorias: [],
  isLoading: false,

  fetchCatalog: async () => {
    set({ isLoading: true });
    
    // Fetch Categorias and Subcategorias in parallel
    const [catsRes, subsRes] = await Promise.all([
      supabase.from('fin_categorias').select('*').order('ordem'),
      supabase.from('fin_subcategorias').select('*')
    ]);

    if (catsRes.data && subsRes.data) {
      set({ 
        categorias: catsRes.data as Categoria[], 
        subcategorias: subsRes.data as Subcategoria[],
        isLoading: false 
      });
    } else {
      set({ isLoading: false });
    }
  },

  suggestCategory: (query: string) => {
    const { categorias, subcategorias } = get();
    if (!query || query.length < 2) return null;

    const normalizedQuery = query.toLowerCase();

    // 1. Search in subcategories (The "Codau" case)
    const fuseSubs = new Fuse(subcategorias, { keys: ['nome'], threshold: 0.3 });
    const subResult = fuseSubs.search(normalizedQuery);

    if (subResult.length > 0) {
      const sub = subResult[0].item;
      const cat = categorias.find(c => c.id === sub.categoria_id);
      return { cat, sub, tipo: cat?.tipo || 'saida' };
    }

    // 2. Search in categories
    const fuseCats = new Fuse(categorias, { keys: ['nome'], threshold: 0.3 });
    const catResult = fuseCats.search(normalizedQuery);
    
    if (catResult.length > 0) {
      const cat = catResult[0].item;
      return { cat, sub: undefined, tipo: cat.tipo };
    }

    return null;
  }
}));
