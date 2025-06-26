import { ApiError } from "../utils/ApiError.js";
import { AUTH_FAILED, AUTH_REQUIRED, FORBIDDEN_ACCESS } from "../constants.js";
import { verifyToken } from "../utils/helper.js";
import { User } from "../db/models/user.model.js";

/**
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 */
export const adminMiddleware = async (req, res, next) => {
    const token =
        req.cookies?.accessToken ||
        req.headers.authorization?.replace("Bearer ", "")?.trim();

    if (!token) {
        return res.status(401).json(new ApiError(401, AUTH_REQUIRED));
    }

    try {
        const decodeToken = verifyToken(token);

        if (!decodeToken) {
            throw new ApiError(401, AUTH_FAILED);
        }

        const user = await User.findById(decodeToken._id);

        if (!user) {
            throw new ApiError(401, AUTH_FAILED);
        }

        if (user.role !== "ADMIN") {
            throw new ApiError(401, FORBIDDEN_ACCESS);
        }

        next();
    } catch (error) {
        next(error);
    }
};
