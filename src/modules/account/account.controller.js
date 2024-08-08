import Account from "../../../database/models/account.model.js";
import transactionModel from "../../../database/models/transaction.model.js";
import { AppError, catchAsyncHandler } from "../../utils/error.js";

const getAccount = async (userId) => {
  const account = await Account.findOne({ user: userId });
  if (!account) {
    throw new AppError("Account does not exist", 404);
  }
  return account;
};

export const createAccount = catchAsyncHandler(async (req, res, next) => {
  const { balance } = req.body;
  const { _id: userId } = req.user;

  const existingAccount = await Account.findOne({ user: userId });
  if (existingAccount) {
    return next(new AppError("Account already exists", 409));
  }

  const account = await Account.create({
    user: userId,
    balance,
    status: "Active",
  });

  res.status(201).json({ msg: "Account created successfully", account });
});

export const deposit = catchAsyncHandler(async (req, res, next) => {
  const { amount } = req.body;
  const { _id: userId } = req.user;

  const account = await getAccount(userId);
  account.balance += amount;

  const transaction = await transactionModel.create({
    accountId: userId,
    transactionType: "Deposit",
    amount,
    transactionDate: Date.now(),
    transactionStatus: "Success",
  });
  account.accountHistory.push(transaction);

  await account.save();

  res.status(200).json({ msg: "Amount deposited successfully", account });
});

export const withdraw = catchAsyncHandler(async (req, res, next) => {
  const { amount } = req.body;
  const { _id: userId } = req.user;

  const account = await getAccount(userId);
  if (account.balance < amount) {
    return next(new AppError("Insufficient balance", 400));
  }
  account.balance -= amount;

  const transaction = await transactionModel.create({
    accountId: userId,
    transactionType: "Withdrawal",
    amount,
    transactionDate: Date.now(),
    transactionStatus: "Success",
  });
  account.accountHistory.push(transaction);

  await account.save();

  res.status(200).json({ msg: "Amount withdrawn successfully", account });
});

export const getBalance = catchAsyncHandler(async (req, res, next) => {
  const { _id: userId } = req.user;

  const account = await getAccount(userId);

  res.status(200).json({ msg: "Balance retrieved successfully", balance: account.balance });
});

export const getTransactions = catchAsyncHandler(async (req, res, next) => {
  const { _id: userId } = req.user;

  const account = await getAccount(userId);
  const transactions = await transactionModel.find({ accountId: userId });

  res.status(200).json({ msg: "Transactions retrieved successfully", transactions });
});
