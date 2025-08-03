import { connectDB } from "@/lib/db";
import { Post } from "@/models";

export async function GET() {
  await connectDB();
  const posts = await Post.find()
    .populate("author", "name")
    .populate("likes", "name")
    .populate("comments.userId", "name")
    .sort({ createdAt: -1 });
  return new Response(JSON.stringify(posts), { status: 200 });
}
