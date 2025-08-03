import { connectDB } from "@/lib/db";
import { User } from "@/models";

export async function GET(req, { params }) {
  try {
    const { id } = params;
    await connectDB();
    
    const user = await User.findById(id).select("name email bio createdAt");
    
    if (!user) {
      return new Response(JSON.stringify({ error: "User not found" }), { status: 404 });
    }

    return new Response(JSON.stringify({ user }), { status: 200 });
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), { status: 500 });
  }
} 