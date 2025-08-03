import mongoose from "mongoose";

const CommentSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  name: { type: String, required: true },
  text: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

const PostSchema = new mongoose.Schema({
  text: { type: String, required: true },
  author: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  hashtags: [{ type: String }],
  likes: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  comments: [CommentSchema],
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

// Virtual for like count
PostSchema.virtual('likeCount').get(function() {
  return this.likes.length;
});

// Virtual for comment count
PostSchema.virtual('commentCount').get(function() {
  return this.comments.length;
});

// Ensure the model is only created once
const Post = mongoose.models.Post || mongoose.model("Post", PostSchema);

export default Post;
