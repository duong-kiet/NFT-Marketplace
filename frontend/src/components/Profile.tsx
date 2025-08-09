import { Container, Typography } from "@mui/material";
import { AddressContext } from "../context/AddressContext";
import { useContext, useEffect, useState } from "react";
import MintSection from "./MintSection";
import { Stack } from "@mui/material";
import TransferMyNFTCollection from "./TransferMyNFTCollection";
import Wallet from "./Wallet";
import { ethers } from "ethers";
import { getProvider } from "../utils/EthersProvider";

export default function Profile() {
  const { address } = useContext(AddressContext);
  const [balance, setBalance] = useState<number | string>(0);

  useEffect(() => {
    if (!address) {
      setBalance(0);
      return;
    }
    const fetchBalance = async () => {
      const provider = getProvider();
      const balanceWei = await provider.getBalance(address);
      const balanceEth = ethers.formatEther(balanceWei);
      setBalance(balanceEth);
    };
    fetchBalance();
  }, [address]);

  return (
    <Container sx={{ marginY: "30px" }}>
      {address ? (
        <Stack>
          <Container
            sx={{
              display: "flex",
              justifyContent: "space-around",
              alignItems: "center",
            }}
          >
            <Wallet address={address} balance={balance} />
            <MintSection />
          </Container>
          <TransferMyNFTCollection />
        </Stack>
      ) : (
        <Typography variant="h6">Bạn chưa kết nối tới ví metamask</Typography>
      )}
    </Container>
  );
}
