"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useUser } from "./UserContext";

export default function Navbar() {
  const { user, loading, logout } = useUser();
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.push("/");
  };

  if (loading) {
    return (
      <nav className="bg-white shadow-sm border-b border-gray-200">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Link href="/" className="text-2xl font-bold text-blue-600">
                MiniLinkedIn
              </Link>
            </div>
            <div className="animate-pulse bg-gray-200 h-8 w-32 rounded"></div>
          </div>
        </div>
      </nav>
    );
  }

  return (
    <nav className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link href="/" className="text-2xl font-bold text-blue-600 hover:text-blue-700 transition-colors">
              MiniLinkedIn
            </Link>
          </div>
          
          <div className="flex items-center space-x-6">
            {user ? (
              <>
                <Link 
                  href="/" 
                  className="text-gray-700 hover:text-blue-600 transition-colors font-medium"
                >
                  Home
                </Link>
                <Link 
                  href="/create-post" 
                  className="text-gray-700 hover:text-blue-600 transition-colors font-medium"
                >
                  Create Post
                </Link>
                <Link 
                  href="/profile" 
                  className="text-gray-700 hover:text-blue-600 transition-colors font-medium"
                >
                  My Profile
                </Link>
                <button
                  onClick={handleLogout}
                  className="text-gray-700 hover:text-red-600 transition-colors font-medium"
                >
                  Logout
                </button>
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                    <span className="text-white text-sm font-medium">
                      {user.name?.charAt(0).toUpperCase()}
                    </span>
                  </div>
                  <span className="text-sm text-gray-700 font-medium hidden md:block">
                    {user.name}
                  </span>
                </div>
              </>
            ) : (
              <>
                <Link 
                  href="/login" 
                  className="text-gray-700 hover:text-blue-600 transition-colors font-medium"
                >
                  Login
                </Link>
                <Link 
                  href="/register" 
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium"
                >
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
