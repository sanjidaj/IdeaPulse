import express from "express";
import {
  createIdea,
  getIdeas,
  getMyIdeas,
} from "../controllers/ideaController.js";

const router = express.Router();

// Create a new idea
router.post("/", createIdea);

// Get all ideas
router.get("/", getIdeas);

// Get only the logged-in user's ideas
router.get("/my/:username", getMyIdeas);

export default router;