import { ZanduAPI } from '../zandu-api.js';
import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

// Configurações Zandu
const zandu = new ZanduAPI({
    apiUrl: process.env.ZANDU_API_URL || 'https://api.zandu.com.br',
    apiKey: process.env.ZANDU_API_KEY || ''
});

// Configurações Supabase
const SUPABASE_URL = process.env.SUPABASE_URL || 'https://nrvazcesqvuqtlunqtnw.supabase.co/rest/v1';
const SUPABASE_KEY = process.env.SUPABASE_KEY || '';

async function pushToSupabase(table: string, data: any[]) {
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
    } catch (error: any) {
        console.error(`❌ [Supabase] Erro ao sincronizar ${table}:`, error.response?.data || error.message);
    }
}

async function runBackfill() {
    console.log('🚀 Iniciando Backfill Brisa Laser Dashboard...');

    try {
        // 1. Sincronizar Pessoas
        console.log('👥 Buscando pessoas...');
        const persons = await zandu.getPersons(200);
        const mappedPersons = persons.map(p => ({
            id: p.personId || p.id,
            full_name: p.name,
            utm_source: p.utm_source || null,
            utm_campaign: p.utm_campaign || null,
            created_at: p.createdAt || new Date().toISOString()
        }));
        await pushToSupabase('zandu_persons', mappedPersons);

        // 2. Sincronizar Faturas (Últimos 30 dias)
        console.log('💰 Buscando faturas (Invoices)...');
        const invoices = await zandu.getInvoices(200); 
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
        // O endpoint de agendamentos parece temperamental, vamos tentar o getAppointments padrão do MCP
        const appointments = await zandu.getAppointments(200);
        const mappedAppointments = appointments.map(app => ({
            id: app.appointmentId || app.id,
            person_id: app.personId,
            schedule_id: app.scheduleId,
            service_id: app.serviceId || (app.items && app.items[0]?.serviceId),
            start_time: app.start,
            status: app.status || 'agendado',
            created_at: app.createdAt || new Date().toISOString()
        }));
        await pushToSupabase('zandu_appointments', mappedAppointments);

        console.log('\n✨ Backfill concluído com sucesso!');
    } catch (error: any) {
        console.error('💥 Erro fatal no backfill:', error.message);
    }
}

runBackfill();
