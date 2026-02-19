import Video from "../models/Video.js";
import Channel from "../models/Channel.js";
import { asyncHandler } from "../utils/asyncHandler.js";


// UPLOAD VIDEO

export const uploadVideo = asyncHandler(async (req, res) => {
  const {
    channelId,
    title,
    description,
    videoUrl,
    thumbnailUrl,
    category,
  } = req.body;

  // verify channel
  const channel = await Channel.findById(channelId);
  if (!channel) {
    return res.status(404).json({ message: "Channel not found" });
  }

  // user must be owner of channel
  if (channel.owner.toString() !== req.user._id.toString()) {
    return res
      .status(403)
      .json({ message: "You are not authorized to upload videos on this channel" });
  }

  const video = await Video.create({
    channelId,
    uploader: req.user._id,
    title,
    description,
    videoUrl,
    thumbnailUrl,
    category,
  });

  // increase channel video count
  await Channel.findByIdAndUpdate(channelId, { $inc: { totalVideos: 1 } });

  return res.status(201).json({
    message: "Video uploaded successfully",
    video,
  });
});


// GET SINGLE VIDEO (PUBLIC)

export const getVideo = asyncHandler(async (req, res) => {
  const video = await Video.findById(req.params.id)
    .populate("channelId", "name bannerImage subscribersCount")
    .populate("uploader", "userName avatar");

  if (!video) {
    return res.status(404).json({ message: "Video not found" });
  }

  return res.status(200).json({ video });
});


// GET ALL VIDEOS (HOMEPAGE)

export const getAllVideos = asyncHandler(async (req, res) => {
  const videos = await Video.find()
    .sort({ createdAt: -1 })
    .populate("channelId", "name");

  return res.status(200).json({ videos });
});


// GET CHANNEL VIDEOS

export const getVideosByChannel = asyncHandler(async (req, res) => {
  const { channelId } = req.params;

  const videos = await Video.find({ channelId })
    .sort({ createdAt: -1 });

  return res.status(200).json({ videos });
});


// GET VIDEOS BY CATEGORY

export const getVideosByCategory = asyncHandler(async (req, res) => {
  const { category } = req.params;

  const videos = await Video.find({ category })
    .sort({ createdAt: -1 });

  return res.status(200).json({ videos });
});


// INCREMENT VIEW COUNT

export const increaseViews = asyncHandler(async (req, res) => {
  const videoId = req.params.id;

  const video = await Video.findById(videoId);
  if (!video) {
    return res.status(404).json({ message: "Video not found" });
  }

  await Video.findByIdAndUpdate(videoId, {
    $inc: { views: 1 },
  });

  return res.status(200).json({ message: "View count updated" });
});


// LIKE VIDEO

export const likeVideo = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const video = await Video.findById(id);
  if (!video) {
    return res.status(404).json({ message: "Video not found" });
  }

  await Video.findByIdAndUpdate(id, { $inc: { likesCount: 1 } });

  return res.status(200).json({ message: "Liked video" });
});


// DISLIKE VIDEO

export const dislikeVideo = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const video = await Video.findById(id);
  if (!video) {
    return res.status(404).json({ message: "Video not found" });
  }

  await Video.findByIdAndUpdate(id, { $inc: { dislikesCount: 1 } });

  return res.status(200).json({ message: "Disliked video" });
});

// 🔹 UPDATE VIDEO (title/description/thumbnail/category/videoUrl)
export const updateVideo = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const video = await Video.findById(id);
  if (!video) {
    return res.status(404).json({ message: "Video not found" });
  }

  // fetch channel to verify owner
  const channel = await Channel.findById(video.channelId);
  if (!channel) {
    return res.status(404).json({ message: "Channel not found" });
  }

  // only channel owner can update video
  if (channel.owner.toString() !== req.user._id.toString()) {
    return res
      .status(403)
      .json({ message: "You are not authorized to update this video" });
  }

  const {
    title,
    description,
    videoUrl,
    thumbnailUrl,
    category,
  } = req.body;

  // build partial update object
  const updateData = {};
  if (title !== undefined) updateData.title = title;
  if (description !== undefined) updateData.description = description;
  if (videoUrl !== undefined) updateData.videoUrl = videoUrl;
  if (thumbnailUrl !== undefined) updateData.thumbnailUrl = thumbnailUrl;
  if (category !== undefined) updateData.category = category;

  const updatedVideo = await Video.findByIdAndUpdate(
    id,
    { $set: updateData },
    { new: true }
  )
    .populate("channelId", "name bannerImage subscribersCount")
    .populate("uploader", "userName avatar");

  return res.status(200).json({
    message: "Video updated successfully",
    video: updatedVideo,
  });
});
