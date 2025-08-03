# Mini LinkedIn - Professional Community Platform

A modern, LinkedIn-style community platform built with Next.js 14, Tailwind CSS, and MongoDB. This project demonstrates a full-stack application with user authentication, real-time posts, and professional UI/UX.

## 🚀 Features

### Core Functionality
- **User Authentication**: Secure login/register with JWT tokens
- **Persistent Sessions**: Users stay logged in using localStorage
- **Real-time Posts**: Create and view posts with instant updates
- **Professional UI**: Clean, modern LinkedIn-inspired design
- **Mobile Responsive**: Works perfectly on all devices

### User Experience
- **Profile Management**: View and edit your profile with bio
- **Post Creation**: Rich text posts with professional styling
- **Feed System**: Real-time post feed with SWR for optimal performance
- **Error Handling**: Friendly error and success messages
- **Loading States**: Smooth loading animations and empty states

### Technical Features
- **Next.js 14 App Router**: Latest Next.js features and best practices
- **Tailwind CSS**: Modern, utility-first styling
- **MongoDB**: Scalable database with Mongoose ODM
- **SWR**: Optimistic updates and real-time data fetching
- **JWT Authentication**: Secure token-based authentication
- **Date Formatting**: Professional timestamps with date-fns

## 🛠️ Tech Stack

- **Frontend**: Next.js 14, React 19, Tailwind CSS
- **Backend**: Next.js API Routes, MongoDB, Mongoose
- **Authentication**: JWT, bcryptjs
- **Data Fetching**: SWR
- **Date Handling**: date-fns
- **Deployment**: Vercel-ready

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd mini-linkedin
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   Create a `.env.local` file in the root directory:
   ```env
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret_key
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🗄️ Database Setup

1. **MongoDB Atlas** (Recommended)
   - Create a free MongoDB Atlas account
   - Create a new cluster
   - Get your connection string
   - Add it to your `.env.local` file

2. **Local MongoDB** (Alternative)
   - Install MongoDB locally
   - Use connection string: `mongodb://localhost:27017/mini-linkedin`

## 🚀 Deployment

### Vercel (Recommended)

1. **Push to GitHub**
   ```bash
   git add .
   git commit -m "Initial commit"
   git push origin main
   ```

2. **Deploy to Vercel**
   - Connect your GitHub repository to Vercel
   - Add environment variables in Vercel dashboard
   - Deploy automatically

### Environment Variables for Production
- `MONGODB_URI`: Your MongoDB connection string
- `JWT_SECRET`: A secure random string for JWT signing

## 📱 Features Overview

### Authentication
- Secure user registration and login
- JWT token-based authentication
- Persistent sessions with localStorage
- Protected routes for authenticated users

### Posts System
- Create professional text posts
- Real-time feed updates
- Optimistic UI updates
- Professional post cards with timestamps

### Profile Management
- View and edit personal profile
- Bio editing functionality
- View all user posts
- Professional profile layout

### UI/UX
- Clean, modern LinkedIn-inspired design
- Mobile-responsive layout
- Loading states and empty states
- Professional color scheme and typography

## 🏗️ Project Structure

```
mini-linkedin/
├── app/                    # Next.js 14 App Router
│   ├── api/               # API routes
│   │   ├── auth/          # Authentication endpoints
│   │   ├── posts/         # Post management
│   │   └── users/         # User management
│   ├── login/             # Login page
│   ├── register/          # Register page
│   ├── profile/           # Profile page
│   └── layout.js          # Root layout
├── components/            # Reusable components
│   ├── Navbar.jsx         # Navigation component
│   ├── PostCard.jsx       # Post display component
│   └── PostForm.jsx       # Post creation form
├── lib/                   # Utility functions
│   ├── auth.js           # JWT authentication
│   └── db.js             # Database connection
├── models/               # Mongoose models
│   ├── User.js          # User model
│   └── Post.js          # Post model
└── public/              # Static assets
```

## 🔧 API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `GET /api/auth/me` - Get current user

### Posts
- `GET /api/posts/get` - Get all posts
- `POST /api/posts/create` - Create new post

### Users
- `GET /api/users/[id]` - Get user posts
- `PATCH /api/users/[id]` - Update user bio

## 🎨 Customization

### Styling
- Modify `app/globals.css` for global styles
- Update Tailwind classes in components
- Customize color scheme in `tailwind.config.js`

### Features
- Add new post types (images, links)
- Implement comments system
- Add user following functionality
- Create search functionality

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🙏 Acknowledgments

- Built with Next.js 14 and Tailwind CSS
- Inspired by LinkedIn's professional design
- Uses modern React patterns and best practices

---

**Ready to deploy!** This project is fully configured for Vercel deployment and includes all necessary optimizations for production use.
