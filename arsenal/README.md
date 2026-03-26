# Biblioteca Mestra — Caio Gaia + Claude Code

Uma coleção organizada de ferramentas, workflows, skills e agentes disponíveis localmente para acesso rápido em novos projetos.

```
biblioteca/
├── CATALOG.md                 ← Leia isto primeiro
├── pessoal/                   ← Suas ferramentas
│   ├── mcps/                 (3 MCPs)
│   ├── skills/               (3 skills customizadas)
│   ├── workflows/            (10 categorias)
│   ├── agents/               (2 orquestradores)
│   └── rules/                (protocolo Antigravity)
└── comunidade/               ← Forks de repos estrelados
    ├── mcps/                 (6 MCPs)
    ├── skills/               (12 skills/frameworks)
    └── workflows/            (1 repo)
```

---

## Como usar com Claude Code

Ao iniciar um novo projeto:

```bash
# 1. Ir para o diretório do novo projeto
cd /seu/novo/projeto

# 2. Pedir ao Claude para ler a biblioteca
claude
# "Claude, leia `/Users/CaioGaia/Documents/PROJETOS /biblioteca/CATALOG.md` e sugira ferramentas para este projeto"
```

Claude então:
- Lê o `CATALOG.md`
- Analisa o seu novo projeto
- Sugere MCPs, skills, workflows e agentes relevantes
- Oferece integração rápida dessas ferramentas

---

## Estrutura

### 📚 Pessoal (`pessoal/`)

**O que tem aqui:**
- Suas 3 MCPs customizadas (Google Ads, Sheets, Meta Ads)
- Suas 2 orquestradores (Predator + Jarvis)
- Suas 3 skills personalizadas (Consultant, Skill Smith, Niche Intelligence)
- 10 categorias de workflows (deployment, development, testing, etc)
- O protocolo de agentes (agents.md)

**Natureza:** Propriedade intelectual — não é compartilhada publicamente.

### 🌍 Comunidade (`comunidade/`)

**O que tem aqui:**
- 6 MCPs clonados de repos estrelados
- 10 skills/frameworks da comunidade
- 1 coleção de workflows comunitários

**Natureza:** Forks e clones — credits aos autores originais.

---

## 📊 Estatísticas

| Categoria | Pessoal | Comunidade | Total |
|---|---|---|---|
| **MCPs** | 3 | 7 | 10 |
| **Skills** | 3 | 12 | 15 |
| **Workflows** | 10 categorias | 1 repo | 11 |
| **Agentes** | 2 | 0 | 2 |
| **Total de repos clonados** | — | 20 | 20 |

---

## 🔍 Guias Rápidos

### Encontrar um MCP específico
```bash
ls biblioteca/pessoal/mcps/
ls biblioteca/comunidade/mcps/
```

### Explorar skills (especialmente antigravity-skills com 1,273+)
```bash
ls biblioteca/comunidade/skills/antigravity-skills/ | grep seu-termo
```

### Checar um workflow
```bash
cat biblioteca/pessoal/workflows/deployment/vercel-deploy.md
```

### Entender os agentes
```bash
cat biblioteca/pessoal/agents/predator-orchestrator/predator_orchestrator.md
cat biblioteca/pessoal/agents/jarvis-orchestrator/jarvis_orchestrator.ts
```

---

## ⚙️ Manutenção

### Atualizar forks da comunidade
```bash
cd biblioteca/comunidade/mcps/google-analytics-mcp
git pull origin main
```

### Adicionar novo repo estrelado
1. Star no GitHub
2. Clone em `comunidade/[tipo]/[nome]/`
3. Atualize este README.md

### Adicionar nova ferramenta pessoal
1. Copie para `pessoal/[tipo]/[nome]/`
2. Atualize `pessoal/CATALOG.md`
3. Atualize `CATALOG.md` raiz

---

## 🎯 Próximos Passos

- [ ] Criar repo privado `caio-biblioteca-pessoal` no GitHub para backup
- [ ] Adicionar instrução no `CLAUDE.md` dos seus projetos referenciando esta biblioteca
- [ ] Testar sugestão de ferramentas com Claude em um novo projeto
- [ ] Adicionar mais workflows conforme necessário

---

**Criada em:** 2026-03-20
**Mantida por:** Caio Gaia + Claude Code (Sonnet 4.6)
**Conceito original:** `CONCEITO_BIBLIOTECA.md`
