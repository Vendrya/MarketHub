# Authentication Endpoints

The API uses JWT (JSON Web Tokens) for authentication:

1. **Login**: POST to `/api/auth/login` with email and password
2. **Response**: Receive JWT token in response
3. **Usage**: Include token in Authorization header: `Bearer <token>`

---

### `POST /api/auth/register`
Body
```json
{
  "firstName": "John",
  "lastName": "Doe",
  "email": "john.doe@example.com",
  "password": "12345678"
}
```

Response
```json
{
  "token": "...",
  "email": "john.doe@example.com",
  "role": "USER"
}
```

### `POST /api/auth/login`
Body
```json
{
  "email": "john.doe@example.com",
  "password": "12345678"
}
```

Response
```json
{
  "token": "...",
  "email": "john.doe@example.com",
  "role": "USER"
}
```
