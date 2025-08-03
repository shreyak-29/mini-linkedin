"use client";
import useSWR from "swr";
import PostCard from "@/components/PostCard";
import Link from "next/link";
import { useUser } from "@/components/UserContext";

const fetcher = (url) => fetch(url).then((res) => res.json());

export default function HomePage() {
  const { user, loading } = useUser();

  const { data: posts, error, mutate } = useSWR("/api/posts/get", fetcher, {
    refreshInterval: 30000, // Refresh every 30 seconds
  });

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome to MiniLinkedIn</h1>
        <p className="text-gray-600">
          Connect with professionals and share your insights with the community.
        </p>
      </div>

      {user && (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
                <span className="text-white text-sm font-medium">
                  {user.name?.charAt(0).toUpperCase()}
                </span>
              </div>
              <div>
                <p className="text-sm text-gray-600">Share your thoughts</p>
                <p className="text-xs text-gray-500">What's on your mind?</p>
              </div>
            </div>
            <Link
              href="/create-post"
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium text-sm"
            >
              Create Post
            </Link>
          </div>
        </div>
      )}

      <div className="space-y-4">
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <p className="text-red-600">Failed to load posts. Please try again later.</p>
          </div>
        )}

        {!posts && !error && (
          <div className="flex items-center justify-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          </div>
        )}

        {posts && posts.length === 0 && (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No posts yet</h3>
            <p className="text-gray-500">
              {user 
                ? "Be the first to share something with the community!" 
                : "Login to start sharing posts with the community."
              }
            </p>
          </div>
        )}

        {posts && posts.length > 0 && (
          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Recent Posts</h2>
            {posts.map((post) => (
              <PostCard key={post._id} post={post} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
