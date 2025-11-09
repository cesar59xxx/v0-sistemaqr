# WhatsApp SaaS - Sistema de Atendimento

Sistema completo de atendimento via WhatsApp com chat ao vivo, dashboard de métricas e gerenciamento de agentes.

## Deploy na VPS Hostinger

### Pré-requisitos
- VPS com Docker e Docker Compose instalados
- Acesso SSH à VPS
- Domínio configurado (opcional)

### Passo a Passo

1. **Clone o repositório na VPS:**
\`\`\`bash
git clone <seu-repositorio-github>
cd whatsapp-saas
\`\`\`

2. **Build e inicie os containers:**
\`\`\`bash
docker-compose up -d --build
\`\`\`

3. **Verifique o status:**
\`\`\`bash
docker-compose ps
docker-compose logs -f
\`\`\`

4. **Acesse a aplicação:**
- Local: `http://localhost:3000`
- VPS: `http://seu-ip-vps:3000`

### Comandos Úteis

**Parar a aplicação:**
\`\`\`bash
docker-compose down
\`\`\`

**Reiniciar a aplicação:**
\`\`\`bash
docker-compose restart
\`\`\`

**Ver logs:**
\`\`\`bash
docker-compose logs -f app
\`\`\`

**Reconstruir após mudanças:**
\`\`\`bash
git pull
docker-compose up -d --build
\`\`\`

### Configuração de Domínio (Nginx)

Se quiser usar um domínio, configure o Nginx como reverse proxy:

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
    }
}
\`\`\`

## Funcionalidades

- Autenticação de agentes
- Dashboard com métricas em tempo real
- Chat ao vivo com clientes
- Gerenciamento de conversas
- Estatísticas de mensagens enviadas/recebidas

## Tecnologias

- Next.js 16
- React 19
- TypeScript
- Tailwind CSS
- Docker
