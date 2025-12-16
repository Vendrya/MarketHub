## 1️⃣ Arquitectura general (High Level)

**Arquitectura: monolito modular + servicios externos**

```
[ Client (Browser) ]
        |
        v
[ Frontend (React + TS) ]  -- Vercel
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

## 2️⃣ Frontend Design (React)

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

## 3️⃣ Backend Design (Spring Boot)

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

## 4️⃣ Autenticación & Seguridad

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

## 5️⃣ Modelo de Datos (PostgreSQL)

### Usuarios

```sql
users (
  id UUID PK,
  email,
  password_hash,
  username,
  role,
  profile_picture,
  location_lat,
  location_lng,
  created_at
)

```

### Productos

```sql
products (
  id UUID PK,
  seller_id FK,
  title,
  description,
  price,
  status ENUM(active, paused, sold),
  category_id,
  created_at,
  updated_at
)

```

### Imágenes

```sql
product_images (
  id,
  product_id,
  image_url
)

```

### Tags

```sql
tags (
  id,
  name
)

product_tags (
  product_id,
  tag_id
)

```

### Favoritos

```sql
favorites (
  user_id,
  product_id,
  created_at
)

```

### Chats

```sql
conversations (
  id,
  product_id,
  buyer_id,
  seller_id,
  created_at
)

messages (
  id,
  conversation_id,
  sender_id,
  content,
  created_at,
  read
)

```

### Reportes

```sql
reports (
  id,
  reporter_id,
  target_type ENUM(user, product),
  target_id,
  reason,
  status,
  created_at
)

```

### Reviews

```sql
reviews (
  id,
  reviewer_id,
  target_type ENUM(user, product),
  rating,
  comment,
  created_at
)

```

---

## 6️⃣ Search & Filtering

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

## 7️⃣ Real-Time (Chat & Notifications)

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

## 8️⃣ Image Upload (MinIO / S3)

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

## 9️⃣ Analytics de Productos

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

## 🔟 Admin Dashboard

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

## 1️⃣1️⃣ Geolocalización

### Implementación

- Guardar lat/lng del seller
- Query por distancia (Haversine)
- Filtro por radio

```sql
WHERE earth_distance(
  ll_to_earth(lat, lng),
  ll_to_earth(:userLat, :userLng)
) < :radius

```

---

## 1️⃣2️⃣ Escalabilidad

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

---

## 1️⃣3️⃣ Por qué este design es bueno para entrevistas

✔ Realista

✔ Escalable

✔ No overengineered

✔ Usa buenas prácticas

✔ Muestra criterio técnico