package middleware

import (
	"net/http"
	"strings"

	"github.com/gin-gonic/gin"
	"github.com/vendrya/markethub/internal/modules/auth/service"
)

func JwtAuthMiddleware(jwtService *service.JwtService) gin.HandlerFunc {
	return func(c *gin.Context) {
		authHeader := c.GetHeader("Authorization")
		if authHeader == "" {
			c.JSON(http.StatusUnauthorized, gin.H{"error": "Missing authorization header"})
			c.Abort()
			return
		}

		parts := strings.Split(authHeader, " ")
		if len(parts) != 2 || parts[0] != "Bearer" {
			c.JSON(http.StatusUnauthorized, gin.H{"error": "Invalid token format. Use 'Bearer <token>'"})
			c.Abort()
			return
		}

		tokenString := parts[1]

		claims, err := jwtService.ValidateToken(tokenString)
		if err != nil {
			c.JSON(http.StatusUnauthorized, gin.H{"error": "Invalid or expired token"})
			c.Abort()
			return
		}

		if sub, ok := (*claims)["sub"].(string); ok {
			c.Set("userID", sub)
		}
		if email, ok := (*claims)["email"].(string); ok {
			c.Set("userEmail", email)
		}
		if role, ok := (*claims)["role"].(string); ok {
			c.Set("userRole", role)
		}

		c.Next()
	}
}
