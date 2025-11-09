# Guia Completo de Deploy - WhatsApp SaaS

## Deploy na VPS Hostinger

### 1. Preparação da VPS

Conecte-se via SSH à sua VPS:
\`\`\`bash
ssh root@seu-ip-vps
\`\`\`

### 2. Instalar Docker e Docker Compose

\`\`\`bash
# Atualizar sistema
apt update && apt upgrade -y

# Instalar Docker
curl -fsSL https://get.docker.com -o get-docker.sh
sh get-docker.sh

# Instalar Docker Compose
apt install docker-compose -y

# Verificar instalação
docker --version
docker-compose --version
\`\`\`

### 3. Instalar Git

\`\`\`bash
apt install git -y
\`\`\`

### 4. Clonar o Repositório

\`\`\`bash
cd /var/www
git clone https://github.com/seu-usuario/whatsapp-saas.git
cd whatsapp-saas
\`\`\`

### 5. Build e Iniciar a Aplicação

\`\`\`bash
# Build dos containers
docker-compose build

# Iniciar em background
docker-compose up -d

# Verificar logs
docker-compose logs -f
\`\`\`

### 6. Verificar Status

\`\`\`bash
# Ver containers rodando
docker-compose ps

# Ver logs em tempo real
docker-compose logs -f app
\`\`\`

A aplicação estará disponível em `http://seu-ip-vps:3000`

---

## Configurar Domínio com Nginx

### 1. Instalar Nginx

\`\`\`bash
apt install nginx -y
\`\`\`

### 2. Criar Configuração

\`\`\`bash
nano /etc/nginx/sites-available/whatsapp-saas
\`\`\`

Adicione:
\`\`\`nginx
server {
    listen 80;
    server_name seu-dominio.com www.seu-dominio.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }
}
\`\`\`

### 3. Ativar Site

\`\`\`bash
ln -s /etc/nginx/sites-available/whatsapp-saas /etc/nginx/sites-enabled/
nginx -t
systemctl restart nginx
\`\`\`

---

## SSL com Let's Encrypt (HTTPS)

### 1. Instalar Certbot

\`\`\`bash
apt install certbot python3-certbot-nginx -y
\`\`\`

### 2. Obter Certificado

\`\`\`bash
certbot --nginx -d seu-dominio.com -d www.seu-dominio.com
\`\`\`

### 3. Renovação Automática

O certbot configura renovação automática. Para testar:
\`\`\`bash
certbot renew --dry-run
\`\`\`

---

## Atualizar Aplicação

### 1. Baixar Mudanças

\`\`\`bash
cd /var/www/whatsapp-saas
git pull origin main
\`\`\`

### 2. Rebuild e Restart

\`\`\`bash
docker-compose down
docker-compose build
docker-compose up -d
\`\`\`

---

## Comandos Úteis

### Docker
\`\`\`bash
# Parar aplicação
docker-compose down

# Reiniciar
docker-compose restart

# Ver logs
docker-compose logs -f app

# Limpar volumes
docker-compose down -v
\`\`\`

### Nginx
\`\`\`bash
# Testar configuração
nginx -t

# Reiniciar
systemctl restart nginx

# Ver logs
tail -f /var/log/nginx/error.log
\`\`\`

### Sistema
\`\`\`bash
# Ver uso de recursos
htop

# Ver espaço em disco
df -h

# Ver portas abertas
netstat -tulpn
\`\`\`

---

## Troubleshooting

### Aplicação não inicia
\`\`\`bash
# Verificar logs
docker-compose logs app

# Verificar porta 3000
netstat -tulpn | grep 3000

# Rebuild completo
docker-compose down
docker system prune -a
docker-compose up -d --build
\`\`\`

### Nginx erro 502
\`\`\`bash
# Verificar se app está rodando
docker-compose ps

# Ver logs do nginx
tail -f /var/log/nginx/error.log
\`\`\`

### Sem espaço em disco
\`\`\`bash
# Limpar Docker
docker system prune -a --volumes

# Ver arquivos grandes
du -sh /* | sort -h
\`\`\`

---

## Backup

### Criar Backup
\`\`\`bash
# Backup do código
tar -czf backup-$(date +%Y%m%d).tar.gz /var/www/whatsapp-saas

# Backup dos dados (se houver volume)
docker-compose exec app tar -czf /backup.tar.gz /data
\`\`\`

### Restaurar Backup
\`\`\`bash
tar -xzf backup-20250109.tar.gz -C /var/www/
\`\`\`

---

## Monitoramento

### Ver uso de recursos
\`\`\`bash
# CPU e memória dos containers
docker stats

# Logs em tempo real
docker-compose logs -f --tail=100
\`\`\`

### Health Check
\`\`\`bash
curl http://localhost:3000/api/health
\`\`\`

---

## Segurança

1. **Firewall**
\`\`\`bash
ufw allow 22
ufw allow 80
ufw allow 443
ufw enable
\`\`\`

2. **Atualizar sistema regularmente**
\`\`\`bash
apt update && apt upgrade -y
\`\`\`

3. **Usar chave SSH ao invés de senha**

4. **Configurar fail2ban**
\`\`\`bash
apt install fail2ban -y
\`\`\`
\`\`\`
