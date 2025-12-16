
### Build
docker compose up --build

### Test postgreSQL
psql -h localhost -p 5432 -U roots markethubdb

### From the container
docker exec -it postgres psql -U roots markethubdb
