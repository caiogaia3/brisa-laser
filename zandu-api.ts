import axios, { AxiosInstance } from 'axios';

// ===== INTERFACES =====

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

// ===== ZANDU API CLASS =====

export class ZanduAPI {
  private client: AxiosInstance;

  constructor(config: ZanduConfig) {
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
  async getPersons(limit: number = 50): Promise<ZanduPerson[]> {
    try {
      const response = await this.client.get('/persons', {
        params: { limit },
      });
      return response.data?.data || response.data || [];
    } catch (error: any) {
      console.error('[ZanduAPI] Erro ao buscar pessoas:', error?.response?.data || error.message);
      throw error;
    }
  }

  /**
   * Busca uma pessoa pelo telefone (matching com leads do Kommo).
   * Retorna a primeira pessoa encontrada ou null.
   */
  async findPersonByPhone(phone: string): Promise<ZanduPerson | null> {
    try {
      const persons = await this.getPersons(200);
      const normalized = this.normalizePhone(phone);

      const match = persons.find((p) => {
        const pPhone = this.normalizePhone(p.phone || '');
        return pPhone === normalized || pPhone.endsWith(normalized) || normalized.endsWith(pPhone);
      });

      return match || null;
    } catch (error: any) {
      console.error('[ZanduAPI] Erro ao buscar pessoa por telefone:', error.message);
      return null;
    }
  }

  /**
   * Lista agendamentos cadastrados.
   */
  async getAppointments(limit: number = 50, from?: string, to?: string): Promise<ZanduAppointment[]> {
    try {
      const response = await this.client.get('/schedulers/appointments', {
        params: { limit, from, to },
      });
      return response.data?.data || response.data || [];
    } catch (error: any) {
      console.error('[ZanduAPI] Erro ao buscar agendamentos:', error?.response?.data || error.message);
      throw error;
    }
  }

  /**
   * Cria um novo agendamento no Zandu.
   */
  async createAppointment(params: CreateAppointmentParams): Promise<ZanduAppointment> {
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
    } catch (error: any) {
      console.error(
        '[ZanduAPI] Erro ao criar agendamento:',
        JSON.stringify(error?.response?.data) || error.message
      );
      throw error;
    }
  }

  /**
   * Lista faturas (receitas) geradas no Zandu.
   */
  async getInvoices(limit: number = 50, from?: string, to?: string): Promise<any[]> {
    try {
      const response = await this.client.get('/invoices', {
        params: { limit, from, to },
      });
      return response.data?.data || response.data || [];
    } catch (error: any) {
      console.error('[ZanduAPI] Erro ao buscar faturas:', error?.response?.data || error.message);
      throw error;
    }
  }

  /**
   * Normaliza número de telefone removendo caracteres não-numéricos.
   */

  private normalizePhone(phone: string): string {
    return phone.replace(/\D/g, '');
  }
}

