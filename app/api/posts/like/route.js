import { connectDB } from "@/lib/db";
import { Post } from "@/models";
import { verifyToken } from "@/lib/auth";

export async function POST(req) {
  try {
    const authHeader = req.headers.get("authorization");
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return new Response(JSON.stringify({ error: "No token provided" }), { status: 401 });
    }

    const token = authHeader.substring(7);
    const decoded = verifyToken(token);
    
    if (!decoded) {
      return new Response(JSON.stringify({ error: "Invalid token" }), { status: 401 });
    }

    const { postId } = await req.json();
    
    if (!postId) {
      return new Response(JSON.stringify({ error: "Post ID is required" }), { status: 400 });
    }

    await connectDB();
    
    const post = await Post.findById(postId);
    if (!post) {
      return new Response(JSON.stringify({ error: "Post not found" }), { status: 404 });
    }

    const userId = decoded.id;
    const isLiked = post.likes.includes(userId);

    if (isLiked) {
      // Unlike the post
      post.likes = post.likes.filter(id => id.toString() !== userId);
    } else {
      // Like the post
      post.likes.push(userId);
    }

    await post.save();

    // Populate author information for the response
    const populatedPost = await Post.findById(postId)
      .populate("author", "name")
      .populate("comments.userId", "name");

    return new Response(JSON.stringify({ 
      post: populatedPost,
      isLiked: !isLiked,
      likeCount: populatedPost.likes.length
    }), { status: 200 });
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), { status: 500 });
  }
} 