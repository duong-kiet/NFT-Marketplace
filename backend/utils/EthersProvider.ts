import { ethers } from "ethers";

export const getProvider = () => {
  return new ethers.JsonRpcProvider(process.env.INFURA_API_KEY);
};

export const getSigner = async () => {
  const provider = getProvider();
  const signer = await provider.getSigner();
  return signer;
};
