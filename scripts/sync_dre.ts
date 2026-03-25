/**
 * sync_dre.ts — Espelhamento DRE (Google Sheet → Supabase)
 *
 * Lê a aba DRE da planilha "Controle Financeiro Brisa" e faz upsert
 * na tabela fin_dre do Supabase.
 *
 * Layout: Categorias nas linhas (36), Meses nas colunas (18+)
 * Sheet ID: 15LOh89f0hS2GriYC_ay1Lq296rmwOcNYV3Yc1EXmBWs
 *
 * Uso: npx tsx scripts/sync_dre.ts
 */

import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const SUPABASE_URL = process.env.SUPABASE_URL || '';
const SUPABASE_KEY = process.env.SUPABASE_KEY || '';
const SHEET_ID = '15LOh89f0hS2GriYC_ay1Lq296rmwOcNYV3Yc1EXmBWs';
const STORE_ID = 'brisa-matriz';

// Mapeamento de line_label → category (match por startsWith)
const CATEGORY_RULES: Array<{ prefix: string; category: string }> = [
    { prefix: '(+) Vendas PIX', category: 'receita' },
    { prefix: '(+) Venda de Ativos', category: 'receita' },
    { prefix: '(+) Locacao', category: 'receita' },
    { prefix: '(+) Vendas Cart', category: 'receita' },
    { prefix: 'TOTAL RECEITA BRUTA', category: 'receita' },
    { prefix: '(-) Impostos', category: 'deducao' },
    { prefix: '(-) Estornos', category: 'deducao' },
    { prefix: '(=) RECEITA L', category: 'deducao' },
    { prefix: 'RECEITA L', category: 'deducao' },
    { prefix: '(-) Taxas de Maquininha', category: 'custo_variavel' },
    { prefix: '(-) Comiss', category: 'custo_variavel' },
    { prefix: '(-) Locação/Frete', category: 'custo_variavel' },
    { prefix: '(-) Locacao/Frete', category: 'custo_variavel' },
    { prefix: '(-) Insumos', category: 'custo_variavel' },
    { prefix: '(=) MARGEM', category: 'custo_variavel' },
    { prefix: 'MARGEM DE CONTRIBUI', category: 'custo_variavel' },
    { prefix: '(-) Aluguel', category: 'despesa_fixa' },
    { prefix: '(-) Água', category: 'despesa_fixa' },
    { prefix: '(-) Agua', category: 'despesa_fixa' },
    { prefix: '(-) Sal', category: 'despesa_fixa' },
    { prefix: '(-) Sistemas', category: 'despesa_fixa' },
    { prefix: '(-) Honor', category: 'despesa_fixa' },
    { prefix: '(-) Marketing', category: 'despesa_fixa' },
    { prefix: '(-) Manuten', category: 'despesa_fixa' },
    { prefix: '(-) Material', category: 'despesa_fixa' },
    { prefix: 'TOTAL DESPESAS FIXAS', category: 'despesa_fixa' },
    { prefix: '(-) Pró-labore', category: 'pro_labore' },
    { prefix: '(-) Pro-labore', category: 'pro_labore' },
    { prefix: '(=) LAJIDA', category: 'pro_labore' },
    { prefix: 'LAJIDA', category: 'pro_labore' },
    { prefix: '(-) Tarifas', category: 'financeiro' },
    { prefix: '(-) Juros', category: 'financeiro' },
    { prefix: '(-) Parcela', category: 'financeiro' },
    { prefix: '(-) Investimento', category: 'financeiro' },
    { prefix: '(-) Fundo', category: 'financeiro' },
    { prefix: '(=) LUCRO', category: 'financeiro' },
    { prefix: 'LUCRO LIQUIDO', category: 'financeiro' },
    { prefix: '(-) Transfer', category: 'caixa' },
    { prefix: '(-) Sa', category: 'caixa' },
    { prefix: '(=) SALDO', category: 'caixa' },
    { prefix: 'SALDO FINAL', category: 'caixa' },
];

function getCategory(label: string): string {
    const trimmed = label.trim();
    for (const rule of CATEGORY_RULES) {
        if (trimmed.startsWith(rule.prefix)) return rule.category;
    }
    return 'outros';
}

function isSubtotal(label: string): boolean {
    const trimmed = label.trim();
    return trimmed.startsWith('(=)') ||
        trimmed.startsWith('TOTAL') ||
        trimmed.startsWith('MARGEM') ||
        trimmed.startsWith('LAJIDA') ||
        trimmed.startsWith('LUCRO') ||
        trimmed.startsWith('SALDO') ||
        trimmed.startsWith('RECEITA L');
}

function parseBRL(val: string): number {
    if (!val || val.trim() === '' || val.trim() === '-') return 0;
    // Remove R$, espacos, pontos de milhar, e troca virgula por ponto
    return parseFloat(val.replace(/[R$\s.]/g, '').replace(',', '.')) || 0;
}

function parseMonthHeader(header: string): string | null {
    // Parse "MM/YYYY" → "YYYY-MM-01"
    const match = header.trim().match(/^(\d{1,2})\/(\d{4})$/);
    if (!match) return null;
    const month = match[1].padStart(2, '0');
    const year = match[2];
    return `${year}-${month}-01`;
}

async function pushToSupabase(data: any[]) {
    if (data.length === 0) return;

    // Batch em chunks de 100 para evitar payload muito grande
    const BATCH_SIZE = 100;
    let total = 0;

    for (let i = 0; i < data.length; i += BATCH_SIZE) {
        const batch = data.slice(i, i + BATCH_SIZE);
        try {
            await axios.post(`${SUPABASE_URL}/fin_dre?on_conflict=store_id,period_month,line_label`, batch, {
                headers: {
                    'apikey': SUPABASE_KEY,
                    'Authorization': `Bearer ${SUPABASE_KEY}`,
                    'Content-Type': 'application/json',
                    'Prefer': 'resolution=merge-duplicates'
                }
            });
            total += batch.length;
        } catch (error: any) {
            console.error(`❌ [Supabase] Erro batch ${i}-${i + batch.length}:`, error.response?.data || error.message);
        }
    }

    console.log(`✅ [DRE] ${total} registros sincronizados no Supabase`);
}

async function fetchSheetCSV(): Promise<string> {
    const url = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/gviz/tq?tqx=out:csv`;
    const res = await axios.get(url);
    return res.data;
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

async function syncDRE() {
    console.log('🚀 [DRE] Iniciando sincronização DRE → Supabase...');

    // 1. Buscar CSV da planilha
    console.log('📄 Buscando dados da planilha DRE...');
    const csv = await fetchSheetCSV();
    const rows = parseCSV(csv);

    if (rows.length < 2) {
        console.error('❌ Planilha vazia ou formato inesperado');
        return;
    }

    // 2. Extrair headers (meses)
    const headers = rows[0];
    const monthColumns: Array<{ index: number; date: string }> = [];

    for (let i = 2; i < headers.length; i++) {
        const date = parseMonthHeader(headers[i]);
        if (date) {
            monthColumns.push({ index: i, date });
        }
    }

    console.log(`📅 ${monthColumns.length} meses encontrados: ${monthColumns[0]?.date} → ${monthColumns[monthColumns.length - 1]?.date}`);

    // 3. Processar cada linha da DRE
    const records: any[] = [];

    for (let r = 1; r < rows.length; r++) {
        const row = rows[r];
        const lineLabel = (row[1] || '').trim();
        if (!lineLabel) continue;

        const category = getCategory(lineLabel);
        const subtotal = isSubtotal(lineLabel);

        for (const col of monthColumns) {
            const rawValue = row[col.index] || '';
            const amount = parseBRL(rawValue);

            records.push({
                store_id: STORE_ID,
                period_month: col.date,
                category,
                line_label: lineLabel,
                is_subtotal: subtotal,
                amount,
                updated_at: new Date().toISOString()
            });
        }
    }

    console.log(`📊 ${records.length} registros processados (${rows.length - 1} categorias × ${monthColumns.length} meses)`);

    // 4. Upsert no Supabase
    await pushToSupabase(records);

    console.log('✨ [DRE] Sincronização concluída!');
}

syncDRE().catch(err => {
    console.error('💥 Erro fatal:', err.message);
    process.exit(1);
});
