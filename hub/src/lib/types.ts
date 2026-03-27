export interface ViewMasterBI {
  period_month: string;
  store_id: string;
  receita_total: number;
  ebitda: number;
  lucro_liquido: number;
  investimento_mkt_real: number;
  leads_gerados: number;
  agendamentos: number;
  comparecimentos: number;
  taxa_comparecimento: number;
  custo_por_lead: number;
  roas: number;
  sessoes_site: number;
  conversoes_site: number;
}

export interface FinDRE {
  id: number;
  store_id: string;
  period_month: string;
  category: 'receita' | 'deducao' | 'custo_variavel' | 'despesa_fixa' | 'pro_labore' | 'financeiro' | 'caixa' | 'outros';
  line_label: string;
  is_subtotal: boolean;
  amount: number;
  updated_at: string;
}

export interface KPI {
  title: string;
  value: string;
  change: number;
  prefix?: string;
  suffix?: string;
  sparkline_data?: any[];
}
