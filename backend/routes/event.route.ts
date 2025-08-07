import { getProvider } from "../utils/EthersProvider";
import express, { Router, Request, Response } from "express";
const router: Router = express.Router();
import { Contract, ethers } from "ethers";

const abi = [
  "function tokenURI(uint256 tokenId) view returns (string memory)",
  "event Minted(address indexed to, uint256 indexed tokenId, string uri)",
  "event Transfer(address indexed from, address indexed to, uint256 indexed tokenId)",
];
const iface = new ethers.Interface(abi);

const provider = getProvider();
const contract = new Contract(
  "0x50193439ee324B0397311eE591786b8730285cAD",
  abi,
  provider
);

router.get("/mint", async (req: Request, res: Response) => {
  try {
    const result: Array<any> = [];

    // Query for the Minted event
    const filter = contract.filters.Minted;
    const mints = await contract.queryFilter(filter);

    for (const mint of mints) {
      const parsed = iface.parseLog(mint)!;
      const address = parsed.args.to;
      const tokenId = parsed.args.tokenId.toString();
      const uri = parsed.args.uri;

      result.push({ address, tokenId, uri });
    }

    res.status(200).json({
      message: "Mint events fetched successfully",
      result: result,
    });
  } catch (error) {
    console.error("Error fetching mint events:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get("/transfer", async (req: Request, res: Response) => {
  try {
    const result: Array<any> = [];

    // Query for the Transfer event
    const filter = contract.filters.Transfer;
    const transfers = await contract.queryFilter(filter);

    for (const transfer of transfers) {
      const parsed = iface.parseLog(transfer)!;
      const from = parsed.args.from;
      if (from !== "0x0000000000000000000000000000000000000000") {
        const to = parsed.args.to;
        const tokenId = parsed.args.tokenId.toString();

        result.push({ from, to, tokenId });
      }
    }

    res.status(200).json({
      message: "Transfer events fetched successfully",
      result: result,
    });
  } catch (error) {
    console.error("Error fetching transfer events:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

export default router;
