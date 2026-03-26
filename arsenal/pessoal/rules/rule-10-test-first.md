# LEI 10: Testes Antes da Implementação (TDD)

**Motivo:** Garantir que código atende requisitos, não apenas "parece funcionar".

---

## 🔴🟢🔵 Workflow

### 1. Red: Escreva testes que DEVEM falhar
### 2. Green: Código mínimo para passar
### 3. Refactor: Melhore mantendo testes verdes

---

## Cobertura Mínima

- Funções de negócio: 80%
- Edge cases: null, array vazio, strings vazias, limites
- Erros: 1 teste de exceção por função

---

## ✅ Exemplo Correto (TDD)

### 1. PRIMEIRO: Escreva os testes

```python
# tests/test_discount.py
import pytest
from app.services.pricing import calculate_discount, InvalidCouponError

class TestCalculateDiscount:
    def test_valid_coupon_applies_discount(self):
        assert calculate_discount(100.0, "SAVE10") == 90.0

    def test_no_coupon_returns_original_price(self):
        assert calculate_discount(100.0, None) == 100.0

    def test_invalid_coupon_raises_error(self):
        with pytest.raises(InvalidCouponError):
            calculate_discount(100.0, "FAKE123")

    def test_negative_price_raises_error(self):
        with pytest.raises(ValueError):
            calculate_discount(-50.0, "SAVE10")

    def test_zero_price_returns_zero(self):
        assert calculate_discount(0.0, "SAVE10") == 0.0
```

**Resultado:** Todos os testes FALHAM (função não existe).

### 2. DEPOIS: Implemente o mínimo

```python
# app/services/pricing.py
class InvalidCouponError(Exception):
    pass

def calculate_discount(price: float, coupon_code: str | None) -> float:
    if price < 0:
        raise ValueError("Preço não pode ser negativo")

    if not coupon_code:
        return price

    coupon = COUPONS.get(coupon_code.upper())
    if not coupon:
        raise InvalidCouponError(f"Cupom inválido: {coupon_code}")

    return price * (1 - coupon["discount"])
```

**Resultado:** Todos os testes PASSAM.

### 3. REFACTOR: Melhore sem quebrar testes

```python
# Adicionar validação adicional, tipos, etc
# Testes continuam passando!
```

---

## 🎯 Checklist

- [ ] Testes escritos ANTES da implementação
- [ ] Edge cases cobertos (null, zero, empty)
- [ ] Testes de erro (exceções)
- [ ] 80%+ cobertura em funções críticas
- [ ] Rodar antes de commit: `pytest --cov`

---

**Criado em:** 2026-03-20
