dev-backend:
	docker compose -f docker-compose-dev.yml up -d backend postgres minio

db:
	docker exec -it postgres psql -U roots -d markethubdb

stop:
	docker compose -f docker-compose-dev.yml stop
