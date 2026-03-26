# 📚 Guia de Manutenção — Biblioteca Mestra

Como manter, atualizar e sincronizar a biblioteca pessoal e comunitária.

---

## 📋 Sumário

1. [Estrutura de Controle](#estrutura-de-controle)
2. [Atualizações Mensais](#atualizações-mensais)
3. [Adicionar Novas Ferramentas](#adicionar-novas-ferramentas)
4. [Sincronizar Comunidade](#sincronizar-comunidade)
5. [Backup e Versionamento](#backup-e-versionamento)
6. [Scripts de Automação](#scripts-de-automação)
7. [Checklist Trimestral](#checklist-trimestral)

---

## Estrutura de Controle

### Raiz da biblioteca

```
/Users/CaioGaia/Documents/PROJETOS /arsenal/
├── CATALOG.md                    ← ÍNDICE PRINCIPAL (atualize sempre)
├── MANUTENCAO.md                 ← este arquivo
├── pessoal/
│   ├── CATALOG.md               ← catálogo local (atualizar ao adicionar)
│   ├── pessoal.git-log.txt      ← log de mudanças (NOVO)
│   └── ...
├── comunidade/
│   ├── CATALOG.md               ← catálogo local
│   ├── UPDATE_LOG.md            ← log de sincronizações (NOVO)
│   └── ...
└── templates/
    └── MANUTENCAO_LOG.txt       ← versões de templates
```

---

## 🔄 Atualizações Mensais

### 1️⃣ **Primeira semana do mês: Sincronizar comunidade**

```bash
#!/bin/bash
# arquivo: sync-comunidade.sh

cd "/Users/CaioGaia/Documents/PROJETOS /arsenal/comunidade"

echo "=== Sincronizando comunidade ==="
echo "Data: $(date)" >> UPDATE_LOG.md

# MCPs
for mcp in mcps/*/; do
    echo "Atualizando $(basename $mcp)..."
    cd "$mcp"
    git fetch origin
    git pull origin main 2>/dev/null || git pull origin master
    cd ../..
done

# Skills
for skill in skills/*/; do
    echo "Atualizando $(basename $skill)..."
    cd "$skill"
    git fetch origin
    git pull origin main 2>/dev/null || git pull origin master
    cd ../..
done

# Workflows
cd workflows/antigravity-workflows
git pull origin main
cd ../..

echo "✅ Sincronização completa em $(date)" >> UPDATE_LOG.md
```

**Rodar:**
```bash
bash /Users/CaioGaia/Documents/PROJETOS /arsenal/sync-comunidade.sh
```

---

### 2️⃣ **Atualizar CATALOGs**

Após sincronizar:

```bash
# Verificar se houve mudanças na comunidade
cd "/Users/CaioGaia/Documents/PROJETOS /arsenal/comunidade"
git log --all --oneline --since="1 month ago" | wc -l
```

Se há mudanças, atualizar `comunidade/CATALOG.md` com:
- Novos recursos adicionados
- Breaking changes
- Deprecações

**Template para UPDATE_LOG.md:**
```markdown
## 2026-03-20

### MCPs
- google-analytics-mcp: ✅ up-to-date (no changes)
- playwright-mcp: 🔄 atualizado (2 commits novos)
- n8n-mcp: ✅ up-to-date

### Skills
- awesome-claude-code: 🔄 atualizado (5 skills novas)
- security: ✅ up-to-date

### Changelog
- [Link para novo MCP que apareceu](https://github.com/...)
- Feature descontinuada em antigravity-skills
```

---

## ➕ Adicionar Novas Ferramentas

### Para `pessoal/`

**Cenário:** Você criou um novo MCP ou skill personalizado.

```bash
# 1. Copiar para pessoal
cp -r ~/seu-novo-mcp "/Users/CaioGaia/Documents/PROJETOS /arsenal/pessoal/mcps/"

# 2. Atualizar pessoal/CATALOG.md
# (adicionar entrada na tabela de MCPs)

# 3. Atualizar CATALOG.md raiz
# (atualizar contadores e descrição)

# 4. Committar (se estiver sincronizado com GitHub)
cd "/Users/CaioGaia/Documents/PROJETOS /arsenal/pessoal"
git add .
git commit -m "feat: adicionar novo-mcp"
git push
```

**Log de mudanças (pessoal/pessoal.git-log.txt):**
```
2026-03-20 | novo-mcp adicionado | "feat: adicionar novo-mcp"
2026-03-15 | cost-reducer melhorado | "improve: otimizações no cost-reducer"
```

---

### Para `comunidade/`

**Cenário:** Você encontrou um novo repo incrível no GitHub e quer adicionar.

```bash
# 1. Verificar se não está duplicado
grep -r "novo-repo" "/Users/CaioGaia/Documents/PROJETOS /arsenal/comunidade/" || echo "Não encontrado"

# 2. Clonar
cd "/Users/CaioGaia/Documents/PROJETOS /arsenal/comunidade/[tipo]"
git clone https://github.com/author/novo-repo.git novo-repo

# 3. Atualizar comunidade/CATALOG.md
# (adicionar na seção apropriada com descrição)

# 4. Atualizar CATALOG.md raiz
# (atualizar contadores)

# 5. Adicionar ao UPDATE_LOG.md
echo "$(date '+%Y-%m-%d') | Clonado: novo-repo | https://github.com/author/novo-repo.git" >> UPDATE_LOG.md
```

---

## 🔗 Sincronizar Comunidade

### Script Automático Mensal

Crie um cron job (macOS):

```bash
# Editar crontab
crontab -e

# Adicionar linha (toda primeira segunda do mês às 14h)
0 14 * * 1 bash /Users/CaioGaia/Documents/PROJETOS /arsenal/sync-comunidade.sh
```

### Verificar o que Mudou

```bash
#!/bin/bash
# arquivo: check-updates.sh

cd "/Users/CaioGaia/Documents/PROJETOS /arsenal/comunidade"

echo "=== RESUMO DE ATUALIZAÇÕES ==="

for repo in */*/; do
    cd "$repo"
    commits=$(git log --all --oneline --since="1 month ago" | wc -l)
    if [ $commits -gt 0 ]; then
        echo "📦 $(dirname $repo)/$(basename $repo): $commits novos commits"
        git log --oneline --since="1 month ago" | head -3
        echo ""
    fi
    cd ../..
done
```

---

## 💾 Backup e Versionamento

### Backup Automático Semanal

```bash
#!/bin/bash
# arquivo: backup-pessoal.sh

BACKUP_DIR="/Users/CaioGaia/Backups/biblioteca-pessoal"
mkdir -p "$BACKUP_DIR"

# Backup de pessoal/
TIMESTAMP=$(date +%Y%m%d_%H%M%S)
cp -r "/Users/CaioGaia/Documents/PROJETOS /arsenal/pessoal" \
  "$BACKUP_DIR/pessoal_backup_$TIMESTAMP"

# Comprimir
gzip "$BACKUP_DIR/pessoal_backup_$TIMESTAMP"

echo "✅ Backup criado: pessoal_backup_$TIMESTAMP.gz"
```

**Cron job (semanal):**
```bash
crontab -e
# toda sexta-feira às 22h
0 22 * * 5 bash /Users/CaioGaia/Documents/PROJETOS /arsenal/backup-pessoal.sh
```

### Versionamento de GitHub

A pasta `pessoal/` já está sincronizada com `caio-biblioteca-pessoal` no GitHub.

**Fluxo:**
```bash
cd "/Users/CaioGaia/Documents/PROJETOS /arsenal/pessoal"

# Fazer mudanças...

# Commit
git add .
git commit -m "feat: descrição da mudança"

# Push para GitHub (serve como backup remoto)
git push origin main
```

---

## 🤖 Scripts de Automação

### Script Master para Manutenção Completa

```bash
#!/bin/bash
# arquivo: manutencao-completa.sh

set -e

BIBLIOTECA="/Users/CaioGaia/Documents/PROJETOS /biblioteca"
LOG_FILE="$BIBLIOTECA/MANUTENCAO_LOG.txt"

echo "======================================"
echo "Manutenção Biblioteca — $(date)"
echo "======================================"
echo "" >> "$LOG_FILE"
echo "=== $(date) ===" >> "$LOG_FILE"

# 1. Sincronizar comunidade
echo "1. Sincronizando comunidade..."
cd "$BIBLIOTECA/comunidade"

for repo in mcps/*/ skills/*/ workflows/*/; do
    if [ -d "$repo/.git" ]; then
        echo "  📦 Atualizando $(basename $repo)..."
        cd "$repo"
        git fetch origin > /dev/null 2>&1
        git pull origin main 2>/dev/null || git pull origin master 2>/dev/null || true
        cd ../..
    fi
done

# 2. Contar mudanças
echo "2. Analisando mudanças..."
CHANGES=$(git log --all --oneline --since="1 month ago" 2>/dev/null | wc -l || echo "0")
echo "   $CHANGES commits novos na comunidade" >> "$LOG_FILE"

# 3. Sincronizar pessoal com GitHub
echo "3. Sincronizando pessoal com GitHub..."
cd "$BIBLIOTECA/pessoal"
git status
if [ "$(git status --porcelain | wc -l)" -gt 0 ]; then
    git add .
    git commit -m "chore: sincronização automática $(date +%Y-%m-%d)"
    git push origin main
    echo "   ✅ Pessoal sincronizado" >> "$LOG_FILE"
else
    echo "   ℹ️ Pessoal sem mudanças" >> "$LOG_FILE"
fi

# 4. Backup
echo "4. Criando backup..."
bash "$BIBLIOTECA/backup-pessoal.sh" >> "$LOG_FILE" 2>&1

echo ""
echo "✅ Manutenção completa!"
echo ""
echo "Log: $LOG_FILE"
```

**Usar:**
```bash
bash /Users/CaioGaia/Documents/PROJETOS /arsenal/manutencao-completa.sh
```

---

## 📊 Checklist Trimestral

Fazer a cada 3 meses:

- [ ] **Limpar repos não utilizados**
  ```bash
  # Listar repos com último commit > 6 meses atrás
  find comunidade -name .git -type d -exec sh -c 'echo "{}:" && git -C $(dirname {}) log -1 --format=%ai' \;
  ```

- [ ] **Revisar e atualizar CATALOGs**
  - Remover repos descontinuados
  - Atualizar descrições
  - Adicionar novos recursos

- [ ] **Auditar pessoal/**
  - Verificar se há files inúteis
  - Consolidar skills duplicadas
  - Documentar decisões arquiteturais

- [ ] **Testar templates/**
  - Clonar um projeto novo usando templates
  - Verificar se está atualizado e funcional

- [ ] **Backup completo**
  ```bash
  # Full backup to external drive
  rsync -av ~/Documents/PROJETOS /biblioteca /Volumes/External-Drive/backups/
  ```

---

## 📈 Métricas para Monitorar

Manter um arquivo `METRICAS.md`:

```markdown
# Métricas — Biblioteca Mestra

## Crescimento
- Pessoal: 13 skills, 3 MCPs, 2 agents
- Comunidade: 17 repos clonados
- Templates: 8 templates disponíveis

## Uso
- Projetos que usam biblioteca: [lista]
- Economia de tokens mensal: ~22,000
- Tempo economizado: ~5 horas/mês

## Frequência de Updates
- Comunidade: semanal
- Pessoal: conforme desenvolvido
- CATALOGs: mensal
```

---

## 🆘 Troubleshooting

### Erro ao sincronizar comunidade

```bash
# Limpar cache de um repo
cd "/Users/CaioGaia/Documents/PROJETOS /arsenal/comunidade/mcps/seu-mcp"
git clean -fdx
git reset --hard origin/main
git pull
```

### Repo clonado está muito pesado (>100MB)

```bash
# Usar shallow clone
git clone --depth 1 https://github.com/author/repo.git novo-repo
```

### Recuperar backup antigo

```bash
# Listar backups
ls /Users/CaioGaia/Backups/biblioteca-pessoal/

# Restaurar versão específica
cp -r /Users/CaioGaia/Backups/biblioteca-pessoal/pessoal_backup_20260310_120000.gz ~/tmp/
gunzip ~/tmp/pessoal_backup_20260310_120000.gz
```

---

## 🎯 Resumo Prático

**Rotina Simples:**

```bash
# Toda primeira segunda do mês
bash manutencao-completa.sh

# Sempre que adicionar algo novo
# (editar CATALOG.md + commit + push)

# Backup automático semanal
# (cron job já configurado)
```

**Tempo dedicado:**
- Semanal: 5 min (backup automático)
- Mensal: 15 min (sincronização)
- Trimestral: 1 hora (review completo)

---

**Última atualização:** 2026-03-20
**Mantido por:** Caio Gaia + Claude Code
