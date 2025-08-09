import mongoose from "mongoose";

const MintSchema = new mongoose.Schema({
  address: String,
  tokenId: String,
  uri: String,
});

export const Mint = mongoose.model("Mint", MintSchema);
