import mongoose from "mongoose";

const ideaSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },

    category: {
      type: String,
      required: true,
    },

    description: {
      type: String,
      required: true,
    },

    problem: {
      type: String,
      required: true,
    },

    solution: {
      type: String,
      required: true,
    },

    createdBy: {
      type: String,
      required: true,
    },

    upvotes: {
      type: Number,
      default: 0,
    },

    downvotes: {
      type: Number,
      default: 0,
    },

    comments: [
      {
        user: String,
        text: String,
        createdAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],

    savedBy: [
      {
        type: String, // user's email or id
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Idea = mongoose.model("Idea", ideaSchema);

export default Idea;