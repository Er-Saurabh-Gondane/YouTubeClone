# 📺 YouTube Clone – Assignment Project

This is a **YouTube-style video platform** built as an assignment project.  
The goal of the project is to practice **full-stack development** using **MERN** concepts:

- Building REST APIs with **Node.js & Express**
- Using **MongoDB + Mongoose** for data modeling
- Implementing **JWT-based authentication**
- Creating a **React** frontend to list and play videos

> ⚠️ Note: This project is **not fully completed**.  
> Backend core features are implemented and tested.  
> Frontend does **not yet include Registration/Login pages** – only basic video browsing and viewing is built.

---
git clone https://github.com/Er-Saurabh-Gondane/YouTubeClone.git

## ✨ Features

### ✅ Backend (Completed / Tested)

- **User Authentication**
  - Register new users
  - Login with email & password
  - Password hashing using **bcrypt**
  - JWT-based auth using **HTTP headers** (e.g. `Authorization: Bearer <token>`)

- **Channel Management**
  - Create a channel for a logged-in user
  - Each channel has:
    - `name`, `description`, `bannerImage`
    - `owner` (user reference)
    - `subscribersCount`, `totalVideos`
  - Channel linked to `User` collection

- **Video Management**
  - Upload/save video metadata:
    - `title`, `description`
    - `videoUrl`, `thumbnailUrl`
    - `channelId`, `uploader`
  - Store likes count, views count, tags, etc. (as per schema)
  - Get:
    - All videos
    - Single video by ID
    - Videos by channel

- **Comments System**
  - Add comment on a video
  - Fetch comments for a specific video
  - Each comment:
    - Linked to `videoId`
    - Linked to `userId`
    - Timestamps for created/updated

- **Protected Routes**
  - Middleware to protect routes using JWT
  - Only authenticated users can:
    - Create channels
    - Upload videos
    - Add comments, etc.

- **Database Seeding (Optional)**
  - Seed script to insert sample data for:
    - Users
    - Channels
    - Videos
    - Comments

---

### ✅ Frontend (Partially Completed)

Built with **React** (and related libraries).

Currently implemented:

- **Home Page**
  - Fetches videos from backend API
  - Renders video cards in a responsive grid/list
  - Basic category/filter support (like “New”, “Gaming”, etc. – depending on implementation)

- **Video Playing Page**
  - Uses `ReactPlayer` to play videos from YouTube URL or stored URL  
    `https://www.youtube.com/watch?v=:id`
  - Shows the selected video in a player
  - Basic layout for future:
    - Video title, meta info
    - Placeholder for channel info and comments
    - Side section for **related/suggested videos**



> Not yet implemented on frontend:
> - Registration page UI
> - Login page UI
> - Showing different UI for logged-in vs guest
> - Subscribing to channels from UI
> - Liking videos/comments from UI

---

## 🛠️ Tech Stack

### Backend

- **Node.js**
- **Express.js**
- **MongoDB** & **Mongoose**
- **JWT** for authentication
- **bcrypt** for password hashing
- **dotenv** for environment variables

### Frontend

- **React**
- **React Router**
- **React Player**
- **Context API / Redux** (depending on final implementation)
- **Tailwind CSS / CSS modules** (depending on styling choice)
- **Fetch / Axios** for API calls

---

