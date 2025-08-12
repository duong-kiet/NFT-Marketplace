import React, { useRef } from "react";
import { Box, Button, TextField, Typography } from "@mui/material";
import { PinataSDK } from "pinata";
import { ethers } from "ethers";
import Swal from "sweetalert2";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import { contractSigner } from "../utils/EthersContract";

const pinata = new PinataSDK({
  pinataJwt: import.meta.env.VITE_PINATA_JWT || "",
  pinataGateway: import.meta.env.VITE_PINATA_GATEWAY || "",
});

export default function MintSection() {
  const formRef = useRef<HTMLFormElement>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formRef.current) return;

    const formData = new FormData(formRef.current);
    const jsonObject = Object.fromEntries(formData.entries());
    const jsonString = JSON.stringify(jsonObject);

    const jsonFile = new File([jsonString], "data.json", {
      type: "application/json",
    });

    try {
      // Upload JSON file to IPFS
      const upload = await pinata.upload.public.file(jsonFile);
      if (!upload || !upload.cid) {
        formRef.current.reset();
        throw new Error("Failed to upload to IPFS");
      }

      // Mint the NFT
      const valueInWei = ethers.parseEther("0.001");
      const tx = await contractSigner.publicMint(
        `https://${import.meta.env.VITE_PINATA_GATEWAY}/ipfs/${upload.cid}`,
        { value: valueInWei }
      );
      const receipt = await tx.wait();
      const mintedEvent = receipt.logs
        .map((log: any) => {
          try {
            return contractSigner.interface.parseLog(log);
          } catch {
            return null;
          }
        })
        .find((e: any) => e && e.name === "Minted");

      if (mintedEvent) {
        // Emit event Minted successfully
        Swal.fire({
          title: "Mint successful!",
          icon: "success",
          draggable: false,
        });
      } else {
        Swal.fire({
          title: "Mint failed",
          icon: "error",
          text: "Không tìm thấy event Minted!",
        });
      }
      formRef.current.reset();

      setTimeout(() => {
        window.location.reload();
      }, 4000);
    } catch (error) {
      console.error("Error uploading to IPFS or minting NFT:", error);
      Swal.fire({
        title: "Mint failed",
        text: "There was an error minting your NFT. Please try again.",
        icon: "error",
        confirmButtonText: "OK",
      });
    }
  };

  return (
    <Box
      sx={{
        maxWidth: 420,
        mx: "auto",
        mt: 8,
        p: 4,
        bgcolor: "linear-gradient(135deg, #f8fafc 0%, #e0e7ff 100%)",
        borderRadius: 4,
        boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.18)",
        textAlign: "left",
        border: "1px solid #e0e7ff",
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
        <AutoAwesomeIcon sx={{ color: "#677ce6", fontSize: 32, mr: 1 }} />
        <Typography variant="h5" fontWeight={700}>
          Mint NFT
        </Typography>
      </Box>

      <form ref={formRef} onSubmit={handleSubmit} autoComplete="off">
        <TextField
          label="Name"
          name="name"
          required
          fullWidth
          margin="normal"
          InputProps={{
            sx: { borderRadius: 2, bgcolor: "#fff" },
          }}
        />
        <TextField
          label="Description"
          name="description"
          required
          fullWidth
          margin="normal"
          multiline
          minRows={3}
          InputProps={{
            sx: { borderRadius: 2, bgcolor: "#fff" },
          }}
        />
        <TextField
          label="Image URL"
          name="image"
          required
          fullWidth
          margin="normal"
          type="url"
          InputProps={{
            sx: { borderRadius: 2, bgcolor: "#fff" },
          }}
        />
        <Typography
          variant="caption"
          color="error"
          sx={{ mt: 1, display: "block", fontWeight: 500 }}
        >
          *Lưu ý: Bạn cần dư hơn 0.001 ETH mới mint được NFT
        </Typography>
        <Button
          type="submit"
          variant="contained"
          sx={{
            mt: 3,
            background: "linear-gradient(90deg, #677ce6 0%, #a685e2 100%)",
            color: "#fff",
            fontWeight: 600,
            borderRadius: 2,
            boxShadow: "0 2px 8px rgba(103,124,230,0.15)",
            "&:hover": {
              background: "linear-gradient(90deg, #a685e2 0%, #677ce6 100%)",
            },
          }}
          fullWidth
        >
          Mint NFT
        </Button>
      </form>
    </Box>
  );
}
