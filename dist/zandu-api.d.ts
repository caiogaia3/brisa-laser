export interface ZanduConfig {
    apiUrl: string;
    apiKey: string;
}
export interface ZanduPerson {
    id: string;
    name: string;
    phone?: string;
    email?: string;
    [key: string]: any;
}
export interface ZanduAppointment {
    id?: string;
    personId: string;
    scheduleId: string;
    start: string;
    durationMinutes: number;
    notes?: string;
    items: Array<{
        serviceId: string;
        balanceId?: string;
    }>;
    [key: string]: any;
}
export interface CreateAppointmentParams {
    personId: string;
    personPhone?: string;
    personName?: string;
    scheduleId: string;
    serviceId: string;
    start: string;
    durationMinutes: number;
    notes?: string;
    balanceId?: string;
}
export declare class ZanduAPI {
    private client;
    constructor(config: ZanduConfig);
    /**
     * Lista clientes (pessoas) cadastrados no Zandu.
     */
    getPersons(limit?: number): Promise<ZanduPerson[]>;
    /**
     * Busca uma pessoa pelo telefone (matching com leads do Kommo).
     * Retorna a primeira pessoa encontrada ou null.
     */
    findPersonByPhone(phone: string): Promise<ZanduPerson | null>;
    /**
     * Lista agendamentos cadastrados.
     */
    getAppointments(limit?: number, from?: string, to?: string): Promise<ZanduAppointment[]>;
    /**
     * Cria um novo agendamento no Zandu.
     */
    createAppointment(params: CreateAppointmentParams): Promise<ZanduAppointment>;
    /**
     * Lista faturas (receitas) geradas no Zandu.
     */
    getInvoices(limit?: number, from?: string, to?: string): Promise<any[]>;
    /**
     * Normaliza número de telefone removendo caracteres não-numéricos.
     */
    private normalizePhone;
}
