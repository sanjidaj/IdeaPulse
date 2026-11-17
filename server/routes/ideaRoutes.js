
import express from "express";
import {
  addComment,
  createIdea,
  deleteIdea,
  dislikeIdea,
  getIdeaById,
  getIdeas,
  getMyIdeas,
  getSavedIdeas,
  likeIdea,
  saveIdea,
  searchIdeas,
  updateIdea,
} from "../controllers/ideaController.js";

import { verifyToken } from "../middleware/authMiddleware.js";
const router = express.Router();


// Public routes
router.get("/", getIdeas);
router.get("/search", searchIdeas);

// Protected routes
router.post("/", verifyToken, createIdea);
router.get("/my-ideas", verifyToken, getMyIdeas);
router.get("/saved", verifyToken, getSavedIdeas);

// Dynamic route 
router.get("/:id", getIdeaById);

// Other idea actions
router.put("/:id/like", verifyToken, likeIdea);
router.put("/:id/dislike", verifyToken, dislikeIdea);
router.put("/:id/save", verifyToken, saveIdea);
router.post("/:id/comment", verifyToken, addComment);

router.put("/:id", verifyToken, updateIdea);
router.delete("/:id", verifyToken, deleteIdea);


export default router;
