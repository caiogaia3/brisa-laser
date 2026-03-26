#!/bin/bash
# Script para salvar checkpoint automático do context.md

CONTEXT_FILE="/Users/CaioGaia/Documents/PROJETOS /biblioteca/pessoal/context.md"
TIMESTAMP=$(date '+%Y-%m-%d %H:%M')

# Verificar se o arquivo existe
if [ ! -f "$CONTEXT_FILE" ]; then
    echo "❌ Arquivo não encontrado: $CONTEXT_FILE"
    exit 1
fi

echo "💾 Salvando checkpoint de context..."

# Atualizar timestamp
sed -i '' "s/^Última atualização:.*/Última atualização: $TIMESTAMP/" "$CONTEXT_FILE"

# Navegar para a pasta pessoal (onde está o git repo)
cd "/Users/CaioGaia/Documents/PROJETOS /biblioteca/pessoal" || exit 1

# Verificar se tem mudanças
if git diff --quiet "$CONTEXT_FILE" 2>/dev/null; then
    echo "ℹ️  Nenhuma mudança no context.md desde o último commit"
    exit 0
fi

# Adicionar e commitar
git add "$CONTEXT_FILE" 2>/dev/null
git commit -m "chore: atualização automática de context.md — $(date '+%Y-%m-%d %H:%M')" 2>/dev/null

# Tentar fazer push (se houver remote configurado)
if git remote -v | grep -q origin; then
    git push origin HEAD:main 2>/dev/null || git push origin HEAD:master 2>/dev/null || true
    echo "✅ Context.md atualizado e sincronizado"
else
    echo "⚠️  Nenhum remote configurado — context.md foi commitado localmente"
fi
