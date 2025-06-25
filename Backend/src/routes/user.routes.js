import { Router } from "express";
import {
  registerUser,
  loginUser,
  handleRefreshToken,
  logoutUser,
  getProfile,
} from "../controllers/user.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { upload } from "../middlewares/multer.js";

export const userRouter = Router();

userRouter.post(
  "/register",
  upload.fields([{ name: "images", maxCount: 7 }]),
  registerUser
);

userRouter.post("/login", loginUser);
userRouter.post("/refresh-token", handleRefreshToken);

userRouter.post("/logout", authMiddleware, logoutUser);
userRouter.get("/me", authMiddleware, getProfile);

