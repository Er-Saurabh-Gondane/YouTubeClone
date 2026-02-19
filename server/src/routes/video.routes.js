import { Router } from "express";
import { protect } from "../middleware/auth.middleware.js";
import {
  uploadVideo,
  getVideo,
  getAllVideos,
  getVideosByChannel,
  getVideosByCategory,
  increaseViews,
  likeVideo,
  dislikeVideo,
} from "../controllers/video.controller.js";

const router = Router();

// UPLOAD VIDEO
router.post("/uploadVideo", protect, uploadVideo);

// GET SINGLE VIDEO
router.get("/getVideo/:id", getVideo);

// GET ALL VIDEOS
router.get("/getAllVideos", getAllVideos);

// GET CHANNEL VIDEOS
router.get("/getChannelVideos/:channelId", getVideosByChannel);

// GET CATEGORY VIDEOS
router.get("/getCategoryVideos/:category", getVideosByCategory);

// ADD VIEW
router.post("/increaseViews/:id", increaseViews);

// LIKE VIDEO
router.post("/likeVideo/:id", protect, likeVideo);

// DISLIKE VIDEO
router.post("/dislikeVideo/:id", protect, dislikeVideo);

export default router;
