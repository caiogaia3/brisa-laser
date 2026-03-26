# LEI 07: Higiene de Credenciais

**Motivo:** Senhas fracas e hashes obsoletos são vulneráveis a brute-force.

---

## 🔐 Requisitos de Senha

### Hashing
- Use `bcrypt` com fator 12
- SHA-256 legado → marcar para migração

### Complexidade
- 8+ caracteres
- 1 maiúscula
- 1 minúscula
- 1 número

### Tokens Seguros
Use `secrets.token_urlsafe(32)` para reset/convite.

---

## ❌ Exemplo ERRADO

```python
import hashlib, random

def create_user(email: str, password: str):
    password_hash = hashlib.sha256(password.encode()).hexdigest()  # 🔴 Rápido demais!
    save_user(email, password_hash)

def generate_reset_token():
    return str(random.randint(100000, 999999))  # 🔴 Previsível!
```

---

## ✅ Exemplo CORRETO

```python
import bcrypt, secrets, re

class PasswordPolicy:
    MIN_LENGTH = 8
    PATTERN = re.compile(r'^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$')

    @classmethod
    def validate(cls, password: str) -> tuple[bool, str | None]:
        if len(password) < cls.MIN_LENGTH:
            return False, f"Mínimo {cls.MIN_LENGTH} caracteres"
        if not cls.PATTERN.match(password):
            return False, "Deve conter maiúscula, minúscula e número"
        return True, None

def create_user(email: str, password: str):
    valid, error = PasswordPolicy.validate(password)
    if not valid:
        raise ValueError(error)

    password_hash = bcrypt.hashpw(
        password.encode(),
        bcrypt.gensalt(rounds=12)
    ).decode()

    save_user(email, password_hash)

def generate_reset_token() -> str:
    return secrets.token_urlsafe(32)
```

---

## 🎯 Checklist

- [ ] Usar bcrypt rounds=12
- [ ] Validar complexidade (8+, maiúscula, minúscula, número)
- [ ] Nunca SHA-256 para senhas
- [ ] Reset tokens com `secrets.token_urlsafe(32)`
- [ ] Testar contra dicionários comuns (top 10k passwords)

---

**Criado em:** 2026-03-20
