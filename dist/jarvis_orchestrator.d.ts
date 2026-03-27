interface OrchestrationResult {
    success: boolean;
    leadId: number;
    actions: string[];
    errors: string[];
}
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
declare class JarvisOrchestrator {
    private kommo;
    private zandu;
    private auditLogPath;
    constructor();
    /**
     * Processa um novo lead — workflow /genesis completo.
     * Orquestra Kommo (qualificação) e Zandu (agendamento).
     */
    handleNewLead(leadId: number): Promise<OrchestrationResult>;
    /**
     * Analisa o lead para decidir se precisa de agendamento.
     * Critérios: tags, status no pipeline, e contexto do lead.
     */
    private analyzeLeadIntent;
    /**
     * Sincroniza um lead do Kommo com o Zandu.
     * Busca o contato pelo telefone e prepara para agendamento.
     */
    private syncLeadToZandu;
    /**
     * Extrai o telefone do primeiro contato vinculado ao lead.
     */
    private extractLeadPhone;
    /**
     * Registra uma entrada de auditoria no arquivo audit_logs.md.
     * Formato: linha de tabela markdown.
     */
    logAudit(agent: string, action: string, result: string, observation: string): Promise<void>;
    /**
     * Teste de conectividade com ambas as APIs.
     * Retorna status de cada conexão.
     */
    healthCheck(): Promise<{
        kommo: boolean;
        zandu: boolean;
    }>;
    /**
     * Mapeia os status reais do pipeline.
     * Use esta função para descobrir os IDs corretos de cada status.
     */
    discoverPipelineStatuses(): Promise<void>;
}
export declare const jarvis: JarvisOrchestrator;
export {};
