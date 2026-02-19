import { Router } from "express";
import { protect } from "../middleware/auth.middleware.js";
import {
  createComment,
  getVideoComments,
  updateComment,
  deleteComment,
  getMyComments,
} from "../controllers/comment.controller.js";

const router = Router();

// CREATE COMMENT
router.post("/createComment", protect, createComment);

// GET COMMENTS FOR A VIDEO (public)
router.get("/getVideoComments/:videoId", getVideoComments);

// UPDATE COMMENT
router.put("/updateComment/:id", protect, updateComment);

// DELETE COMMENT
router.delete("/deleteComment/:id", protect, deleteComment);

// GET MY COMMENTS
router.get("/myComments", protect, getMyComments);

export default router;
