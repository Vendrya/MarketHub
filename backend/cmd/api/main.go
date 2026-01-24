package main

import (
	"log"
	"os"

	"net/http" // Example Endpoint

	"github.com/gin-gonic/gin"

	"github.com/joho/godotenv"
	"github.com/vendrya/markethub/internal/database"
	"github.com/vendrya/markethub/internal/helpers"
	"github.com/vendrya/markethub/internal/server"

	authController "github.com/vendrya/markethub/internal/modules/auth/controller"
	authMiddleware "github.com/vendrya/markethub/internal/modules/auth/middleware"
	authService "github.com/vendrya/markethub/internal/modules/auth/service"
	userModels "github.com/vendrya/markethub/internal/modules/user/models"
	userRepo "github.com/vendrya/markethub/internal/modules/user/repository"
)

func main() {
	if err := godotenv.Load(); err != nil {
		log.Println("Info: .env file not found, using system environment variables")
	}
	db := database.InitDB()
	// _ = db

	log.Println("Running database migrations...")
	if err := db.AutoMigrate(&userModels.User{}); err != nil {
		log.Fatal("Error migrating database: ", err)
	}

	uRepo := userRepo.NewUserRepository(db)
	jwtSvc := authService.NewJwtService()
	authSvc := authService.NewAuthService(uRepo, jwtSvc)
	authCtrl := authController.NewAuthController(authSvc)
	jwtMiddleware := authMiddleware.JwtAuthMiddleware(jwtSvc)

	srv := server.NewServer()

	api := srv.Engine.Group("/api")
	{
		authGroup := api.Group("/auth")
		{
			authGroup.POST("/register", authCtrl.Register)
			authGroup.POST("/login", authCtrl.Login)
		}

		protected := api.Group("/")
		protected.Use(jwtMiddleware)
		{
			// Endpoint de ejemplo para probar el middleware
			protected.GET("/profile", func(c *gin.Context) {
				userID, _ := c.Get("userID")
				email, _ := c.Get("userEmail")

				helpers.CreateResponse(c, http.StatusOK, "Access authorized", gin.H{
					"user_id": userID,
					"email":   email,
				}, nil)
			})
		}
	}

	port := os.Getenv("PORT")
	if port == "" {
		port = "8080"
	}

	log.Printf("Starting MarketHub on port %s...", port)
	if err := srv.Run(port); err != nil {
		log.Fatal("Error starting server: ", err)
	}
}
