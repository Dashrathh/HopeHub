
import {
  createProduct,
  getAllProducts,
  getProductById,
  claimProduct,
  markProductAsReceived,
  deleteProduct,
  getUserProducts,
} from "../controllers/product.controller.js";


import { upload } from "../middlewares/multer.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { Router } from "express";

export const productRouter = Router();

// Routes

productRouter.get("/", getAllProducts);
productRouter.get("/:id", getProductById);


productRouter.use(authMiddleware)
.post(
  "/",
  upload.fields([{ name: "images", maxCount: 7 }]),
  createProduct
)
.get("/my", authMiddleware, getUserProducts)
.patch("/:id/claim", authMiddleware, claimProduct)
.patch("/:id/receive", authMiddleware, markProductAsReceived)
.delete("/:id", authMiddleware, deleteProduct);
