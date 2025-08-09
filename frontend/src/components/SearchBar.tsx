import { styled } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";

const Search = styled("div")(({}) => ({
  position: "relative",
  borderRadius: "20px",
  backgroundColor: "#f0f2fc",
  margin: "auto",
  width: "800px",
  padding: "10px",
}));

const SearchIconWrapper = styled("div")(({}) => ({
  padding: "4px 12px 18px",
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  width: "100%",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
  },
}));

export default function SearchBar() {
  return (
    <Search>
      <SearchIconWrapper>
        <SearchIcon />
      </SearchIconWrapper>
      <StyledInputBase
        placeholder="Tìm kiếm NFT, bộ sưu tập, nghệ sĩ, ..."
        inputProps={{ "aria-label": "search" }}
      />
    </Search>
  );
}
