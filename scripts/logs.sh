#!/bin/bash

# Script para visualizar logs
# Uso: ./scripts/logs.sh [linhas]

LINES=${1:-100}

echo "Exibindo últimas $LINES linhas de log..."
echo "Pressione Ctrl+C para sair"
echo ""

docker compose logs -f --tail=$LINES
