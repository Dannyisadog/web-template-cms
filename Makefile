include .env

setup:
	docker build --no-cache --target dev -t ${APP_NAME} .

up:
	docker-compose up -d

logs:
	docker logs ${APP_NAME}_web -f

restart:
	docker-compose restart

down:
	docker-compose down
