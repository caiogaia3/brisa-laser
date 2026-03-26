# Scripts de Manutenção — Como Usar

Scripts automáticos para manter a biblioteca pessoal e comunitária sincronizadas.

---

## 📍 Localização

```
/Users/CaioGaia/Documents/PROJETOS /arsenal/
├── sync-comunidade.sh       ← Sincroniza repos da comunidade
├── backup-pessoal.sh        ← Backup automático de pessoal/
└── SCRIPTS_README.md        ← Este arquivo
```

---

## 🔄 sync-comunidade.sh

Sincroniza todos os 17 repos clonados da comunidade (MCPs, skills, workflows).

### Uso Manual

```bash
bash /Users/CaioGaia/Documents/PROJETOS /arsenal/sync-comunidade.sh
```

### Uso Automático (Cron Job)

**Configurar para rodar toda segunda-feira às 14h:**

```bash
# Abrir editor de crontab
crontab -e

# Adicionar linha:
0 14 * * 1 bash /Users/CaioGaia/Documents/PROJETOS /arsenal/sync-comunidade.sh
```

### O que faz

- ✅ Faz `git pull` em cada repo da comunidade
- ✅ Detecta quais repos atualizaram
- ✅ Registra mudanças em `UPDATE_LOG.md`
- ✅ Lida com diferentes branches (main/master)

### Output

```
==================================
Sincronizando Comunidade
Data: Thu Mar 20 15:30:00 BRT 2026
==================================
📦 MCPs...
  Atualizando google-analytics-mcp...
  Atualizando playwright-mcp...
  ...
⚡ Skills...
  Atualizando awesome-claude-code...
  ...
🔄 Workflows...
  Atualizando antigravity-workflows...
  ...

✅ Sincronização completa!
📝 Log: /Users/CaioGaia/Documents/PROJETOS /arsenal/UPDATE_LOG.md
```

---

## 💾 backup-pessoal.sh

Cria backup comprimido da pasta `pessoal/` (suas ferramentas proprietárias).

### Uso Manual

```bash
bash /Users/CaioGaia/Documents/PROJETOS /arsenal/backup-pessoal.sh
```

### Uso Automático (Cron Job)

**Configurar para rodar toda sexta-feira às 22h:**

```bash
crontab -e

# Adicionar linha:
0 22 * * 5 bash /Users/CaioGaia/Documents/PROJETOS /arsenal/backup-pessoal.sh
```

### O que faz

- ✅ Copia `pessoal/` para `/Users/CaioGaia/Backups/biblioteca-pessoal/`
- ✅ Comprime com tar.gz (economiza espaço)
- ✅ Mantém apenas últimos 30 dias de backups (limpa automaticamente)
- ✅ Lista os últimos 5 backups

### Output

```
Criando backup: pessoal_backup_20260320_152000

Últimos 5 backups:
-rw-r--r--  user  staff  5.2M  20 Mar 15:20  pessoal_backup_20260320_102000.tar.gz
-rw-r--r--  user  staff  5.2M  13 Mar 22:00  pessoal_backup_20260313_220000.tar.gz
-rw-r--r--  user  staff  5.2M   6 Mar 22:00  pessoal_backup_20260306_220000.tar.gz
...

Limpando backups antigos (>30 dias)...
✅ Backup completo!
```

---

## 🛠️ Restaurar de um Backup

Se precisar restaurar a pasta `pessoal/` de um backup antigo:

```bash
# 1. Listar backups disponíveis
ls -lh /Users/CaioGaia/Backups/biblioteca-pessoal/

# 2. Extrair o backup desejado
cd /tmp
tar -xzf /Users/CaioGaia/Backups/biblioteca-pessoal/pessoal_backup_YYYYMMDD_HHMMSS.tar.gz

# 3. Comparar com a versão atual
diff -r pessoal_backup_YYYYMMDD_HHMMSS /Users/CaioGaia/Documents/PROJETOS /arsenal/pessoal

# 4. Restaurar (se quiser)
rm -rf /Users/CaioGaia/Documents/PROJETOS /arsenal/pessoal
cp -r pessoal_backup_YYYYMMDD_HHMMSS /Users/CaioGaia/Documents/PROJETOS /arsenal/pessoal
```

---

## 📋 Checklist de Rotina

### Semanal
- [ ] Backup automático (quinta-feira) — nenhuma ação necessária
- [ ] Verificar se há erros: `cat /Users/CaioGaia/Backups/biblioteca-pessoal/*.log`

### Mensal (Primeira segunda do mês)
- [ ] Rodar sincronização: `bash sync-comunidade.sh`
- [ ] Revisar `UPDATE_LOG.md` para mudanças importantes
- [ ] Atualizar `comunidade/CATALOG.md` se houver novidades
- [ ] Commit de atualizações no pessoal/: `git push`

### Trimestral (A cada 3 meses)
- [ ] Revisar espaço em disco: `du -sh /Users/CaioGaia/Backups/biblioteca-pessoal/`
- [ ] Limpar repos não utilizados
- [ ] Atualizar documentação
- [ ] Fazer backup completo manual (além do automático)

---

## 🐛 Troubleshooting

### Script não encontra repos

```bash
# Verificar estrutura
ls /Users/CaioGaia/Documents/PROJETOS /arsenal/comunidade/mcps/
```

### Erro: "git: command not found"

```bash
# Instalar/verificar git
which git
# Se não tiver, instalar via Homebrew:
brew install git
```

### Erro: "Permission denied"

```bash
# Dar permissão de execução ao script
chmod +x /Users/CaioGaia/Documents/PROJETOS /arsenal/sync-comunidade.sh
chmod +x /Users/CaioGaia/Documents/PROJETOS /arsenal/backup-pessoal.sh
```

### Cron job não está rodando

```bash
# Verificar se crontab está ativo
crontab -l

# Ver logs do cron (macOS)
log stream --predicate 'eventMessage contains[cd] "cron"'

# Dar permissão full disk access ao Terminal (macOS)
# System Preferences > Security & Privacy > Full Disk Access > adicionar Terminal
```

### Backup crescendo muito

```bash
# Ver tamanho
du -sh /Users/CaioGaia/Backups/biblioteca-pessoal/

# Limpar manualmente
find /Users/CaioGaia/Backups/biblioteca-pessoal -name "*.tar.gz" -mtime +30 -delete
```

---

## 📊 Monitorar Execução

### Ver última sincronização

```bash
tail -20 "/Users/CaioGaia/Documents/PROJETOS /arsenal/UPDATE_LOG.md"
```

### Ver todos os backups

```bash
ls -lh /Users/CaioGaia/Backups/biblioteca-pessoal/ | tail -10
```

### Verificar status de um repo específico

```bash
cd "/Users/CaioGaia/Documents/PROJETOS /arsenal/comunidade/mcps/google-analytics-mcp"
git log -1 --oneline
```

---

## 🚀 Próximos Passos

1. **Testar scripts manualmente:**
   ```bash
   bash /Users/CaioGaia/Documents/PROJETOS /arsenal/sync-comunidade.sh
   bash /Users/CaioGaia/Documents/PROJETOS /arsenal/backup-pessoal.sh
   ```

2. **Configurar cron jobs** para execução automática

3. **Monitorar** pelo menos uma execução de cada script

4. **Adicionar alertas** (opcional):
   ```bash
   # Notificar se sincronização falhar
   # (pode integrar com Slack, email, etc)
   ```

---

**Criado em:** 2026-03-20
**Versão:** 1.0
