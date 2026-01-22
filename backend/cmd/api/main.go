package main

import (
	"log"
	"os"

	"github.com/joho/godotenv"
	"github.com/vendrya/markethub/internal/database"
	"github.com/vendrya/markethub/internal/server"
)

func main() {
	if err := godotenv.Load(); err != nil {
		log.Println("Info: .env file not found, using system environment variables")
	}
	db := database.InitDB()
	_ = db

	srv := server.NewServer()

	port := os.Getenv("PORT")
	if port == "" {
		port = "8080"
	}

	log.Printf("Starting MarketHub on port %s...", port)
	if err := srv.Run(port); err != nil {
		log.Fatal("Error starting server: ", err)
	}
}
