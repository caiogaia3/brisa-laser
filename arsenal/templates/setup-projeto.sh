#!/bin/bash
# Script: Inicializar novo projeto com cópias automáticas da biblioteca

set -e

BIBLIOTECA="/Users/CaioGaia/Documents/PROJETOS /arsenal"
PROJETO_ATUAL=$(pwd)

echo "🚀 Inicializando novo projeto com templates da biblioteca..."
echo "📁 Projeto: $PROJETO_ATUAL"
echo ""

# 1. Copiar arquivos base
echo "📋 Copiando arquivos base..."
cp "$BIBLIOTECA/templates/CLAUDE.md.template" ./CLAUDE.md
cp "$BIBLIOTECA/templates/context.md.template" ./context.md
cp "$BIBLIOTECA/templates/.env.example.template" ./.env.example
cp "$BIBLIOTECA/templates/securitycoderules.md" ./securitycoderules.md

echo "✅ Arquivos base copiados"

# 2. Criar pastas
echo "📁 Criando estrutura de pastas..."
mkdir -p src/{api,services,models,utils}
mkdir -p tests/{unit,integration}
mkdir -p docs
mkdir -p rules
mkdir -p .github/workflows

echo "✅ Pastas criadas"

# 3. Copiar rules obrigatórias (segurança)
echo "🛡️ Copiando rules de segurança..."
cp "$BIBLIOTECA/pessoal/rules/rule-01-security-isolation.md" ./rules/
cp "$BIBLIOTECA/pessoal/rules/rule-02-async-performance.md" ./rules/
cp "$BIBLIOTECA/pessoal/rules/rule-04-secrets-vault.md" ./rules/
cp "$BIBLIOTECA/pessoal/rules/rule-06-clean-architecture.md" ./rules/
cp "$BIBLIOTECA/pessoal/rules/rule-10-test-first.md" ./rules/
cp "$BIBLIOTECA/pessoal/rules/rule-12-commit-discipline.md" ./rules/
cp "$BIBLIOTECA/pessoal/rules/rule-14-documentation-code.md" ./rules/

echo "✅ Rules de segurança copiadas"

# 4. Criar .gitignore
echo "📝 Criando .gitignore..."
cat > .gitignore << 'EOF'
# Environment
.env.local
.env.production.local
.env.*.local

# Dependencies
node_modules/
venv/
__pycache__/
*.pyc

# OS
.DS_Store
Thumbs.db

# IDE
.vscode/
.idea/
*.swp
*.swo

# Build
dist/
build/
.next/

# Claude Code
.claude/local/
EOF

echo "✅ .gitignore criado"

# 5. Criar symlink para biblioteca (opcional, mas útil)
echo "🔗 Criando symlink para biblioteca..."
ln -sf "$BIBLIOTECA" ./biblioteca_link 2>/dev/null || true

echo "✅ Symlink criado (./biblioteca_link)"

# 6. Inicializar git se não houver
if [ ! -d .git ]; then
    echo "🔧 Inicializando git..."
    git init
    echo "✅ Git inicializado"
fi

# 7. Info final
echo ""
echo "================================================"
echo "✅ PROJETO INICIALIZADO COM SUCESSO!"
echo "================================================"
echo ""
echo "📋 Próximos passos:"
echo ""
echo "1. Editar CLAUDE.md com detalhes do projeto:"
echo "   nano CLAUDE.md"
echo ""
echo "2. Editar context.md com estado inicial:"
echo "   nano context.md"
echo ""
echo "3. Se for SaaS multi-tenant, copie rule-03:"
echo "   cp $BIBLIOTECA/pessoal/rules/rule-03-multi-tenant-shield.md ./rules/"
echo ""
echo "4. Se for usar auth, copie rule-05:"
echo "   cp $BIBLIOTECA/pessoal/rules/rule-05-session-hardening.md ./rules/"
echo ""
echo "5. Fazer commit inicial:"
echo "   git add -A"
echo "   git commit -m 'feat: initial project setup with biblioteca templates'"
echo ""
echo "6. Chamar Claude:"
echo "   claude"
echo ""
echo "📚 Biblioteca disponível em: ./biblioteca_link/"
echo "📖 CATALOG: ./biblioteca_link/CATALOG.md"
echo ""
echo "================================================"
