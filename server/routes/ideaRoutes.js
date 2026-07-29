import express from "express";
import { createIdea, getIdeas } from "../controllers/ideaController.js";

const router = express.Router();

router.post("/", createIdea);

router.get("/", getIdeas);

export default router;