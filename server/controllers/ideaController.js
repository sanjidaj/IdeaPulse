
import mongoose from "mongoose";

import Idea from "../models/idea.js";
import User from "../models/User.js";
import Notification from "../models/Notification.js";

// HELPER FUNCTIONS


// Safely check whether an array contains a user ID
const hasUser = (array, userId) => {
  const safeArray = Array.isArray(array) ? array : [];

  return safeArray.some((item) => {
    const id = item?._id || item;
    return String(id) === String(userId);
  });
};

// Safely remove a user ID from an array
const removeUser = (array, userId) => {
  const safeArray = Array.isArray(array) ? array : [];

  return safeArray.filter((item) => {
    const id = item?._id || item;
    return String(id) !== String(userId);
  });
};

// Initialize interaction arrays if missing
const initializeIdeaArrays = (idea) => {
  if (!Array.isArray(idea.likedBy)) {
    idea.likedBy = [];
  }

  if (!Array.isArray(idea.dislikedBy)) {
    idea.dislikedBy = [];
  }

  if (!Array.isArray(idea.savedBy)) {
    idea.savedBy = [];
  }

  if (!Array.isArray(idea.comments)) {
    idea.comments = [];
  }
};

// Populate comment user information
const populateComments = async (idea) => {
  await idea.populate("comments.user", "name");
  return idea;
};

// Create notification without interrupting the main interaction
const createInteractionNotification = async ({
  idea,
  userId,
  type,
  message,
}) => {
  try {
    // Do not notify users about their own interactions
    if (String(idea.userId) === String(userId)) {
      return;
    }

    const sender = await User.findById(userId);

    if (!sender) {
      return;
    }

    await Notification.create({
      recipient: idea.userId,
      sender: userId,
      ideaId: idea._id,
      type,
      message: `${sender.name} ${message}`,
    });
  } catch (error) {
    console.error("Notification Error:", error.message);
  }
};

// Escape special characters for search regex
// const escapeRegex = (value) => {
//   return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
// };

// CREATE A NEW IDEA


export const createIdea = async (req, res) => {
  try {
    const userId = req.user.id;

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found.",
      });
    }

    const {
      title,
      category,
      description,
      problem,
      solution,
    } = req.body;

    if (
      !title ||
      !category ||
      !description ||
      !problem ||
      !solution
    ) {
      return res.status(400).json({
        success: false,
        message: "Please fill all required fields.",
      });
    }

    const idea = await Idea.create({
      title,
      category,
      description,
      problem,
      solution,
      userId,
      createdBy: user.name,
    });

    return res.status(201).json({
      success: true,
      message: "Idea submitted successfully",
      idea,
    });
  } catch (error) {
    console.error("Create Idea Error:", error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


// GET ALL IDEAS


export const getIdeas = async (req, res) => {
  try {
    const ideas = await Idea.find()
      .sort({ createdAt: -1 })
      .populate("comments.user", "name");

    const getLikes = (idea) => idea.likedBy || [];
    const getSaves = (idea) => idea.savedBy || [];
    const getComments = (idea) => idea.comments || [];

    const maxLikes = Math.max(
      ...ideas.map((idea) => getLikes(idea).length),
      1
    );

    const maxSaves = Math.max(
      ...ideas.map((idea) => getSaves(idea).length),
      1
    );

    const maxComments = Math.max(
      ...ideas.map((idea) => getComments(idea).length),
      1
    );

    const ideasWithScore = ideas.map((idea) => {
      const likes = getLikes(idea).length;
      const saves = getSaves(idea).length;
      const comments = getComments(idea).length;

      const likeScore = (likes / maxLikes) * 40;
      const saveScore = (saves / maxSaves) * 35;
      const commentScore = (comments / maxComments) * 25;

      const validationScore = Math.round(
        likeScore + saveScore + commentScore
      );

      return {
        ...idea.toObject(),
        likedBy: getLikes(idea),
        savedBy: getSaves(idea),
        dislikedBy: idea.dislikedBy || [],
        comments: getComments(idea),
        validationScore,
      };
    });

    return res.status(200).json({
      success: true,
      ideas: ideasWithScore,
    });
  } catch (error) {
    console.error("Get Ideas Error:", error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// GET LOGGED-IN USER'S IDEAS

export const getMyIdeas = async (req, res) => {
  try {
    const ideas = await Idea.find({
      userId: req.user.id,
    })
      .sort({ createdAt: -1 })
      .populate("comments.user", "name");

    return res.status(200).json({
      success: true,
      ideas,
    });
  } catch (error) {
    console.error("Get My Ideas Error:", error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


// LIKE AN IDEA

export const likeIdea = async (req, res) => {
  try {
    const userId = new mongoose.Types.ObjectId(req.user.id);

    const idea = await Idea.findById(req.params.id);

    if (!idea) {
      return res.status(404).json({
        success: false,
        message: "Idea not found",
      });
    }

    initializeIdeaArrays(idea);

    const liked = hasUser(idea.likedBy, userId);
    const disliked = hasUser(idea.dislikedBy, userId);

    if (liked) {
      // Remove existing like
      idea.likedBy = removeUser(idea.likedBy, userId);
    } else {
      // Add like
      idea.likedBy.push(userId);

      // Remove existing dislike
      if (disliked) {
        idea.dislikedBy = removeUser(
          idea.dislikedBy,
          userId
        );
      }
    }

    // Save the interaction first
    await idea.save();

    // Create notification only when adding a like
    if (!liked) {
      await createInteractionNotification({
        idea,
        userId,
        type: "like",
        message: "liked your idea",
      });
    }

    await populateComments(idea);

    return res.status(200).json({
      success: true,
      message: liked ? "Like removed" : "Idea liked",
      idea,
    });
  } catch (error) {
    console.error("Like Error:", error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


// DISLIKE AN IDEA

export const dislikeIdea = async (req, res) => {
  try {
    const userId = new mongoose.Types.ObjectId(req.user.id);

    const idea = await Idea.findById(req.params.id);

    if (!idea) {
      return res.status(404).json({
        success: false,
        message: "Idea not found",
      });
    }

    initializeIdeaArrays(idea);

    const liked = hasUser(idea.likedBy, userId);
    const disliked = hasUser(idea.dislikedBy, userId);

    if (disliked) {
      // Remove existing dislike
      idea.dislikedBy = removeUser(
        idea.dislikedBy,
        userId
      );
    } else {
      // Add dislike
      idea.dislikedBy.push(userId);

      // Remove existing like
      if (liked) {
        idea.likedBy = removeUser(
          idea.likedBy,
          userId
        );
      }
    }

    await idea.save();
    await populateComments(idea);

    return res.status(200).json({
      success: true,
      message: disliked ? "Dislike removed" : "Idea disliked",
      idea,
    });
  } catch (error) {
    console.error("Dislike Error:", error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// SAVE OR UNSAVE AN IDEA


export const saveIdea = async (req, res) => {
  try {
    const userId = new mongoose.Types.ObjectId(req.user.id);

    const idea = await Idea.findById(req.params.id);

    if (!idea) {
      return res.status(404).json({
        success: false,
        message: "Idea not found",
      });
    }

    initializeIdeaArrays(idea);

    const saved = hasUser(idea.savedBy, userId);

    if (saved) {
      // Unsave idea
      idea.savedBy = removeUser(
        idea.savedBy,
        userId
      );
    } else {
      // Save idea
      idea.savedBy.push(userId);
    }

    await idea.save();

    // Notify only when saving
    if (!saved) {
      await createInteractionNotification({
        idea,
        userId,
        type: "save",
        message: "saved your idea",
      });
    }

    return res.status(200).json({
      success: true,
      saved: !saved,
      idea,
    });
  } catch (error) {
    console.error("Save Error:", error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ADD A COMMENT
export const addComment = async (req, res) => {
  try {
    const userId = new mongoose.Types.ObjectId(req.user.id);
    const { text } = req.body;

    if (!text || !text.trim()) {
      return res.status(400).json({
        success: false,
        message: "Comment cannot be empty.",
      });
    }

    const idea = await Idea.findById(req.params.id);

    if (!idea) {
      return res.status(404).json({
        success: false,
        message: "Idea not found",
      });
    }

    initializeIdeaArrays(idea);

    const sender = await User.findById(userId);

    if (!sender) {
      return res.status(404).json({
        success: false,
        message: "User not found.",
      });
    }

    idea.comments.push({
      user: userId,
      text: text.trim(),
    });

    await idea.save();

    await createInteractionNotification({
      idea,
      userId,
      type: "comment",
      message: "commented on your idea",
    });

    await populateComments(idea);

    return res.status(201).json({
      success: true,
      message: "Comment added successfully",
      comments: idea.comments,
    });
  } catch (error) {
    console.error("Comment Error:", error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


// DELETE AN IDEA (OWNER ONLY)

export const deleteIdea = async (req, res) => {
  try {
    const idea = await Idea.findById(req.params.id);

    if (!idea) {
      return res.status(404).json({
        success: false,
        message: "Idea not found",
      });
    }

    if (String(idea.userId) !== String(req.user.id)) {
      return res.status(403).json({
        success: false,
        message: "You are not allowed to delete this idea.",
      });
    }

    await Idea.findByIdAndDelete(req.params.id);

    return res.status(200).json({
      success: true,
      message: "Idea deleted successfully",
    });
  } catch (error) {
    console.error("Delete Idea Error:", error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


// UPDATE AN IDEA (OWNER ONLY)

export const updateIdea = async (req, res) => {
  try {
    const idea = await Idea.findById(req.params.id);

    if (!idea) {
      return res.status(404).json({
        success: false,
        message: "Idea not found",
      });
    }

    if (String(idea.userId) !== String(req.user.id)) {
      return res.status(403).json({
        success: false,
        message: "You are not allowed to update this idea.",
      });
    }

    const allowedFields = [
      "title",
      "category",
      "description",
      "problem",
      "solution",
    ];

    allowedFields.forEach((field) => {
      if (req.body[field] !== undefined) {
        idea[field] = req.body[field];
      }
    });

    await idea.save();
    await populateComments(idea);

    return res.status(200).json({
      success: true,
      idea,
    });
  } catch (error) {
    console.error("Update Idea Error:", error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// GET LOGGED-IN USER'S SAVED IDEAS

export const getSavedIdeas = async (req, res) => {
  try {
    const ideas = await Idea.find({
      savedBy: req.user.id,
    })
      .sort({ createdAt: -1 })
      .populate("comments.user", "name");

    return res.status(200).json({
      success: true,
      ideas,
    });
  } catch (error) {
    console.error("Get Saved Ideas Error:", error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


// SEARCH IDEAS



export const searchIdeas = async (req, res) => {
  try {
    const { keyword } = req.query;

    if (!keyword || !keyword.trim()) {
      return res.status(200).json({
        success: true,
        ideas: [],
      });
    }

    const searchTerm = keyword.trim();

    let ideas;

    // Use Atlas Search when enabled
    // eslint-disable-next-line no-undef
    if (process.env.ATLAS_SEARCH_ENABLED === "true") {
      ideas = await Idea.aggregate([
        {
          $search: {
            index: "idea_search_index",
            compound: {
              should: [
                {
                  text: {
                    query: searchTerm,
                    path: ["title", "description", "tags"],
                    score: {
                      boost: { value: 3 },
                    },
                  },
                },
                {
                  autocomplete: {
                    query: searchTerm,
                    path: "title",
                    tokenOrder: "sequential",
                    score: {
                      boost: { value: 5 },
                    },
                  },
                },
                {
                  autocomplete: {
                    query: searchTerm,
                    path: "description",
                    tokenOrder: "sequential",
                  },
                },
                {
                  autocomplete: {
                    query: searchTerm,
                    path: "tags",
                    tokenOrder: "sequential",
                  },
                },
              ],
              minimumShouldMatch: 1,
            },
          },
        },
        {
          $limit: 50,
        },
        {
          $addFields: {
            searchScore: { $meta: "searchScore" },
          },
        },
        {
          $sort: {
            searchScore: -1,
            createdAt: -1,
          },
        },
      ]);

      // Populate comment user information
      await Idea.populate(ideas, {
        path: "comments.user",
        select: "name",
      });
    } else {
      // Local development fallback using regex
      const searchRegex = new RegExp(
        searchTerm.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"),
        "i"
      );

      ideas = await Idea.find({
        $or: [
          { title: searchRegex },
          { description: searchRegex },
          { tags: searchRegex },
        ],
      })
        .sort({ createdAt: -1 })
        .populate("comments.user", "name");
    }

    return res.status(200).json({
      success: true,
      ideas,
    });
  } catch (error) {
    console.error("Search Ideas Error:", error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};



// GET A SINGLE IDEA

export const getIdeaById = async (req, res) => {
  try {
    const idea = await Idea.findById(req.params.id)
      .populate("comments.user", "name");

    if (!idea) {
      return res.status(404).json({
        success: false,
        message: "Idea not found",
      });
    }

    return res.status(200).json({
      success: true,
      idea,
    });
  } catch (error) {
    console.error("Get Idea Error:", error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
