import Channel from "../models/Channel.js";
import { asyncHandler } from "../utils/asyncHandler.js";


// CREATE CHANNEL

export const createChannel = asyncHandler(async (req, res) => {
  const { name, description, bannerImage } = req.body;

  const channel = await Channel.create({
    name,
    description,
    bannerImage,
    owner: req.user._id,        // from protect middleware
  });

  return res.status(201).json({
    message: "Channel created successfully",
    channel,
  });
});



// GET LOGGED-IN USER'S CHANNEL

export const getMyChannel = asyncHandler(async (req, res) => {
  const channel = await Channel.findOne({ owner: req.user._id });

  if (!channel) {
    return res.status(404).json({ message: "No channel found for this user" });
  }

  return res.status(200).json({ channel });
});



// GET CHANNEL BY ID

export const getChannelById = asyncHandler(async (req, res) => {
  const channel = await Channel.findById(req.params.id)
    .populate("owner", "userName email avatar");

  if (!channel) {
    return res.status(404).json({ message: "Channel not found" });
  }

  return res.status(200).json({ channel });
});



// UPDATE CHANNEL (ONLY OWNER CAN UPDATE)

export const updateChannel = asyncHandler(async (req, res) => {
  const channel = await Channel.findById(req.params.id);

  if (!channel) {
    return res.status(404).json({ message: "Channel not found" });
  }

  if (channel.owner.toString() !== req.user._id.toString()) {
    return res.status(403).json({ message: "Unauthorized to update this channel" });
  }

  const allowed = ["name", "description", "bannerImage"];
  allowed.forEach(field => {
    if (req.body[field] !== undefined) {
      channel[field] = req.body[field];
    }
  });

  await channel.save();

  return res.status(200).json({
    message: "Channel updated successfully",
    channel,
  });
});



// DELETE CHANNEL

export const deleteChannel = asyncHandler(async (req, res) => {
  const channel = await Channel.findById(req.params.id);

  if (!channel) {
    return res.status(404).json({ message: "Channel not found" });
  }

  if (channel.owner.toString() !== req.user._id.toString()) {
    return res.status(403).json({ message: "Unauthorized to delete this channel" });
  }

  await channel.deleteOne();

  return res.status(200).json({
    message: "Channel deleted successfully",
  });
});



// SUBSCRIBE / UNSUBSCRIBE

export const subscribeChannel = asyncHandler(async (req, res) => {
  const channelId = req.params.id;

  const channel = await Channel.findById(channelId);
  if (!channel) return res.status(404).json({ message: "Channel not found" });

  await Channel.findByIdAndUpdate(channelId, {
    $inc: { subscribersCount: 1 }
  });

  return res.status(200).json({ message: "Subscribed successfully" });
});

export const unsubscribeChannel = asyncHandler(async (req, res) => {
  const channelId = req.params.id;

  const channel = await Channel.findById(channelId);
  if (!channel) return res.status(404).json({ message: "Channel not found" });

  await Channel.findByIdAndUpdate(channelId, {
    $inc: { subscribersCount: -1 }
  });

  return res.status(200).json({ message: "Unsubscribed successfully" });
});
