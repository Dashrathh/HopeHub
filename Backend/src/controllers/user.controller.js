import jwt from "jsonwebtoken";
import { User } from "../db/models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { AUTH_FAILED } from "../constants.js";
import { generateTokens, isPasswordCorrect } from "../utils/Helper.js";


const cookieOptions = {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production" ? true : false,
    sameSite: "lax",
}

// Register a new user
export const registerUser = async (req, res) => {
  try {

    const { email, password, name, mobile } = req.body;

    const user = await User.findOne({
      email
    })

    if (user) {
      return res.status(409).json(new ApiError(409, "User already exists!"));
    }

    const newUser = await User.create({
      email,
      password,
      name,
      mobile
    })

    return res.status(201).json(new ApiResponse({}, "Your account created successfully!", 201))

  } catch (error) {
    console.log(error);

    return res.status(500).json(new ApiError(500, "An error occurred while signup", error?.message))
  }
};

// Login user
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({
      email
    }).select("+password");

    if (!user) {
      return res.status(401).json(new ApiError(401, AUTH_FAILED));
    }

    /**
     * Check password is correct
     */
    if (!isPasswordCorrect(password, user.password)) {
      return res.status(401).json(new ApiError(401, AUTH_FAILED));
    }

    const { accessToken, refreshToken } = await generateTokens(user._id);

    const loggedInUser = await User.findById(user._id).select("-password -refreshToken")

    return res
      .cookie("accessToken", accessToken, cookieOptions)
      .json(new ApiResponse({ user: loggedInUser, accessToken, refreshToken }, "You've logged in successfully!"))

  } catch (error) {
    console.log(error);

    return res.status(500).json(new ApiError(500, "An error occurred while login you in", error?.message))
  }
};

// Refresh Token
export const handleRefreshToken = async (req, res) => {
  const { refreshToken } = req.body;

  if (!refreshToken)
    return res.status(400).json({ message: "No refresh token provided" });

  try {
    const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
    const user = await User.findById(decoded._id);

    if (!user || user.refreshToken !== refreshToken)
      return res.status(403).json({ message: "Invalid refresh token" });

    const newAccessToken = user.generateAccessToken();
    const newRefreshToken = user.generateRefreshToken();

    user.refreshToken = newRefreshToken;
    await user.save();

    return res.status(200).json({
      accessToken: newAccessToken,
      refreshToken: newRefreshToken,
    });
  } catch (err) {
    return res
      .status(403)
      .json({ message: "Refresh token expired or invalid" });
  }
};

// Logout user (invalidate refresh token)
export const logoutUser = async (req, res) => {
  try {
    const { refreshToken } = req.body;
    if (!refreshToken)
      return res.status(400).json({ message: "Refresh token required" });

    const user = await User.findOne({ refreshToken });
    if (user) {
      user.refreshToken = null;
      await user.save();
    }

    return res.status(200).json({ message: "Logged out successfully" });
  } catch (err) {
    return res
      .status(500)
      .json({ message: "Server error", error: err.message });
  }
};

// Get Profile (Protected Route)
export const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select(
      "-password -refreshToken"
    );
    if (!user) return res.status(404).json({ message: "User not found" });

    return res.status(200).json({ user });
  } catch (err) {
    return res
      .status(500)
      .json({ message: "Server Error", error: err.message });
  }
};
