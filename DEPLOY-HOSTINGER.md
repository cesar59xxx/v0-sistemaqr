# Deploy na Hostinger com Docker

## Pré-requisitos

- VPS com Ubuntu/Debian na Hostinger
- Docker e Docker Compose instalados
- Acesso SSH à VPS
- Repositório Git configurado

## Instalação do Docker na VPS

\`\`\`bash
# Conectar via SSH
ssh root@seu-ip-da-vps

# Atualizar sistema
apt update && apt upgrade -y

# Instalar Docker
curl -fsSL https://get.docker.com -o get-docker.sh
sh get-docker.sh

# Verificar instalação
docker --version
docker compose version
\`\`\`

## Deploy do Projeto

### 1. Clonar o Repositório

\`\`\`bash
cd /var/www
git clone https://github.com/cesar59xxx/v0-sistemaqr.git
cd v0-sistemaqr
\`\`\`

### 2. Configurar Variáveis de Ambiente

\`\`\`bash
# Criar arquivo .env (opcional)
nano .env
\`\`\`

Adicione:
\`\`\`
NEXT_PUBLIC_APP_URL=http://seu-dominio.com
\`\`\`

### 3. Build e Start

\`\`\`bash
# Build da imagem
docker compose build --no-cache

# Iniciar container
docker compose up -d

# Verificar logs
docker compose logs -f
\`\`\`

### 4. Verificar se está rodando

\`\`\`bash
# Verificar containers
docker ps

# Verificar logs
docker compose logs whatsapp-saas

# Testar aplicação
curl http://localhost:3000
\`\`\`

## Comandos Úteis

\`\`\`bash
# Parar container
docker compose down

# Reiniciar container
docker compose restart

# Ver logs em tempo real
docker compose logs -f whatsapp-saas

# Rebuild completo
docker compose down
docker compose build --no-cache
docker compose up -d

# Limpar tudo e rebuild
docker system prune -a
git pull
docker compose up -d --build
\`\`\`

## Atualizar Aplicação

\`\`\`bash
cd /var/www/v0-sistemaqr
git pull
docker compose down
docker compose build --no-cache
docker compose up -d
\`\`\`

## Configurar Domínio (Nginx)

### 1. Instalar Nginx

\`\`\`bash
apt install nginx -y
\`\`\`

### 2. Criar configuração

\`\`\`bash
nano /etc/nginx/sites-available/whatsapp-saas
\`\`\`

Adicione:
\`\`\`nginx
server {
    listen 80;
    server_name seu-dominio.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
\`\`\`

### 3. Ativar site

\`\`\`bash
ln -s /etc/nginx/sites-available/whatsapp-saas /etc/nginx/sites-enabled/
nginx -t
systemctl restart nginx
\`\`\`

### 4. Configurar SSL (Opcional mas recomendado)

\`\`\`bash
# Instalar Certbot
apt install certbot python3-certbot-nginx -y

# Obter certificado SSL
certbot --nginx -d seu-dominio.com

# Renovação automática já está configurada
\`\`\`

## Troubleshooting

### Build falha

\`\`\`bash
# Ver logs detalhados
docker compose build --progress=plain

# Limpar cache do Docker
docker builder prune -a
docker system prune -a

# Rebuild do zero
rm -rf .next node_modules
docker compose build --no-cache
\`\`\`

### Container não inicia

\`\`\`bash
# Ver logs
docker compose logs whatsapp-saas

# Ver status
docker ps -a

# Entrar no container
docker compose exec whatsapp-saas sh
\`\`\`

### Porta 3000 já em uso

\`\`\`bash
# Ver o que está usando a porta
lsof -i :3000
netstat -tulpn | grep 3000

# Matar processo
kill -9 <PID>

# Ou mudar porta no docker-compose.yml
ports:
  - "8080:3000"  # Usar porta 8080 ao invés de 3000
\`\`\`

### Memória insuficiente

\`\`\`bash
# Adicionar swap
fallocate -l 2G /swapfile
chmod 600 /swapfile
mkswap /swapfile
swapon /swapfile
echo '/swapfile none swap sw 0 0' >> /etc/fstab
\`\`\`

## Monitoramento

\`\`\`bash
# CPU e memória do container
docker stats whatsapp-saas

# Ver processos no container
docker compose top

# Inspecionar container
docker inspect whatsapp-saas
\`\`\`

## Backup

\`\`\`bash
# Backup do código
tar -czf backup-$(date +%Y%m%d).tar.gz /var/www/v0-sistemaqr

# Backup apenas dados importantes
tar -czf backup-data-$(date +%Y%m%d).tar.gz /var/www/v0-sistemaqr/data
\`\`\`

## Segurança

\`\`\`bash
# Configurar firewall
ufw allow 22    # SSH
ufw allow 80    # HTTP
ufw allow 443   # HTTPS
ufw enable

# Atualizar sistema regularmente
apt update && apt upgrade -y

# Monitorar logs
tail -f /var/log/nginx/access.log
tail -f /var/log/nginx/error.log
\`\`\`

## Notas Importantes

1. **Dados persistentes**: Este projeto usa localStorage no navegador. Para produção real, considere adicionar um banco de dados (PostgreSQL, MongoDB, etc.)

2. **Backup**: Faça backup regular do código e configurações

3. **SSL**: Sempre use HTTPS em produção com certificado SSL válido

4. **Monitoramento**: Configure alertas para quando o container parar

5. **Recursos**: Monitore uso de CPU, memória e disco regularmente

## Acesso ao Sistema

Após deploy completo:
- **Sem domínio**: http://seu-ip-vps:3000
- **Com Nginx**: http://seu-dominio.com
- **Com SSL**: https://seu-dominio.com

**Credenciais padrão** (podem ser criadas no primeiro acesso):
- Email: qualquer email válido
- Senha: qualquer senha (mínimo 6 caracteres)
