import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import db from "../utils/db.js";

export const createProduct = async (req, res) => {
  try {
    const { title, description, category, image, userId } = req.body;
    if (
      ![title, description, category, image, userId].some(
        (field) => field.trim() === ""
      )
    ) {
      return res.status(400).json(new ApiError(400, "All fields are required"));
    }
    let uploadedImages = [];

    if (req.files?.images) {
      const files = req.files.image;

      if (Array.isArray(files)) {
        const results = await uploadOnCloudinary(files);
        uploadedImages = results.filter((url) => url !== null);
        const result = await uploadOnCloudinary([files]);
        uploadedImages = result.filter((url) => url !== null);
      }
    }
    const product = await db.product.create({
      data: {
        title,
        description,
        category,
        image: uploadedImages,
        userId,
      },
    });

    console.log("all product are", product);
    return res
      .status(201)
      .json(new ApiResponse(product, "Product has been created successful"));
  } catch (error) {
    return res
      .status(500)
      .json(
        new ApiError(
          500,
          "internal server error || error while create product",
          error.message
        )
      );
  }
};

/**
 * List all products
 * @param {*} req
 * @param {*} res
 */
export const getAllProducts = async (req, res) => {
  try {
    const AllProduct = await db.product.findMany({
      include: {
        user: true,
      },
    });
    if (!AllProduct) {
      return res.status(401).json(new ApiError(404, "Product not found!"));
    }
    res
      .status(200)
      .json(new ApiResponse(AllProduct, "Get all product successfully"));
  } catch (error) {
    // console.error(error)
    res
      .status(500)
      .json(
        new ApiError(
          500,
          "internal error while getting all product",
          error.message
        )
      );
  }
};

export const getSingleProduct = async (req, res) => {
  const { id } = req.params;
  try {
    const singleProduct = await db.product.findUnique({
      where: { id },
      include: { user: true },
    });
    if (!singleProduct) {
      return res.status(401).json(new ApiError(404, "Product not found!"));
    }
    res
      .status(201)
      .json(new ApiResponse(singleProduct, "Product fetched successfully"));
  } catch (error) {
    return res
      .status(500)
      .json(
        new ApiError(
          500,
          "internal error ||  while getting single product  ",
          error.message
        )
      );
  }
};

//   update Products
export const updateProduct = async (req, res) => {
  const { id } = req.params;
  const { title, description, category, image, userId } = req.body;
  if (
    ![title, description, category, image, userId].some(
      (field) => field.trim() === ""
    )
  ) {
    return res.status(400).json(new ApiError(400, "All fields are required"));
  }
  try {
    const updatedProduct = await db.product.update({
      where: { id },
      data: {
        title,
        description,
        category,
        image,
        userId,
      },
    });
    return res
      .status(204)
      .json(new ApiResponse(updatedProduct, "Product updated successfully"));
  } catch (error) {
    return res
      .status(500)
      .json(
        new ApiError(
          500,
          "internal error ||  while updating product  ",
          error.message
        )
      );
  }
};

export const deleteProduct = async (req, res) => {
  const { id } = req.params;
  try {
    await db.product.delete({
      where: { id },
    });

    return res
      .status(200)
      .json(new ApiResponse({}, "Product deleted successfully"));
  } catch (error) {
    return res
      .status(500)
      .json(
        new ApiError(
          500,
          "internal error ||  while removing the product  ",
          error.message
        )
      );
  }
};
