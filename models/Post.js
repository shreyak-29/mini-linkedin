import mongoose from "mongoose";

const PostSchema = new mongoose.Schema({
  text: String,
  author: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  hashtags: [{ type: String }],
  createdAt: { type: Date, default: Date.now }
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

export default mongoose.models.Post || mongoose.model("Post", PostSchema);
