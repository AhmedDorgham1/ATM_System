import jwt from "jsonwebtoken";
import { AppError, catchAsyncHandler } from "../utils/error.js";
import User from "../../database/models/user.model.js";

export const auth = (roles = []) => {
  return catchAsyncHandler(async (req, res, next) => {
    try {
      const { token } = req.headers;
      if (!token) {
        next(new AppError("token is not exists", 400));
      }
      if (!token.startsWith("omar__")) {
        next(new AppError("invalid bearer token", 400));
      }

      const newToken = token.split("omar__")[1];
      if (!newToken) {
        next(new AppError("invalid token", 400));
      }

      const decoded = jwt.verify(newToken, process.env.signatureKey);
      if (!decoded?.username) {
        next(new AppError("invalid token payload ", 400));
      }

      const user = await User.findOne({ username: decoded.username });
      if (!user) next(new AppError("user does not exists", 409));

      console.log("here");

      if (!roles.includes(user.role)) next(new AppError("you don't have permission", 401));

      req.user = user;
      next();
    } catch (error) {
      throw new AppError("catch error in auth", 400);
    }
  });
};
