import Idea from "../models/idea.js";
import User from "../models/User.js";
import Notification from "../models/Notification.js";

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

export const getMyIdeas = async (req, res) => {
  try {
    const { id } = req.params;

    const ideas = await Idea.find({
      userId: id,
    }).sort({ createdAt: -1 });

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
export const likeIdea = async (req, res) => {
  try {
    const { email } = req.body;

    const idea = await Idea.findById(req.params.id);

    if (!idea) {
      return res.status(404).json({
        success: false,
        message: "Idea not found",
      });
    }

    const liked = idea.likedBy.includes(email);
    const disliked = idea.dislikedBy.includes(email);

    if (liked) {
      // Remove like
      idea.likedBy = idea.likedBy.filter(
        (item) => item !== email
      );
    } else {
      // Add like
      idea.likedBy.push(email);

      // Remove dislike if it exists
      if (disliked) {
        idea.dislikedBy = idea.dislikedBy.filter(
          (item) => item !== email
        );
      }

      // 🔔 Create notification
      const sender = await User.findOne({ email });

      if (
        sender &&
        idea.userId &&
        sender._id.toString() !== idea.userId.toString()
      ) {
        await Notification.create({
          recipient: idea.userId,
          sender: sender._id,
          ideaId: idea._id,
          type: "like",
          message: `${sender.name} liked your idea`,
        });
      }
    }

    await idea.save();

    res.json({
      success: true,
      idea,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
export const dislikeIdea = async (req, res) => {
  try {
    const { email } = req.body;

    const idea = await Idea.findById(req.params.id);

    if (!idea) {
      return res.status(404).json({
        success: false,
        message: "Idea not found",
      });
    }

    const liked = idea.likedBy.includes(email);
    const disliked = idea.dislikedBy.includes(email);

    if (disliked) {
      // Remove dislike
      idea.dislikedBy = idea.dislikedBy.filter(
        (item) => item !== email
      );
    } else {
      // Add dislike
      idea.dislikedBy.push(email);

      // Remove like if it exists
      if (liked) {
        idea.likedBy = idea.likedBy.filter(
          (item) => item !== email
        );
      }
    }

    await idea.save();

    res.json({
      success: true,
      idea,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
export const saveIdea = async (req, res) => {
  try {
    const { email } = req.body;

    const idea = await Idea.findById(req.params.id);

    if (!idea) {
      return res.status(404).json({
        success: false,
        message: "Idea not found",
      });
    }

    const index = idea.savedBy.indexOf(email);

    let saved;

    if (index === -1) {
      // Save
      idea.savedBy.push(email);
      saved = true;

      // 🔔 Create notification
      const sender = await User.findOne({ email });

      if (
        sender &&
        idea.userId &&
        sender._id.toString() !== idea.userId.toString()
      ) {
        await Notification.create({
          recipient: idea.userId,
          sender: sender._id,
          ideaId: idea._id,
          type: "save",
          message: `${sender.name} saved your idea`,
        });
      }

    } else {
      // Unsave
      idea.savedBy.splice(index, 1);
      saved = false;
    }

    await idea.save();

    res.json({
      success: true,
      saved,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
export const addComment = async (req, res) => {
  try {
    const { user, text } = req.body;

    const idea = await Idea.findById(req.params.id);

    if (!idea) {
      return res.status(404).json({
        success: false,
        message: "Idea not found",
      });
    }

    idea.comments.push({
      user,
      text,
    });

    await idea.save();

    // 🔔 Find commenter
    const sender = await User.findOne({ name: user });

    // 🔔 Create notification
    if (
      sender &&
      idea.userId &&
      sender._id.toString() !== idea.userId.toString()
    ) {
      await Notification.create({
        recipient: idea.userId,
        sender: sender._id,
        ideaId: idea._id,
        type: "comment",
        message: `${sender.name} commented on your idea`,
      });
    }

    res.json({
      success: true,
      comments: idea.comments,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
export const deleteIdea = async (req, res) => {

  try {

    await Idea.findByIdAndDelete(req.params.id);

    res.json({
      success: true,
      message: "Idea deleted",
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }

};
export const updateIdea = async (req, res) => {

  try {

    const idea = await Idea.findByIdAndUpdate(

      req.params.id,

      req.body,

      {
        new: true,
      }

    );

    res.json({
      success: true,
      idea,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }

};
export const getSavedIdeas = async (req, res) => {
  try {
    const { email } = req.params;

    const ideas = await Idea.find({
      savedBy: email,
    }).sort({ createdAt: -1 });

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
export const searchIdeas = async (req, res) => {
  try {
    const { keyword } = req.query;

    const ideas = await Idea.find({
      $or: [
        { title: { $regex: keyword, $options: "i" } },
        { category: { $regex: keyword, $options: "i" } },
        { description: { $regex: keyword, $options: "i" } },
        { problem: { $regex: keyword, $options: "i" } },
        { solution: { $regex: keyword, $options: "i" } },
        { createdBy: { $regex: keyword, $options: "i" } },
      ],
    }).sort({ createdAt: -1 });

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
export const getIdeaById = async (req, res) => {
  try {
    const idea = await Idea.findById(req.params.id);

    if (!idea) {
      return res.status(404).json({
        success: false,
        message: "Idea not found",
      });
    }

    res.status(200).json({
      success: true,
      idea,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};