import { Container, Typography, Box, Switch } from "@mui/material";
import { useEffect, useState, useContext } from "react";
import { AddressContext } from "../context/AddressContext";
import Transfer from "./Transfer";

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

export default function TransferEvent() {
  const { address } = useContext(AddressContext);
  const [checked, setChecked] = useState(false);
  const [TransferEvent, setTransferEvent] = useState<Array<any>>([]);

  const handleSwitchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.checked);
  };

  useEffect(() => {
    const fetchTransferEvent = async () => {
      try {
        if (checked) {
          const response = await fetch(
            `http://localhost:3000/events/transfer?from=${address}`
          );
          if (!response.ok) {
            throw new Error("Failed to fetch Mint event");
          }
          const data = await response.json();
          setTransferEvent(data.transfers);
        } else {
          const response = await fetch("http://localhost:3000/events/transfer");
          if (!response.ok) {
            throw new Error("Failed to fetch Mint event");
          }
          const data = await response.json();
          setTransferEvent(data.transfers);
        }
      } catch (error) {
        console.error("Error fetching Mint event.", error);
      }
    };
    fetchTransferEvent();
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
          {!checked ? "All Transfer Event" : "My Transfer Event"}
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

      {TransferEvent && TransferEvent.length > 0 ? (
        <Carousel responsive={responsive}>
          {TransferEvent.map((event, index) => (
            <Transfer event={event} key={index} />
          ))}
        </Carousel>
      ) : (
        <Typography
          sx={{ fontSize: "16px", color: "gray", fontWeight: "bold" }}
        >
          You don't have Transfer event.
        </Typography>
      )}
    </Container>
  );
}
