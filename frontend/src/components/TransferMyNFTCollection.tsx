import { Box, Typography } from "@mui/material";
import TransferMyNFT from "./TransferMyNFT";
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

export default function TransferMyNFTCollection() {
  const { address } = useContext(AddressContext);
  const [myCollection, setMyCollection] = useState<Array<any>>([]);

  useEffect(() => {
    const fetchNFTCollection = async () => {
      try {
        const response = await fetch(`http://localhost:3000/nfts/${address}`);
        if (!response.ok) {
          throw new Error("Failed to fetch my collection");
        }
        const data = await response.json();
        if (data) {
          setMyCollection(data);
        }
      } catch (error) {
        console.error("Error fetching my collection:", error);
      }
    };
    fetchNFTCollection();
  }, [address]);
  return (
    <Box sx={{ marginTop: "60px", padding: 0, marginBottom: "40px" }}>
      <Typography
        sx={{ fontSize: "32px", fontWeight: "bold", marginBottom: "14px" }}
      >
        Transfer my NFT Collection
      </Typography>

      {myCollection && myCollection.length > 0 ? (
        <Carousel responsive={responsive}>
          {myCollection.map((nft, index) => (
            <TransferMyNFT
              metadata={nft.metadata}
              token_id={nft.token_id}
              key={index}
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
    </Box>
  );
}
