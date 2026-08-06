

import bcrypt from "bcrypt";
import User from "../models/User.js";
import Idea from "../models/idea.js";

export const getProfile = async (req, res) => {

    try {

        const user = await User.findById(req.params.id);

        const ideas = await Idea.find({
            userId: user._id,
        });

        let likes = 0;

        ideas.forEach((idea) => {
            likes += idea.upvotes || 0;
        });

        const saved = await Idea.countDocuments({
            savedBy: user.email,
        });

        res.json({
            success: true,
            user,
            stats: {
                ideas: ideas.length,
                saved,
                likes,
            },
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message,
        });

    }

};
export const updateProfile = async (req, res) => {

    try {

        const { name, email, password } = req.body;


        const update = {
            name,
            email,
        };

        if (password && password.trim() !== "") {
            update.password = await bcrypt.hash(password, 10);
        }

        const user = await User.findByIdAndUpdate(
            req.params.id,
            update,
            { new: true }
        );

        // Update author name on existing ideas
        await Idea.updateMany(
            { userId: user._id },
            { createdBy: name }
        );

        res.json({
            success: true,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
            },
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message,
        });

    }

};



export const deleteAccount = async (req, res) => {
  try {
    const { id } = req.params;

    // Find user
    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // Delete all ideas created by the user
    await Idea.deleteMany({
      userId: id,
    });

    // Remove this user's likes, saves, dislikes and comments
    await Idea.updateMany(
      {},
      {
        $pull: {
          likedBy: user.email,
          dislikedBy: user.email,
          savedBy: user.email,
          comments: {
            email: user.email,
          },
        },
      }
    );

    // Delete user
    await User.findByIdAndDelete(id);

    res.json({
      success: true,
      message: "Account deleted successfully",
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};