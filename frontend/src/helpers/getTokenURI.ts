import { contractProvider } from "../utils/EthersContract";

export async function getTokenURI(token_id: string) {
  const uri = await contractProvider.tokenURI(token_id);
  return uri;
}
