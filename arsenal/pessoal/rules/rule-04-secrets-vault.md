# LEI 04: Cofre de Segredos (Secrets Management)

**Motivo:** Chaves de API de terceiros NUNCA em texto puro no banco.

---

## 🔐 Regras

### Regra 1: Criptografia em Repouso
API Keys (OpenAI, Anthropic, Stripe) salvas no banco DEVEM ser criptografadas antes do INSERT.

### Regra 2: Sanitização de Logs
NUNCA logue variáveis de ambiente ou dados PII (email, CPF, tokens).

### Regra 3: Validação no Startup
Toda env var crítica deve ser validada na inicialização.

---

## ❌ Exemplo ERRADO

```python
async def save_agent(agent_data: dict):
    await supabase.from_("agents").insert({
        "name": agent_data["name"],
        "openai_api_key": agent_data["api_key"],  # 🔴 Texto puro!
    }).execute()

    print(f"Agent criado com key: {agent_data['api_key']}")  # 🔴 Log expondo!
```

---

## ✅ Exemplo CORRETO

```python
from app.services.encryption import EncryptionService

encryption = EncryptionService()

async def save_agent(agent_data: dict):
    encrypted_key = encryption.encrypt(agent_data["api_key"])

    await supabase.from_("agents").insert({
        "name": agent_data["name"],
        "openai_api_key_encrypted": encrypted_key,
    }).execute()

    logger.info(f"Agent criado: {agent_data['name']}")  # ✅ Sem dados sensíveis
```

### Validação no Startup

```python
import base64, os

class Settings:
    def __init__(self):
        self.encryption_key = os.getenv("ENCRYPTION_KEY")

        if not self.encryption_key:
            raise ValueError("ENCRYPTION_KEY não configurada")

        try:
            base64.urlsafe_b64decode(self.encryption_key)
        except Exception:
            raise ValueError("ENCRYPTION_KEY deve ser Base64")
```

---

## 🎯 Checklist

- [ ] Nenhuma chave em texto puro no banco
- [ ] Encrypt/decrypt antes de usar
- [ ] Logs NUNCA contêm tokens ou emails
- [ ] ENCRYPTION_KEY validada no startup
- [ ] Usar `secrets.token_urlsafe(32)` para gerar chaves

---

**Criado em:** 2026-03-20
