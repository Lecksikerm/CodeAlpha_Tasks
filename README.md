# CodeAlpha_URL-Shortener
# URL Shortener Project

## Overview

This is a simple URL shortener application built using **Node.js**, **Express**, and **MongoDB Atlas**. It allows users to input a long URL and generate a unique short URL, which redirects to the original link. A basic frontend interface is included for easy interaction.

---

## Features

* Shorten long URLs to a unique code.
* Redirect users from the short URL to the original URL.
* Store URL mappings in **MongoDB Atlas**.
* Basic frontend interface with URL input and output display.
* Fully functional backend API.

---

## Technologies Used

* **Node.js**: Backend runtime environment
* **Express.js**: Web framework for building API endpoints
* **MongoDB Atlas**: Cloud-hosted NoSQL database
* **Mongoose**: ODM for MongoDB
* **nanoid**: Generates unique short codes
* **dotenv**: Environment variable management
* **CORS**: Cross-origin resource sharing
* **HTML/CSS/JavaScript**: Frontend interface

---

## Project Structure

```
url-shortener/
│
├─ models/
│  └─ Url.js           # Mongoose model for URL
│
├─ public/
│  └─ index.html       # Frontend interface
│
├─ server.js           # Express server with API routes
├─ package.json
└─ .env                # Environment variables (MongoDB URI, PORT, BASE_URL)
```

---

## Setup Instructions

### 1. Clone the repository

```bash
git clone <https://github.com/Lecksikerm/CodeAlpha_URL-Shortener>
cd url-shortener
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure Environment Variables

Create a `.env` file in the root folder:

```
PORT=5000
BASE_URL=http://localhost:5000
```

### 4. Run the server

```bash
node server.js
```

You should see:

```
Server running on port 5000
MongoDB Connected
```

### 5. Access the frontend

Open your browser at:

```
http://localhost:5000
```

Use the input box to shorten URLs and click the generated short URL to test redirection.

---

## API Endpoints

### 1. Shorten URL

* **URL:** `/shorten`
* **Method:** POST
* **Body:**

```json
{
  "longUrl": "https://example.com"
}
```

* **Response:**

```json
{
  "shortUrl": "http://localhost:5000/abc123",
  "longUrl": "https://example.com",
  "shortCode": "abc123"
}
```

### 2. Redirect

* **URL:** `/:shortCode`
* **Method:** GET
* **Description:** Redirects to the original long URL corresponding to `shortCode`.

---

## Notes

* Ensure MongoDB Atlas allows your current IP address in the **IP Access List**.
* Do not commit `.env` to version control.
* The frontend is a simple static HTML file served from `/public`.

---

## Future Improvements

* Add click tracking and analytics for each short URL.
* Allow custom short codes.
* Improve frontend with better styling and UX.
* Deploy backend and frontend to a cloud service.

---
## Deployment URL

https://codealpha-url-shortener-gey8.onrender.com

## Author

* **Kareem Idris**
* **Email:** [idrisolalekann@gmail.com](mailto:idrisolalekann@gmail.com)
* **GitHub:** github.com/Lecksikerm
