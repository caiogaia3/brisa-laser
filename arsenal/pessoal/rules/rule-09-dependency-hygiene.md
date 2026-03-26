# LEI 09: Higiene de Dependências

**Motivo:** Prevenir supply chain attacks e CVEs.

---

## 🔍 Critérios de Aceitação

### Freshness
Último release < 12 meses.

### Popularity
- npm: >1000 downloads/semana
- GitHub: >1000 stars

### Security
Execute `npm audit` / `pip-audit` antes de adicionar.

### Minimal
Evite dependências triviais (ex: `is-odd`).

---

## Workflow

### 1. Verificar Vulnerabilidades
```bash
pip-audit nome-do-pacote
npm audit add nome-do-pacote
```

### 2. Verificar Manutencao
- Downloads/semana: 50,000+
- Última release: < 12 meses
- Stars: 2,000+
- Maintainers: 2+

### 3. Verificar Necessidade
- Função trivial? → Implemente inline
- Já no stdlib? → Use stdlib

---

## ❌ Exemplo ERRADO

```python
# NÃO FAÇA:
from is_odd import is_odd

# FAÇA:
def is_odd(n: int) -> bool:
    return n % 2 != 0
```

---

## ✅ Dependências Recomendadas

```
# Python Backend
fastapi>=0.109.0
pydantic>=2.0.0
sqlalchemy>=2.0.0
httpx>=0.24.0
structlog>=23.0.0

# Node.js Frontend
next>=14.0.0
react>=18.0.0
typescript>=5.0.0
tailwindcss>=3.0.0
@supabase/supabase-js>=2.0.0
```

---

## 🎯 Checklist

- [ ] Cada dependência passagem `pip-audit` / `npm audit`
- [ ] Última release < 12 meses
- [ ] >1000 downloads/semana (npm) ou >1000 stars (GitHub)
- [ ] Função trivial? Implementada inline
- [ ] Já existe no stdlib? Use stdlib

---

**Criado em:** 2026-03-20
