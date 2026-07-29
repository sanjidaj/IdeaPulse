import Idea from "../models/idea.js";

// Create a new idea
export const createIdea = async (req, res) => {
  try {
    const idea = await Idea.create(req.body);

    res.status(201).json({
      success: true,
      message: "Idea submitted successfully",
      idea,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get all ideas
export const getIdeas = async (req, res) => {
  try {
    const ideas = await Idea.find().sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      ideas,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};