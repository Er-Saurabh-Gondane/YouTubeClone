// src/models/Comment.js
import { Schema, model } from "mongoose";

const commentSchema = new Schema(
  {
    videoId: {
      type: Schema.Types.ObjectId,
      ref: "Video",
      required: true,
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    text: {
      type: String,
      required: true,
      trim: true,
      maxlength: 1000,
    },
 
    editedAt: {
      type: Date,
    },
  },
  { timestamps: true }
);

// indexes for fast queries
commentSchema.index({ videoId: 1, createdAt: -1 }); // video comments newest first
commentSchema.index({ userId: 1, createdAt: -1 });  // comments by user

export default model("Comment", commentSchema);
