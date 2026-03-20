---
name: Zandu-MCP Expert
description: Expert guide for using the local Zandu-MCP Server. Use when needing to check schedules, manage professionals' calendars, or book appointments in Zandu.
---

# Zandu-MCP Expert Skill

## Overriding Standard Practices
You are operating in an environment equipped with a custom local Model Context Protocol (MCP) Server for Zandu (`zandu-mcp`). 
**DO NOT attempt to use HTTP requests or manual Bearer Token authentication.** Always use the MCP Tools provided by this custom server.

## Available MCP Tools

### 1. `get_persons`
- **Purpose:** Fetches the list of registered clients/leads in Zandu.
- **Parameters:** `limit` (number, optional).
- **Usage:** Call this first to find a specific client's ID in the Zandu database.

### 2. `get_appointments`
- **Purpose:** Fetches the schedule and existing appointments.
- **Parameters:** `limit` (number, optional).
- **Usage:** Essential to check for conflicts or to see a professional's free time before booking.

### 3. `create_appointment`
- **Purpose:** Officially books a new appointment in Zandu.
- **Parameters Required:**
  - `personId`: UUID of the client (from get_persons)
  - `scheduleId`: UUID of the professional/calendar
  - `serviceId`: UUID of the service being provided
  - `start`: ISO-8601 Date String (ex: `2025-05-13T14:45:00.000-03:00`)
  - `durationMinutes`: Number (ex: 45)
  - `notes`: String (optional)

## Workflow for Booking
1. Determine the `personId`. (If unknown, query `get_persons`).
2. Identify the `scheduleId` and `serviceId` based on the user's prompt or predefined constants for Brisa Laser.
3. Call `create_appointment` with precise timing data.
4. Confirm success to the user.

## 🔗 Webhooks e Integração
- **Limitação de URL**: O Zandu suporta apenas uma única URL de Webhook ativa por vez. Ao cadastrar uma nova URL no painel, a anterior é desativada.
- **Roteamento de Eventos**: Todos os eventos (Agendamento, Confirmado, Cancelado, etc.) são enviados para a mesma URL.
- **Filtragem**: Use o campo `body.event.lastEvent` no JSON recebido para distinguir os eventos no n8n.
    - `agendamento_criado`: Novo agendamento.
    - `agendamento_confirmado`: Cliente compareceu/confirmou presença.
- **Enriquecimento**: O payload do webhook não contém o telefone diretamente. Utilize o `personId` para consultar os detalhes via API (`GET /persons/:id`).
