# LEI 03: Blindagem Multi-Tenant

**Motivo:** Evitar vazamento de dados entre empresas.

---

## 🛡️ Verificações Obrigatórias

### Regra 1: Clausula de Empresa
Toda query DEVE incluir `.eq('company_id', company_id)` explicitamente.

### Regra 2: Origem da Identidade
`company_id` NUNCA vem do request body. Sempre da sessão autenticada.

### Regra 3: RLS Enforcer
Toda tabela com dados de user/empresa DEVE ter RLS + policies.

---

## ❌ Exemplo ERRADO

```python
@router.get("/agents")
async def list_agents(company_id: str):  # 🔴 Vem do query param!
    agents = await supabase.from_("agents") \
        .select("*") \
        .eq("company_id", company_id) \
        .execute()
    return agents.data
```

**Problema:** User envia `?company_id=outra-empresa` e acessa dados de outro.

---

## ✅ Exemplo CORRETO

```python
from fastapi import Depends
from app.auth.dependencies import require_authenticated_user

@router.get("/agents")
async def list_agents(
    user: AuthenticatedUser = Depends(require_authenticated_user)
):
    # company_id SEMPRE da sessão
    agents = await supabase.from_("agents") \
        .select("*") \
        .eq("company_id", user.company_id) \
        .execute()
    return agents.data
```

### SQL com RLS

```sql
CREATE TABLE agents (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    company_id UUID NOT NULL REFERENCES companies(id),
    name TEXT NOT NULL
);

ALTER TABLE agents ENABLE ROW LEVEL SECURITY;

CREATE POLICY "tenant_isolation" ON agents
    FOR ALL
    USING (company_id = auth.jwt()->>'company_id');
```

---

## 🎯 Checklist

- [ ] Toda tabela com dados de user/empresa tem RLS habilitado
- [ ] Toda query inclui `.eq('company_id', user.company_id)`
- [ ] `company_id` extraído da sessão, nunca do request
- [ ] Testes verificam isolamento (User A NÃO vê User B)

---

**Criado em:** 2026-03-20
