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
      <span className="text-lg">
        {isLiked ? '👍' : '👍'}
      </span>
      <span className="text-xs">{getLikeText()}</span>
    </button>
  );
} 