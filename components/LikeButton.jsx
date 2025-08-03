"use client";
import { useState } from "react";
import { useUser } from "./UserContext";

export default function LikeButton({ post, onLikeUpdate }) {
  const { user } = useUser();
  const [isLiking, setIsLiking] = useState(false);
  const [likeCount, setLikeCount] = useState(post.likes?.length || 0);
  const [isLiked, setIsLiked] = useState(
    user ? post.likes?.some(like => like._id === user._id || like === user._id) : false
  );

  const handleLike = async () => {
    if (!user) return;

    setIsLiking(true);
    try {
      const token = localStorage.getItem("token");
      const response = await fetch("/api/posts/like", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ postId: post._id }),
      });

      const data = await response.json();

      if (response.ok) {
        setIsLiked(data.isLiked);
        setLikeCount(data.likeCount);
        if (onLikeUpdate) {
          onLikeUpdate(data.post);
        }
      }
    } catch (error) {
      console.error("Error liking post:", error);
    } finally {
      setIsLiking(false);
    }
  };

  const getLikeText = () => {
    if (!user) return `${likeCount} like${likeCount !== 1 ? 's' : ''}`;
    
    if (likeCount === 0) return "Like";
    if (likeCount === 1 && isLiked) return "You liked this";
    if (likeCount === 1) return "1 like";
    if (isLiked) return `You and ${likeCount - 1} other${likeCount - 1 !== 1 ? 's' : ''} liked this`;
    return `${likeCount} like${likeCount !== 1 ? 's' : ''}`;
  };

  return (
<button 
  onClick={handleLike}
  disabled={isLiking || !user}
  className={`flex items-center space-x-1 text-gray-500 hover:text-blue-600 transition-colors ${
    isLiked ? 'text-blue-600' : ''
  } ${!user ? 'cursor-not-allowed opacity-50' : ''}`}
>
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      strokeWidth={2} 
      d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" 
    />
  </svg>
  <span className="text-xs">{getLikeText()}</span>
</button>


  );
} 