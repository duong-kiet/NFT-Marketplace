import express, { Request, Response } from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import cors from "cors";
import Moralis from "moralis";

dotenv.config();

const port = process.env.PORT || 3000;

const app = express();

app.use(cors());
// Dùng khi gửi form
app.use(bodyParser.urlencoded({ extended: false }));

// Dùng khi gửi body JSON
app.use(bodyParser.json());

import routes from "./routes/index.route";

routes(app);

(async () => {
  await Moralis.start({ apiKey: process.env.MORALIS_API_KEY });
  console.log("✅ Moralis SDK started");

  // Start your Express app
  app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });
})();
