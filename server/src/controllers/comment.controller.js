import Comment from "../models/Comment.js";
import Video from "../models/Video.js";
import { asyncHandler } from "../utils/asyncHandler.js";


// CREATE COMMENT

export const createComment = asyncHandler(async (req, res) => {
  const { videoId, text } = req.body;

  if (!videoId) {
    return res.status(400).json({ message: "videoId is required" });
  }

  if (!text || !text.trim()) {
    return res.status(400).json({ message: "Comment text is required" });
  }

  // Optional: ensure video exists
  const video = await Video.findById(videoId);
  if (!video) {
    return res.status(404).json({ message: "Video not found" });
  }

  const comment = await Comment.create({
    videoId,
    userId: req.user._id, // from protect middleware
    text: text.trim(),
  });

  return res.status(201).json({
    message: "Comment added successfully",
    comment,
  });
});


// GET COMMENTS FOR A VIDEO (PUBLIC)

export const getVideoComments = asyncHandler(async (req, res) => {
  const { videoId } = req.params;

  const comments = await Comment.find({ videoId })
    .sort({ createdAt: -1 })
    .populate("userId", "userName avatar");

  return res.status(200).json({ comments });
});


// UPDATE COMMENT (ONLY OWNER)

export const updateComment = asyncHandler(async (req, res) => {
  const { id } = req.params; // comment id
  const { text } = req.body;

  if (!text || !text.trim()) {
    return res.status(400).json({ message: "Comment text is required" });
  }

  const comment = await Comment.findById(id);

  if (!comment) {
    return res.status(404).json({ message: "Comment not found" });
  }

  if (comment.userId.toString() !== req.user._id.toString()) {
    return res
      .status(403)
      .json({ message: "Unauthorized to edit this comment" });
  }

  comment.text = text.trim();
  comment.editedAt = new Date();

  await comment.save();

  return res.status(200).json({
    message: "Comment updated successfully",
    comment,
  });
});


// DELETE COMMENT (ONLY OWNER)

export const deleteComment = asyncHandler(async (req, res) => {
  const { id } = req.params; // comment id

  const comment = await Comment.findById(id);

  if (!comment) {
    return res.status(404).json({ message: "Comment not found" });
  }

  if (comment.userId.toString() !== req.user._id.toString()) {
    return res
      .status(403)
      .json({ message: "Unauthorized to delete this comment" });
  }

  await comment.deleteOne();

  return res.status(200).json({
    message: "Comment deleted successfully",
  });
});


// GET MY COMMENTS (OPTIONAL)

export const getMyComments = asyncHandler(async (req, res) => {
  const comments = await Comment.find({ userId: req.user._id })
    .sort({ createdAt: -1 })
    .populate("videoId", "title thumbnailUrl");

  return res.status(200).json({ comments });
});
