"use client";
import { useRouter } from "next/navigation";
import PostForm from "@/components/PostForm";
import { useUser } from "@/components/UserContext";

export default function CreatePostPage() {
  const { user, loading } = useUser();
  const router = useRouter();

  const handlePostCreated = (newPost) => {
    // Redirect to home page after successful post creation
    router.push("/");
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!user) {
    router.push("/login");
    return null;
  }

  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Create a Post</h1>
        <p className="text-gray-600">
          Share your thoughts, insights, or experiences with the community.
        </p>
      </div>

      <PostForm onPostCreated={handlePostCreated} />
    </div>
  );
} 