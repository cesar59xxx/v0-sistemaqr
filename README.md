# WhatsApp SaaS - Sistema de Atendimento

Sistema completo de atendimento via WhatsApp com chat ao vivo, dashboard de métricas e gerenciamento de conversas.

## Recursos

- Sistema de autenticação (login/registro)
- Dashboard com métricas em tempo real
- Chat ao vivo com agentes
- Gerenciamento de conversas (ativas, pendentes, resolvidas)
- Gráficos de mensagens enviadas/recebidas
- Interface responsiva e moderna

## Tecnologias

- **Next.js 16** - Framework React com App Router
- **React 19** - Biblioteca UI
- **TypeScript** - Type safety
- **Tailwind CSS v4** - Estilização
- **Recharts** - Gráficos e visualizações
- **Docker** - Containerização
- **shadcn/ui** - Componentes UI

## Desenvolvimento Local

\`\`\`bash
# Instalar dependências
npm install

# Executar em desenvolvimento
npm run dev

# Abrir http://localhost:3000
\`\`\`

## Deploy com Docker

### Opção 1: Docker Compose (Recomendado)

\`\`\`bash
# Build e iniciar
docker compose up -d

# Ver logs
docker compose logs -f

# Parar
docker compose down
\`\`\`

### Opção 2: Docker direto

\`\`\`bash
# Build
docker build -t whatsapp-saas .

# Run
docker run -p 3000:3000 whatsapp-saas
\`\`\`

## Deploy na Hostinger VPS

Siga o guia completo em [DEPLOY.md](./DEPLOY.md)

Resumo rápido:
\`\`\`bash
# Na VPS
git clone https://github.com/cesar59xxx/v0-sistema.git
cd v0-sistema
docker compose up -d
\`\`\`

## Credenciais Padrão

Para desenvolvimento e teste:
- **Email:** admin@demo.com
- **Senha:** admin123

**IMPORTANTE:** Altere essas credenciais em produção!

## Estrutura do Projeto

\`\`\`
├── app/
│   ├── login/              # Página de login
│   ├── dashboard/          # Dashboard principal
│   ├── conversations/      # Lista de conversas
│   ├── chat/[id]/         # Interface de chat
│   └── api/
│       └── health/        # Health check endpoint
├── components/
│   ├── auth-provider.tsx  # Gerenciamento de autenticação
│   ├── chat-interface.tsx # Interface de chat ao vivo
│   ├── dashboard-header.tsx
│   ├── metrics-cards.tsx  # Cards de métricas
│   └── messages-chart.tsx # Gráfico de mensagens
├── lib/
│   └── storage.ts         # Gerenciamento de dados
├── Dockerfile             # Configuração Docker
├── docker-compose.yml     # Orquestração Docker
└── DEPLOY.md             # Guia completo de deploy
\`\`\`

## Funcionalidades

### Dashboard
- Métricas em tempo real (mensagens, tempo de resposta)
- Gráfico dos últimos 7 dias
- Lista de conversas recentes
- Estatísticas de atendimento

### Chat ao Vivo
- Interface de mensagens em tempo real
- Status de mensagens (enviado/entregue/lido)
- Informações do cliente
- Histórico completo

### Gerenciamento de Conversas
- Filtros por status (todas, ativas, pendentes, resolvidas)
- Busca de conversas
- Ações rápidas (resolver, reabrir, atribuir)
- Indicadores visuais de prioridade

## Comandos Úteis

### Durante o Desenvolvimento
\`\`\`bash
# Instalar nova dependência
npm install <pacote>

# Limpar cache
rm -rf .next node_modules
npm install
\`\`\`

### Em Produção
\`\`\`bash
# Atualizar código
git pull origin main
docker compose down
docker compose up -d --build

# Ver logs
docker compose logs -f

# Verificar saúde
curl http://localhost:3000/api/health
\`\`\`

## Suporte

Para problemas ou dúvidas:
1. Consulte o [DEPLOY.md](./DEPLOY.md) para troubleshooting
2. Verifique os logs: `docker compose logs -f`
3. Teste o health check: `curl http://localhost:3000/api/health`

## Licença

MIT
