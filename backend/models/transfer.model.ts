import mongoose from "mongoose";

const TransferSchema = new mongoose.Schema({
  from: String,
  to: String,
  tokenId: String,
});

export const Transfer = mongoose.model("Transfer", TransferSchema);
