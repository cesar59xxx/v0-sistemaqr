#!/bin/bash

# Script de Atualização
# Uso: ./scripts/update.sh

set -e

echo "======================================"
echo "Atualizando WhatsApp SaaS"
echo "======================================"

# Cores
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m'

# Verificar se estamos no repositório git
if [ ! -d .git ]; then
    echo "Erro: Este diretório não é um repositório Git"
    exit 1
fi

# Puxar últimas alterações
echo -e "${YELLOW}Baixando últimas alterações...${NC}"
git pull origin main

# Rebuild e restart
echo -e "${YELLOW}Reconstruindo aplicação...${NC}"
docker compose down
docker compose build --no-cache
docker compose up -d

echo -e "${GREEN}✓ Atualização concluída!${NC}"
docker compose ps
