package server

import (
	"github.com/gin-gonic/gin"
	"github.com/vendrya/markethub/internal/helpers"
)

type Server struct {
	Engine *gin.Engine
}

func NewServer() *Server {

	r := gin.Default()

	r.Use(corsMiddleware())

	r.GET("/health", func(c *gin.Context) {
		helpers.CreateResponse(c, 200, "MarketHub API is running", nil, nil)
	})

	return &Server{Engine: r}
}

func (s *Server) Run(port string) error {
	return s.Engine.Run(":" + port)
}

func corsMiddleware() gin.HandlerFunc {
	return func(c *gin.Context) {
		c.Writer.Header().Set("Access-Control-Allow-Origin", "*") // En prod cambiar "*"
		c.Writer.Header().Set("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS")
		c.Writer.Header().Set("Access-Control-Allow-Headers", "Content-Type, Authorization")

		if c.Request.Method == "OPTIONS" {
			c.AbortWithStatus(204)
			return
		}

		c.Next()
	}
}
