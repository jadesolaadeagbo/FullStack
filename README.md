# Fullstack Authentication App

A fullstack authentication application with:

- 🔐 Google OAuth login
- 🍪 Session-based auth with secure cookies
- 🧑 User profile editing
- 💻 Frontend: React + Vite + Zustand
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
VITE_BASE_URL=http://localhost:8000
```
