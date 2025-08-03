import { connectDB } from "@/lib/db";
import { Post, User } from "@/models";
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

    const { postId, text } = await req.json();
    
    if (!postId || !text || !text.trim()) {
      return new Response(JSON.stringify({ error: "Post ID and comment text are required" }), { status: 400 });
    }

    await connectDB();
    
    // Get user information
    const user = await User.findById(decoded.id).select("name");
    if (!user) {
      return new Response(JSON.stringify({ error: "User not found" }), { status: 404 });
    }

    const post = await Post.findById(postId);
    if (!post) {
      return new Response(JSON.stringify({ error: "Post not found" }), { status: 404 });
    }

    // Add comment to the post
    const newComment = {
      userId: decoded.id,
      name: user.name,
      text: text.trim(),
      createdAt: new Date()
    };

    post.comments.push(newComment);
    await post.save();

    // Populate author information for the response
    const populatedPost = await Post.findById(postId)
      .populate("author", "name")
      .populate("comments.userId", "name");

    return new Response(JSON.stringify({ 
      post: populatedPost,
      comment: newComment
    }), { status: 200 });
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), { status: 500 });
  }
} 