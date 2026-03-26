# ⚡ Quick Start — Biblioteca Mestra

Comece aqui! Guia rápido (5 minutos) para entender e usar a biblioteca.

---

## 1️⃣ O que você tem agora?

```
biblioteca/
├── CATALOG.md              ← LEIA ISTO PRIMEIRO (índice com tudo)
├── README.md               ← Visão geral
├── MANUTENCAO.md          ← Como manter atualizado
├── SCRIPTS_README.md      ← Como rodar os scripts
├── pessoal/               ← Suas 13 skills + 3 MCPs + 2 agentes
├── comunidade/            ← 17 repos clonados da comunidade
└── templates/             ← Starter kit para novos projetos
```

**Total:** 23 skills, 9 MCPs, 2 agentes, 10+ workflows, 5+ templates

---

## 2️⃣ Próximos 5 minutos

### ✅ Ler este arquivo (você está aqui!)

### ✅ Entender a estrutura

```bash
# Ver o índice principal
cat "/Users/CaioGaia/Documents/PROJETOS /arsenal/CATALOG.md"

# Ver suas ferramentas pessoais
cat "/Users/CaioGaia/Documents/PROJETOS /arsenal/pessoal/CATALOG.md"

# Ver ferramentas comunitárias
cat "/Users/CaioGaia/Documents/PROJETOS /arsenal/comunidade/CATALOG.md"
```

### ✅ Configurar automação (opcional, mas recomendado)

```bash
# Abrir crontab
crontab -e

# Adicionar estas 2 linhas:
0 14 * * 1 bash /Users/CaioGaia/Documents/PROJETOS /arsenal/sync-comunidade.sh
0 22 * * 5 bash /Users/CaioGaia/Documents/PROJETOS /arsenal/backup-pessoal.sh
```

**O que faz:**
- Toda **segunda às 14h:** sincroniza repos da comunidade
- Toda **sexta às 22h:** faz backup automático

---

## 3️⃣ Seus próximos passos

### Se quiser começar um novo projeto HOJE:

```bash
# 1. Criar novo projeto
mkdir ~/novo-projeto
cd ~/novo-projeto

# 2. Copiar CLAUDE.md template
cp "/Users/CaioGaia/Documents/PROJETOS /arsenal/templates/CLAUDE.md.template" ./CLAUDE.md

# 3. Editar com info do projeto
nano CLAUDE.md

# 4. Pedir ao Claude para sugerir ferramentas
# "Claude, leia /Users/CaioGaia/Documents/PROJETOS /arsenal/CATALOG.md e diga que ferramentas servem para este projeto"
```

### Se quiser adicionar uma nova skill pessoal:

```bash
# 1. Copiar para pessoal/skills/
cp -r ~/sua-nova-skill "/Users/CaioGaia/Documents/PROJETOS /arsenal/pessoal/skills/"

# 2. Atualizar CATALOG
# (editar pessoal/CATALOG.md e adicionar entrada)

# 3. Sync com GitHub
cd "/Users/CaioGaia/Documents/PROJETOS /arsenal/pessoal"
git add .
git commit -m "feat: adicionar nova-skill"
git push
```

### Se encontrou um novo repo legal no GitHub:

```bash
# 1. Clonar para comunidade
cd "/Users/CaioGaia/Documents/PROJETOS /arsenal/comunidade/[mcps|skills]"
git clone https://github.com/author/novo-repo.git novo-repo

# 2. Atualizar CATALOG.md
# (editar comunidade/CATALOG.md)

# 3. Atualizar UPDATE_LOG.md
echo "$(date '+%Y-%m-%d') | novo-repo clonado" >> "/Users/CaioGaia/Documents/PROJETOS /arsenal/comunidade/UPDATE_LOG.md"
```

---

## 🎯 Caso de Uso: E-commerce com Next.js + Supabase

**Você:** "Claude, tenho um novo projeto de e-commerce com Next.js e Supabase. Que ferramentas temos?"

**Claude lê CATALOG.md e sugere:**

✅ **MCPs pessoais:**
- `mcp-google-sheets` — para relatórios de vendas
- `mcp-google-ads` — para campanhas (se aplicável)

✅ **Skills pessoais:**
- `security/` — verificar vulnerabilidades antes de launch
- `scalability/` — otimizar arquitetura

✅ **Skills comunidade:**
- `supabase-skills/` — setup de auth, RLS, policies

✅ **Templates:**
- `CLAUDE.md.template` — configuração do projeto
- `.env.example.template` — variáveis de ambiente
- `github-workflows/test.yml` — testes automáticos

✅ **Workflows pessoais:**
- `deployment/vercel-deploy` — deploy automático

---

## 📊 Tempo de Dedicação

| Tarefa | Frequência | Tempo |
|---|---|---|
| Ler CATALOG | Antes de novo projeto | 5 min |
| Sincronizar comunidade | Automático (cron) | 0 min |
| Adicionar skill nova | Conforme necessário | 10 min |
| Backup automático | Automático (cron) | 0 min |
| Review trimestral | A cada 3 meses | 1 hora |

**Total mensal:** ~15 minutos (se não contar automático)

---

## 🔍 Troubleshooting Rápido

| Problema | Solução |
|---|---|
| "Não sei por onde começar" | Leia `CATALOG.md` raiz |
| "Como adiciono algo novo?" | Veja `MANUTENCAO.md` |
| "Scripts não rodam" | `bash SCRIPTS_README.md` |
| "Preciso recuperar arquivo antigo" | `MANUTENCAO.md` > Backup and Versionamento |
| "Repos da comunidade estão desatualizados" | `bash sync-comunidade.sh` ou espere cron job |

---

## 🎓 Próximo Nível

Depois que você se acostumar, considere:

1. **Criar seus próprios scripts** para tarefas recorrentes
2. **Expandir templates/** com mais boilerplates
3. **Documentar padrões** de código do seu time em `pessoal/rules/`
4. **Integrar com GitHub Actions** para automação

---

## 💡 Golden Rules

1. **Sempre leia `CATALOG.md`** antes de começar novo projeto
2. **Mantenha CATALOGs atualizados** quando adicionar algo
3. **Rode sync-comunidade.sh mensalmente** (ou deixe cron fazer)
4. **Faça backup de pessoal/** regularmente
5. **Não edite repos clonados** (são forks — se mudar, use create-skill para novo)

---

## 🚀 Você está pronto!

**Próximas ações:**

```bash
# 1. Entender estrutura
cat "/Users/CaioGaia/Documents/PROJETOS /arsenal/README.md"

# 2. Ver opções de ferramentas
cat "/Users/CaioGaia/Documents/PROJETOS /arsenal/CATALOG.md"

# 3. Configurar automação
crontab -e
# (adicionar as 2 linhas de scripts)

# 4. Criar seu primeiro projeto
mkdir ~/meu-novo-projeto
cd ~/meu-novo-projeto
# e pedir ao Claude para sugerir ferramentas
```

---

**Tempo até aqui:** 5 minutos ✅

**Documentação completa:** `MANUTENCAO.md` (quando precisar)

**Scripts:** `SCRIPTS_README.md` (referência)

---

Happy coding! 🚀
