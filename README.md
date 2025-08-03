# 🚀 Mini LinkedIn - Professional Community Platform

A modern, LinkedIn-style community platform built with Next.js 14, featuring real-time posts, hashtag discovery, and professional networking capabilities.

## 🛠️ Tech Stack

### **Frontend**
- **Next.js 15.4.5** - React framework with App Router
- **React 19.1.0** - Latest React with concurrent features
- **Tailwind CSS 4.0** - Utility-first CSS framework
- **SWR** - Data fetching and caching
- **date-fns** - Date formatting utilities

### **Backend**
- **Next.js API Routes** - Serverless API endpoints
- **MongoDB 8.17.0** - NoSQL database
- **Mongoose** - MongoDB object modeling
- **JWT** - JSON Web Token authentication
- **bcryptjs** - Password hashing

## 📋 Features

### 🔐 **Authentication System**
- User registration and login
- JWT token-based authentication
- Persistent sessions with localStorage
- Protected routes for authenticated users

### 📝 **Post Management**
- Create professional text posts
- Real-time feed updates with SWR
- Optimistic UI updates
- Professional post cards with timestamps

### 🏷️ **Hashtag System**
- Automatic hashtag extraction from post text
- Clickable hashtags that link to hashtag pages
- Hashtag discovery pages showing related posts
- Case-insensitive hashtag matching

### 👤 **Profile Management**
- View and edit personal profile
- Bio editing functionality
- View all user posts
- Professional profile layout

## 🚀 Setup Instructions

### **1. Clone the Repository**
```bash
git clone <your-repo-url>
cd mini-linkedin
```

### **2. Install Dependencies**
```bash
npm install
```

### **3. Environment Setup**
Create a `.env.local` file in the root directory:

```env
# MongoDB Connection String
MONGODB_URI=mongodb://localhost:27017/mini-linkedin
# or for MongoDB Atlas:
# MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/mini-linkedin

# JWT Secret (generate a secure random string)
JWT_SECRET=your-super-secret-jwt-key-here
```

### **4. Run Development Server**
```bash
npm run dev
```

### **5. Open Your Browser**
Navigate to [http://localhost:3000](http://localhost:3000)

## 👥 Demo Users

You can create demo users or use these test accounts:

### **Demo User 1**
- **Email**: `john@example.com`
- **Password**: `password123`
- **Name**: John Doe

### **Demo User 2**
- **Email**: `sarah@example.com`
- **Password**: `password123`
- **Name**: Sarah Wilson

### **Demo User 3**
- **Email**: `mike@example.com`
- **Password**: `password123`
- **Name**: Mike Johnson

## 📱 Usage Guide

### **Getting Started**
1. **Register** a new account or **login** with demo credentials
2. **Create posts** with hashtags like `#technology`, `#career`, `#networking`
3. **Click on hashtags** to discover related posts
4. **Edit your profile** and bio
5. **Explore the community** feed

### **Creating Posts**
- Use the "Create Post" button in the navbar
- Write your thoughts in the text area
- Add hashtags with `#` symbol (e.g., `#technology #career`)
- Posts are automatically categorized by hashtags

### **Discovering Content**
- Click any hashtag in posts to see related content
- Browse the main feed for all posts
- Visit user profiles to see their posts
- Use hashtag pages to find specific topics

## 🔧 API Endpoints

### **Authentication**
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `GET /api/auth/me` - Get current user

### **Posts**
- `GET /api/posts/get` - Get all posts
- `POST /api/posts/create` - Create new post
- `GET /api/posts/hashtag/[tag]` - Get posts by hashtag

### **Users**
- `GET /api/users/[id]` - Get user posts
- `PATCH /api/users/[id]` - Update user bio

## 🚀 Deployment

### **Vercel (Recommended)**

1. **Push to GitHub**
   ```bash
   git add .
   git commit -m "Initial commit"
   git push origin main
   ```

2. **Deploy to Vercel**
   - Connect your GitHub repository to Vercel
   - Add environment variables in Vercel dashboard:
     - `MONGODB_URI`: Your MongoDB connection string
     - `JWT_SECRET`: Your secure JWT secret
   - Deploy automatically

### **Environment Variables for Production**
```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/mini-linkedin
JWT_SECRET=your-super-secure-jwt-secret-key
```

## 🎨 Extra Features

### **UI/UX Features**
- Clean, modern LinkedIn-inspired design
- Mobile-responsive layout
- Loading states and empty states
- Professional color scheme and typography
- Smooth animations and transitions
- Error handling with user-friendly messages

### **Technical Features**
- Global state management with UserContext
- Optimistic UI updates
- Real-time data fetching with SWR
- Automatic hashtag extraction
- Professional timestamp formatting
- Secure authentication system

## 🐛 Troubleshooting

### **Common Issues**

1. **"Schema hasn't been registered" Error**
   - Ensure MongoDB is running
   - Check your `MONGODB_URI` environment variable
   - Restart the development server

2. **Hashtags not working**
   - Check that posts contain hashtags with `#` symbol
   - Verify the hashtag API route is working
   - Clear browser cache

3. **Authentication issues**
   - Check JWT_SECRET environment variable
   - Clear localStorage and try logging in again
   - Verify API routes are working

### **Development Commands**
```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run linting
npm run lint
```



---

**⭐ Star this repository if you found it helpful!**

**Ready to deploy!** This project is fully configured for Vercel deployment and includes all necessary optimizations for production use.
