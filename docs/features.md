# **Application Features**

Stack:

- **Frontend:** NextJS, TypeScript, TailwindCSS
- **Backend:** Java, Spring Boot
- **Database:** ORM / PostgreSQL

- User Resources: MinIO
- Backend host: DigitalOcean
- Frontend host: Vercel

---

# **1. Guest (Unregistered User) Features**

Unregistered users can:

### Browse all products

- Product list
- Product detail page
- View images, description, price, tags, and seller info

### Search and filter

- Search by text
- Filter by tags, category, price, or creation date

### View public seller profile

- Seller name
- Profile picture
- Published products
- Join date

---

# **2. Registered User Features**

Registered users get access to private functionality:

### Personal Dashboard

Shows key metrics such as:

- Number of active products
- Total favorites
- Latest messages
- Product views
- Recent interactions

### Manage their own store

- Publish new products
- Upload product images (S3/MinIO)
- Add tags, categories, and pricing
- Edit or delete products
- Set product status: **active / paused / sold**

### Real-time chat (Low Priority)

- Chat with buyers or sellers
- One conversation per product (organized chat)
- Notifications for new messages
- List of active conversations in the dashboard

### Contact other sellers

- “Contact Seller” button on product pages
- Opens a private chat room
- Used to arrange payment, shipping, and details

### Product favorites (Wishlist)

- Add products to favorites
- See favorite items in dashboard
- Seller sees favorite count (analytics)

### Notifications

- New message
- New contact from a buyer
- Product favorited
- Admin actions (if applicable)

## Advanced Search & Tag System

- Dynamic tags stored in PostgreSQL
- Filter products by:
    - Price
    - Category
    - Tags
    - Seller
    - Recently updated

---

## Reporting System

Let users report suspicious content or behavior:

- Report a product (fraud, spam, fake listing)
- Report a user
- Reports go to admin dashboard

---

## Admin Dashboard

Even a simple admin panel makes your project feel complete:

- List all users
- Manage products
- Review reports
- Ban users
- Disable or delete suspicious products

---

## Product Analytics (Low Priority)

Displayed in the seller dashboard:

- Number of views
- Number of favorites
- Number of conversations started
- Status changes (sold, paused, active)

---

## Product Status

Every product should have:

- **Active**
- **Paused**
- **Sold**

The seller can update the status at any time.

---

## Real-time Notifications (Low Priority)

Using WebSockets or SSE:

- New chat message
- New favorite
- Buyer contacted the seller
- Admin response to reports

---

## Image Upload Support

Professional workflow:

- Upload images to **MinIO** (local)
- Use S3-compatible API for production
- Store only URLs in PostgreSQL

---

### Reviews & Ratings

- Rate sellers
- Rate products
- Public review system

### SEO-Friendly Public Pages

- Product pages accessible without login
- Optimized for sharing links and search indexing