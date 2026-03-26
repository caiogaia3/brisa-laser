# LEI 01: Isolamento de Segurança

**Autor:** Breno Vieira Silva - Lion Lab Academy
**Versão:** 1.0
**Motivo:** Impedir vazamento de chaves sensíveis ou bypass da camada de lógica do backend.

---

## 🔒 Restrições Inegociáveis

### ❌ PROIBIÇÃO 1: Service Role no Frontend
Nunca, sob qualquer pretexto, utilize a `SUPABASE_SERVICE_ROLE_KEY` em arquivos `/app` ou `/components`.

**Por quê:** Service Role tem privilégios de administrador. Expor no frontend = qualquer user pode deletar todos os dados.

### ❌ PROIBIÇÃO 2: Escrita Direta via Cliente
O frontend NUNCA deve fazer `insert`, `update`, `delete` diretamente via cliente Supabase. Toda alteração passa por `/api/*`.

**Por quê:** Frontend é controlado pelo usuário (devtools). Uma rota de API permite validação no servidor.

### ❌ PROIBIÇÃO 3: Headers Inseguros
Toda nova rota deve manter CSP e Anti-Clickjacking headers:
- `frame-ancestors 'none'` para admin
- `'*'` apenas para `/embed` se necessário

---

## ✅ Padrão de Autenticação Obrigatório

Use sempre `getIronSession` com AES-256-GCM para verificar identidade no Next.js:

```typescript
import { getIronSession } from 'iron-session'

export const sessionOptions = {
  cookieName: "__Host-session",
  password: process.env.SESSION_SECRET!, // 32+ chars
  cookieOptions: {
    secure: process.env.NODE_ENV === 'production',
    httpOnly: true,
    sameSite: 'lax' as const,
    maxAge: 60 * 60 * 24 * 7, // 7 dias
  },
}

export async function requireAuth(request: NextRequest) {
  const session = await getIronSession(cookies(), sessionOptions)

  if (!session.user?.id) {
    throw new Error('Unauthorized')
  }

  return session
}
```

---

## ❌ Exemplo ERRADO

```typescript
// app/components/AdminPanel.tsx — NUNCA FAÇA ISSO!
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY! // 🔴 VAZAMENTO!
)

export function AdminPanel() {
  const deleteUser = async (id: string) => {
    // 🔴 Escrita direta, sem validação!
    await supabase.from('users').delete().eq('id', id)
  }

  return <button onClick={() => deleteUser('any-id')}>Delete</button>
}
```

**Problemas:**
1. Service Role exposto no bundle JavaScript
2. Qualquer usuário pode deletar qualquer outro
3. Sem auditoria ou validação de permissões

---

## ✅ Exemplo CORRETO

### Passo 1: Frontend chama API

```typescript
// app/components/AdminPanel.tsx
export function AdminPanel() {
  const deleteUser = async (userId: string) => {
    const response = await fetch('/api/admin/users', {
      method: 'DELETE',
      body: JSON.stringify({ userId }),
      credentials: 'include', // Envia o cookie de sessão
      headers: { 'Content-Type': 'application/json' },
    })

    if (!response.ok) {
      throw new Error('Failed to delete user')
    }
  }

  return <button onClick={() => deleteUser('user-id')}>Delete</button>
}
```

### Passo 2: API valida e executa com Service Role

```typescript
// app/api/admin/users/route.ts
import { getIronSession } from 'iron-session'
import { sessionOptions } from '@/lib/auth'
import { createClient } from '@supabase/supabase-js'

export async function DELETE(req: Request) {
  // 1. Validar sessão
  const session = await getIronSession(cookies(), sessionOptions)

  if (!session.user?.isAdmin) {
    return Response.json(
      { error: 'Forbidden' },
      { status: 403 }
    )
  }

  // 2. Validar payload
  const { userId } = await req.json()

  if (!userId) {
    return Response.json(
      { error: 'Missing userId' },
      { status: 400 }
    )
  }

  // 3. Executar com Service Role (apenas no backend!)
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY! // 🟢 Seguro no servidor
  )

  const { error } = await supabase
    .from('users')
    .delete()
    .eq('id', userId)

  if (error) {
    return Response.json({ error: error.message }, { status: 500 })
  }

  return Response.json({ success: true }, { status: 200 })
}
```

---

## 🎯 Checklist

- [ ] SUPABASE_SERVICE_ROLE_KEY NUNCA em arquivos `/app` ou `/components`
- [ ] Toda alteração de dados passa por `/api` route
- [ ] Session validada com `getIronSession` + AES-256-GCM
- [ ] Headers CSP configurados (frame-ancestors)
- [ ] Frontend usa `credentials: 'include'` em fetch
- [ ] API valida permissões ANTES de executar lógica

---

**Criado em:** 2026-03-20
