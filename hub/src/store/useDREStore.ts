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
  suggestCategory: (query: string) => { cat?: Categoria; sub?: Subcategoria } | null;
}

export const useDREStore = create<DREState>((set, get) => ({
  categorias: [],
  subcategorias: [],
  isLoading: false,

  fetchCatalog: async () => {
    set({ isLoading: true });
    
    // Fetch Categorias and Subcategorias in parallel
    const [catsRes, subsRes] = await Promise.all([
      supabase.from('dre_categorias').select('*').order('ordem'),
      supabase.from('dre_subcategorias').select('*')
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
    if (!query || query.length < 3) return null;

    // Fuzzy search in subcategories first
    const fuseSubs = new Fuse(subcategorias, { keys: ['nome'], threshold: 0.4 });
    const subResult = fuseSubs.search(query);

    if (subResult.length > 0) {
      const sub = subResult[0].item;
      const cat = categorias.find(c => c.id === sub.categoria_id);
      return { cat, sub };
    }

    // Fallback to fuzzy search in categories
    const fuseCats = new Fuse(categorias, { keys: ['nome'], threshold: 0.4 });
    const catResult = fuseCats.search(query);
    
    if (catResult.length > 0) {
      return { cat: catResult[0].item, sub: undefined };
    }

    return null;
  }
}));
