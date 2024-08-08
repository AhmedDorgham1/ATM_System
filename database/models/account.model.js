import mongoose, { Types } from "mongoose";

const accountSchema = mongoose.Schema(
  {
    user: {
      type: Types.ObjectId,
      ref: "user",
      required: true,
    },
    status: {
      type: String,
      enum: ["Active", "Inactive", "Blocked"],
    },
    accountHistory: [
      {
        type: Types.ObjectId,
        ref: "transaction",
      },
    ],
    balance: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const Account = mongoose.model("account", accountSchema);

export default Account;
