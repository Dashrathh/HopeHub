const { PrismaClient } = require("../../generated/prisma");
const { uploadOnCloudinary } = require("../utils/cloudinary");

const prisma = new PrismaClient();

// Create Product
const createProduct = async (req, res) => {
  try {
    const { title, description, category, image, userId } = req.body;

    if (!title || !category || !description || !description || !price) {
      throw new ApiError(400, "All field are required");
    }

    const uploadedImages = Array.isArray(req.files?.images)
      ? await uploadOnCloudinary(req.files.images)
      : req.files?.images
      ? [await uploadOnCloudinary([req.files.images])]
      : [];

    console.log(uploadedImages);

    if (!uploadedImages) {
      throw new ApiError(400, "error while upload image ");
    }

    const product = await prisma.product.create({
      data: {
        title,
        description,
        category,
        image: uploadedImages,
        userId,
      },
    });

    res.status(201).json({ message: "Product created successfully", product });
  } catch (error) {
    res.status(500).json({
      message: "Internal server error || error while creating product",
    });
  }
};

// Get All Products
const getAllProducts = async (req, res) => {
  try {
    const allProducts = await prisma.product.findMany({
      include: {
        listedBy: true,
      },
    });

    if (!allProducts || allProducts.length === 0) {
      return res.status(404).json({ message: "No products found" });
    }

    res
      .status(200)
      .json({ message: "Get all products successfully", allProducts });
  } catch (error) {
    res.status(500).json({
      message: "Internal error while getting all products",
      error,
    });
  }
};

// Get Single Product
const getSingleProduct = async (req, res) => {
  const { id } = req.params;

  try {
    const singleProduct = await prisma.product.findUnique({
      where: { id },
      include: { listedBy: true },
    });

    if (!singleProduct) {
      return res.status(404).json({ message: "Product not found" });
    }

    res
      .status(200)
      .json({ message: "Get single product successfully", singleProduct });
  } catch (error) {
    res.status(500).json({
      message: "Internal error while getting single product",
      error,
    });
  }
};

// Update Product
const updateProduct = async (req, res) => {
  const { id } = req.params;
  const { title, description, category, image, userId } = req.body;

  try {
    const updatedProduct = await prisma.product.update({
      where: { id },
      data: {
        title,
        description,
        category,
        image,
        userId,
      },
    });

    res.status(200).json({
      message: "Product updated successfully",
      product: updatedProduct,
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal error while updating product",
      error,
    });
  }
};

// Delete Product
const deleteProduct = async (req, res) => {
  const { id } = req.params;

  try {
    await prisma.product.delete({
      where: { id },
    });

    res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    res.status(500).json({
      message: "Internal error while deleting product",
      error,
    });
  }
};

module.exports = {
  createProduct,
  getAllProducts,
  getSingleProduct,
  updateProduct,
  deleteProduct,
};
