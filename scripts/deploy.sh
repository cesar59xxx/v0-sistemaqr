#!/bin/bash

# Script de Deploy para WhatsApp SaaS
# Uso: ./scripts/deploy.sh

set -e

echo "======================================"
echo "WhatsApp SaaS - Deploy Script"
echo "======================================"

# Cores para output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Verificar se Docker está instalado
if ! command -v docker &> /dev/null; then
    echo -e "${RED}Docker não está instalado!${NC}"
    echo "Instale o Docker: curl -fsSL https://get.docker.com -o get-docker.sh && sh get-docker.sh"
    exit 1
fi

# Verificar se Docker Compose está disponível
if ! docker compose version &> /dev/null; then
    echo -e "${RED}Docker Compose não está disponível!${NC}"
    exit 1
fi

echo -e "${GREEN}✓ Docker está instalado${NC}"

# Parar containers existentes
echo -e "${YELLOW}Parando containers existentes...${NC}"
docker compose down

# Limpar imagens antigas (opcional)
read -p "Deseja limpar imagens antigas? (s/N): " -n 1 -r
echo
if [[ $REPLY =~ ^[Ss]$ ]]; then
    echo -e "${YELLOW}Limpando imagens antigas...${NC}"
    docker system prune -f
fi

# Build da aplicação
echo -e "${YELLOW}Construindo aplicação...${NC}"
docker compose build --no-cache

# Iniciar containers
echo -e "${YELLOW}Iniciando containers...${NC}"
docker compose up -d

# Aguardar aplicação iniciar
echo -e "${YELLOW}Aguardando aplicação iniciar...${NC}"
sleep 10

# Verificar health
echo -e "${YELLOW}Verificando status...${NC}"
if curl -f http://localhost:3000/api/health &> /dev/null; then
    echo -e "${GREEN}✓ Aplicação está rodando!${NC}"
    echo -e "${GREEN}✓ Acesse: http://localhost:3000${NC}"
else
    echo -e "${RED}✗ Aplicação não respondeu ao health check${NC}"
    echo -e "${YELLOW}Verificando logs...${NC}"
    docker compose logs --tail=50
    exit 1
fi

# Mostrar status dos containers
echo -e "\n${GREEN}Status dos containers:${NC}"
docker compose ps

echo -e "\n${GREEN}======================================"
echo "Deploy concluído com sucesso!"
echo "======================================${NC}"
echo ""
echo "Comandos úteis:"
echo "  Ver logs:      docker compose logs -f"
echo "  Parar app:     docker compose down"
echo "  Reiniciar:     docker compose restart"
echo "  Status:        docker compose ps"
