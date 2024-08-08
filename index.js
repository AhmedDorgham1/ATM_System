import accountRouter from "./src/modules/account/account.routes.js";
import connectionDB from "./database/dbConnection.js";
import userRouter from "./src/modules/user/user.routes.js";
import { AppError } from "./src/utils/error.js";
import dotenv from "dotenv";
import path from "path";
import express from "express";

dotenv.config({ path: path.resolve("config/.env") });

const app = express();

connectionDB();
const port = process.env.PORT || 3000;

app.use(express.json());

app.use("/users", userRouter);
app.use("/account", accountRouter);

app.use("*", (req, res, next) => {
  next(new AppError(`invalid URL ${req.originalUrl} not found`, 404));
});

app.use((err, req, res, next) => {
  const { message, statusCode } = err;
  res.status(statusCode || 500).json(message);
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
