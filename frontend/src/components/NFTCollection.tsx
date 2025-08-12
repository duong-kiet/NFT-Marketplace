import { Container, Typography, Box, Switch } from "@mui/material";
import NFT from "./NFT";
import { useEffect, useState, useContext } from "react";
import { AddressContext } from "../context/AddressContext";

import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

const responsive = {
  superLargeDesktop: {
    breakpoint: { max: 4000, min: 3000 },
    items: 5,
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 4,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
  },
};

export default function NFTCollection() {
  const { address } = useContext(AddressContext);
  const [checked, setChecked] = useState(false);
  const [NFTCollection, setNFTCollection] = useState<Array<any>>([]);

  const handleSwitchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.checked);
  };

  useEffect(() => {
    const fetchNFTCollection = async () => {
      try {
        if (checked) {
          const response = await fetch(`http://localhost:3000/nfts/${address}`);
          if (!response.ok) {
            throw new Error("Failed to fetch NFT collection");
          }
          const data = await response.json();
          setNFTCollection(data);
        } else {
          const response = await fetch("http://localhost:3000/nfts");
          if (!response.ok) {
            throw new Error("Failed to fetch NFT collection");
          }
          const data = await response.json();
          setNFTCollection(data);
        }
      } catch (error) {
        console.error("Error fetching NFT collection:", error);
      }
    };
    fetchNFTCollection();
  }, [checked]);

  return (
    <Container sx={{ marginBottom: "60px" }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: "14px",
        }}
      >
        <Typography sx={{ fontSize: "32px", fontWeight: "bold" }}>
          {!checked ? "All NFT Collection" : "My NFT Collection"}
        </Typography>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Typography sx={{ fontWeight: "bold" }}>My collection</Typography>

          <Switch
            size="medium"
            disabled={!address}
            checked={checked}
            onChange={handleSwitchChange}
          />
        </Box>
      </Box>

      {NFTCollection && NFTCollection.length > 0 ? (
        <Carousel responsive={responsive}>
          {NFTCollection.map((nft, index) => (
            <NFT
              metadata={nft.metadata}
              owner={nft.owner_of}
              key={index}
              minter={nft.minter_address}
            />
          ))}
        </Carousel>
      ) : (
        <Typography
          sx={{ fontSize: "16px", color: "gray", fontWeight: "bold" }}
        >
          You don't have any NFTs.
        </Typography>
      )}
    </Container>
  );
}
