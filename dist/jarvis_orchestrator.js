import { KommoAPI } from './Kommo-MCP/src/kommo-api';
import { ZanduAPI } from './zandu-api';
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config();
// ===== ENUMS: Mapeamento de Status do Pipeline Brisa Laser =====
/**
 * IDs reais de status do pipeline "Funil de Vendas" (ID: 11572307) no Kommo.
 * Mapeados via `jarvis discover` em 2026-03-12.
 */
var KommoStatuses;
(function (KommoStatuses) {
    // Funil de Vendas (Pipeline Principal)
    KommoStatuses[KommoStatuses["INCOMING_LEADS"] = 88869699] = "INCOMING_LEADS";
    KommoStatuses[KommoStatuses["STANDBY"] = 92635643] = "STANDBY";
    KommoStatuses[KommoStatuses["CARTEIRA_CLIENTES"] = 93041147] = "CARTEIRA_CLIENTES";
    KommoStatuses[KommoStatuses["FOLLOW_UP"] = 92632047] = "FOLLOW_UP";
    KommoStatuses[KommoStatuses["QUALIFICACAO"] = 88915883] = "QUALIFICACAO";
    KommoStatuses[KommoStatuses["AGENDADO"] = 88915887] = "AGENDADO";
    KommoStatuses[KommoStatuses["CONFIRMADO"] = 92682023] = "CONFIRMADO";
    KommoStatuses[KommoStatuses["GANHO"] = 142] = "GANHO";
    KommoStatuses[KommoStatuses["PERDIDO"] = 143] = "PERDIDO";
})(KommoStatuses || (KommoStatuses = {}));
/** ID do pipeline principal */
const PIPELINE_VENDAS_ID = 11572307;
/**
 * Tags que indicam intenção de agendamento no Kommo.
 */
const APPOINTMENT_INTENT_TAGS = [
    'agendamento',
    'agendar',
    'consulta',
    'avaliação',
    'sessão',
    'procedimento',
];
// ===== JARVIS ORCHESTRATOR 4.0 =====
/**
 * JARVIS ORCHESTRATOR 4.0
 * Padrão Supervisor para coordenação multi-agente na Brisa Laser.
 *
 * Fluxo principal (workflow /genesis):
 * 1. Recebe lead do Kommo
 * 2. Analisa intenção (tags, status, contexto)
 * 3. Se precisa agendar → sincroniza com Zandu
 * 4. Registra auditoria em audit_logs.md
 */
class JarvisOrchestrator {
    kommo;
    zandu;
    auditLogPath;
    constructor() {
        // Inicializar Kommo API
        this.kommo = new KommoAPI({
            baseUrl: process.env.KOMMO_BASE_URL || '',
            accessToken: process.env.KOMMO_ACCESS_TOKEN || '',
        });
        // Inicializar Zandu API
        this.zandu = new ZanduAPI({
            apiUrl: process.env.ZANDU_API_URL || 'https://api.zandu.com.br',
            apiKey: process.env.ZANDU_API_KEY || '',
        });
        // Caminho para o arquivo de auditoria
        this.auditLogPath = path.resolve(__dirname, 'audit_logs.md');
    }
    // ===== FLUXO PRINCIPAL: /genesis =====
    /**
     * Processa um novo lead — workflow /genesis completo.
     * Orquestra Kommo (qualificação) e Zandu (agendamento).
     */
    async handleNewLead(leadId) {
        const result = {
            success: false,
            leadId,
            actions: [],
            errors: [],
        };
        try {
            console.log(`\n🧠 [Jarvis] Iniciando processamento do lead #${leadId}...`);
            // 1. Agente Comercial: Buscar e analisar o lead no Kommo
            const lead = await this.kommo.getLead(leadId);
            console.log(`💼 [Comercial] Lead encontrado: "${lead.name}" (status: ${lead.status_id})`);
            result.actions.push(`Lead "${lead.name}" recuperado do Kommo`);
            // 2. Supervisor: Analisar intenção do lead
            const intent = this.analyzeLeadIntent(lead);
            console.log(`🎯 [Jarvis] Intenção: ${intent.reason} (confiança: ${intent.confidence})`);
            result.actions.push(`Intenção analisada: ${intent.reason}`);
            // 3. Se precisa de agendamento → Agente de Agendamento
            if (intent.needsAppointment) {
                console.log(`📅 [Jarvis] Encaminhando para Agente de Agendamento...`);
                const syncResult = await this.syncLeadToZandu(lead);
                if (syncResult.success) {
                    result.actions.push(`Sincronizado com Zandu: ${syncResult.message}`);
                    // Mover lead no pipeline do Kommo para "Agendado"
                    try {
                        await this.kommo.moveLeadToStatus(leadId, KommoStatuses.AGENDADO);
                        result.actions.push(`Lead movido para status "Agendado" no Kommo`);
                    }
                    catch (moveErr) {
                        result.errors.push(`Falha ao mover lead no Kommo: ${moveErr.message}`);
                    }
                }
                else {
                    result.errors.push(`Sincronização Zandu falhou: ${syncResult.message}`);
                }
            }
            else {
                console.log(`ℹ️  [Jarvis] Lead não precisa de agendamento neste momento.`);
                result.actions.push('Nenhuma ação de agendamento necessária');
            }
            // 4. Auditoria: Registrar tudo
            await this.logAudit('Jarvis', 'Processamento /genesis', result.errors.length === 0 ? 'Sucesso' : 'Parcial', `Lead #${leadId} "${lead.name}" — ${result.actions.join('; ')}`);
            result.success = result.errors.length === 0;
        }
        catch (error) {
            const errMsg = `Erro fatal no processamento do lead #${leadId}: ${error.message}`;
            console.error(`❌ [Jarvis] ${errMsg}`);
            result.errors.push(errMsg);
            await this.logAudit('Jarvis', 'Erro /genesis', 'Falha', errMsg);
        }
        return result;
    }
    // ===== LÓGICA DE DECISÃO: Análise de Intenção =====
    /**
     * Analisa o lead para decidir se precisa de agendamento.
     * Critérios: tags, status no pipeline, e contexto do lead.
     */
    analyzeLeadIntent(lead) {
        // Critério 1: Status no pipeline indica agendamento pendente
        if (lead.status_id === KommoStatuses.FOLLOW_UP) {
            return {
                needsAppointment: true,
                confidence: 'high',
                reason: 'Status do lead é "Agendamento Pendente"',
            };
        }
        // Critério 2: Tags indicam intenção de agendamento
        const leadTags = (lead.tags || []).map((t) => (typeof t === 'string' ? t : t.name || '').toLowerCase());
        const matchingTags = leadTags.filter((tag) => APPOINTMENT_INTENT_TAGS.some((intent) => tag.includes(intent)));
        if (matchingTags.length > 0) {
            return {
                needsAppointment: true,
                confidence: matchingTags.length > 1 ? 'high' : 'medium',
                reason: `Tags de intenção encontradas: ${matchingTags.join(', ')}`,
            };
        }
        // Critério 3: Lead já qualificado mas sem agendamento
        if (lead.status_id === KommoStatuses.QUALIFICACAO) {
            return {
                needsAppointment: false,
                confidence: 'low',
                reason: 'Lead qualificado, aguardando sinal de agendamento',
            };
        }
        // Default: Sem necessidade de agendamento
        return {
            needsAppointment: false,
            confidence: 'medium',
            reason: 'Nenhum sinal de intenção de agendamento detectado',
        };
    }
    // ===== SINCRONIZAÇÃO: Kommo → Zandu =====
    /**
     * Sincroniza um lead do Kommo com o Zandu.
     * Busca o contato pelo telefone e prepara para agendamento.
     */
    async syncLeadToZandu(lead) {
        try {
            // 1. Extrair telefone do contato vinculado ao lead
            const phone = await this.extractLeadPhone(lead);
            if (!phone) {
                return {
                    success: false,
                    message: 'Nenhum telefone encontrado nos contatos do lead',
                };
            }
            console.log(`📞 [Agendamento] Telefone encontrado: ${phone}`);
            // 2. Buscar pessoa correspondente no Zandu
            const zanduPerson = await this.zandu.findPersonByPhone(phone);
            if (zanduPerson) {
                console.log(`✅ [Agendamento] Pessoa encontrada no Zandu: ${zanduPerson.name} (${zanduPerson.id})`);
                return {
                    success: true,
                    message: `Pessoa "${zanduPerson.name}" localizada no Zandu (ID: ${zanduPerson.id}). Pronto para agendamento.`,
                };
            }
            else {
                console.log(`⚠️  [Agendamento] Pessoa não encontrada no Zandu. Cadastro manual necessário.`);
                return {
                    success: false,
                    message: `Pessoa com telefone ${phone} não encontrada no Zandu. Necessário cadastro manual.`,
                };
            }
        }
        catch (error) {
            return {
                success: false,
                message: `Erro na sincronização: ${error.message}`,
            };
        }
    }
    /**
     * Extrai o telefone do primeiro contato vinculado ao lead.
     */
    async extractLeadPhone(lead) {
        try {
            // Se o lead tem contatos embutidos
            if (lead.contacts && lead.contacts.length > 0) {
                const contactId = typeof lead.contacts[0] === 'object'
                    ? lead.contacts[0].id
                    : lead.contacts[0];
                const contact = await this.kommo.getContact(contactId);
                // Buscar campo de telefone nos custom_fields_values
                if (contact.custom_fields_values) {
                    for (const field of contact.custom_fields_values) {
                        if (field.field_code === 'PHONE' ||
                            field.field_name?.toLowerCase().includes('telefone') ||
                            field.field_name?.toLowerCase().includes('phone')) {
                            const phoneValue = field.values?.[0]?.value;
                            if (phoneValue)
                                return phoneValue;
                        }
                    }
                }
            }
            return null;
        }
        catch (error) {
            console.error(`[Jarvis] Erro ao extrair telefone do lead: ${error.message}`);
            return null;
        }
    }
    // ===== AUDITORIA: Gravação em audit_logs.md =====
    /**
     * Registra uma entrada de auditoria no arquivo audit_logs.md.
     * Formato: linha de tabela markdown.
     */
    async logAudit(agent, action, result, observation) {
        const now = new Date();
        const time = now.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
        const logLine = `| ${time} | ${agent} | ${action} | ${result} | ${observation} |\n`;
        try {
            // Verificar se o arquivo existe
            if (!fs.existsSync(this.auditLogPath)) {
                // Criar arquivo com cabeçalho se não existir
                const header = [
                    `# 📔 Brisa Laser: Auditoria e Logs de Inteligência\n\n`,
                    `## 📅 Log de Atividades\n\n`,
                    `| Horário | Agente | Ação | Resultado | Observação |\n`,
                    `| :--- | :--- | :--- | :--- | :--- |\n`,
                ].join('');
                fs.writeFileSync(this.auditLogPath, header);
            }
            // Ler conteúdo atual
            let content = fs.readFileSync(this.auditLogPath, 'utf-8');
            // Encontrar a última linha da tabela e inserir antes da seção "Notas de Auditoria"
            const notasIndex = content.indexOf('## 🛡️ Notas de Auditoria');
            if (notasIndex !== -1) {
                // Inserir antes da seção de notas
                content = content.slice(0, notasIndex) + logLine + '\n' + content.slice(notasIndex);
            }
            else {
                // Inserir no final
                content += logLine;
            }
            fs.writeFileSync(this.auditLogPath, content);
            console.log(`📝 [Audit] ${time} | ${agent} | ${action} | ${result}`);
        }
        catch (error) {
            console.error(`[Audit] Falha ao gravar log: ${error.message}`);
        }
    }
    // ===== UTILITÁRIOS =====
    /**
     * Teste de conectividade com ambas as APIs.
     * Retorna status de cada conexão.
     */
    async healthCheck() {
        const status = { kommo: false, zandu: false };
        try {
            await this.kommo.getAccount();
            status.kommo = true;
            console.log('✅ [HealthCheck] Kommo API: Conectado');
        }
        catch (e) {
            console.error('❌ [HealthCheck] Kommo API: Falha -', e.message);
        }
        try {
            await this.zandu.getPersons(1);
            status.zandu = true;
            console.log('✅ [HealthCheck] Zandu API: Conectado');
        }
        catch (e) {
            console.error('❌ [HealthCheck] Zandu API: Falha -', e.message);
        }
        return status;
    }
    /**
     * Mapeia os status reais do pipeline.
     * Use esta função para descobrir os IDs corretos de cada status.
     */
    async discoverPipelineStatuses() {
        try {
            const pipelines = await this.kommo.getPipelines();
            console.log('\n📋 [Jarvis] Pipelines encontrados:\n');
            for (const pipeline of pipelines._embedded.pipelines) {
                console.log(`  Pipeline: "${pipeline.name}" (ID: ${pipeline.id})`);
                try {
                    const statuses = await this.kommo.getLeadStatuses(pipeline.id);
                    for (const status of statuses._embedded.statuses) {
                        console.log(`    └─ Status: "${status.name}" (ID: ${status.id}) [cor: ${status.color}]`);
                    }
                }
                catch (e) {
                    console.log(`    └─ Erro ao buscar status: ${e.message}`);
                }
            }
        }
        catch (e) {
            console.error(`[Jarvis] Erro ao descobrir pipelines: ${e.message}`);
        }
    }
}
// ===== EXPORTAÇÃO =====
export const jarvis = new JarvisOrchestrator();
// ===== CLI: Execução direta =====
const args = process.argv.slice(2);
if (args.length > 0) {
    const command = args[0];
    switch (command) {
        case 'health':
            jarvis.healthCheck().then((status) => {
                console.log('\n📊 Status:', JSON.stringify(status, null, 2));
            });
            break;
        case 'discover':
            jarvis.discoverPipelineStatuses();
            break;
        case 'genesis':
            const leadId = parseInt(args[1]);
            if (isNaN(leadId)) {
                console.error('❌ Uso: npx ts-node jarvis_orchestrator.ts genesis <leadId>');
            }
            else {
                jarvis.handleNewLead(leadId).then((result) => {
                    console.log('\n📊 Resultado:', JSON.stringify(result, null, 2));
                });
            }
            break;
        default:
            console.log(`
🧠 Jarvis Orchestrator 4.0 — Brisa Laser

Comandos disponíveis:
  health    — Verifica conexão com Kommo e Zandu
  discover  — Lista pipelines e status do Kommo
  genesis <leadId>  — Processa um lead (workflow /genesis)
      `);
    }
}
