import { Product } from "../db/models/Product.model.js";

import { uploadOnCloudinary } from "../utils/cloudinary.js";

// Create a new product (donation)
export const createProduct = async (req, res) => {
  try {
    const { title, description, category, image } = req.body;
    const userId = req.user._id;

    const uploadedImages = Array.isArray(req.files?.image)
      ? await uploadOnCloudinary(req.files.image)
      : req.files?.images
      ? [await uploadOnCloudinary([req.files.image])]
      : [];

    console.log(uploadedImages);

    if (!uploadedImages) {
      throw new ApiError(400, "error while upload image ");
    }

    const newProduct = await Product.create({
      title,
      description,
      category,
      image: uploadOnCloudinary,
      userId,
    });

    return res
      .status(201)
      .json({ message: "Product created", product: newProduct });
  } catch (err) {
    return res
      .status(500)
      .json({ message: "Server error", error: err.message });
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
      "userId",
      "username email"
    );

    return res.status(200).json({ products });
  } catch (err) {
    return res
      .status(500)
      .json({ message: "Server error", error: err.message });
  }
};

// Get a product by ID
export const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id).populate(
      "userId",
      "username email"
    );

    if (!product) return res.status(404).json({ message: "Product not found" });

    return res.status(200).json({ product });
  } catch (err) {
    return res
      .status(500)
      .json({ message: "Server error", error: err.message });
  }
};

// Claim a product
export const claimProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) return res.status(404).json({ message: "Product not found" });
    if (product.status !== "AVAILABLE")
      return res
        .status(400)
        .json({ message: "Product is already claimed or received" });

    product.status = "CLAIMED";
    await product.save();

    return res.status(200).json({ message: "Product claimed", product });
  } catch (err) {
    return res
      .status(500)
      .json({ message: "Server error", error: err.message });
  }
};

// Mark as received
export const markProductAsReceived = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) return res.status(404).json({ message: "Product not found" });
    if (product.status !== "CLAIMED")
      return res.status(400).json({ message: "Product is not claimed yet" });

    product.status = "RECEIVED";
    await product.save();

    return res
      .status(200)
      .json({ message: "Product marked as received", product });
  } catch (err) {
    return res
      .status(500)
      .json({ message: "Server error", error: err.message });
  }
};

// Delete a product
export const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) return res.status(404).json({ message: "Product not found" });

    if (String(product.userId) !== String(req.user._id)) {
      return res
        .status(403)
        .json({ message: "Unauthorized to delete this product" });
    }

    await Product.findByIdAndDelete(req.params.id);

    return res.status(200).json({ message: "Product deleted" });
  } catch (err) {
    return res
      .status(500)
      .json({ message: "Server error", error: err.message });
  }
};

// Get all products donated by a specific user
export const getUserProducts = async (req, res) => {
  try {
    const products = await Product.find({ userId: req.user._id });

    return res.status(200).json({ products });
  } catch (err) {
    return res
      .status(500)
      .json({ message: "Server error", error: err.message });
  }
};
