
import Notification from "../models/Notification.js";

// Get notifications for a user
export const getNotifications = async (req, res) => {
  try {
    const { userId } = req.params;

    const notifications = await Notification.find({
      recipient: userId,
    })
      .populate("sender", "name")
      .populate("ideaId", "title")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      notifications,
    });

  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
export const markAsRead = async (req, res) => {
  try {
    const { id } = req.params;

    const notification = await Notification.findByIdAndUpdate(
      id,
      {
        read: true,
      },
      {
        new: true,
      }
    );

    if (!notification) {
      return res.status(404).json({
        success: false,
        message: "Notification not found",
      });
    }

    res.status(200).json({
      success: true,
      notification,
    });

  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

