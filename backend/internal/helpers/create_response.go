package helpers

import (
	"github.com/gin-gonic/gin"
)

type APIResponse struct {
	Message string `json:"message"`
	Success bool   `json:"success"`
	Data    any    `json:"data,omitempty"`
	Error   any    `json:"error,omitempty"`
}

// CreateResponse sends a standardized JSON HTTP response using Gin.
//
// The Success field is automatically derived from the statusCode:
// it is set to true for HTTP 2xx responses and false otherwise.
//
// Parameters:
//   - c: Gin context associated with the HTTP request.
//   - statusCode: HTTP status code of the response.
//   - message: human-readable description of the result.
//   - data: response payload (optional).
//   - error: error details (optional).
//
// Examples:
//
//	CreateResponse(c, 200, "User created successfully", user, nil)
//	CreateResponse(c, 401, "Unauthorized", nil, "invalid token")
func CreateResponse(c *gin.Context, statusCode int, message string, data any, err any) {
	success := false
	if statusCode >= 200 && statusCode < 300 {
		success = true
	}

	c.JSON(statusCode, APIResponse{
		Message: message,
		Success: success,
		Data:    data,
		Error:   err,
	})
}
