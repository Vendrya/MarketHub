FROM golang:1.25-alpine AS builder

WORKDIR /app

COPY go.mod go.sum ./
RUN go mod download

COPY . .

# cmd/api/main.go 
RUN CGO_ENABLED=0 GOOS=linux go build -o markethub-api ./cmd/api

FROM alpine:latest

WORKDIR /root/

COPY --from=builder /app/markethub-api .

EXPOSE 8080

CMD ["./markethub-api"]