# Skill: Claude Code Workflow Essentials

**Descrição:** Guia rápido de boas práticas para maximizar produtividade com Claude Code. Cobre configuração, estrutura, skills, hooks, memória, workflows e atalhos.

**Quando usar:** Setup inicial de projeto, troubleshooting, optimização de pipeline

**Tempo:** 5-30 minutos (dependendo do que precisa)

---

## 🎯 1. Primeiros Passos (5 min)

### Instalar Claude Code

```bash
curl -fsSL https://claude.ai/install.sh | bash
# ou
npm i -g @anthropic/claude-code
```

### Estrutura Base

```
seu-projeto/
├── CLAUDE.md          ← Memória persistente do projeto
├── .claude/           ← Config local
│   └── settings.json
├── src/
│   └── ...
└── README.md
```

### Primeiro Comando

```bash
cd seu-projeto && claude
```

Depois:
1. **Iniit:**  Claude gera `CLAUDE.md` automático
2. **Refine:** Você detalha o contexto
3. **Add armadilhas:** Adicione regras que Claude deve seguir
4. **Reference docs:** Aponte pra documentação importante
5. **Add regras:** Escreva as restrições do projeto
6. **Commit:** Faça commit do CLAUDE.md → compartilha com o time

---

## 2. Entendendo CLAUDE.md (15 min)

### O que é?

`CLAUDE.md` = Memória persistente do Claude sobre seu projeto. Carregado automaticamente a cada sessão.

### Estrutura Recomendada

```markdown
# CLAUDE.md — [Projeto]

## 📋 O QUE (Projeto é sobre)
- Visão / objetivo
- Stack
- Problema que resolve

## 🗺️ COMO (Estrutura de diretórios)
- Arquitetura (breve)
- Mapa de diretórios
- Decisões de design

## 🎯 DECISÕES (Regras do projeto)
- Padrões de código
- Convenções de nomes
- Quando usar o quê

## 🚫 RESTRIÇÕES (O que Claude NÃO deve fazer)
- Não edite estes arquivos
- Não use estes padrões
- Não ignore estas armadilhas

## 📖 REFERÊNCIAS (Links importantes)
- API docs: [link]
- Architecture decisions: [arquivo]
- Workflows do time: [link]

## ⚙️ SKILLS & SCRIPTS
- `/init` → Setup novo projeto
- `/doccat` → Verify instalação
- `/run` → Script padrão

## 🔐 PERMISSÕES & SEGURANÇA
```json
{
  "permissions": {
    "bash": "always",
    "git": "always"
  }
}
```
```

---

## 3. Hierarquia de Memória do Claude

### Como Claude lê contexto (em ordem):

```
.../[project-CLAUDE.md
Global — todos os projetos
    │
    └──/.CLAUDE.md
    Parent — não do monorepo (inherited)
        │
        └──/[subproject]/CLAUDE.md
        Project-specific — contexto delimitado
            │
            └──/frontend/CLAUDE.md
            Subdirectory — ex: frontend rules specific
```

**Pro Tip:** Mantenha cada CLAUDE.md <200 linhas. Arquivos adicionais adicionais em:
- `./docs/architecture.md`
- `./docs/patterns.md`
- `./.claude/hooks.json` (automação)

---

## 4. Configurando Hooks (Automação)

### O que são?

Hooks = callbacks determinísticos que Claude executa automaticamente (pre-commit, lint check, etc)

### Tipos principais

**PreToolUse**: Antes de Claude usar uma ferramenta

```json
{
  "hooks": {
    "PreToolUse": [
      {
        "matcher": "Bash",
        "hooks": [
          {
            "type": "command",
            "command": "scripts/sec.sh"
          }
        ]
      }
    ]
  }
}
```

**PostToolUse**: Após Claude usar ferramenta

**Notification**: Claude envia msg customizada (Slack, email)

### Exemplo Real: Security Hook

```json
{
  "hooks": {
    "PreToolUse": [
      {
        "matcher": "Bash",
        "hooks": [
          {
            "type": "command",
            "command": "sh scripts/security-check.sh",
            "timeout": 5
          }
        ]
      }
    ]
  }
}
```

Toda vez que Claude tentar rodar bash, roda security check antes.

---

## 5. Adicionando Skills (O Superpoder)

### O que é uma Skill?

Skill = guia em markdown que Claude invoca automaticamente via linguagem natural.

### Tipos

**Skill do projeto:**
```
.claude/skills/[name]/SKILL.md
```

**Skill pessoal (global):**
```
~/.claude/skills/[name]/SKILL.md
```

### Estrutura de Skill

```markdown
---
name: testing patterns
description: Jest testing patterns para o projeto
allowed_tools: Read, Grep, Edit
---

# Skill: Jest Testing Patterns

Quando você pedir "write a test", use este padrão:

## Pattern 1: Unit Test
[Exemplo de código]

## Pattern 2: Integration Test
[Exemplo de código]
```

### Invocar Skill

```bash
# Linguagem natural
"Claude, write a unit test for getUserById"
# Claude detecta SKILL.md → aplica pattern

# Ou explícito
/testing-patterns
```

---

## 6. Ideias de Skills para Engenheiros IA

Você deveria criar skills para:

- **code-review** — Seu padrão de PR review
- **docker-deploy** — Seu processo de containerização
- **security-audit** — Vulnerabilidades OWASP
- **db-migration** — Seu padrão Prisma/Alembic
- **design-system** — Componentes do seu shadcn
- **api-patterns** — Seu padrão de endpoints (REST vs GraphQL)
- **error-handling** — Logging, retry logic, timeouts
- **monitoring** — Metrics, dashboards, alerts
- **commit-messages** — Seu padrão de mensagens

---

## 7. Padrão de Workflow Diário

### Comando padrão:

```
cd seu-projeto && claude

# Shift + Tab → Tab → Plan Mode
# Descreva a intenção da feature

# Shift + Tab → Auto Accept
# Claude cria plan

# Tab → Confirma plan
# Claude executa

# Esc Esc → Rewind
# Desfaz últimas ações

# Faça commits frequentemente
# Inicie nova sessão por feature
```

---

## 8. Atalhos Principais

| Atalho | Efeito |
|---|---|
| `Shift + Tab` | Ativar Plan Mode (pensa antes) |
| `Tab` | Accept / Proceed |
| `Esc Esc` | Rewind (desfazer) |
| `Shift + Tab` | Menu de retroacesso |

---

## 9. Permissões & Segurança

Sempre configure no CLAUDE.md:

```json
{
  "permissions": {
    "read": "+",          // Read qualquer arquivo
    "bash": "when_safe",  // Bash com validação
    "git": "when_safe",
    "external_apis": "-"  // Nunca chamadas externas
  }
}
```

---

## 10. Arquitetura de 4 Camadas

```
L4: Agentes (autonomia com guardrails)
    ↓
L3: Hooks (automação determinística)
    ↓
L2: Skills (padrões reutilizáveis)
    ↓
L1: CLAUDE.md (memória + regras)
```

---

## 11. Workflow Recomendado

**Dia 1 — Setup:**
```
1. Criar CLAUDE.md (30 min)
2. Identificar 3-5 skills críticas (30 min)
3. Criar skills (1-2 horas)
4. Configurar hooks (30 min)
5. Commit & compartilhar
```

**Dia 2+ — Uso:**
```
cd projeto && claude
Shift+Tab → Descreva feature
Tab → Aceita plan
Claude executa
Esc Esc → Volta se necessário
Commit frequentemente
```

---

## 12. Referência Rápida

| Comando | Efeito |
|---|---|
| `/init` | Gerar CLAUDE.md |
| `/doccat` | Verificar instalação |
| `cd seu-projeto && claude` | Iniciar sesão |
| `Shift + Tab` | Plan mode |
| `Tab` | Accept |
| `Esc Esc` | Rewind |
| `Shift + Tab` | Menu retro |

---

## Golden Rules

1. **CLAUDE.md é rey.** Mantenha sempre atualizado.
2. **Skills são superpoderes.** Crie skills para patterns repetidos (3+ vezes).
3. **Hooks são guardrails.** Use para evitar erros (security, linting, etc).
4. **Memória é contextual.** Cada projeto tem seu próprio CLAUDE.md.
5. **Rewind é seu amigo.** Não tenha medo de errar — desfaz em 1 segundo.

---

**Criado em:** 2026-03-20
**Baseado em:** Guia de Yago Martins
**Versão:** 1.0
