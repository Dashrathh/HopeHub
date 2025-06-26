// routes/adminAuth.routes.js
import { Router } from "express";
import { getAdminProfile, loginAdmin, registerAdmin } from "../controllers/admin.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";

const router = Router();

router.post("/register", registerAdmin); // optional, only if public
router.post("/login", loginAdmin);
router.get("/profile", authMiddleware, getAdminProfile);

export default router;
