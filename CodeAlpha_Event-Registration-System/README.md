# 📌 Event Registration API – README

A fully functional **Event Registration REST API** built with **Node.js, Express, TypeORM (MongoDB)**, and **JWT authentication**.
Users can browse and register for events, while admins can create, update, and delete events.

---

## ✨ Features

### 🔐 Authentication

* User registration & login
* JWT-based authentication
* Admin-only access for event management

### 🗓 Event Management

* Create, update, delete events (admin only)
* Fetch all events (with pagination)
* Get event by ID
* Event capacity support (`maxAttendees`)

### 📝 Event Registration

* Users can register for events
* Users can view all their registrations
* Admin can get all registrations

### 📦 Technologies Used

* Node.js
* Express.js
* TypeORM (MongoDB)
* JWT Authentication
* Bcrypt
* Nodemon

---

# 🚀 Getting Started

## 📥 Installation

```bash
git clone https://github.com/Lecksikerm/CodeAlpha_Event-Registration-System.git
cd event-registration-api
npm install
```

---

# 🔧 Environment Variables

Create a `.env` file:

```
PORT=4000
MONGO_URL=your_mongodb_connection_string
JWT_SECRET=xxxxxxxxxxxx
```

---

# ▶️ Running the Server

### Development

```bash
npm run dev
```

### Production

```bash
npm start
```

API URL:

```
http://localhost:4000
```

---

# 📚 API Documentation

## 🔐 Auth Routes

### **Get User By ID**

```
GET /api/auth/user/:id
Authorization: Bearer <token>
```

### **Register User**

```
POST /api/auth/register
```

```json
{
  "name": "John Doe",
  "email": "john@gmail.com",
  "password": "123456"
}
```

### **Login User**

```
POST /api/auth/login
```

```json
{
  "email": "john@gmail.com",
  "password": "123456"
}
```

### **Get Profile (Logged‑in User)****

```
GET /api/auth/profile
Authorization: Bearer <token>
```

---

# 🗓 Event Routes

### **Create Event (Admin Only)**

```
POST /api/events
Authorization: Bearer <admin_token>
```

```json
{
  "title": "Tech Summit",
  "description": "A conference for developers",
  "date": "2025-05-14",
  "location": "Lagos",
  "maxAttendees": 200
}
```

### **Get All Events (Paginated)**

```
GET /api/events?page=1&limit=10
```

### **Get Single Event**

```
GET /api/events/:id
```

### **Update Event (Admin Only)**

```
PUT /api/events/:id
Authorization: Bearer <admin_token>
```

### **Delete Event (Admin Only)**

```
DELETE /api/events/:id
Authorization: Bearer <admin_token>
```

---

# 📝 Registration Routes

### **Register For Event**

```
POST /api/registration
Authorization: Bearer <user_token>
```

```json
{
  "eventId": "67a34c8ab53223cd12b7a901"
}
```

### **Get User’s Registrations**

```
GET /api/registration
Authorization: Bearer <user_token>
```

### **Get Registrations With Event Details**

```
GET /api/registration/event
Authorization: Bearer <user_token>
```

---

# 🏗 Project Structure

```
├── controllers/
├── entities/
├── middleware/
├── routes/
├── data-source.js
├── server.js
└── README.md
```

---

## Deployment URL

* https://event-registration-system-09d6.onrender.com/

---

# 🧪 Testing

* Register user
* Login → copy token
  Use Postman or Thunder Client:

1. Register user
2. Login → copy token
3. Add token to Authorization header
4. Test routes

---

# 📄 License

Open-source project.

---

# 🎉 Thank You!


