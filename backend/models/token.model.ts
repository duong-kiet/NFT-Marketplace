import mongoose from "mongoose";

const TokenSchema = new mongoose.Schema({
  tokenId: String,
  name: String,
  description: String,
  image: String,
});

export const Token = mongoose.model("Token", TokenSchema);
