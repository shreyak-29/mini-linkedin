
# 🚀 Mini LinkedIn – Professional Community Platform

A modern, LinkedIn-style community platform built with **Next.js 14**, featuring real-time post updates, hashtag discovery, user profiles, and professional networking capabilities.

### 🔗Deployed Link : https://mini-linkedin-taupe.vercel.app/

---

## 🛠️ Tech Stack

### 🔹 Frontend
- **Next.js 15.4.5** – React framework with App Router
- **React 19.1.0** – Latest React with concurrent features
- **Tailwind CSS 4.0** – Utility-first CSS framework
- **SWR** – Data fetching and caching
- **date-fns** – Lightweight date formatting utilities

### 🔹 Backend
- **Next.js API Routes** – Serverless API endpoints
- **MongoDB 8.17.0** – NoSQL database
- **Mongoose** – MongoDB object modeling
- **JWT** – Secure authentication
- **bcryptjs** – Password hashing

---

## 📋 Features

### 🔐 Authentication System
- User registration and login
- JWT-based authentication
- Persistent sessions via `localStorage`
- Protected routes for logged-in users

### 📝 Post Management
- Create professional text posts
- Real-time feed updates with SWR
- Optimistic UI for better UX
- Post cards with timestamps
- Click user profile from post

### 🏷️ Hashtag System
- Auto-extract hashtags from posts
- Clickable hashtags redirect to tag pages
- Case-insensitive matching
- Hashtag discovery with related posts

### 👤 Profile Management
- View and edit your profile
- Update bio
- View all your posts
- Clean, professional layout

### 💬 Like & Comment System
- Like and comment on posts
- Comments update instantly (SWR)
- Only authenticated users can interact
- Relative time shown on all comments

### 🎨 UI/UX Highlights
- Responsive layout for mobile and desktop
- Smooth animations and transitions
- Professional, modern color scheme
- Error and loading state handling

---

## 🚀 Setup Instructions

### 1. Clone the Repository
```bash
git clone https://github.com/shreyak-29/mini-linkedin
cd mini-linkedin
````

### 2. Install Dependencies

```bash
npm install
```

### 3. Environment Setup

Create a `.env.local` file in the root:

```env
# MongoDB
MONGODB_URI=mongodb://localhost:27017/mini-linkedin
# Or use MongoDB Atlas
# MONGODB_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/mini-linkedin

# JWT
JWT_SECRET=your-super-secure-jwt-secret-key
```

### 4. Run Development Server

```bash
npm run dev
```

### 5. Open Your Browser

Navigate to: [http://localhost:3000](http://localhost:3000)

---

## 👤 Demo Users

You can log in using these accounts:

| Name         | Email                                         | Password    |
| ------------ | --------------------------------------------- | ----------- |
| John Doe     | [john@example.com](mailto:john@example.com)   | password123 |
| Sarah Wilson | [sarah@example.com](mailto:sarah@example.com) | password123 |
| Mike Johnson | [mike@example.com](mailto:mike@example.com)   | password123 |

---

## 📱 Usage Guide

### Getting Started

1. Register or log in using demo credentials
2. Create a post using `#hashtags`
3. Click hashtags to explore related content
4. Update your profile and bio
5. Explore the community feed

### Creating Posts

* Use the **Create Post** button
* Add hashtags like `#career`, `#networking`
* Posts are auto-categorized by hashtags

### Discovering Content

* Click hashtags to explore
* Browse main feed
* Visit user profiles
* View posts filtered by hashtag

---

## 🔧 API Endpoints

### 🔐 Authentication

* `POST /api/auth/register` – Register new user
* `POST /api/auth/login` – User login
* `GET /api/auth/me` – Fetch current user

### 📝 Posts

* `GET /api/posts/get` – Get all posts
* `POST /api/posts/create` – Create a post
* `GET /api/posts/hashtag/[tag]` – Posts by hashtag

### 👤 Users

* `GET /api/users/[id]` – Get user posts
* `PATCH /api/users/[id]` – Update bio

---

## 🚀 Deployment

### ✅ Deploy on Vercel (Recommended)

1. **Push to GitHub**

```bash
git add .
git commit -m "Initial commit"
git push origin main
```

2. **Connect to Vercel**

   * Link your GitHub repo
   * Set the environment variables:

     ```env
     MONGODB_URI=your-production-uri
     JWT_SECRET=your-production-jwt
     ```

3. **Deploy**

   * Vercel will handle build & deployment automatically

---

## 🛠 Development Commands

```bash
# Install dependencies
npm install

# Run dev server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Linting
npm run lint
```

---

## 🐛 Troubleshooting

### Common Issues

1. **Schema not registered**

   * MongoDB may not be running
   * Check your `.env` config
   * Restart the dev server

2. **Hashtags not working**

   * Make sure posts include hashtags
   * Verify hashtag route is functional

3. **Login fails**

   * Ensure `JWT_SECRET` is valid
   * Clear `localStorage` and try again

---



**⭐ Star this repo if you like the project!**
**✅ Ready for deployment.**

```



