import { connectDB } from "@/lib/db";
import { User } from "@/models";
import bcrypt from "bcryptjs";
import { createToken } from "@/lib/auth";

export async function POST(req) {
  try {
    const { email, password } = await req.json();
    await connectDB();

    const user = await User.findOne({ email });
    if (!user) throw new Error("User not found");

    const match = await bcrypt.compare(password, user.password);
    if (!match) throw new Error("Invalid password");

    const token = createToken(user);
    return new Response(JSON.stringify({ token, user }), { status: 200 });
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), { status: 400 });
  }
}
