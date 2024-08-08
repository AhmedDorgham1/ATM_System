import { Router } from "express";
import * as AC from "./account.controller.js";
import { auth } from "../../middlewares/auth.js";
import { systemRoles } from "../../utils/systemRoles.js";
import { validation } from "../../middlewares/validation.js";
import * as AV from "./account.validations.js";

const accountRouter = Router();

accountRouter.post("/", validation(AV.createAccount), auth(Object.values(systemRoles)), AC.createAccount);

accountRouter.post(
  "/deposit",
  validation(AV.deposit),

  auth(Object.values(systemRoles)),
  AC.deposit
);

accountRouter.post("/withdraw", validation(AV.withdraw), auth(Object.values(systemRoles)), AC.withdraw);

accountRouter.get("/balance", auth(Object.values(systemRoles)), AC.getBalance);

accountRouter.get("/transactions", auth(Object.values(systemRoles)), AC.getTransactions);

export default accountRouter;
