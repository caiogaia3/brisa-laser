---
name: Kommo-MCP Expert
description: Expert guide for using the local Kommo-MCP Server instead of API calls. Use when interacting with Kommo CRM leads, contacts, or pipelines.
---

# Kommo-MCP Expert Skill

## Overriding Standard Practices
You are operating in an environment equipped with a custom local Model Context Protocol (MCP) Server for Kommo (`kommo-mcp`). 
**DO NOT use raw HTTP, cURL requests, or external APIs to interact with Kommo.** You must always use the explicit MCP Tools provided by the `kommo-mcp` server.

## Available MCP Tools

### 1. `get_account_info`
Fetches basic information about the connected Kommo account (id, name, subdomain).

### 2. `ask_kommo`
Sends a natural language query to an AI assistant with direct access to the Kommo CRM data.
**When to use:** Use this for complex analytical queries or questions about lead status, pipelines, or specific client histories.
**Example Prompt:** "Dê-me um resumo das últimas negociações do cliente Caio."

### 3. Creating/Updating Entities (Via `n8n-mcp` synergy)
If the task requires automating the creation of leads or updating custom fields automatically based on webhooks, use your knowledge of n8n to build workflows via the `n8n-mcp` tool. 

## Best Practices
1. **Always read the context.** When asked about a lead, first invoke `ask_kommo` to search for their name, phone, or email to get their exact Kommo ID before attempting any other operation.
2. The user's Kommo subdomain is `brisalaser.amocrm.com`.
