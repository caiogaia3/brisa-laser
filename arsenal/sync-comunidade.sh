#!/bin/bash
# Script para sincronizar todos os repos da comunidade

set -e

BIBLIOTECA="/Users/CaioGaia/Documents/PROJETOS /arsenal"
COMUNIDADE="$BIBLIOTECA/comunidade"
LOG_FILE="$BIBLIOTECA/UPDATE_LOG.md"

echo "=================================="
echo "Sincronizando Comunidade"
echo "Data: $(date)"
echo "=================================="

# Append to log
echo "" >> "$LOG_FILE"
echo "## Sincronização — $(date '+%Y-%m-%d %H:%M:%S')" >> "$LOG_FILE"
echo "" >> "$LOG_FILE"

# Sincronizar MCPs
echo "📦 MCPs..."
echo "### MCPs" >> "$LOG_FILE"
cd "$COMUNIDADE/mcps"
for repo in */; do
    if [ -d "$repo/.git" ]; then
        cd "$repo"
        COMMITS_BEFORE=$(git rev-parse HEAD)
        echo "  Atualizando $(basename $repo)..."
        git fetch origin > /dev/null 2>&1 || true
        git pull origin main 2>/dev/null || git pull origin master 2>/dev/null || true
        COMMITS_AFTER=$(git rev-parse HEAD)
        if [ "$COMMITS_BEFORE" != "$COMMITS_AFTER" ]; then
            echo "- ✅ $(basename $repo): atualizado" >> "$LOG_FILE"
        else
            echo "- ℹ️ $(basename $repo): sem mudanças" >> "$LOG_FILE"
        fi
        cd ..
    fi
done

# Sincronizar Skills
echo "⚡ Skills..."
echo "### Skills" >> "$LOG_FILE"
cd "$COMUNIDADE/skills"
for repo in */; do
    if [ -d "$repo/.git" ]; then
        cd "$repo"
        COMMITS_BEFORE=$(git rev-parse HEAD)
        echo "  Atualizando $(basename $repo)..."
        git fetch origin > /dev/null 2>&1 || true
        git pull origin main 2>/dev/null || git pull origin master 2>/dev/null || true
        COMMITS_AFTER=$(git rev-parse HEAD)
        if [ "$COMMITS_BEFORE" != "$COMMITS_AFTER" ]; then
            echo "- ✅ $(basename $repo): atualizado" >> "$LOG_FILE"
        else
            echo "- ℹ️ $(basename $repo): sem mudanças" >> "$LOG_FILE"
        fi
        cd ..
    fi
done

# Sincronizar Workflows
echo "🔄 Workflows..."
echo "### Workflows" >> "$LOG_FILE"
cd "$COMUNIDADE/workflows"
for repo in */; do
    if [ -d "$repo/.git" ]; then
        cd "$repo"
        COMMITS_BEFORE=$(git rev-parse HEAD)
        echo "  Atualizando $(basename $repo)..."
        git fetch origin > /dev/null 2>&1 || true
        git pull origin main 2>/dev/null || git pull origin master 2>/dev/null || true
        COMMITS_AFTER=$(git rev-parse HEAD)
        if [ "$COMMITS_BEFORE" != "$COMMITS_AFTER" ]; then
            echo "- ✅ $(basename $repo): atualizado" >> "$LOG_FILE"
        else
            echo "- ℹ️ $(basename $repo): sem mudanças" >> "$LOG_FILE"
        fi
        cd ..
    fi
done

echo ""
echo "✅ Sincronização completa!"
echo "📝 Log: $LOG_FILE"
