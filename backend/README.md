# MarketHub Backend

A robust, scalable backend API for the MarketHub marketplace application built with Go and PostgreSQL.

## Quick Start

### Environment Setup

Create a `.env` file with the following configuration:

```bash
PORT=8080
DB_HOST=localhost
DB_USER=roots
DB_PASSWORD=roots
DB_NAME=markethubdb
DB_PORT=5432

JWT_SECRET=your_jwt_secret_key_here
```

### Run the Application

**Development:**
```bash
# From the root project directory when the docker-compose-dev.yml is present
docker-compose -f docker-compose-dev.yml up -d backend postgres minio

# or excute all services
docker-compose -f docker-compose-dev.yml up -d

# For stop
docker-compose -f docker-compose-dev.yml stop
```

The server will start at `http://localhost:8080`

## Project Structure

```
MarketHub/backend/
├── cmd/
│   └── api/
│       └── main.go                 # Application entry point
├── internal/
│   ├── database/
│   │   └── postgres.go            # Database connection
│   ├── server/
│   │   └── server.go              # HTTP server setup
│   └── modules/
│       ├── auth/                  # Authentication module
│       │   ├── controller/
│       │   ├── dto/
│       │   ├── middleware/
│       │   └── service/
│       └── user/                  # User management
│           ├── models/
│           └── repository/
├── .air.toml                      # Air configuration
├── .env                          # Environment variables
├── Dockerfile                    # Production Docker
├── Dockerfile.dev                # Development Docker
├── go.mod                        # Go module definition
└── go.sum                        # Dependency checksums
```
