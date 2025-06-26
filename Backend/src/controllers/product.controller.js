import { Product } from "../db/models/Product.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";

import { uploadOnCloudinary } from "../utils/cloudinary.js";

// Create a new product (donation)

/**
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 */
export const createProduct = async (req, res) => {
  try {
    const { title, description, category } = req.body;
    const userId = req.user._id;


    /**
     * Check Product exists
     */
    const productExists = await Product.findOne({
      title,
      description,
      category
    })

    if (productExists) {
      return res.status(409).json(new ApiError(409, "Product already Exists"));
    }

    /**
     * Upload files
     */
    const uploadedImages = Array.isArray(req.files?.images)
      ? await uploadOnCloudinary(req.files.images)
      : req.files?.images
        ? [await uploadOnCloudinary([req.files.images])]
        : [];

    if (!uploadedImages) {
      throw new ApiError(400, "error while upload image ");
    }

    /**
     * Create Product
     */
    const newProduct = await Product.create({
      title,
      description,
      category,
      image: uploadedImages,
      user: userId,
    });

    return res
      .status(201)
      .json(new ApiResponse(newProduct, "Product created"));
  } catch (err) {
    return res
      .status(500)
      .json(new ApiError(500, err.message, err));
  }
};

// Get all products with optional filter
export const getAllProducts = async (req, res) => {
  try {
    const { status, category } = req.query;
    const filter = {};

    if (status) filter.status = status;
    if (category) filter.category = category;

    const products = await Product.find(filter).populate(
      "user",
      "name email"
    );

    return res.json(new ApiResponse(products, "Fetched all products"));
  } catch (err) {
    return res
      .status(500)
      .json(new ApiError(500, err.message, err));
  }
};

// Get a product by ID
export const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id).populate(
      "user",
      "name email"
    );

    if (!product) return res.status(404).json(new ApiError(404, "Product not found"));

    return res.status(200).json(new ApiResponse(product, "Fetched product details"));
  } catch (err) {
    return res
      .status(500)
      .json(new ApiError(500, err.message, err));
  }
};

// Claim a product
export const claimProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) return res.status(404).json(new ApiError(404, "Product not found"));

    if (product.status !== "AVAILABLE")
      return res
        .status(400)
        .json(new ApiError(400, "Product is already claimed or received"));

    product.status = "CLAIMED";
    await product.save();

    return res.status(200).json(new ApiResponse(product, "Product claimed"));
  } catch (err) {
    return res
      .status(500)
      .json(new ApiError(500, err.message, err));
  }
};

// Mark as received
export const markProductAsReceived = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) return res.status(404).json(new ApiError(404, "Product not found"));

    if (product.status !== "CLAIMED")
      return res.status(400).json(new ApiError(400, "Product is not claimed yet"));

    product.status = "RECEIVED";
    await product.save();

    return res
      .status(200)
      .json(new ApiResponse(product, "Product marked as received"));
  } catch (err) {
    return res
      .status(500)
      .json(new ApiError(500, err.message, err));
  }
};

// Delete a product
export const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);


    if (!product) return res.status(404).json(new ApiError(404, "Product not found"));

    if (String(product.user) !== String(req.user._id)) {
      return res
        .status(403)
        .json(new ApiError(403, "Unauthorized to delete this product"));
    }

    await Product.findByIdAndDelete(req.params.id);

    return res.status(200).json(new ApiResponse({}, "Product deleted"));
  } catch (err) {
    return res
      .status(500)
      .json(new ApiError(500, err.message, err));
  }
};

// Get all products donated by a specific user
export const getUserProducts = async (req, res) => {
  try {
    const products = await Product.find({ user: req.user._id });

    return res.status(200).json(new ApiResponse(products, "Fetched user products"));
  } catch (err) {
    return res
      .status(500)
      .json(new ApiError(500, err.message, err));
  }
};
