import express, { Request, Response } from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import cors from "cors";
import Moralis from "moralis";
import { connectDB } from "./config/database";
import { contract } from "./contracts/index.contract";

import { Token } from "./models/token.model";
import { Mint } from "./models/mint.model";
import { Transfer } from "./models/transfer.model";

dotenv.config();

const PORT = process.env.PORT || 3000;
const DB_URI = process.env.MONGO_URI!;

const app = express();

app.use(cors());
// Dùng khi gửi form
app.use(bodyParser.urlencoded({ extended: false }));

// Dùng khi gửi body JSON
app.use(bodyParser.json());

import routes from "./routes/index.route";

routes(app);

contract.on("Transfer", async (from, to, tokenId, event) => {
  console.log(`${from} => ${to}: ${tokenId}`);

  if (from === "0x0000000000000000000000000000000000000000") {
    return;
  }

  const transfer = new Transfer({
    from,
    to,
    tokenId,
  });
  await transfer.save();
});

contract.on("Minted", async (to, tokenId, uri, event) => {
  console.log(`$Minted to ${to}: ${tokenId} with uri: ${uri}`);

  const mint = new Mint({
    address: to,
    tokenId,
    uri,
  });
  await mint.save();

  const response = await fetch(uri);
  const metadata = await response.json();

  const token = new Token({ tokenId, ...metadata });
  await token.save();
});

(async () => {
  await Moralis.start({ apiKey: process.env.MORALIS_API_KEY });
  console.log("✅ Moralis SDK started");
  await connectDB(DB_URI);

  // Start your Express app
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
})();
