import { Schema, model } from "mongoose";

const channelSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      minlength: 3,
      maxlength: 50,
    },

    description: {
      type: String,
      default: "",
      maxlength: 500,
    },

    owner: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    bannerImage: {
      type: String,
      default: "",
    },

    subscribersCount: {
      type: Number,
      default: 0,
      min: 0,   
    },
    totalVideos: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

// Indexes
channelSchema.index({ owner: 1 });
channelSchema.index({ name: "text" });

export default model("Channel", channelSchema);
