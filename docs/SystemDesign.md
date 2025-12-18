## Arquitectura general (High Level)

**Arquitectura: monolito modular + servicios externos**

```
[ Client (Browser) ]
        |
        v
[ Frontend (NextJS + TS) ]  -- Vercel
        |
        v
[ API Gateway / Backend ]
[ Spring Boot (Java) ]     -- DigitalOcean
        |
        +--> PostgreSQL
        +--> MinIO / S3
        +--> WebSocket / SSE
        |
        +--> Cloudflare (DNS + CDN + WAF)

```

### Por qué esta arquitectura

- Suficiente para MVP / proyecto grande
- Fácil de escalar horizontalmente
- No overengineering (no microservicios aún)
- Muy bien visto en entrevistas

---

## Frontend Design (NextJS)

### Responsabilidades

- UI / UX
- Routing público + privado
- Estado global (auth, notifications)
- WebSocket client
- SEO para páginas públicas

### Estructura recomendada

```
src/
 ├─ app/
 │   ├─ public/
 │   │   ├─ products/
 │   │   ├─ sellers/
 │   ├─ dashboard/
 │   │   ├─ products/
 │   │   ├─ chats/
 │   │   ├─ analytics/
 │   ├─ admin/
 │   └─ auth/
 ├─ components/
 ├─ services/
 │   ├─ api.ts
 │   ├─ websocket.ts
 ├─ stores/ (Zustand / Redux)
 └─ utils/

```

### SEO

- Product pages sin login
- SSR / SSG (Next.js ideal)
- Meta tags dinámicos
- URLs limpias:
    
    `/product/123-market-keyboard`
    

---

## Backend Design (Spring Boot)

### Arquitectura interna

**Monolito modular (Clean Architecture)**

```
controller/
service/
repository/
domain/
dto/
security/
websocket/

```

### Módulos principales

- Auth & Users
- Products
- Search & Tags
- Chat
- Notifications
- Reports
- Admin
- Analytics

---

## Autenticación & Seguridad

### Auth

- JWT (Access + Refresh)
- Roles:
    - GUEST
    - USER
    - ADMIN

### Seguridad

- Spring Security
- Rate limiting (Cloudflare)
- Input validation
- Soft delete para datos críticos
- Auditoría básica (created_at, updated_at)

---

## Search & Filtering

### Implementación inicial

- PostgreSQL:
    - `ILIKE` para texto
    - Índices en:
        - price
        - category
        - created_at
        - status
- Join con tags

### Escalable a futuro

- Migrar a **OpenSearch / Meilisearch**
- Cache de resultados frecuentes

---

## Real-Time (Chat & Notifications) (Low Priority)

### Tecnología

- WebSockets (Spring WebSocket)
- Fallback: SSE

### Casos de uso

- Nuevo mensaje
- Nuevo favorito
- Contacto iniciado
- Admin response

### Flujo Chat

```
User A → WebSocket → Backend
Backend:
  - guarda mensaje
  - notifica User B

```

### Notificaciones

- Persistentes (DB)
- En tiempo real (WS)
- Marcadas como leídas

---

## Image Upload (MinIO / S3)

### Flujo

1. Frontend pide URL firmada
2. Backend genera pre-signed URL
3. Frontend sube imagen directo a MinIO/S3
4. Backend guarda solo la URL

### Ventajas

- Backend liviano
- Escala fácil
- Seguro

---

## Analytics de Productos (Low Priority)

### Eventos trackeados

- View product
- Favorite
- Chat started
- Status change

### Modelo simple

```sql
product_events (
  id,
  product_id,
  event_type,
  created_at
)

```

### Uso

- Dashboard vendedor
- Métricas básicas
- Fácil agregación

---

## Admin Dashboard (Mid Priority)

### Funciones

- Ver usuarios
- Ver productos
- Moderar reportes
- Ban / disable
- Logs de acciones

### Seguridad

- Rutas protegidas
- Role ADMIN obligatorio

---

## Escalabilidad (Low Priority)

### Horizontal

- Backend stateless
- Load balancer (DO / Cloudflare)
- DB read replicas

### Cache

- Redis (sessions, popular products)
- CDN para imágenes

### Evolución futura

- Separar Chat Service
- Separar Search Service
- Event-driven (Kafka / RabbitMQ)