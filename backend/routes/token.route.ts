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

router.get("/", async (req: Request, res: Response) => {
  try {
    const result: Array<any> = [];

    // Query for the Minted event
    const filter = contract.filters.Minted;
    const mints = await contract.queryFilter(filter);

    for (const mint of mints) {
      const parsed = iface.parseLog(mint)!;
      const tokenId = parsed.args.tokenId.toString();
      const uri = parsed.args.uri;

      const response = await fetch(uri);
      const metadata = await response.json();

      result.push({
        tokenId,
        name: metadata.name,
        description: metadata.description,
        image: metadata.image,
      });
    }

    res.status(200).json({
      message: "Get all tokens successfully",
      result: result,
    });
  } catch (error) {
    console.error("Error get tokens:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

export default router;
