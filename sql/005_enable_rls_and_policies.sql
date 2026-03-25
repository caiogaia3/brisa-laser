-- Script: 005_enable_rls_and_policies.sql
-- Propósito: Habilitar RLS e criar políticas seguras para TODAS as tabelas do BI

-- 1. Habilitar RLS em todas as tabelas
ALTER TABLE public.fin_dre ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.mkt_lead_audit ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.zandu_persons ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.zandu_invoices ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.zandu_appointments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.lead_memory ENABLE ROW LEVEL SECURITY;
-- mkt_performance_ads e mkt_analytics_report já estão com RLS habilitado, mas vamos garantir as policies
ALTER TABLE public.mkt_performance_ads ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.mkt_analytics_report ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.isa_lessons ENABLE ROW LEVEL SECURITY;

-- 2. Limpar políticas antigas (se existirem) para evitar conflitos
DO $$
DECLARE
    t_name text;
    p_name text;
BEGIN
    FOR t_name IN (SELECT tablename FROM pg_tables WHERE schemaname = 'public') LOOP
        FOR p_name IN (SELECT policyname FROM pg_policies WHERE schemaname = 'public' AND tablename = t_name) LOOP
            EXECUTE format('DROP POLICY IF EXISTS %I ON public.%I', p_name, t_name);
        END LOOP;
    END LOOP;
END
$$;

-- 3. Criar Políticas para a Role 'anon' (Frontend - Somente Leitura)
-- O frontend usa a chave anon para consumir os dados no Dashboard
CREATE POLICY "Anon pode ler fin_dre" ON public.fin_dre FOR SELECT TO anon USING (true);
CREATE POLICY "Anon pode ler mkt_lead_audit" ON public.mkt_lead_audit FOR SELECT TO anon USING (true);
CREATE POLICY "Anon pode ler zandu_persons" ON public.zandu_persons FOR SELECT TO anon USING (true);
CREATE POLICY "Anon pode ler zandu_invoices" ON public.zandu_invoices FOR SELECT TO anon USING (true);
CREATE POLICY "Anon pode ler zandu_appointments" ON public.zandu_appointments FOR SELECT TO anon USING (true);
CREATE POLICY "Anon pode ler mkt_performance_ads" ON public.mkt_performance_ads FOR SELECT TO anon USING (true);
CREATE POLICY "Anon pode ler mkt_analytics_report" ON public.mkt_analytics_report FOR SELECT TO anon USING (true);
-- lead_memory e isa_lessons não precisam ser lidos pelo anon (apenas IA)

-- 4. Criar Políticas para a Role 'service_role' (n8n, Edge Functions, Backend)
-- service_role tem acesso TOTAL (bypass RLS por padrão), mas declaramos aqui como boa prática para claridade
CREATE POLICY "Service Role full access fin_dre" ON public.fin_dre TO service_role USING (true) WITH CHECK (true);
CREATE POLICY "Service Role full access mkt_lead_audit" ON public.mkt_lead_audit TO service_role USING (true) WITH CHECK (true);
CREATE POLICY "Service Role full access zandu_persons" ON public.zandu_persons TO service_role USING (true) WITH CHECK (true);
CREATE POLICY "Service Role full access zandu_invoices" ON public.zandu_invoices TO service_role USING (true) WITH CHECK (true);
CREATE POLICY "Service Role full access zandu_appointments" ON public.zandu_appointments TO service_role USING (true) WITH CHECK (true);
CREATE POLICY "Service Role full access lead_memory" ON public.lead_memory TO service_role USING (true) WITH CHECK (true);
CREATE POLICY "Service Role full access isa_lessons" ON public.isa_lessons TO service_role USING (true) WITH CHECK (true);
CREATE POLICY "Service Role full access mkt_performance_ads" ON public.mkt_performance_ads TO service_role USING (true) WITH CHECK (true);
CREATE POLICY "Service Role full access mkt_analytics_report" ON public.mkt_analytics_report TO service_role USING (true) WITH CHECK (true);

-- 5. Revogar temporariamente todas as grants extras para anon (reforço de segurança)
REVOKE INSERT, UPDATE, DELETE ON ALL TABLES IN SCHEMA public FROM anon;
