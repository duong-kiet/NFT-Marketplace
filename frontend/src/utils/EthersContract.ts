import { ethers } from "ethers";
import { getProvider, getSigner } from "./EthersProvider";
import KTKContract from "../../../artifacts/contracts/KietToken.sol/KietToken.json";
import { KTKContractAddress } from "../constants/addresses";

const provider = getProvider();
const signer = await getSigner();

export const contractSigner = new ethers.Contract(
  KTKContractAddress,
  KTKContract.abi,
  signer
);

export const contractProvider = new ethers.Contract(
  KTKContractAddress,
  KTKContract.abi,
  provider
);
