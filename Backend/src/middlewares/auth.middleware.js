import { ApiError } from "../utils/ApiError.js";
import { AUTH_FAILED, AUTH_REQUIRED } from "../constants.js";
import { verifyToken } from "../utils/Helper.js";
import { User } from "../db/models/user.model.js";

/**
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 */
export const authMiddleware = async (req, res, next) => {
  const token =
    req.cookies.accessToken ||
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

    req.user = user;

    next();
  } catch (error) {
    next(error);
  }
};
