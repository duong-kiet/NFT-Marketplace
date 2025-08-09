import { Container, Typography, Box, Switch } from "@mui/material";
import Mint from "./Mint";
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

export default function MintEvent() {
  const { address } = useContext(AddressContext);
  const [checked, setChecked] = useState(false);
  const [MintEvent, setMintEvent] = useState<Array<any>>([]);

  const handleSwitchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.checked);
  };

  useEffect(() => {
    const fetchMintEvent = async () => {
      try {
        if (checked) {
          // console.log("Address", address);
          const response = await fetch(
            `http://localhost:3000/events/mint?address=${address}`
          );
          console.log("Response", response);
          if (!response.ok) {
            throw new Error("Failed to fetch Mint event");
          }
          const data = await response.json();
          setMintEvent(data.mints);
        } else {
          const response = await fetch("http://localhost:3000/events/mint");
          if (!response.ok) {
            throw new Error("Failed to fetch Mint event");
          }
          const data = await response.json();
          setMintEvent(data.mints);
        }
      } catch (error) {
        console.error("Error fetching Mint event.", error);
      }
    };
    fetchMintEvent();
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
          {!checked ? "All Mint Event" : "My Mint Event"}
        </Typography>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Typography sx={{ fontWeight: "bold" }}>My event</Typography>

          <Switch
            size="medium"
            disabled={!address}
            checked={checked}
            onChange={handleSwitchChange}
          />
        </Box>
      </Box>

      {MintEvent && MintEvent.length > 0 ? (
        <Carousel responsive={responsive}>
          {MintEvent.map((event, index) => (
            <Mint event={event} key={index} />
          ))}
        </Carousel>
      ) : (
        <Typography
          sx={{ fontSize: "16px", color: "gray", fontWeight: "bold" }}
        >
          You don't have Mint event.
        </Typography>
      )}
    </Container>
  );
}
