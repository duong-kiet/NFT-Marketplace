import { Box, Typography, Tooltip } from "@mui/material";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import { styled } from "@mui/material/styles";
import { shortenAddress } from "../helpers/shortentAddress";

const GradientCard = styled(Box)({
  background: "linear-gradient(135deg, #6a82fb 0%, #fc5c7d 100%)", // tím xanh hồng nhẹ
  borderRadius: "16px",
  padding: "24px",
  width: "440px",
  position: "relative",
  boxShadow: "0 4px 24px rgba(106,130,251,0.15)",
  color: "#fff",
  display: "flex",
  flexDirection: "column",
  gap: "8px",
});

export default function Wallet({
  address,
  balance,
}: {
  address: string;
  balance: number | string;
}) {
  return (
    <GradientCard>
      <Box sx={{ display: "flex", alignItems: "center", marginBottom: "80px" }}>
        <img
          src="https://s3.coinmarketcap.com/static-gravity/image/b8db9a2ac5004c1685a39728cdf4e100.png"
          alt="Polygon Logo"
          width={32}
          height={32}
          style={{ borderRadius: "50%", marginRight: "8px" }}
        />
        <Tooltip title={address} arrow>
          <Typography sx={{ fontWeight: 600, fontSize: 18 }}>
            {shortenAddress(address)}
          </Typography>
        </Tooltip>
        <InfoOutlinedIcon sx={{ ml: "auto", color: "#888" }} fontSize="small" />
      </Box>
      <Typography sx={{ fontWeight: 500, fontSize: 16, mt: 1 }}>
        Balance: {balance} POL
      </Typography>
      <Typography sx={{ fontWeight: 600, fontSize: 18, color: "#060606" }}>
        Polygon Amoy
      </Typography>
    </GradientCard>
  );
}
