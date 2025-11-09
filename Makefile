.PHONY: help install dev build start stop restart logs clean deploy update backup

help:
	@echo "WhatsApp SaaS - Comandos Disponíveis"
	@echo ""
	@echo "  make install    - Instalar dependências"
	@echo "  make dev        - Iniciar em modo desenvolvimento"
	@echo "  make build      - Build da aplicação"
	@echo "  make start      - Iniciar containers"
	@echo "  make stop       - Parar containers"
	@echo "  make restart    - Reiniciar containers"
	@echo "  make logs       - Ver logs"
	@echo "  make clean      - Limpar containers e imagens"
	@echo "  make deploy     - Deploy completo"
	@echo "  make update     - Atualizar aplicação"
	@echo "  make backup     - Criar backup"

install:
	npm install --legacy-peer-deps

dev:
	npm run dev

build:
	docker compose build --no-cache

start:
	docker compose up -d
	@echo "Aplicação iniciada! Acesse http://localhost:3000"

stop:
	docker compose down

restart:
	docker compose restart

logs:
	docker compose logs -f --tail=100

clean:
	docker compose down -v
	docker system prune -af

deploy:
	@bash scripts/deploy.sh

update:
	@bash scripts/update.sh

backup:
	@bash scripts/backup.sh

status:
	docker compose ps
	@echo ""
	@curl -f http://localhost:3000/api/health && echo "✓ App está saudável" || echo "✗ App não está respondendo"
