import joi from "joi";

export const register = {
  body: joi.object({
    username: joi.string().required(),
    password: joi.string().required(),
  }),
};

export const login = {
  body: joi.object({
    username: joi.string().required(),
    password: joi.string().required(),
  }),
};
