import mongoose from "mongoose";

const PostSchema = new mongoose.Schema({
  text: { type: String, required: true },
  author: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  hashtags: [{ type: String }],
  createdAt: { type: Date, default: Date.now }
}, {
  timestamps: true
});

// Pre-save middleware to extract hashtags from text
PostSchema.pre('save', function(next) {
  if (this.text) {
    // Extract hashtags from text (words starting with #)
    const hashtagRegex = /#[\w\u0590-\u05ff]+/g;
    const hashtags = this.text.match(hashtagRegex);
    this.hashtags = hashtags ? hashtags.map(tag => tag.toLowerCase()) : [];
  }
  next();
});

// Ensure the model is only created once
const Post = mongoose.models.Post || mongoose.model("Post", PostSchema);

export default Post;
