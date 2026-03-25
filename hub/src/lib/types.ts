export interface ViewMasterBI {
  period_month: string;
  store_id: string;
  receita_total: number;
  custo_total: number;
  lucro: number;
  ebitda: number;
  leads_gerados: number;
  agendamentos: number;
  comparecimentos: number;
  vendas_pdv: number;
  margem_lucro: number | null;
  taxa_agendamento: number | null;
  taxa_comparecimento: number | null;
  taxa_conversao_pdv: number | null;
  ticket_medio: number | null;
}

export interface KPI {
  title: string;
  value: string | number;
  change: number;
  prefix?: string;
  suffix?: string;
  trend: 'up' | 'down' | 'neutral';
}
