import jwt from "jsonwebtoken";
import { Admin } from "../db/models/admin.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { AUTH_FAILED } from "../constants.js";
import { generateTokens, isPasswordCorrect } from "../utils/helper.js";

const cookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "lax",
};

// 📌 Register Admin
export const registerAdmin = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const existingAdmin = await Admin.findOne({ email });
    if (existingAdmin) {
      return res.status(409).json(new ApiError(409, "Admin already exists!"));
    }

    const newAdmin = await Admin.create({ name, email, password });

    return res
      .status(201)
      .json(new ApiResponse({}, "Admin registered successfully!", 201));
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json(
        new ApiError(500, "Error during admin registration", error.message)
      );
  }
};

// 📌 Login Admin
export const loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;

    const admin = await Admin.findOne({ email }).select("+password");

    if (!admin || !isPasswordCorrect(password, admin.password)) {
      return res.status(401).json(new ApiError(401, AUTH_FAILED));
    }

    const { accessToken, refreshToken } = await generateTokens(admin._id);

    const loggedInAdmin = await Admin.findById(admin._id).select("-password");

    return res
      .cookie("accessToken", accessToken, cookieOptions)
      .json(
        new ApiResponse(
          { admin: loggedInAdmin, accessToken, refreshToken },
          "Admin logged in successfully!"
        )
      );
  } catch (error) {
    return res
      .status(500)
      .json(new ApiError(500, "Error during admin login", error.message));
  }
};

// 📌 Get Admin Profile
export const getAdminProfile = async (req, res) => {
  try {
    const admin = await Admin.findById(req.admin._id).select("-password");
    if (!admin)
      return res.status(404).json(new ApiError(404, "Admin not found"));

    return res.status(200).json({ admin });
  } catch (error) {
    return res
      .status(500)
      .json(new ApiError(500, "Error getting admin profile", error.message));
  }
};

// 📌 Logout Admin
export const logoutAdmin = async (req, res) => {
  try {
    res.clearCookie("accessToken");
    return res.status(200).json({ message: "Admin logged out successfully" });
  } catch (error) {
    return res
      .status(500)
      .json(new ApiError(500, "Error logging out", error.message));
  }
};
