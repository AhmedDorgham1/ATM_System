import User from "../../../database/models/user.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import { AppError, catchAsyncHandler } from "../../utils/error.js";

export const register = catchAsyncHandler(async (req, res, next) => {
  const { username, password } = req.body;

  const userExist = await User.findOne({ username });
  if (userExist) {
    return next(new AppError(" user already registered", 409));
  }

  const hash = bcrypt.hashSync(password, Number(process.env.SALT_ROUNDS));
  const user = await User.create({ username, password: hash });

  res.status(201).json({ msg: "User registered successfully", user });
});

export const login = catchAsyncHandler(async (req, res, next) => {
  const { username, password } = req.body;

  const user = await User.findOne({ username });
  if (!user || !bcrypt.compareSync(password, user.password)) {
    return next(new AppError("invalid credentials", 404));
  }

  const token = jwt.sign({ username, role: user.role }, process.env.SIGNATURE_KEY);

  res.status(200).json({ msg: "User logged in successfully", token });
});
