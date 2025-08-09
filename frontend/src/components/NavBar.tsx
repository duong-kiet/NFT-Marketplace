import { Button } from "@mui/material";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
// import { ethers } from "ethers";
import { useContext } from "react";
import { AddressContext } from "../context/AddressContext";

declare global {
  interface Window {
    ethereum?: any;
  }
}

export default function NavBar() {
  const { setAddress } = useContext(AddressContext);

  const connectWallet = async () => {
    if (window.ethereum) {
      try {
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        setAddress(accounts[0]);
      } catch (error) {
        console.log("Error connecting ...");
      }
    } else {
      alert("Metamask is not detected");
    }
  };

  return (
    <Container
      sx={{
        display: "flex",
        justifyContent: "space-between",
        padding: "14px 26px",
      }}
    >
      <Typography sx={{ fontWeight: 600, fontSize: 40, color: "#677ce6" }}>
        NFT Market
      </Typography>

      <Button
        variant="contained"
        sx={{
          borderRadius: 16,
          backgroundColor: "#677ce6",
          fontSize: "14px",
          fontWeight: 600,
          padding: "6px 20px",
        }}
        onClick={connectWallet}
      >
        Kết nối ví
      </Button>
    </Container>
  );
}
