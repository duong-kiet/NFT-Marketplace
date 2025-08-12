import { useState } from "react";
import NavBar from "./components/NavBar";
import SearchSection from "./components/SearchSection";
import Profile from "./components/Profile";
import NFTCollection from "./components/NFTCollection";
import { AddressContext } from "./context/AddressContext";
import "./App.css";
import MintEvent from "./components/MintEvent";
import TransferEvent from "./components/TransferEvent";

import { useQuery } from "@tanstack/react-query";
import { request } from "graphql-request";
import { url, headers } from "./utils/QueryClient";
import { query } from "./helpers/queries";

import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";

interface Data {
  allMinted?: any[];
  myMinted?: any[];
  allTransfer?: any[];
  myTransfer?: any[];
}

function App() {
  const [address, setAddress] = useState("");

  const { data, status } = useQuery({
    queryKey: ["data", address],
    async queryFn() {
      return await request(url, query, { to: address }, headers);
    },
  });

  console.log(data);

  return (
    <AddressContext.Provider value={{ address, setAddress }}>
      <NavBar />
      <SearchSection />

      {status === "pending" ? (
        <Box
          sx={{
            marginTop: "70px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <CircularProgress size="4rem" />
        </Box>
      ) : null}
      {status === "error" ? (
        <Box
          sx={{
            marginTop: "70px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <CircularProgress size="4rem" color="error" />
        </Box>
      ) : null}
      {status === "success" ? (
        <>
          <Profile />
          <NFTCollection />
          <MintEvent
            AllMintEvent={(data as Data).allMinted ?? []}
            MyMintEvent={(data as Data).myMinted ?? []}
          />
          <TransferEvent
            AllTransferEvent={(data as Data).allTransfer ?? []}
            MyTransferEvent={(data as Data).myTransfer ?? []}
          />
        </>
      ) : null}
    </AddressContext.Provider>
  );
}

export default App;
