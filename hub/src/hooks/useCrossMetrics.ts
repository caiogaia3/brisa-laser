/**
 * useCrossMetrics — Multi-Source BI Hook
 *
 * Cruza dados consolidados de 5 fontes (via Supabase views alimentadas pelo n8n):
 *   1. Zandu Financial (Invoices)   → vw_zandu_faturamento
 *   2. Zandu Schedules              → vw_zandu_agendamentos
 *   3. Leads Spreadsheet            → vw_leads_sheet
 *   4. Google Ads + Meta Ads        → vw_ads_performance
 *   5. Google Analytics 4           → vw_ga4_sessions
 *
 * Todas essas views são alimentadas por workflows n8n que sincronizam
 * os dados periodicamente no Supabase.
 */

import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { usePeriodStore } from '../store/usePeriodStore';

// ===== Types =====

export interface CrossMetrics {
  // Financial (Zandu)
  faturamento_total: number;
  ticket_medio: number;
  total_invoices: number;

  // Schedules (Zandu)
  agendamentos_total: number;
  comparecimentos: number;
  taxa_comparecimento: number;
  faltas: number;

  // Leads (Spreadsheet)
  leads_gerados: number;
  leads_agendados: number;
  leads_by_source: Record<string, number>;

  // Ads Performance
  investimento_google: number;
  investimento_meta: number;
  investimento_total: number;
  conversoes_ads: number;
  cpl: number;
  roas: number;

  // Analytics (GA4)
  sessoes_site: number;
  taxa_conversao_site: number;

  // Computed
  cac: number;
  ltv_estimado: number;
}

const EMPTY_METRICS: CrossMetrics = {
  faturamento_total: 0,
  ticket_medio: 0,
  total_invoices: 0,
  agendamentos_total: 0,
  comparecimentos: 0,
  taxa_comparecimento: 0,
  faltas: 0,
  leads_gerados: 0,
  leads_agendados: 0,
  leads_by_source: {},
  investimento_google: 0,
  investimento_meta: 0,
  investimento_total: 0,
  conversoes_ads: 0,
  cpl: 0,
  roas: 0,
  sessoes_site: 0,
  taxa_conversao_site: 0,
  cac: 0,
  ltv_estimado: 0,
};

export function useCrossMetrics() {
  const [loading, setLoading] = useState(true);
  const [metrics, setMetrics] = useState<CrossMetrics>(EMPTY_METRICS);
  const [error, setError] = useState<string | null>(null);
  const { startDate, endDate, storeId } = usePeriodStore();

  useEffect(() => {
    let cancelled = false;

    async function fetchAll() {
      setLoading(true);
      setError(null);

      const from = startDate.toISOString().split('T')[0];
      const to = endDate.toISOString().split('T')[0];

      try {
        let fatQuery = supabase.from('vw_zandu_faturamento').select('*').gte('periodo', from).lte('periodo', to);
        let agendQuery = supabase.from('vw_zandu_agendamentos').select('*').gte('periodo', from).lte('periodo', to);
        let leadsQuery = supabase.from('vw_leads_sheet').select('*').gte('periodo', from).lte('periodo', to);
        let adsQuery = supabase.from('vw_ads_performance').select('*').gte('periodo', from).lte('periodo', to);
        let ga4Query = supabase.from('vw_ga4_sessions').select('*').gte('periodo', from).lte('periodo', to);

        if (storeId !== 'all') {
          fatQuery = fatQuery.eq('store_id', storeId);
          agendQuery = agendQuery.eq('store_id', storeId);
          leadsQuery = leadsQuery.eq('store_id', storeId);
          adsQuery = adsQuery.eq('store_id', storeId);
          ga4Query = ga4Query.eq('store_id', storeId);
        }

        // All queries run in parallel — each one is independent
        const [
          zanduFatRes,
          zanduAgendRes,
          leadsRes,
          adsRes,
          ga4Res,
        ] = await Promise.allSettled([
          fatQuery.maybeSingle(),
          agendQuery.maybeSingle(),
          leadsQuery.maybeSingle(),
          adsQuery.maybeSingle(),
          ga4Query.maybeSingle(),
        ]);

        if (cancelled) return;

        const zFat = zanduFatRes.status === 'fulfilled' ? zanduFatRes.value.data : null;
        const zAgend = zanduAgendRes.status === 'fulfilled' ? zanduAgendRes.value.data : null;
        const leads = leadsRes.status === 'fulfilled' ? leadsRes.value.data : null;
        const ads = adsRes.status === 'fulfilled' ? adsRes.value.data : null;
        const ga4 = ga4Res.status === 'fulfilled' ? ga4Res.value.data : null;

        // ===== Consolidation =====
        const faturamento_total = zFat?.faturamento_total ?? 0;
        const total_invoices = zFat?.total_invoices ?? 0;
        const ticket_medio = total_invoices > 0 ? faturamento_total / total_invoices : 0;

        const agendamentos_total = zAgend?.agendamentos_total ?? 0;
        const comparecimentos = zAgend?.comparecimentos ?? 0;
        const taxa_comparecimento = agendamentos_total > 0 ? (comparecimentos / agendamentos_total) * 100 : 0;
        const faltas = agendamentos_total - comparecimentos;

        const leads_gerados = leads?.leads_gerados ?? 0;
        const leads_agendados = leads?.leads_agendados ?? 0;
        const leads_by_source = leads?.leads_by_source ?? {};

        const investimento_google = ads?.investimento_google ?? 0;
        const investimento_meta = ads?.investimento_meta ?? 0;
        const investimento_total = investimento_google + investimento_meta;
        const conversoes_ads = ads?.conversoes ?? 0;
        const cpl = leads_gerados > 0 ? investimento_total / leads_gerados : 0;
        const roas = investimento_total > 0 ? faturamento_total / investimento_total : 0;

        const sessoes_site = ga4?.sessoes ?? 0;
        const taxa_conversao_site = sessoes_site > 0 ? (conversoes_ads / sessoes_site) * 100 : 0;

        // CAC = Investimento Total / Clientes convertidos (comparecimentos)
        const cac = comparecimentos > 0 ? investimento_total / comparecimentos : 0;
        // LTV estimado = Ticket Médio × Frequência estimada (6 sessões/ano)
        const ltv_estimado = ticket_medio * 6;

        setMetrics({
          faturamento_total,
          ticket_medio,
          total_invoices,
          agendamentos_total,
          comparecimentos,
          taxa_comparecimento,
          faltas,
          leads_gerados,
          leads_agendados,
          leads_by_source,
          investimento_google,
          investimento_meta,
          investimento_total,
          conversoes_ads,
          cpl,
          roas,
          sessoes_site,
          taxa_conversao_site,
          cac,
          ltv_estimado,
        });
      } catch (err: any) {
        console.error('[useCrossMetrics] Erro:', err);
        if (!cancelled) setError(err.message);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    fetchAll();
    return () => { cancelled = true; };
  }, [startDate, endDate]);

  return { loading, metrics, error };
}
