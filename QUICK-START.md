# Quick Start - Deploy Rápido

## Em 5 minutos na Hostinger VPS

### 1. Instalar Docker (se ainda não tiver)

\`\`\`bash
curl -fsSL https://get.docker.com -o get-docker.sh
sh get-docker.sh
\`\`\`

### 2. Clonar e Iniciar

\`\`\`bash
# Clonar repositório
git clone https://github.com/cesar59xxx/v0-sistemaqr.git
cd v0-sistemaqr

# Build e start
docker compose up -d --build

# Ver logs
docker compose logs -f
\`\`\`

### 3. Acessar

Abra no navegador: `http://seu-ip-vps:3000`

## Comandos Essenciais

\`\`\`bash
# Parar
docker compose down

# Atualizar
git pull && docker compose up -d --build

# Ver logs
docker compose logs -f

# Reiniciar
docker compose restart
\`\`\`

## Problemas?

\`\`\`bash
# Rebuild completo
docker compose down
docker system prune -a
docker compose up -d --build

# Ver o que deu errado
docker compose logs whatsapp-saas
\`\`\`

## Próximos Passos

1. Configure um domínio (veja DEPLOY-HOSTINGER.md)
2. Adicione SSL com Certbot
3. Configure Nginx como proxy reverso

Documentação completa em: `DEPLOY-HOSTINGER.md`
