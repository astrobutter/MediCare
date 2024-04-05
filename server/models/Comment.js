import mongoose from "mongoose";

const commentSchema = mongoose.Schema({
  commentUser: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  slug: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  name:{
    type: String,
    required: true,
  }
});

export const CommentsModel = mongoose.model("Comments", commentSchema);
