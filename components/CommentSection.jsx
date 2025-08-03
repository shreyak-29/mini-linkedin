"use client";
import { useState, useEffect } from "react";
import { useUser } from "./UserContext";
import { formatDistanceToNow } from "date-fns";

export default function CommentSection({ post, onCommentUpdate }) {
  const { user } = useUser();
  const [commentText, setCommentText] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showComments, setShowComments] = useState(false);
  const [forceUpdate, setForceUpdate] = useState(0);

  // Force re-render when post changes
  useEffect(() => {
    setForceUpdate(prev => prev + 1);
  }, [post.comments?.length]);

  const handleSubmitComment = async (e) => {
    e.preventDefault();
    if (!commentText.trim() || !user) return;

    setIsSubmitting(true);
    try {
      const token = localStorage.getItem("token");
      const response = await fetch("/api/posts/comment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ 
          postId: post._id, 
          text: commentText 
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setCommentText("");
        setForceUpdate(prev => prev + 1); // Force re-render
        if (onCommentUpdate) {
          onCommentUpdate(data.post);
        }
      }
    } catch (error) {
      console.error("Error adding comment:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const commentCount = post.comments?.length || 0;

  return (
    <>
      {/* Comment Button */}
      <button
        onClick={() => setShowComments(!showComments)}
        className="flex items-center space-x-1 text-gray-500 hover:text-blue-600 transition-colors"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth={2} 
            d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
          />
        </svg>
        <span className="text-xs">
          {commentCount} comment{commentCount !== 1 ? 's' : ''}
        </span>
      </button>

      {/* Comments Section */}
      {showComments && (
        <div className="mt-3 space-y-3 col-span-full">
          {/* Add Comment Form */}
          {user && (
            <div className="border-b border-gray-200 pb-3 mb-3">
              <form onSubmit={handleSubmitComment} className="flex space-x-2">
                <input
                  type="text"
                  value={commentText}
                  onChange={(e) => setCommentText(e.target.value)}
                  placeholder="Write a comment..."
                  className="flex-1 px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  disabled={isSubmitting}
                />
                <button
                  type="submit"
                  disabled={isSubmitting || !commentText.trim()}
                  className="px-4 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 transition-colors"
                >
                  {isSubmitting ? "..." : "Comment"}
                </button>
              </form>
            </div>
          )}

          {/* Comments List */}
          <div className="space-y-2">
            {post.comments && post.comments.length > 0 ? (
              post.comments
                .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
                .map((comment, index) => {
                  // Create a more stable key using timestamp and content
                  const commentKey = `${comment.userId}-${comment.createdAt}-${comment.text.substring(0, 10)}-${forceUpdate}`;
                  return (
                  <div key={commentKey} className="flex space-x-3 p-3 bg-gray-50 rounded-lg">
                    <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-white text-xs font-medium">
                        {comment.name?.charAt(0).toUpperCase()}
                      </span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center space-x-2 mb-1">
                        <span className="text-sm font-medium text-gray-900">
                          {comment.name}
                        </span>
                        <span className="text-xs text-gray-500">
                          {formatDistanceToNow(new Date(comment.createdAt), { addSuffix: true })}
                        </span>
                      </div>
                      <p className="text-sm text-gray-800 break-words">{comment.text}</p>
                    </div>
                  </div>
                )})
            ) : (
              <p className="text-sm text-gray-500 text-center py-2">
                No comments yet. Be the first to comment!
              </p>
            )}
          </div>
        </div>
      )}
    </>
  );
} 