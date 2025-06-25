import express from "express";
import {
  registerUser,
  loginUser,
  handleRefreshToken,
  logoutUser,
  getProfile,
} from "../controllers/user.controller.js";
import { authMiddleware } from "../middlewares/authMidllware.js";
import { multer } from "../middlewares/multer.js";

const router = express.Router();

router.post(
  "/register",
  upload.fields([{ name: "images", maxCount: 7 }]),
  registerUser
);
router.post("/login", loginUser);
router.post("/refresh-token", handleRefreshToken);
router.post("/logout", logoutUser);
router.get("/me", authMiddleware, getProfile);

export default router;
