import { Request, Response } from "express";

import { PrismaClient } from "../../generated/prisma";
import { Prisma } from "@prisma/client";
// create product

const prisma = new PrismaClient();

const createProduct = async (req: Request, res: Response) => {
  try {
    const { title, description, category, image, userId } = req.body;

    let uploadedImages: string[] = [];

    if (req.files?.images) {
      const files = req.files.images;

      if (Array.isArray(files)) {
        const results = await uploadOnCloudinary(files); // returns (string | null)[]
        uploadedImages = results.filter((url): url is string => url !== null); // removes null
      } else {
        const result = await uploadOnCloudinary([files]); // returns (string | null)[]
        uploadedImages = result.filter((url): url is string => url !== null);
      }
    }

    const product = await prisma.product.create({
      data: {
        title,
        description,
        category,
        image,
        userId,
      },
    });
    res.status(201).json({ message: "product create successfull", product });
  } catch (error) {
    res.status(500).json({
      message: "internal server error || error while create product ",
    });
  }
};
//  get all product

const getAllProducts = async (req: Request, res: Response) => {
  try {
    const AllProduct = await prisma.product.findMany({
      include: {
        listedBy: true,
      },
    });
    if (!AllProduct) {
      res.status(401).json({ Message: "product not found " });
    }

    res
      .status(201)
      .json({ message: "Get all product successfully", AllProduct });
  } catch (error) {
    // console.error(error)
    res
      .status(500)
      .json({ message: "internal error while getting all product ", error });
  }
};

//  get single product

const getSingleProduct = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const singleProduct = await prisma.product.findUnique({
      where: { id },
      include: { listedBy: true },
    });

    if (!singleProduct) {
      res.status(404).json({ message: "Product not found" });
    }
    res
      .status(201)
      .json({ message: "Get all product successfully", singleProduct });
  } catch (error) {
    res.status(500).json({
      message: "internal error ||  while getting single product  ",
      error,
    });
  }
};

//   update Products

const updateProduct = async (req: Request, res: Response) => {
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
    res
      .status(500)
      .json({ message: "Internal error while updating product", error });
  }
};

const deleteProduct = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    await prisma.product.delete({
      where: { id },
    });

    res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal error while deleting product", error });
  }
};

export {
  createProduct,
  getAllProducts,
  getSingleProduct,
  updateProduct,
  deleteProduct,
};
