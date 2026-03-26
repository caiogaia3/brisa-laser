# Biblioteca Mestra — Caio Gaia

**Data de atualização:** 2026-03-20

## Como usar

Ao iniciar um novo projeto, leia este arquivo para descobrir quais ferramentas estão disponíveis. O Claude pode ler este catálogo e sugerir componentes, workflows, agentes e MCPs relevantes para o seu projeto.

---

## 📚 Biblioteca Pessoal

Ferramentas desenvolvidas ou profundamente customizadas por Caio Gaia.

### MCPs Pessoais

| Nome | Descrição | Stack | Quando usar |
|---|---|---|---|
| **mcp-google-ads** | Acesso à API do Google Ads via MCP | Python | Projetos com gestão de campanhas Google Ads, análise de performance de tráfego pago |
| **mcp-google-sheets** | Leitura/escrita em planilhas Google | Python | Relatórios automáticos, CRMs simples, sincronização de dados |
| **meta-ads-mcp** | API do Meta (Facebook/Instagram) | Python | Campanhas de mídia social, análise de performance Meta |

### Agentes Pessoais

| Nome | Descrição | Stack | Quando usar |
|---|---|---|---|
| **predator-orchestrator** | 10 agentes Python especializados em análise comercial | Python, FastAPI | Diagnóstico de clientes B2B, análise de mercado, geração de relatórios |
| **jarvis-orchestrator** | Orquestrador multi-agente de automação | TypeScript | Automação WhatsApp, integração CRM (Zandu), workflows de vendas |

### Skills Customizadas

| Nome | Descrição | Quando usar |
|---|---|---|
| **00-andruia-consultant** | Consultor estratégico — responde perguntas iniciais | Início de projetos, alinhamento estratégico |
| **10-andruia-skill-smith** | Criação de novas skills | Quando você quer adicionar uma habilidade nova |
| **20-andruia-niche-intelligence** | Inteligência de nicho/mercado | Análise de mercado, pesquisa de concorrentes |
| **project-hygiene** | Scan e limpeza de projetos — arquivos mortos, duplicatas, naming, lixo | Antes de releases, a cada 10 commits, quando o projeto parece bagunçado |

### Workflows Pessoais

**11 categorias + 1 workflow interativo em `pessoal/workflows/`:**

| Categoria | Workflows principais |
|---|---|
| **ai-tools** | ai-agent, prompt-engineering, rag-pipeline, workflow-creator |
| **creative** | dashboard-ui, design-system, email-template, landing-page |
| **database** | db-migrate, db-schema, db-seed |
| **debugging** | debug-error, debug-log, performance |
| **deployment** | ci-cd, deploy, docker, env-config, railway-deploy, vercel-deploy |
| **development** | cli-tool, library, migrate, new-api, new-component, new-feature, new-project, nextjs-app, refactor |
| **documentation** | api-docs, architecture, readme |
| **git** | git-commit, git-conflict, git-pr, git-rebase |
| **security** | auth-implementation, dependency-check, security-audit |
| **testing** | code-review, e2e-test, playwright-test, test-coverage, unit-test |

| Interativo | Descrição |
|---|---|
| **buildsaas-workflow** | SaaS Planning: 7 etapas (Discovery → PRD → Database → Backend → Frontend → Security → Docs). Gera prd-backend.md, prd-frontend.md, implementation-plan.md |

### Rules Pessoais

| Nome | Descrição | Quando usar |
|---|---|---|
| **agents.md** | Protocolo e constituição do agente (Caio + Antigravity) | Setup inicial, referência contínua |
| **securitycoderules.md** | Checklist de segurança para SaaS (auth, RLS, APIs, data protection, async, LangGraph, code quality) | Deve estar em TODO novo projeto — validar antes de deploy |

---

## 🌍 Biblioteca Comunidade

Forks e clones de 18 repositórios estrelados no GitHub, mantidos localmente para acesso rápido.

### MCPs Comunidade (7)

| Nome | Repositório original | Descrição |
|---|---|---|
| **google-analytics-mcp** | googleanalytics/google-analytics-mcp | Acesso aos dados do Google Analytics |
| **playwright-mcp** | microsoft/playwright-mcp | Automação web com Playwright |
| **n8n-mcp** | czlonkowski/n8n-mcp | Integração com n8n workflows |
| **mcp-agent** | lastmile-ai/mcp-agent | Framework para agentes MCP |
| **agent-mcp** | rinadelph/Agent-MCP | Framework multi-agente |
| **mcp-servers-official** | modelcontextprotocol/servers | Coleção oficial de MCPs |
| **whimsical-mcp** | BrockReece/whimsical-mcp-server | Criação de diagramas Whimsical e oficial Desktop App |

### Skills & Frameworks Comunidade (10)

| Nome | Repositório original | Descrição |
|---|---|---|
| **awesome-claude-code** | hesreallyhim/awesome-claude-code | Lista curada de skills, hooks, slash-commands |
| **superpowers** | obra/superpowers | Framework agentic para desenvolvimento |
| **get-shit-done** | gsd-build/get-shit-done | Meta-prompting e context engineering |
| **claude-mem** | thedotmack/claude-mem | Plugin de memória para Claude Code |
| **trailofbits-security** | trailofbits/skills | Skills para segurança e vulnerability research |
| **supabase-skills** | supabase/agent-skills | Skills para trabalhar com Supabase |
| **context-engineering-skills** | muratcankoylan/Agent-Skills-for-Context-Engineering | Skills avançadas de context engineering |
| **antigravity-skills** | sickn33/antigravity-awesome-skills | 1,273+ agentic skills (GRANDE!) |
| **anws-framework** | Haaaiawd/ANWS | Spec-driven workflow framework |
| **frontend-slides** | zarazhangrui/frontend-slides | Skills para criar slides web com Claude |
| **ui-ux-pro-max-skill** | nextlevelbuilder/ui-ux-pro-max-skill | 161 regras de design + 67 estilos UI — inteligência de UI/UX profissional para qualquer frontend |
| **ca-demos-and-tools** | looker-open-source/ca-demos-and-tools | Framework para Conversational BI (Looker Studio + AI Chat) |
| **genai-toolbox** | googleapis/genai-toolbox | SDK para criar ferramentas e agentes GenAI (MCP, Tool Calling) |

### Workflows Comunidade (1)

| Nome | Repositório original | Descrição |
|---|---|---|
| **antigravity-workflows** | harikrishna8121999/antigravity-workflows | Community workflows para Antigravity |

---

## 🔗 Como acessar

**Pessoal:**
```bash
/Users/CaioGaia/Documents/PROJETOS /arsenal/pessoal/
```

**Comunidade:**
```bash
/Users/CaioGaia/Documents/PROJETOS /arsenal/comunidade/
```

---

## 💡 Exemplos de uso

### Novo projeto: E-commerce com Next.js + Supabase
**Sugestões do Claude após ler este catálogo:**
- Skill: `supabase-skills` → setup de auth e DB
- Workflow: `development/new-nextjs-app` → scaffold do projeto
- Workflow: `deployment/vercel-deploy` → deploy automático
- MCP pessoal: `mcp-google-sheets` → relatórios de vendas

### Novo projeto: Automação de vendas B2B
**Sugestões:**
- Agent pessoal: `predator-orchestrator` → diagnóstico do cliente
- Agent pessoal: `jarvis-orchestrator` → automação WhatsApp
- MCP pessoal: `mcp-google-ads` → análise de campanhas
- Skill pessoal: `20-andruia-niche-intelligence` → inteligência de mercado

---

## 📦 Estatísticas

| Tipo | Pessoal | Comunidade | Total |
|---|---|---|---|
| MCPs | 3 | 6 | 9 |
| Skills/Frameworks | 16 | 12 | 28 |
| Workflows | 12 (10 + 2 interativos) | 1 repo | 13+ |
| Agentes | 2 | 0 | 2 |
| Rules | 16 (2 custom + 14 leis) | 0 | 16 |
| Templates | 6+ | 0 | 6+ |
| Scripts de automação | 3 (sync, backup, save-context) | - | 3 |
| **TOTAL** | **48+** | **19** | **67+** |

---

## 📖 Documentação & Workflows

### 🎯 Para Iniciar Novo Projeto
**Arquivo:** `WORKFLOW_NOVO_PROJETO.md` (neste diretório)

- **Fase 0:** Pre-setup (o que você tem)
- **Fase 1:** Estrutura básica (pastas, git init)
- **Fase 2:** CLAUDE.md (memória persistente)
- **Fase 3:** Escolher stack (ler CATALOG)
- **Fase 4:** Regras de segurança (copiar rule-*.md)
- **Fase 5:** Setup dev (npm install, python venv)
- **Fase 6:** Primeiro commit (Conventional Commits)

**Tempo:** 2-4 horas para setup completo
**Resultado:** Projeto estruturado, seguro, pronto para codificar

### 16 Leis para IDEs Agenticas
**Autor:** Breno Vieira Silva - Lion Lab Academy
**Localização:** `pessoal/rules/rule-01.md` até `rule-14.md`

| Lei | Foco | Checklist |
|---|---|---|
| rule-01 | Security Isolation | ❌ Service Role no frontend, ✅ Writes via /api |
| rule-02 | Async Performance | ❌ time.sleep(), ✅ async/await |
| rule-03 | Multi-Tenant | ❌ company_id do request, ✅ RLS em tudo |
| rule-04 | Secrets Vault | ❌ API keys em texto puro, ✅ Encrypt at rest |
| rule-05 | Session Hardening | ✅ httpOnly, secure, sameSite=lax |
| rule-06 | Clean Architecture | ✅ Services finos, DRY absoluto |
| rule-07 | Credential Hygiene | ✅ bcrypt rounds=12, complexidade |
| rule-08 | Error Handling | ❌ except: pass, ✅ Correlation IDs |
| rule-09 | Dependency Hygiene | ❌ pip install sem audit, ✅ npm audit first |
| rule-10 | Test First (TDD) | ✅ Red → Green → Refactor, 80% cobertura |
| rule-11 | API Consistency | ✅ GET/POST/PATCH/DELETE padrão |
| rule-12 | Commit Discipline | ✅ Conventional Commits, 72 chars max |
| rule-13 | Env Isolation | ❌ .env.production commitado, ✅ DEV/STAGING/PROD prefixes |
| rule-14 | Documentation Code | ✅ Nomes descritivos, docstrings obrigatórios |

### Context Automation
**Arquivo:** `pessoal/context-automation.md`
- Como ativar context.md automaticamente
- Opções: CLAUDE.md, git hooks, cron jobs
- Resultado: Claude sempre tem contexto, mesmo em nova sessão

---

**Última atualização:** 2026-03-20
**Maintained by:** Caio Gaia + Claude Code
**Status:** 🚀 Pronto para usar em novo projeto
