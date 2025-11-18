

https://github.com/Zachariah72/mern-stack-integration-Zachariah72

https://mern-stack-integration-git-347c13-zachariahs-projects-c4361150.vercel.app/

















# Week 4 MERN Notes App

A full-stack MERN (MongoDB, Express, React, Node.js) application for managing notes with a modern UI built using React, Tailwind CSS, and Radix UI components.

## 📋 Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Configuration](#configuration)
- [Running the Application](#running-the-application)
- [API Endpoints](#api-endpoints)
- [Known Issues & Fixes](#known-issues--fixes)
- [Contributing](#contributing)

## ✨ Features

- ✅ Create, Read, Update, and Delete (CRUD) notes
- ✅ User-specific notes with userId filtering
- ✅ Real-time note updates
- ✅ Responsive design with Tailwind CSS
- ✅ Modal dialogs for creating notes
- ✅ Inline editing for existing notes
- ✅ Timestamps for note creation and updates
- ✅ Modern UI components using Radix UI

## 📁 Project Structure

```
week4-notes/
├── backend/
│   ├── src/
│   │   ├── config/
│   │   │   └── db.js              # Database connection
│   │   ├── models/
│   │   │   └── Notes.js           # Note schema/model
│   │   ├── routes/
│   │   │   └── notes.js           # API routes
│   │   └── server.js              # Express server setup
│   └── package.json
│
├── frontend/
│   ├── src/
│   │   ├── assets/                # Static assets
│   │   ├── components/
│   │   │   ├── ui/                # Reusable UI components
│   │   │   │   ├── button.jsx
│   │   │   │   ├── card.jsx
│   │   │   │   ├── input.jsx
│   │   │   │   └── textarea.jsx
│   │   │   ├── NewNoteDialog.jsx  # Create note modal
│   │   │   └── NoteCard.jsx       # Note display card
│   │   ├── lib/
│   │   │   ├── api.js             # API client
│   │   │   └── utils.js           # Utility functions
│   │   ├── pages/
│   │   │   └── Dashboard.jsx      # Main dashboard
│   │   ├── App.jsx                # Root component
│   │   ├── main.jsx               # Entry point
│   │   └── index.css              # Global styles
│   ├── vite.config.js             # Vite configuration
│   └── package.json
│
└── README.md
```

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v16 or higher)
- **npm** or **yarn**
- **MongoDB** (local installation or MongoDB Atlas account)

## 🚀 Installation

### 1. Clone the repository

```bash
git clone https://github.com/PLP-MERN-Stack-Development/Week-4-MERN-Notes-App.git
cd Week-4-MERN-Notes-App
```

### 2. Install Backend Dependencies

```bash
cd backend
npm install
```

### 3. Install Frontend Dependencies

```bash
cd ../frontend
npm install
```

## ⚙️ Configuration

### Backend Configuration

1. Create a `.env` file in the `backend` directory:

```bash
cd backend
touch .env
```

2. Add the following environment variables:

```env
# MongoDB Connection String
MONGODB_URI=mongodb://localhost:27017/notes-app
# or for MongoDB Atlas:
# MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/notes-app

# Server Port
PORT=5000

# Allowed Frontend Origin
ALLOWED_ORIGIN=http://localhost:5173
```

### Frontend Configuration

1. Create a `.env` file in the `frontend` directory:

```bash
cd frontend
touch .env
```

2. Add the following environment variable:

```env
VITE_API_URL=http://localhost:5000
```

## 🏃 Running the Application

### Start the Backend Server

```bash
cd backend
npm run dev
```

The backend server will start on `http://localhost:5000`

### Start the Frontend Development Server

In a new terminal:

```bash
cd frontend
npm run dev
```

The frontend will start on `http://localhost:5173`

### Access the Application

Open your browser and navigate to:
```
http://localhost:5173
```

## 📡 API Endpoints

### Notes Endpoints

| Method | Endpoint | Description | Request Body |
|--------|----------|-------------|--------------|
| `GET` | `/api/notes` | Get all notes (optionally filtered by userId) | Query: `?userId=demo-abc-123` |
| `POST` | `/api/notes` | Create a new note | `{ title, content, userId }` |
| `PUT` | `/api/notes/:id` | Update a note by ID | `{ title, content }` |
| `DELETE` | `/api/notes/:id` | Delete a note by ID | - |

### Example Requests

#### Get all notes for a user
```bash
GET http://localhost:5000/api/notes?userId=demo-abc-123
```

#### Create a new note
```bash
POST http://localhost:5000/api/notes
Content-Type: application/json

{
  "title": "My First Note",
  "content": "This is the content of my note",
  "userId": "demo-abc-123"
}
```

#### Update a note
```bash
PUT http://localhost:5000/api/notes/65f1234567890abcdef12345
Content-Type: application/json

{
  "title": "Updated Title",
  "content": "Updated content"
}
```

#### Delete a note
```bash
DELETE http://localhost:5000/api/notes/65f1234567890abcdef12345
```

## 🐛 Known Issues & Fixes

### Issue 1: Path Alias Resolution Error
**Error:** `Failed to resolve import "@/lib/utils"`

**Fix:** Ensure `vite.config.js` has the path alias configured:

```javascript
import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  }
})
```

### Issue 2: Named vs Default Exports
**Error:** `The requested module does not provide an export named 'default'`

**Fix:** Import UI components as named exports:
```javascript
// ✅ Correct
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";

// ❌ Wrong
import Button from "./ui/button";
```

### Issue 3: Missing Slash in API URLs
**Error:** Update/Delete requests fail

**Fix:** Add missing slashes in `frontend/src/lib/api.js`:
```javascript
// Line 24 - Update endpoint
const res = await client.put(`/api/notes/${id}`, payload);

// Line 29 - Delete endpoint
const res = await client.delete(`/api/notes/${id}`);
```

### Issue 4: Wrong Request Parameter Type in Backend
**Error:** `GET /api/notes` returns no data or 500 error

**Fix:** Change `req.body` to `req.query` in `backend/src/routes/notes.js`:
```javascript
// Line 8
const { userId } = req.query;  // ✅ Correct
// NOT: const { userId } = req.body;  // ❌ Wrong
```

### Issue 5: Missing Error Handling
**Error:** Server crashes on database errors

**Fix:** Wrap all async route handlers in try-catch blocks:
```javascript
router.get("/", async (req, res) => {
    try {
        const { userId } = req.query;
        const filter = userId ? { userId } : {};
        const notes = await Note.find(filter).sort({ createdAt: -1});
        res.json(notes);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});
```

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is part of the PLP MERN Stack Development course.

## 👥 Authors

- PLP MERN Stack Development Team

## 🙏 Acknowledgments

- PLP Academy for the MERN Stack curriculum
- Radix UI for accessible component primitives
- Tailwind CSS for the utility-first CSS framework

---

**Happy Coding! 🚀**
