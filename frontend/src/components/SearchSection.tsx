import { Stack, Typography } from "@mui/material";
import SearchBar from "./SearchBar";

export default function SearchSection() {
  return (
    <Stack
      sx={{
        backgroundColor: "#677ce6",
        textAlign: "center",
        paddingTop: "110px",
        paddingBottom: "40px",
      }}
    >
      <Typography
        sx={{
          fontWeight: 600,
          fontSize: 42,
          color: "white",
          marginBottom: "10px",
        }}
      >
        Khám phá NFT độc đáo
      </Typography>

      <Typography
        sx={{
          fontWeight: 400,
          fontSize: 20,
          color: "white",
          marginBottom: "26px",
        }}
      >
        Mua bán và sưu tầm những tác phẩm nghệ thuật số hiếm có
      </Typography>

      <SearchBar />
    </Stack>
  );
}
