# Fullstack Authentication App

A fullstack authentication application with:

- 🔐 Google OAuth login
- 🍪 Session-based auth with secure cookies
- 🧑 User profile editing
- 💻 Frontend: React Router + Vite + Zustand
- ⚙️ Backend: Express + MongoDB + Mongoose

---

## 📁 Project Structure

my-app/  
├── frontend/ # Vite + React (client)  
├── backend/ # Express + MongoDB (API server)  
├── .gitignore  
└── README.md

## 🚀 Getting Started

### 1. Clone the Repository

```bash
https://github.com/jadesolaadeagbo/FullStack.git
cd FullStack
```

### 2. Setup Environment Variables

Create .env files in both frontend/ and backend/ folders.

🔧 backend/.env

```bash
PORT = {port}
MONGODB_URI = {MONGO_URI}
SESSION_SECRET = {super_secret}
CLIENT_ID = {google_client_id}
CLIENT_SECRET = {google_client_secret}
```

Make sure your Google OAuth redirect URI is added to your Google Developer Console:

```bash
http://localhost:8000/auth/google/callback
```

🔧 frontend/.env

```bash
VITE_API_URL=http://localhost:8000
```

### 3. Install Dependencies

Backend

```bash
cd backend
npm install
```

In another terminal, open your frontend folder

```bash
cd frontend
npm install
```

### 4. Start your application

Backend:

```bash
cd backend
npm run dev
```

In another terminal, run your Frontend application:

```bash
cd frontend
npm run dev
```

## ✨ Features

- Google OAuth2 login flow

- Secure session-based authentication

- Zustand for global state management

- Profile page with logout and edit functionality

- Form validation and toast notifications

- Protected and public routes

## 🛠 Tech Stack

| Layer      | Stack                                        |
| ---------- | -------------------------------------------- |
| Frontend   | React, Vite, Zustand, Tailwind, React Router |
| Backend    | Node.js, Express, MongoDB, Mongoose          |
| Auth       | express-session, Google OAuth2               |
| State Mgmt | Zustand                                      |

## 🧑‍💻 Author

Made with ❤️ by Jadesola Adeagbo
