import axios from 'axios';

const N8N_URL = 'https://n8n.grooway.com.br/api/v1';
const API_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJmNzg3YjIzMy0xNzNlLTQxNWUtYjAyMy0wNDY2ZjA0MmU2MmQiLCJpc3MiOiJuOG4iLCJhdWQiOiJwdWJsaWMtYXBpIiwiaWF0IjoxNzczMjcyMzk4fQ.KKvKlVIjW8BuKY-TqwfeIGmoqwtoR-darRzMwMvJsqk';
const SUPABASE_KEY = 'sb_publishable_KOMRCO0RBEMJndWtzMXdnA_7JpjjEbh';

const dreJsCode = `const CATEGORY_RULES = [
    { prefix: '(+) Vendas PIX', category: 'receita' },
    { prefix: '(+) Venda de Ativos', category: 'receita' },
    { prefix: '(+) Locacao', category: 'receita' },
    { prefix: '(+) Vendas Cart', category: 'receita' },
    { prefix: 'TOTAL RECEITA BRUTA', category: 'receita' },
    { prefix: '(-) Impostos', category: 'deducao' },
    { prefix: '(-) Estornos', category: 'deducao' },
    { prefix: 'RECEITA L', category: 'deducao' },
    { prefix: '(-) Taxas', category: 'custo_variavel' },
    { prefix: '(-) Comiss', category: 'custo_variavel' },
    { prefix: '(-) Locação', category: 'custo_variavel' },
    { prefix: '(-) Insumos', category: 'custo_variavel' },
    { prefix: 'MARGEM DE CONTRIBUI', category: 'custo_variavel' },
    { prefix: '(-) Aluguel', category: 'despesa_fixa' },
    { prefix: '(-) Água', category: 'despesa_fixa' },
    { prefix: '(-) Sal', category: 'despesa_fixa' },
    { prefix: '(-) Sistemas', category: 'despesa_fixa' },
    { prefix: '(-) Honor', category: 'despesa_fixa' },
    { prefix: '(-) Marketing', category: 'despesa_fixa' },
    { prefix: '(-) Manuten', category: 'despesa_fixa' },
    { prefix: '(-) Material', category: 'despesa_fixa' },
    { prefix: 'TOTAL DESPESAS FIXAS', category: 'despesa_fixa' },
    { prefix: '(-) Pró-labore', category: 'pro_labore' },
    { prefix: 'LAJIDA', category: 'pro_labore' },
    { prefix: '(-) Tarifas', category: 'financeiro' },
    { prefix: '(-) Juros', category: 'financeiro' },
    { prefix: '(-) Parcela', category: 'financeiro' },
    { prefix: '(-) Investimento', category: 'financeiro' },
    { prefix: '(-) Fundo', category: 'financeiro' },
    { prefix: 'LUCRO LÍQUIDO', category: 'financeiro' },
    { prefix: '(-) Transfer', category: 'caixa' },
    { prefix: '(-) Saída', category: 'caixa' },
    { prefix: 'SALDO FINAL', category: 'caixa' },
];

function getCategory(label) {
    const trimmed = label.trim();
    for (const rule of CATEGORY_RULES) {
        if (trimmed.startsWith(rule.prefix)) return rule.category;
    }
    return 'outros';
}

function isSubtotal(label) {
    const t = label.trim();
    return t.startsWith('(=)') || t.startsWith('TOTAL') || t.startsWith('MARGEM') || t.startsWith('LAJIDA') || t.startsWith('LUCRO') || t.startsWith('SALDO') || t.startsWith('RECEITA L');
}

function parseBRL(val) {
    if (!val || typeof val !== 'string') return typeof val === 'number' ? val : 0;
    return parseFloat(val.replace(/[R$\\s.]/g, '').replace(',', '.')) || 0;
}

const results = [];
const items = $input.all();
if (items.length === 0) return [];

const headers = Object.keys(items[0].json);
const months = headers.filter(h => h.includes('/20'));

for (const item of items) {
    const label = item.json[headers[1]];
    if (!label || label === '1') continue;

    const category = getCategory(label);
    const subtotal = isSubtotal(label);

    for (const month of months) {
        const [m, y] = month.split('/');
        const date = y + '-' + m.padStart(2, '0') + '-01';
        
        results.push({
            json: {
                store_id: 'brisa-matriz',
                period_month: date,
                category,
                line_label: label,
                is_subtotal: subtotal,
                amount: parseBRL(item.json[month]),
                updated_at: new Date().toISOString()
            }
        });
    }
}

return results;`;

const leadsJsCode = `const zanduPersons = $node["Fetch Zandu Persons"].json();
const phoneMap = new Map();

function normalizePhone(phone) {
    if (!phone) return null;
    return String(phone).replace(/\\D/g, '').slice(-8);
}

zanduPersons.forEach(p => {
    if (p.phone) {
        const clean = normalizePhone(p.phone);
        if (clean.length >= 8) phoneMap.set(clean, p.id);
    }
});

const leads = $input.all();
const results = [];

for (const lead of leads) {
    const row = lead.json;
    const nome = row['Nome'];
    const phone = row['Telefone'];
    
    if (!nome && !phone) continue;

    const phoneClean = normalizePhone(phone);
    const zanduPersonId = phoneClean ? phoneMap.get(phoneClean) : null;

    results.push({
        json: {
            store_id: 'brisa-matriz',
            nome: nome || 'Sem Nome',
            phone_clean: phoneClean,
            zandu_person_id: zanduPersonId,
            utm_source: row['Plataforma'],
            data_primeiro_contato: row['Data Primeiro Contato'],
            agendou: row['Agendou'] === 'Sim',
            compareceu: row['Compareceu'] === 'Sim',
            receita: row['Receita'] ? parseFloat(String(row['Receita']).replace(/[R$\\s.]/g, '').replace(',', '.')) : 0,
            updated_at: new Date().toISOString()
        }
    });
}

return results;`;

const dreWorkflow = {
  name: "[Brisa] Sincronização Diária DRE (API)",
  nodes: [
    { parameters: { rule: { interval: [{ field: "hour", value: 6 }] } }, id: "trigger", name: "Schedule Trigger", type: "n8n-nodes-base.scheduleTrigger", typeVersion: 1, position: [400, 300] },
    { parameters: { operation: "read", documentId: "15LOh89f0hS2GriYC_ay1Lq296rmwOcNYV3Yc1EXmBWs", sheetName: "DRE", options: {} }, id: "read_sheet", name: "Google Sheets", type: "n8n-nodes-base.googleSheets", typeVersion: 4.5, position: [600, 300], credentials: { googleSheetsOAuth2Api: { id: "UjCbXnN1VkFY6mjA" } } },
    { parameters: { jsCode: dreJsCode }, id: "parser", name: "Format JSON", type: "n8n-nodes-base.code", typeVersion: 2, position: [814, 300] },
    { parameters: { method: "POST", url: "https://nrvazcesqvuqtlunqtnw.supabase.co/rest/v1/fin_dre?on_conflict=store_id,period_month,line_label", sendHeaders: true, headerParameters: { parameters: [{ name: "Prefer", value: "resolution=merge-duplicates" }, { name: "apikey", value: SUPABASE_KEY }, { name: "Authorization", value: `Bearer ${SUPABASE_KEY}` }] }, sendBody: true, bodyParameters: { parameters: [] }, options: {} }, id: "upsert_supabase", name: "HTTP Request", type: "n8n-nodes-base.httpRequest", typeVersion: 4.1, position: [1034, 300] }
  ],
  connections: {
    "Schedule Trigger": { main: [[{ node: "Google Sheets", type: "main", index: 0 }]] },
    "Google Sheets": { main: [[{ node: "Format JSON", type: "main", index: 0 }]] },
    "Format JSON": { main: [[{ node: "HTTP Request", type: "main", index: 0 }]] }
  },
  settings: {}
};

const leadsWorkflow = {
  name: "[Brisa] Sincronização Diária Leads (API)",
  nodes: [
    { parameters: { rule: { interval: [{ field: "hour", value: 6, minute: 30 }] } }, id: "trigger", name: "Schedule Trigger", type: "n8n-nodes-base.scheduleTrigger", typeVersion: 1, position: [340, 300] },
    { parameters: { url: "https://nrvazcesqvuqtlunqtnw.supabase.co/rest/v1/zandu_persons?select=id,phone", sendHeaders: true, headerParameters: { parameters: [{ name: "apikey", value: SUPABASE_KEY }, { name: "Authorization", value: `Bearer ${SUPABASE_KEY}` }] }, options: {} }, id: "fetch_zandu", name: "Fetch Zandu Persons", type: "n8n-nodes-base.httpRequest", typeVersion: 4.1, position: [540, 300] },
    { parameters: { operation: "read", documentId: "14Lxf4lJoKRFTkzGyDgNYvLzJZlLY7WUZb25YzI1cUQU", sheetName: "CAMPANHAS", options: {} }, id: "read_sheet", name: "Google Sheets", type: "n8n-nodes-base.googleSheets", typeVersion: 4.5, position: [760, 300], credentials: { googleSheetsOAuth2Api: { id: "UjCbXnN1VkFY6mjA" } } },
    { parameters: { jsCode: leadsJsCode }, id: "matcher", name: "Lead Matcher", type: "n8n-nodes-base.code", typeVersion: 2, position: [980, 300] },
    { parameters: { method: "POST", url: "https://nrvazcesqvuqtlunqtnw.supabase.co/rest/v1/mkt_lead_audit?on_conflict=store_id,phone_clean", sendHeaders: true, headerParameters: { parameters: [{ name: "Prefer", value: "resolution=merge-duplicates" }, { name: "apikey", value: SUPABASE_KEY }, { name: "Authorization", value: `Bearer ${SUPABASE_KEY}` }] }, sendBody: true, bodyParameters: { parameters: [] }, options: {} }, id: "upsert_supabase", name: "HTTP Request", type: "n8n-nodes-base.httpRequest", typeVersion: 4.1, position: [1200, 300] }
  ],
  connections: {
    "Schedule Trigger": { main: [[{ node: "Fetch Zandu Persons", type: "main", index: 0 }]] },
    "Fetch Zandu Persons": { main: [[{ node: "Google Sheets", type: "main", index: 0 }]] },
    "Google Sheets": { main: [[{ node: "Lead Matcher", type: "main", index: 0 }]] },
    "Lead Matcher": { main: [[{ node: "HTTP Request", type: "main", index: 0 }]] }
  },
  settings: {}
};

async function deploy() {
  try {
    console.log('🚀 Iniciando deploy no n8n...');
    
    const res1 = await axios.post(`${N8N_URL}/workflows`, dreWorkflow, { headers: { 'X-N8N-API-KEY': API_KEY } });
    console.log(`✅ Workflow DRE criado: ${res1.data.id}`);

    const res2 = await axios.post(`${N8N_URL}/workflows`, leadsWorkflow, { headers: { 'X-N8N-API-KEY': API_KEY } });
    console.log(`✅ Workflow Leads criado: ${res2.data.id}`);

    console.log('\n✨ Deploy concluído com sucesso!');
  } catch (error: any) {
    console.error('❌ Erro no deploy:', error.response?.data || error.message);
  }
}

deploy();
