# LEI 08: Tratamento de Erros com Contexto

**Motivo:** Evitar debugging às cegas por falta de stack trace.

---

## 🎯 Princípios

### Zero Swallow
Nunca capture excepções sem logar.

### Correlation ID
Toda request HTTP deve carregar `X-Request-ID` que propaga em todos os logs.

### Separação de Audiência
- User: mensagens amigáveis
- Logs: stack trace + variáveis de contexto

### Fail Fast
Valide inputs no início. Não processe dados inválidos.

---

## ❌ Exemplo ERRADO

```python
async def process_payment(payment_id: str):
    try:
        result = await stripe.charges.create(...)
        return result
    except Exception:
        pass  # 🔴 Erro silencioso!

    try:
        data = json.loads(response.text)
    except:
        return {"error": "Algo deu errado"}  # 🔴 Inútil!
```

---

## ✅ Exemplo CORRETO

```python
import structlog, uuid
from typing import Optional

logger = structlog.get_logger()

class PaymentError(Exception):
    def __init__(self, message: str, payment_id: str, original_error: Optional[Exception] = None):
        self.message = message
        self.payment_id = payment_id
        self.original_error = original_error
        super().__init__(message)

async def process_payment(payment_id: str, request_id: str = None):
    request_id = request_id or str(uuid.uuid4())
    log = logger.bind(request_id=request_id, payment_id=payment_id)

    try:
        log.info("payment.processing.started")
        result = await stripe.charges.create(...)
        log.info("payment.processing.success", amount=result.amount)
        return result

    except stripe.error.CardError as e:
        log.error(
            "payment.processing.card_declined",
            error_code=e.code,
            decline_code=e.decline_code,
            exc_info=True
        )
        raise PaymentError(
            message="Cartão recusado. Verifique os dados.",
            payment_id=payment_id,
            original_error=e
        )
```

---

## 🎯 Checklist

- [ ] Nenhum `except: pass`
- [ ] Correlation ID em toda request
- [ ] Logs com contexto (user_id, request_id, etc)
- [ ] Exceções customizadas por domínio
- [ ] User messages amigáveis, logs técnicos completos
- [ ] Fail fast: valide no início

---

**Criado em:** 2026-03-20
