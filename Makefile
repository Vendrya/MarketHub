dev:
	backend:
		docker compose -f docker-compose-dev.yml up -d backend postgres minio

stop:
	docker compose -f docker-compose-dev.yml stop
