# EventLite - Ticket Booking Platform

**EventLite** is a full-stack event management and ticket booking platform built using the PERN stack (PostgreSQL, Express.js, React, Node.js). It provides real-time booking, secure payments, and an efficient management interface for users, organizers, and administrators.

---

## Project Overview

Traditional event ticketing platforms face challenges such as poor user experience, delayed updates, and complex manual processes. EventLite addresses these issues by offering a secure, real-time system that connects users and organizers with instant updates, payment reliability, and efficient management tools.

---

## Key Features

### User Features

* Search, filter, and explore events.
* Book tickets with instant confirmation.
* Manage profile and booking history.
* Receive real-time notifications.

### Organizer Features

* Create, edit, and manage events.
* Track real-time ticket sales and attendance.
* Upload and manage event media.
* Engage with attendees in real time.

### Admin Features

* Manage users, organizers, and events.
* Access analytics and reporting tools.
* Moderate platform activity.

---

## Technology Stack

| Layer               | Technology                                          |
| ------------------- | --------------------------------------------------- |
| Frontend            | React, TypeScript, Tailwind CSS, shadcn/ui, Zustand |
| Backend             | Node.js, Express.js, Prisma ORM                     |
| Database            | PostgreSQL                                          |
| Caching / Real-time | Redis, Socket.io                                    |
| Authentication      | Google OAuth 2.0, JWT                               |
| Payments            | Stripe                                              |
| File Storage        | Cloudinary                                          |
| API Documentation   | Swagger                                             |
| DevOps / Tools      | Docker, Jenkins, Morgan, Winston                    |

---

## System Architecture

* **Frontend Layer:** React Single Page Application.
* **API Gateway:** Express.js REST API with WebSocket support.
* **Data Layer:** PostgreSQL with Prisma ORM.
* **Cache Layer:** Redis for session management and real-time data.
* **External Services:** Stripe, Cloudinary, Google OAuth.

---

## API Overview

| Module          | Description                                          |
| --------------- | ---------------------------------------------------- |
| Authentication  | OAuth, JWT, session management, role-based access    |
| User Management | Profile management, avatar uploads, booking history  |
| Events          | Event creation, updates, search, and filtering       |
| Tickets         | Ticket booking, QR code validation, capacity control |
| Payments        | Stripe integration, webhooks, refunds                |
| Real-time       | Live updates through Socket.io                       |
| File Management | Uploads and CDN distribution via Cloudinary          |

API documentation is available at:
`http://localhost:8880/api-docs`

---

## Database Entities

* **User:** Profile information, authentication data, and roles.
* **Event:** Event details, pricing, and organizer mapping.
* **Ticket:** Booking details, payment reference, and event linkage.
* **Payment:** Transaction status and Stripe integration data.
* **Category, Notification, AuditLog:** Supporting entities for additional features.

---

## Installation and Setup

### 1. Clone the Repository

```bash
git clone https://github.com/PraveenBaghelMaurya/EventLite-Ticket-booking-platform.git
cd EventLite-Ticket-booking-platform/BACKEND
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Environment Variables

Create a `.env` file in the backend directory:

```env
PORT=8880
DATABASE_URL=your_postgres_connection_url
JWT_SECRET=your_secret_key
CLOUDINARY_URL=your_cloudinary_url
STRIPE_SECRET_KEY=your_stripe_secret
```

### 4. Run the Server

```bash
npm run dev
```

### 5. Access Swagger Documentation

```
http://localhost:8880/api-docs
```

---

## Docker Setup (Optional)

```bash
docker build -t eventlite-backend .
docker run -p 8880:8880 eventlite-backend
```

---

## Development Tools

* **Prisma Studio:** Database visualization and management

  ```bash
  npx prisma studio
  ```
* **Jenkins:** CI/CD pipeline automation
* **Winston & Morgan:** Logging and monitoring

---

## Security Implementation

* Google OAuth 2.0 and JWT authentication
* Role-based authorization (User, Organizer, Admin)
* Input validation with Zod
* CSRF and XSS protection
* PCI-compliant payment processing with Stripe

---

## Performance Optimization

* Redis-based caching for sessions and queries
* Optimized database indexing and connection pooling
* WebSocket for real-time updates
* Image optimization through Cloudinary CDN

---

## Contribution Guidelines

1. Fork the repository.
2. Create a new feature branch (`feature/your-feature-name`).
3. Commit and push your changes.
4. Open a pull request for review.

---

## Author

**Praveen Kumar**
Location:  New Delhi
Email: [praveenbaghelmaurya@gmail.com](mailto:praveenbaghelmaurya@gmail.com)
LinkedIn: [https://www.linkedin.com/in/praveen-kumar-847808208/](https://www.linkedin.com/in/praveen-kumar-847808208/)
GitHub: [https://github.com/PraveenBaghelMaurya](https://github.com/PraveenBaghelMaurya)

---

Would you like me to create a **shorter version (for GitHub home page)** and a **separate detailed one (for /docs folder)**? That approach looks more professional in repositories.
