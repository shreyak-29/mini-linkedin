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

    const { text } = await req.json();
    
    if (!text || !text.trim()) {
      return new Response(JSON.stringify({ error: "Post content is required" }), { status: 400 });
    }

    await connectDB();
    const post = await Post.create({ 
      text: text.trim(), 
      author: decoded.id 
    });

    // Populate author information
    const populatedPost = await Post.findById(post._id).populate("author", "name");

    return new Response(JSON.stringify({ post: populatedPost }), { status: 201 });
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), { status: 500 });
  }
}
