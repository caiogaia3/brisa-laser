const fs = require('fs');
const axios = require('axios');
require('dotenv').config();

// Configurações Supabase
const SUPABASE_URL = process.env.SUPABASE_URL || 'https://nrvazcesqvuqtlunqtnw.supabase.co/rest/v1';
const SUPABASE_KEY = process.env.SUPABASE_KEY || '';

function normalizePhone(phone) {
    return phone.replace(/\D/g, '').slice(-8); // Compara os últimos 8 dígitos para evitar erros de 55/DDD
}

async function run() {
    console.log('🔍 Iniciando Mapeamento de UTMs (Spreadsheet -> Supabase)...');

    // 1. Ler CSV
    const csvData = fs.readFileSync('scripts/campanhas.csv', 'utf-8');
    const lines = csvData.split('\n').slice(2); // Pula cabeçalhos

    const spreadsheetData = lines.map(line => {
        const parts = line.split(',');
        if (parts.length < 4) return null;
        return {
            name: parts[0]?.trim(),
            phone: parts[2]?.trim(),
            plataforma: parts[3]?.trim()
        };
    }).filter(x => x && x.plataforma);

    // 2. Buscar Pessoas do Supabase
    const res = await axios.get(`${SUPABASE_URL}/zandu_persons`, {
        headers: { 'apikey': SUPABASE_KEY, 'Authorization': `Bearer ${SUPABASE_KEY}` }
    });
    const supabasePersons = res.data;

    console.log(`📊 Processando ${spreadsheetData.length} leads da planilha e ${supabasePersons.length} no Supabase...`);

    let updates = 0;
    for (const p of supabasePersons) {
        // Tentar match por telefone primeiro
        const normP = normalizePhone(p.phone || '');
        let match = spreadsheetData.find(s => s.phone && normalizePhone(s.phone) === normP);

        // Fallback match por nome
        if (!match) {
            match = spreadsheetData.find(s => s.name && s.name.toLowerCase() === p.full_name?.toLowerCase());
        }

        if (match) {
            // Atualizar no Supabase
            try {
                await axios.patch(`${SUPABASE_URL}/zandu_persons?id=eq.${p.id}`, {
                    utm_source: match.plataforma
                }, {
                    headers: { 
                        'apikey': SUPABASE_KEY, 
                        'Authorization': `Bearer ${SUPABASE_KEY}`,
                        'Content-Type': 'application/json'
                    }
                });
                updates++;
            } catch (err) {
                // Silencioso
            }
        }
    }

    console.log(`✅ Mapeamento concluído! ${updates} pessoas atualizadas com UTMs.`);
}

run().catch(e => console.error(e));
