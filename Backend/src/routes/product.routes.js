import express from "express";
import {
  createProduct,
  getAllProducts,
  getProductById,
  claimProduct,
  markProductAsReceived,
  deleteProduct,
  getUserProducts,
} from "../controllers/product.controller.js";

// import { authMiddleware } from "../middlewares/auth.middleware.js";

import { upload } from "../middlewares/multer.js";
const router = express.Router();

// Routes
router.post(
  "/",
  upload.fields([{ name: "images", maxCount: 7 }]),
  createProduct
);
router.get("/", getAllProducts);
router.get("/my", authMiddleware, getUserProducts);
router.get("/:id", getProductById);
router.patch("/:id/claim", authMiddleware, claimProduct);
router.patch("/:id/receive", authMiddleware, markProductAsReceived);
router.delete("/:id", authMiddleware, deleteProduct);

export default router;
