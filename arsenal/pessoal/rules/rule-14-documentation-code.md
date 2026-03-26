# LEI 14: Documentação como Código

**Motivo:** Código auto-documentado reduz overhead de manutenção.

---

## 📚 Hierarquia de Clareza

### 1. Nomes Descritivos
- ❌ `ue` → ✅ `user_email`
- ❌ `calc` → ✅ `calculate_monthly_revenue`
- ❌ `x` → ✅ `elapsed_time_in_days`

### 2. Funções Pequenas (< 20 linhas)
Se precisa de "e" na descrição, quebre em duas funções.

### 3. Docstrings Obrigatórios
Toda função pública: descrição, parâmetros, retorno, exceções.

### 4. README Vivo
Contém: setup, exemplos, arquitetura básica.

---

## ❌ Proibições

- Comentários que repetem código
  ```python
  # ❌ i += 1  # incrementa i
  ```
- Código comentado (use git para histórico)
- TODOs sem issue/ticket

---

## ✅ Exemplo Correto

```python
def calculate_order_total(
    unit_price: Decimal,
    quantity: int,
    discount_amount: Decimal = Decimal("0"),
    apply_discount: bool = True
) -> Decimal:
    """
    Calcula o valor total de um pedido.

    Args:
        unit_price: Preço unitário do produto (deve ser >= 0)
        quantity: Quantidade de itens (deve ser >= 1)
        discount_amount: Valor absoluto do desconto a aplicar
        apply_discount: Se True, subtrai o desconto do total

    Returns:
        Valor total do pedido após desconto (se aplicável)

    Raises:
        ValueError: Se unit_price < 0 ou quantity < 1

    Example:
        >>> calculate_order_total(Decimal("10.00"), 3, Decimal("5.00"))
        Decimal("25.00")
    """
    if unit_price < 0:
        raise ValueError("Preço unitário não pode ser negativo")
    if quantity < 1:
        raise ValueError("Quantidade deve ser pelo menos 1")

    subtotal = unit_price * quantity

    if apply_discount:
        return max(subtotal - discount_amount, Decimal("0"))

    return subtotal
```

### README com Exemplos

```markdown
# API de Billing

## Setup

```bash
pip install -r requirements.txt
python -m pytest
```

## Exemplo de Uso

```python
from app.services.billing import calculate_order_total

total = calculate_order_total(
    unit_price=Decimal("10.00"),
    quantity=5,
    discount_amount=Decimal("5.00")
)
print(total)  # Decimal("45.00")
```

## Arquitetura

- `services/` — Lógica de negócio
- `api/` — Rotas HTTP
- `models/` — Schemas Pydantic
```

---

## 🎯 Checklist

- [ ] Nomes descritivos (não abreviações ambíguas)
- [ ] Funções < 20 linhas
- [ ] Docstrings em todas as funções públicas
- [ ] README com setup + exemplos + arquitetura
- [ ] Sem comentários que repetem código
- [ ] Sem código comentado (use git history)
- [ ] TODOs com issue/ticket (#123)

---

**Criado em:** 2026-03-20
