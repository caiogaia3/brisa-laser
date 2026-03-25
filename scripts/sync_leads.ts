/**
 * sync_leads.ts — Sincronização Marketing Leads (Google Sheet → Supabase)
 *
 * Lê a aba CAMPANHAS da planilha "Marcação de Leads" e faz upsert
 * na tabela mkt_lead_audit do Supabase. Tenta match com zandu_persons
 * pelo telefone (últimos 8 dígitos) para preencher zandu_person_id.
 *
 * Sheet ID: 14Lxf4lJoKRFTkzGyDgNYvLzJZlLY7WUZb25YzI1cUQU (GID 551067343)
 * ~600+ leads, Jun/2025 a Mar/2026
 *
 * Uso: npx tsx scripts/sync_leads.ts
 */

import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const SUPABASE_URL = process.env.SUPABASE_URL || '';
const SUPABASE_KEY = process.env.SUPABASE_KEY || '';
const SHEET_ID = '14Lxf4lJoKRFTkzGyDgNYvLzJZlLY7WUZb25YzI1cUQU';
const SHEET_GID = '551067343';
const STORE_ID = 'brisa-matriz';

const supabaseHeaders = {
    'apikey': SUPABASE_KEY,
    'Authorization': `Bearer ${SUPABASE_KEY}`,
    'Content-Type': 'application/json',
};

function normalizePhone(phone: string): string {
    return phone.replace(/\D/g, '').slice(-8);
}

function parseDate(val: string): string | null {
    if (!val || val.trim() === '') return null;
    // Parse DD/MM/YYYY → YYYY-MM-DD
    const match = val.trim().match(/^(\d{1,2})\/(\d{1,2})\/(\d{4})$/);
    if (!match) return null;
    const day = match[1].padStart(2, '0');
    const month = match[2].padStart(2, '0');
    const year = match[3];
    return `${year}-${month}-${day}`;
}

function parseBRL(val: string): number {
    if (!val || val.trim() === '' || val.trim() === '-') return 0;
    return parseFloat(val.replace(/[R$\s.]/g, '').replace(',', '.')) || 0;
}

function parseDecimal(val: string): number | null {
    if (!val || val.trim() === '') return null;
    return parseFloat(val.replace(',', '.')) || 0;
}

function parseBool(val: string): boolean {
    return val?.trim().toLowerCase() === 'sim';
}

function parseCSV(csv: string): string[][] {
    const rows: string[][] = [];
    let current = '';
    let inQuotes = false;
    let row: string[] = [];

    for (let i = 0; i < csv.length; i++) {
        const char = csv[i];
        if (char === '"') {
            if (inQuotes && csv[i + 1] === '"') {
                current += '"';
                i++;
            } else {
                inQuotes = !inQuotes;
            }
        } else if (char === ',' && !inQuotes) {
            row.push(current);
            current = '';
        } else if ((char === '\n' || char === '\r') && !inQuotes) {
            if (char === '\r' && csv[i + 1] === '\n') i++;
            row.push(current);
            current = '';
            if (row.some(cell => cell.trim() !== '')) rows.push(row);
            row = [];
        } else {
            current += char;
        }
    }
    if (current || row.length > 0) {
        row.push(current);
        if (row.some(cell => cell.trim() !== '')) rows.push(row);
    }

    return rows;
}

async function fetchZanduPersons(): Promise<Map<string, string>> {
    // Buscar todas as pessoas do Zandu e criar mapa phone_clean → id
    const phoneMap = new Map<string, string>();
    try {
        const res = await axios.get(`${SUPABASE_URL}/zandu_persons?select=id,phone,full_name`, {
            headers: supabaseHeaders
        });
        for (const p of res.data || []) {
            if (p.phone) {
                const clean = normalizePhone(p.phone);
                if (clean.length >= 8) phoneMap.set(clean, p.id);
            }
        }
        console.log(`👥 ${phoneMap.size} pessoas do Zandu carregadas para match`);
    } catch (err: any) {
        console.error('⚠️  Erro ao buscar zandu_persons:', err.response?.data || err.message);
    }
    return phoneMap;
}

async function pushToSupabase(data: any[]) {
    if (data.length === 0) return;

    const BATCH_SIZE = 50;
    let total = 0;

    for (let i = 0; i < data.length; i += BATCH_SIZE) {
        const batch = data.slice(i, i + BATCH_SIZE);
        try {
            await axios.post(`${SUPABASE_URL}/mkt_lead_audit?on_conflict=store_id,phone_clean`, batch, {
                headers: {
                    ...supabaseHeaders,
                    'Prefer': 'resolution=merge-duplicates'
                }
            });
            total += batch.length;
        } catch (error: any) {
            console.error(`❌ [MKT] Erro batch ${i}-${i + batch.length}:`, error.response?.data || error.message);
        }
    }

    console.log(`✅ [MKT] ${total} leads sincronizados no Supabase`);
}

async function syncLeads() {
    console.log('🚀 [MKT] Iniciando sincronização Leads → Supabase...');

    // 1. Buscar CSV da planilha
    console.log('📄 Buscando dados da planilha de Marcação de Leads...');
    const url = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/gviz/tq?tqx=out:csv&gid=${SHEET_GID}`;
    const res = await axios.get(url);
    const rows = parseCSV(res.data);

    if (rows.length < 3) {
        console.error('❌ Planilha vazia ou formato inesperado');
        return;
    }

    // 2. Buscar pessoas do Zandu para match
    const zanduPhoneMap = await fetchZanduPersons();

    // 3. Processar leads (header na linha 2 = index 1, dados a partir da linha 3 = index 2)
    // Colunas: Nome(0) | ?(1) | Telefone(2) | Plataforma(3) | Data1(4) | Data2(5) | Obs(6) | QtdAreas(7) | Agendou(8) | Compareceu(9) | Receita(10)
    const records: any[] = [];
    let skipped = 0;

    for (let r = 2; r < rows.length; r++) {
        const row = rows[r];
        const nome = (row[0] || '').trim();
        const phone = (row[2] || '').trim();

        if (!nome && !phone) {
            skipped++;
            continue;
        }

        // Se não tiver telefone, cria um ID determinístico baseado no Nome e Data (para não duplicar em sincronizações futuras)
        let phoneClean = phone ? normalizePhone(phone) : null;
        if (!phoneClean || phoneClean.length < 4) {
             const dataContato = parseDate(row[4] || '') || '0000-00-00';
             const nomeLimpo = nome.replace(/[^a-zA-Z0-9]/g, '').substring(0, 10).toUpperCase();
             phoneClean = `NP_${nomeLimpo}_${dataContato}`;
        }

        const zanduPersonId = (phoneClean && !phoneClean.startsWith('NP_')) ? (zanduPhoneMap.get(phoneClean) || null) : null;

        records.push({
            store_id: STORE_ID,
            nome,
            phone_clean: phoneClean,
            zandu_person_id: zanduPersonId,
            utm_source: (row[3] || '').trim() || null,
            data_primeiro_contato: parseDate(row[4] || ''),
            data_ultimo_contato: parseDate(row[5] || ''),
            qtd_areas: parseDecimal(row[7] || ''),
            agendou: parseBool(row[8] || ''),
            compareceu: parseBool(row[9] || ''),
            receita: parseBRL(row[10] || ''),
            updated_at: new Date().toISOString()
        });
    }

    console.log(`📊 ${records.length} leads processados (${skipped} linhas vazias ignoradas)`);

    const matched = records.filter(r => r.zandu_person_id).length;
    console.log(`🔗 ${matched}/${records.length} leads com match no Zandu`);

    // 3.5 Deduplicação na Memória (Proteção contra a trava 'row a second time' do Supabase)
    const uniqueRecordsMap = new Map();
    for (const record of records) {
        if (record.phone_clean) {
            // Em caso de duplicidade exata na planilha, a última linha prevalece
            uniqueRecordsMap.set(record.phone_clean, record);
        }
    }
    const finalRecords = Array.from(uniqueRecordsMap.values());
    console.log(`🧹 Após deduplicação: ${finalRecords.length} leads únicos prontos para envio.`);

    // 4. Upsert no Supabase
    await pushToSupabase(finalRecords);

    console.log('✨ [MKT] Sincronização concluída!');
}

syncLeads().catch(err => {
    console.error('💥 Erro fatal:', err.message);
    process.exit(1);
});
