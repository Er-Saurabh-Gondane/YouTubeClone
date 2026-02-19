import { Schema, model } from "mongoose";

const videoSchema = new Schema(
  {
    channelId: {
      type: Schema.Types.ObjectId,
      ref: "Channel",
      required: true,
    },
    uploader: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    title: {
      type: String,
      required: true,
      trim: true,
      maxlength: 100,
    },
    description: {
      type: String,
      default: "",
      maxlength: 2000,
    },
    videoUrl: {
      type: String,
      required: true, // store YouTube/Cloudinary/direct video URL
    },
    thumbnailUrl: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true, // used for filter buttons on Home
      trim: true,
    },
    views: {
      type: Number,
      default: 0,
      min: 0,
    },


    likesCount: {
      type: Number,
      default: 0,
      min: 0,
    },
    dislikesCount: {
      type: Number,
      default: 0,
      min: 0,
    },

    isPublished: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

// Indexes for performance
videoSchema.index({ channelId: 1, createdAt: -1 }); // channel videos newest first
videoSchema.index({ category: 1, createdAt: -1 });  // filter by category
videoSchema.index({ title: "text", description: "text" }); // search
videoSchema.index({ createdAt: -1 }); // home feed (latest videos)

export default model("Video", videoSchema);
