# ITUE301 Open-Book Practical Examination — Set B
## Library Book Management System

### 1. Project Description
This repository contains the complete implementation for the **Library Book Management System** for the ITUE301 (Advanced Web Development Frameworks) Open-Book Practical Examination (Set B).

The project is split into two primary modules:
- **Frontend**: A React application configured with React Router (`react-router-dom`), modular component architecture (`BookCard`, `Navigation`), controlled form state management (`useState`), and dynamic API consumption (`useEffect`).
- **Backend**: An Express.js REST API with custom request logging middleware (`requestLogger`), global error handler middleware, and Mongoose schema models (`Book`, `Member`, `Borrowing`).

---

### 2. Project Directory Structure
```
d:\Exam\
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── BookCard.jsx
│   │   │   └── Navigation.jsx
│   │   ├── pages/
│   │   │   ├── HomePage.jsx
│   │   │   ├── BooksPage.jsx
│   │   │   └── BorrowPage.jsx
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── index.html
│   ├── vite.config.js
│   └── package.json
│
├── backend/
│   ├── models/
│   │   ├── Book.js
│   │   ├── Member.js
│   │   └── Borrowing.js
│   ├── server.js
│   └── package.json
│
├── .env.example
├── .env
├── .gitignore
└── README.md
```

---

### 3. Required Environment Variables
Create a `.env` file in the root directory (or inside `backend/`):

```env
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/library_management
```

*(Note: `.env.example` is committed to the repository for reference as per instructions).*

---

### 4. Backend Setup and Run Command

1. Open a terminal and navigate to the backend directory:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the Express backend server:
   ```bash
   npm start
   ```
   *(or `node server.js`)*

The server will start on port `5000` (`http://localhost:5000`).

---

### 5. Frontend Setup and Run Command

1. Open a second terminal window and navigate to the frontend directory:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the Vite React development server:
   ```bash
   npm run dev
   ```

The React frontend will start on port `3000` (`http://localhost:3000`).

---

### 6. MongoDB Setup
1. Ensure MongoDB service is running locally on default port `27017` or use a MongoDB Atlas connection string.
2. Update the `MONGO_URI` variable in `.env` if using a remote MongoDB cluster:
   ```env
   MONGO_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/library_management
   ```
3. When the backend connects to MongoDB, it will automatically populate sample initial books, members, and borrowing records.

---

### 7. REST API Endpoints Reference

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| **GET** | `/api/v1/books` | Returns list of all books |
| **POST** | `/api/v1/books` | Creates a new book record |
| **GET** | `/api/v1/borrowings` | Returns all borrowing records with populated member & book details |
| **POST** | `/api/v1/borrowings` | Creates a new borrowing record |
| **GET** | `/api/v1/test-validation` | Demonstrates Mongoose schema validation error handling |
| **POST** | `/api/v1/seed` | Triggers database seeding |

---

### 8. Middleware & Feature Implementation Highlights
- **Request Logger**: Every incoming request prints `[METHOD] [PATH] [TIMESTAMP]` to the server console.
- **Global Error Handler**: Catches Mongoose validation errors, duplicate keys, and 500 errors, returning clean JSON responses `{ success: false, error: "..." }`.
- **BookCard Component**: Displays Title, Author, Category, and visual badge for Availability (`Available` vs `Not Available`).
- **Borrowing Form**: Features controlled components with real-time state preview on screen.
