import express from "express";
import dotenv from "dotenv";
// import mongoose from "mongoose";
import cors from "cors";
import authRoutes from "./routes/authRoutes.js";

import connectDB from "./config/db.js";

dotenv.config();

connectDB();

const app = express();

app.use(cors());

app.use(express.json());
app.use("/api/auth", authRoutes);

app.get("/", (req, res) => {
  res.send("IdeaPulse API Running...");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});