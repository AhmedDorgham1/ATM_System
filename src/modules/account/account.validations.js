import joi from "joi";
import { generalFields } from "../../utils/generalFields.js";

export const createAccount = {
  body: joi.object({
    balance: joi.number().required(),
  }),
  headers: generalFields.headers.required(),
};

export const deposit = {
  body: joi.object({
    amount: joi.number().required(),
  }),
  headers: generalFields.headers.required(),
};

export const withdraw = {
  body: joi.object({
    amount: joi.number().required(),
  }),
  headers: generalFields.headers.required(),
};
