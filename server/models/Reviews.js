import mongoose from "mongoose";

const reviewSchema = mongoose.Schema({
  commentUser: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  userName: {
    type: String,
    required: true,
  },
  docUserName: {
    type: String,
    required: true,
  },
  ratingValue: {
    type: Number,
    required: true,
  },
  text: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

export const ReviewsModel = mongoose.model("Reviews", reviewSchema);
