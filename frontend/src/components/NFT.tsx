import { Button, Stack, Typography, Modal, Box } from "@mui/material";
import { useState } from "react";
import { shortenAddress } from "../helpers/shortentAddress";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "800px",
  height: "500px",
  bgcolor: "background.paper",
  boxShadow: 24,
  borderRadius: "8px",
  p: 5,
  display: "flex",
  alignItems: "center",
};

export default function NFT({
  metadata,
  owner,
}: {
  metadata: string;
  owner: string;
}) {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const data = JSON.parse(metadata);
  if (!data || !data.image || !data.name || !data.description) {
    throw new Error("Invalid metadata format");
  }

  return (
    <Stack
      spacing={2}
      sx={{
        border: "1.5px solid #e0e7ff",
        borderRadius: "16px",
        padding: "20px",
        marginX: "20px",
        marginY: "10px",
        textAlign: "center",
        background: "linear-gradient(135deg, #f8fafc 0%, #e0e7ff 100%)",
        boxShadow: "0 4px 24px 0 rgba(103,124,230,0.10)",
        transition: "box-shadow 0.2s, transform 0.2s",
        "&:hover": {
          boxShadow: "0 8px 32px 0 rgba(103,124,230,0.18)",
          transform: "translateY(-4px) scale(1.02)",
          borderColor: "#a685e2",
        },
      }}
    >
      <img
        src={data.image}
        alt="NFT Thumbnail"
        style={{
          width: "100%",
          borderRadius: "12px",
          aspectRatio: "1",
          objectFit: "cover",
          boxShadow: "0 2px 12px rgba(103,124,230,0.08)",
        }}
      />
      <Typography
        variant="h6"
        fontWeight={700}
        sx={{
          color: "#4f46e5",
          letterSpacing: 1,
          mt: 1,
          mb: 0.5,
          fontSize: "1.2rem",
        }}
      >
        {data.name}
      </Typography>
      <div>
        <Button
          variant="contained"
          onClick={handleOpen}
          sx={{
            background: "linear-gradient(90deg, #677ce6 0%, #a685e2 100%)",
            color: "#fff",
            fontWeight: 600,
            borderRadius: "8px",
            px: 3,
            py: 1,
            boxShadow: "0 2px 8px rgba(103,124,230,0.10)",
            textTransform: "none",
            fontSize: "1rem",
            "&:hover": {
              background: "linear-gradient(90deg, #a685e2 0%, #677ce6 100%)",
            },
          }}
        >
          View Details
        </Button>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
          sx={{
            backdropFilter: "blur(2px)",
          }}
        >
          <Box
            sx={{
              ...style,
              border: "2px solid #a685e2",
              boxShadow: "0 8px 32px 0 rgba(103,124,230,0.18)",
              background: "linear-gradient(135deg, #f8fafc 0%, #e0e7ff 100%)",
            }}
          >
            <img
              src={data.image}
              alt="NFT Detail"
              style={{
                width: "340px",
                borderRadius: "12px",
                marginRight: "30px",
                aspectRatio: "1",
                objectFit: "cover",
                boxShadow: "0 2px 12px rgba(103,124,230,0.10)",
              }}
            />
            <Stack spacing={2} sx={{ ml: 4, flex: 1 }}>
              <Typography
                id="modal-modal-title"
                variant="h5"
                component="h2"
                fontWeight={800}
                sx={{
                  color: "#4f46e5",
                  mb: 2,
                  letterSpacing: 1,
                  textShadow: "0 2px 8px rgba(67,198,172,0.08)",
                  fontSize: "2rem",
                }}
              >
                {data.name}
              </Typography>
              <Typography
                id="modal-modal-description"
                sx={{
                  fontSize: "1.15rem",
                  color: "white",
                  background:
                    "linear-gradient(90deg, #a685e2 0%, #677ce6 100%)",
                  borderRadius: "10px",
                  p: 2,
                  boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
                  mb: 2,
                  display: "block",
                  fontWeight: 500,
                }}
              >
                {data.description}
              </Typography>
              <Typography
                sx={{
                  mt: 1,
                  color: "#888",
                  fontStyle: "italic",
                  fontSize: "1.05rem",
                  letterSpacing: 0.5,
                  display: "block",
                }}
              >
                Owner:
                <span style={{ fontWeight: 600, marginLeft: 8 }}>
                  {shortenAddress(owner) || "Unknown"}
                </span>
              </Typography>
            </Stack>
          </Box>
        </Modal>
      </div>
    </Stack>
  );
}
