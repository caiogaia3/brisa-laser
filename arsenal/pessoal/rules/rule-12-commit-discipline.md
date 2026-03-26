# LEI 12: Disciplina de Commits (Conventional Commits)

**Motivo:** Histórico legível facilita debugging e gera changelogs automáticos.

---

## 📝 Formato Obrigatório

```
<type>(<scope>): <description>

[body opcional]

[footer opcional]
```

---

## Types Permitidos

```
feat:     Nova funcionalidade
fix:      Correção de bug
docs:     Apenas documentação
style:    Formatação (não altera lógica)
refactor: Mudança sem alterar comportamento
test:     Adição/correção de testes
chore:    Manutenção, deps, configs
```

---

## Regras Adicionais

- Description em **minúsculo**, sem ponto final
- Máximo **72 caracteres** na primeira linha
- Body explica "o que" e "por que", não "como"

---

## ❌ Exemplo ERRADO

```bash
git commit -m "fix"
git commit -m "wip"
git commit -m "changes"
git commit -m "asdfasdf"
```

---

## ✅ Exemplo CORRETO

```bash
git commit -m "feat(auth): add Google OAuth2 login flow"
git commit -m "fix(billing): correct tax calculation for EU customers"
git commit -m "docs(api): add examples for webhook endpoints"
git commit -m "chore(deps): upgrade fastapi to 0.109.0"
git commit -m "test(pricing): add edge cases for discount calculator"
```

### Com Body

```
feat(payment): add support for credit card refunds

Implement refund flow that:
- Validates refund amount
- Notifies customer via email
- Updates ledger

Fixes #123
```

---

## 🎯 Checklist

- [ ] Format: `<type>(<scope>): <description>`
- [ ] Type é um dos permitidos
- [ ] Description minúscula, sem ponto
- [ ] Máximo 72 caracteres (primeira linha)
- [ ] Body explica "por que", não "como"
- [ ] Referencia issue se houver (#123)

---

**Criado em:** 2026-03-20
