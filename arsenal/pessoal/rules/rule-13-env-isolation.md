# LEI 13: Isolamento de Ambientes

**Motivo:** Prevenir vazamento de produção para dev e execução acidental em ambiente errado.

---

## 🔐 Segregação Obrigatória

### Bancos Separados
Cada ambiente (dev, staging, prod) tem seu próprio banco. **NUNCA compartilhe.**

### Prefixos de Variáveis
Use prefixos: `DEV_`, `STAGING_`, `PROD_`.

### Feature Flags
Código não finalizado fica atrás de feature flags, nunca em main/master.

---

## ❌ Proibições

- Hardcode de URLs de produção
- Dados reais de clientes em dev
- Conexão de dev com banco de produção

---

## ✅ Estrutura de .env

```bash
# .env.development
DEV_DATABASE_URL=postgresql://localhost/myapp_dev
DEV_STRIPE_KEY=sk_test_xxxxx
DEV_OPENAI_KEY=sk-test-...

# .env.staging
STAGING_DATABASE_URL=postgresql://staging-db.internal/myapp
STAGING_STRIPE_KEY=sk_test_staging_...

# .env.production (NUNCA commitado!)
PROD_DATABASE_URL=postgresql://prod-db.internal/myapp
PROD_STRIPE_KEY=sk_live_xxxxx
```

### .gitignore

```
.env.production
.env.local
.env.*.local
```

---

## ✅ Validação no Código

```python
from enum import Enum

class Environment(str, Enum):
    DEV = "development"
    STAGING = "staging"
    PROD = "production"

class Settings:
    def __init__(self):
        self.env = Environment(os.getenv("APP_ENV", Environment.DEV))
        self.prefix = self.env.name + "_"

        self.database_url = os.getenv(f"{self.prefix}DATABASE_URL")
        self.stripe_key = os.getenv(f"{self.prefix}STRIPE_KEY")

        # ❌ Validação: prod key em dev = erro
        if self.env == Environment.DEV and "live" in self.stripe_key:
            raise ValueError("Chave de produção detectada em dev!")
```

### Proteção em Scripts

```python
async def seed_test_data():
    settings = Settings()

    if settings.env == Environment.PROD:
        raise RuntimeError("SEED BLOQUEADO EM PRODUÇÃO!")

    await db.execute("DELETE FROM users")
```

---

## 🎯 Checklist

- [ ] Cada ambiente tem seu próprio banco
- [ ] Prefixos `DEV_`, `STAGING_`, `PROD_` em env vars
- [ ] `.env.production` NUNCA commitado
- [ ] Validação no startup: prod key em dev = erro
- [ ] Scripts destrutivos protegidos (seed, reset)
- [ ] Feature flags para código não finalizado

---

**Criado em:** 2026-03-20
