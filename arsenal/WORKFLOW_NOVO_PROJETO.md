# 🚀 Workflow Completo: Iniciando um Novo Projeto

**Guia passo-a-passo com detalhes e exemplos práticos.**

---

## 📋 Índice

1. [Fase 0: Pre-Setup](#fase-0-pre-setup)
2. [Fase 1: Estrutura Básica](#fase-1-estrutura-básica)
3. [Fase 2: CLAUDE.md (Memória do Projeto)](#fase-2-claudemd-memória-do-projeto)
4. [Fase 3: Escolher Stack e Ferramentas](#fase-3-escolher-stack-e-ferramentas)
5. [Fase 4: Configurar Regras e Segurança](#fase-4-configurar-regras-e-segurança)
6. [Fase 5: Setup de Desenvolvimento](#fase-5-setup-de-desenvolvimento)
7. [Fase 6: Primeiro Commit](#fase-6-primeiro-commit)
8. [Resumo Prático](#resumo-prático)

---

## Fase 0: Pre-Setup

### O que você tem agora?

Você tem uma biblioteca completa de:
- ✅ 16 Rules (segurança, performance, arquitetura)
- ✅ 2 Workflows interativos (buildsaas, scale-2026)
- ✅ 3 Skills (claude-code-guide, slides-with-claude, etc)
- ✅ 9 MCPs, 23 Skills community, 2 Agentes
- ✅ 5+ Templates prontos
- ✅ Scripts de automação

**Seu trabalho:** Copiar, adaptar e seguir as regras.

---

## Fase 1: Estrutura Básica

### Passo 1.1: Criar pasta do projeto

```bash
mkdir ~/meu-novo-projeto
cd ~/meu-novo-projeto
git init
```

### Passo 1.2: Copiar arquivos base do template

```bash
# Copiar CLAUDE.md template
cp /Users/CaioGaia/Documents/PROJETOS\ /arsenal/templates/CLAUDE.md.template ./CLAUDE.md

# Copiar context.md template
cp /Users/CaioGaia/Documents/PROJETOS\ /arsenal/templates/context.md.template ./context.md

# Copiar security rules
cp /Users/CaioGaia/Documents/PROJETOS\ /arsenal/templates/securitycoderules.md ./securitycoderules.md

# Copiar .env example
cp /Users/CaioGaia/Documents/PROJETOS\ /arsenal/templates/.env.example.template ./.env.example
```

### Passo 1.3: Estrutura de pasta mínima

```bash
mkdir -p src/{api,services,models,utils}
mkdir -p tests/{unit,integration}
mkdir -p docs
mkdir -p .github/workflows
touch .gitignore README.md
```

---

## Fase 2: CLAUDE.md (Memória do Projeto)

### O que é CLAUDE.md?

`CLAUDE.md` = Memória persistente que Claude lê automaticamente a cada sessão. Carregado no início.

### Passo 2.1: Editar CLAUDE.md

Abra o arquivo copiado e customize:

```markdown
# CLAUDE.md — Meu Novo Projeto

## 🎯 Projeto

**Nome:** Meu Novo App
**Tipo:** Next.js + FastAPI + Supabase (ou especifique seu stack)
**Objetivo:** [Descreva em 1-2 sentencas o que resolve]
**Público:** [Quem usa: empresas, freelancers, etc]

---

## 🗺️ Estrutura

```
src/
├── app/               # Next.js App Router (frontend)
│   ├── api/          # API routes (proxy autenticado)
│   ├── dashboard/    # Página protegida
│   └── ...
├── backend/          # FastAPI (servidor python)
│   ├── app/
│   │   ├── api/      # Rotas (endpoints)
│   │   ├── services/ # Lógica de negócio
│   │   └── models/   # Schemas Pydantic
│   └── tests/
└── docs/
    ├── context.md    # Estado da sessão
    └── ...
```

---

## 🎯 Decisões Críticas

### 1. Stack Padrão
- Frontend: Next.js 16 App Router + TypeScript + Tailwind + shadcn/ui
- Backend: FastAPI + Python 3.11 + Pydantic + async/await
- Database: Supabase (PostgreSQL + Auth + RLS)
- Auth: iron-session (cookie httpOnly)
- Hosting: Vercel (frontend) + Railway (backend)

### 2. Prioridades de Features
- P0 (MVP): [feature 1, feature 2]
- P1 (First month): [feature 3, feature 4]
- P2 (Future): [feature 5, feature 6]

---

## 🚫 Restrições

### SECURITY
- ❌ NUNCA use SUPABASE_SERVICE_ROLE_KEY no frontend
- ❌ TODO write pass por `/api` route (validado)
- ❌ NUNCA exponha user_id, subscription_id em URLs
- ✅ USE iron-session + cookies httpOnly
- ✅ USE RLS em TODAS as tabelas
- Referência: `../securitycoderules.md`

### CODE QUALITY
- ❌ NUNCA `time.sleep()` ou `requests.get()` em FastAPI
- ❌ NUNCA código comentado (use git history)
- ✅ USE async/await em tudo
- ✅ USE Celery para ops >1s
- ✅ USE tests first (TDD: Red → Green → Refactor)
- Referência: `../regras/rule-02-async-performance.md`

### COMMITS
- Format: `<type>(<scope>): <description>`
- Types: feat, fix, docs, test, refactor, chore
- Max 72 chars (primeira linha)
- Referência: `../regras/rule-12-commit-discipline.md`

---

## 📚 Ferramentas Disponíveis

### MCPs do Projeto
- Nenhum customizado ainda (adicionar conforme necessário)

### Skills Pessoais (Biblioteca)
- `00-andruia-consultant` — estratégia inicial
- `security` — auditoria de vulnerabilidades
- `create-skill` — criar nova skill
- Acesso: `/Users/CaioGaia/Documents/PROJETOS /arsenal/pessoal/skills/`

### Workflows Interativos
- `/build-saas` — se for SaaS (7 etapas)
- `/scale-2026` — se precisa planejamento estratégico (8 etapas)

### Regras a Seguir
- rule-01: Security Isolation (frontend/backend)
- rule-02: Async Performance
- rule-03: Multi-Tenant Isolation
- rule-04: Secrets Vault
- rule-05: Session Hardening
- rule-06: Clean Architecture
- rule-07: Credential Hygiene
- rule-08: Error Handling
- rule-09: Dependency Hygiene
- rule-10: Test First (TDD)
- rule-11: API Consistency
- rule-12: Commit Discipline
- rule-13: Env Isolation
- rule-14: Documentation Code

---

## 📖 Arquivos Importantes

- `securitycoderules.md` — Checklist de segurança (leia antes de deploy!)
- `context.md` — Estado atual (atualizar ao completar etapas)
- `.env.example` — Variáveis de ambiente necessárias
- `.github/workflows/` — CI/CD pipelines

---

## ⏭️ Próximos Passos

**Agora (hoje):**
1. [ ] Claude: leia este CLAUDE.md
2. [ ] Claude: confirme o contexto e peça clarificações
3. [ ] Claude: sugira stack baseado nos requisitos

**Primeira semana:**
1. [ ] Setup de dev (install dependencies)
2. [ ] Scaffold de projeto (CLI tools, templates)
3. [ ] Primeiro hello world (end-to-end)
4. [ ] Database schema básico (Supabase)
5. [ ] Auth setup (iron-session + proxy)
6. [ ] Teste end-to-end (login funciona?)

**Segunda semana:**
1. [ ] P0 features (MVP mínimo)
2. [ ] Testes (unit + integration)
3. [ ] Documentação do código
4. [ ] Code review com Claude (usando `/code-review` skill)
```

### Passo 2.2: Editar context.md

```markdown
# Context — Meu Novo Projeto

## 🎯 Objetivo
Construir [descrição do que estou fazendo].

## 📊 Estado Atual
- ✅ Etapa 1: Setup inicial (estrutura, CLAUDE.md, dependencies)
- ⏭️ Etapa 2: Database schema
- ⏳ Etapa 3: Auth
- ⏳ Etapa 4: APIs
- ⏳ Etapa 5: Frontend
- ⏳ Etapa 6: Deploy

## 💡 Decisões Tomadas
1. **Stack:** Next.js + FastAPI + Supabase
   - Por quê: Full-stack JavaScript compatível, PostgreSQL robusto

2. **Auth:** iron-session via cookie httpOnly
   - Por quê: Seguro, simples, sem JWT no storage

3. **Database:** Supabase (PostgreSQL + RLS)
   - Por quê: Managed, RLS nativo, auth integrado

## 🐛 Erros Já Resolvidos
(Nenhum ainda)

## 📋 Arquivos Importantes
- `CLAUDE.md` — Memória do projeto
- `securitycoderules.md` — Validar antes de deploy
- `src/` — Código-fonte
- `tests/` — Testes

## ⏭️ Próximos Passos
1. Instalar dependencies
2. Setup de database (Supabase)
3. Criar schema SQL
4. Implementar auth

---

**Última atualização:** 2026-03-20 10:00
**Status:** ✅ Em progresso (Etapa 1 completa)
```

---

## Fase 3: Escolher Stack e Ferramentas

### Passo 3.1: Ler o CATALOG da biblioteca

```bash
# Abrir e ler
cat "/Users/CaioGaia/Documents/PROJETOS /arsenal/CATALOG.md"

# Depois pedir ao Claude:
# "Leia o CATALOG e sugira ferramentas para meu projeto de [descrição]"
```

### Passo 3.2: Exemplo — Projeto SaaS

Se é um SaaS novo:

```bash
# Pedir ao Claude
# "Quero construir um SaaS de [descrição]. Leia a biblioteca e sugira MCPs, skills e workflows."

# Resposta esperada:
# ✅ Workflow: /build-saas (7 etapas de planejamento)
# ✅ Skills: security, create-skill
# ✅ MCPs: mcp-google-sheets (relatórios)
# ✅ Templates: CLAUDE.md, .env.example
# ✅ Rules: rule-01 (security), rule-02 (async), rule-06 (clean arch), rule-10 (TDD)
```

### Passo 3.3: Adaptar Decisões no CLAUDE.md

Qualquer decisão importante → atualizar CLAUDE.md:

```markdown
## 🎯 Decisões Críticas

### 1. Será SaaS? Sim, multi-tenant
**Implicação:** Usar rule-03 (multi-tenant-shield)

### 2. Usar IA? Sim, para análise de documentos
**Implicação:** Usar LangGraph, async Celery workers

### 3. Pagamento? Stripe com trials
**Implicação:** Webhook validation, RLS em billing tables
```

---

## Fase 4: Configurar Regras e Segurança

### Passo 4.1: Copiar regras relevantes

```bash
# Se é SaaS (multi-tenant)
cp /Users/CaioGaia/Documents/PROJETOS\ /arsenal/pessoal/rules/rule-03-multi-tenant-shield.md ./rules/

# Se usa IA/LLMs
cp /Users/CaioGaia/Documents/PROJETOS\ /arsenal/pessoal/rules/rule-02-async-performance.md ./rules/

# Se tem auth
cp /Users/CaioGaia/Documents/PROJETOS\ /arsenal/pessoal/rules/rule-01-security-isolation.md ./rules/
cp /Users/CaioGaia/Documents/PROJETOS\ /arsenal/pessoal/rules/rule-05-session-hardening.md ./rules/

# Se tem secrets (API keys, etc)
cp /Users/CaioGaia/Documents/PROJETOS\ /arsenal/pessoal/rules/rule-04-secrets-vault.md ./rules/
```

### Passo 4.2: Adicionar regras ao CLAUDE.md

```markdown
## 🚫 Restrições (Leis a Seguir)

### Security (Rule-01, Rule-03, Rule-05)
- ❌ Service Role NUNCA no frontend
- ❌ Writes sem validação em /api
- ✅ iron-session + RLS em todas as tabelas

Referência completa: `./rules/rule-01-security-isolation.md`

### Performance (Rule-02, Rule-09)
- ❌ Nenhum time.sleep() ou requests.get() em FastAPI
- ✅ async/await em tudo, Celery para ops >1s

Referência: `./rules/rule-02-async-performance.md`

### Code Quality (Rule-06, Rule-10, Rule-14)
- ✅ TDD (testes primeiro, 80% cobertura)
- ✅ Services finos (<20 linhas), Clean Architecture
- ✅ Nomes descritivos, docstrings obrigatórios

Referência: `./rules/rule-06-clean-architecture.md`
```

### Passo 4.3: Copiar .env.example e .gitignore

```bash
# Criar .env.example
cat > .env.example << 'EOF'
# Database
DATABASE_URL=postgresql://user:pass@localhost/dbname
DATABASE_ENV=development

# Auth
SESSION_SECRET=your-32-char-secret-here

# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key-here

# External APIs (if needed)
OPENAI_API_KEY=sk-...
STRIPE_SECRET_KEY=sk_test_...

# Feature flags
FEATURE_AI_ANALYSIS=true
EOF

# Criar .gitignore
cat > .gitignore << 'EOF'
.env.local
.env.production.local
.env.*.local
node_modules/
venv/
__pycache__/
.DS_Store
.claude/
EOF
```

---

## Fase 5: Setup de Desenvolvimento

### Passo 5.1: Setup Frontend (Next.js)

```bash
# Criar estrutura Next.js
npx create-next-app@latest . --typescript --tailwind --app

# Instalar dependências adicionais
npm install @supabase/supabase-js iron-session
npm install -D @testing-library/react jest
```

### Passo 5.2: Setup Backend (FastAPI)

```bash
# Criar venv
python -m venv venv
source venv/bin/activate

# Instalar FastAPI + dependências
pip install fastapi uvicorn pydantic sqlalchemy httpx structlog

# Criar arquivo requirements.txt
pip freeze > requirements.txt
```

### Passo 5.3: Setup Database (Supabase)

Logar em supabase.com e:

1. Criar novo projeto
2. Copiar `NEXT_PUBLIC_SUPABASE_URL` para `.env.local`
3. Gerar `SUPABASE_SERVICE_ROLE_KEY` em settings
4. Adicionar ao `.env.local`

### Passo 5.4: Estrutura de Backend (FastAPI)

```python
# backend/app/main.py
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # Next.js dev
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/health")
async def health():
    return {"status": "ok"}
```

### Passo 5.5: Estrutura de Frontend (Next.js)

```typescript
// app/api/health/route.ts
export async function GET() {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/health`,
    { credentials: 'include' }
  )
  return Response.json(await response.json())
}

// app/page.tsx
'use client'

export default function Home() {
  return <h1>Bem-vindo ao novo projeto!</h1>
}
```

---

## Fase 6: Primeiro Commit

### Passo 6.1: Verificar git status

```bash
git status
# Deve mostrar:
# - CLAUDE.md (novo)
# - context.md (novo)
# - securitycoderules.md (novo)
# - .gitignore (novo)
# - src/, tests/, docs/ (novos)
```

### Passo 6.2: Fazer commit inicial

```bash
git add -A

git commit -m "feat: initial project setup

- Add CLAUDE.md with project memory
- Copy templates (context.md, .env.example, securitycoderules.md)
- Create folder structure (src, tests, docs)
- Add .gitignore

This sets up the foundation for development with:
- Memory persistence via CLAUDE.md
- Security rules reference (rule-01 through rule-14)
- Template files for Next.js + FastAPI
- Ready for first features in P0 phase"
```

### Passo 6.3: Adicionar remoto e fazer push (opcional)

```bash
# Se criou repo no GitHub
git remote add origin https://github.com/seu-user/seu-repo.git
git branch -M main
git push -u origin main
```

---

## Resumo Prático

### Checklist Completo (antes de começar a codificar)

```markdown
# Checklist Pre-Coding

## Estrutura
- [ ] Pasta do projeto criada
- [ ] `git init` feito
- [ ] Estrutura de pastas (src, tests, docs)

## Memória & Documentação
- [ ] CLAUDE.md editado e customizado
- [ ] context.md editado com estado inicial
- [ ] securitycoderules.md copiado
- [ ] Rules relevantes copiadas para `./rules/`

## Configuração
- [ ] .env.example com todas as variáveis
- [ ] .gitignore configurado (sem .env.local!)
- [ ] Dependencies instaladas (npm/pip)

## Setup de Stack
- [ ] Frontend: Next.js estruturado
- [ ] Backend: FastAPI com basic route (/health)
- [ ] Database: Supabase project criado, keys em .env.local

## Security
- [ ] securitycoderules.md revisado
- [ ] rule-01 (security-isolation) entendido
- [ ] rule-03 (multi-tenant) aplicado (se necessário)
- [ ] rule-05 (session-hardening) aplicado (se necessário)

## Git
- [ ] Primeiro commit feito (feat: initial project setup)
- [ ] Commit message segue rule-12 (Conventional Commits)

## Antes de começar a codificar
- [ ] Rodou `npm run dev` (Next.js funciona?)
- [ ] Rodou `python -m uvicorn app.main:app --reload` (FastAPI funciona?)
- [ ] `/health` endpoint testado
- [ ] Claude leu CLAUDE.md e confirmou contexto
```

### Template de Conversa Inicial com Claude

```
Claude, vou começar um novo projeto agora.

Primeiro, leia estes arquivos:
- ./CLAUDE.md
- ./securitycoderules.md
- ./rules/

Depois me confirme:
1. Qual é o objetivo do projeto?
2. Quais são as 3 P0 features (MVP)?
3. Quais regras são mais críticas?
4. Qual é o primeiro passo de implementação?

Quando terminar cada etapa major, eu vou pedir para você atualizar context.md.
```

### Padrão de Workflow Diário

```bash
# 1. Iniciar
cd meu-novo-projeto
claude

# 2. Claude lê CLAUDE.md automaticamente

# 3. Você descreve a feature:
# "Quero implementar login. O user entra email/senha,
# iron-session salva a sessão, redirect pra dashboard."

# 4. Claude sugere implementação

# 5. Você codifica com Claude

# 6. Ao terminar:
# "Claude, atualiza context.md com a etapa completada"

# 7. Commit:
git add -A
git commit -m "feat(auth): implement login with iron-session

- Add login route with email validation
- Create iron-session middleware
- Protect /dashboard with authenticated wrapper
- Add login form component

Fixes #1"

# 8. Próxima feature...
```

---

**Conclusão:** Você tem uma estrutura completa. Use-a! 🚀

Toda vez que iniciar um projeto:
1. Copiar arquivos do `/arsenal/templates/`
2. Editar CLAUDE.md + context.md
3. Copiar regras relevantes
4. Fazer commit inicial com conventional commits
5. Começar a codificar com Claude lendo CLAUDE.md

Good luck! 💪
