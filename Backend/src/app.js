// src/index.ts
import express from "express";
import dotenv from "dotenv";
import { productRouter } from "./routes/product.routes.js";
import { userRouter } from "./routes/user.routes.js";
import { ApiError } from "./utils/ApiError.js";
import cookieParser from "cookie-parser";

dotenv.config();

export const port = process.env.PORT || 3001;

export const app = express();
app.use(express.json({ limit: "50KB" }));
app.use(express.urlencoded({ limit: "50KB", extended: true }));
app.use(cookieParser());


const createVersionRoute = (route, version = 1) => "/api/v" + version + "/" + route;

/**
 * Routes
 */
app.use("/api/product", productRouter);
app.use("/api/users", userRouter);

/**
 * Error Handing
 */
app.use((err, req, res, next) => {
  console.log(err);

  if (err?.statusCode) {
    return res.status(err.statusCode || 500).json(err);
  }

  return res
    .status(err?.statusCode || 500)
    .json(
      new ApiError(err.statusCode || 500, "An error occurred", err.message)
    );
});

/**
 * 404 errors
 */
app.use("*", (req, res) => {
  return res.status(404).json(new ApiError(404, "Page not found"));
});