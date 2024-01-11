import mongoose from "mongoose";
const postSchema = mongoose.Schema(
    {
      title: {
        type: String,
        required: true,
      },
      description: {
        type: String,
        required: true,
      },
      poster: {
        type: String,
        required: true,
      },
    },
    { timestamps: true }
  );

export const Posts = mongoose.model("Posts", postSchema);