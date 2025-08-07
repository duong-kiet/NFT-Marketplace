import express, { Router, Request, Response } from "express";
const router: Router = express.Router();
import Moralis from "moralis";
import { KTKContractAddress } from "../constants/addresses";

router.get("/", async (req: Request, res: Response) => {
  try {
    let response;
    let tries = 0;
    const maxTries = 10; // Giới hạn số lần thử để tránh treo server
    do {
      response = await Moralis.EvmApi.nft.getContractNFTs({
        chain: "0x13882",
        format: "decimal",
        address: KTKContractAddress,
        normalizeMetadata: true,
      });
      tries++;
      // Nếu còn metadata null thì chờ 2s rồi thử lại
      if (response.raw.result.some((item: any) => item.metadata === null)) {
        await new Promise((resolve) => setTimeout(resolve, 2000));
      } else {
        break;
      }
    } while (tries < maxTries);

    res.status(200).json(response.raw.result);
  } catch (error) {
    console.error("Error fetching NFTs:", error);
    res.status(500).send("Error fetching NFTs");
  }
});

router.get("/:walletAddress", async (req: Request, res: Response) => {
  try {
    const walletAddress = req.params.walletAddress;
    const response = await Moralis.EvmApi.nft.getWalletNFTs({
      chain: "0x13882",
      format: "decimal",
      normalizeMetadata: true,
      tokenAddresses: [KTKContractAddress],
      mediaItems: false,
      address: walletAddress,
    });

    res.status(200).json(response.raw.result);
  } catch (error) {
    console.error("Error fetching user NFTs:", error);
    res.status(500).send("Error fetching user NFTs");
  }
});

export default router;
