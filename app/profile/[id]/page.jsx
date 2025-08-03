"use client";
import { useEffect, useState } from "react";
import { use } from "react";
import useSWR from "swr";
import PostCard from "@/components/PostCard";
import Link from "next/link";
import { formatDistanceToNow } from "date-fns";

const fetcher = (url) => fetch(url).then((res) => res.json());

export default function PublicProfilePage({ params }) {
  const { id } = use(params);
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  const { data: userPosts, error: postsError } = useSWR(
    `/api/users/${id}`,
    fetcher
  );

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch(`/api/users/profile/${id}`);
        const data = await response.json();
        
        if (response.ok) {
          setUser(data.user);
        } else {
          setError(data.error || "Failed to load user profile");
        }
      } catch (err) {
        setError("Network error. Please try again.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchUser();
  }, [id]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-4xl mx-auto">
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <p className="text-red-600">{error}</p>
          <Link href="/" className="text-blue-600 hover:text-blue-700 mt-2 inline-block">
            ← Back to Home
          </Link>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="max-w-4xl mx-auto">
        <div className="text-center py-12">
          <h3 className="text-lg font-medium text-gray-900 mb-2">User not found</h3>
          <Link href="/" className="text-blue-600 hover:text-blue-700">
            ← Back to Home
          </Link>
        </div>
      </div>
    );
  }

  // Calculate total likes received
  const totalLikes = userPosts?.reduce((total, post) => total + (post.likes?.length || 0), 0) || 0;
  const totalPosts = userPosts?.length || 0;

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-6">
        <Link
          href="/"
          className="text-blue-600 hover:text-blue-700 transition-colors mb-4 inline-block"
        >
          ← Back to Home
        </Link>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
        <div className="flex items-start space-x-4">
          <div className="w-20 h-20 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
            <span className="text-white text-2xl font-bold">
              {user.name?.charAt(0).toUpperCase()}
            </span>
          </div>
          
          <div className="flex-1 min-w-0">
            <h1 className="text-2xl font-bold text-gray-900 mb-2">{user.name}</h1>
            <p className="text-gray-600 mb-4">{user.email}</p>
            
            {user.bio && (
              <p className="text-gray-700 mb-4">{user.bio}</p>
            )}

            <div className="flex items-center space-x-6 text-sm text-gray-600">
              <div>
                <span className="font-semibold">{totalPosts}</span> posts
              </div>
              <div>
                <span className="font-semibold">{totalLikes}</span> total likes received
              </div>
              {/* <div>
                Member since {formatDistanceToNow(new Date(user.createdAt), { addSuffix: true })}
              </div> */}
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">
          Posts by {user.name}
        </h2>
        
        {postsError && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <p className="text-red-600">Failed to load posts. Please try again later.</p>
          </div>
        )}

        {!userPosts && !postsError && (
          <div className="flex items-center justify-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          </div>
        )}

        {userPosts && userPosts.length === 0 && (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No posts yet</h3>
            <p className="text-gray-500">This user hasn't shared any posts yet.</p>
          </div>
        )}

        {userPosts && userPosts.length > 0 && (
          <div className="space-y-4">
            {userPosts.map((post) => (
              <PostCard key={post._id} post={post} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
} 