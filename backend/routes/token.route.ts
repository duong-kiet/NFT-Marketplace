import express, { Router, Request, Response } from "express";
const router: Router = express.Router();
import { Token } from "../models/token.model";

router.get("/", async (req: Request, res: Response) => {
  try {
    const tokens = await Token.find({});

    res.status(200).json({
      message: "Get all tokens successfully",
      tokens: tokens,
    });
  } catch (error) {
    console.error("Error get tokens:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get("/:id", async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const token = await Token.findOne({
      tokenId: id,
    });

    res.status(200).json({
      message: "Get token successfully",
      token: token,
    });
  } catch (error) {
    console.error("Error get tokens:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

export default router;
