import { formatDistanceToNow } from "date-fns";
import Link from "next/link";
import LikeButton from "./LikeButton";
import CommentSection from "./CommentSection";

export default function PostCard({ post, onPostUpdate }) {
  // Function to render text with clickable hashtags
  const renderTextWithHashtags = (text) => {
    if (!text) return "";
    
    const hashtagRegex = /(#[\w\u0590-\u05ff]+)/g;
    const parts = text.split(hashtagRegex);
    
    return parts.map((part, index) => {
      if (part.match(hashtagRegex)) {
        return (
          <Link
            key={index}
            href={`/hashtag/${part.slice(1)}`}
            className="text-blue-600 hover:text-blue-800 font-medium transition-colors"
          >
            {part}
          </Link>
        );
      }
      return part;
    });
  };

  const handlePostUpdate = (updatedPost) => {
    if (onPostUpdate) {
      onPostUpdate(updatedPost);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-4 hover:shadow-md transition-shadow">
      <div className="flex items-start space-x-3">
        <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
          <span className="text-white text-sm font-medium">
            {post.author?.name?.charAt(0).toUpperCase() || "U"}
          </span>
        </div>
        
        <div className="flex-1 min-w-0">
          <div className="flex items-center space-x-2 mb-2">
            <Link
              href={`/profile/${post.author?._id}`}
              className="text-sm font-semibold text-gray-900 hover:text-blue-600 transition-colors"
            >
              {post.author?.name || "Unknown User"}
            </Link>
            <span className="text-gray-400">•</span>
            <span className="text-xs text-gray-500">
              {formatDistanceToNow(new Date(post.createdAt), { addSuffix: true })}
            </span>
          </div>
          
          <div className="text-gray-800 leading-relaxed mb-3">
            {renderTextWithHashtags(post.text)}
          </div>

          {post.hashtags && post.hashtags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-4">
              {post.hashtags.map((hashtag, index) => (
                <Link
                  key={index}
                  href={`/hashtag/${hashtag.slice(1)}`}
                  className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 hover:bg-blue-200 transition-colors"
                >
                  {hashtag}
                </Link>
              ))}
            </div>
          )}
          
          <div className="flex items-center space-x-4 pt-4 border-t border-gray-100">
            <LikeButton post={post} onLikeUpdate={handlePostUpdate} />
            <CommentSection post={post} onCommentUpdate={handlePostUpdate} />
            
            <button className="flex items-center space-x-1 text-gray-500 hover:text-blue-600 transition-colors">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
              </svg>
              <span className="text-xs">Share</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
