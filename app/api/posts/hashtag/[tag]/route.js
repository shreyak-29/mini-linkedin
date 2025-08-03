import { connectDB } from "@/lib/db";
import { Post } from "@/models";

export async function GET(req, { params }) {
  try {
    const { tag } = params;
    await connectDB();
    
    // Find posts that contain the hashtag (case-insensitive)
    // The hashtag in the database includes the # symbol
    const hashtagToSearch = `#${tag}`;
    
    const posts = await Post.find({
      hashtags: { $regex: `^${hashtagToSearch}$`, $options: 'i' }
    })
      .populate("author", "name")
      .sort({ createdAt: -1 });
    
    return new Response(JSON.stringify(posts), { status: 200 });
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), { status: 500 });
  }
} 