# LEI 05: Hardening de Sessão

**Motivo:** Proteção contra ataques de sessão e sequestro de cookies.

---

## 🔐 Padrões de Cookie

### Atributos Obrigatórios
```javascript
{
  httpOnly: true,    // Impede acesso via JS (XSS)
  secure: true,      // Só via HTTPS em produção
  sameSite: 'lax',   // Previne CSRF
  maxAge: 604800,    // 7 dias
}
```

### Expiracao Dinâmica
- Session curta: 1 dia
- "Lembrar-me": 30 dias

### Cleanup no Middleware
Sessões expiradas devem deletar o cookie.

---

## ❌ Exemplo ERRADO

```typescript
export const sessionOptions = {
  cookieName: "session",
  password: process.env.SESSION_SECRET!,
  cookieOptions: {
    secure: false,      // 🔴 Funciona em HTTP!
    httpOnly: false,    // 🔴 Acessível via JS!
    sameSite: "none",   // 🔴 Enviado em qualquer request!
  },
}
```

---

## ✅ Exemplo CORRETO

```typescript
export const sessionOptions = {
  cookieName: "__Host-session",  // Prefixo __Host garante HTTPS
  password: process.env.SESSION_SECRET!,  // 32+ chars
  cookieOptions: {
    secure: process.env.NODE_ENV === "production",
    httpOnly: true,
    sameSite: "lax" as const,
    maxAge: 60 * 60 * 24 * 7,  // 7 dias
  },
}

// Lógica de "lembrar-me"
export function getSessionTTL(rememberMe: boolean): number {
  return rememberMe
    ? 60 * 60 * 24 * 30  // 30 dias
    : 60 * 60 * 24       // 1 dia
}
```

### Cleanup no Middleware

```typescript
export async function middleware(request: NextRequest) {
  const session = await getIronSession(cookies(), sessionOptions)

  if (session.expiresAt && Date.now() > session.expiresAt) {
    session.destroy()
    cookies().delete(sessionOptions.cookieName)
    return NextResponse.redirect(new URL('/login', request.url))
  }
}
```

---

## 🎯 Checklist

- [ ] Cookies com `httpOnly: true`
- [ ] Prefixo `__Host-` no nome do cookie
- [ ] `sameSite: 'lax'` (nunca 'none')
- [ ] `secure: true` em produção
- [ ] Cleanup de sessões expiradas
- [ ] SESSION_SECRET com 32+ caracteres aleatórios

---

**Criado em:** 2026-03-20
