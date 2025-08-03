import { connectDB } from "@/lib/db";
import { User, Post } from "@/models";

export async function GET() {
  try {
    await connectDB();
    
    // Test if models are registered
    const userCount = await User.countDocuments();
    const postCount = await Post.countDocuments();
    
    return new Response(JSON.stringify({ 
      message: "Models are working",
      userCount,
      postCount,
      models: {
        User: !!User,
        Post: !!Post
      }
    }), { status: 200 });
  } catch (err) {
    return new Response(JSON.stringify({ 
      error: err.message,
      stack: err.stack 
    }), { status: 500 });
  }
} 