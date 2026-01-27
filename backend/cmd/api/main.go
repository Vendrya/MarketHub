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

	productController "github.com/vendrya/markethub/internal/modules/products/controller"
	productModels "github.com/vendrya/markethub/internal/modules/products/models"
	productRepository "github.com/vendrya/markethub/internal/modules/products/repository"
	productService "github.com/vendrya/markethub/internal/modules/products/service"
)

func main() {
	if err := godotenv.Load(); err != nil {
		log.Println("Info: .env file not found, using system environment variables")
	}
	db := database.InitDB()
	// _ = db

	log.Println("Running database migrations...")
	if err := db.AutoMigrate(&userModels.User{}, &productModels.Product{}, &productModels.Category{}, &productModels.Tag{}); err != nil {
		log.Fatal("Error migrating database: ", err)
	}

	log.Println("Creating data...")
	if err := database.Seed(db); err != nil {
		log.Fatal("Error creating default values: ", err)
	}

	uRepo := userRepo.NewUserRepository(db)
	jwtSvc := authService.NewJwtService()
	jwtMiddleware := authMiddleware.JwtAuthMiddleware(jwtSvc)

	authSvc := authService.NewAuthService(uRepo, jwtSvc)
	authCtrl := authController.NewAuthController(authSvc)

	productRepo := productRepository.NewProductRepository(db)
	categoryRepo := productRepository.NewCategoryRepository(db)
	tagRepo := productRepository.NewTagRepository(db)
	productSvc := productService.NewProductService(productRepo, tagRepo, categoryRepo)
	productCtrl := productController.NewProductsController(productSvc)

	srv := server.NewServer()

	api := srv.Engine.Group("/api")
	{
		authGroup := api.Group("/auth")
		{
			authGroup.POST("/register", authCtrl.Register)
			authGroup.POST("/login", authCtrl.Login)
		}

		api.GET("/products", productCtrl.GetAllProducts)
		api.POST("/products", jwtMiddleware, productCtrl.CreateProduct)

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
