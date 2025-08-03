import { formatDistanceToNow } from "date-fns";
import Link from "next/link";

export default function PostCard({ post }) {
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
            <h3 className="text-sm font-semibold text-gray-900">
              {post.author?.name || "Unknown User"}
            </h3>
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
            <button className="flex items-center space-x-1 text-gray-500 hover:text-blue-600 transition-colors">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
              </svg>
              <span className="text-xs">Like</span>
            </button>
            
            <button className="flex items-center space-x-1 text-gray-500 hover:text-blue-600 transition-colors">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
              <span className="text-xs">Comment</span>
            </button>
            
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
