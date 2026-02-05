# API Documentation

### Response Format

All API responses follow a consistent format:

**Success Response:**
```json
{
    "success": true,
    "data": {},
    "message": "Operation successful"
}
```

**Error Response:**
```json
{
    "success": false,
    "error": "Error message",
    "message": "Operation failed"
}
```

To create this response, you need to use the `CreateResponse` function found in the __helpers__ package.
Example:
```go
# Visit the create_response.go file in helpers package for more information.

r.GET("/health", func(c *gin.Context) {
	helpers.CreateResponse(c, 200, "MarketHub API is running", nil, nil)
})
```

### Health Check

Always verify the server is running:

```bash
curl http://localhost:8080/health
```

Expected response:
```json
{
  "message": "MarketHub API is running",
  "success": true,
}
```

### API Endpoints

- [Auth endpoints](./endpoints/auth_endpoints.md)
