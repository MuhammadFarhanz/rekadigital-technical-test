# Project Documentation

## Overview
This project consists of a **backend** built with Express.js and PostgreSQL, and a **frontend** built with Next.js. and the database is managed using **Docker Compose**.

## Prerequisites
Ensure you have the following installed on your system:
- [Node.js](https://nodejs.org/) (Latest LTS version recommended)
- [Docker](https://www.docker.com/)
- [Docker Compose](https://docs.docker.com/compose/)
- [Git](https://git-scm.com/)

## Installation

### 1. Clone the Repository
```bash
git clone <repository_url>
cd <repository_folder>
```

### 2. Setup the Backend

Navigate to the backend directory:
```bash
cd backend
```

#### Install Dependencies
```bash
npm install
```

#### Set up Environment Variables
Create a `.env` file in the `backend` folder and define required environment variables:

#### Run Database with Docker Compose
Ensure Docker is running, then start the database:
```bash
docker-compose up -d
```

#### Run Migrations & Seed Data

#### Start the Backend Server
```bash
npm run start
```
The backend will be available at `http://localhost:8000`.

---

### 3. Setup the Frontend

Navigate to the frontend directory:
```bash
cd ../frontend
```

#### Install Dependencies
```bash
npm install
```

#### Start the Frontend Server
```bash
npm run dev
```
The frontend will be available at `http://localhost:3000`.

## Running the Application
Once both the frontend and backend are running, you can use the application by accessing:
- **Frontend:** `http://localhost:3000`
- **Backend API:** `http://localhost:8000`

## Additional Commands

### Stop Docker Containers
```bash
docker-compose down
```

### Run ESLint for Code Linting
```bash
npm run lint
```

## License
This project is licensed under ISC. Created by han.

