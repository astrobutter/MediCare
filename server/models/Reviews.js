import mongoose from "mongoose";

const reviewSchema = mongoose.Schema({
  user: {
    type: String,
    required: true,
  },
  doc: {
    type: String,
    required: true,
  },
  rating: {
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
