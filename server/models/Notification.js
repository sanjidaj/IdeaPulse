import mongoose from "mongoose";

const notificationSchema = new mongoose.Schema(
  {
    recipient: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    ideaId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Idea",
      required: true,
    },

    type: {
      type: String,
      enum: ["like", "save", "comment"],
      required: true,
    },

    message: {
      type: String,
      required: true,
    },

    read: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const Notification = mongoose.model(
  "Notification",
  notificationSchema
);

export default Notification;