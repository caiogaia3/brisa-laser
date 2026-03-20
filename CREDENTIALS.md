# 🔐 Cofre de Credenciais: Brisa Laser

> [!WARNING]
> **SEGURANÇA EXTREMA:** Este arquivo contém tokens de acesso e chaves de API reais. **NUNCA** faça commit deste arquivo em repositórios públicos no GitHub ou anexe-o diretamente em chats não seguros.

---

## 🟢 Kommo CRM

### 🔑 Long-Lived Token (Access Token Estático)
Este token não expira (ou tem vida útil extremamente longa) e é ideal para integrações backend-to-backend (n8n, APIs customizadas) onde a renovação via OAuth2 não é viável ou onde o n8n remove as credenciais visuais nativas após a importação de JSON.

**Domínio:** `https://brisalaser.kommo.com`

**Como usar no n8n (Nós HTTP Request):**
1. **Authentication:** `Generic Credential Type`
2. **Generic Credential Type:** `Header Auth`
3. Crie a credencial e configure:
   - **Name:** `Authorization`
   - **Value:** `Bearer SEU_TOKEN_ABAIXO` (com espaço)

**Token:**
```
eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6IjkyNDRhMmUwZDNlNDk2MjFjNDY1MmY0NGM2ZDNlZGM5NTRhNzU5OGVkYTY2ZDY2MzBkMTk0OTNkYjBkNWUyN2NmN2VmNDk0Yzk1NTMyNjAwIn0.eyJhdWQiOiJhYzE2NDUxYi04NmM5LTRkZDEtOGI0Yi1kOTQ1NDkwMTJkNTciLCJqdGkiOiI5MjQ0YTJlMGQzZTQ5NjIxYzQ2NTJmNDRjNmQzZWRjOTU0YTc1OThlZGE2NmQ2NjMwZDE5NDkzZGIwZDVlMjdjZjdlZjQ5NGM5NTUzMjYwMCIsImlhdCI6MTc3MzI3MDE2OSwibmJmIjoxNzczMjcwMTY5LCJleHAiOjE5MTE0MjcyMDAsInN1YiI6IjEzNTE5MDc5IiwiZ3JhbnRfdHlwZSI6IiIsImFjY291bnRfaWQiOjM0ODgwMjYzLCJiYXNlX2RvbWFpbiI6ImtvbW1vLmNvbSIsInZlcnNpb24iOjIsInNjb3BlcyI6WyJwdXNoX25vdGlmaWNhdGlvbnMiLCJmaWxlcyIsImNybSIsImZpbGVzX2RlbGV0ZSIsIm5vdGlmaWNhdGlvbnMiXSwiaGFzaF91dWlkIjoiNDE5MGQ1ODAtMTI1Yy00OTkwLThmZmQtYTUyMTRiNDI2NzRhIiwiYXBpX2RvbWFpbiI6ImFwaS1nLmtvbW1vLmNvbSJ9.KslA1GBDiIsmJoKbu389X3KcQ8IacIIInkObnOLSuXCGgYWsKUCoq9pXQgFtwXwJte3wbxdfBH-z39G5Zr0Rw9fE6sBkuwBf5Fm014vw6JmxivVROGhSjy12yZzioYHWXG6O53hl6dp5hsFEwKYQa7rRhmKmB_PmTw-uXLyEZV7BvehTFn-7wvLzS7vsyQbyyJ_g3TPAwsKDwHk0imXJ5ATR5O7r5feHEw79cTrfjOXTZixtB-yxuJw28fmrt5tYx1AunYNI-t7xMFouD46f4gUJ5befwCzrp9lmag0v_cP2ULrGNOZfHDeyY39Hxkb4IOvDuKaLuXlAcoFKb1c-Qw
```

---

## 🟣 Supabase (Brain da Isa)
Utilizado para memória de longo prazo (Vector Store).

- **URL do Projeto:** `https://nrvazcesqvuqtlunqtnw.supabase.co`
- **Publishable Key:** `sb_publishable_KOMRCO0RBEMJndWtzMXdnA_7JpjjEbh`

---

## 🔵 Google Gemini (Isa Motor)
Chave da API do Google Gemini (1.5 Pro) usado como cérebro LLM.

- **API Key:** `AIzaSyAzEqyRD47vARiR3LX0daIlmtOlNRnzq-s`

---

## 🟢 Zandu
*(A preencher conforme Tokens gerados na API do Zandu-MCP)*

---

## 🟠 n8n (Orquestrador)
Chave da API usada para automações e atualizações via script no servidor n8n hospedado no Easypanel.

- **URL:** `https://n8n.grooway.com.br`
- **X-N8N-API-KEY:** `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJmNzg3YjIzMy0xNzNlLTQxNWUtYjAyMy0wNDY2ZjA0MmU2MmQiLCJpc3MiOiJuOG4iLCJhdWQiOiJwdWJsaWMtYXBpIiwiaWF0IjoxNzczMjcyMzk4fQ.KKvKlVIjW8BuKY-TqwfeIGmoqwtoR-darRzMwMvJsqk`

---

## 🟡 Google Sheets (Auditoria)
Id da credencial usada pelo n8n para gravar via "append" no Google Sheets v4.5.

- **Spreadsheet ID (Campanhas):** `14Lxf4lJoKRFTkzGyDgNYvLzJZlLY7WUZb25YzI1cUQU`
- **GID (Numérico):** `551067343`
- **n8n Credential ID (Google Sheets OAuth2 API):** `UjCbXnN1VkFY6mjA`
