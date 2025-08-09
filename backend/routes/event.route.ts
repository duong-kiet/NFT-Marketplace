import express, { Router, Request, Response } from "express";
const router: Router = express.Router();
import { Mint } from "../models/mint.model";
import { Transfer } from "../models/transfer.model";
import { Token } from "../models/token.model";

router.get("/mint", async (req: Request, res: Response) => {
  try {
    const filter: Record<string, any> = {};

    if (req.query.address) {
      filter.address = new RegExp(`^${req.query.address}$`, "i");
    }
    // How to optimize query ???
    const mints = await Mint.find(filter);

    const result = await Promise.all(
      mints.map(async (mint) => {
        const tokenId = mint.tokenId;
        const metadata = await Token.findOne({
          tokenId: tokenId,
        });

        return {
          ...mint.toObject(),
          name: metadata!.name,
          description: metadata!.description,
          image: metadata!.image,
        };
      })
    );

    res.status(200).json({
      message: "Get mints successfully",
      mints: result,
    });
  } catch (error) {
    console.error("Error fetching mint events:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get("/transfer", async (req: Request, res: Response) => {
  try {
    const filter: Record<string, any> = {};

    if (req.query.from) {
      filter.from = req.query.from;
    }
    const transfers = await Transfer.find(filter);

    const result = await Promise.all(
      transfers.map(async (transfer) => {
        const tokenId = transfer.tokenId;
        const metadata = await Token.findOne({
          tokenId: tokenId,
        });

        return {
          ...transfer.toObject(),
          name: metadata!.name,
          description: metadata!.description,
          image: metadata!.image,
        };
      })
    );

    res.status(200).json({
      message: "Get transferd successfully",
      transfers: result,
    });
  } catch (error) {
    console.error("Error fetching transfer events:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

export default router;
