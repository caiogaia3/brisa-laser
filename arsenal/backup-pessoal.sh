#!/bin/bash
# Script para fazer backup automático da pasta pessoal

BACKUP_DIR="/Users/CaioGaia/Backups/biblioteca-pessoal"
BIBLIOTECA="/Users/CaioGaia/Documents/PROJETOS /arsenal"
PESSOAL="$BIBLIOTECA/pessoal"

# Criar diretório de backups se não existir
mkdir -p "$BACKUP_DIR"

# Timestamp
TIMESTAMP=$(date +%Y%m%d_%H%M%S)
BACKUP_FILE="pessoal_backup_$TIMESTAMP"

echo "Criando backup: $BACKUP_FILE"

# Fazer backup
cp -r "$PESSOAL" "$BACKUP_DIR/$BACKUP_FILE"

# Comprimir
cd "$BACKUP_DIR"
tar -czf "${BACKUP_FILE}.tar.gz" "$BACKUP_FILE"
rm -rf "$BACKUP_FILE"

# Listar últimos 5 backups
echo ""
echo "Últimos 5 backups:"
ls -lh "$BACKUP_DIR" | tail -6

# Deletar backups com mais de 30 dias
echo ""
echo "Limpando backups antigos (>30 dias)..."
find "$BACKUP_DIR" -name "pessoal_backup_*.tar.gz" -mtime +30 -delete

echo "✅ Backup completo!"
