
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import bcrypt from "bcrypt";
import { ApiError } from "./ApiError.js";
import { User } from "../db/models/user.model.js";

/**
 * Load environment variables
 */
dotenv.config();

/**
 * App Configuration
 */
export const appConfig = {
    debug: process.env.APP_DEBUG === 'true' || false,

    FRONTEND_URL: process.env.FRONTEND_URL || "http://localhost:5173",

    // Access Token
    ACCESS_TOKEN_SECRET: process.env.ACCESS_TOKEN_SECRET || "",
    ACCESS_TOKEN_EXPIRY: process.env.ACCESS_TOKEN_EXPIRY || "1d",

    // Refresh Token
    REFRESH_TOKEN_SECRET: process.env.REFRESH_TOKEN_SECRET || "",
    REFRESH_TOKEN_EXPIRY: process.env.REFRESH_TOKEN_EXPIRY || "10d",

    // Database
    CLOUDINARY_CLOUD_NAME: process.env.CLOUDINARY_CLOUD_NAME,
    CLOUDINARY_API_KEY: process.env.CLOUDINARY_API_KEY,
    CLOUDINARY_API_SECRET: process.env.CLOUDINARY_API_SECRET,

    // MongoDB Database
    MONGODB_URL: process.env.MONGODB_URL || process.env.DATABASE_URL,
}

/**
 * check if password is correct
 * @param {string} password 
 * @param {string} encryptedPassword 
 * @returns {Promise<boolean>}
 */
export function isPasswordCorrect(password, encryptedPassword) {
    return bcrypt.compare(password, encryptedPassword);
}

/**
 * check if password is correct
 * @param {string} password 
 * @param {string} encryptedPassword 
 * @returns {Promise<string>} 
 */
export function hashPassword(password) {
    return bcrypt.hash(password, 10);
}

/**
 * Generate access and refresh tokens
 * @param {string} userId 
 * @returns 
 */
export async function generateTokens(userId) {

    try {
        const user = await User.findById(userId)
        const accessToken = generateAccessToken(user);
        const refreshToken = generateRefreshToken(userId);

        user.refreshToken = refreshToken;
        await user.save({ validateBeforeSave: false })

        return {
            accessToken,
            refreshToken
        }

    } catch (error) {
      console.log(error);
      
        throw new ApiError(500, "An occurred while generating access and refresh tokens", error?.message)
    }
}

/**
 * Check if id is valid
 * @param {string} id 
 * @returns 
 */

export function isValidObjectId(id) {
    return /^[a-fA-F0-9]{24}$/.test(id);
}

/**
 * Generate access token
 * @param {string} userId 
 * @returns 
 */
export function generateAccessToken(user) {
    return jwt.sign(
        {
            _id: user._id,
            email: user.email,
            name: user.name,
        }, appConfig.ACCESS_TOKEN_SECRET, {
        expiresIn: appConfig.ACCESS_TOKEN_EXPIRY
    })
}

/**
 * Generate refresh token
 * @param {string} userId 
 * @returns 
 */
export function generateRefreshToken(userId) {
    return jwt.sign({
        _id: userId,
    }, appConfig.REFRESH_TOKEN_SECRET, {
        expiresIn: appConfig.REFRESH_TOKEN_EXPIRY
    })
}

/**
 * Verify token
 * @param {string} token 
 * @returns 
 */
export function verifyToken(token) {
    try {
        return jwt.verify(token, appConfig.ACCESS_TOKEN_SECRET)

    } catch (error) {
        if (error.name === 'TokenExpiredError') {
            throw new ApiError(401, 'Token has expired.', error);
        }
        throw new ApiError(401, 'Invalid token');;
    }
}

/**
 * Verify refresh token
 * @param {string} token 
 * @returns 
 */
export function verifyRefreshToken(token) {
    try {
        return jwt.verify(token, appConfig.REFRESH_TOKEN_SECRET)
    } catch (error) {
        if (error.name === 'TokenExpiredError') {
            throw new ApiError(401, 'Token has expired.',);
        }
        throw new ApiError(401, 'Invalid token');;
    }
}