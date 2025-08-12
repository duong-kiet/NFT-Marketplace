import {
  Button,
  Stack,
  Typography,
  Modal,
  Box,
  TextField,
} from "@mui/material";
import { useState, useContext } from "react";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { AddressContext } from "../context/AddressContext";
import Swal from "sweetalert2";
import { contractSigner } from "../utils/EthersContract";

export default function TransferMyNFT({
  metadata,
  token_id,
}: {
  metadata: string;
  token_id: string;
}) {
  const { address } = useContext(AddressContext);
  const [open, setOpen] = useState(false);
  const [toAddress, setToAddress] = useState("");

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setToAddress("");
  };

  const data = JSON.parse(metadata);
  if (!data || !data.image || !data.name) {
    throw new Error("Invalid metadata format");
  }

  const handleTransfer = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      // Transfer NFTs
      const tx = await contractSigner.safeTransferFrom(
        address,
        toAddress,
        token_id
      );
      await tx.wait();

      Swal.fire({
        title: "Transfer successful!",
        text: `NFT has been transferred to ${toAddress}`,
        icon: "success",
        confirmButtonText: "OK",
      }).then(() => {
        window.location.reload();
      });
    } catch (error) {
      console.error("Transfer failed:", error);
      Swal.fire({
        title: "Transfer failed!",
        icon: "error",
        draggable: false,
      }).then(() => {
        window.location.reload();
      });
    } finally {
      setOpen(false);
      setToAddress("");
    }
  };

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
        sx={{ color: "#4f46e5", letterSpacing: 1 }}
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
          Transfer NFT
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
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: "800px",
              height: "500px",
              backgroundColor: "#fff",
              boxShadow: "0 8px 32px 0 rgba(103,124,230,0.18)",
              border: "2px solid #a685e2",
              borderRadius: "16px",
              p: 5,
              display: "flex",
              alignItems: "center",
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
                variant="h5"
                fontWeight={800}
                sx={{
                  color: "#4f46e5",
                  mb: 2,
                  letterSpacing: 1,
                  textShadow: "0 2px 8px rgba(67,198,172,0.08)",
                  fontSize: "2rem",
                  textAlign: "center",
                }}
              >
                🚀 Transfer NFT
              </Typography>
              <form onSubmit={handleTransfer} style={{ width: "100%" }}>
                <Typography variant="h6" fontWeight={500} sx={{ mb: 2 }}>
                  Name: {data.name}
                </Typography>
                <TextField
                  label="Địa chỉ người nhận"
                  variant="outlined"
                  fullWidth
                  required
                  value={toAddress}
                  onChange={(e) => setToAddress(e.target.value)}
                  sx={{
                    mb: 3,
                    "& .MuiOutlinedInput-root": {
                      borderRadius: 2,
                      bgcolor: "#fff",
                    },
                  }}
                />
                <Button
                  type="submit"
                  variant="contained"
                  fullWidth
                  sx={{
                    borderRadius: "8px",
                    fontWeight: 600,
                    background:
                      "linear-gradient(90deg, #677ce6 0%, #a685e2 100%)",
                    color: "#fff",
                    boxShadow: "0 2px 8px rgba(103,124,230,0.10)",
                    "&:hover": {
                      background:
                        "linear-gradient(90deg, #a685e2 0%, #677ce6 100%)",
                    },
                  }}
                >
                  Transfer NFT
                </Button>
              </form>
              <Box
                sx={{
                  mt: 3,
                  width: "100%",
                  bgcolor: "#f5faff",
                  borderRadius: "8px",
                  border: "1px solid #cce3fc",
                  p: 2,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <LockOutlinedIcon sx={{ mr: 1, color: "#6ab7ff" }} />
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ fontWeight: 500 }}
                >
                  Luôn kiểm tra kỹ địa chỉ người nhận trước khi transfer. Giao
                  dịch NFT không thể hoàn tác!
                </Typography>
              </Box>
            </Stack>
          </Box>
        </Modal>
      </div>
    </Stack>
  );
}
