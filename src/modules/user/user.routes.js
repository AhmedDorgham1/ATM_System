import { Router } from "express";
import * as UC from "./user.controller.js";
import * as UV from "./user.validations.js";
import { validation } from "../../middlewares/validation.js";

const userRouter = Router();

userRouter.post("/register", validation(UV.register), UC.register);
userRouter.post("/login", validation(UV.login), UC.login);

export default userRouter;
