# Biblioteca Pessoal — Caio Gaia

Ferramentas desenvolvidas e customizadas por você. Código proprietário.

---

## MCPs (3)

### mcp-google-ads
- **Descrição:** Acesso à API do Google Ads
- **Uso:** Gestão de campanhas, análise de performance
- **Stack:** Python, Google Ads API
- **Localização:** `mcps/mcp-google-ads/`

### mcp-google-sheets
- **Descrição:** Integração com Google Sheets
- **Uso:** Relatórios automáticos, CRMs simples
- **Stack:** Python, Google Sheets API
- **Localização:** `mcps/mcp-google-sheets/`

### meta-ads-mcp
- **Descrição:** Integração com Meta Ads (Facebook/Instagram)
- **Uso:** Gestão de campanhas sociais
- **Stack:** Python, Meta Ads API
- **Localização:** `mcps/meta-ads-mcp/`

---

## Agentes (2)

### predator-orchestrator
- **Descrição:** 10 agentes Python especializados em análise comercial
- **Agentes:**
  - `agent_01_detetive_gmb` — Google My Business
  - `agent_02_perito_site` — Audit de site
  - `agent_03_auditor_atencao` — Audit de atenção
  - `agent_04_espiao_mercado` — Market intelligence
  - `agent_05_rastreador_leads` — Lead tracking
  - `agent_06_maestro_ads` — Ads management
  - `agent_07_alquimista_ofertas` — Offer engineering
  - `agent_08_tribunal_boss` — Senior analyst
  - `agent_09_sniper_fechamento` — Sales closing
  - `agent_10_design_visionary` — Design review
- **Uso:** Diagnóstico de clientes B2B, relatórios
- **Stack:** Python, FastAPI
- **Localização:** `agents/predator-orchestrator/`
- **Saída:** `predator_report.json` com insights estruturados

### jarvis-orchestrator
- **Descrição:** Orquestrador multi-agente de automação
- **Specialidades:** WhatsApp automation, CRM integration (Zandu), workflow orchestration
- **Uso:** Automação de vendas, integrações
- **Stack:** TypeScript, Axios, Zandu CRM API
- **Localização:** `agents/jarvis-orchestrator/`
- **Arquivo principal:** `jarvis_orchestrator.ts`

---

## Skills (14)

### Customizadas por você (4)

#### project-hygiene
- **Descrição:** Scan e limpeza de projetos — arquivos mortos, duplicatas, naming, lixo macOS
- **Quando usar:** Antes de releases, a cada 10 commits, quando o projeto parece bagunçado
- **Localização:** `skills/SKILL_project-hygiene.md`

#### 00-andruia-consultant
- **Descrição:** Consultor estratégico
- **Quando usar:** Início de projetos, alinhamento estratégico
- **Localização:** `skills/00-andruia-consultant/`

#### 10-andruia-skill-smith
- **Descrição:** Criador de skills
- **Quando usar:** Quando precisa adicionar habilidades novas
- **Localização:** `skills/10-andruia-skill-smith/`

#### 20-andruia-niche-intelligence
- **Descrição:** Inteligência de nicho e mercado
- **Quando usar:** Pesquisa de mercado, análise de concorrentes
- **Localização:** `skills/20-andruia-niche-intelligence/`

### Criadas por Você (4 novas)

#### radar
- **Descrição:** Scout persistente — inteligência operacional por zonas. Acumula observações durante trabalho, resolve oportunisticamente (princípio da carona), gradua padrões recorrentes
- **Quando usar:** Qualquer projeto ativo de médio/longo prazo
- **Localização:** `skills/SKILL_radar.md`

#### claude-code-workflow-guide
- **Descrição:** Guia essencial de boas práticas para Claude Code
- **Conteúdo:** Setup, CLAUDE.md, hooks, skills, memória, workflows, atalhos
- **Uso:** Referência no início de qualquer projeto novo
- **Localização:** `skills/SKILL_claude-code-workflow-guide.md`

#### slides-with-claude
- **Descrição:** Workflow estruturado em 3 etapas para criar apresentações
- **Etapas:** Pesquisa → Estrutura → Geração (Gamma/Figma/PowerPoint)
- **Uso:** Sempre que precisa criar slides executivas ou pitch decks
- **Localização:** `skills/SKILL_slides-with-claude.md`

### Adicionadas da Comunidade (10)

#### claude-remote-control
- **Descrição:** Controle remoto do Claude Code
- **Uso:** Automação de Claude em scripts e workflows
- **Localização:** `skills/claude-remote-control/`

#### security
- **Descrição:** Auditoria e correção de vulnerabilidades
- **Uso:** Revisão de segurança, identificação de exploits, OWASP Top 10
- **Localização:** `skills/security/`

#### self-healing
- **Descrição:** Self-healing e auto-correção
- **Uso:** Debugging automático, memory management, pattern recognition
- **Localização:** `skills/self-healing/`

#### create-skill
- **Descrição:** Meta-skill para criar novas skills
- **Uso:** Quando você quer desenvolver skills novas sistematicamente
- **Localização:** `skills/create-skill/`

#### know-me
- **Descrição:** Personalização e memória do Claude
- **Uso:** Aprender suas preferências, padrões de trabalho
- **Localização:** `skills/know-me/`

#### researcher
- **Descrição:** Pesquisa e análise aprofundada
- **Uso:** Investigações, deep dives, análise de dados
- **Localização:** `skills/researcher/`

#### cost-reducer
- **Descrição:** Otimização de tokens e custos
- **Uso:** Reduzir uso de API, otimizar prompts
- **Localização:** `skills/cost-reducer/`

#### scalability
- **Descrição:** Escalabilidade e performance
- **Uso:** Otimizar aplicações para crescimento, padrões de design
- **Localização:** `skills/scalability/`

#### trigger-dev
- **Descrição:** Integração com Trigger.dev
- **Uso:** Workflows e jobs em tempo real
- **Localização:** `skills/trigger-dev/`

#### n8n
- **Descrição:** Integração com n8n
- **Uso:** Orquestração de workflows complexos
- **Localização:** `skills/n8n/`

---

## Workflows (10 categorias)

### AI Tools
- ai-agent
- prompt-engineering
- rag-pipeline
- workflow-creator

### Creative
- dashboard-ui
- design-system
- email-template
- landing-page

### Database
- db-migrate
- db-schema
- db-seed

### Debugging
- debug-error
- debug-log
- performance

### Deployment
- ci-cd
- deploy
- docker
- env-config
- railway-deploy
- vercel-deploy

### Development
- cli-tool
- library
- migrate
- new-api
- new-component
- new-feature
- new-project
- nextjs-app
- refactor

### Documentation
- api-docs
- architecture
- readme

### Git
- git-commit
- git-conflict
- git-pr
- git-rebase

### Security
- auth-implementation
- dependency-check
- security-audit

### Testing
- code-review
- e2e-test
- playwright-test
- test-coverage
- unit-test

---

## Rules (16)

### Protocolos (2)

#### agents.md
- **Descrição:** Protocolo e constituição do agente (Caio + Antigravity)
- **Conteúdo:** Slash-commands (/genesis, /scout, /blueprint, /forge, /craft, /change), recovery protocol, project map
- **Localização:** `rules/agents.md`

#### securitycoderules.md
- **Descrição:** Checklist completo de segurança para web apps (SaaS)
- **Conteúdo:** Autenticação (iron-session), RLS, APIs, proteção de dados, async, LangGraph, qualidade de código
- **Uso:** Copiar para todo novo projeto — validar antes de deploy
- **Localização:** `rules/securitycoderules.md`

### 14 Leis para IDEs Agenticas (por Breno Vieira Silva - Lion Lab)

#### rule-01-security-isolation.md
- **Lei:** Isolamento de Segurança — Frontend NUNCA acessa Service Role
- **Regras:** Sem keys no frontend, escrita via `/api`, iron-session AES-256-GCM

#### rule-02-async-performance.md
- **Lei:** Performance e Concorrência — FastAPI nunca trava
- **Regras:** Async first, sem `time.sleep()`, sem `requests.get()`, Celery para ops longas

#### rule-03-multi-tenant-shield.md
- **Lei:** Blindagem Multi-Tenant — Isolamento rigoroso entre empresas
- **Regras:** `company_id` sempre da sessão, RLS em todas as tabelas

#### rule-04-secrets-vault.md
- **Lei:** Cofre de Segredos — APIs em texto puro = vazamento
- **Regras:** Criptografia em repouso, sem logs de tokens, validação no startup

#### rule-05-session-hardening.md
- **Lei:** Hardening de Sessão — Proteção contra sequestro de cookies
- **Regras:** `httpOnly: true`, `secure: true`, `sameSite: 'lax'`, cleanup automático

#### rule-06-clean-architecture.md
- **Lei:** Arquitetura Limpa — Combater código sujo e duplicação
- **Regras:** Lógica em Services, routers finos, DRY absolutamente obrigatório

#### rule-07-credential-hygiene.md
- **Lei:** Higiene de Credenciais — Senhas fracas são vulneráveis
- **Regras:** bcrypt rounds=12, validar complexidade (8+, maiúscula, minúscula, número)

#### rule-08-error-handling.md
- **Lei:** Tratamento de Erros com Contexto — Zero swallow, correlation IDs
- **Regras:** Nunca `except: pass`, logs com contexto, mensagens amigáveis ao user

#### rule-09-dependency-hygiene.md
- **Lei:** Higiene de Dependências — Prevenir supply chain attacks
- **Regras:** `pip-audit` antes de adicionar, >1000 downloads/semana, função trivial? implemente inline

#### rule-10-test-first.md
- **Lei:** TDD — Testes Antes da Implementação (Red → Green → Refactor)
- **Regras:** 80% cobertura, edge cases, testes de erro, fail fast

#### rule-11-api-consistency.md
- **Lei:** Consistência de API REST — APIs previsíveis reduzem erros
- **Regras:** GET/POST/PATCH/DELETE padrão, rotas em plural, status codes corretos

#### rule-12-commit-discipline.md
- **Lei:** Disciplina de Commits (Conventional Commits) — Histórico legível
- **Regras:** `<type>(<scope>): <desc>`, max 72 chars, body explica "por que"

#### rule-13-env-isolation.md
- **Lei:** Isolamento de Ambientes — Nunca compartilhe bancos entre ambientes
- **Regras:** `DEV_`, `STAGING_`, `PROD_` prefixes, validação no startup, `.env.production` NUNCA commitado

#### rule-14-documentation-code.md
- **Lei:** Documentação como Código — Código auto-documentado
- **Regras:** Nomes descritivos, funções <20 linhas, docstrings obrigatórios, README vivo

---

## Workflows Interativos (2)

### buildsaas-workflow.md
- **Descrição:** SaaS Building Workflow — 7 etapas de planejamento interativo
- **Etapas:** Discovery → PRD → Database → Backend → Frontend → Security → Documentos Finais
- **Saída:** 3 documentos completos (prd-backend.md, prd-frontend.md, implementation-plan.md)
- **Stack:** Next.js 16 + FastAPI + Supabase + Stripe
- **Contexto:** Usa docs/discovery-notes.md para persistência automática
- **Uso:** Ativar em novo SaaS com `/build-saas`
- **Localização:** `workflows/buildsaas-workflow.md`

### scale-2026-workflow.md
- **Descrição:** Planejamento Estratégico — 8 etapas de análise + escalabilidade
- **Etapas:** SWOT → Competição → Personas → Value Prop → GTM → Pricing → Financeiro → Pivot Options
- **Saída:** 8 documentos completos (strategic-plan/01-*.md até 08-*.md)
- **Frameworks:** McKinsey SWOT, BCG Competition, Strategyzer CVP, Jobs-to-be-done
- **Contexto:** Usa docs/strategic-notes.md para persistência automática
- **Uso:** Ativar em qualquer negócio/projeto com `/scale-2026`
- **Localização:** `workflows/scale-2026-workflow.md`

---

**Status:** Propriedade intelectual — não compartilhado publicamente
