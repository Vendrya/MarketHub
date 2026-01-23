# API Documentation

### Response Format (This is not implemented, issue #14)

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
## Health Check

Always verify the server is running:

```bash
curl http://localhost:8080/health
```

Expected response:
```json
{
  "message": "MarketHub API is running",
  "status": "ok",
}
```

## API Endpoints

- [Auth endpoints](./endpoints/auth_endpoints.md)
