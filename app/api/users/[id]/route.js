import { connectDB } from "@/lib/db";
import { User, Post } from "@/models";
import { verifyToken } from "@/lib/auth";

export async function GET(req, { params }) {
  try {
    const { id } = params;
    await connectDB();
    
    const posts = await Post.find({ author: id })
      .populate("author", "name")
      .sort({ createdAt: -1 });
    
    return new Response(JSON.stringify(posts), { status: 200 });
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), { status: 500 });
  }
}

export async function PATCH(req, { params }) {
  try {
    const { id } = params;
    const authHeader = req.headers.get("authorization");
    
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return new Response(JSON.stringify({ error: "No token provided" }), { status: 401 });
    }

    const token = authHeader.substring(7);
    const decoded = verifyToken(token);
    
    if (!decoded) {
      return new Response(JSON.stringify({ error: "Invalid token" }), { status: 401 });
    }

    // Only allow users to update their own profile
    if (decoded.id !== id) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 403 });
    }

    const { bio } = await req.json();
    await connectDB();
    
    const updatedUser = await User.findByIdAndUpdate(
      id,
      { bio },
      { new: true, select: "-password" }
    );
    
    if (!updatedUser) {
      return new Response(JSON.stringify({ error: "User not found" }), { status: 404 });
    }

    return new Response(JSON.stringify({ user: updatedUser }), { status: 200 });
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), { status: 500 });
  }
}
