# Assessment

# Task Management System

A full-stack Task Management System built with **Express, React, Node.js, MongoDB (MERN)** with JWT authentication.

## Prerequisites

- **For Docker setup**: Docker and Docker Compose
- **For Manual setup**: 
  - Node.js (v20 or higher)
  - MongoDB (v8.0 or higher)
  - npm

## Setup Methods

### Docker Setup (Recommended)

The easiest way to get started with the project using Docker Compose.

#### 1. Clone the repository
```bash
git clone https://github.com/AkibHossainOmi/Task-Management-System.git
cd Task-Management-System
```

#### 2. Start the application
```bash
docker compose up -d --build
```

#### 3. Access the application
- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:8000
- **Swagger Doc**: http://localhost:8000/api/docs
- **MongoDB**: mongodb://localhost:27017/

#### 4. Useful Docker Commands
```bash
# Stop all services
docker compose down

# View logs 
docker compose logs -f

# Restart specific service
docker compose restart server

# Remove containers and volumes
docker compose down -v
```

---

### Manual Setup

Follow these steps if you prefer to set up the development environment manually.

#### 1. Clone the repository
```bash
git clone https://github.com/AkibHossainOmi/Task-Management-System.git
cd Task-Management-System
```

#### 2. Backend Setup

##### Install dependencies
```bash
cd backend
npm install
```

##### Environment Configuration
Create `backend/.env`:
```env
PORT=8000
MONGO_URI=mongodb://localhost:27017/task_management
JWT_SECRET=task_secret
NODE_ENV=development
CLIENT_URL=http://localhost:3000
```

##### Start the backend server
```bash
npm start
```

#### 3. Frontend Setup

##### Open a new terminal and navigate to frontend
```bash
cd frontend
```

##### Install dependencies
```bash
npm install
```

##### Environment Configuration
Create `frontend/.env`:
```env
BASE_API_URL=http://localhost:8000/api
```

##### Start the React development server
```bash
npm start
```

#### 4. Access the application
- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:8000
- **Swagger Doc**: http://localhost:8000/api/docs

---

## Troubleshooting

### Common Issues

1. **Port already in use**
   - Change ports in `.env` files or docker-compose.yml

2. **MongoDB connection issues**
   - Ensure MongoDB is running (manual setup)
   - Check connection string in environment variables

3. **Docker container conflicts**
   ```bash
   docker compose down
   docker system prune -f
   docker compose up --build
   ```
