# LEI 06: Arquitetura Limpa

**Motivo:** Combater código sujo e duplicação (DRY).

---

## 🏗️ Estrutura de Camadas

### Services (Lógica de Negócio)
Regras complexas (cálculo de preço, RAG, WhatsApp) → `/app/services/`.

### Routers (Interface)
Validam input e chamam serviços.

### DRY (Don't Repeat Yourself)
Se a lógica é necessária >1 lugar, centraliza em um Service.

---

## ❌ Exemplo ERRADO

```python
# app/api/billing/router.py — lógica no router!
@router.post("/charge")
async def charge(customer_id: str, amount: float):
    customer = await supabase.from_("customers").select("*").eq("id", customer_id).single().execute()

    if customer.data["plan"] == "free":
        discount = 0
    elif customer.data["plan"] == "pro":
        discount = 0.1
    else:
        discount = 0.2

    final_amount = amount * (1 - discount)
    # ... 50 linhas de lógica de negócio no router!
```

---

## ✅ Exemplo CORRETO

```python
# app/services/billing_service.py
class BillingService:
    def __init__(self, usage_service: UsageService):
        self.usage = usage_service

    def calculate_discount(self, plan: str) -> float:
        discounts = {"free": 0, "pro": 0.1, "enterprise": 0.2}
        return discounts.get(plan, 0)

    async def charge(self, customer_id: str, amount: float) -> ChargeResult:
        customer = await self.get_customer(customer_id)
        discount = self.calculate_discount(customer.plan)
        final_amount = amount * (1 - discount)
        tokens = self.usage.calculate_tokens(amount)
        return ChargeResult(amount=final_amount, tokens=tokens)

# app/api/billing/router.py — router só valida e delega
@router.post("/charge")
async def charge(
    request: ChargeRequest,
    billing: BillingService = Depends()
):
    result = await billing.charge(request.customer_id, request.amount)
    return result
```

---

## 🎯 Checklist

- [ ] Lógica de negócio em Services
- [ ] Routers são finos (<30 linhas)
- [ ] Sem duplicação (DRY)
- [ ] Imports organizados (stdlib → 3rd → local)
- [ ] 1 responsabilidade por classe

---

**Criado em:** 2026-03-20
