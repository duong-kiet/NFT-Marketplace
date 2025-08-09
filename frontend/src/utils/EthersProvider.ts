import { ethers } from "ethers";

export const getProvider = () => new ethers.BrowserProvider(window.ethereum);

export const getSigner = async () => {
  const provider = getProvider();
  return await provider.getSigner();
};
