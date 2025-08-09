import { getProvider } from "../utils/EthersProvider";
import { Contract } from "ethers";
import { KTKContractAddress } from "../constants/addresses";

const abi = [
  "function tokenURI(uint256 tokenId) view returns (string memory)",
  "event Minted(address indexed to, uint256 indexed tokenId, string uri)",
  "event Transfer(address indexed from, address indexed to, uint256 indexed tokenId)",
];

const provider = getProvider();
const contract = new Contract(KTKContractAddress, abi, provider);

export { contract };
