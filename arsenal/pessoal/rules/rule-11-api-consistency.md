# LEI 11: Consistência de API REST

**Motivo:** APIs previsíveis reduzem erros de integração.

---

## 📋 Convenções de Rotas

```
| Ação       | Método | Rota            | Response        |
|-----------|--------|-----------------|-----------------|
| Listar    | GET    | /resources      | 200 + array     |
| Detalhe   | GET    | /resources/:id  | 200 + objeto    |
| Criar     | POST   | /resources      | 201 + objeto    |
| Atualizar | PATCH  | /resources/:id  | 200 + objeto    |
| Substituir| PUT    | /resources/:id  | 200 + objeto    |
| Deletar   | DELETE | /resources/:id  | 204 (no content)|
```

---

## Padrão de Resposta de Erro

```json
{
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Email inválido",
    "field": "email",
    "request_id": "req_abc123"
  }
}
```

---

## ❌ Exemplo ERRADO

```python
@app.get("/getUsers")           # Verbo no path
@app.post("/user/create")       # Singular + verbo
@app.post("/delete-user/{id}")  # POST pra delete
```

---

## ✅ Exemplo CORRETO

```python
@router.get("")                              # GET /users
async def list_users(): ...

@router.get("/{user_id}")                    # GET /users/:id
async def get_user(user_id: UUID): ...

@router.post("", status_code=201)            # POST /users
async def create_user(payload: UserCreate): ...

@router.patch("/{user_id}")                  # PATCH /users/:id
async def update_user(user_id: UUID, payload: UserUpdate): ...

@router.delete("/{user_id}", status_code=204) # DELETE /users/:id
async def delete_user(user_id: UUID): ...
```

---

## 🎯 Checklist

- [ ] Rotas em plural (`/users`, não `/user`)
- [ ] Sem verbos no path (GET faz "listar", não precisa de `/getUsers`)
- [ ] Métodos corretos (DELETE para deletar, não POST)
- [ ] Status codes corretos (201 para POST create, 204 para DELETE)
- [ ] Erro padronizado com code + message + field + request_id

---

**Criado em:** 2026-03-20
