#!/bin/bash

# Script de Backup
# Uso: ./scripts/backup.sh

set -e

BACKUP_DIR="./backups"
DATE=$(date +%Y%m%d_%H%M%S)
BACKUP_FILE="backup_$DATE.tar.gz"

echo "======================================"
echo "Criando Backup"
echo "======================================"

# Criar diretório de backup se não existir
mkdir -p $BACKUP_DIR

# Criar backup
echo "Criando backup em $BACKUP_DIR/$BACKUP_FILE..."
tar -czf "$BACKUP_DIR/$BACKUP_FILE" \
    --exclude='node_modules' \
    --exclude='.next' \
    --exclude='.git' \
    --exclude='backups' \
    .

echo "✓ Backup criado: $BACKUP_DIR/$BACKUP_FILE"

# Manter apenas os últimos 7 backups
cd $BACKUP_DIR
ls -t backup_*.tar.gz | tail -n +8 | xargs -r rm
echo "✓ Backups antigos removidos (mantidos últimos 7)"
