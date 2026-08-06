import Idea from "../models/idea.js";


export const getDashboard = async (req, res) => {
  try {
    const { userId } = req.params;

    // Get all ideas created by this user
    const ideas = await Idea.find({ userId });
    

    // Summary Cards
    const totalIdeas = ideas.length;

    const totalLikes = ideas.reduce(
      (sum, idea) => sum + (idea.likedBy?.length || 0),
      0
    );

    const totalSaved = ideas.reduce(
      (sum, idea) => sum + (idea.savedBy?.length || 0),
      0
    );

    // Pie Chart - Categories
    const categoryMap = {};

    ideas.forEach((idea) => {
      categoryMap[idea.category] =
        (categoryMap[idea.category] || 0) + 1;
    });

    const categoryData = Object.keys(categoryMap).map((key) => ({
      name: key,
      value: categoryMap[key],
    }));

    // Bar Chart - Likes per idea
    const likesData = ideas.map((idea) => ({
      title: idea.title,
      likes: idea.likedBy?.length || 0,
    }));

    // Line Chart - Ideas per month
    const monthMap = {};

    ideas.forEach((idea) => {
      const month = new Date(
        idea.createdAt
      ).toLocaleString("default", {
        month: "short",
      });

      monthMap[month] = (monthMap[month] || 0) + 1;
    });

    const monthlyData = Object.keys(monthMap).map((month) => ({
      month,
      ideas: monthMap[month],
    }));
    

    res.json({
      success: true,

      stats: {
        ideas: totalIdeas,
        likes: totalLikes,
        saved: totalSaved,
      },

      categoryData,
      likesData,
      monthlyData,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};