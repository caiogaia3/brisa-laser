# LEI 02: Performance e Concorrência Async

**Motivo:** Garantir que o FastAPI NUNCA trave por operações bloqueantes.

---

## ⚡ Diretrizes Técnicas

### Regra 1: Async First
Toda comunicação com banco, Redis ou APIs externas (OpenAI, Anthropic, etc) DEVE ser `async`.

### Regra 2: Proibição de Código Bloqueante
- ❌ `time.sleep()` — use `asyncio.sleep()`
- ❌ `requests.get()` — use `httpx.AsyncClient()`
- ❌ `open('file').read()` em rota — use `aiofiles`

### Regra 3: Background Tasks
Operações longas (billing, PDFs, treinamento) → Celery Workers.

---

## ❌ Exemplo ERRADO

```python
from fastapi import FastAPI
import requests
import time

app = FastAPI()

@app.get("/fetch-data")
def fetch_data():
    time.sleep(2)  # 🔴 Bloqueia event loop!
    response = requests.get("https://api.externa.com/data")  # 🔴 Bloqueante!
    return response.json()

# Resultado: Se 10 requests chegam, cada um espera 2s = 20s total
```

---

## ✅ Exemplo CORRETO

```python
from fastapi import FastAPI
import httpx
import asyncio

app = FastAPI()

@app.get("/fetch-data")
async def fetch_data():
    await asyncio.sleep(2)  # ✅ Não bloqueia
    async with httpx.AsyncClient() as client:
        response = await client.get("https://api.externa.com/data")
    return response.json()

# Resultado: 10 requests em paralelo = ~2s total
```

### Para Operações Longas: Celery

```python
from celery_app import celery

# 1. Defina task
@celery.task
def process_pdf(file_id: str):
    # Pode levar 5 minutos
    analyze_document(file_id)
    send_email(file_id)

# 2. Queue a task na rota (retorna imediatamente)
@app.post("/documents/{doc_id}/process")
async def process_document(doc_id: str):
    process_pdf.delay(doc_id)  # Retorna em 10ms
    return {"status": "processing", "doc_id": doc_id}
```

---

## 🎯 Checklist

- [ ] Nenhum `time.sleep()` nas rotas do FastAPI
- [ ] Nenhum `requests.get()` — use `httpx.AsyncClient()`
- [ ] Todas as funções com DB/API são `async`
- [ ] Operações >1s delegadas para Celery
- [ ] Testes com `pytest-asyncio` + `pytest-mock`

---

**Criado em:** 2026-03-20
