import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";
import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

const API_KEY = process.env.ZANDU_API_KEY;
const API_URL = process.env.ZANDU_API_URL || "https://api.zandu.com.br";

if (!API_KEY) {
  console.error("FATAL: Variável de ambiente ZANDU_API_KEY não localizada.");
  process.exit(1);
}

// Criação do Servidor MCP
const server = new McpServer({
  name: "Zandu-MCP",
  version: "1.1.0"
});

// Conector Axios com o cabeçalho Bearer exigido pelo Zandu
const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    "Authorization": `Bearer ${API_KEY}`,
    "Content-Type": "application/json"
  }
});

/**
 * FERRAMENTA: get_persons
 * Objetivo: Consultar clientes na agenda do Zandu
 */
server.tool(
  "get_persons",
  "Lista os clientes (pessoas) cadastrados no Zandu.",
  {
    limit: z.number().optional().describe("Quantos registros retornar. Padrão 50.")
  },
  async ({ limit }) => {
    try {
      const response = await apiClient.get("/persons", {
         params: { limit: limit || 50 }
      });
      return {
        content: [{ type: "text", text: JSON.stringify(response.data, null, 2) }]
      };
    } catch (error: any) {
      return {
        content: [{ type: "text", text: `Erro na API do Zandu: ${error?.response?.data || error.message}` }],
        isError: true
      };
    }
  }
);

/**
 * FERRAMENTA: get_appointments
 * Objetivo: Buscar os horários/agendamentos do Zandu
 */
server.tool(
  "get_appointments",
  "Lista os agendamentos cadastrados na plataforma Zandu.",
  {
    limit: z.number().optional().describe("Quantidade máxima de agendamentos para trazer. Padrão 50.")
  },
  async ({ limit }) => {
    try {
      const response = await apiClient.get("/schedulers/appointments", {
         params: { limit: limit || 50 }
      });
      return {
        content: [{ type: "text", text: JSON.stringify(response.data, null, 2) }]
      };
    } catch (error: any) {
      return {
        content: [{ type: "text", text: `Erro na API do Zandu: ${error?.response?.data || error.message}` }],
        isError: true
      };
    }
  }
);

/**
 * FERRAMENTA: create_appointment
 * Objetivo: Marcar um agendamento novo
 */
server.tool(
  "create_appointment",
  "Cria um novo agendamento no Zandu.",
  {
    personId: z.string().describe("ID do lead/cliente no formato UUID. Obrigatório."),
    scheduleId: z.string().describe("ID da agenda (profissional) no formato UUID. Obrigatório."),
    serviceId: z.string().describe("ID do serviço a ser prestado."),
    start: z.string().describe("Data e hora de inicio. Exemplo: 2025-05-13T14:45:00.000-03:00"),
    durationMinutes: z.number().describe("Duração em minutos"),
    notes: z.string().optional().describe("Observações ou detalhes extras")
  },
  async ({ personId, scheduleId, serviceId, start, durationMinutes, notes }) => {
    try {
      const payload = {
        personId,
        scheduleId,
        start,
        durationMinutes,
        notes: notes || "",
        items: [
           { serviceId }
        ]
      };
      
      const response = await apiClient.post("/schedulers/appointments", payload);
      return {
        content: [{ type: "text", text: JSON.stringify(response.data, null, 2) }]
      };
    } catch (error: any) {
      const errDetail = error?.response?.data;
      return {
        content: [{ type: "text", text: `Falha ao criar agendamento na API Zandu. Detalhes: ${JSON.stringify(errDetail) || error.message}` }],
        isError: true
      };
    }
  }
);

/**
 * FERRAMENTA: confirm_appointment
 * Objetivo: Confirmar presença em um agendamento
 */
server.tool(
  "confirm_appointment",
  "Confirma a presença de um cliente em um agendamento específico.",
  {
    appointmentId: z.string().describe("ID do agendamento (UUID).")
  },
  async ({ appointmentId }) => {
    try {
      const response = await apiClient.post(`/schedulers/appointments/${appointmentId}/confirm`);
      return {
        content: [{ type: "text", text: JSON.stringify(response.data, null, 2) }]
      };
    } catch (error: any) {
      return {
        content: [{ type: "text", text: `Erro ao confirmar agendamento: ${JSON.stringify(error?.response?.data) || error.message}` }],
        isError: true
      };
    }
  }
);

/**
 * FERRAMENTA: get_invoices
 * Objetivo: Consultar faturas/receitas geradas
 */
server.tool(
  "get_invoices",
  "Lista as faturas (receitas) geradas no Zandu.",
  {
    limit: z.number().optional().describe("Padrão 50.")
  },
  async ({ limit }) => {
    try {
      const response = await apiClient.get("/invoices", {
         params: { limit: limit || 50 }
      });
      return {
        content: [{ type: "text", text: JSON.stringify(response.data, null, 2) }]
      };
    } catch (error: any) {
      return {
        content: [{ type: "text", text: `Erro ao buscar faturas: ${error?.response?.data || error.message}` }],
        isError: true
      };
    }
  }
);

/**
 * FERRAMENTA: get_webhooks
 * Objetivo: Listar webhooks cadastrados
 */
server.tool(
  "get_webhooks",
  "Lista os webhooks configurados no Zandu.",
  {},
  async () => {
    try {
      const response = await apiClient.get("/webhooks");
      return {
        content: [{ type: "text", text: JSON.stringify(response.data, null, 2) }]
      };
    } catch (error: any) {
      return {
        content: [{ type: "text", text: `Erro ao buscar webhooks: ${error?.response?.data || error.message}` }],
        isError: true
      };
    }
  }
);

/**
 * FERRAMENTA: create_webhook
 * Objetivo: Cadastrar uma nova URL de notificação
 */
server.tool(
  "create_webhook",
  "Cria um novo webhook para receber notificações de eventos.",
  {
    url: z.string().describe("URL completa do endpoint para receber o POST."),
    events: z.array(z.string()).describe("Lista de eventos. Ex: ['appointment.created', 'appointment.confirmed'].")
  },
  async ({ url, events }) => {
    try {
      const response = await apiClient.post("/webhooks", { url, events });
      return {
        content: [{ type: "text", text: JSON.stringify(response.data, null, 2) }]
      };
    } catch (error: any) {
      return {
        content: [{ type: "text", text: `Erro ao criar webhook: ${JSON.stringify(error?.response?.data) || error.message}` }],
        isError: true
      };
    }
  }
);

/**
 * FERRAMENTA: delete_webhook
 * Objetivo: Remover um webhook
 */
server.tool(
  "delete_webhook",
  "Remove um webhook existente.",
  {
    webhookId: z.string().describe("ID do webhook (UUID).")
  },
  async ({ webhookId }) => {
    try {
      await apiClient.delete(`/webhooks/${webhookId}`);
      return {
        content: [{ type: "text", text: "Webhook removido com sucesso." }]
      };
    } catch (error: any) {
      return {
        content: [{ type: "text", text: `Erro ao remover webhook: ${error?.response?.data || error.message}` }],
        isError: true
      };
    }
  }
);

/**
 * INICIALIZAÇÃO DO SERVIDOR MCP (STDIO mode)
 */
async function run() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error("✅ Zandu-MCP Server conectado com sucesso via StdIO!");
}

run().catch((error) => {
  console.error("Falha fatal ao iniciar o Zandu-MCP:", error);
  process.exit(1);
});
