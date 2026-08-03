import express from "express";
import {
  addComment,
  createIdea,
  deleteIdea,
  dislikeIdea,
  getIdeas,
  getMyIdeas,
  getSavedIdeas,
  likeIdea,
  saveIdea,
  searchIdeas,
  updateIdea,
} from "../controllers/ideaController.js";

const router = express.Router();

// Create a new idea
router.post("/", createIdea);

// Get all ideas
router.get("/", getIdeas);

// Get only the logged-in user's ideas
router.get("/my-ideas/:id", getMyIdeas);
router.put("/:id/like", likeIdea);
router.put("/:id/dislike", dislikeIdea);
router.put("/:id/save", saveIdea);
router.post("/:id/comment", addComment);

router.delete("/:id", deleteIdea);

router.put("/:id", updateIdea);
router.get("/saved/:email", getSavedIdeas);
router.get("/search", searchIdeas);

export default router;