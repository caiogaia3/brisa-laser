import axios from 'axios';
// ===== ZANDU API CLASS =====
export class ZanduAPI {
    client;
    constructor(config) {
        this.client = axios.create({
            baseURL: config.apiUrl,
            headers: {
                'Authorization': `Bearer ${config.apiKey}`,
                'Content-Type': 'application/json',
            },
        });
    }
    /**
     * Lista clientes (pessoas) cadastrados no Zandu.
     */
    async getPersons(limit = 50) {
        try {
            const response = await this.client.get('/persons', {
                params: { limit },
            });
            return response.data?.data || response.data || [];
        }
        catch (error) {
            console.error('[ZanduAPI] Erro ao buscar pessoas:', error?.response?.data || error.message);
            throw error;
        }
    }
    /**
     * Busca uma pessoa pelo telefone (matching com leads do Kommo).
     * Retorna a primeira pessoa encontrada ou null.
     */
    async findPersonByPhone(phone) {
        try {
            const persons = await this.getPersons(200);
            const normalized = this.normalizePhone(phone);
            const match = persons.find((p) => {
                const pPhone = this.normalizePhone(p.phone || '');
                return pPhone === normalized || pPhone.endsWith(normalized) || normalized.endsWith(pPhone);
            });
            return match || null;
        }
        catch (error) {
            console.error('[ZanduAPI] Erro ao buscar pessoa por telefone:', error.message);
            return null;
        }
    }
    /**
     * Lista agendamentos cadastrados.
     */
    async getAppointments(limit = 50, from, to) {
        try {
            const response = await this.client.get('/schedulers/appointments', {
                params: { limit, from, to },
            });
            return response.data?.data || response.data || [];
        }
        catch (error) {
            console.error('[ZanduAPI] Erro ao buscar agendamentos:', error?.response?.data || error.message);
            throw error;
        }
    }
    /**
     * Cria um novo agendamento no Zandu.
     */
    async createAppointment(params) {
        try {
            const payload = {
                personId: params.personId,
                personPhone: params.personPhone,
                personName: params.personName,
                scheduleId: params.scheduleId,
                start: params.start,
                durationMinutes: params.durationMinutes,
                notes: params.notes || '',
                items: [
                    {
                        serviceId: params.serviceId,
                        ...(params.balanceId ? { balanceId: params.balanceId } : {}),
                    },
                ],
            };
            const response = await this.client.post('/schedulers/appointments', payload);
            return response.data;
        }
        catch (error) {
            console.error('[ZanduAPI] Erro ao criar agendamento:', JSON.stringify(error?.response?.data) || error.message);
            throw error;
        }
    }
    /**
     * Lista faturas (receitas) geradas no Zandu.
     */
    async getInvoices(limit = 50, from, to) {
        try {
            const response = await this.client.get('/invoices', {
                params: { limit, from, to },
            });
            return response.data?.data || response.data || [];
        }
        catch (error) {
            console.error('[ZanduAPI] Erro ao buscar faturas:', error?.response?.data || error.message);
            throw error;
        }
    }
    /**
     * Normaliza número de telefone removendo caracteres não-numéricos.
     */
    normalizePhone(phone) {
        return phone.replace(/\D/g, '');
    }
}
