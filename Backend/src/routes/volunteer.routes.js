// routes/adminAuth.routes.js
import { Router } from "express";
import {
  reg,
  loginAdmin,
  getAdminProfile,
} from "../controllers/adminAuth.controller.js";
import { verifyAdmin } from "../middlewares/admin.middleware.js";

const router = Router();

router.post("/register", registerAdmin); // optional, only if public
router.post("/login", loginAdmin);
router.get("/profile", verifyAdmin, getAdminProfile);

export default router;
