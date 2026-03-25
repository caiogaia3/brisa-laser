const axios = require('axios');
require('dotenv').config();

// Configurações Zandu
const ZANDU_API_KEY = process.env.ZANDU_API_KEY || '';
const ZANDU_API_URL = process.env.ZANDU_API_URL || 'https://api.zandu.com.br';

// Configurações Supabase
const SUPABASE_URL = process.env.SUPABASE_URL || 'https://nrvazcesqvuqtlunqtnw.supabase.co/rest/v1';
const SUPABASE_KEY = process.env.SUPABASE_KEY || '';

async function pushToSupabase(table, data) {
    if (data.length === 0) return;
    try {
        await axios.post(`${SUPABASE_URL}/${table}`, data, {
            headers: {
                'apikey': SUPABASE_KEY,
                'Authorization': `Bearer ${SUPABASE_KEY}`,
                'Content-Type': 'application/json',
                'Prefer': 'resolution=merge-duplicates'
            }
        });
        console.log(`✅ [Supabase] ${data.length} registros sincronizados em ${table}`);
    } catch (error) {
        console.error(`❌ [Supabase] Erro ao sincronizar ${table}:`, error.response?.data || error.message);
    }
}

async function runBackfill() {
    console.log('🚀 Iniciando Backfill Brisa Laser Dashboard (JS Mode)...');

    const headers = { 'Authorization': `Bearer ${ZANDU_API_KEY}`, 'Content-Type': 'application/json' };

    try {
        // 1. Sincronizar Pessoas
        console.log('👥 Buscando pessoas...');
        const resPersons = await axios.get(`${ZANDU_API_URL}/persons?limit=100`, { headers });
        const persons = resPersons.data?.data || resPersons.data || [];
        const mappedPersons = persons.map(p => ({
            id: p.personId || p.id,
            full_name: p.name,
            utm_source: p.utm_source || null,
            utm_campaign: p.utm_campaign || null,
            created_at: p.createdAt || new Date().toISOString()
        }));
        await pushToSupabase('zandu_persons', mappedPersons);

        // 2. Sincronizar Faturas
        console.log('💰 Buscando faturas...');
        const resInvoices = await axios.get(`${ZANDU_API_URL}/invoices?limit=100`, { headers });
        const invoices = resInvoices.data?.data || resInvoices.data || [];
        const mappedInvoices = invoices.map(inv => ({
            id: inv.invoiceId || inv.id,
            person_id: inv.personId,
            appointment_id: inv.appointmentId || null,
            status: inv.status,
            amount: inv.total,
            issued_at: inv.createdAt
        }));
        await pushToSupabase('zandu_invoices', mappedInvoices);

        // 3. Sincronizar Agendamentos
        console.log('📅 Buscando agendamentos...');
        const fromDate = '2026-03-01T00:00:00.000Z';
        const toDate = '2026-03-31T23:59:59.000Z';
        const resApp = await axios.get(`${ZANDU_API_URL}/schedulers/appointments?from=${fromDate}&to=${toDate}`, { headers }).catch(e => {
            console.error('⚠️  get_appointments falhou:', e.response?.data || e.message);
            return { data: [] };
        });

        const appointments = resApp.data?.data || resApp.data || [];
        const mappedAppointments = appointments.map(app => ({
            id: app.appointmentId || app.id,
            person_id: app.personId,
            schedule_id: app.scheduleId,
            service_id: app.serviceId || (app.items && app.items[0]?.serviceId),
            start_time: app.start,
            status: app.status || 'agendado',
            created_at: app.createdAt || new Date().toISOString()
        }));
        if (mappedAppointments.length > 0) {
            await pushToSupabase('zandu_appointments', mappedAppointments);
        }

        console.log('\n✨ Backfill concluído com sucesso!');
    } catch (error) {
        console.error('💥 Erro fatal no backfill:', error.response?.data || error.message);
    }
}

runBackfill();
