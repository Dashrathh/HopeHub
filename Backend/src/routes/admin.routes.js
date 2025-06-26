import { Router } from "express";
import {
  registerAdmin,
  loginAdmin,
  getAdminProfile,
  logoutAdmin,
} from "../controllers/admin.controller.js";
import { adminMiddleware } from "../middlewares/admin.middleware.js";

export const adminRouter = Router();

adminRouter.post("/register", registerAdmin);
adminRouter.post("/login", loginAdmin);
adminRouter.get("/profile", adminMiddleware, getAdminProfile);
adminRouter.post("/logout", logoutAdmin);
