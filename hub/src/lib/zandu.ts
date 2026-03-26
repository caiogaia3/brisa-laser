/**
 * Zandu API Client — Browser-safe adapter for the Brisa Intelligence Hub.
 * Fetches financial (invoices), scheduling (appointments), and client (persons) data.
 *
 * NOTE: The API key is sourced from env vars (VITE_ZANDU_API_KEY).
 * In production, consider proxying through a Supabase Edge Function or n8n
 * to avoid exposing the bearer token in the browser.
 */

const ZANDU_BASE_URL = import.meta.env.VITE_ZANDU_API_URL || 'https://api.zandu.com.br';
const ZANDU_API_KEY = import.meta.env.VITE_ZANDU_API_KEY || '';

// ===== Types =====

export interface ZanduPerson {
  personId: string;
  name: string;
  phone?: string;
  email?: string;
  createdAt: string;
  [key: string]: any;
}

export interface ZanduInvoiceService {
  serviceId: string;
  quantity: number;
  value: number;
  type: string;
  userId: string;
}

export interface ZanduInvoice {
  invoiceId: string;
  personId: string;
  total: number;
  totalPaid: number;
  status: 'open' | 'paid' | 'canceled';
  discountFixed: number;
  discountPercentage: number;
  notes: string;
  createdAt: string;
  services: ZanduInvoiceService[];
}

export interface ZanduAppointment {
  appointmentId: string;
  personId?: string;
  personName?: string;
  scheduleId?: string;
  start: string;
  durationMinutes?: number;
  status?: string;
  items?: Array<{ serviceId: string; balanceId?: string }>;
  [key: string]: any;
}

export interface ZanduService {
  serviceId: string;
  name: string;
  duration: number;
  price: number;
  description: string;
  category?: { name: string };
}

// ===== Fetch Helper =====

async function zanduFetch<T>(path: string, params?: Record<string, string>): Promise<T> {
  const url = new URL(path, ZANDU_BASE_URL);
  if (params) {
    Object.entries(params).forEach(([k, v]) => url.searchParams.set(k, v));
  }

  const res = await fetch(url.toString(), {
    headers: {
      'Authorization': `Bearer ${ZANDU_API_KEY}`,
      'Content-Type': 'application/json',
    },
  });

  if (!res.ok) {
    const body = await res.text().catch(() => '');
    throw new Error(`[ZanduAPI] ${res.status} ${res.statusText}: ${body}`);
  }

  const json = await res.json();
  return json?.data ?? json;
}

// ===== Public API =====

/**
 * Busca faturas (vendas) do Zandu.
 * Intervalo máximo é 93 dias por request.
 */
export async function getInvoices(from?: string, to?: string): Promise<ZanduInvoice[]> {
  const params: Record<string, string> = {};
  if (from) params.from = from;
  if (to) params.to = to;
  return zanduFetch<ZanduInvoice[]>('/invoices', params);
}

/**
 * Busca agendamentos do Zandu.
 */
export async function getAppointments(from?: string, to?: string): Promise<ZanduAppointment[]> {
  const params: Record<string, string> = {};
  if (from) params.from = from;
  if (to) params.to = to;
  return zanduFetch<ZanduAppointment[]>('/schedulers/appointments', params);
}

/**
 * Busca serviços disponíveis.
 */
export async function getServices(): Promise<ZanduService[]> {
  return zanduFetch<ZanduService[]>('/services');
}

/**
 * Busca pessoas (clientes) cadastradas.
 */
export async function getPersons(limit = 200): Promise<ZanduPerson[]> {
  return zanduFetch<ZanduPerson[]>('/persons', { limit: String(limit) });
}
