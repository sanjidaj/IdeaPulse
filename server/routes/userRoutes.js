import express from "express";
import {
  getProfile,
  updateProfile,
} from "../controllers/userController.js";
import {
  deleteAccount,
} from "../controllers/userController.js";

const router=express.Router();

router.get("/profile/:id",getProfile);

router.put("/profile/:id",updateProfile);
router.delete("/:id", deleteAccount);


export default router;