import { Router } from "express";

import {
  createProduct,
  updateProduct,
  deleteProduct,
  getAllProducts,
  getSingleProduct,
} from "../controllers/product.controller.js";

import { upload } from "../middlewares/multer.js";

export const productRouter = Router();

productRouter.post(
  "/",
  upload.fields([{ name: "image", maxCount: 10 }]),
  createProduct
);
productRouter.get("/", getAllProducts);
productRouter
  .get("/:id", getSingleProduct)
  .put("/:id", updateProduct)
  .delete("/:id", deleteProduct);
